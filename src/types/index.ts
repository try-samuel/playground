import { ReactNode, HTMLAttributes, RefObject } from 'react';

export type DrawerDirection = 'bottom' | 'top' | 'left' | 'right';

export type SnapPoint = number | string | 'dynamic';

export interface DrawerState {
  isOpen: boolean;
  isDragging: boolean;
  currentPosition: number;
  currentSnapPoint: number;
  velocity: number;
  direction: DrawerDirection;
}

export interface GestureState {
  isDragging: boolean;
  startY: number;
  startX: number;
  currentY: number;
  currentX: number;
  deltaY: number;
  deltaX: number;
  velocity: number;
  timestamp: number;
}

export interface DrawerProps {
  // Core state management
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  
  // Positioning & behavior
  direction?: DrawerDirection;
  snapPoints?: SnapPoint[];
  defaultSnapPoint?: number;
  alwaysOn?: boolean;
  modal?: boolean;
  
  // Interaction
  dismissible?: boolean;
  closeOnOutsideClick?: boolean;
  closeOnEscape?: boolean;
  dragHandleProps?: Partial<DrawerHandleProps>;
  
  // Callbacks
  onSnap?: (point: number, snapPointIndex: number) => void;
  onDrag?: (position: number, percentage: number) => void;
  onOpen?: () => void;
  onClose?: () => void;
  onDragStart?: () => void;
  onDragEnd?: () => void;
  
  // Styling (Tailwind-friendly)
  className?: string;
  overlayClassName?: string;
  contentClassName?: string;
  
  // Accessibility
  ariaLabel?: string;
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;
  
  // Children
  children?: ReactNode;
  
  // Container
  container?: HTMLElement | null;
  
  // iOS specific
  preventIOSBounce?: boolean;
  handleKeyboard?: boolean;
  
  // Animation
  animationDuration?: number;
  dampingRatio?: number;
  stiffness?: number;
}

export interface DrawerContentProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  className?: string;
  forceMount?: boolean;
  scrollable?: boolean;
  asChild?: boolean;
}

export interface DrawerOverlayProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  asChild?: boolean;
}

export interface DrawerTriggerProps extends HTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  className?: string;
  asChild?: boolean;
}

export interface DrawerHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  className?: string;
  asChild?: boolean;
}

export interface DrawerFooterProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  className?: string;
  asChild?: boolean;
}

export interface DrawerHandleProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  showHandle?: boolean;
  handleClassName?: string;
  asChild?: boolean;
}

export interface PhysicsConfig {
  stiffness: number;
  damping: number;
  mass: number;
  velocity: number;
  precision: number;
}

export interface DrawerContextValue {
  isOpen: boolean;
  direction: DrawerDirection;
  snapPoints: SnapPoint[];
  currentSnapPoint: number;
  isDragging: boolean;
  setIsOpen: (open: boolean) => void;
  setCurrentSnapPoint: (point: number) => void;
  contentRef: RefObject<HTMLDivElement>;
  overlayRef: RefObject<HTMLDivElement>;
  handleRef: RefObject<HTMLDivElement>;
  containerRef: RefObject<HTMLDivElement>;
  
  // Gesture handlers
  onPointerDown: (event: PointerEvent) => void;
  onPointerMove: (event: PointerEvent) => void;
  onPointerUp: (event: PointerEvent) => void;
  
  // Callbacks
  onOpenChange?: (open: boolean) => void;
  onSnap?: (point: number, snapPointIndex: number) => void;
  onDrag?: (position: number, percentage: number) => void;
  
  // Configuration
  dismissible: boolean;
  closeOnOutsideClick: boolean;
  alwaysOn: boolean;
  modal: boolean;
  
  // iOS specific
  keyboardHeight: number;
  safeAreaInsets: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
}

export interface KeyboardState {
  height: number;
  isVisible: boolean;
}

export interface SafeAreaInsets {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

export interface VelocityTracker {
  addPoint: (x: number, y: number, timestamp: number) => void;
  getVelocity: () => { x: number; y: number };
  reset: () => void;
}