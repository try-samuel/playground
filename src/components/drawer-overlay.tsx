import React, { forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DrawerOverlayProps } from '../types';
import { cn } from '../lib/cn';
import { useDrawerContext } from './drawer-context';

export const DrawerOverlay = forwardRef<HTMLDivElement, DrawerOverlayProps>(({
  className,
  asChild = false,
  onClick,
  ...rest
}, ref) => {
  const {
    isOpen,
    closeOnOutsideClick,
    setIsOpen,
    overlayRef,
    modal
  } = useDrawerContext();

  const handleClick = React.useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    // Only handle clicks on the overlay itself, not on children
    if (event.target === event.currentTarget && closeOnOutsideClick) {
      setIsOpen(false);
    }
    onClick?.(event);
  }, [closeOnOutsideClick, setIsOpen, onClick]);

  const overlayVariants = {
    hidden: {
      opacity: 0,
      transition: {
        duration: 0.2,
        ease: 'easeInOut'
      }
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.2,
        ease: 'easeInOut'
      }
    }
  };

  // Don't render overlay if not modal
  if (!modal) {
    return null;
  }

  if (asChild) {
    return React.cloneElement(
      React.Children.only(rest.children as React.ReactElement),
      {
        ref: overlayRef,
        onClick: handleClick,
        className: cn(className, rest.children?.props?.className)
      }
    );
  }

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          ref={overlayRef}
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className={cn(
            // Base styles
            'ios-drawer-overlay',
            'fixed inset-0 z-40',
            'bg-black/50 backdrop-blur-sm',
            'touch-none select-none',
            // Ensure overlay covers everything
            'ios-drawer-prevent-bounce',
            className
          )}
          onClick={handleClick}
          aria-hidden="true"
          {...rest}
        />
      )}
    </AnimatePresence>
  );
});

DrawerOverlay.displayName = 'DrawerOverlay';