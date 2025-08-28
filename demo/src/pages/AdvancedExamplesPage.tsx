import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Settings, Zap, Database, Code, Layers, Activity } from 'lucide-react';
import {
  Drawer,
  DrawerContent,
  DrawerOverlay,
  DrawerTrigger,
  DrawerHeader,
  DrawerFooter,
  DrawerHandle,
  useDrawerGesture,
  useDrawerAnimation,
  drawerPhysics
} from '../components/drawer';

export function AdvancedExamplesPage() {
  return (
    <div className="space-y-12">
      {/* Page Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">Advanced Examples</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Advanced usage patterns showcasing complex interactions, performance optimizations,
          and sophisticated features of the iOS drawer component.
        </p>
      </div>

      {/* Nested Drawers */}
      <ExampleSection
        title="1. Nested Drawers"
        description="Multiple drawers that can be opened within each other with proper z-index management."
        icon={<Layers className="w-6 h-6" />}
      >
        <NestedDrawersExample />
      </ExampleSection>

      {/* Dynamic Content Loading */}
      <ExampleSection
        title="2. Dynamic Content Loading"
        description="Async content loading with loading states and error handling."
        icon={<Database className="w-6 h-6" />}
      >
        <DynamicContentExample />
      </ExampleSection>

      {/* Custom Hooks Usage */}
      <ExampleSection
        title="3. Custom Hooks Integration"
        description="Direct usage of drawer hooks for advanced custom implementations."
        icon={<Code className="w-6 h-6" />}
      >
        <CustomHooksExample />
      </ExampleSection>

      {/* Performance Monitoring */}
      <ExampleSection
        title="4. Performance Monitoring"
        description="Real-time performance metrics and optimization examples."
        icon={<Activity className="w-6 h-6" />}
      >
        <PerformanceExample />
      </ExampleSection>

      {/* Complex State Management */}
      <ExampleSection
        title="5. Complex State Management"
        description="Integration with external state management and complex data flows."
        icon={<Settings className="w-6 h-6" />}
      >
        <StateManagementExample />
      </ExampleSection>

      {/* Custom Physics */}
      <ExampleSection
        title="6. Custom Physics Configuration"
        description="Fine-tuned spring physics and animation parameters."
        icon={<Zap className="w-6 h-6" />}
      >
        <CustomPhysicsExample />
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

// Nested Drawers Example
function NestedDrawersExample() {
  const [primaryOpen, setPrimaryOpen] = useState(false);
  const [secondaryOpen, setSecondaryOpen] = useState(false);
  const [tertiaryOpen, setTertiaryOpen] = useState(false);

  return (
    <div className="space-y-4">
      <Drawer open={primaryOpen} onOpenChange={setPrimaryOpen}>
        <DrawerTrigger className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
          Open Primary Drawer
        </DrawerTrigger>
        <DrawerOverlay />
        <DrawerContent style={{ zIndex: 50 }}>
          <DrawerHeader>
            <h3 className="text-xl font-semibold text-gray-900">Primary Drawer (Level 1)</h3>
            <p className="text-gray-600">This is the first level drawer</p>
          </DrawerHeader>
          
          <div className="flex-1 p-6 space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-2">Nesting Features</h4>
              <ul className="text-blue-800 text-sm space-y-1">
                <li>• Proper z-index management</li>
                <li>• Independent state handling</li>
                <li>• Backdrop layering</li>
                <li>• Focus management across levels</li>
              </ul>
            </div>

            <Drawer open={secondaryOpen} onOpenChange={setSecondaryOpen}>
              <DrawerTrigger className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-medium transition-colors">
                Open Secondary Drawer
              </DrawerTrigger>
              <DrawerOverlay />
              <DrawerContent style={{ zIndex: 60 }}>
                <DrawerHeader>
                  <h3 className="text-xl font-semibold text-gray-900">Secondary Drawer (Level 2)</h3>
                  <p className="text-gray-600">Nested within the primary drawer</p>
                </DrawerHeader>
                
                <div className="flex-1 p-6 space-y-4">
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <h4 className="font-semibold text-green-900 mb-2">Level 2 Content</h4>
                    <p className="text-green-800 text-sm">
                      This drawer opens on top of the primary drawer with higher z-index.
                    </p>
                  </div>

                  <Drawer open={tertiaryOpen} onOpenChange={setTertiaryOpen}>
                    <DrawerTrigger className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-lg font-medium transition-colors">
                      Open Tertiary Drawer
                    </DrawerTrigger>
                    <DrawerOverlay />
                    <DrawerContent style={{ zIndex: 70 }}>
                      <DrawerHeader>
                        <h3 className="text-xl font-semibold text-gray-900">Tertiary Drawer (Level 3)</h3>
                        <p className="text-gray-600">Three levels deep!</p>
                      </DrawerHeader>
                      
                      <div className="flex-1 p-6">
                        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                          <h4 className="font-semibold text-purple-900 mb-2">🎯 Maximum Depth</h4>
                          <p className="text-purple-800 text-sm">
                            This is the deepest level in our nested drawer example.
                            Each level maintains its own state and focus management.
                          </p>
                        </div>
                      </div>
                      
                      <DrawerFooter>
                        <button
                          onClick={() => setTertiaryOpen(false)}
                          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-lg w-full transition-colors"
                        >
                          Close Level 3
                        </button>
                      </DrawerFooter>
                    </DrawerContent>
                  </Drawer>
                </div>
                
                <DrawerFooter>
                  <button
                    onClick={() => setSecondaryOpen(false)}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg w-full transition-colors"
                  >
                    Close Level 2
                  </button>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </div>
          
          <DrawerFooter>
            <div className="text-center text-gray-600 text-sm mb-3">
              Drawers open: Primary {secondaryOpen && '+ Secondary'} {tertiaryOpen && '+ Tertiary'}
            </div>
            <button
              onClick={() => setPrimaryOpen(false)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg w-full transition-colors"
            >
              Close Primary
            </button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <CodeBlock>
{`function NestedDrawers() {
  const [primary, setPrimary] = useState(false);
  const [secondary, setSecondary] = useState(false);
  
  return (
    <Drawer open={primary} onOpenChange={setPrimary}>
      <DrawerContent style={{ zIndex: 50 }}>
        <h3>Primary Drawer</h3>
        
        <Drawer open={secondary} onOpenChange={setSecondary}>
          <DrawerContent style={{ zIndex: 60 }}>
            <h3>Secondary Drawer</h3>
          </DrawerContent>
        </Drawer>
      </DrawerContent>
    </Drawer>
  );
}`}
      </CodeBlock>
    </div>
  );
}

// Dynamic Content Example
function DynamicContentExample() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate random success/error
      if (Math.random() > 0.3) {
        setData({
          users: [
            { id: 1, name: 'John Doe', email: 'john@example.com', status: 'active' },
            { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'inactive' },
            { id: 3, name: 'Bob Johnson', email: 'bob@example.com', status: 'active' }
          ],
          loadedAt: new Date().toLocaleTimeString()
        });
      } else {
        throw new Error('Failed to load data from server');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (open && !data && !loading) {
      loadData();
    }
  }, [open, data, loading, loadData]);

  return (
    <div className="space-y-4">
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
          Load Dynamic Content
        </DrawerTrigger>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>
            <h3 className="text-xl font-semibold text-gray-900">Dynamic Content Loading</h3>
            <p className="text-gray-600">Async data with loading states</p>
          </DrawerHeader>
          
          <div className="flex-1 p-6">
            {loading && (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                <p className="mt-4 text-gray-600">Loading data...</p>
              </div>
            )}
            
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="font-semibold text-red-900 mb-2">❌ Error</h4>
                <p className="text-red-800 text-sm mb-4">{error}</p>
                <button
                  onClick={loadData}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm transition-colors"
                >
                  Retry
                </button>
              </div>
            )}
            
            {data && !loading && (
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-900 mb-2">✅ Data Loaded</h4>
                  <p className="text-green-800 text-sm">Loaded at: {data.loadedAt}</p>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">Users ({data.users.length})</h4>
                  {data.users.map((user: any) => (
                    <div key={user.id} className="bg-white p-4 rounded-lg border border-gray-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-medium text-gray-900">{user.name}</h5>
                          <p className="text-gray-600 text-sm">{user.email}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          user.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {user.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <button
                  onClick={() => {
                    setData(null);
                    loadData();
                  }}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                >
                  Refresh Data
                </button>
              </div>
            )}
          </div>
          
          <DrawerFooter>
            <button
              onClick={() => setOpen(false)}
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-3 rounded-lg w-full transition-colors"
            >
              Close
            </button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <CodeBlock>
{`function DynamicContent() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  
  const loadData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/data');
      setData(await response.json());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Drawer onOpenChange={(open) => open && loadData()}>
      <DrawerContent>
        {loading && <LoadingSpinner />}
        {error && <ErrorMessage error={error} onRetry={loadData} />}
        {data && <DataDisplay data={data} />}
      </DrawerContent>
    </Drawer>
  );
}`}
      </CodeBlock>
    </div>
  );
}

// Custom Hooks Example
function CustomHooksExample() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  
  const { 
    currentPosition, 
    handlePointerDown, 
    handlePointerMove, 
    handlePointerUp 
  } = useDrawerGesture({
    direction: 'bottom',
    snapPoints: [0, 200, 400],
    currentSnapPoint: 200,
    containerSize: 400,
    isOpen: true,
    dismissible: true,
    onDragStart: () => setIsDragging(true),
    onDragEnd: () => setIsDragging(false),
    onDrag: (position, percentage) => {
      console.log(`Position: ${position}px, Percentage: ${percentage}%`);
    }
  });

  const { position, animateToPosition } = useDrawerAnimation({
    direction: 'bottom',
    snapPoints: [0, 200, 400],
    currentSnapPoint: 200,
    isOpen: true,
    isDragging
  });

  return (
    <div className="space-y-4">
      <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-4">
        <h3 className="font-semibold text-gray-900">Direct Hook Usage</h3>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-2">Current State</h4>
          <div className="text-sm text-gray-600 space-y-1">
            <div>Position: {Math.round(currentPosition)}px</div>
            <div>Dragging: {isDragging ? 'Yes' : 'No'}</div>
            <div>Percentage: {Math.round((currentPosition / 400) * 100)}%</div>
          </div>
        </div>
        
        <div className="space-y-2">
          <h4 className="font-medium text-gray-900">Quick Actions</h4>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => animateToPosition(0)}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded text-sm transition-colors"
            >
              Top (0px)
            </button>
            <button
              onClick={() => animateToPosition(200)}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded text-sm transition-colors"
            >
              Middle (200px)
            </button>
            <button
              onClick={() => animateToPosition(400)}
              className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded text-sm transition-colors"
            >
              Bottom (400px)
            </button>
          </div>
        </div>
        
        <div className="relative">
          <h4 className="font-medium text-gray-900 mb-2">Interactive Demo</h4>
          <div className="h-64 bg-gray-100 rounded-lg relative overflow-hidden border">
            <div
              ref={containerRef}
              className="absolute inset-x-0 bg-blue-500 text-white p-4 cursor-grab active:cursor-grabbing transition-colors"
              style={{ 
                height: '80px',
                bottom: `${400 - currentPosition}px`,
                backgroundColor: isDragging ? '#2563eb' : '#3b82f6'
              }}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
            >
              <div className="font-medium">Draggable Element</div>
              <div className="text-sm opacity-90">
                Drag me up and down!
              </div>
            </div>
            
            {/* Snap point indicators */}
            {[0, 200, 400].map((point) => (
              <div
                key={point}
                className="absolute inset-x-0 h-0.5 bg-red-400 opacity-50"
                style={{ bottom: `${400 - point}px` }}
              />
            ))}
          </div>
        </div>
      </div>

      <CodeBlock>
{`import { useDrawerGesture, useDrawerAnimation } from '@ios-drawer/react';

function CustomImplementation() {
  const { currentPosition, handlePointerDown } = useDrawerGesture({
    direction: 'bottom',
    snapPoints: [0, 200, 400],
    currentSnapPoint: 200,
    containerSize: 400,
    isOpen: true,
    dismissible: true,
    onDrag: (position, percentage) => {
      console.log(\`Position: \${position}px\`);
    }
  });
  
  const { animateToPosition } = useDrawerAnimation({
    direction: 'bottom',
    snapPoints: [0, 200, 400],
    currentSnapPoint: 200,
    isOpen: true,
    isDragging: false
  });
  
  return (
    <div
      onPointerDown={handlePointerDown}
      style={{ transform: \`translateY(\${currentPosition}px)\` }}
    >
      Custom draggable element
    </div>
  );
}`}
      </CodeBlock>
    </div>
  );
}

// Performance Example
function PerformanceExample() {
  const [open, setOpen] = useState(false);
  const [metrics, setMetrics] = useState({
    renderCount: 0,
    lastRenderTime: 0,
    averageRenderTime: 0,
    memoryUsage: 0
  });

  const renderCountRef = useRef(0);
  const renderTimesRef = useRef<number[]>([]);

  useEffect(() => {
    const startTime = performance.now();
    renderCountRef.current += 1;
    
    // Measure render time
    setTimeout(() => {
      const renderTime = performance.now() - startTime;
      renderTimesRef.current.push(renderTime);
      
      // Keep only last 10 render times
      if (renderTimesRef.current.length > 10) {
        renderTimesRef.current = renderTimesRef.current.slice(-10);
      }
      
      const avgRenderTime = renderTimesRef.current.reduce((a, b) => a + b, 0) / renderTimesRef.current.length;
      
      setMetrics({
        renderCount: renderCountRef.current,
        lastRenderTime: renderTime,
        averageRenderTime: avgRenderTime,
        memoryUsage: (performance as any).memory?.usedJSHeapSize || 0
      });
    }, 0);
  });

  return (
    <div className="space-y-4">
      <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-4">
        <h3 className="font-semibold text-gray-900">Performance Metrics</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-3 rounded-lg text-center">
            <div className="text-2xl font-bold text-blue-600">{metrics.renderCount}</div>
            <div className="text-sm text-blue-800">Renders</div>
          </div>
          <div className="bg-green-50 p-3 rounded-lg text-center">
            <div className="text-2xl font-bold text-green-600">{metrics.lastRenderTime.toFixed(2)}ms</div>
            <div className="text-sm text-green-800">Last Render</div>
          </div>
          <div className="bg-yellow-50 p-3 rounded-lg text-center">
            <div className="text-2xl font-bold text-yellow-600">{metrics.averageRenderTime.toFixed(2)}ms</div>
            <div className="text-sm text-yellow-800">Avg Render</div>
          </div>
          <div className="bg-purple-50 p-3 rounded-lg text-center">
            <div className="text-2xl font-bold text-purple-600">
              {(metrics.memoryUsage / 1024 / 1024).toFixed(2)}MB
            </div>
            <div className="text-sm text-purple-800">Memory</div>
          </div>
        </div>
      </div>

      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
          Performance Test Drawer
        </DrawerTrigger>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>
            <h3 className="text-xl font-semibold text-gray-900">Performance Testing</h3>
            <p className="text-gray-600">Monitoring render performance</p>
          </DrawerHeader>
          
          <div className="flex-1 p-6 space-y-4">
            <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
              <h4 className="font-semibold text-emerald-900 mb-2">📊 Real-time Metrics</h4>
              <div className="text-emerald-800 text-sm space-y-1">
                <div>Component Renders: {metrics.renderCount}</div>
                <div>Last Render Time: {metrics.lastRenderTime.toFixed(2)}ms</div>
                <div>Average Render Time: {metrics.averageRenderTime.toFixed(2)}ms</div>
                <div>Memory Usage: {(metrics.memoryUsage / 1024 / 1024).toFixed(2)}MB</div>
              </div>
            </div>
            
            <div className="bg-gray-100 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Optimization Techniques</h4>
              <ul className="text-gray-700 text-sm space-y-1">
                <li>• React.memo for component memoization</li>
                <li>• useCallback for stable function references</li>
                <li>• Hardware-accelerated CSS transforms</li>
                <li>• RequestAnimationFrame for smooth animations</li>
                <li>• Efficient event listener management</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium text-gray-900">Performance Tests</h4>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    // Force multiple re-renders
                    for (let i = 0; i < 5; i++) {
                      setTimeout(() => setMetrics(prev => ({ ...prev })), i * 10);
                    }
                  }}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 rounded text-sm transition-colors"
                >
                  Stress Test
                </button>
                <button
                  onClick={() => {
                    setMetrics({
                      renderCount: 0,
                      lastRenderTime: 0,
                      averageRenderTime: 0,
                      memoryUsage: (performance as any).memory?.usedJSHeapSize || 0
                    });
                    renderCountRef.current = 0;
                    renderTimesRef.current = [];
                  }}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-2 rounded text-sm transition-colors"
                >
                  Reset Metrics
                </button>
              </div>
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
{`// Performance monitoring example
function usePerformanceMetrics() {
  const [metrics, setMetrics] = useState({
    renderCount: 0,
    renderTime: 0
  });
  
  useEffect(() => {
    const startTime = performance.now();
    
    // Measure render time
    setTimeout(() => {
      const renderTime = performance.now() - startTime;
      setMetrics(prev => ({
        renderCount: prev.renderCount + 1,
        renderTime
      }));
    }, 0);
  });
  
  return metrics;
}`}
      </CodeBlock>
    </div>
  );
}

