import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Smartphone, 
  Zap, 
  Shield, 
  Palette,
  Code,
  ArrowRight,
  CheckCircle,
  Star
} from 'lucide-react';
import {
  Drawer,
  DrawerContent,
  DrawerOverlay,
  DrawerTrigger,
  DrawerHeader,
  DrawerFooter,
  DrawerHandle
} from '../components/drawer';

export function HomePage() {
  const [quickDemoOpen, setQuickDemoOpen] = useState(false);

  const features = [
    {
      icon: <Smartphone className="w-8 h-8 text-blue-600" />,
      title: 'iOS-First Design',
      description: 'Built specifically for iOS Safari with proper viewport, keyboard, and safe area handling.'
    },
    {
      icon: <Zap className="w-8 h-8 text-yellow-600" />,
      title: 'Gesture Support',
      description: 'Natural drag interactions with velocity detection and smooth snap points.'
    },
    {
      icon: <Shield className="w-8 h-8 text-green-600" />,
      title: 'Accessibility First',
      description: 'WCAG 2.1 AA compliant with full keyboard navigation and screen reader support.'
    },
    {
      icon: <Palette className="w-8 h-8 text-purple-600" />,
      title: 'Highly Customizable',
      description: 'Tailwind CSS integration, CSS variables, and multiple styling approaches.'
    }
  ];

  const usagePatterns = [
    {
      title: 'Basic Usage',
      description: 'Simple drawer implementation with minimal setup',
      link: '/basic',
      icon: '📱'
    },
    {
      title: 'Form Integration',
      description: 'Forms with iOS keyboard handling and validation',
      link: '/forms',
      icon: '📝'
    },
    {
      title: 'Custom Styling',
      description: 'Themes, animations, and visual customization',
      link: '/styling',
      icon: '🎨'
    },
    {
      title: 'Advanced Features',
      description: 'Complex interactions and performance optimization',
      link: '/advanced',
      icon: '⚡'
    },
    {
      title: 'iOS-Specific',
      description: 'iOS Safari features and mobile optimizations',
      link: '/ios-features',
      icon: '📱'
    },
    {
      title: 'Accessibility',
      description: 'Screen readers, keyboard navigation, and WCAG compliance',
      link: '/accessibility',
      icon: '♿'
    }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
            iOS-Friendly
            <span className="text-blue-600"> Drawer</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A comprehensive, portable React drawer component with seamless iOS Safari support,
            gesture interactions, and accessibility features.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Drawer open={quickDemoOpen} onOpenChange={setQuickDemoOpen}>
            <DrawerTrigger className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              Try Quick Demo
            </DrawerTrigger>
            <DrawerOverlay />
            <DrawerContent>
              <DrawerHandle />
              <DrawerHeader>
                <h3 className="text-2xl font-bold text-gray-900">✨ Quick Demo</h3>
                <p className="text-gray-600">Experience the iOS drawer in action!</p>
              </DrawerHeader>
              
              <div className="flex-1 p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                    <h4 className="font-semibold text-blue-900 mb-2">🎯 Gesture Support</h4>
                    <p className="text-blue-800 text-sm">
                      Drag this drawer up and down to feel the natural interactions with velocity detection.
                    </p>
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-xl border border-green-200">
                    <h4 className="font-semibold text-green-900 mb-2">📱 iOS Optimized</h4>
                    <p className="text-green-800 text-sm">
                      Perfect viewport handling, keyboard support, and safe area awareness.
                    </p>
                  </div>
                  
                  <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
                    <h4 className="font-semibold text-purple-900 mb-2">♿ Accessible</h4>
                    <p className="text-purple-800 text-sm">
                      Full keyboard navigation, screen reader support, and focus management.
                    </p>
                  </div>
                  
                  <div className="bg-orange-50 p-4 rounded-xl border border-orange-200">
                    <h4 className="font-semibold text-orange-900 mb-2">⚡ Performant</h4>
                    <p className="text-orange-800 text-sm">
                      60fps animations using hardware acceleration and optimized rendering.
                    </p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl border border-blue-200">
                  <h4 className="font-semibold text-gray-900 mb-3">🚀 Quick Start</h4>
                  <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                    <div>npm install @ios-drawer/react</div>
                    <div className="mt-2 text-gray-400">// Import and use</div>
                    <div>import &#123; Drawer, DrawerContent &#125; from '@ios-drawer/react';</div>
                  </div>
                </div>
              </div>
              
              <DrawerFooter>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setQuickDemoOpen(false)}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-3 rounded-lg font-medium transition-colors"
                  >
                    Close
                  </button>
                  <Link
                    to="/basic"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium text-center transition-colors"
                  >
                    View Examples
                  </Link>
                </div>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>

          <Link
            to="/basic"
            className="bg-white hover:bg-gray-50 text-gray-900 px-8 py-3 rounded-lg font-semibold border border-gray-300 transition-colors inline-flex items-center"
          >
            View Examples
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">iOS 14+</div>
            <div className="text-gray-600">Supported</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">60fps</div>
            <div className="text-gray-600">Animations</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">WCAG AA</div>
            <div className="text-gray-600">Compliant</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600">Zero</div>
            <div className="text-gray-600">Config</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose iOS Drawer?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Built specifically to handle iOS Safari's unique challenges while providing 
            an exceptional developer experience across all platforms.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Usage Patterns Section */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Explore Usage Patterns</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Comprehensive examples showing every feature and integration method
            for the iOS drawer component.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {usagePatterns.map((pattern, index) => (
            <Link
              key={index}
              to={pattern.link}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:border-blue-300 transition-all group"
            >
              <div className="text-3xl mb-4">{pattern.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {pattern.title}
              </h3>
              <p className="text-gray-600 mb-4">{pattern.description}</p>
              <div className="flex items-center text-blue-600 font-medium">
                Explore
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Code Preview Section */}
      <section className="bg-gray-900 rounded-2xl p-8 text-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Simple to Use</h2>
            <p className="text-gray-300">
              Get started with just a few lines of code. No complex setup required.
            </p>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 overflow-x-auto">
            <pre className="text-green-400 font-mono text-sm">
{`import { Drawer, DrawerContent, DrawerTrigger } from '@ios-drawer/react';

function App() {
  return (
    <Drawer>
      <DrawerTrigger>Open Drawer</DrawerTrigger>
      <DrawerContent>
        <h2>Your content here</h2>
        <p>Fully iOS-compatible with gesture support!</p>
      </DrawerContent>
    </Drawer>
  );
}`}
            </pre>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-gray-300">TypeScript included</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-gray-300">iOS Safari tested</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-gray-300">Accessibility ready</span>
            </div>
          </div>
        </div>
      </section>

      {/* Installation Section */}
      <section className="bg-blue-50 rounded-2xl p-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Get Started Now</h2>
          <p className="text-gray-600 mb-8">
            Multiple installation methods to fit your project setup and preferences.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <Code className="w-8 h-8 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">NPM Package</h3>
              <p className="text-gray-600 text-sm">Install via npm, yarn, or pnpm</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <Palette className="w-8 h-8 text-purple-600 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Copy-Paste</h3>
              <p className="text-gray-600 text-sm">Copy source files directly</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <Star className="w-8 h-8 text-yellow-600 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Clone Repo</h3>
              <p className="text-gray-600 text-sm">Full source code access</p>
            </div>
          </div>

          <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-left overflow-x-auto">
            npm install @ios-drawer/react
          </div>
        </div>
      </section>
    </div>
  );
}