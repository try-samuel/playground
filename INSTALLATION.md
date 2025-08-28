# Installation Guide

This guide provides multiple methods to install and use the iOS-friendly drawer component in your React project.

## Method 1: NPM Package (Recommended)

### Installation

```bash
# Using npm
npm install @ios-drawer/react

# Using yarn
yarn add @ios-drawer/react

# Using pnpm
pnpm add @ios-drawer/react
```

### Peer Dependencies

Make sure you have the required peer dependencies installed:

```bash
npm install react react-dom framer-motion
```

### Usage

```javascript
// Import components
import { Drawer, DrawerContent, DrawerTrigger } from '@ios-drawer/react';

// Import styles
import '@ios-drawer/react/styles';

function App() {
  return (
    <Drawer>
      <DrawerTrigger>Open Drawer</DrawerTrigger>
      <DrawerContent>
        <p>Drawer content</p>
      </DrawerContent>
    </Drawer>
  );
}
```

## Method 2: Copy-Paste Installation

### Step 1: Copy Source Files

Copy the entire `src` directory from this repository to your project:

```
your-project/
├── src/
│   └── components/
│       └── drawer/          # Copy this entire folder
│           ├── components/
│           ├── hooks/
│           ├── lib/
│           ├── styles/
│           ├── types/
│           └── index.ts
```

### Step 2: Install Dependencies

Install the required dependencies:

```bash
npm install framer-motion clsx tailwind-merge
```

### Step 3: Import and Use

```javascript
// Import from your local copy
import { Drawer, DrawerContent, DrawerTrigger } from './components/drawer';

// Import styles
import './components/drawer/styles/drawer.css';
```

## Method 3: Clone Repository

### Step 1: Clone

```bash
git clone https://github.com/ios-drawer/react.git
cd react
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Build (Optional)

```bash
npm run build
```

### Step 4: Link or Copy

Either link the package locally or copy the built files to your project.

## Framework-Specific Setup

### Next.js

#### App Router (Next.js 13+)

```javascript
// app/layout.tsx
import '@ios-drawer/react/styles';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

```javascript
// app/page.tsx
'use client';

import { Drawer, DrawerContent, DrawerTrigger } from '@ios-drawer/react';

export default function Home() {
  return (
    <Drawer>
      <DrawerTrigger>Open</DrawerTrigger>
      <DrawerContent>Content</DrawerContent>
    </Drawer>
  );
}
```

#### Pages Router (Next.js 12 and below)

```javascript
// pages/_app.tsx
import '@ios-drawer/react/styles';

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
```

```javascript
// pages/index.tsx
import { Drawer, DrawerContent, DrawerTrigger } from '@ios-drawer/react';

export default function Home() {
  return (
    <Drawer>
      <DrawerTrigger>Open</DrawerTrigger>
      <DrawerContent>Content</DrawerContent>
    </Drawer>
  );
}
```

### Vite

#### Installation

```bash
npm install @ios-drawer/react
```

#### Configuration

```javascript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: './postcss.config.js', // If using Tailwind
  },
});
```

#### Usage

```javascript
// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '@ios-drawer/react/styles';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

### Create React App

#### Installation

```bash
npm install @ios-drawer/react
```

#### Usage

```javascript
// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '@ios-drawer/react/styles';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
```

### Remix

#### Installation

```bash
npm install @ios-drawer/react
```

#### Configuration

```javascript
// app/root.tsx
import { Links, LiveReload, Meta, Outlet, Scripts } from '@remix-run/react';
import styles from '@ios-drawer/react/styles';

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

