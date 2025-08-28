import React, { forwardRef } from 'react';
import { DrawerHandleProps } from '../types';
import { cn } from '../lib/cn';
import { useDrawerContext } from './drawer-context';

export const DrawerHandle = forwardRef<HTMLDivElement, DrawerHandleProps>(({
  className,
  showHandle = true,
  handleClassName,
  asChild = false,
  onPointerDown,
  ...rest
}, ref) => {
  const { handleRef, onPointerDown: contextPointerDown } = useDrawerContext();

  // Merge refs
  const mergedRef = React.useCallback((node: HTMLDivElement | null) => {
    if (handleRef) {
      handleRef.current = node;
    }
    if (typeof ref === 'function') {
      ref(node);
    } else if (ref) {
      ref.current = node;
    }
  }, [ref, handleRef]);

  const handlePointerDown = React.useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    // Convert React PointerEvent to native PointerEvent
    const nativeEvent = event.nativeEvent;
    contextPointerDown(nativeEvent);
    onPointerDown?.(event);
  }, [contextPointerDown, onPointerDown]);

  if (!showHandle) {
    return null;
  }

  if (asChild) {
    return React.cloneElement(
      React.Children.only(rest.children as React.ReactElement),
      {
        ref: mergedRef,
        onPointerDown: handlePointerDown,
        className: cn(className, rest.children?.props?.className)
      }
    );
  }

  return (
    <div
      ref={mergedRef}
      className={cn(
        // Base container styles
        'ios-drawer-handle-container',
        'flex items-center justify-center',
        'w-full py-3',
        'cursor-grab active:cursor-grabbing',
        'touch-none select-none',
        
        // Focus styles
        'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
        
        className
      )}
      onPointerDown={handlePointerDown}
      role="slider"
      aria-label="Resize drawer"
      tabIndex={0}
      {...rest}
    >
      <div
        className={cn(
          // Handle bar styles
          'ios-drawer-handle',
          'w-12 h-1.5',
          'bg-gray-300 dark:bg-gray-600',
          'rounded-full',
          'transition-colors duration-200',
          
          // Interactive states
          'group-hover:bg-gray-400 dark:group-hover:bg-gray-500',
          'group-active:bg-gray-500 dark:group-active:bg-gray-400',
          
          handleClassName
        )}
      />
    </div>
  );
});

DrawerHandle.displayName = 'DrawerHandle';