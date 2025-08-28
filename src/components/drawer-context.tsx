import React, { createContext, useContext, useRef, useState, useCallback, useEffect } from 'react';
import { DrawerContextValue, DrawerDirection, SnapPoint, SafeAreaInsets } from '../types';
import { generateId } from '../lib/drawer-accessibility';
import { getSafeAreaInsets, initializeIOSFixes } from '../lib/ios-drawer-fixes';
import { useKeyboardHeight } from '../hooks/use-keyboard-height';

const DrawerContext = createContext<DrawerContextValue | null>(null);

export interface DrawerProviderProps {
  children: React.ReactNode;
  direction: DrawerDirection;
  snapPoints: SnapPoint[];
  currentSnapPoint: number;
  isOpen: boolean;
  dismissible: boolean;
  closeOnOutsideClick: boolean;
  alwaysOn: boolean;
  modal: boolean;
  onOpenChange?: (open: boolean) => void;
  onSnap?: (point: number, snapPointIndex: number) => void;
  onDrag?: (position: number, percentage: number) => void;
}

export function DrawerProvider({
  children,
  direction,
  snapPoints,
  currentSnapPoint,
  isOpen,
  dismissible,
  closeOnOutsideClick,
  alwaysOn,
  modal,
  onOpenChange,
  onSnap,
  onDrag
}: DrawerProviderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [currentSnap, setCurrentSnap] = useState(currentSnapPoint);
  const [safeAreaInsets, setSafeAreaInsets] = useState<SafeAreaInsets>({ top: 0, bottom: 0, left: 0, right: 0 });
  
  const contentRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Generate unique ID for this drawer instance
  const drawerId = useRef(generateId('drawer'));

  // Handle keyboard height for iOS
  const { keyboardHeight } = useKeyboardHeight({
    enabled: isOpen && direction === 'bottom'
  });

  // Initialize iOS fixes
  useEffect(() => {
    const cleanup = initializeIOSFixes();
    setSafeAreaInsets(getSafeAreaInsets());
    return cleanup;
  }, []);

  // Update safe area insets on orientation change
  useEffect(() => {
    const updateSafeAreas = () => {
      setSafeAreaInsets(getSafeAreaInsets());
    };

    if (screen.orientation) {
      screen.orientation.addEventListener('change', updateSafeAreas);
      return () => screen.orientation.removeEventListener('change', updateSafeAreas);
    } else {
      window.addEventListener('orientationchange', updateSafeAreas);
      return () => window.removeEventListener('orientationchange', updateSafeAreas);
    }
  }, []);

  // Convert SnapPoint[] to number[] for calculations
  const numericSnapPoints = snapPoints.map((point, index) => {
    if (typeof point === 'number') return point;
    if (typeof point === 'string' && point.endsWith('%')) {
      const percentage = parseFloat(point);
      // Calculate percentage based on viewport or container size
      const containerSize = direction === 'bottom' || direction === 'top' 
        ? window.innerHeight 
        : window.innerWidth;
      return (percentage / 100) * containerSize;
    }
    if (point === 'dynamic') {
      // For dynamic snap points, we'll calculate based on content height
      if (contentRef.current) {
        return contentRef.current.scrollHeight;
      }
    }
    return index * 100; // Fallback
  });

  const setIsOpen = useCallback((open: boolean) => {
    onOpenChange?.(open);
  }, [onOpenChange]);

  const setCurrentSnapPoint = useCallback((point: number) => {
    setCurrentSnap(point);
    const snapIndex = numericSnapPoints.indexOf(point);
    onSnap?.(point, snapIndex);
  }, [numericSnapPoints, onSnap]);

  // Gesture handlers (will be implemented by useDrawerGesture hook)
  const onPointerDown = useCallback((event: PointerEvent) => {
    setIsDragging(true);
  }, []);

  const onPointerMove = useCallback((event: PointerEvent) => {
    // Gesture handling will be implemented in the gesture hook
  }, []);

  const onPointerUp = useCallback((event: PointerEvent) => {
    setIsDragging(false);
  }, []);

  const contextValue: DrawerContextValue = {
    isOpen,
    direction,
    snapPoints: numericSnapPoints,
    currentSnapPoint: currentSnap,
    isDragging,
    setIsOpen,
    setCurrentSnapPoint,
    contentRef,
    overlayRef,
    handleRef,
    containerRef,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onOpenChange,
    onSnap,
    onDrag,
    dismissible,
    closeOnOutsideClick,
    alwaysOn,
    modal,
    keyboardHeight,
    safeAreaInsets
  };

  return (
    <DrawerContext.Provider value={contextValue}>
      {children}
    </DrawerContext.Provider>
  );
}

export function useDrawerContext(): DrawerContextValue {
  const context = useContext(DrawerContext);
  if (!context) {
    throw new Error('useDrawerContext must be used within a DrawerProvider');
  }
  return context;
}

export { DrawerContext };