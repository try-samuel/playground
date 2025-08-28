/**
 * Accessibility utilities for the drawer component
 * Implements WCAG 2.1 AA standards and best practices
 */

export interface FocusableElement extends HTMLElement {
  focus: () => void;
}

/**
 * Get all focusable elements within a container
 */
export function getFocusableElements(container: HTMLElement): FocusableElement[] {
  const focusableSelectors = [
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    'a[href]',
    'area[href]',
    'summary',
    '[tabindex]:not([tabindex="-1"])',
    '[contenteditable="true"]',
    'audio[controls]',
    'video[controls]',
    'iframe'
  ].join(', ');

  const elements = Array.from(container.querySelectorAll(focusableSelectors)) as FocusableElement[];
  
  return elements.filter(element => {
    // Check if element is actually visible and focusable
    const style = window.getComputedStyle(element);
    return (
      style.display !== 'none' &&
      style.visibility !== 'hidden' &&
      !element.hasAttribute('hidden') &&
      element.offsetParent !== null
    );
  });
}

/**
 * Get the first focusable element
 */
export function getFirstFocusableElement(container: HTMLElement): FocusableElement | null {
  const focusableElements = getFocusableElements(container);
  return focusableElements[0] || null;
}

/**
 * Get the last focusable element
 */
export function getLastFocusableElement(container: HTMLElement): FocusableElement | null {
  const focusableElements = getFocusableElements(container);
  return focusableElements[focusableElements.length - 1] || null;
}

/**
 * Trap focus within a container
 */
export function trapFocus(event: KeyboardEvent, container: HTMLElement): void {
  if (event.key !== 'Tab') return;

  const focusableElements = getFocusableElements(container);
  
  if (focusableElements.length === 0) {
    event.preventDefault();
    return;
  }

  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  if (event.shiftKey) {
    // Shift + Tab: going backwards
    if (document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    }
  } else {
    // Tab: going forwards
    if (document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  }
}

/**
 * Store the element that had focus before the drawer opened
 */
let previousActiveElement: Element | null = null;

/**
 * Store focus before opening drawer
 */
export function storePreviousFocus(): void {
  previousActiveElement = document.activeElement;
}

/**
 * Restore focus after closing drawer
 */
export function restorePreviousFocus(): void {
  if (previousActiveElement && previousActiveElement instanceof HTMLElement) {
    // Small delay to ensure the drawer is fully closed
    setTimeout(() => {
      if (previousActiveElement instanceof HTMLElement) {
        previousActiveElement.focus();
      }
      previousActiveElement = null;
    }, 0);
  }
}

/**
 * Set focus to the first focusable element in the drawer
 */
export function setInitialFocus(container: HTMLElement): void {
  const firstFocusable = getFirstFocusableElement(container);
  if (firstFocusable) {
    // Small delay to ensure the drawer is fully rendered
    setTimeout(() => {
      firstFocusable.focus();
    }, 100);
  }
}

/**
 * Generate unique ID for accessibility
 */
export function generateId(prefix: string = 'drawer'): string {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Announce to screen readers
 */
export function announceToScreenReader(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
  const announcer = document.createElement('div');
  announcer.setAttribute('aria-live', priority);
  announcer.setAttribute('aria-atomic', 'true');
  announcer.setAttribute('class', 'sr-only');
  announcer.style.position = 'absolute';
  announcer.style.left = '-10000px';
  announcer.style.width = '1px';
  announcer.style.height = '1px';
  announcer.style.overflow = 'hidden';

  document.body.appendChild(announcer);
  announcer.textContent = message;

  // Remove after announcement
  setTimeout(() => {
    document.body.removeChild(announcer);
  }, 1000);
}

/**
 * Check if reduced motion is preferred
 */
export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Get appropriate ARIA attributes for drawer state
 */
export function getDrawerAriaAttributes(isOpen: boolean, id: string) {
  return {
    'role': 'dialog',
    'aria-modal': 'true',
    'aria-hidden': !isOpen,
    'aria-describedby': `${id}-content`,
    'tabIndex': -1
  };
}

/**
 * Get ARIA attributes for drawer trigger
 */
export function getTriggerAriaAttributes(isOpen: boolean, drawerId: string) {
  return {
    'aria-expanded': isOpen,
    'aria-controls': drawerId,
    'aria-haspopup': 'dialog'
  };
}

/**
 * Get ARIA attributes for drawer overlay
 */
export function getOverlayAriaAttributes() {
  return {
    'aria-hidden': 'true'
  };
}

/**
 * Handle keyboard navigation
 */
export function handleKeyboardNavigation(
  event: KeyboardEvent,
  container: HTMLElement,
  onClose?: () => void
): void {
  switch (event.key) {
    case 'Escape':
      if (onClose) {
        event.preventDefault();
        onClose();
      }
      break;
      
    case 'Tab':
      trapFocus(event, container);
      break;
      
    case 'Home':
      event.preventDefault();
      const firstElement = getFirstFocusableElement(container);
      if (firstElement) firstElement.focus();
      break;
      
    case 'End':
      event.preventDefault();
      const lastElement = getLastFocusableElement(container);
      if (lastElement) lastElement.focus();
      break;
  }
}

/**
 * Create a focus guard element
 */
export function createFocusGuard(): HTMLElement {
  const guard = document.createElement('div');
  guard.setAttribute('tabindex', '0');
  guard.setAttribute('aria-hidden', 'true');
  guard.style.position = 'fixed';
  guard.style.opacity = '0';
  guard.style.pointerEvents = 'none';
  return guard;
}

/**
 * Disable scrolling on background elements
 */
export function disableBackgroundScroll(): void {
  document.body.style.overflow = 'hidden';
  document.documentElement.style.overflow = 'hidden';
}

/**
 * Re-enable scrolling on background elements
 */
export function enableBackgroundScroll(): void {
  document.body.style.overflow = '';
  document.documentElement.style.overflow = '';
}

export const drawerAccessibility = {
  getFocusableElements,
  getFirstFocusableElement,
  getLastFocusableElement,
  trapFocus,
  storePreviousFocus,
  restorePreviousFocus,
  setInitialFocus,
  generateId,
  announceToScreenReader,
  prefersReducedMotion,
  getDrawerAriaAttributes,
  getTriggerAriaAttributes,
  getOverlayAriaAttributes,
  handleKeyboardNavigation,
  createFocusGuard,
  disableBackgroundScroll,
  enableBackgroundScroll
};

export default drawerAccessibility;