// State Management Example
function StateManagementExample() {
  const [globalState, setGlobalState] = useState({
    user: { name: 'John Doe', email: 'john@example.com' },
    settings: { theme: 'light', notifications: true },
    cart: { items: [], total: 0 }
  });

  const [open, setOpen] = useState(false);

  const updateUser = useCallback((updates: any) => {
    setGlobalState(prev => ({
      ...prev,
      user: { ...prev.user, ...updates }
    }));
  }, []);

  const updateSettings = useCallback((updates: any) => {
    setGlobalState(prev => ({
      ...prev,
      settings: { ...prev.settings, ...updates }
    }));
  }, []);

  return (
    <div className="space-y-4">
      <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-4">
        <h3 className="font-semibold text-gray-900">Global State</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-3 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">User</h4>
            <div className="text-sm text-blue-800">
              <div>{globalState.user.name}</div>
              <div>{globalState.user.email}</div>
            </div>
          </div>
          <div className="bg-green-50 p-3 rounded-lg">
            <h4 className="font-medium text-green-900 mb-2">Settings</h4>
            <div className="text-sm text-green-800">
              <div>Theme: {globalState.settings.theme}</div>
              <div>Notifications: {globalState.settings.notifications ? 'On' : 'Off'}</div>
            </div>
          </div>
          <div className="bg-purple-50 p-3 rounded-lg">
            <h4 className="font-medium text-purple-900 mb-2">Cart</h4>
            <div className="text-sm text-purple-800">
              <div>Items: {globalState.cart.items.length}</div>
              <div>Total: ${globalState.cart.total}</div>
            </div>
          </div>
        </div>
      </div>

      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
          Manage Global State
        </DrawerTrigger>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>
            <h3 className="text-xl font-semibold text-gray-900">State Management</h3>
            <p className="text-gray-600">Complex state interactions</p>
          </DrawerHeader>
          
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* User Management */}
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900">User Information</h4>
              <div className="space-y-2">
                <input
                  type="text"
                  value={globalState.user.name}
                  onChange={(e) => updateUser({ name: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500"
                  placeholder="Name"
                />
                <input
                  type="email"
                  value={globalState.user.email}
                  onChange={(e) => updateUser({ email: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500"
                  placeholder="Email"
                />
              </div>
            </div>

            {/* Settings Management */}
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900">Settings</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['light', 'dark'].map((theme) => (
                      <button
                        key={theme}
                        onClick={() => updateSettings({ theme })}
                        className={`p-2 rounded-lg text-sm font-medium transition-colors ${
                          globalState.settings.theme === theme
                            ? 'bg-violet-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        {theme.charAt(0).toUpperCase() + theme.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
                
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={globalState.settings.notifications}
                    onChange={(e) => updateSettings({ notifications: e.target.checked })}
                    className="w-4 h-4 text-violet-600 border-gray-300 rounded focus:ring-violet-500"
                  />
                  <span className="text-gray-700">Enable notifications</span>
                </label>
              </div>
            </div>

            {/* State Debug View */}
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900">State Debug</h4>
              <div className="bg-gray-100 p-4 rounded-lg">
                <pre className="text-sm overflow-x-auto">
                  {JSON.stringify(globalState, null, 2)}
                </pre>
              </div>
            </div>
          </div>
          
          <DrawerFooter>
            <button
              onClick={() => setOpen(false)}
              className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-3 rounded-lg w-full transition-colors"
            >
              Save Changes
            </button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <CodeBlock>
{`// State management with drawer
function useGlobalState() {
  const [state, setState] = useState(initialState);
  
  const updateUser = useCallback((updates) => {
    setState(prev => ({
      ...prev,
      user: { ...prev.user, ...updates }
    }));
  }, []);
  
  return { state, updateUser };
}

function StateDrawer() {
  const { state, updateUser } = useGlobalState();
  
  return (
    <Drawer>
      <DrawerContent>
        <input
          value={state.user.name}
          onChange={(e) => updateUser({ name: e.target.value })}
        />
      </DrawerContent>
    </Drawer>
  );
}`}
      </CodeBlock>
    </div>
  );
}

// Custom Physics Example
function CustomPhysicsExample() {
  const [open, setOpen] = useState(false);
  const [physicsConfig, setPhysicsConfig] = useState(drawerPhysics.smooth);
  const [configName, setConfigName] = useState('smooth');

  const physicsOptions = {
    smooth: drawerPhysics.smooth,
    snappy: drawerPhysics.snappy,
    gentle: drawerPhysics.gentle,
    bouncy: drawerPhysics.bouncy
  };

  return (
    <div className="space-y-4">
      <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-4">
        <h3 className="font-semibold text-gray-900">Physics Configuration</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {Object.entries(physicsOptions).map(([name, config]) => (
            <button
              key={name}
              onClick={() => {
                setPhysicsConfig(config);
                setConfigName(name);
              }}
              className={`p-3 rounded-lg text-sm font-medium transition-colors ${
                configName === name
                  ? 'bg-orange-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </button>
          ))}
        </div>
        
        <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
          <h4 className="font-semibold text-orange-900 mb-2">Current: {configName}</h4>
          <div className="text-orange-800 text-sm grid grid-cols-2 gap-2">
            <div>Stiffness: {physicsConfig.stiffness}</div>
            <div>Damping: {physicsConfig.damping}</div>
            <div>Mass: {physicsConfig.mass}</div>
            <div>Precision: {physicsConfig.precision}</div>
          </div>
        </div>
      </div>

      <Drawer 
        open={open} 
        onOpenChange={setOpen}
        stiffness={physicsConfig.stiffness}
        dampingRatio={physicsConfig.damping}
        snapPoints={['30%', '60%', '90%']}
        defaultSnapPoint={1}
      >
        <DrawerTrigger className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
          Test Physics: {configName}
        </DrawerTrigger>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHandle />
          <DrawerHeader>
            <h3 className="text-xl font-semibold text-gray-900">Physics: {configName}</h3>
            <p className="text-gray-600">Test different spring physics configurations</p>
          </DrawerHeader>
          
          <div className="flex-1 p-6 space-y-4">
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <h4 className="font-semibold text-orange-900 mb-3">Current Configuration</h4>
              <div className="grid grid-cols-2 gap-3 text-sm text-orange-800">
                <div className="bg-white/50 p-2 rounded">
                  <strong>Stiffness:</strong> {physicsConfig.stiffness}
                </div>
                <div className="bg-white/50 p-2 rounded">
                  <strong>Damping:</strong> {physicsConfig.damping}
                </div>
                <div className="bg-white/50 p-2 rounded">
                  <strong>Mass:</strong> {physicsConfig.mass}
                </div>
                <div className="bg-white/50 p-2 rounded">
                  <strong>Precision:</strong> {physicsConfig.precision}
                </div>
              </div>
            </div>
            
            <div className="bg-gray-100 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Test Instructions</h4>
              <ul className="text-gray-700 text-sm space-y-1">
                <li>• Drag the handle to feel the physics</li>
                <li>• Try quick swipes vs slow drags</li>
                <li>• Notice the settling behavior</li>
                <li>• Compare different configurations</li>
              </ul>
            </div>
          </div>
          
          <DrawerFooter>
            <button
              onClick={() => setOpen(false)}
              className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-3 rounded-lg w-full transition-colors"
            >
              Close
            </button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <CodeBlock>
{`import { drawerPhysics } from '@ios-drawer/react';

// Pre-defined physics configurations
const configs = {
  smooth: { stiffness: 300, damping: 30, mass: 1 },
  snappy: { stiffness: 500, damping: 30, mass: 0.8 },
  gentle: { stiffness: 200, damping: 25, mass: 1.2 },
  bouncy: { stiffness: 400, damping: 20, mass: 1 }
};

function PhysicsDrawer() {
  return (
    <Drawer
      stiffness={configs.bouncy.stiffness}
      dampingRatio={configs.bouncy.damping}
      snapPoints={['30%', '60%', '90%']}
    >
      <DrawerHandle />
      <DrawerContent>
        Bouncy physics configuration
      </DrawerContent>
    </Drawer>
  );
}`}
      </CodeBlock>
    </div>
  );
}