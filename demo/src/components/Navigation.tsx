import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Smartphone } from 'lucide-react';
import {
  Drawer,
  DrawerContent,
  DrawerOverlay,
  DrawerTrigger,
  DrawerHeader
} from './drawer';

const navigationItems = [
  { path: '/', label: 'Home', icon: '🏠' },
  { path: '/basic', label: 'Basic Examples', icon: '📱' },
  { path: '/forms', label: 'Form Integration', icon: '📝' },
  { path: '/styling', label: 'Custom Styling', icon: '🎨' },
  { path: '/advanced', label: 'Advanced Usage', icon: '⚡' },
  { path: '/ios-features', label: 'iOS Features', icon: '📱' },
  { path: '/performance', label: 'Performance', icon: '🚀' },
  { path: '/accessibility', label: 'Accessibility', icon: '♿' }
];

export function Navigation() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Smartphone className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">iOS Drawer</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <span className="mr-2">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Drawer open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <DrawerTrigger className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100">
                <Menu className="w-6 h-6" />
              </DrawerTrigger>
              <DrawerOverlay />
              <DrawerContent>
                <DrawerHeader className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Smartphone className="w-6 h-6 text-blue-600" />
                    <span className="text-lg font-semibold">Navigation</span>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1 rounded-md text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </DrawerHeader>
                
                <div className="flex-1 px-4 py-2">
                  <div className="space-y-1">
                    {navigationItems.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center px-3 py-3 rounded-lg text-base font-medium transition-colors ${
                          location.pathname === item.path
                            ? 'bg-blue-100 text-blue-700'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                        }`}
                      >
                        <span className="mr-3 text-xl">{item.icon}</span>
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </div>
    </nav>
  );
}