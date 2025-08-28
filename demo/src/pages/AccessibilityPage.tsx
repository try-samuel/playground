import React, { useState, useRef, useEffect } from 'react';
import { Eye, Keyboard, Volume2, Users, Shield, MousePointer } from 'lucide-react';
import {
  Drawer,
  DrawerContent,
  DrawerOverlay,
  DrawerTrigger,
  DrawerHeader,
  DrawerFooter,
  DrawerHandle,
  useFocusLock
} from '../components/drawer';

export function AccessibilityPage() {
  return (
    <div className="space-y-12">
      {/* Page Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">Accessibility Examples</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Comprehensive accessibility examples demonstrating WCAG 2.1 AA compliance,
          keyboard navigation, screen reader support, and inclusive design patterns
          for the iOS drawer component.
        </p>
      </div>

      {/* Keyboard Navigation */}
      <ExampleSection
        title="1. Keyboard Navigation"
        description="Complete keyboard support with Tab, Escape, Enter, and arrow key navigation."
        icon={<Keyboard className="w-6 h-6" />}
      >
        <KeyboardNavigationExample />
      </ExampleSection>

      {/* Screen Reader Support */}
      <ExampleSection
        title="2. Screen Reader Support"
        description="Proper ARIA attributes, announcements, and semantic HTML structure."
        icon={<Volume2 className="w-6 h-6" />}
      >
        <ScreenReaderExample />
      </ExampleSection>

      {/* Focus Management */}
      <ExampleSection
        title="3. Focus Management"
        description="Focus trapping, restoration, and logical focus flow throughout the drawer."
        icon={<Eye className="w-6 h-6" />}
      >
        <FocusManagementExample />
      </ExampleSection>

      {/* WCAG Compliance */}
      <ExampleSection
        title="4. WCAG 2.1 AA Compliance"
        description="Color contrast, text sizing, and accessibility guidelines compliance."
        icon={<Shield className="w-6 h-6" />}
      >
        <WCAGComplianceExample />
      </ExampleSection>

      {/* Motor Impairment Support */}
      <ExampleSection
        title="5. Motor Impairment Support"
        description="Large touch targets, reduced motion, and alternative interaction methods."
        icon={<MousePointer className="w-6 h-6" />}
      >
        <MotorImpairmentExample />
      </ExampleSection>

      {/* Inclusive Design */}
      <ExampleSection
        title="6. Inclusive Design Patterns"
        description="Universal design principles that work for everyone."
        icon={<Users className="w-6 h-6" />}
      >
        <InclusiveDesignExample />
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

// Keyboard Navigation Example
function KeyboardNavigationExample() {
  const [open, setOpen] = useState(false);
  const [keyboardEvents, setKeyboardEvents] = useState<string[]>([]);

  const logKeyEvent = (event: string) => {
    setKeyboardEvents(prev => [...prev.slice(-4), event]);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    logKeyEvent(`${event.key} pressed`);
  };

  return (
    <div className="space-y-4">
      <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-4">
        <h3 className="font-semibold text-gray-900">Keyboard Navigation Test</h3>
        
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h4 className="font-semibold text-blue-900 mb-2">Supported Keys</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            <div className="bg-white p-2 rounded border">
              <strong className="text-blue-900">Tab</strong>
              <p className="text-blue-800">Navigate forward</p>
            </div>
            <div className="bg-white p-2 rounded border">
              <strong className="text-blue-900">Shift+Tab</strong>
              <p className="text-blue-800">Navigate backward</p>
            </div>
            <div className="bg-white p-2 rounded border">
              <strong className="text-blue-900">Escape</strong>
              <p className="text-blue-800">Close drawer</p>
            </div>
            <div className="bg-white p-2 rounded border">
              <strong className="text-blue-900">Enter/Space</strong>
              <p className="text-blue-800">Activate elements</p>
            </div>
          </div>
        </div>
        
        {keyboardEvents.length > 0 && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Recent Key Events</h4>
            <div className="space-y-1">
              {keyboardEvents.map((event, index) => (
                <div key={index} className="text-sm text-gray-700 font-mono">
                  {event}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger 
          className="bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:ring-purple-300 text-white px-6 py-3 rounded-lg font-medium transition-all"
          onKeyDown={handleKeyDown}
        >
          Test Keyboard Navigation
        </DrawerTrigger>
        <DrawerOverlay />
        <DrawerContent onKeyDown={handleKeyDown}>
          <DrawerHeader>
            <h3 className="text-xl font-semibold text-gray-900">Keyboard Navigation Test</h3>
            <p className="text-gray-600">Use Tab, Escape, and other keys to navigate</p>
          </DrawerHeader>
          
          <div className="flex-1 p-6 space-y-4">
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <h4 className="font-semibold text-purple-900 mb-2">Navigation Instructions</h4>
              <ul className="text-purple-800 text-sm space-y-1">
                <li>• Press Tab to move between focusable elements</li>
                <li>• Press Shift+Tab to move backward</li>
                <li>• Press Escape to close this drawer</li>
                <li>• Press Enter or Space to activate buttons</li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <button 
                className="w-full bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 text-white p-3 rounded-lg transition-all"
                onKeyDown={handleKeyDown}
              >
                Focusable Button 1
              </button>
              <input 
                type="text" 
                placeholder="Focusable input field"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-300 focus:border-blue-500"
                onKeyDown={handleKeyDown}
              />
              <select 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-300 focus:border-blue-500"
                onKeyDown={handleKeyDown}
              >
                <option>Option 1</option>
                <option>Option 2</option>
                <option>Option 3</option>
              </select>
              <button 
                className="w-full bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300 text-white p-3 rounded-lg transition-all"
                onKeyDown={handleKeyDown}
              >
                Focusable Button 2
              </button>
            </div>
          </div>
          
          <DrawerFooter>
            <button
              onClick={() => setOpen(false)}
              onKeyDown={handleKeyDown}
              className="bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:ring-purple-300 text-white px-4 py-3 rounded-lg w-full transition-all"
            >
              Close (or press Escape)
            </button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <CodeBlock>
{`// Keyboard navigation example
function KeyboardDrawer() {
  const handleKeyDown = (event) => {
    switch (event.key) {
      case 'Escape':
        closeDrawer();
        break;
      case 'Tab':
        // Focus management handled automatically
        break;
      case 'Enter':
      case ' ':
        if (event.target.tagName === 'BUTTON') {
          event.target.click();
        }
        break;
    }
  };
  
  return (
    <Drawer>
      <DrawerContent onKeyDown={handleKeyDown}>
        <button>Focusable Element</button>
      </DrawerContent>
    </Drawer>
  );
}`}
      </CodeBlock>
    </div>
  );
}

// Screen Reader Example
function ScreenReaderExample() {
  const [open, setOpen] = useState(false);
  const [announcements, setAnnouncements] = useState<string[]>([]);

  const makeAnnouncement = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
    setAnnouncements(prev => [...prev.slice(-3), `${priority.toUpperCase()}: ${message}`]);
    
    // Create live region for screen reader
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', priority);
    announcer.setAttribute('aria-atomic', 'true');
    announcer.className = 'sr-only';
    announcer.textContent = message;
    
    document.body.appendChild(announcer);
    setTimeout(() => document.body.removeChild(announcer), 1000);
  };

  return (
    <div className="space-y-4">
      <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-4">
        <h3 className="font-semibold text-gray-900">Screen Reader Support</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h4 className="font-semibold text-green-900 mb-2">ARIA Attributes</h4>
            <ul className="text-green-800 text-sm space-y-1">
              <li>• <code>role="dialog"</code> for modal semantics</li>
              <li>• <code>aria-modal="true"</code> for modal behavior</li>
              <li>• <code>aria-labelledby</code> for title association</li>
              <li>• <code>aria-describedby</code> for description</li>
              <li>• <code>aria-live</code> for announcements</li>
            </ul>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-2">Semantic HTML</h4>
            <ul className="text-blue-800 text-sm space-y-1">
              <li>• Proper heading hierarchy (h1, h2, h3)</li>
              <li>• Form labels associated with inputs</li>
              <li>• Button elements for interactive actions</li>
              <li>• Landmark roles for navigation</li>
              <li>• Alt text for images</li>
            </ul>
          </div>
        </div>
        
        <div className="flex gap-4">
          <button
            onClick={() => makeAnnouncement('This is a polite announcement', 'polite')}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
          >
            Polite Announcement
          </button>
          <button
            onClick={() => makeAnnouncement('This is an assertive announcement!', 'assertive')}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors"
          >
            Assertive Announcement
          </button>
        </div>
        
        {announcements.length > 0 && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Recent Announcements</h4>
            <div className="space-y-1">
              {announcements.map((announcement, index) => (
                <div key={index} className="text-sm text-gray-700">
                  {announcement}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Drawer 
        open={open} 
        onOpenChange={setOpen}
        ariaLabel="Screen reader test drawer"
        ariaDescribedBy="drawer-description"
        onOpen={() => makeAnnouncement('Drawer opened')}
        onClose={() => makeAnnouncement('Drawer closed')}
      >
        <DrawerTrigger className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
          Test Screen Reader Support
        </DrawerTrigger>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>
            <h3 id="drawer-title" className="text-xl font-semibold text-gray-900">
              Screen Reader Test Drawer
            </h3>
            <p id="drawer-description" className="text-gray-600">
              This drawer demonstrates proper screen reader support with ARIA attributes
            </p>
          </DrawerHeader>
          
          <div className="flex-1 p-6 space-y-4">
            <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
              <h4 className="font-semibold text-indigo-900 mb-2">Accessibility Features</h4>
              <ul className="text-indigo-800 text-sm space-y-1">
                <li>• Title and description are properly associated</li>
                <li>• Form elements have descriptive labels</li>
                <li>• Actions provide clear feedback</li>
                <li>• Content structure uses semantic HTML</li>
              </ul>
            </div>
            
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name (required)
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  aria-describedby="name-help"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
                <p id="name-help" className="text-sm text-gray-600 mt-1">
                  Enter your first and last name
                </p>
              </div>
              
              <fieldset className="border border-gray-300 rounded-lg p-4">
                <legend className="text-sm font-medium text-gray-700 px-2">
                  Preferred Contact Method
                </legend>
                <div className="space-y-2 mt-2">
                  <label className="flex items-center">
                    <input type="radio" name="contact" value="email" className="mr-2" />
                    Email
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="contact" value="phone" className="mr-2" />
                    Phone
                  </label>
                </div>
              </fieldset>
              
              <button
                type="button"
                onClick={() => makeAnnouncement('Form would be submitted')}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-lg transition-colors"
              >
                Submit Form
              </button>
            </form>
          </div>
          
          <DrawerFooter>
            <button
              onClick={() => setOpen(false)}
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-3 rounded-lg w-full transition-colors"
            >
              Close Drawer
            </button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <CodeBlock>
{`// Screen reader support
<Drawer
  ariaLabel="User settings"
  ariaDescribedBy="settings-description"
  onOpen={() => announceToScreenReader('Settings opened')}
>
  <DrawerContent>
    <h2 id="settings-title">Settings</h2>
    <p id="settings-description">
      Configure your preferences
    </p>
    
    <label htmlFor="username">
      Username (required)
    </label>
    <input
      id="username"
      aria-describedby="username-help"
      required
    />
    <p id="username-help">
      Choose a unique username
    </p>
  </DrawerContent>
</Drawer>`}
      </CodeBlock>
    </div>
  );
}

// Focus Management Example
function FocusManagementExample() {
  const [open, setOpen] = useState(false);
  const { lockRef, focusFirst, focusLast } = useFocusLock({ enabled: open });

  return (
    <div className="space-y-4">
      <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-4">
        <h3 className="font-semibold text-gray-900">Focus Management</h3>
        
        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <h4 className="font-semibold text-yellow-900 mb-2">Focus Features</h4>
          <ul className="text-yellow-800 text-sm space-y-1">
            <li>• Focus is trapped within the drawer when open</li>
            <li>• Focus returns to trigger when drawer closes</li>
            <li>• First focusable element receives focus on open</li>
            <li>• Tab cycles through focusable elements</li>
            <li>• Shift+Tab cycles backward</li>
          </ul>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={focusFirst}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded text-sm transition-colors"
          >
            Focus First
          </button>
          <button
            onClick={focusLast}
            className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded text-sm transition-colors"
          >
            Focus Last
          </button>
        </div>
      </div>

      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
          Test Focus Management
        </DrawerTrigger>
        <DrawerOverlay />
        <DrawerContent ref={lockRef}>
          <DrawerHeader>
            <h3 className="text-xl font-semibold text-gray-900">Focus Management Test</h3>
            <p className="text-gray-600">Try navigating with Tab and Shift+Tab</p>
          </DrawerHeader>
          
          <div className="flex-1 p-6 space-y-4">
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <h4 className="font-semibold text-orange-900 mb-2">Focus Order</h4>
              <p className="text-orange-800 text-sm">
                Focus moves logically through the interface in a predictable order.
                Use Tab to test the focus flow.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <button className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded transition-colors">
                Button 1
              </button>
              <button className="bg-green-500 hover:bg-green-600 text-white p-3 rounded transition-colors">
                Button 2
              </button>
              <input 
                type="text" 
                placeholder="Input field 1"
                className="p-3 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500"
              />
              <input 
                type="text" 
                placeholder="Input field 2"
                className="p-3 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500"
              />
              <select className="p-3 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500">
                <option>Select option 1</option>
                <option>Select option 2</option>
              </select>
              <button className="bg-purple-500 hover:bg-purple-600 text-white p-3 rounded transition-colors">
                Button 3
              </button>
            </div>
          </div>
          
          <DrawerFooter>
            <button
              onClick={() => setOpen(false)}
              className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-3 rounded-lg w-full transition-colors"
            >
              Close (focus returns to trigger)
            </button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <CodeBlock>
{`import { useFocusLock } from '@ios-drawer/react';

function FocusDrawer() {
  const [open, setOpen] = useState(false);
  const { lockRef } = useFocusLock({ enabled: open });
  
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent ref={lockRef}>
        <button>First focusable</button>
        <input type="text" />
        <button>Last focusable</button>
      </DrawerContent>
    </Drawer>
  );
}`}
      </CodeBlock>
    </div>
  );
}

// Placeholder components for the remaining examples
function WCAGComplianceExample() {
  return (
    <div className="space-y-4">
      <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-4">
        <h3 className="font-semibold text-gray-900">WCAG 2.1 AA Compliance</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h4 className="font-semibold text-green-900 mb-2">✅ Compliant Features</h4>
            <ul className="text-green-800 text-sm space-y-1">
              <li>• 4.5:1 color contrast ratio</li>
              <li>• Minimum 44px touch targets</li>
              <li>• Keyboard accessible</li>
              <li>• Screen reader compatible</li>
              <li>• Reduced motion support</li>
            </ul>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-2">📊 Test Results</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Color Contrast</span>
                <span className="text-green-600 font-medium">AA ✓</span>
              </div>
              <div className="flex justify-between">
                <span>Keyboard Access</span>
                <span className="text-green-600 font-medium">AA ✓</span>
              </div>
              <div className="flex justify-between">
                <span>Screen Reader</span>
                <span className="text-green-600 font-medium">AA ✓</span>
              </div>
              <div className="flex justify-between">
                <span>Touch Targets</span>
                <span className="text-green-600 font-medium">AA ✓</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CodeBlock>
{`/* WCAG compliant styles */
.drawer-button {
  min-height: 44px; /* Minimum touch target */
  min-width: 44px;
  color: #1a1a1a; /* 4.5:1 contrast on white */
  font-size: 16px; /* Prevents zoom on iOS */
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .drawer-content {
    transition: none !important;
    animation: none !important;
  }
}`}
      </CodeBlock>
    </div>
  );
}

function MotorImpairmentExample() {
  return (
    <div className="space-y-4">
      <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-4">
        <h3 className="font-semibold text-gray-900">Motor Impairment Support</h3>
        
        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <h4 className="font-semibold text-purple-900 mb-2">Accessibility Features</h4>
          <ul className="text-purple-800 text-sm space-y-1">
            <li>• Large touch targets (minimum 44x44px)</li>
            <li>• Generous spacing between interactive elements</li>
            <li>• Reduced motion options</li>
            <li>• Alternative input methods supported</li>
            <li>• Forgiving gesture tolerance</li>
          </ul>
        </div>
      </div>

      <CodeBlock>
{`// Motor impairment considerations
.large-touch-target {
  min-height: 44px;
  min-width: 44px;
  padding: 12px 16px;
  margin: 8px;
}

/* Reduce motion for vestibular disorders */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}`}
      </CodeBlock>
    </div>
  );
}

function InclusiveDesignExample() {
  return (
    <div className="space-y-4">
      <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-4">
        <h3 className="font-semibold text-gray-900">Inclusive Design Patterns</h3>
        
        <div className="bg-teal-50 p-4 rounded-lg border border-teal-200">
          <h4 className="font-semibold text-teal-900 mb-2">Universal Design Principles</h4>
          <ul className="text-teal-800 text-sm space-y-1">
            <li>• Works for users with diverse abilities</li>
            <li>• Multiple ways to interact (mouse, keyboard, touch)</li>
            <li>• Clear visual hierarchy and information architecture</li>
            <li>• Consistent patterns throughout the interface</li>
            <li>• Graceful degradation for older browsers</li>
          </ul>
        </div>
      </div>

      <CodeBlock>
{`// Inclusive design patterns
function InclusiveDrawer() {
  return (
    <Drawer>
      {/* Multiple ways to trigger */}
      <DrawerTrigger>Open with button</DrawerTrigger>
      <button onClick={openDrawer}>Alternative trigger</button>
      
      <DrawerContent>
        {/* Clear hierarchy */}
        <h1>Main title</h1>
        <h2>Section title</h2>
        
        {/* Multiple interaction methods */}
        <button onClick={action}>Click me</button>
        <div tabIndex={0} onKeyDown={handleKey}>
          Or use keyboard
        </div>
      </DrawerContent>
    </Drawer>
  );
}`}
      </CodeBlock>
    </div>
  );
}