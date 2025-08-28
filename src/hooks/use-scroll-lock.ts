import { useEffect, useCallback, useRef } from 'react';
import { preventIOSBounce, detectIOSEnvironment } from '../lib/ios-drawer-fixes';

export interface UseScrollLockOptions {
  enabled?: boolean;
  allowPinchZoom?: boolean;
  reserveScrollBarGap?: boolean;
  blockInteraction?: boolean;
}

export interface UseScrollLockReturn {
  lockScroll: () => void;
  unlockScroll: () => void;
  isLocked: boolean;
}

export function useScrollLock({
  enabled = true,
  allowPinchZoom = false,
  reserveScrollBarGap = true,
  blockInteraction = false
}: UseScrollLockOptions = {}): UseScrollLockReturn {
  const isLocked = useRef(false);
  const originalStyles = useRef<{
    body: Partial<CSSStyleDeclaration>;
    html: Partial<CSSStyleDeclaration>;
    scrollBarWidth: number;
  } | null>(null);
  const cleanupFunctions = useRef<Array<() => void>>([]);

  // Calculate scrollbar width
  const getScrollBarWidth = useCallback((): number => {
    const scrollDiv = document.createElement('div');
    scrollDiv.style.width = '100px';
    scrollDiv.style.height = '100px';
    scrollDiv.style.overflow = 'scroll';
    scrollDiv.style.position = 'absolute';
    scrollDiv.style.top = '-9999px';
    document.body.appendChild(scrollDiv);

    const scrollBarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    document.body.removeChild(scrollDiv);

    return scrollBarWidth;
  }, []);

  // Store original styles
  const storeOriginalStyles = useCallback(() => {
    if (originalStyles.current) return;

    const body = document.body;
    const html = document.documentElement;
    const scrollBarWidth = getScrollBarWidth();

    originalStyles.current = {
      body: {
        overflow: body.style.overflow,
        paddingRight: body.style.paddingRight,
        position: body.style.position,
        top: body.style.top,
        left: body.style.left,
        right: body.style.right,
        width: body.style.width,
        height: body.style.height
      },
      html: {
        overflow: html.style.overflow,
        paddingRight: html.style.paddingRight
      },
      scrollBarWidth
    };
  }, [getScrollBarWidth]);

  // Restore original styles
  const restoreOriginalStyles = useCallback(() => {
    if (!originalStyles.current) return;

    const body = document.body;
    const html = document.documentElement;
    const { body: bodyStyles, html: htmlStyles } = originalStyles.current;

    // Restore body styles
    Object.keys(bodyStyles).forEach(key => {
      const value = bodyStyles[key as keyof CSSStyleDeclaration];
      if (value !== undefined) {
        (body.style as any)[key] = value;
      }
    });

    // Restore html styles
    Object.keys(htmlStyles).forEach(key => {
      const value = htmlStyles[key as keyof CSSStyleDeclaration];
      if (value !== undefined) {
        (html.style as any)[key] = value;
      }
    });

    originalStyles.current = null;
  }, []);

  // Lock scroll
  const lockScroll = useCallback(() => {
    if (isLocked.current) return;

    storeOriginalStyles();
    
    const body = document.body;
    const html = document.documentElement;
    const { scrollBarWidth } = originalStyles.current!;

    // Get current scroll position
    const scrollY = window.pageYOffset || html.scrollTop || body.scrollTop || 0;
    const scrollX = window.pageXOffset || html.scrollLeft || body.scrollLeft || 0;

    // Apply styles to prevent scrolling
    body.style.overflow = 'hidden';
    html.style.overflow = 'hidden';

    // Reserve space for scrollbar to prevent layout shift
    if (reserveScrollBarGap && scrollBarWidth > 0) {
      body.style.paddingRight = `${scrollBarWidth}px`;
    }

    // Fix position to prevent scroll jump
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.left = `-${scrollX}px`;
    body.style.right = '0';
    body.style.width = '100%';

    // iOS specific fixes
    const env = detectIOSEnvironment();
    if (env.isIOS) {
      // Prevent iOS bounce scrolling
      const cleanup = preventIOSBounce(body);
      cleanupFunctions.current.push(cleanup);

      // Prevent zoom on iOS Safari if not allowed
      if (!allowPinchZoom) {
        const preventZoom = (e: TouchEvent) => {
          if (e.touches.length > 1) {
            e.preventDefault();
          }
        };

        document.addEventListener('touchstart', preventZoom, { passive: false });
        cleanupFunctions.current.push(() => {
          document.removeEventListener('touchstart', preventZoom);
        });
      }

      // Block all touch interactions if requested
      if (blockInteraction) {
        const preventTouch = (e: TouchEvent) => {
          e.preventDefault();
        };

        document.addEventListener('touchmove', preventTouch, { passive: false });
        cleanupFunctions.current.push(() => {
          document.removeEventListener('touchmove', preventTouch);
        });
      }
    }

    isLocked.current = true;
  }, [
    storeOriginalStyles,
    reserveScrollBarGap,
    allowPinchZoom,
    blockInteraction
  ]);

  // Unlock scroll
  const unlockScroll = useCallback(() => {
    if (!isLocked.current) return;

    const body = document.body;
    const html = document.documentElement;

    // Get the scroll position from the fixed positioning
    const scrollY = Math.abs(parseInt(body.style.top || '0', 10));
    const scrollX = Math.abs(parseInt(body.style.left || '0', 10));

    // Restore original styles
    restoreOriginalStyles();

    // Restore scroll position
    window.scrollTo(scrollX, scrollY);

    // Clean up iOS specific handlers
    cleanupFunctions.current.forEach(cleanup => cleanup());
    cleanupFunctions.current = [];

    isLocked.current = false;
  }, [restoreOriginalStyles]);

  // Effect to handle enabled state
  useEffect(() => {
    if (enabled) {
      lockScroll();
    } else {
      unlockScroll();
    }

    return () => {
      if (isLocked.current) {
        unlockScroll();
      }
    };
  }, [enabled, lockScroll, unlockScroll]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (isLocked.current) {
        unlockScroll();
      }
    };
  }, [unlockScroll]);

  return {
    lockScroll,
    unlockScroll,
    isLocked: isLocked.current
  };
}