export default function App() {
  return (
    <html>
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
```

### Gatsby

#### Installation

```bash
npm install @ios-drawer/react
```

#### Configuration

```javascript
// gatsby-config.js
module.exports = {
  plugins: [
    // ... other plugins
    {
      resolve: 'gatsby-plugin-postcss',
      options: {
        postCssPlugins: [require('tailwindcss'), require('autoprefixer')],
      },
    },
  ],
};
```

#### Usage

```javascript
// src/pages/index.js
import React from 'react';
import { Drawer, DrawerContent, DrawerTrigger } from '@ios-drawer/react';
import '@ios-drawer/react/styles';

export default function IndexPage() {
  return (
    <Drawer>
      <DrawerTrigger>Open</DrawerTrigger>
      <DrawerContent>Content</DrawerContent>
    </Drawer>
  );
}
```

## CSS Integration

### Tailwind CSS

The drawer components are built with Tailwind CSS in mind. If you're using Tailwind:

```javascript
// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@ios-drawer/react/**/*.{js,ts,jsx,tsx}', // Add this line
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

### Custom CSS

If you prefer custom CSS over Tailwind:

```css
/* Override default styles */
.ios-drawer-content {
  background: your-custom-background;
  border-radius: your-custom-radius;
}

.ios-drawer-overlay {
  background: your-custom-overlay-color;
}
```

### CSS-in-JS

The drawer works with CSS-in-JS libraries like styled-components:

```javascript
import styled from 'styled-components';
import { DrawerContent } from '@ios-drawer/react';

const StyledDrawerContent = styled(DrawerContent)`
  background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
`;
```

## TypeScript Setup

### TSConfig

Make sure your `tsconfig.json` includes the necessary configurations:

```json
{
  "compilerOptions": {
    "lib": ["DOM", "DOM.Iterable", "ES6"],
    "allowJs": true,
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "jsx": "react-jsx",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "strict": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

### Type Definitions

If using the copy-paste method, ensure TypeScript can find the types:

```json
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/drawer/*": ["./src/components/drawer/*"]
    }
  }
}
```

## Bundler Configuration

### Webpack

If you're using a custom Webpack setup:

```javascript
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
};
```

### Rollup

For Rollup bundling:

```javascript
// rollup.config.js
import postcss from 'rollup-plugin-postcss';

export default {
  plugins: [
    postcss({
      extract: true,
      minimize: true,
    }),
  ],
};
```

### ESBuild

For ESBuild:

```javascript
// esbuild.config.js
require('esbuild').build({
  entryPoints: ['src/index.tsx'],
  bundle: true,
  outfile: 'dist/bundle.js',
  loader: {
    '.css': 'css',
  },
});
```

## iOS-Specific Setup

### Viewport Meta Tag

Ensure your HTML includes the proper viewport meta tag:

```html
<meta
  name="viewport"
  content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
/>
```

### PWA Configuration

For Progressive Web Apps:

```json
// manifest.json
{
  "display": "standalone",
  "viewport-fit": "cover"
}
```

```css
/* Additional CSS for PWA */
@supports (padding: max(0px)) {
  .ios-drawer-content {
    padding-left: max(16px, env(safe-area-inset-left));
    padding-right: max(16px, env(safe-area-inset-right));
  }
}
```

## Testing Setup

### Jest Configuration

```javascript
// jest.config.js
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapping: {
    '\\.(css|less|scss)$': 'identity-obj-proxy',
  },
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
};
```

### Setup File

```javascript
// src/setupTests.ts
import '@testing-library/jest-dom';

// Mock framer-motion for tests
jest.mock('framer-motion', () => ({
  motion: {
    div: 'div',
  },
  AnimatePresence: ({ children }) => children,
  useMotionValue: () => ({ get: () => 0, set: () => {} }),
  useTransform: () => ({ get: () => 0 }),
  animate: jest.fn(),
}));
```

## Troubleshooting

### Common Issues

#### Styles Not Loading

```javascript
// Make sure to import styles
import '@ios-drawer/react/styles';

// Or import CSS directly
import '@ios-drawer/react/drawer.css';
```

#### TypeScript Errors

```bash
# Install type definitions
npm install @types/react @types/react-dom
```

#### Animation Issues

```javascript
// Ensure framer-motion is properly installed
npm install framer-motion

// Check for version conflicts
npm list framer-motion
```

#### iOS Safari Issues

1. Check viewport meta tag
2. Ensure safe area CSS is included
3. Test on actual iOS device
4. Verify keyboard handling is enabled

### Getting Help

- Check the [documentation](README.md)
- Look at [examples](examples/)
- Open an [issue](https://github.com/ios-drawer/react/issues)
- Join our [Discord community](https://discord.gg/ios-drawer)

## Version Compatibility

| iOS Drawer | React | TypeScript | Node.js |
|------------|-------|------------|---------|
| 1.x.x      | ≥16.8 | ≥4.0       | ≥14     |

## Next Steps

After installation:

1. Read the [main documentation](README.md)
2. Explore the [examples](examples/)
3. Check out the [API reference](README.md#api-reference)
4. Learn about [iOS-specific features](README.md#ios-specific-features)

Happy coding! 🎉