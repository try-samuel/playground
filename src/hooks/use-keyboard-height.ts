import { useState, useEffect, useCallback } from 'react';
import { createKeyboardHeightObserver, detectIOSEnvironment, getViewportHeight } from '../lib/ios-drawer-fixes';
import { KeyboardState } from '../types';

export interface UseKeyboardHeightOptions {
  enabled?: boolean;
  onKeyboardShow?: (height: number) => void;
  onKeyboardHide?: () => void;
  debounceMs?: number;
}

export interface UseKeyboardHeightReturn {
  keyboardHeight: number;
  isKeyboardVisible: boolean;
  keyboardState: KeyboardState;
  viewportHeight: number;
  availableHeight: number;
}

export function useKeyboardHeight({
  enabled = true,
  onKeyboardShow,
  onKeyboardHide,
  debounceMs = 50
}: UseKeyboardHeightOptions = {}): UseKeyboardHeightReturn {
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [viewportHeight, setViewportHeight] = useState(() => getViewportHeight());

  // Debounced state updates
  const [debouncedKeyboardHeight, setDebouncedKeyboardHeight] = useState(0);
  const [debouncedIsVisible, setDebouncedIsVisible] = useState(false);

  // Calculate available height (viewport minus keyboard)
  const availableHeight = viewportHeight - debouncedKeyboardHeight;

  const handleKeyboardChange = useCallback((height: number, isVisible: boolean) => {
    setKeyboardHeight(height);
    setIsKeyboardVisible(isVisible);
    setViewportHeight(getViewportHeight());

    if (isVisible && height > 0) {
      onKeyboardShow?.(height);
    } else if (!isVisible) {
      onKeyboardHide?.();
    }
  }, [onKeyboardShow, onKeyboardHide]);

  // Debounce keyboard state changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedKeyboardHeight(keyboardHeight);
      setDebouncedIsVisible(isKeyboardVisible);
    }, debounceMs);

    return () => clearTimeout(timeoutId);
  }, [keyboardHeight, isKeyboardVisible, debounceMs]);

  // Set up keyboard height observer
  useEffect(() => {
    if (!enabled) return;

    const cleanup = createKeyboardHeightObserver(handleKeyboardChange);

    // Also listen for viewport changes
    const handleViewportChange = () => {
      setViewportHeight(getViewportHeight());
    };

    // Listen for resize events
    window.addEventListener('resize', handleViewportChange);

    // Listen for visual viewport changes (iOS)
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleViewportChange);
    }

    return () => {
      cleanup();
      window.removeEventListener('resize', handleViewportChange);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', handleViewportChange);
      }
    };
  }, [enabled, handleKeyboardChange]);

  // Update viewport height on orientation change
  useEffect(() => {
    const handleOrientationChange = () => {
      // Small delay to ensure orientation change is complete
      setTimeout(() => {
        setViewportHeight(getViewportHeight());
      }, 100);
    };

    if (screen.orientation) {
      screen.orientation.addEventListener('change', handleOrientationChange);
      return () => {
        screen.orientation.removeEventListener('change', handleOrientationChange);
      };
    } else {
      window.addEventListener('orientationchange', handleOrientationChange);
      return () => {
        window.removeEventListener('orientationchange', handleOrientationChange);
      };
    }
  }, []);

  const keyboardState: KeyboardState = {
    height: debouncedKeyboardHeight,
    isVisible: debouncedIsVisible
  };

  return {
    keyboardHeight: debouncedKeyboardHeight,
    isKeyboardVisible: debouncedIsVisible,
    keyboardState,
    viewportHeight,
    availableHeight
  };
}

// Hook specifically for iOS keyboard handling
export function useIOSKeyboard(options: UseKeyboardHeightOptions = {}) {
  const env = detectIOSEnvironment();
  const keyboardData = useKeyboardHeight({
    ...options,
    enabled: options.enabled !== false && env.isIOS
  });

  return {
    ...keyboardData,
    isIOSDevice: env.isIOS,
    iosVersion: env.version,
    supportsVisualViewport: env.supportsVisualViewport
  };
}

// Hook for handling keyboard in drawer context
export function useDrawerKeyboard({
  isOpen,
  direction = 'bottom',
  onKeyboardChange,
  adjustForKeyboard = true
}: {
  isOpen: boolean;
  direction?: 'bottom' | 'top' | 'left' | 'right';
  onKeyboardChange?: (height: number, isVisible: boolean) => void;
  adjustForKeyboard?: boolean;
}) {
  const isBottomDrawer = direction === 'bottom';
  const shouldAdjust = adjustForKeyboard && isBottomDrawer && isOpen;

  const keyboardData = useKeyboardHeight({
    enabled: shouldAdjust,
    onKeyboardShow: (height) => {
      onKeyboardChange?.(height, true);
    },
    onKeyboardHide: () => {
      onKeyboardChange?.(0, false);
    }
  });

  // Calculate adjustment for drawer position
  const keyboardAdjustment = shouldAdjust && keyboardData.isKeyboardVisible 
    ? keyboardData.keyboardHeight 
    : 0;

  return {
    ...keyboardData,
    keyboardAdjustment,
    shouldAdjustForKeyboard: shouldAdjust
  };
}

// Hook for preventing zoom on input focus (iOS)
export function usePreventZoomOnFocus() {
  useEffect(() => {
    const env = detectIOSEnvironment();
    if (!env.isIOSSafari) return;

    const handleFocus = (event: FocusEvent) => {
      const target = event.target as HTMLElement;
      if (
        target &&
        (target.tagName === 'INPUT' ||
         target.tagName === 'TEXTAREA' ||
         target.tagName === 'SELECT')
      ) {
        // Temporarily disable zoom
        const viewport = document.querySelector('meta[name="viewport"]') as HTMLMetaElement;
        if (viewport) {
          const originalContent = viewport.content;
          viewport.content = originalContent.replace(/user-scalable=yes/gi, 'user-scalable=no');
          
          // Restore after blur
          const handleBlur = () => {
            viewport.content = originalContent;
            target.removeEventListener('blur', handleBlur);
          };
          
          target.addEventListener('blur', handleBlur);
        }
      }
    };

    document.addEventListener('focusin', handleFocus);

    return () => {
      document.removeEventListener('focusin', handleFocus);
    };
  }, []);
}