// Hook for scroll lock with container support
export function useContainerScrollLock(
  containerRef: React.RefObject<HTMLElement>,
  options: UseScrollLockOptions = {}
) {
  const scrollLock = useScrollLock(options);

  const lockContainer = useCallback(() => {
    if (containerRef.current) {
      const container = containerRef.current;
      container.style.overflow = 'hidden';
    }
    scrollLock.lockScroll();
  }, [containerRef, scrollLock]);

  const unlockContainer = useCallback(() => {
    if (containerRef.current) {
      const container = containerRef.current;
      container.style.overflow = '';
    }
    scrollLock.unlockScroll();
  }, [containerRef, scrollLock]);

  return {
    ...scrollLock,
    lockContainer,
    unlockContainer
  };
}

// Hook for selective scroll lock (allow specific elements to scroll)
export function useSelectiveScrollLock(
  allowedSelectors: string[] = [],
  options: UseScrollLockOptions = {}
) {
  const scrollLock = useScrollLock({ ...options, enabled: false });

  const lockWithExceptions = useCallback(() => {
    scrollLock.lockScroll();

    // Allow specific elements to scroll
    allowedSelectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(element => {
        if (element instanceof HTMLElement) {
          element.style.overflow = 'auto';
          element.style.overscrollBehavior = 'contain';
        }
      });
    });
  }, [scrollLock, allowedSelectors]);

  const unlockWithRestore = useCallback(() => {
    // Restore original overflow styles for allowed elements
    allowedSelectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(element => {
        if (element instanceof HTMLElement) {
          element.style.overflow = '';
          element.style.overscrollBehavior = '';
        }
      });
    });

    scrollLock.unlockScroll();
  }, [scrollLock, allowedSelectors]);

  return {
    lockScroll: lockWithExceptions,
    unlockScroll: unlockWithRestore,
    isLocked: scrollLock.isLocked
  };
}

// Hook for modal-specific scroll lock
export function useModalScrollLock(isOpen: boolean, options: UseScrollLockOptions = {}) {
  return useScrollLock({
    ...options,
    enabled: isOpen,
    reserveScrollBarGap: true,
    blockInteraction: false
  });
}