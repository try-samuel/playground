import React, { useState, useEffect } from 'react';
import { Smartphone, Wifi, Battery, Signal, Eye, Shield } from 'lucide-react';
import {
  Drawer,
  DrawerContent,
  DrawerOverlay,
  DrawerTrigger,
  DrawerHeader,
  DrawerFooter,
  DrawerHandle,
  useKeyboardHeight,
  useFocusLock,
  useScrollLock
} from '../components/drawer';

export function IOSFeaturesPage() {
  return (
    <div className="space-y-12">
      {/* Page Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">iOS-Specific Features</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Comprehensive examples showcasing iOS Safari compatibility features, including viewport handling,
          keyboard detection, safe area support, and mobile-specific optimizations.
        </p>
      </div>

      {/* iOS Environment Detection */}
      <ExampleSection
        title="1. iOS Environment Detection"
        description="Automatic detection of iOS devices, Safari browser, and PWA mode."
        icon={<Smartphone className="w-6 h-6" />}
      >
        <IOSDetectionExample />
      </ExampleSection>

      {/* Keyboard Height Detection */}
      <ExampleSection
        title="2. Keyboard Height Detection"
        description="Real-time detection of virtual keyboard appearance and height on iOS."
        icon={<Eye className="w-6 h-6" />}
      >
        <KeyboardDetectionExample />
      </ExampleSection>

      {/* Safe Area Support */}
      <ExampleSection
        title="3. Safe Area Support"
        description="Proper handling of notch, home indicator, and dynamic island areas."
        icon={<Shield className="w-6 h-6" />}
      >
        <SafeAreaExample />
      </ExampleSection>

      {/* Viewport Handling */}
      <ExampleSection
        title="4. Dynamic Viewport Handling"
        description="Adapts to iOS Safari's changing viewport as UI elements appear/disappear."
        icon={<Signal className="w-6 h-6" />}
      >
        <ViewportExample />
      </ExampleSection>

      {/* Input Zoom Prevention */}
      <ExampleSection
        title="5. Input Zoom Prevention"
        description="Prevents unwanted zoom when focusing on input fields in iOS Safari."
        icon={<Wifi className="w-6 h-6" />}
      >
        <InputZoomExample />
      </ExampleSection>

      {/* Scroll Lock & Bounce Prevention */}
      <ExampleSection
        title="6. Scroll Lock & Bounce Prevention"
        description="Prevents background scrolling and iOS rubber band effect."
        icon={<Battery className="w-6 h-6" />}
      >
        <ScrollLockExample />
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

// iOS Detection Example
function IOSDetectionExample() {
  const [iosInfo, setIOSInfo] = useState({
    isIOS: false,
    isIOSSafari: false,
    isPWA: false,
    version: 0,
    userAgent: '',
    supportsDynamicViewport: false,
    supportsVisualViewport: false
  });

  useEffect(() => {
    const userAgent = navigator.userAgent;
    const isIOS = /iPad|iPhone|iPod/.test(userAgent);
    const isIOSSafari = isIOS && /Safari/.test(userAgent) && !/Chrome|CriOS|FxiOS/.test(userAgent);
    const isPWA = window.matchMedia('(display-mode: standalone)').matches;
    
    // Extract iOS version
    const versionMatch = userAgent.match(/OS (\d+)_(\d+)/);
    const version = versionMatch ? parseInt(versionMatch[1], 10) : 0;
    
    const supportsDynamicViewport = version >= 15;
    const supportsVisualViewport = 'visualViewport' in window;

    setIOSInfo({
      isIOS,
      isIOSSafari,
      isPWA,
      version,
      userAgent,
      supportsDynamicViewport,
      supportsVisualViewport
    });
  }, []);

  return (
    <div className="space-y-4">
      <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-4">
        <h3 className="font-semibold text-gray-900">Current Device Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className={`p-4 rounded-lg border ${iosInfo.isIOS ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${iosInfo.isIOS ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className={`font-medium ${iosInfo.isIOS ? 'text-green-900' : 'text-red-900'}`}>
                iOS Device: {iosInfo.isIOS ? 'Yes' : 'No'}
              </span>
            </div>
            {iosInfo.isIOS && iosInfo.version > 0 && (
              <p className="text-green-800 text-sm mt-1">Version: iOS {iosInfo.version}</p>
            )}
          </div>
          
          <div className={`p-4 rounded-lg border ${iosInfo.isIOSSafari ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'}`}>
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${iosInfo.isIOSSafari ? 'bg-blue-500' : 'bg-gray-500'}`}></div>
              <span className={`font-medium ${iosInfo.isIOSSafari ? 'text-blue-900' : 'text-gray-900'}`}>
                Safari Browser: {iosInfo.isIOSSafari ? 'Yes' : 'No'}
              </span>
            </div>
          </div>
          
          <div className={`p-4 rounded-lg border ${iosInfo.isPWA ? 'bg-purple-50 border-purple-200' : 'bg-gray-50 border-gray-200'}`}>
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${iosInfo.isPWA ? 'bg-purple-500' : 'bg-gray-500'}`}></div>
              <span className={`font-medium ${iosInfo.isPWA ? 'text-purple-900' : 'text-gray-900'}`}>
                PWA Mode: {iosInfo.isPWA ? 'Yes' : 'No'}
              </span>
            </div>
          </div>
          
          <div className={`p-4 rounded-lg border ${iosInfo.supportsVisualViewport ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'}`}>
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${iosInfo.supportsVisualViewport ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
              <span className={`font-medium ${iosInfo.supportsVisualViewport ? 'text-green-900' : 'text-yellow-900'}`}>
                Visual Viewport API: {iosInfo.supportsVisualViewport ? 'Supported' : 'Not Supported'}
              </span>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-2">User Agent</h4>
          <p className="text-gray-700 text-sm font-mono break-all">{iosInfo.userAgent}</p>
        </div>
      </div>

      <CodeBlock>
{`import { detectIOSEnvironment } from '@ios-drawer/react';

function useIOSDetection() {
  const [iosInfo, setIOSInfo] = useState(null);
  
  useEffect(() => {
    const info = detectIOSEnvironment();
    setIOSInfo(info);
  }, []);
  
  return iosInfo;
}

// Usage
const { isIOS, isIOSSafari, version } = useIOSDetection();`}
      </CodeBlock>
    </div>
  );
}

// Keyboard Detection Example
function KeyboardDetectionExample() {
  const [open, setOpen] = useState(false);
  const { 
    keyboardHeight, 
    isKeyboardVisible, 
    viewportHeight, 
    availableHeight 
  } = useKeyboardHeight({ enabled: open });

  return (
    <div className="space-y-4">
      <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-4">
        <h3 className="font-semibold text-gray-900">Real-time Keyboard Metrics</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-3 rounded-lg text-center">
            <div className="text-2xl font-bold text-blue-600">{isKeyboardVisible ? 'Yes' : 'No'}</div>
            <div className="text-sm text-blue-800">Keyboard Visible</div>
          </div>
          <div className="bg-green-50 p-3 rounded-lg text-center">
            <div className="text-2xl font-bold text-green-600">{keyboardHeight}px</div>
            <div className="text-sm text-green-800">Keyboard Height</div>
          </div>
          <div className="bg-yellow-50 p-3 rounded-lg text-center">
            <div className="text-2xl font-bold text-yellow-600">{viewportHeight}px</div>
            <div className="text-sm text-yellow-800">Viewport Height</div>
          </div>
          <div className="bg-purple-50 p-3 rounded-lg text-center">
            <div className="text-2xl font-bold text-purple-600">{availableHeight}px</div>
            <div className="text-sm text-purple-800">Available Height</div>
          </div>
        </div>
        
        {isKeyboardVisible && (
          <div className="bg-green-100 border border-green-300 rounded-lg p-4">
            <h4 className="font-semibold text-green-900 mb-2">✅ Keyboard Detected!</h4>
            <p className="text-green-800 text-sm">
              The virtual keyboard is currently visible. Height: {keyboardHeight}px
            </p>
          </div>
        )}
      </div>

      <Drawer open={open} onOpenChange={setOpen} handleKeyboard>
        <DrawerTrigger className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
          Test Keyboard Detection
        </DrawerTrigger>
        <DrawerOverlay />
        <DrawerContent
          style={{
            paddingBottom: isKeyboardVisible ? keyboardHeight : 0
          }}
        >
          <DrawerHeader>
            <h3 className="text-xl font-semibold text-gray-900">Keyboard Detection Test</h3>
            <p className="text-gray-600">
              {isKeyboardVisible 
                ? `Keyboard is visible (${keyboardHeight}px)` 
                : 'Keyboard is hidden'
              }
            </p>
          </DrawerHeader>
          
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
              <h4 className="font-semibold text-indigo-900 mb-2">Live Metrics</h4>
              <div className="text-indigo-800 text-sm space-y-1">
                <div>Keyboard Visible: {isKeyboardVisible ? 'Yes' : 'No'}</div>
                <div>Keyboard Height: {keyboardHeight}px</div>
                <div>Viewport Height: {viewportHeight}px</div>
                <div>Available Height: {availableHeight}px</div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">Test Inputs</h4>
              <input
                type="text"
                placeholder="Text input"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="email"
                placeholder="Email input"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="tel"
                placeholder="Phone input"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
              <textarea
                rows={3}
                placeholder="Textarea"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 resize-none"
              />
            </div>
          </div>
          
          <DrawerFooter>
            <button
              onClick={() => setOpen(false)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 rounded-lg w-full transition-colors"
            >
              Close
            </button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <CodeBlock>
{`import { useKeyboardHeight } from '@ios-drawer/react';

function KeyboardAwareDrawer() {
  const { keyboardHeight, isKeyboardVisible } = useKeyboardHeight();
  
  return (
    <Drawer handleKeyboard>
      <DrawerContent
        style={{
          paddingBottom: isKeyboardVisible ? keyboardHeight : 0
        }}
      >
        <input type="text" placeholder="Auto-adjusts for keyboard" />
      </DrawerContent>
    </Drawer>
  );
}`}
      </CodeBlock>
    </div>
  );
}

// Safe Area Example
function SafeAreaExample() {
  const [open, setOpen] = useState(false);
  const [safeAreaInsets, setSafeAreaInsets] = useState({ top: 0, bottom: 0, left: 0, right: 0 });

  useEffect(() => {
    // Get safe area insets from CSS environment variables
    const style = getComputedStyle(document.documentElement);
    const top = parseInt(style.getPropertyValue('--safe-area-inset-top') || '0', 10);
    const bottom = parseInt(style.getPropertyValue('--safe-area-inset-bottom') || '0', 10);
    const left = parseInt(style.getPropertyValue('--safe-area-inset-left') || '0', 10);
    const right = parseInt(style.getPropertyValue('--safe-area-inset-right') || '0', 10);
    
    setSafeAreaInsets({ top, bottom, left, right });
  }, []);

  return (
    <div className="space-y-4">
      <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-4">
        <h3 className="font-semibold text-gray-900">Current Safe Area Insets</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-red-50 p-3 rounded-lg text-center">
            <div className="text-2xl font-bold text-red-600">{safeAreaInsets.top}px</div>
            <div className="text-sm text-red-800">Top</div>
          </div>
          <div className="bg-green-50 p-3 rounded-lg text-center">
            <div className="text-2xl font-bold text-green-600">{safeAreaInsets.bottom}px</div>
            <div className="text-sm text-green-800">Bottom</div>
          </div>
          <div className="bg-blue-50 p-3 rounded-lg text-center">
            <div className="text-2xl font-bold text-blue-600">{safeAreaInsets.left}px</div>
            <div className="text-sm text-blue-800">Left</div>
          </div>
          <div className="bg-purple-50 p-3 rounded-lg text-center">
            <div className="text-2xl font-bold text-purple-600">{safeAreaInsets.right}px</div>
            <div className="text-sm text-purple-800">Right</div>
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-2">Safe Area Information</h4>
          <ul className="text-gray-700 text-sm space-y-1">
            <li>• Top inset typically accounts for notch or dynamic island</li>
            <li>• Bottom inset accounts for home indicator</li>
            <li>• Left/right insets for landscape mode or foldable devices</li>
            <li>• Values are 0 on devices without these features</li>
          </ul>
        </div>
      </div>

      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
          Test Safe Area Support
        </DrawerTrigger>
        <DrawerOverlay />
        <DrawerContent className="pb-safe pt-safe pl-safe pr-safe">
          <DrawerHeader>
            <h3 className="text-xl font-semibold text-gray-900">Safe Area Demo</h3>
            <p className="text-gray-600">Content respects device safe areas</p>
          </DrawerHeader>
          
          <div className="flex-1 p-6 space-y-4">
            <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
              <h4 className="font-semibold text-emerald-900 mb-2">Current Safe Areas</h4>
              <div className="grid grid-cols-2 gap-2 text-emerald-800 text-sm">
                <div>Top: {safeAreaInsets.top}px</div>
                <div>Bottom: {safeAreaInsets.bottom}px</div>
                <div>Left: {safeAreaInsets.left}px</div>
                <div>Right: {safeAreaInsets.right}px</div>
              </div>
            </div>
            
            <div className="bg-gray-100 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">CSS Classes Used</h4>
              <div className="text-gray-700 text-sm space-y-1">
                <code className="bg-white px-2 py-1 rounded">pt-safe</code> - padding-top: env(safe-area-inset-top)
                <br />
                <code className="bg-white px-2 py-1 rounded">pb-safe</code> - padding-bottom: env(safe-area-inset-bottom)
                <br />
                <code className="bg-white px-2 py-1 rounded">pl-safe</code> - padding-left: env(safe-area-inset-left)
                <br />
                <code className="bg-white px-2 py-1 rounded">pr-safe</code> - padding-right: env(safe-area-inset-right)
              </div>
            </div>
            
            <div className="border-2 border-dashed border-emerald-300 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Content Area</h4>
              <p className="text-gray-700 text-sm">
                This content area automatically adjusts for safe areas on devices with notches,
                home indicators, or other UI intrusions.
              </p>
            </div>
          </div>
          
          <DrawerFooter>
            <button
              onClick={() => setOpen(false)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-3 rounded-lg w-full transition-colors"
            >
              Close
            </button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <CodeBlock>
{`/* CSS Safe Area Classes */
.pt-safe { padding-top: env(safe-area-inset-top); }
.pb-safe { padding-bottom: env(safe-area-inset-bottom); }
.pl-safe { padding-left: env(safe-area-inset-left); }
.pr-safe { padding-right: env(safe-area-inset-right); }

/* Usage in JSX */
<DrawerContent className="pb-safe pt-safe">
  Content respects safe areas
</DrawerContent>`}
      </CodeBlock>
    </div>
  );
}

// Additional examples would continue here...
// For brevity, I'll include placeholder components for the remaining examples

function ViewportExample() {
  return (
    <div className="space-y-4">
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-4">Viewport Height Handling</h3>
        <p className="text-gray-600 mb-4">
          iOS Safari dynamically changes viewport height as UI elements appear/disappear.
          Our drawer automatically adapts to these changes.
        </p>
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h4 className="font-semibold text-blue-900 mb-2">Features</h4>
          <ul className="text-blue-800 text-sm space-y-1">
            <li>• Detects viewport height changes</li>
            <li>• Uses 100dvh when supported (iOS 15+)</li>
            <li>• Fallback to calculated height for older versions</li>
            <li>• Smooth transitions during changes</li>
          </ul>
        </div>
      </div>
      
      <CodeBlock>
{`/* CSS Viewport Height Variables */
:root {
  --viewport-height: 100vh;
  --dynamic-viewport-height: 100vh;
}

@supports (height: 100dvh) {
  :root {
    --dynamic-viewport-height: 100dvh;
  }
}

.drawer-content {
  height: var(--dynamic-viewport-height);
}`}
      </CodeBlock>
    </div>
  );
}

function InputZoomExample() {
  return (
    <div className="space-y-4">
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-4">Input Zoom Prevention</h3>
        <p className="text-gray-600 mb-4">
          Prevents iOS Safari from zooming when input fields are focused by setting
          appropriate font sizes and viewport meta tag configurations.
        </p>
        <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
          <h4 className="font-semibold text-orange-900 mb-2">Prevention Methods</h4>
          <ul className="text-orange-800 text-sm space-y-1">
            <li>• 16px minimum font size for inputs</li>
            <li>• Dynamic viewport meta tag adjustment</li>
            <li>• Temporary user-scalable=no during focus</li>
            <li>• Restored after blur event</li>
          </ul>
        </div>
      </div>
      
      <CodeBlock>
{`/* CSS to prevent zoom */
input, textarea, select {
  font-size: 16px !important;
}

/* Dynamic viewport adjustment */
function preventZoom(input) {
  const viewport = document.querySelector('meta[name="viewport"]');
  const original = viewport.content;
  
  input.addEventListener('focus', () => {
    viewport.content = original + ', user-scalable=no';
  });
  
  input.addEventListener('blur', () => {
    viewport.content = original;
  });
}`}
      </CodeBlock>
    </div>
  );
}

function ScrollLockExample() {
  const [lockEnabled, setLockEnabled] = useState(false);
  
  useScrollLock({
    enabled: lockEnabled,
    reserveScrollBarGap: true
  });

  return (
    <div className="space-y-4">
      <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-4">
        <h3 className="font-semibold text-gray-900">Scroll Lock & Bounce Prevention</h3>
        
        <div className="flex items-center gap-4">
          <button
            onClick={() => setLockEnabled(!lockEnabled)}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              lockEnabled 
                ? 'bg-red-600 hover:bg-red-700 text-white' 
                : 'bg-green-600 hover:bg-green-700 text-white'
            }`}
          >
            {lockEnabled ? 'Unlock Scroll' : 'Lock Scroll'}
          </button>
          <span className="text-gray-600">
            Status: {lockEnabled ? 'Locked' : 'Unlocked'}
          </span>
        </div>
        
        <div className={`p-4 rounded-lg border ${
          lockEnabled 
            ? 'bg-red-50 border-red-200' 
            : 'bg-gray-50 border-gray-200'
        }`}>
          <h4 className={`font-semibold mb-2 ${
            lockEnabled ? 'text-red-900' : 'text-gray-900'
          }`}>
            {lockEnabled ? '🔒 Scroll Locked' : '🔓 Scroll Unlocked'}
          </h4>
          <p className={`text-sm ${
            lockEnabled ? 'text-red-800' : 'text-gray-700'
          }`}>
            {lockEnabled 
              ? 'Background scrolling is currently prevented. Try scrolling this page.'
              : 'Background scrolling is allowed. Page can be scrolled normally.'
            }
          </p>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h4 className="font-semibold text-blue-900 mb-2">Features</h4>
          <ul className="text-blue-800 text-sm space-y-1">
            <li>• Prevents background page scrolling</li>
            <li>• Eliminates iOS rubber band effect</li>
            <li>• Preserves scrollbar width to prevent layout shift</li>
            <li>• Maintains scroll position when unlocked</li>
            <li>• Blocks touch interactions when needed</li>
          </ul>
        </div>
      </div>
      
      <CodeBlock>
{`import { useScrollLock } from '@ios-drawer/react';

function ScrollLockExample() {
  const [isLocked, setIsLocked] = useState(false);
  
  useScrollLock({
    enabled: isLocked,
    reserveScrollBarGap: true,
    allowPinchZoom: false,
    blockInteraction: false
  });
  
  return (
    <button onClick={() => setIsLocked(!isLocked)}>
      {isLocked ? 'Unlock' : 'Lock'} Scroll
    </button>
  );
}`}
      </CodeBlock>
    </div>
  );
}