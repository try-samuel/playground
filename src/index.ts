// Main export file for the iOS Drawer component
export { Drawer } from './components/drawer';
export { DrawerContent } from './components/drawer-content';
export { DrawerOverlay } from './components/drawer-overlay';
export { DrawerTrigger } from './components/drawer-trigger';
export { DrawerHeader } from './components/drawer-header';
export { DrawerFooter } from './components/drawer-footer';
export { DrawerHandle } from './components/drawer-handle';

// Export hooks for advanced usage
export { useDrawerGesture } from './hooks/use-drawer-gesture';
export { useDrawerAnimation } from './hooks/use-drawer-animation';
export { useKeyboardHeight } from './hooks/use-keyboard-height';
export { useFocusLock } from './hooks/use-focus-lock';
export { useScrollLock } from './hooks/use-scroll-lock';

// Export types
export type {
  DrawerProps,
  DrawerContentProps,
  DrawerOverlayProps,
  DrawerTriggerProps,
  DrawerHeaderProps,
  DrawerFooterProps,
  DrawerHandleProps,
  SnapPoint,
  DrawerDirection,
  GestureState,
  DrawerState
} from './types';

// Export utilities
export { cn } from './lib/cn';
export { drawerPhysics } from './lib/drawer-physics';

// Import styles (consumers can import this separately if needed)
import './styles/drawer.css';