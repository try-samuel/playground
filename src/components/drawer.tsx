import React, { forwardRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { DrawerProvider } from './drawer-context';
import { DrawerProps } from '../types';
import { cn } from '../lib/cn';
import { useScrollLock } from '../hooks/use-scroll-lock';
import { useFocusLock } from '../hooks/use-focus-lock';
import { announceToScreenReader } from '../lib/drawer-accessibility';

export const Drawer = forwardRef<HTMLDivElement, DrawerProps>(({
  // State management
  open = false,
  defaultOpen = false,
  onOpenChange,
  
  // Positioning & behavior
  direction = 'bottom',
  snapPoints = ['25%', '50%', '75%', '100%'],
  defaultSnapPoint = 0,
  alwaysOn = false,
  modal = true,
  
  // Interaction
  dismissible = true,
  closeOnOutsideClick = true,
  closeOnEscape = true,
  dragHandleProps,
  
  // Callbacks
  onSnap,
  onDrag,
  onOpen,
  onClose,
  onDragStart,
  onDragEnd,
  
  // Styling
  className,
  overlayClassName,
  contentClassName,
  
  // Accessibility
  ariaLabel,
  ariaLabelledBy,
  ariaDescribedBy,
  
  // Children
  children,
  
  // Container
  container,
  
  // iOS specific
  preventIOSBounce = true,
  handleKeyboard = true,
  
  // Animation
  animationDuration = 300,
  dampingRatio = 0.8,
  stiffness = 300,
  
  ...rest
}, ref) => {
  // Determine if drawer is controlled or uncontrolled
  const isControlled = open !== undefined;
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  const isOpen = isControlled ? open : internalOpen;

  // Handle open state changes
  const handleOpenChange = React.useCallback((newOpen: boolean) => {
    if (!isControlled) {
      setInternalOpen(newOpen);
    }
    onOpenChange?.(newOpen);
    
    // Trigger callbacks
    if (newOpen && !isOpen) {
      onOpen?.();
      announceToScreenReader('Drawer opened', 'polite');
    } else if (!newOpen && isOpen) {
      onClose?.();
      announceToScreenReader('Drawer closed', 'polite');
    }
  }, [isControlled, onOpenChange, onOpen, onClose, isOpen]);

  // Convert snap points to numeric values
  const numericSnapPoints = React.useMemo(() => {
    return snapPoints.map((point, index) => {
      if (typeof point === 'number') return point;
      if (typeof point === 'string' && point.endsWith('%')) {
        const percentage = parseFloat(point);
        const containerSize = direction === 'bottom' || direction === 'top' 
          ? window.innerHeight 
          : window.innerWidth;
        return (percentage / 100) * containerSize;
      }
      return index * 100; // Fallback
    });
  }, [snapPoints, direction]);

  const currentSnapPoint = numericSnapPoints[defaultSnapPoint] || numericSnapPoints[0] || 0;

  // Scroll lock for modal behavior
  useScrollLock({
    enabled: isOpen && modal,
    reserveScrollBarGap: true
  });

  // Focus lock for accessibility
  const { lockRef } = useFocusLock({
    enabled: isOpen && modal,
    autoFocus: true,
    restoreFocus: true,
    onEscape: closeOnEscape ? () => handleOpenChange(false) : undefined
  });

  // Handle escape key
  useEffect(() => {
    if (!closeOnEscape || !isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        handleOpenChange(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [closeOnEscape, isOpen, handleOpenChange]);

  // Determine container for portal
  const portalContainer = container || (typeof document !== 'undefined' ? document.body : null);

  const drawerContent = (
    <DrawerProvider
      direction={direction}
      snapPoints={numericSnapPoints}
      currentSnapPoint={currentSnapPoint}
      isOpen={isOpen}
      dismissible={dismissible}
      closeOnOutsideClick={closeOnOutsideClick}
      alwaysOn={alwaysOn}
      modal={modal}
      onOpenChange={handleOpenChange}
      onSnap={onSnap}
      onDrag={onDrag}
    >
      <div
        ref={lockRef}
        className={cn(
          'ios-drawer-root',
          'fixed inset-0 z-50',
          {
            'pointer-events-none': !isOpen,
            'pointer-events-auto': isOpen
          },
          className
        )}
        role="dialog"
        aria-modal={modal}
        aria-hidden={!isOpen}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-describedby={ariaDescribedBy}
        {...rest}
      >
        {children}
      </div>
    </DrawerProvider>
  );

  // Render directly if not modal or no portal container
  if (!modal || !portalContainer) {
    return drawerContent;
  }

  // Render in portal for modal behavior
  return createPortal(drawerContent, portalContainer);
});

Drawer.displayName = 'Drawer';