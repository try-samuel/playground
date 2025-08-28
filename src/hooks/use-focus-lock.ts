import { useEffect, useRef, useCallback } from 'react';
import {
  getFocusableElements,
  getFirstFocusableElement,
  getLastFocusableElement,
  trapFocus,
  storePreviousFocus,
  restorePreviousFocus,
  setInitialFocus,
  createFocusGuard
} from '../lib/drawer-accessibility';

export interface UseFocusLockOptions {
  enabled?: boolean;
  autoFocus?: boolean;
  restoreFocus?: boolean;
  onEscape?: () => void;
}

export interface UseFocusLockReturn {
  lockRef: React.RefObject<HTMLElement>;
  setFocusLock: (enabled: boolean) => void;
  focusFirst: () => void;
  focusLast: () => void;
  getCurrentFocusIndex: () => number;
  focusByIndex: (index: number) => void;
}

export function useFocusLock({
  enabled = true,
  autoFocus = true,
  restoreFocus = true,
  onEscape
}: UseFocusLockOptions = {}): UseFocusLockReturn {
  const lockRef = useRef<HTMLElement>(null);
  const previousActiveElement = useRef<Element | null>(null);
  const focusGuards = useRef<{ before: HTMLElement; after: HTMLElement } | null>(null);

  // Store the element that had focus before enabling the lock
  const storeFocus = useCallback(() => {
    if (restoreFocus) {
      previousActiveElement.current = document.activeElement;
      storePreviousFocus();
    }
  }, [restoreFocus]);

  // Restore focus to the previously focused element
  const restoreFocusToStored = useCallback(() => {
    if (restoreFocus) {
      restorePreviousFocus();
      if (previousActiveElement.current && previousActiveElement.current instanceof HTMLElement) {
        previousActiveElement.current.focus();
      }
      previousActiveElement.current = null;
    }
  }, [restoreFocus]);

  // Focus the first focusable element
  const focusFirst = useCallback(() => {
    if (!lockRef.current) return;
    const firstElement = getFirstFocusableElement(lockRef.current);
    if (firstElement) {
      firstElement.focus();
    }
  }, []);

  // Focus the last focusable element
  const focusLast = useCallback(() => {
    if (!lockRef.current) return;
    const lastElement = getLastFocusableElement(lockRef.current);
    if (lastElement) {
      lastElement.focus();
    }
  }, []);

  // Get the index of the currently focused element
  const getCurrentFocusIndex = useCallback((): number => {
    if (!lockRef.current || !document.activeElement) return -1;
    
    const focusableElements = getFocusableElements(lockRef.current);
    return focusableElements.indexOf(document.activeElement as any);
  }, []);

  // Focus element by index
  const focusByIndex = useCallback((index: number) => {
    if (!lockRef.current) return;
    
    const focusableElements = getFocusableElements(lockRef.current);
    if (index >= 0 && index < focusableElements.length) {
      focusableElements[index].focus();
    }
  }, []);

  // Create and manage focus guards
  const createAndInsertFocusGuards = useCallback(() => {
    if (!lockRef.current || focusGuards.current) return;

    const beforeGuard = createFocusGuard();
    const afterGuard = createFocusGuard();

    beforeGuard.addEventListener('focus', () => {
      focusLast();
    });

    afterGuard.addEventListener('focus', () => {
      focusFirst();
    });

    const container = lockRef.current;
    container.parentNode?.insertBefore(beforeGuard, container);
    container.parentNode?.insertBefore(afterGuard, container.nextSibling);

    focusGuards.current = { before: beforeGuard, after: afterGuard };
  }, [focusFirst, focusLast]);

  // Remove focus guards
  const removeFocusGuards = useCallback(() => {
    if (!focusGuards.current) return;

    const { before, after } = focusGuards.current;
    
    if (before.parentNode) {
      before.parentNode.removeChild(before);
    }
    
    if (after.parentNode) {
      after.parentNode.removeChild(after);
    }

    focusGuards.current = null;
  }, []);

  // Handle keyboard events
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!enabled || !lockRef.current) return;

    switch (event.key) {
      case 'Escape':
        if (onEscape) {
          event.preventDefault();
          onEscape();
        }
        break;
        
      case 'Tab':
        trapFocus(event, lockRef.current);
        break;
        
      case 'Home':
        if (event.ctrlKey || event.metaKey) {
          event.preventDefault();
          focusFirst();
        }
        break;
        
      case 'End':
        if (event.ctrlKey || event.metaKey) {
          event.preventDefault();
          focusLast();
        }
        break;
    }
  }, [enabled, onEscape, focusFirst, focusLast]);

  // Set focus lock state
  const setFocusLock = useCallback((lockEnabled: boolean) => {
    if (lockEnabled) {
      storeFocus();
      createAndInsertFocusGuards();
      
      if (autoFocus && lockRef.current) {
        setInitialFocus(lockRef.current);
      }
    } else {
      removeFocusGuards();
      restoreFocusToStored();
    }
  }, [storeFocus, createAndInsertFocusGuards, removeFocusGuards, restoreFocusToStored, autoFocus]);

  // Set up keyboard event listener
  useEffect(() => {
    if (enabled) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [enabled, handleKeyDown]);

  // Enable/disable focus lock based on enabled prop
  useEffect(() => {
    setFocusLock(enabled);
    
    return () => {
      if (enabled) {
        setFocusLock(false);
      }
    };
  }, [enabled, setFocusLock]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      removeFocusGuards();
      if (enabled && restoreFocus) {
        restoreFocusToStored();
      }
    };
  }, []);

  return {
    lockRef,
    setFocusLock,
    focusFirst,
    focusLast,
    getCurrentFocusIndex,
    focusByIndex
  };
}

