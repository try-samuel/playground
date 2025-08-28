# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-01-XX

### Added
- Initial release of iOS-friendly drawer component
- Complete React component library with TypeScript support
- iOS Safari compatibility with viewport and keyboard handling
- Gesture-based interactions with velocity detection
- Snap points support (static and dynamic)
- Comprehensive accessibility features
- Multiple direction support (bottom, top, left, right)
- Framer Motion animations with custom physics
- Safe area handling for iOS devices
- Focus lock and scroll lock utilities
- Keyboard height detection for iOS
- Bounce prevention for iOS scrolling
- Input zoom prevention on iOS Safari
- Portal rendering support
- Always-on mode for persistent drawers
- Custom styling with Tailwind CSS compatibility
- Comprehensive documentation and examples
- Multiple installation methods (npm, copy-paste, clone)

### Features
- **Core Components**: Drawer, DrawerContent, DrawerOverlay, DrawerTrigger, DrawerHeader, DrawerFooter, DrawerHandle
- **Custom Hooks**: useDrawerGesture, useDrawerAnimation, useKeyboardHeight, useFocusLock, useScrollLock
- **iOS Compatibility**: Viewport handling, keyboard support, safe areas, bounce prevention
- **Accessibility**: WCAG 2.1 AA compliant, keyboard navigation, screen reader support
- **Performance**: 60fps animations, hardware acceleration, efficient event handling
- **Styling**: CSS variables, Tailwind integration, theme support
- **TypeScript**: Full type safety with comprehensive type definitions

### Browser Support
- iOS Safari 14+
- Chrome Mobile 90+
- Firefox Mobile 90+
- Samsung Internet 15+
- Desktop browsers (Chrome, Firefox, Safari, Edge)

### Dependencies
- React >=16.8.0
- React DOM >=16.8.0
- Framer Motion >=10.0.0

### Optional Dependencies
- clsx (for className merging)
- tailwind-merge (for Tailwind CSS support)