import React, { forwardRef } from 'react';
import { DrawerHeaderProps } from '../types';
import { cn } from '../lib/cn';

export const DrawerHeader = forwardRef<HTMLDivElement, DrawerHeaderProps>(({
  children,
  className,
  asChild = false,
  ...rest
}, ref) => {
  if (asChild) {
    return React.cloneElement(
      React.Children.only(children as React.ReactElement),
      {
        ref,
        className: cn(className, children?.props?.className),
        ...rest
      }
    );
  }

  return (
    <div
      ref={ref}
      className={cn(
        // Base styles
        'ios-drawer-header',
        'flex flex-col space-y-1.5',
        'p-4 pb-2',
        'text-center sm:text-left',
        
        // Typography
        'text-lg font-semibold',
        'text-gray-900 dark:text-gray-100',
        
        // Border
        'border-b border-gray-200 dark:border-gray-700',
        
        // Flex shrink to allow content to scroll
        'flex-shrink-0',
        
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
});

DrawerHeader.displayName = 'DrawerHeader';