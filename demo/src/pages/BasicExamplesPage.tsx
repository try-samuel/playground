import React, { useState } from 'react';
import { ArrowUpDown, Move, Settings, Layers } from 'lucide-react';
import {
  Drawer,
  DrawerContent,
  DrawerOverlay,
  DrawerTrigger,
  DrawerHeader,
  DrawerFooter,
  DrawerHandle
} from '../components/drawer';

export function BasicExamplesPage() {
  return (
    <div className="space-y-12">
      {/* Page Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">Basic Examples</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Fundamental usage patterns showing the core features of the iOS drawer component.
          Perfect starting point for understanding the component's capabilities.
        </p>
      </div>

      {/* Uncontrolled Drawer */}
      <ExampleSection
        title="1. Uncontrolled Drawer"
        description="The simplest way to use the drawer. State is managed internally."
        icon={<Settings className="w-6 h-6" />}
      >
        <Drawer>
          <DrawerTrigger className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
            Open Uncontrolled Drawer
          </DrawerTrigger>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader>
              <h3 className="text-xl font-semibold text-gray-900">Uncontrolled Drawer</h3>
              <p className="text-gray-600">State managed internally by the component</p>
            </DrawerHeader>
            
            <div className="flex-1 p-6 space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-2">How it works</h4>
                <ul className="text-blue-800 text-sm space-y-1">
                  <li>• No state management required</li>
                  <li>• Component handles open/close internally</li>
                  <li>• Perfect for simple use cases</li>
                  <li>• Minimal setup needed</li>
                </ul>
              </div>
              
              <div className="bg-gray-100 p-4 rounded-lg">
                <pre className="text-sm overflow-x-auto">
{`<Drawer>
  <DrawerTrigger>Open</DrawerTrigger>
  <DrawerContent>
    Content here
  </DrawerContent>
</Drawer>`}
                </pre>
              </div>
            </div>
            
            <DrawerFooter>
              <div className="text-center text-gray-600">
                Click outside or press Escape to close
              </div>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>

        <CodeBlock>
{`import { Drawer, DrawerContent, DrawerTrigger, DrawerOverlay } from '@ios-drawer/react';

function UncontrolledExample() {
  return (
    <Drawer>
      <DrawerTrigger>Open Drawer</DrawerTrigger>
      <DrawerOverlay />
      <DrawerContent>
        <h2>Uncontrolled Drawer</h2>
        <p>State is managed internally</p>
      </DrawerContent>
    </Drawer>
  );
}`}
        </CodeBlock>
      </ExampleSection>

      {/* Controlled Drawer */}
      <ExampleSection
        title="2. Controlled Drawer"
        description="Full control over drawer state with external state management."
        icon={<Settings className="w-6 h-6" />}
      >
        <ControlledDrawerExample />
      </ExampleSection>

      {/* Direction Examples */}
      <ExampleSection
        title="3. Different Directions"
        description="Drawers can slide in from any edge of the screen."
        icon={<Move className="w-6 h-6" />}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <DirectionExample direction="bottom" />
          <DirectionExample direction="top" />
          <DirectionExample direction="left" />
          <DirectionExample direction="right" />
        </div>

        <CodeBlock>
{`// Bottom drawer (default)
<Drawer direction="bottom">
  <DrawerContent>Content from bottom</DrawerContent>
</Drawer>

// Top drawer
<Drawer direction="top">
  <DrawerContent>Content from top</DrawerContent>
</Drawer>

// Left sidebar
<Drawer direction="left">
  <DrawerContent>Content from left</DrawerContent>
</Drawer>

// Right sidebar
<Drawer direction="right">
  <DrawerContent>Content from right</DrawerContent>
</Drawer>`}
        </CodeBlock>
      </ExampleSection>

      {/* Snap Points */}
      <ExampleSection
        title="4. Snap Points & Resizing"
        description="Configurable breakpoints that the drawer snaps to during resize."
        icon={<ArrowUpDown className="w-6 h-6" />}
      >
        <SnapPointsExample />
      </ExampleSection>

      {/* Modal vs Non-Modal */}
      <ExampleSection
        title="5. Modal vs Non-Modal"
        description="Choose between modal behavior with overlay or non-modal inline display."
        icon={<Layers className="w-6 h-6" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ModalExample />
          <NonModalExample />
        </div>
      </ExampleSection>

      {/* Always On Drawer */}
      <ExampleSection
        title="6. Always-On Drawer"
        description="Persistent drawer that cannot be dismissed, perfect for navigation or tools."
        icon={<Settings className="w-6 h-6" />}
      >
        <AlwaysOnExample />
      </ExampleSection>
    </div>
  );
}

// Helper Components

function ExampleSection({ 
  title, 
  description, 
  icon, 
  children 
}: { 
  title: string; 
  description: string; 
  icon: React.ReactNode; 
  children: React.ReactNode; 
}) {
  return (
    <section className="space-y-6">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 p-2 bg-blue-100 rounded-lg text-blue-600">
          {icon}
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          <p className="text-gray-600 mt-2">{description}</p>
        </div>
      </div>
      <div className="space-y-6">
        {children}
      </div>
    </section>
  );
}

function CodeBlock({ children }: { children: string }) {
  return (
    <div className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto">
      <pre className="text-sm">{children}</pre>
    </div>
  );
}

function ControlledDrawerExample() {
  const [open, setOpen] = useState(false);
  const [counter, setCounter] = useState(0);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        <button
          onClick={() => setOpen(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Open Programmatically
        </button>
        <button
          onClick={() => setCounter(c => c + 1)}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Increment: {counter}
        </button>
        <div className="flex items-center text-gray-600">
          Status: <span className="ml-2 font-medium">{open ? 'Open' : 'Closed'}</span>
        </div>
      </div>

      <Drawer 
        open={open} 
        onOpenChange={setOpen}
        onOpen={() => console.log('Drawer opened')}
        onClose={() => console.log('Drawer closed')}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>
            <h3 className="text-xl font-semibold text-gray-900">Controlled Drawer</h3>
            <p className="text-gray-600">External state management</p>
          </DrawerHeader>
          
          <div className="flex-1 p-6 space-y-4">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-900 mb-2">State Sync</h4>
              <p className="text-green-800 text-sm mb-3">
                The counter value from the parent component: <strong>{counter}</strong>
              </p>
              <button
                onClick={() => setCounter(c => c + 1)}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm transition-colors"
              >
                Increment from Inside
              </button>
            </div>
            
            <div className="bg-gray-100 p-4 rounded-lg">
              <pre className="text-sm overflow-x-auto">
{`const [open, setOpen] = useState(false);

<Drawer 
  open={open} 
  onOpenChange={setOpen}
  onOpen={() => console.log('Opened')}
  onClose={() => console.log('Closed')}
>
  <DrawerContent>...</DrawerContent>
</Drawer>`}
              </pre>
            </div>
          </div>
          
          <DrawerFooter>
            <div className="flex gap-3">
              <button
                onClick={() => setOpen(false)}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-3 rounded-lg font-medium transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => setCounter(0)}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg font-medium transition-colors"
              >
                Reset Counter
              </button>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <CodeBlock>
{`function ControlledExample() {
  const [open, setOpen] = useState(false);
  
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <button onClick={() => setOpen(true)}>
        Open Programmatically
      </button>
      <DrawerContent>
        <button onClick={() => setOpen(false)}>
          Close
        </button>
      </DrawerContent>
    </Drawer>
  );
}`}
      </CodeBlock>
    </div>
  );
}

function DirectionExample({ direction }: { direction: 'bottom' | 'top' | 'left' | 'right' }) {
  const directionConfig = {
    bottom: { icon: '⬆️', color: 'blue' },
    top: { icon: '⬇️', color: 'green' },
    left: { icon: '➡️', color: 'purple' },
    right: { icon: '⬅️', color: 'orange' }
  };

  const config = directionConfig[direction];
  const colorClasses = {
    blue: 'bg-blue-600 hover:bg-blue-700',
    green: 'bg-green-600 hover:bg-green-700',
    purple: 'bg-purple-600 hover:bg-purple-700',
    orange: 'bg-orange-600 hover:bg-orange-700'
  };

  return (
    <Drawer direction={direction}>
      <DrawerTrigger className={`w-full ${colorClasses[config.color]} text-white px-4 py-3 rounded-lg font-medium transition-colors`}>
        {config.icon} {direction.charAt(0).toUpperCase() + direction.slice(1)}
      </DrawerTrigger>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader>
          <h3 className="text-xl font-semibold text-gray-900">
            {direction.charAt(0).toUpperCase() + direction.slice(1)} Drawer
          </h3>
          <p className="text-gray-600">Slides in from the {direction}</p>
        </DrawerHeader>
        
        <div className="flex-1 p-6">
          <div className="space-y-4">
            <div className="bg-gray-100 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Direction: {direction}</h4>
              <p className="text-gray-700 text-sm">
                This drawer slides in from the {direction} edge of the screen.
                {direction === 'left' || direction === 'right' 
                  ? ' Perfect for navigation sidebars or tool panels.' 
                  : ' Ideal for modal content, forms, and overlays.'}
              </p>
            </div>
            
            {(direction === 'left' || direction === 'right') && (
              <div className="space-y-2">
                <div className="bg-white p-3 border rounded-lg">📊 Dashboard</div>
                <div className="bg-white p-3 border rounded-lg">👤 Profile</div>
                <div className="bg-white p-3 border rounded-lg">⚙️ Settings</div>
                <div className="bg-white p-3 border rounded-lg">📞 Contact</div>
              </div>
            )}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function SnapPointsExample() {
  const [currentSnapPoint, setCurrentSnapPoint] = useState(1);
  
  const snapPoints = ['25%', '50%', '75%', '90%'];

  return (
    <div className="space-y-4">
      <Drawer 
        snapPoints={snapPoints}
        defaultSnapPoint={currentSnapPoint}
        onSnap={(point, index) => {
          setCurrentSnapPoint(index);
          console.log(`Snapped to ${snapPoints[index]} (${point}px)`);
        }}
      >
        <DrawerTrigger className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
          Open Resizable Drawer
        </DrawerTrigger>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHandle />
          <DrawerHeader>
            <h3 className="text-xl font-semibold text-gray-900">Resizable Drawer</h3>
            <p className="text-gray-600">
              Current: {snapPoints[currentSnapPoint]} • Drag the handle to resize
            </p>
          </DrawerHeader>
          
          <div className="flex-1 p-6 space-y-4">
            <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
              <h4 className="font-semibold text-indigo-900 mb-2">Snap Points</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {snapPoints.map((point, index) => (
                  <div 
                    key={index}
                    className={`p-2 rounded text-center text-sm font-medium border ${
                      index === currentSnapPoint 
                        ? 'bg-indigo-200 text-indigo-900 border-indigo-300' 
                        : 'bg-white text-indigo-700 border-indigo-200'
                    }`}
                  >
                    {point}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-gray-100 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Try These Interactions:</h4>
              <ul className="text-gray-700 text-sm space-y-1">
                <li>• Drag the handle up and down</li>
                <li>• Feel the resistance and snap behavior</li>
                <li>• Quick swipes trigger velocity-based snapping</li>
                <li>• Gentle drags follow your finger precisely</li>
              </ul>
            </div>
          </div>
        </DrawerContent>
      </Drawer>

      <CodeBlock>
{`<Drawer 
  snapPoints={['25%', '50%', '75%', '90%']}
  defaultSnapPoint={1}
  onSnap={(point, index) => {
    console.log(\`Snapped to index \${index} at \${point}px\`);
  }}
>
  <DrawerContent>
    <DrawerHandle />
    <h2>Drag the handle to resize!</h2>
  </DrawerContent>
</Drawer>`}
      </CodeBlock>
    </div>
  );
}

function ModalExample() {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Modal Drawer</h3>
      <p className="text-gray-600 text-sm">
        Blocks interaction with the background and includes an overlay.
      </p>
      
      <Drawer modal={true}>
        <DrawerTrigger className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium transition-colors">
          Open Modal Drawer
        </DrawerTrigger>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>
            <h3 className="text-xl font-semibold text-gray-900">Modal Drawer</h3>
            <p className="text-gray-600">Blocks background interaction</p>
          </DrawerHeader>
          
          <div className="flex-1 p-6">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-2">Modal Features</h4>
              <ul className="text-blue-800 text-sm space-y-1">
                <li>• Background is dimmed with overlay</li>
                <li>• Focus is trapped within the drawer</li>
                <li>• Background scrolling is disabled</li>
                <li>• Click outside to close</li>
                <li>• Press Escape to close</li>
              </ul>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

function NonModalExample() {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Non-Modal Drawer</h3>
      <p className="text-gray-600 text-sm">
        Allows interaction with background content, no overlay.
      </p>
      
      <Drawer modal={false}>
        <DrawerTrigger className="w-full bg-gray-600 hover:bg-gray-700 text-white px-4 py-3 rounded-lg font-medium transition-colors">
          Open Non-Modal Drawer
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <h3 className="text-xl font-semibold text-gray-900">Non-Modal Drawer</h3>
            <p className="text-gray-600">Background remains interactive</p>
          </DrawerHeader>
          
          <div className="flex-1 p-6">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-2">Non-Modal Features</h4>
              <ul className="text-gray-700 text-sm space-y-1">
                <li>• No background overlay</li>
                <li>• Background remains interactive</li>
                <li>• No focus trapping</li>
                <li>• Background scrolling continues</li>
                <li>• Perfect for sidebars or tools</li>
              </ul>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

function AlwaysOnExample() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <button
          onClick={() => setIsVisible(true)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Show Always-On Drawer
        </button>
        {isVisible && (
          <button
            onClick={() => setIsVisible(false)}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Hide Drawer
          </button>
        )}
      </div>

      <Drawer 
        open={isVisible}
        onOpenChange={() => {}} // Prevent closing
        alwaysOn={true}
        dismissible={false}
        closeOnOutsideClick={false}
        closeOnEscape={false}
      >
        <DrawerContent>
          <DrawerHeader>
            <h3 className="text-xl font-semibold text-gray-900">Always-On Drawer</h3>
            <p className="text-gray-600">Cannot be dismissed by user</p>
          </DrawerHeader>
          
          <div className="flex-1 p-6 space-y-4">
            <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
              <h4 className="font-semibold text-emerald-900 mb-2">Persistent Features</h4>
              <ul className="text-emerald-800 text-sm space-y-1">
                <li>• Cannot be closed by clicking outside</li>
                <li>• Escape key doesn't close it</li>
                <li>• Perfect for critical information</li>
                <li>• Navigation panels that should stay open</li>
                <li>• Tool palettes and controls</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <div className="bg-white p-3 border rounded-lg flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-700">System Status: Online</span>
              </div>
              <div className="bg-white p-3 border rounded-lg flex items-center space-x-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-gray-700">Active Users: 1,247</span>
              </div>
              <div className="bg-white p-3 border rounded-lg flex items-center space-x-3">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-gray-700">Pending Tasks: 3</span>
              </div>
            </div>
          </div>
          
          <DrawerFooter>
            <p className="text-center text-gray-600 text-sm">
              This drawer can only be closed programmatically
            </p>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <CodeBlock>
{`<Drawer 
  open={isVisible}
  alwaysOn={true}
  dismissible={false}
  closeOnOutsideClick={false}
  closeOnEscape={false}
>
  <DrawerContent>
    <h2>This drawer cannot be dismissed</h2>
    <p>Perfect for persistent navigation or tools</p>
  </DrawerContent>
</Drawer>`}
      </CodeBlock>
    </div>
  );
}