import React, { useState } from 'react';
import {
  Drawer,
  DrawerContent,
  DrawerOverlay,
  DrawerTrigger,
  DrawerHeader,
  DrawerFooter,
  DrawerHandle
} from '../src';

/**
 * Basic Drawer Example
 * Demonstrates the simplest way to use the drawer component
 */
export function BasicUsageExample() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Basic Drawer Usage</h1>
      
      {/* Uncontrolled Drawer */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Uncontrolled Drawer</h2>
        <Drawer>
          <DrawerTrigger className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
            Open Drawer
          </DrawerTrigger>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader>
              <h3 className="text-xl font-semibold">Welcome!</h3>
              <p className="text-gray-600">This is a basic drawer example.</p>
            </DrawerHeader>
            <div className="flex-1 p-4">
              <p className="mb-4">
                This drawer opens from the bottom and includes a backdrop overlay.
                You can close it by clicking outside or pressing the Escape key.
              </p>
              <p className="mb-4">
                The drawer automatically handles focus management and provides
                proper accessibility attributes for screen readers.
              </p>
            </div>
            <DrawerFooter>
              <button className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded">
                Close
              </button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>

      {/* Controlled Drawer */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Controlled Drawer</h2>
        <ControlledDrawerExample />
      </div>

      {/* Different Directions */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Different Directions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <DirectionExample direction="bottom" />
          <DirectionExample direction="top" />
          <DirectionExample direction="left" />
          <DirectionExample direction="right" />
        </div>
      </div>

      {/* With Handle */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">With Drag Handle</h2>
        <Drawer snapPoints={['30%', '60%', '90%']} defaultSnapPoint={1}>
          <DrawerTrigger className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
            Open Resizable Drawer
          </DrawerTrigger>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHandle />
            <DrawerHeader>
              <h3 className="text-xl font-semibold">Resizable Drawer</h3>
              <p className="text-gray-600">Drag the handle to resize!</p>
            </DrawerHeader>
            <div className="flex-1 p-4">
              <p className="mb-4">
                This drawer has multiple snap points and can be resized by dragging
                the handle at the top.
              </p>
              <p className="mb-4">
                Try dragging it to different heights - it will snap to the nearest
                configured breakpoint.
              </p>
              <div className="space-y-2">
                <div className="bg-gray-100 p-3 rounded">Snap Point 1: 30%</div>
                <div className="bg-gray-100 p-3 rounded">Snap Point 2: 60%</div>
                <div className="bg-gray-100 p-3 rounded">Snap Point 3: 90%</div>
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
}

/**
 * Controlled Drawer Example
 * Shows how to control drawer state externally
 */
function ControlledDrawerExample() {
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(0);

  return (
    <div>
      <div className="flex gap-4 mb-4">
        <button
          onClick={() => setOpen(true)}
          className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded"
        >
          Open Drawer Programmatically
        </button>
        <button
          onClick={() => setCount(count + 1)}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded"
        >
          Increment Counter
        </button>
      </div>
      
      <p className="text-sm text-gray-600 mb-4">
        Current count: <strong>{count}</strong> | 
        Drawer state: <strong>{open ? 'Open' : 'Closed'}</strong>
      </p>

      <Drawer
        open={open}
        onOpenChange={setOpen}
        onOpen={() => console.log('Drawer opened!')}
        onClose={() => console.log('Drawer closed!')}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>
            <h3 className="text-xl font-semibold">Controlled Drawer</h3>
            <p className="text-gray-600">This drawer's state is controlled externally.</p>
          </DrawerHeader>
          <div className="flex-1 p-4">
            <p className="mb-4">
              The drawer state is managed by the parent component. The current
              count is: <strong>{count}</strong>
            </p>
            <div className="space-y-3">
              <button
                onClick={() => setCount(count + 1)}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                Increment Counter
              </button>
              <button
                onClick={() => setCount(0)}
                className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              >
                Reset Counter
              </button>
            </div>
          </div>
          <DrawerFooter>
            <button
              onClick={() => setOpen(false)}
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded"
            >
              Close Drawer
            </button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

/**
 * Direction Example
 * Demonstrates drawers opening from different directions
 */
function DirectionExample({ direction }: { direction: 'bottom' | 'top' | 'left' | 'right' }) {
  return (
    <Drawer direction={direction}>
      <DrawerTrigger className="w-full bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-2 rounded text-sm">
        {direction.charAt(0).toUpperCase() + direction.slice(1)}
      </DrawerTrigger>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader>
          <h3 className="text-lg font-semibold">
            {direction.charAt(0).toUpperCase() + direction.slice(1)} Drawer
          </h3>
        </DrawerHeader>
        <div className="flex-1 p-4">
          <p>This drawer opens from the {direction}.</p>
          {direction === 'left' || direction === 'right' ? (
            <div className="mt-4 space-y-2">
              <div className="bg-gray-100 p-2 rounded text-sm">Side drawer content</div>
              <div className="bg-gray-100 p-2 rounded text-sm">Perfect for navigation</div>
              <div className="bg-gray-100 p-2 rounded text-sm">Or additional actions</div>
            </div>
          ) : (
            <div className="mt-4 space-y-2">
              <div className="bg-gray-100 p-2 rounded text-sm">
                {direction === 'top' ? 'Top' : 'Bottom'} drawer content
              </div>
              <div className="bg-gray-100 p-2 rounded text-sm">Great for modal content</div>
              <div className="bg-gray-100 p-2 rounded text-sm">Forms and details</div>
            </div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export default BasicUsageExample;