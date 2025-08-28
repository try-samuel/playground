import React, { forwardRef } from 'react';
import { DrawerTriggerProps } from '../types';
import { cn } from '../lib/cn';
import { useDrawerContext } from './drawer-context';
import { getTriggerAriaAttributes } from '../lib/drawer-accessibility';

export const DrawerTrigger = forwardRef<HTMLButtonElement, DrawerTriggerProps>(({
  children,
  className,
  asChild = false,
  onClick,
  ...rest
}, ref) => {
  const { isOpen, setIsOpen } = useDrawerContext();

  const handleClick = React.useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsOpen(!isOpen);
    onClick?.(event);
  }, [isOpen, setIsOpen, onClick]);

  const ariaAttributes = getTriggerAriaAttributes(isOpen, 'drawer-content');

  if (asChild) {
    return React.cloneElement(
      React.Children.only(children as React.ReactElement),
      {
        ref,
        onClick: handleClick,
        className: cn(className, children?.props?.className),
        ...ariaAttributes,
        ...rest
      }
    );
  }

  return (
    <button
      ref={ref}
      type="button"
      className={cn(
        // Base button styles
        'ios-drawer-trigger',
        'inline-flex items-center justify-center',
        'px-4 py-2',
        'text-sm font-medium',
        'transition-colors duration-200',
        'focus:outline-none focus:ring-2 focus:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        
        // Default styling (can be overridden)
        'bg-blue-600 hover:bg-blue-700',
        'text-white',
        'rounded-md',
        'focus:ring-blue-500',
        
        className
      )}
      onClick={handleClick}
      {...ariaAttributes}
      {...rest}
    >
      {children}
    </button>
  );
});

DrawerTrigger.displayName = 'DrawerTrigger';