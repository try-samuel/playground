/**
 * iOS-specific fixes and utilities for drawer component
 * Handles viewport, keyboard, and scrolling issues on iOS Safari
 */

export interface IOSEnvironment {
  isIOS: boolean;
  isIOSSafari: boolean;
  isPWA: boolean;
  version: number;
  supportsDynamicViewport: boolean;
  supportsVisualViewport: boolean;
}

/**
 * Detect iOS environment and capabilities
 */
export function detectIOSEnvironment(): IOSEnvironment {
  const userAgent = navigator.userAgent.toLowerCase();
  const isIOS = /iphone|ipad|ipod/.test(userAgent);
  const isIOSSafari = isIOS && /safari/.test(userAgent) && !/chrome|crios|fxios/.test(userAgent);
  const isPWA = window.matchMedia('(display-mode: standalone)').matches;
  
  // Extract iOS version
  const versionMatch = userAgent.match(/os (\d+)_(\d+)/);
  const version = versionMatch ? parseInt(versionMatch[1], 10) : 0;
  
  const supportsDynamicViewport = version >= 15; // iOS 15+ supports dvh
  const supportsVisualViewport = 'visualViewport' in window;

  return {
    isIOS,
    isIOSSafari,
    isPWA,
    version,
    supportsDynamicViewport,
    supportsVisualViewport
  };
}

/**
 * Get safe area insets for iOS devices
 */
export function getSafeAreaInsets(): { top: number; bottom: number; left: number; right: number } {
  const env = detectIOSEnvironment();
  
  if (!env.isIOS) {
    return { top: 0, bottom: 0, left: 0, right: 0 };
  }

  // Try to get safe area insets from CSS env() variables
  const computedStyle = getComputedStyle(document.documentElement);
  
  const top = parseInt(computedStyle.getPropertyValue('--safe-area-inset-top') || '0', 10);
  const bottom = parseInt(computedStyle.getPropertyValue('--safe-area-inset-bottom') || '0', 10);
  const left = parseInt(computedStyle.getPropertyValue('--safe-area-inset-left') || '0', 10);
  const right = parseInt(computedStyle.getPropertyValue('--safe-area-inset-right') || '0', 10);

  return { top, bottom, left, right };
}

/**
 * Get the actual viewport height, accounting for iOS Safari's dynamic UI
 */
export function getViewportHeight(): number {
  const env = detectIOSEnvironment();
  
  if (env.supportsVisualViewport && window.visualViewport) {
    return window.visualViewport.height;
  }
  
  if (env.supportsDynamicViewport) {
    // Use CSS custom properties to get dynamic viewport height
    const testElement = document.createElement('div');
    testElement.style.height = '100dvh';
    testElement.style.position = 'fixed';
    testElement.style.top = '0';
    testElement.style.visibility = 'hidden';
    document.body.appendChild(testElement);
    
    const height = testElement.offsetHeight;
    document.body.removeChild(testElement);
    return height;
  }
  
  // Fallback to window.innerHeight
  return window.innerHeight;
}

/**
 * Prevent iOS Safari from zooming when inputs are focused
 */
export function preventIOSZoom(): void {
  const env = detectIOSEnvironment();
  if (!env.isIOSSafari) return;

  // Set the viewport meta tag to prevent zoom
  let viewportMeta = document.querySelector('meta[name="viewport"]') as HTMLMetaElement;
  
  if (!viewportMeta) {
    viewportMeta = document.createElement('meta');
    viewportMeta.name = 'viewport';
    document.head.appendChild(viewportMeta);
  }

  const currentContent = viewportMeta.content;
  const hasMaximumScale = /maximum-scale=/.test(currentContent);
  const hasUserScalable = /user-scalable=/.test(currentContent);

  if (!hasMaximumScale || !hasUserScalable) {
    let newContent = currentContent;
    
    if (!hasMaximumScale) {
      newContent += newContent ? ', maximum-scale=1.0' : 'maximum-scale=1.0';
    }
    
    if (!hasUserScalable) {
      newContent += newContent ? ', user-scalable=no' : 'user-scalable=no';
    }
    
    viewportMeta.content = newContent;
  }
}

