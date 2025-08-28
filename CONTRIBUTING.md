# Contributing to iOS Drawer

We love your input! We want to make contributing to iOS Drawer as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer

## Development Process

We use GitHub to host code, track issues and feature requests, as well as accept pull requests.

### Pull Requests Process

1. Fork the repo and create your branch from `main`
2. If you've added code that should be tested, add tests
3. If you've changed APIs, update the documentation
4. Ensure the test suite passes
5. Make sure your code lints
6. Issue that pull request!

## Development Setup

### Prerequisites

- Node.js 16+ 
- npm, yarn, or pnpm
- Git

### Getting Started

```bash
# Clone the repository
git clone https://github.com/ios-drawer/react.git
cd react

# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Build the project
npm run build
```

### Project Structure

```
src/
├── components/          # React components
│   ├── drawer.tsx
│   ├── drawer-content.tsx
│   ├── drawer-overlay.tsx
│   └── ...
├── hooks/              # Custom React hooks
│   ├── use-drawer-gesture.ts
│   ├── use-drawer-animation.ts
│   └── ...
├── lib/                # Utility functions
│   ├── drawer-physics.ts
│   ├── drawer-accessibility.ts
│   └── ...
├── styles/             # CSS styles
│   └── drawer.css
├── types/              # TypeScript definitions
│   └── index.ts
└── index.ts           # Main export file

examples/               # Usage examples
tests/                 # Test files
docs/                  # Documentation
```

## Coding Standards

### TypeScript

- Use TypeScript for all new code
- Provide proper type definitions
- Export types that consumers might need
- Use strict mode

### React

- Use functional components with hooks
- Follow React best practices
- Use `forwardRef` for components that need ref forwarding
- Provide proper prop types and default values

### CSS

- Use CSS variables for theming
- Follow BEM-like naming conventions
- Ensure styles work across all supported browsers
- Include dark mode support
- Test on iOS Safari specifically

### Accessibility

- Follow WCAG 2.1 AA guidelines
- Provide proper ARIA attributes
- Support keyboard navigation
- Test with screen readers
- Include focus management

### iOS Compatibility

- Test on actual iOS devices when possible
- Handle viewport changes properly
- Account for safe areas
- Prevent unwanted zoom on inputs
- Handle keyboard appearance gracefully

## Testing

### Running Tests

```bash
# Unit tests
npm test

# Watch mode
npm run test:watch

# Coverage
npm run test:coverage

# Integration tests
npm run test:integration

# Accessibility tests
npm run test:a11y
```

### Writing Tests

- Write tests for all new features
- Include edge cases
- Test accessibility features
- Test iOS-specific behavior when possible
- Use meaningful test descriptions

### Test Categories

1. **Unit Tests**: Individual components and hooks
2. **Integration Tests**: Component interactions
3. **Accessibility Tests**: Screen reader compatibility, keyboard navigation
4. **Visual Tests**: Regression testing for UI changes
5. **Performance Tests**: Animation performance, memory usage

## iOS Testing

### Required Testing

- Test on actual iOS devices (iPhone and iPad)
- Test in iOS Safari, Chrome for iOS, and Firefox for iOS
- Test in both portrait and landscape orientations
- Test with virtual keyboard (on-screen keyboard)
- Test with different safe area configurations
- Test in PWA mode (when added to home screen)

### iOS Versions

- iOS 14+ (primary support)
- iOS 13 (best effort)
- Test across different iOS versions when possible

## Documentation

### Code Documentation

- Use JSDoc comments for public APIs
- Include usage examples in comments
- Document complex algorithms or workarounds
- Explain iOS-specific code clearly

### README Updates

- Update installation instructions for breaking changes
- Add new examples for significant features
- Update browser support information
- Include migration guides when necessary

### Examples

- Create examples for new features
- Ensure examples work on mobile devices
- Include both basic and advanced usage
- Test examples on iOS devices

## Performance Guidelines

### Animation Performance

- Use `transform` and `opacity` for animations
- Implement proper hardware acceleration
- Avoid layout thrashing
- Target 60fps on mobile devices
- Test on older devices when possible

### Bundle Size

- Keep bundle size minimal
- Use tree-shaking friendly exports
- Avoid unnecessary dependencies
- Consider code splitting for large features

### Memory Management

- Clean up event listeners
- Properly handle component unmounting
- Avoid memory leaks in animations
- Use `useCallback` and `useMemo` appropriately

## Bug Reports

### Before Submitting

- Check existing issues to avoid duplicates
- Test on the latest version
- Isolate the issue to the drawer component
- Test on iOS Safari specifically for iOS-related issues

### Bug Report Template

```markdown
**Describe the bug**
A clear and concise description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected behavior**
A clear description of what you expected to happen.

**Screenshots/Videos**
If applicable, add screenshots or videos to help explain your problem.

**Device Information:**
- Device: [e.g. iPhone 13, iPad Pro]
- OS: [e.g. iOS 15.1]
- Browser: [e.g. Safari, Chrome for iOS]
- Version: [e.g. 15.1]

**Additional context**
Add any other context about the problem here.
```

## Feature Requests

### Before Submitting

- Check if the feature already exists
- Consider if it fits the library's scope
- Think about iOS compatibility implications
- Consider backwards compatibility

### Feature Request Template

```markdown
**Is your feature request related to a problem?**
A clear description of what the problem is.

**Describe the solution you'd like**
A clear description of what you want to happen.

**Describe alternatives you've considered**
Alternative solutions or features you've considered.

**iOS Considerations**
How should this feature work on iOS devices?

**Additional context**
Add any other context, mockups, or examples about the feature request.
```

## Code of Conduct

### Our Pledge

We pledge to make participation in our project a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, sex characteristics, gender identity and expression, level of experience, education, socio-economic status, nationality, personal appearance, race, religion, or sexual identity and orientation.

### Our Standards

Examples of behavior that contributes to creating a positive environment include:

- Using welcoming and inclusive language
- Being respectful of differing viewpoints and experiences
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

### Enforcement

Project maintainers are responsible for clarifying the standards of acceptable behavior and are expected to take appropriate and fair corrective action in response to any instances of unacceptable behavior.

## License

By contributing, you agree that your contributions will be licensed under the same license as the project (MIT License).

## Questions?

Don't hesitate to reach out:

- Open an issue for bugs or feature requests
- Start a discussion for questions or ideas
- Contact maintainers directly for sensitive issues

Thank you for contributing to iOS Drawer! 🎉