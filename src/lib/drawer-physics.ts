import { PhysicsConfig } from '../types';

/**
 * Physics calculations for drawer animations and gestures
 * Implements spring physics and velocity-based interactions
 */

export interface SpringConfig {
  stiffness: number;
  damping: number;
  mass: number;
  precision: number;
}

export interface SpringState {
  position: number;
  velocity: number;
  target: number;
}

export class VelocityTracker {
  private points: Array<{ x: number; y: number; timestamp: number }> = [];
  private maxPoints = 5;
  private maxAge = 100; // ms

  addPoint(x: number, y: number, timestamp: number): void {
    // Remove old points
    this.points = this.points.filter(point => timestamp - point.timestamp <= this.maxAge);
    
    // Add new point
    this.points.push({ x, y, timestamp });
    
    // Keep only the most recent points
    if (this.points.length > this.maxPoints) {
      this.points = this.points.slice(-this.maxPoints);
    }
  }

  getVelocity(): { x: number; y: number } {
    if (this.points.length < 2) {
      return { x: 0, y: 0 };
    }

    const first = this.points[0];
    const last = this.points[this.points.length - 1];
    
    const timeDelta = last.timestamp - first.timestamp;
    
    if (timeDelta === 0) {
      return { x: 0, y: 0 };
    }

    const velocityX = (last.x - first.x) / timeDelta * 1000; // px/s
    const velocityY = (last.y - first.y) / timeDelta * 1000; // px/s

    return { x: velocityX, y: velocityY };
  }

  reset(): void {
    this.points = [];
  }
}

/**
 * Calculate spring animation step
 */
export function springStep(
  state: SpringState,
  config: SpringConfig,
  deltaTime: number
): SpringState {
  const { position, velocity, target } = state;
  const { stiffness, damping, mass } = config;

  const springForce = -stiffness * (position - target);
  const dampingForce = -damping * velocity;
  
  const acceleration = (springForce + dampingForce) / mass;
  
  const newVelocity = velocity + acceleration * deltaTime;
  const newPosition = position + newVelocity * deltaTime;

  return {
    position: newPosition,
    velocity: newVelocity,
    target
  };
}

/**
 * Check if spring animation has settled
 */
export function isSpringSettled(
  state: SpringState,
  config: SpringConfig
): boolean {
  const { position, velocity, target } = state;
  const { precision } = config;
  
  return Math.abs(position - target) < precision && Math.abs(velocity) < precision;
}

/**
 * Calculate snap point based on current position and velocity
 */
export function calculateSnapPoint(
  currentPosition: number,
  velocity: number,
  snapPoints: number[],
  threshold: number = 0.3,
  velocityThreshold: number = 500
): number {
  if (snapPoints.length === 0) return currentPosition;

  // Strong velocity should override position-based snapping
  if (Math.abs(velocity) > velocityThreshold) {
    const direction = velocity > 0 ? 1 : -1;
    const currentIndex = snapPoints.findIndex(point => Math.abs(point - currentPosition) < 10);
    
    if (currentIndex !== -1) {
      const nextIndex = currentIndex + direction;
      if (nextIndex >= 0 && nextIndex < snapPoints.length) {
        return snapPoints[nextIndex];
      }
    }
  }

  // Find the closest snap points
  const sortedPoints = [...snapPoints].sort((a, b) => a - b);
  let closestPoint = sortedPoints[0];
  let minDistance = Math.abs(currentPosition - closestPoint);

  for (const point of sortedPoints) {
    const distance = Math.abs(currentPosition - point);
    if (distance < minDistance) {
      minDistance = distance;
      closestPoint = point;
    }
  }

  // Check if we should snap to adjacent points based on threshold
  const currentIndex = sortedPoints.indexOf(closestPoint);
  const totalHeight = Math.max(...sortedPoints) - Math.min(...sortedPoints);
  const relativeThreshold = totalHeight * threshold;

  // If we're close enough and moving in a direction, prefer that direction
  if (Math.abs(velocity) > 100) {
    const direction = velocity > 0 ? 1 : -1;
    const targetIndex = currentIndex + direction;
    
    if (targetIndex >= 0 && targetIndex < sortedPoints.length) {
      const targetPoint = sortedPoints[targetIndex];
      const distanceToTarget = Math.abs(currentPosition - targetPoint);
      
      if (distanceToTarget < relativeThreshold) {
        return targetPoint;
      }
    }
  }

  return closestPoint;
}

/**
 * Calculate resistance when dragging beyond boundaries
 */
export function calculateResistance(
  position: number,
  boundary: number,
  resistance: number = 0.3
): number {
  if (position < 0) {
    return position * resistance;
  }
  
  if (position > boundary) {
    const overshoot = position - boundary;
    return boundary + overshoot * resistance;
  }
  
  return position;
}

/**
 * Clamp value between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Linear interpolation
 */
export function lerp(start: number, end: number, factor: number): number {
  return start + (end - start) * factor;
}

/**
 * Ease out cubic function for smooth animations
 */
export function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

/**
 * Ease in out cubic function
 */
export function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/**
 * Calculate percentage from position and container size
 */
export function calculatePercentage(
  position: number,
  containerSize: number,
  direction: 'bottom' | 'top' | 'left' | 'right' = 'bottom'
): number {
  if (containerSize === 0) return 0;
  
  switch (direction) {
    case 'bottom':
    case 'right':
      return Math.max(0, Math.min(100, (position / containerSize) * 100));
    case 'top':
    case 'left':
      return Math.max(0, Math.min(100, ((containerSize - position) / containerSize) * 100));
    default:
      return 0;
  }
}

/**
 * Default physics configurations
 */
export const drawerPhysics = {
  // Smooth, responsive spring
  smooth: {
    stiffness: 300,
    damping: 30,
    mass: 1,
    precision: 0.1
  } as SpringConfig,
  
  // Quick, snappy spring
  snappy: {
    stiffness: 500,
    damping: 30,
    mass: 0.8,
    precision: 0.1
  } as SpringConfig,
  
  // Gentle, slow spring
  gentle: {
    stiffness: 200,
    damping: 25,
    mass: 1.2,
    precision: 0.1
  } as SpringConfig,
  
  // Bouncy spring
  bouncy: {
    stiffness: 400,
    damping: 20,
    mass: 1,
    precision: 0.1
  } as SpringConfig
};

export default drawerPhysics;