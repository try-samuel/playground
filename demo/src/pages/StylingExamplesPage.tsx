import React, { useState } from 'react';
import { Palette, Sparkles, Moon, Sun, Zap, Heart } from 'lucide-react';
import {
  Drawer,
  DrawerContent,
  DrawerOverlay,
  DrawerTrigger,
  DrawerHeader,
  DrawerFooter,
  DrawerHandle
} from '../components/drawer';

export function StylingExamplesPage() {
  return (
    <div className="space-y-12">
      {/* Page Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">Custom Styling Examples</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Explore different styling approaches, themes, and visual customizations for the iOS drawer component.
          From subtle variations to bold designs, see how flexible the component can be.
        </p>
      </div>

      {/* Themed Drawers */}
      <ExampleSection
        title="1. Themed Drawers"
        description="Pre-built themes with consistent color schemes and styling."
        icon={<Palette className="w-6 h-6" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ThemedDrawer theme="success" />
          <ThemedDrawer theme="warning" />
          <ThemedDrawer theme="danger" />
        </div>
      </ExampleSection>

      {/* Glassmorphism */}
      <ExampleSection
        title="2. Glassmorphism Design"
        description="Modern frosted glass effect with backdrop blur and transparency."
        icon={<Sparkles className="w-6 h-6" />}
      >
        <GlassmorphismDrawer />
      </ExampleSection>

      {/* Dark Mode */}
      <ExampleSection
        title="3. Dark Mode Support"
        description="Toggle between light and dark themes with smooth transitions."
        icon={<Moon className="w-6 h-6" />}
      >
        <DarkModeDrawer />
      </ExampleSection>

      {/* Card Style */}
      <ExampleSection
        title="4. Card-Style Design"
        description="Clean, card-like interface with subtle shadows and rounded corners."
        icon={<Heart className="w-6 h-6" />}
      >
        <CardStyleDrawer />
      </ExampleSection>

      {/* Custom Animations */}
      <ExampleSection
        title="5. Custom Animations"
        description="Different animation styles and spring physics configurations."
        icon={<Zap className="w-6 h-6" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CustomAnimationDrawer animation="bounce" />
          <CustomAnimationDrawer animation="slide-fade" />
        </div>
      </ExampleSection>

      {/* Gradient Styles */}
      <ExampleSection
        title="6. Gradient & Effects"
        description="Beautiful gradients, shadows, and visual effects."
        icon={<Sparkles className="w-6 h-6" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <GradientDrawer variant="sunset" />
          <GradientDrawer variant="ocean" />
        </div>
      </ExampleSection>

      {/* Full Screen Mobile */}
      <ExampleSection
        title="7. Full-Screen Mobile"
        description="Adaptive design that goes full-screen on mobile devices."
        icon={<Sun className="w-6 h-6" />}
      >
        <FullScreenDrawer />
      </ExampleSection>

      {/* CSS Variables Demo */}
      <ExampleSection
        title="8. CSS Variables Customization"
        description="Real-time customization using CSS custom properties."
        icon={<Palette className="w-6 h-6" />}
      >
        <CSSVariablesDemo />
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
    <div className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto mt-4">
      <pre className="text-sm">{children}</pre>
    </div>
  );
}

// Themed Drawer Component
function ThemedDrawer({ theme }: { theme: 'success' | 'warning' | 'danger' }) {
  const [open, setOpen] = useState(false);

  const themeConfig = {
    success: {
      bg: 'bg-green-500 hover:bg-green-600',
      contentBg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-800',
      icon: '✅',
      title: 'Success Theme',
      overlayBg: 'bg-green-900/20'
    },
    warning: {
      bg: 'bg-yellow-500 hover:bg-yellow-600',
      contentBg: 'bg-yellow-50',
      border: 'border-yellow-200',
      text: 'text-yellow-800',
      icon: '⚠️',
      title: 'Warning Theme',
      overlayBg: 'bg-yellow-900/20'
    },
    danger: {
      bg: 'bg-red-500 hover:bg-red-600',
      contentBg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-800',
      icon: '❌',
      title: 'Danger Theme',
      overlayBg: 'bg-red-900/20'
    }
  }[theme];

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-4">
      <div className="text-center">
        <div className="text-3xl mb-2">{themeConfig.icon}</div>
        <h3 className="font-semibold text-gray-900">{themeConfig.title}</h3>
      </div>
      
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger className={`w-full ${themeConfig.bg} text-white px-4 py-3 rounded-lg font-medium transition-colors`}>
          Open {theme.charAt(0).toUpperCase() + theme.slice(1)} Drawer
        </DrawerTrigger>
        <DrawerOverlay className={themeConfig.overlayBg} />
        <DrawerContent className={`${themeConfig.contentBg} ${themeConfig.border} border-2`}>
          <DrawerHeader className={`${themeConfig.text} ${themeConfig.border} border-b-2`}>
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <span className="text-2xl">{themeConfig.icon}</span>
              {themeConfig.title}
            </h3>
            <p className="opacity-80">Consistent themed styling</p>
          </DrawerHeader>
          
          <div className="flex-1 p-6">
            <div className={`${themeConfig.text} space-y-4`}>
              <div className="bg-white/50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Theme Features</h4>
                <ul className="text-sm space-y-1">
                  <li>• Consistent color scheme</li>
                  <li>• Matching overlays and borders</li>
                  <li>• Accessible contrast ratios</li>
                  <li>• Semantic color usage</li>
                </ul>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-white/50 p-3 rounded-lg text-center">
                    <div className="text-lg mb-1">{themeConfig.icon}</div>
                    <div className="text-xs">Item {i}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <DrawerFooter className={`${themeConfig.border} border-t-2 bg-white/30`}>
            <button
              onClick={() => setOpen(false)}
              className={`${themeConfig.bg} text-white px-4 py-2 rounded-lg w-full transition-colors`}
            >
              Close
            </button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

// Glassmorphism Drawer
function GlassmorphismDrawer() {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-4">
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 rounded-xl backdrop-blur-sm font-medium transition-all">
          ✨ Open Glassmorphism Drawer
        </DrawerTrigger>
        <DrawerOverlay className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-sm" />
        <DrawerContent className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">
          <DrawerHandle handleClassName="bg-white/40" />
          <DrawerHeader className="text-white border-b border-white/20 bg-white/5">
            <h3 className="text-xl font-semibold">✨ Glassmorphism Design</h3>
            <p className="text-white/80">Modern frosted glass aesthetic</p>
          </DrawerHeader>
          
          <div className="flex-1 p-6 text-white space-y-4">
            <div className="bg-white/10 p-4 rounded-xl border border-white/20">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                🎨 Design Features
              </h4>
              <ul className="text-white/90 space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-white/60 rounded-full"></span>
                  Frosted glass background blur
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-white/60 rounded-full"></span>
                  Subtle transparency layers
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-white/60 rounded-full"></span>
                  Gradient overlays
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-white/60 rounded-full"></span>
                  Layered depth effects
                </li>
              </ul>
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white/10 p-4 rounded-xl border border-white/20 text-center">
                  <div className="text-2xl mb-2">🌟</div>
                  <div className="text-xs text-white/80">Card {i}</div>
                </div>
              ))}
            </div>
            
            <div className="bg-gradient-to-r from-white/10 to-white/5 p-4 rounded-xl border border-white/20">
              <h4 className="font-semibold mb-2">💫 Visual Appeal</h4>
              <p className="text-white/90 text-sm">
                Creates depth and modern aesthetics while maintaining excellent readability
                and accessibility standards.
              </p>
            </div>
          </div>
          
          <DrawerFooter className="border-t border-white/20 bg-white/5">
            <button
              onClick={() => setOpen(false)}
              className="bg-white/20 hover:bg-white/30 text-white px-4 py-3 rounded-xl border border-white/20 w-full backdrop-blur-sm transition-all"
            >
              Close
            </button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <CodeBlock>
{`<Drawer>
  <DrawerOverlay className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-sm" />
  <DrawerContent className="bg-white/10 backdrop-blur-xl border border-white/20">
    <div className="bg-white/10 p-4 rounded-xl border border-white/20">
      <h4>Frosted Glass Effect</h4>
    </div>
  </DrawerContent>
</Drawer>`}
      </CodeBlock>
    </div>
  );
}

