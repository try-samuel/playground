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
 * Custom Styling Examples
 * Demonstrates various styling approaches and themes
 */
export function CustomStylingExample() {
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-2xl font-bold mb-6">Custom Styling Examples</h1>
      
      {/* Themed Drawers */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Themed Drawers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ThemedDrawer theme="success" />
          <ThemedDrawer theme="warning" />
          <ThemedDrawer theme="danger" />
        </div>
      </div>

      {/* Glassmorphism Style */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Glassmorphism Style</h2>
        <GlassmorphismDrawer />
      </div>

      {/* Card-style Drawer */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Card-style Drawer</h2>
        <CardStyleDrawer />
      </div>

      {/* Full-screen Mobile Drawer */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Full-screen Mobile</h2>
        <FullScreenDrawer />
      </div>

      {/* Custom Animation Drawer */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Custom Animations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CustomAnimationDrawer animation="bounce" />
          <CustomAnimationDrawer animation="slide-fade" />
        </div>
      </div>

      {/* Notification-style Drawer */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Notification Style</h2>
        <NotificationDrawer />
      </div>
    </div>
  );
}

/**
 * Themed Drawer Component
 */
function ThemedDrawer({ theme }: { theme: 'success' | 'warning' | 'danger' }) {
  const [open, setOpen] = useState(false);

  const themeConfig = {
    success: {
      bg: 'bg-green-500',
      hoverBg: 'bg-green-600',
      contentBg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-800',
      icon: '✅',
      title: 'Success'
    },
    warning: {
      bg: 'bg-yellow-500',
      hoverBg: 'bg-yellow-600',
      contentBg: 'bg-yellow-50',
      border: 'border-yellow-200',
      text: 'text-yellow-800',
      icon: '⚠️',
      title: 'Warning'
    },
    danger: {
      bg: 'bg-red-500',
      hoverBg: 'bg-red-600',
      contentBg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-800',
      icon: '❌',
      title: 'Danger'
    }
  }[theme];

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger className={`${themeConfig.bg} hover:${themeConfig.hoverBg} text-white px-4 py-2 rounded-lg w-full`}>
        {themeConfig.icon} {themeConfig.title} Theme
      </DrawerTrigger>
      <DrawerOverlay className="bg-black/30" />
      <DrawerContent className={`${themeConfig.contentBg} ${themeConfig.border} border-2`}>
        <DrawerHeader className={`${themeConfig.text} ${themeConfig.border} border-b-2`}>
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <span className="text-2xl">{themeConfig.icon}</span>
            {themeConfig.title} Drawer
          </h3>
          <p className="opacity-80">This drawer uses a {theme} theme</p>
        </DrawerHeader>
        
        <div className="flex-1 p-4">
          <div className={`${themeConfig.text} space-y-4`}>
            <p>This is an example of a themed drawer with consistent styling.</p>
            <div className="space-y-2">
              <div className="bg-white/50 p-3 rounded-lg">
                <strong>Theme:</strong> {themeConfig.title}
              </div>
              <div className="bg-white/50 p-3 rounded-lg">
                <strong>Style:</strong> Consistent color scheme
              </div>
              <div className="bg-white/50 p-3 rounded-lg">
                <strong>Usage:</strong> Status indicators, alerts, notifications
              </div>
            </div>
          </div>
        </div>
        
        <DrawerFooter className={`${themeConfig.border} border-t-2 bg-white/30`}>
          <button
            onClick={() => setOpen(false)}
            className={`${themeConfig.bg} hover:${themeConfig.hoverBg} text-white px-4 py-2 rounded-lg w-full`}
          >
            Close
          </button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

/**
 * Glassmorphism Style Drawer
 */
function GlassmorphismDrawer() {
  const [open, setOpen] = useState(false);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-xl backdrop-blur-sm">
        ✨ Glassmorphism Style
      </DrawerTrigger>
      <DrawerOverlay className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-sm" />
      <DrawerContent className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl">
        <DrawerHandle handleClassName="bg-white/40" />
        <DrawerHeader className="text-white border-b border-white/20 bg-white/5">
          <h3 className="text-xl font-semibold">✨ Glassmorphism Design</h3>
          <p className="text-white/80">Modern transparent design with blur effects</p>
        </DrawerHeader>
        
        <div className="flex-1 p-6 text-white">
          <div className="space-y-4">
            <div className="bg-white/10 p-4 rounded-xl border border-white/20">
              <h4 className="font-semibold mb-2">🎨 Design Features</h4>
              <ul className="text-white/90 space-y-1 text-sm">
                <li>• Frosted glass effect</li>
                <li>• Subtle transparency</li>
                <li>• Backdrop blur filtering</li>
                <li>• Gradient overlays</li>
              </ul>
            </div>
            
            <div className="bg-white/10 p-4 rounded-xl border border-white/20">
              <h4 className="font-semibold mb-2">💫 Visual Appeal</h4>
              <p className="text-white/90 text-sm">
                Creates depth and modern aesthetics while maintaining readability
                and accessibility standards.
              </p>
            </div>
            
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white/10 p-3 rounded-lg border border-white/20 text-center">
                  <div className="text-2xl mb-1">🌟</div>
                  <div className="text-xs text-white/80">Element {i}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <DrawerFooter className="border-t border-white/20 bg-white/5">
          <button
            onClick={() => setOpen(false)}
            className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-xl border border-white/20 w-full backdrop-blur-sm transition-all"
          >
            Close
          </button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

/**
 * Card-style Drawer
 */
function CardStyleDrawer() {
  const [open, setOpen] = useState(false);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger className="bg-white hover:bg-gray-50 text-gray-800 px-6 py-3 rounded-2xl shadow-lg border border-gray-200">
        🃏 Card Style
      </DrawerTrigger>
      <DrawerOverlay className="bg-gray-900/50" />
      <DrawerContent className="bg-white rounded-t-3xl shadow-2xl max-w-md mx-auto">
        <div className="flex flex-col h-full">
          <div className="flex justify-center pt-3 pb-2">
            <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
          </div>
          
          <DrawerHeader className="text-center border-b border-gray-100 bg-gray-50/50">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-2xl text-white mb-3">
              🃏
            </div>
            <h3 className="text-xl font-bold text-gray-900">Card Design</h3>
            <p className="text-gray-600 text-sm">Clean and minimal card-like interface</p>
          </DrawerHeader>
          
          <div className="flex-1 p-6">
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-2xl border border-blue-100">
                <h4 className="font-semibold text-gray-900 mb-2">📱 Mobile-First</h4>
                <p className="text-gray-700 text-sm">
                  Designed with mobile interactions in mind, featuring touch-friendly elements
                  and intuitive gestures.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 p-4 rounded-xl text-center">
                  <div className="text-2xl mb-2">⚡</div>
                  <div className="text-sm font-medium text-gray-900">Fast</div>
                  <div className="text-xs text-gray-600">Quick animations</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl text-center">
                  <div className="text-2xl mb-2">🎯</div>
                  <div className="text-sm font-medium text-gray-900">Precise</div>
                  <div className="text-xs text-gray-600">Pixel perfect</div>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <div className="flex-1 h-2 bg-blue-200 rounded-full overflow-hidden">
                  <div className="w-3/4 h-full bg-blue-500 rounded-full"></div>
                </div>
                <span className="text-xs text-gray-600">75%</span>
              </div>
            </div>
          </div>
          
          <DrawerFooter className="border-t border-gray-100 bg-gray-50/50">
            <div className="grid grid-cols-2 gap-3">
              <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-3 rounded-xl font-medium transition-colors">
                Secondary
              </button>
              <button
                onClick={() => setOpen(false)}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-3 rounded-xl font-medium transition-all"
              >
                Primary
              </button>
            </div>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

/**
 * Full-screen Mobile Drawer
 */
function FullScreenDrawer() {
  const [open, setOpen] = useState(false);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-lg">
        📱 Full Screen
      </DrawerTrigger>
      <DrawerOverlay className="bg-black/90" />
      <DrawerContent className="bg-white h-full rounded-none md:rounded-t-3xl md:h-auto md:max-h-[90vh]">
        <div className="flex flex-col h-full">
          <DrawerHeader className="flex-shrink-0 flex items-center justify-between p-4 border-b border-gray-200">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Full Screen View</h3>
              <p className="text-gray-600 text-sm">Optimized for mobile devices</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </DrawerHeader>
          
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl text-white">
                  📱
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Mobile Optimized</h4>
                <p className="text-gray-600">
                  This drawer takes up the full screen on mobile devices for an immersive experience.
                </p>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                {[
                  { icon: '🎯', title: 'Focused Experience', desc: 'No distractions from other UI elements' },
                  { icon: '👆', title: 'Touch Friendly', desc: 'Large touch targets and gesture support' },
                  { icon: '⚡', title: 'Performance', desc: 'Smooth animations and transitions' },
                  { icon: '♿', title: 'Accessible', desc: 'Full keyboard and screen reader support' }
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
                    <div className="text-2xl">{item.icon}</div>
                    <div className="flex-1">
                      <h5 className="font-semibold text-gray-900 mb-1">{item.title}</h5>
                      <p className="text-gray-600 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-2xl border border-indigo-100">
                <h5 className="font-semibold text-gray-900 mb-3">Responsive Design</h5>
                <p className="text-gray-700 text-sm mb-4">
                  On larger screens, this drawer behaves like a regular modal. On mobile devices,
                  it expands to full screen for better usability.
                </p>
                <div className="flex items-center space-x-2 text-sm text-indigo-700">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                  <span>Automatically adapts to screen size</span>
                </div>
              </div>
            </div>
          </div>
          
          <DrawerFooter className="flex-shrink-0 p-4 border-t border-gray-200 bg-gray-50">
            <button
              onClick={() => setOpen(false)}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 rounded-xl font-medium transition-colors"
            >
              Got it!
            </button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

/**
 * Custom Animation Drawer
 */
function CustomAnimationDrawer({ animation }: { animation: 'bounce' | 'slide-fade' }) {
  const [open, setOpen] = useState(false);

  const animationConfig = {
    bounce: {
      title: '🎾 Bounce',
      stiffness: 400,
      damping: 20,
      description: 'Playful bounce animation with spring physics'
    },
    'slide-fade': {
      title: '✨ Slide Fade',
      stiffness: 300,
      damping: 30,
      description: 'Smooth slide with fade-in effect'
    }
  }[animation];

  return (
    <Drawer
      open={open}
      onOpenChange={setOpen}
      stiffness={animationConfig.stiffness}
      dampingRatio={animationConfig.damping}
    >
      <DrawerTrigger className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-4 py-2 rounded-lg w-full">
        {animationConfig.title}
      </DrawerTrigger>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader>
          <h3 className="text-xl font-semibold">{animationConfig.title} Animation</h3>
          <p className="text-gray-600">{animationConfig.description}</p>
        </DrawerHeader>
        
        <div className="flex-1 p-4">
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-2">Animation Settings</h4>
              <div className="text-sm text-blue-800 space-y-1">
                <div>Stiffness: {animationConfig.stiffness}</div>
                <div>Damping: {animationConfig.damping}</div>
              </div>
            </div>
            
            <p className="text-gray-700">
              This drawer uses custom animation settings to create a unique feel.
              The animation parameters can be adjusted to match your brand's personality.
            </p>
          </div>
        </div>
        
        <DrawerFooter>
          <button
            onClick={() => setOpen(false)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg w-full"
          >
            Close
          </button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

/**
 * Notification-style Drawer
 */
function NotificationDrawer() {
  const [open, setOpen] = useState(false);

  return (
    <Drawer
      open={open}
      onOpenChange={setOpen}
      direction="top"
      snapPoints={['auto']}
      dismissible={false}
    >
      <DrawerTrigger className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg">
        🔔 Show Notification
      </DrawerTrigger>
      <DrawerOverlay className="bg-transparent" />
      <DrawerContent className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-none shadow-lg rounded-b-xl max-w-md mx-auto">
        <div className="p-4">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                🔔
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-white mb-1">New Message Received</h4>
              <p className="text-white/90 text-sm">
                You have a new message from the team. Check it out now!
              </p>
              <div className="flex space-x-3 mt-3">
                <button className="bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded-md text-sm transition-colors">
                  View
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded-md text-sm transition-colors"
                >
                  Dismiss
                </button>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="flex-shrink-0 p-1 hover:bg-white/20 rounded-full transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export default CustomStylingExample;