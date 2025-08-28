import React, { forwardRef } from 'react';
import { DrawerFooterProps } from '../types';
import { cn } from '../lib/cn';

export const DrawerFooter = forwardRef<HTMLDivElement, DrawerFooterProps>(({
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
        'ios-drawer-footer',
        'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
        'p-4 pt-2',
        
        // Border
        'border-t border-gray-200 dark:border-gray-700',
        
        // Background
        'bg-gray-50 dark:bg-gray-800',
        
        // Flex shrink to allow content to scroll
        'flex-shrink-0',
        
        // Safe area handling for iOS
        'pb-safe',
        
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
});

DrawerFooter.displayName = 'DrawerFooter';