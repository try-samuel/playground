import React, { forwardRef, useEffect } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { DrawerContentProps } from '../types';
import { cn } from '../lib/cn';
import { useDrawerContext } from './drawer-context';
import { useDrawerGesture } from '../hooks/use-drawer-gesture';
import { useDrawerAnimation } from '../hooks/use-drawer-animation';
import { preventIOSBounce } from '../lib/ios-drawer-fixes';

export const DrawerContent = forwardRef<HTMLDivElement, DrawerContentProps>(({
  children,
  className,
  forceMount = false,
  scrollable = true,
  asChild = false,
  ...rest
}, ref) => {
  const {
    isOpen,
    direction,
    snapPoints,
    currentSnapPoint,
    isDragging,
    contentRef,
    keyboardHeight,
    safeAreaInsets,
    onDrag,
    onSnap,
    setIsOpen,
    setCurrentSnapPoint
  } = useDrawerContext();

  // Merge refs
  const mergedRef = React.useCallback((node: HTMLDivElement | null) => {
    if (contentRef) {
      contentRef.current = node;
    }
    if (typeof ref === 'function') {
      ref(node);
    } else if (ref) {
      ref.current = node;
    }
  }, [ref, contentRef]);

  // Calculate container size for gestures
  const containerSize = React.useMemo(() => {
    if (direction === 'bottom' || direction === 'top') {
      return window.innerHeight - keyboardHeight - safeAreaInsets.top - safeAreaInsets.bottom;
    }
    return window.innerWidth - safeAreaInsets.left - safeAreaInsets.right;
  }, [direction, keyboardHeight, safeAreaInsets]);

  // Gesture handling
  const {
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    currentPosition
  } = useDrawerGesture({
    direction,
    snapPoints,
    currentSnapPoint,
    containerSize,
    isOpen,
    dismissible: true,
    onDrag,
    onSnap: (point, index) => {
      setCurrentSnapPoint(point);
      onSnap?.(point, index);
    },
    onOpenChange: setIsOpen
  });

  // Animation handling
  const { position, animateToPosition, setPosition } = useDrawerAnimation({
    direction,
    snapPoints,
    currentSnapPoint,
    isOpen,
    isDragging
  });

  // Update position when gesture changes
  useEffect(() => {
    if (isDragging) {
      setPosition(currentPosition);
    } else {
      animateToPosition(currentSnapPoint);
    }
  }, [isDragging, currentPosition, currentSnapPoint, setPosition, animateToPosition]);

  // Calculate transform based on direction
  const getTransform = () => {
    const pos = position.get ? position.get() : currentSnapPoint;
    
    switch (direction) {
      case 'bottom':
        return `translateY(${Math.max(0, containerSize - pos)}px)`;
      case 'top':
        return `translateY(${Math.min(0, pos - containerSize)}px)`;
      case 'left':
        return `translateX(${Math.min(0, pos - containerSize)}px)`;
      case 'right':
        return `translateX(${Math.max(0, containerSize - pos)}px)`;
      default:
        return 'none';
    }
  };

  // Handle iOS bounce prevention
  useEffect(() => {
    if (!contentRef.current) return;
    
    const cleanup = preventIOSBounce(contentRef.current);
    return cleanup;
  }, [contentRef]);

  // Animation variants
  const contentVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      ...getInitialTransform()
    },
    visible: {
      opacity: 1,
      scale: 1,
      ...getVisibleTransform()
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      ...getExitTransform()
    }
  };

  function getInitialTransform() {
    switch (direction) {
      case 'bottom':
        return { y: '100%' };
      case 'top':
        return { y: '-100%' };
      case 'left':
        return { x: '-100%' };
      case 'right':
        return { x: '100%' };
      default:
        return {};
    }
  }

  function getVisibleTransform() {
    return { x: 0, y: 0 };
  }

  function getExitTransform() {
    return getInitialTransform();
  }

  // Handle pan gestures
  const handlePan = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (!isDragging) return;
    
    const delta = direction === 'bottom' || direction === 'top' ? info.delta.y : info.delta.x;
    const offset = direction === 'bottom' || direction === 'right' ? -delta : delta;
    
    const newPosition = Math.max(0, Math.min(containerSize, currentPosition + offset));
    setPosition(newPosition);
    
    const percentage = (newPosition / containerSize) * 100;
    onDrag?.(newPosition, percentage);
  };

  const handlePanEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const velocity = direction === 'bottom' || direction === 'top' ? info.velocity.y : info.velocity.x;
    handlePointerUp({ ...event, clientX: info.point.x, clientY: info.point.y } as PointerEvent);
  };

  if (!forceMount && !isOpen) {
    return null;
  }

  const baseClasses = cn(
    // Base styles
    'ios-drawer-content',
    'fixed z-50',
    'flex flex-col',
    'bg-white dark:bg-gray-900',
    'shadow-lg',
    'touch-none select-none',
    
    // Border radius based on direction
    {
      'rounded-t-xl': direction === 'bottom',
      'rounded-b-xl': direction === 'top',
      'rounded-r-xl': direction === 'left',
      'rounded-l-xl': direction === 'right'
    },
    
    // Position based on direction
    {
      'bottom-0 left-0 right-0': direction === 'bottom',
      'top-0 left-0 right-0': direction === 'top',
      'left-0 top-0 bottom-0': direction === 'left',
      'right-0 top-0 bottom-0': direction === 'right'
    },
    
    // Size constraints
    {
      'max-h-[90vh]': direction === 'bottom' || direction === 'top',
      'max-w-[90vw]': direction === 'left' || direction === 'right'
    },
    
    // Scrollable content
    {
      'overflow-hidden': !scrollable,
      'overflow-y-auto': scrollable && (direction === 'bottom' || direction === 'top'),
      'overflow-x-auto': scrollable && (direction === 'left' || direction === 'right')
    },
    
    // iOS specific
    'ios-drawer-prevent-bounce',
    
    className
  );

  if (asChild) {
    return React.cloneElement(
      React.Children.only(children as React.ReactElement),
      {
        ref: mergedRef,
        className: cn(baseClasses, children?.props?.className),
        onPointerDown: handlePointerDown,
        onPointerMove: handlePointerMove,
        onPointerUp: handlePointerUp,
        style: {
          transform: getTransform(),
          ...children?.props?.style
        }
      }
    );
  }

  return (
    <AnimatePresence mode="wait">
      {(forceMount || isOpen) && (
        <motion.div
          ref={mergedRef}
          variants={contentVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className={baseClasses}
          drag={direction === 'bottom' || direction === 'top' ? 'y' : 'x'}
          dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
          dragElastic={0.1}
          dragMomentum={false}
          onPan={handlePan}
          onPanEnd={handlePanEnd}
          style={{
            transform: isDragging ? getTransform() : undefined,
            paddingBottom: direction === 'bottom' ? `${keyboardHeight + safeAreaInsets.bottom}px` : undefined,
            paddingTop: direction === 'top' ? `${safeAreaInsets.top}px` : undefined,
            paddingLeft: direction === 'left' ? `${safeAreaInsets.left}px` : undefined,
            paddingRight: direction === 'right' ? `${safeAreaInsets.right}px` : undefined
          }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 30,
            mass: 1
          }}
          {...rest}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
});

DrawerContent.displayName = 'DrawerContent';