// Hook for managing focus within a specific container
export function useContainerFocus(containerRef: React.RefObject<HTMLElement>) {
  const containsFocus = useCallback((): boolean => {
    if (!containerRef.current || !document.activeElement) return false;
    return containerRef.current.contains(document.activeElement);
  }, [containerRef]);

  const moveFocusInside = useCallback(() => {
    if (!containerRef.current) return;
    
    if (!containsFocus()) {
      const firstFocusable = getFirstFocusableElement(containerRef.current);
      if (firstFocusable) {
        firstFocusable.focus();
      }
    }
  }, [containerRef, containsFocus]);

  const moveFocusOutside = useCallback(() => {
    if (containsFocus() && document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }, [containsFocus]);

  return {
    containsFocus,
    moveFocusInside,
    moveFocusOutside
  };
}

// Hook for managing focus restoration
export function useFocusRestore() {
  const previousFocus = useRef<HTMLElement | null>(null);

  const saveFocus = useCallback(() => {
    previousFocus.current = document.activeElement as HTMLElement;
  }, []);

  const restoreFocus = useCallback(() => {
    if (previousFocus.current && document.body.contains(previousFocus.current)) {
      previousFocus.current.focus();
    }
    previousFocus.current = null;
  }, []);

  return {
    saveFocus,
    restoreFocus
  };
}

// Hook for advanced focus management with history
export function useFocusHistory() {
  const focusHistory = useRef<HTMLElement[]>([]);
  const currentIndex = useRef(-1);

  const addToHistory = useCallback((element: HTMLElement) => {
    // Remove from current position if it exists
    const existingIndex = focusHistory.current.indexOf(element);
    if (existingIndex !== -1) {
      focusHistory.current.splice(existingIndex, 1);
    }

    // Add to end of history
    focusHistory.current.push(element);
    currentIndex.current = focusHistory.current.length - 1;

    // Keep history reasonable length
    if (focusHistory.current.length > 10) {
      focusHistory.current.shift();
      currentIndex.current--;
    }
  }, []);

  const goBack = useCallback(() => {
    if (currentIndex.current > 0) {
      currentIndex.current--;
      const element = focusHistory.current[currentIndex.current];
      if (element && document.body.contains(element)) {
        element.focus();
      }
    }
  }, []);

  const goForward = useCallback(() => {
    if (currentIndex.current < focusHistory.current.length - 1) {
      currentIndex.current++;
      const element = focusHistory.current[currentIndex.current];
      if (element && document.body.contains(element)) {
        element.focus();
      }
    }
  }, []);

  const clearHistory = useCallback(() => {
    focusHistory.current = [];
    currentIndex.current = -1;
  }, []);

  return {
    addToHistory,
    goBack,
    goForward,
    clearHistory,
    canGoBack: currentIndex.current > 0,
    canGoForward: currentIndex.current < focusHistory.current.length - 1
  };
}