// Dark Mode Drawer
function DarkModeDrawer() {
  const [open, setOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setIsDark(!isDark)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
        >
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          {isDark ? 'Light Mode' : 'Dark Mode'}
        </button>
        <span className="text-gray-600">Current: {isDark ? 'Dark' : 'Light'}</span>
      </div>

      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger className="bg-slate-800 hover:bg-slate-900 text-white px-6 py-3 rounded-lg font-medium transition-colors">
          🌙 Open Dark Mode Drawer
        </DrawerTrigger>
        <DrawerOverlay className={isDark ? 'bg-black/70' : 'bg-black/50'} />
        <DrawerContent className={`${isDark ? 'bg-slate-900 text-white' : 'bg-white text-gray-900'} transition-colors duration-300`}>
          <DrawerHeader className={`border-b ${isDark ? 'border-slate-700' : 'border-gray-200'}`}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  {isDark ? '🌙' : '☀️'} {isDark ? 'Dark' : 'Light'} Mode
                </h3>
                <p className={isDark ? 'text-slate-400' : 'text-gray-600'}>
                  Dynamic theme switching
                </p>
              </div>
              <button
                onClick={() => setIsDark(!isDark)}
                className={`p-2 rounded-lg transition-colors ${
                  isDark 
                    ? 'bg-slate-800 hover:bg-slate-700 text-slate-300' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                }`}
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
          </DrawerHeader>
          
          <div className="flex-1 p-6 space-y-4">
            <div className={`p-4 rounded-lg border ${
              isDark 
                ? 'bg-slate-800 border-slate-700' 
                : 'bg-blue-50 border-blue-200'
            }`}>
              <h4 className={`font-semibold mb-2 ${isDark ? 'text-slate-200' : 'text-blue-900'}`}>
                Theme Features
              </h4>
              <ul className={`text-sm space-y-1 ${isDark ? 'text-slate-400' : 'text-blue-800'}`}>
                <li>• Automatic color scheme detection</li>
                <li>• Smooth transitions between themes</li>
                <li>• Accessible contrast ratios</li>
                <li>• System theme integration</li>
              </ul>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className={`p-4 rounded-lg ${
                isDark ? 'bg-slate-800' : 'bg-gray-100'
              }`}>
                <div className="text-2xl mb-2">🎨</div>
                <h5 className="font-medium">Colors</h5>
                <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
                  Adaptive color palette
                </p>
              </div>
              <div className={`p-4 rounded-lg ${
                isDark ? 'bg-slate-800' : 'bg-gray-100'
              }`}>
                <div className="text-2xl mb-2">🔧</div>
                <h5 className="font-medium">System</h5>
                <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
                  Follows OS preference
                </p>
              </div>
            </div>
          </div>
          
          <DrawerFooter className={`border-t ${isDark ? 'border-slate-700 bg-slate-900/50' : 'border-gray-200 bg-gray-50'}`}>
            <button
              onClick={() => setOpen(false)}
              className={`w-full px-4 py-3 rounded-lg font-medium transition-colors ${
                isDark 
                  ? 'bg-slate-700 hover:bg-slate-600 text-white' 
                  : 'bg-slate-800 hover:bg-slate-900 text-white'
              }`}
            >
              Close
            </button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <CodeBlock>
{`function DarkModeDrawer() {
  const [isDark, setIsDark] = useState(false);
  
  return (
    <Drawer>
      <DrawerContent className={\`\${isDark ? 'bg-slate-900 text-white' : 'bg-white text-gray-900'} transition-colors\`}>
        <button onClick={() => setIsDark(!isDark)}>
          Toggle Theme
        </button>
      </DrawerContent>
    </Drawer>
  );
}`}
      </CodeBlock>
    </div>
  );
}