/**
 * Handle iOS keyboard height changes
 */
export function createKeyboardHeightObserver(
  callback: (height: number, isVisible: boolean) => void
): () => void {
  const env = detectIOSEnvironment();
  
  if (!env.supportsVisualViewport || !window.visualViewport) {
    // Fallback for older iOS versions
    return createLegacyKeyboardObserver(callback);
  }

  const visualViewport = window.visualViewport;
  let lastHeight = visualViewport.height;
  let keyboardHeight = 0;

  const handleViewportChange = () => {
    const currentHeight = visualViewport.height;
    const heightDifference = lastHeight - currentHeight;
    
    if (heightDifference > 150) {
      // Keyboard likely opened
      keyboardHeight = heightDifference;
      callback(keyboardHeight, true);
    } else if (currentHeight > lastHeight && keyboardHeight > 0) {
      // Keyboard likely closed
      keyboardHeight = 0;
      callback(0, false);
    }
    
    lastHeight = currentHeight;
  };

  visualViewport.addEventListener('resize', handleViewportChange);

  return () => {
    visualViewport.removeEventListener('resize', handleViewportChange);
  };
}

/**
 * Legacy keyboard height detection for older iOS versions
 */
function createLegacyKeyboardObserver(
  callback: (height: number, isVisible: boolean) => void
): () => void {
  let initialViewportHeight = window.innerHeight;
  let keyboardHeight = 0;

  const handleResize = () => {
    const currentHeight = window.innerHeight;
    const heightDifference = initialViewportHeight - currentHeight;

    if (heightDifference > 150) {
      // Keyboard likely opened
      keyboardHeight = heightDifference;
      callback(keyboardHeight, true);
    } else if (heightDifference < 50 && keyboardHeight > 0) {
      // Keyboard likely closed
      keyboardHeight = 0;
      callback(0, false);
    }
  };

  window.addEventListener('resize', handleResize);

  return () => {
    window.removeEventListener('resize', handleResize);
  };
}

/**
 * Prevent rubber band scrolling on iOS
 */
export function preventIOSBounce(element: HTMLElement): () => void {
  const env = detectIOSEnvironment();
  if (!env.isIOS) return () => {};

  let isScrolling = false;
  let startY = 0;

  const handleTouchStart = (e: TouchEvent) => {
    startY = e.touches[0].clientY;
    isScrolling = element.scrollTop > 0;
  };

  const handleTouchMove = (e: TouchEvent) => {
    const currentY = e.touches[0].clientY;
    const deltaY = currentY - startY;

    // Prevent scrolling past top
    if (element.scrollTop <= 0 && deltaY > 0) {
      e.preventDefault();
      return;
    }

    // Prevent scrolling past bottom
    if (element.scrollTop >= element.scrollHeight - element.clientHeight && deltaY < 0) {
      e.preventDefault();
      return;
    }
  };

  element.addEventListener('touchstart', handleTouchStart, { passive: false });
  element.addEventListener('touchmove', handleTouchMove, { passive: false });

  return () => {
    element.removeEventListener('touchstart', handleTouchStart);
    element.removeEventListener('touchmove', handleTouchMove);
  };
}

/**
 * Set CSS custom properties for iOS safe areas
 */
