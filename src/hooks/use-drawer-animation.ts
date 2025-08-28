import { useCallback, useRef } from 'react';
import { useSpring, useMotionValue, useTransform, animate } from 'framer-motion';
import { drawerPhysics, SpringConfig } from '../lib/drawer-physics';
import { DrawerDirection } from '../types';

export interface UseDrawerAnimationProps {
  direction: DrawerDirection;
  snapPoints: number[];
  currentSnapPoint: number;
  isOpen: boolean;
  isDragging: boolean;
  animationDuration?: number;
  springConfig?: SpringConfig;
  onAnimationComplete?: () => void;
}

export interface UseDrawerAnimationReturn {
  position: any; // MotionValue<number>
  opacity: any; // MotionValue<number>
  scale: any; // MotionValue<number>
  animateToPosition: (targetPosition: number, options?: { duration?: number; ease?: string }) => Promise<void>;
  animateToSnapPoint: (snapPointIndex: number) => Promise<void>;
  setPosition: (position: number) => void;
  getPosition: () => number;
  stopAnimation: () => void;
  resetAnimation: () => void;
}

export function useDrawerAnimation({
  direction,
  snapPoints,
  currentSnapPoint,
  isOpen,
  isDragging,
  animationDuration = 300,
  springConfig = drawerPhysics.smooth,
  onAnimationComplete
}: UseDrawerAnimationProps): UseDrawerAnimationReturn {
  const position = useMotionValue(currentSnapPoint);
  const animationRef = useRef<any>(null);
  
  const isVertical = direction === 'top' || direction === 'bottom';
  const isReversed = direction === 'top' || direction === 'left';

  // Create opacity based on position and open state
  const opacity = useTransform(
    position,
    [Math.min(...snapPoints), Math.max(...snapPoints)],
    [0, 1]
  );

  // Create scale effect for smooth entry/exit
  const scale = useTransform(
    position,
    [Math.min(...snapPoints), Math.max(...snapPoints)],
    [0.95, 1]
  );

  // Stop any running animation
  const stopAnimation = useCallback(() => {
    if (animationRef.current) {
      animationRef.current.stop();
      animationRef.current = null;
    }
  }, []);

  // Animate to a specific position
  const animateToPosition = useCallback(async (
    targetPosition: number,
    options: { duration?: number; ease?: string } = {}
  ): Promise<void> => {
    stopAnimation();

    const {
      duration = animationDuration,
      ease = 'easeOut'
    } = options;

    return new Promise((resolve) => {
      animationRef.current = animate(position, targetPosition, {
        duration: duration / 1000, // Convert to seconds
        ease,
        onComplete: () => {
          animationRef.current = null;
          onAnimationComplete?.();
          resolve();
        }
      });
    });
  }, [position, animationDuration, stopAnimation, onAnimationComplete]);

  // Animate to a snap point by index
  const animateToSnapPoint = useCallback(async (snapPointIndex: number): Promise<void> => {
    if (snapPointIndex < 0 || snapPointIndex >= snapPoints.length) {
      return;
    }

    const targetPosition = snapPoints[snapPointIndex];
    return animateToPosition(targetPosition);
  }, [snapPoints, animateToPosition]);

  // Set position immediately without animation
  const setPosition = useCallback((newPosition: number) => {
    stopAnimation();
    position.set(newPosition);
  }, [position, stopAnimation]);

  // Get current position value
  const getPosition = useCallback(() => {
    return position.get();
  }, [position]);

  // Reset animation to initial state
  const resetAnimation = useCallback(() => {
    stopAnimation();
    const initialPosition = isOpen ? currentSnapPoint : Math.min(...snapPoints);
    position.set(initialPosition);
  }, [position, isOpen, currentSnapPoint, snapPoints, stopAnimation]);

  // Advanced spring animation using physics config
  const animateWithSpring = useCallback(async (
    targetPosition: number,
    config: SpringConfig = springConfig
  ): Promise<void> => {
    stopAnimation();

    return new Promise((resolve) => {
      animationRef.current = animate(position, targetPosition, {
        type: 'spring',
        stiffness: config.stiffness,
        damping: config.damping,
        mass: config.mass,
        onComplete: () => {
          animationRef.current = null;
          onAnimationComplete?.();
          resolve();
        }
      });
    });
  }, [position, springConfig, stopAnimation, onAnimationComplete]);

  // Enhanced animation methods
  const enhancedReturn = {
    position,
    opacity,
    scale,
    animateToPosition,
    animateToSnapPoint,
    setPosition,
    getPosition,
    stopAnimation,
    resetAnimation,
    // Additional methods for advanced usage
    animateWithSpring,
    // Transform values for different directions
    x: isVertical ? useMotionValue(0) : position,
    y: isVertical ? position : useMotionValue(0),
    // Rotation for advanced effects
    rotate: useTransform(position, [Math.min(...snapPoints), Math.max(...snapPoints)], [0, 0]),
  };

  return enhancedReturn;
}

// Hook for coordinating multiple animations
export function useCoordinatedAnimation() {
  const animations = useRef<Array<UseDrawerAnimationReturn>>([]);

  const registerAnimation = useCallback((animation: UseDrawerAnimationReturn) => {
    animations.current.push(animation);
    return () => {
      const index = animations.current.indexOf(animation);
      if (index > -1) {
        animations.current.splice(index, 1);
      }
    };
  }, []);

  const animateAll = useCallback(async (
    targetPositions: number[],
    options?: { duration?: number; ease?: string }
  ) => {
    const promises = animations.current.map((animation, index) => {
      const targetPosition = targetPositions[index] ?? animation.getPosition();
      return animation.animateToPosition(targetPosition, options);
    });

    return Promise.all(promises);
  }, []);

  const stopAll = useCallback(() => {
    animations.current.forEach(animation => animation.stopAnimation());
  }, []);

  const resetAll = useCallback(() => {
    animations.current.forEach(animation => animation.resetAnimation());
  }, []);

  return {
    registerAnimation,
    animateAll,
    stopAll,
    resetAll
  };
}

// Hook for sequence animations
export function useSequenceAnimation() {
  const runSequence = useCallback(async (
    steps: Array<{
      animation: UseDrawerAnimationReturn;
      targetPosition: number;
      options?: { duration?: number; ease?: string };
      delay?: number;
    }>
  ) => {
    for (const step of steps) {
      if (step.delay) {
        await new Promise(resolve => setTimeout(resolve, step.delay));
      }
      await step.animation.animateToPosition(step.targetPosition, step.options);
    }
  }, []);

  return { runSequence };
}

// Hook for gesture-responsive animations
export function useGestureAnimation(
  baseAnimation: UseDrawerAnimationReturn,
  gestureVelocity: number,
  direction: DrawerDirection
) {
  const isVertical = direction === 'top' || direction === 'bottom';
  
  const animateWithVelocity = useCallback(async (
    targetPosition: number,
    options?: { minDuration?: number; maxDuration?: number }
  ) => {
    const {
      minDuration = 150,
      maxDuration = 500
    } = options || {};

    // Calculate duration based on velocity
    const velocityMagnitude = Math.abs(gestureVelocity);
    const velocityFactor = Math.min(velocityMagnitude / 1000, 1); // Normalize to 0-1
    const duration = maxDuration - (velocityFactor * (maxDuration - minDuration));

    return baseAnimation.animateToPosition(targetPosition, {
      duration,
      ease: velocityMagnitude > 500 ? 'easeOut' : 'easeInOut'
    });
  }, [baseAnimation, gestureVelocity]);

  return { animateWithVelocity };
}