// Additional components would continue here...
// For brevity, I'll include just a few key ones

function CardStyleDrawer() {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-4">
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger className="bg-white hover:bg-gray-50 text-gray-800 px-6 py-3 rounded-2xl shadow-lg border border-gray-200 font-medium transition-all">
          🃏 Card Style Drawer
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
              <p className="text-gray-600 text-sm">Clean and minimal interface</p>
            </DrawerHeader>
            
            <div className="flex-1 p-6 space-y-4">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-2xl border border-blue-100">
                <h4 className="font-semibold text-gray-900 mb-2">📱 Features</h4>
                <ul className="text-gray-700 text-sm space-y-1">
                  <li>• Mobile-first design</li>
                  <li>• Touch-friendly elements</li>
                  <li>• Clean visual hierarchy</li>
                  <li>• Subtle shadows and depth</li>
                </ul>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 p-4 rounded-xl text-center">
                  <div className="text-2xl mb-2">⚡</div>
                  <div className="text-sm font-medium text-gray-900">Fast</div>
                  <div className="text-xs text-gray-600">Quick load</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl text-center">
                  <div className="text-2xl mb-2">🎯</div>
                  <div className="text-sm font-medium text-gray-900">Precise</div>
                  <div className="text-xs text-gray-600">Pixel perfect</div>
                </div>
              </div>
            </div>
            
            <DrawerFooter className="border-t border-gray-100 bg-gray-50/50">
              <button
                onClick={() => setOpen(false)}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-3 rounded-xl font-medium transition-all"
              >
                Close
              </button>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>

      <CodeBlock>
{`<DrawerContent className="bg-white rounded-t-3xl shadow-2xl max-w-md mx-auto">
  <div className="flex justify-center pt-3 pb-2">
    <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
  </div>
  
  <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl">
    🃏
  </div>
</DrawerContent>`}
      </CodeBlock>
    </div>
  );
}

