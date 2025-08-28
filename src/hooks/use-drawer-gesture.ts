import { useCallback, useRef, useState, useEffect } from 'react';
import { VelocityTracker, calculateSnapPoint, calculateResistance } from '../lib/drawer-physics';
import { DrawerDirection, GestureState } from '../types';

export interface UseDrawerGestureProps {
  direction: DrawerDirection;
  snapPoints: number[];
  currentSnapPoint: number;
  containerSize: number;
  isOpen: boolean;
  dismissible: boolean;
  onDragStart?: () => void;
  onDragEnd?: () => void;
  onDrag?: (position: number, percentage: number) => void;
  onSnap?: (point: number, snapPointIndex: number) => void;
  onOpenChange?: (open: boolean) => void;
  resistance?: number;
  velocityThreshold?: number;
}

export interface UseDrawerGestureReturn {
  isDragging: boolean;
  currentPosition: number;
  velocity: number;
  gestureState: GestureState;
  handlePointerDown: (event: PointerEvent) => void;
  handlePointerMove: (event: PointerEvent) => void;
  handlePointerUp: (event: PointerEvent) => void;
  resetGesture: () => void;
}

export function useDrawerGesture({
  direction,
  snapPoints,
  currentSnapPoint,
  containerSize,
  isOpen,
  dismissible,
  onDragStart,
  onDragEnd,
  onDrag,
  onSnap,
  onOpenChange,
  resistance = 0.3,
  velocityThreshold = 500
}: UseDrawerGestureProps): UseDrawerGestureReturn {
  const [isDragging, setIsDragging] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(currentSnapPoint);
  const [velocity, setVelocity] = useState(0);
  
  const velocityTracker = useRef(new VelocityTracker());
  const gestureStateRef = useRef<GestureState>({
    isDragging: false,
    startY: 0,
    startX: 0,
    currentY: 0,
    currentX: 0,
    deltaY: 0,
    deltaX: 0,
    velocity: 0,
    timestamp: 0
  });

  const isVertical = direction === 'top' || direction === 'bottom';
  const isReversed = direction === 'top' || direction === 'left';

  // Reset gesture state
  const resetGesture = useCallback(() => {
    setIsDragging(false);
    setVelocity(0);
    velocityTracker.current.reset();
    gestureStateRef.current = {
      isDragging: false,
      startY: 0,
      startX: 0,
      currentY: 0,
      currentX: 0,
      deltaY: 0,
      deltaX: 0,
      velocity: 0,
      timestamp: 0
    };
  }, []);

  // Handle pointer down
  const handlePointerDown = useCallback((event: PointerEvent) => {
    if (!isOpen && !dismissible) return;

    const element = event.currentTarget as HTMLElement;
    element.setPointerCapture(event.pointerId);

    const timestamp = Date.now();
    const x = event.clientX;
    const y = event.clientY;

    gestureStateRef.current = {
      isDragging: true,
      startY: y,
      startX: x,
      currentY: y,
      currentX: x,
      deltaY: 0,
      deltaX: 0,
      velocity: 0,
      timestamp
    };

    velocityTracker.current.reset();
    velocityTracker.current.addPoint(x, y, timestamp);

    setIsDragging(true);
    onDragStart?.();
  }, [isOpen, dismissible, onDragStart]);

  // Handle pointer move
  const handlePointerMove = useCallback((event: PointerEvent) => {
    if (!gestureStateRef.current.isDragging) return;

    const timestamp = Date.now();
    const x = event.clientX;
    const y = event.clientY;

    const deltaX = x - gestureStateRef.current.startX;
    const deltaY = y - gestureStateRef.current.startY;

    // Determine primary axis and delta
    const primaryDelta = isVertical ? deltaY : deltaX;
    const adjustedDelta = isReversed ? -primaryDelta : primaryDelta;

    // Calculate new position
    let newPosition = currentSnapPoint + adjustedDelta;

    // Apply resistance at boundaries
    const maxPosition = Math.max(...snapPoints);
    const minPosition = Math.min(...snapPoints);

    if (newPosition < minPosition || newPosition > maxPosition) {
      newPosition = calculateResistance(newPosition, maxPosition, resistance);
    }

    // Update gesture state
    gestureStateRef.current = {
      ...gestureStateRef.current,
      currentX: x,
      currentY: y,
      deltaX,
      deltaY,
      timestamp
    };

    // Track velocity
    velocityTracker.current.addPoint(x, y, timestamp);
    const velocityData = velocityTracker.current.getVelocity();
    const currentVelocity = isVertical ? velocityData.y : velocityData.x;

    setCurrentPosition(newPosition);
    setVelocity(currentVelocity);

    // Calculate percentage based on container size
    const percentage = containerSize > 0 ? Math.abs(newPosition / containerSize) * 100 : 0;
    
    onDrag?.(newPosition, percentage);
  }, [
    currentSnapPoint,
    snapPoints,
    isVertical,
    isReversed,
    resistance,
    containerSize,
    onDrag
  ]);

  // Handle pointer up
  const handlePointerUp = useCallback((event: PointerEvent) => {
    if (!gestureStateRef.current.isDragging) return;

    const element = event.currentTarget as HTMLElement;
    element.releasePointerCapture(event.pointerId);

    const finalVelocity = velocity;
    const finalPosition = currentPosition;

    // Calculate snap point
    const targetSnapPoint = calculateSnapPoint(
      finalPosition,
      isReversed ? -finalVelocity : finalVelocity,
      snapPoints,
      0.3,
      velocityThreshold
    );

    const snapPointIndex = snapPoints.indexOf(targetSnapPoint);

    // Determine if drawer should close
    const shouldClose = dismissible && 
      (targetSnapPoint === Math.min(...snapPoints) && 
       Math.abs(finalVelocity) > velocityThreshold * 0.5);

    if (shouldClose) {
      onOpenChange?.(false);
    } else {
      onSnap?.(targetSnapPoint, snapPointIndex);
    }

    onDragEnd?.();
    resetGesture();
  }, [
    velocity,
    currentPosition,
    snapPoints,
    isReversed,
    velocityThreshold,
    dismissible,
    onSnap,
    onOpenChange,
    onDragEnd,
    resetGesture
  ]);

  // Update current position when snap point changes externally
  useEffect(() => {
    if (!isDragging) {
      setCurrentPosition(currentSnapPoint);
    }
  }, [currentSnapPoint, isDragging]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isDragging) {
        resetGesture();
        onSnap?.(currentSnapPoint, snapPoints.indexOf(currentSnapPoint));
      }
    };

    if (isDragging) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isDragging, currentSnapPoint, snapPoints, onSnap, resetGesture]);

  return {
    isDragging,
    currentPosition,
    velocity,
    gestureState: gestureStateRef.current,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    resetGesture
  };
}