# iOS-Friendly Drawer Component

A comprehensive, portable, iOS-friendly drawer component for React with smooth animations, gesture support, and accessibility features. Built with TypeScript and designed to work seamlessly across all platforms, with special attention to iOS Safari's unique challenges.

## ✨ Features

### 🎯 Core Features
- **iOS-First Design**: Built specifically to handle iOS Safari's quirks and limitations
- **Gesture Support**: Drag to open, close, and resize with velocity-based interactions
- **Snap Points**: Support for static and dynamic breakpoints with smooth transitions
- **Accessibility**: Full keyboard navigation, screen reader support, and focus management
- **Responsive**: Works perfectly on all screen sizes and orientations
- **Performant**: 60fps animations using hardware acceleration

### 📱 iOS Compatibility
- **Viewport Handling**: Proper handling of iOS Safari's dynamic viewport
- **Keyboard Support**: Automatic adjustment for virtual keyboard appearance
- **Safe Areas**: Full support for notch, home indicator, and dynamic island
- **Bounce Prevention**: Eliminates iOS rubber band scrolling issues
- **Input Zoom Fix**: Prevents unwanted zoom when focusing inputs

## 🚀 Installation

### Method 1: NPM Package (Recommended)
```bash
npm install @ios-drawer/react
```

### Method 2: Copy-Paste
Download the complete `src` folder and copy it to your project.

### Method 3: Clone Repository
```bash
git clone https://github.com/ios-drawer/react.git
```

## 📦 Dependencies

### Peer Dependencies
- React >=16.8.0
- React DOM >=16.8.0
- Framer Motion >=10.0.0

### Optional Dependencies
- clsx (for className merging)
- tailwind-merge (for Tailwind CSS support)

## 🎯 Quick Start

### Basic Usage
```tsx
import { Drawer, DrawerContent, DrawerTrigger, DrawerOverlay } from '@ios-drawer/react';
import '@ios-drawer/react/styles';

function App() {
  return (
    <Drawer>
      <DrawerTrigger>Open Drawer</DrawerTrigger>
      <DrawerOverlay />
      <DrawerContent>
        <div className="p-4">
          <h2>Drawer Title</h2>
          <p>Your content here...</p>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
```

### With Snap Points
```tsx
<Drawer 
  snapPoints={['25%', '50%', '75%', '90%']}
  defaultSnapPoint={1}
>
  <DrawerContent>
    <DrawerHandle />
    <div className="p-4">
      <h2>Resizable Drawer</h2>
    </div>
  </DrawerContent>
</Drawer>
```

## 📚 API Reference

### Drawer Props
```typescript
interface DrawerProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  direction?: 'bottom' | 'top' | 'left' | 'right';
  snapPoints?: (number | string)[];
  defaultSnapPoint?: number;
  dismissible?: boolean;
  closeOnOutsideClick?: boolean;
  modal?: boolean;
  // ... more props
}
```

## 🎨 Styling

### CSS Import
```javascript
import '@ios-drawer/react/styles';
```

### Tailwind Integration
```tsx
<DrawerContent className="bg-white dark:bg-gray-900 rounded-t-xl">
  <DrawerHeader className="text-center border-b">
    <h2 className="text-xl font-semibold">Custom Drawer</h2>
  </DrawerHeader>
</DrawerContent>
```

## 📱 iOS-Specific Features

### Keyboard Handling
```tsx
import { useKeyboardHeight } from '@ios-drawer/react';

function KeyboardAwareDrawer() {
  const { keyboardHeight } = useKeyboardHeight();
  
  return (
    <DrawerContent style={{ paddingBottom: keyboardHeight }}>
      {/* Content */}
    </DrawerContent>
  );
}
```

### Safe Area Support
```tsx
<DrawerContent className="pb-safe pt-safe">
  {/* Content respects safe areas */}
</DrawerContent>
```

## 🎯 Advanced Examples

### Form Drawer
```tsx
function FormDrawer() {
  const [open, setOpen] = useState(false);

  return (
    <Drawer open={open} onOpenChange={setOpen} handleKeyboard>
      <DrawerContent>
        <form className="flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto p-4">
            <input type="text" placeholder="Name" />
            {/* More fields */}
          </div>
          <DrawerFooter>
            <button type="submit">Save</button>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
}
```

## ♿ Accessibility

- Full keyboard navigation support
- Screen reader compatibility
- Automatic focus management
- WCAG 2.1 AA compliant

## 🔧 Advanced Configuration

### Custom Physics
```tsx
<Drawer
  springConfig={{ stiffness: 400, damping: 30 }}
  animationDuration={250}
>
  {/* Ultra-responsive drawer */}
</Drawer>
```

## 🐛 Troubleshooting

### iOS Safari Input Zoom
```css
input, textarea, select {
  font-size: 16px !important;
}
```

### Keyboard Detection
```tsx
<Drawer handleKeyboard={true}>
  {/* Explicit keyboard handling */}
</Drawer>
```

## 📄 License

MIT License

## 🙏 Acknowledgments

- Inspired by Vaul for API design
- Framer Motion for animations
- React community for feedback

---

**Made with ❤️ for the React community**