function CustomAnimationDrawer({ animation }: { animation: 'bounce' | 'slide-fade' }) {
  const [open, setOpen] = useState(false);

  const animationConfig = {
    bounce: {
      title: '🎾 Bounce Animation',
      stiffness: 400,
      damping: 20,
      description: 'Playful bounce with spring physics'
    },
    'slide-fade': {
      title: '✨ Slide Fade',
      stiffness: 300,
      damping: 30,
      description: 'Smooth slide with fade effect'
    }
  }[animation];

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-4">
      <div className="text-center">
        <h3 className="font-semibold text-gray-900 mb-2">{animationConfig.title}</h3>
        <p className="text-gray-600 text-sm">{animationConfig.description}</p>
      </div>

      <Drawer
        open={open}
        onOpenChange={setOpen}
        stiffness={animationConfig.stiffness}
        dampingRatio={animationConfig.damping}
      >
        <DrawerTrigger className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-4 py-3 rounded-lg font-medium transition-all">
          Try {animationConfig.title}
        </DrawerTrigger>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>
            <h3 className="text-xl font-semibold">{animationConfig.title}</h3>
            <p className="text-gray-600">{animationConfig.description}</p>
          </DrawerHeader>
          
          <div className="flex-1 p-6 space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-2">Animation Settings</h4>
              <div className="text-sm text-blue-800 space-y-1">
                <div>Stiffness: {animationConfig.stiffness}</div>
                <div>Damping: {animationConfig.damping}</div>
                <div>Type: Spring physics</div>
              </div>
            </div>
            
            <p className="text-gray-700">
              This drawer uses custom animation parameters to create a unique feel.
              The spring physics can be fine-tuned to match your brand's personality.
            </p>
          </div>
          
          <DrawerFooter>
            <button
              onClick={() => setOpen(false)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-lg w-full transition-colors"
            >
              Close
            </button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

function GradientDrawer({ variant }: { variant: 'sunset' | 'ocean' }) {
  const [open, setOpen] = useState(false);

  const gradientConfig = {
    sunset: {
      title: '🌅 Sunset Gradient',
      bg: 'bg-gradient-to-r from-orange-400 via-red-500 to-pink-500',
      contentBg: 'bg-gradient-to-br from-orange-50 to-pink-50',
      overlayBg: 'bg-gradient-to-br from-orange-900/20 to-pink-900/20'
    },
    ocean: {
      title: '🌊 Ocean Gradient',
      bg: 'bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-500',
      contentBg: 'bg-gradient-to-br from-blue-50 to-cyan-50',
      overlayBg: 'bg-gradient-to-br from-blue-900/20 to-cyan-900/20'
    }
  }[variant];

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-4">
      <div className="text-center">
        <h3 className="font-semibold text-gray-900 mb-2">{gradientConfig.title}</h3>
        <p className="text-gray-600 text-sm">Beautiful gradient effects</p>
      </div>

      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger className={`w-full ${gradientConfig.bg} hover:opacity-90 text-white px-4 py-3 rounded-lg font-medium transition-all`}>
          Open {gradientConfig.title}
        </DrawerTrigger>
        <DrawerOverlay className={gradientConfig.overlayBg} />
        <DrawerContent className={gradientConfig.contentBg}>
          <DrawerHeader>
            <h3 className="text-xl font-semibold text-gray-900">{gradientConfig.title}</h3>
            <p className="text-gray-600">Smooth gradient transitions</p>
          </DrawerHeader>
          
          <div className="flex-1 p-6 space-y-4">
            <div className="bg-white/60 backdrop-blur-sm p-4 rounded-lg border border-white/40">
              <h4 className="font-semibold text-gray-900 mb-2">Gradient Features</h4>
              <ul className="text-gray-700 text-sm space-y-1">
                <li>• Smooth color transitions</li>
                <li>• Multiple color stops</li>
                <li>• Backdrop blur effects</li>
                <li>• Layered transparency</li>
              </ul>
            </div>
          </div>
          
          <DrawerFooter>
            <button
              onClick={() => setOpen(false)}
              className={`${gradientConfig.bg} hover:opacity-90 text-white px-4 py-3 rounded-lg w-full transition-all`}
            >
              Close
            </button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

function FullScreenDrawer() {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-4">
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-medium transition-colors">
          📱 Full Screen Mobile
        </DrawerTrigger>
        <DrawerOverlay className="bg-black/90" />
        <DrawerContent className="bg-white h-full rounded-none md:rounded-t-3xl md:h-auto md:max-h-[90vh]">
          <DrawerHeader className="flex items-center justify-between border-b border-gray-200">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Mobile-First Design</h3>
              <p className="text-gray-600 text-sm">Adaptive full-screen experience</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              ✕
            </button>
          </DrawerHeader>
          
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl text-white">
                📱
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Mobile Optimized</h4>
              <p className="text-gray-600">
                Full-screen on mobile, modal on desktop
              </p>
            </div>
            
            <div className="space-y-3">
              {[
                { icon: '🎯', title: 'Focused Experience', desc: 'No distractions' },
                { icon: '👆', title: 'Touch Friendly', desc: 'Large touch targets' },
                { icon: '⚡', title: 'Performance', desc: 'Smooth animations' },
                { icon: '♿', title: 'Accessible', desc: 'Full keyboard support' }
              ].map((item, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
                  <div className="text-2xl">{item.icon}</div>
                  <div>
                    <h5 className="font-semibold text-gray-900">{item.title}</h5>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <DrawerFooter className="border-t border-gray-200 bg-gray-50">
            <button
              onClick={() => setOpen(false)}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 rounded-xl font-medium transition-colors"
            >
              Got it!
            </button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <CodeBlock>
{`<DrawerContent className="bg-white h-full rounded-none md:rounded-t-3xl md:h-auto md:max-h-[90vh]">
  {/* Full screen on mobile, modal on desktop */}
</DrawerContent>`}
      </CodeBlock>
    </div>
  );
}

function CSSVariablesDemo() {
  const [open, setOpen] = useState(false);
  const [borderRadius, setBorderRadius] = useState(12);
  const [shadowIntensity, setShadowIntensity] = useState(25);

  const customStyles = {
    '--drawer-border-radius': `${borderRadius}px`,
    '--drawer-shadow': `0 ${shadowIntensity}px ${shadowIntensity * 2}px -12px rgba(0, 0, 0, 0.25)`
  } as React.CSSProperties;

  return (
    <div className="space-y-4">
      <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-4">
        <h3 className="font-semibold text-gray-900">Live Customization</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Border Radius: {borderRadius}px
            </label>
            <input
              type="range"
              min="0"
              max="24"
              value={borderRadius}
              onChange={(e) => setBorderRadius(Number(e.target.value))}
              className="w-full"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Shadow Intensity: {shadowIntensity}px
            </label>
            <input
              type="range"
              min="0"
              max="50"
              value={shadowIntensity}
              onChange={(e) => setShadowIntensity(Number(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
      </div>

      <div style={customStyles}>
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
            🎛️ CSS Variables Demo
          </DrawerTrigger>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader>
              <h3 className="text-xl font-semibold text-gray-900">CSS Variables</h3>
              <p className="text-gray-600">Real-time customization</p>
            </DrawerHeader>
            
            <div className="flex-1 p-6 space-y-4">
              <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
                <h4 className="font-semibold text-indigo-900 mb-2">Current Settings</h4>
                <div className="text-indigo-800 text-sm space-y-1">
                  <div>Border Radius: {borderRadius}px</div>
                  <div>Shadow Intensity: {shadowIntensity}px</div>
                </div>
              </div>
              
              <div className="bg-gray-100 p-4 rounded-lg">
                <pre className="text-sm overflow-x-auto">
{`:root {
  --drawer-border-radius: ${borderRadius}px;
  --drawer-shadow: 0 ${shadowIntensity}px ${shadowIntensity * 2}px -12px rgba(0, 0, 0, 0.25);
}`}
                </pre>
              </div>
            </div>
            
            <DrawerFooter>
              <button
                onClick={() => setOpen(false)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 rounded-lg w-full transition-colors"
              >
                Apply Changes
              </button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>

      <CodeBlock>
{`:root {
  --drawer-border-radius: 12px;
  --drawer-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  --drawer-overlay-bg: rgba(0, 0, 0, 0.5);
  --drawer-content-bg: white;
}

.ios-drawer-content {
  border-radius: var(--drawer-border-radius);
  box-shadow: var(--drawer-shadow);
  background: var(--drawer-content-bg);
}`}
      </CodeBlock>
    </div>
  );
}