export function setIOSSafeAreaProperties(): void {
  const env = detectIOSEnvironment();
  if (!env.isIOS) return;

  const style = document.documentElement.style;
  
  // Set safe area inset variables if not already set
  if (!style.getPropertyValue('--safe-area-inset-top')) {
    style.setProperty('--safe-area-inset-top', 'env(safe-area-inset-top, 0px)');
  }
  if (!style.getPropertyValue('--safe-area-inset-bottom')) {
    style.setProperty('--safe-area-inset-bottom', 'env(safe-area-inset-bottom, 0px)');
  }
  if (!style.getPropertyValue('--safe-area-inset-left')) {
    style.setProperty('--safe-area-inset-left', 'env(safe-area-inset-left, 0px)');
  }
  if (!style.getPropertyValue('--safe-area-inset-right')) {
    style.setProperty('--safe-area-inset-right', 'env(safe-area-inset-right, 0px)');
  }

  // Set viewport height variables
  style.setProperty('--viewport-height', `${getViewportHeight()}px`);
  
  if (env.supportsDynamicViewport) {
    style.setProperty('--dynamic-viewport-height', '100dvh');
  } else {
    style.setProperty('--dynamic-viewport-height', `${getViewportHeight()}px`);
  }
}

/**
 * Handle orientation changes on iOS
 */
export function createOrientationChangeHandler(
  callback: (orientation: OrientationLockType | number) => void
): () => void {
  const env = detectIOSEnvironment();
  if (!env.isIOS) return () => {};

  const handleOrientationChange = () => {
    // Small delay to ensure the orientation change is complete
    setTimeout(() => {
      const orientation = screen.orientation?.type || window.orientation;
      setIOSSafeAreaProperties(); // Update safe area properties
      callback(orientation);
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
}

/**
 * Create a style element with iOS-specific CSS fixes
 */
export function injectIOSStyles(): void {
  const env = detectIOSEnvironment();
  if (!env.isIOS) return;

  const existingStyle = document.getElementById('ios-drawer-fixes');
  if (existingStyle) return;

  const style = document.createElement('style');
  style.id = 'ios-drawer-fixes';
  style.textContent = `
    /* iOS Drawer Fixes */
    :root {
      --safe-area-inset-top: env(safe-area-inset-top, 0px);
      --safe-area-inset-bottom: env(safe-area-inset-bottom, 0px);
      --safe-area-inset-left: env(safe-area-inset-left, 0px);
      --safe-area-inset-right: env(safe-area-inset-right, 0px);
      --viewport-height: 100vh;
      --dynamic-viewport-height: ${env.supportsDynamicViewport ? '100dvh' : '100vh'};
    }
    
    /* Prevent iOS Safari from adding default input styles */
    .ios-drawer input,
    .ios-drawer textarea,
    .ios-drawer select {
      -webkit-appearance: none;
      -webkit-border-radius: 0;
      border-radius: 0;
    }
    
    /* Prevent iOS bounce scrolling */
    .ios-drawer-prevent-bounce {
      overscroll-behavior: none;
      -webkit-overflow-scrolling: touch;
    }
    
    /* Fix iOS input zoom */
    @media screen and (-webkit-min-device-pixel-ratio: 2) {
      .ios-drawer input,
      .ios-drawer textarea,
      .ios-drawer select {
        font-size: 16px !important;
      }
    }
  `;

  document.head.appendChild(style);
}

/**
 * Initialize all iOS fixes
 */
export function initializeIOSFixes(): () => void {
  const env = detectIOSEnvironment();
  if (!env.isIOS) return () => {};

  injectIOSStyles();
  setIOSSafeAreaProperties();
  preventIOSZoom();

  const cleanupOrientation = createOrientationChangeHandler(() => {
    setIOSSafeAreaProperties();
  });

  // Update safe area properties when the document is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setIOSSafeAreaProperties);
  }

  return () => {
    cleanupOrientation();
    const style = document.getElementById('ios-drawer-fixes');
    if (style) {
      style.remove();
    }
  };
}

export const iosDrawerFixes = {
  detectIOSEnvironment,
  getSafeAreaInsets,
  getViewportHeight,
  preventIOSZoom,
  createKeyboardHeightObserver,
  preventIOSBounce,
  setIOSSafeAreaProperties,
  createOrientationChangeHandler,
  injectIOSStyles,
  initializeIOSFixes
};

export default iosDrawerFixes;