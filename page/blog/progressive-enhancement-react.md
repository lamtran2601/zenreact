---
title: Progressive Enhancement in Modern React Applications
description: A comprehensive guide to implementing progressive enhancement strategies in React applications, ensuring optimal performance and accessibility across devices and network conditions.
date: 2025-03-07
author: Zen React Team
readingTime: 20
image: /assets/progressive-enhancement.png
series: architecture
tags:
  - React
  - Performance
  - Progressive Enhancement
  - Optimization
  - Architecture
  - Accessibility
  - Network Performance
  - Feature Detection
---

# Progressive Enhancement in Modern React Applications

Progressive enhancement ensures your React applications remain functional and fast across all devices and network conditions. This guide explores practical strategies for implementing progressive enhancement in modern React applications.

## Core First Approach

### 1. Essential Functionality Layer

```jsx
// Base component with core functionality
function CoreProductList({ products }) {
  return (
    <ul className="product-list">
      {products.map((product) => (
        <li key={product.id}>
          <h3>{product.name}</h3>
          <p>{product.price}</p>
        </li>
      ))}
    </ul>
  );
}

// Enhanced version with additional features
function EnhancedProductList({ products }) {
  const [sortBy, setSortBy] = useState('name');
  const [filterBy, setFilterBy] = useState('');

  const enhancedProducts = useMemo(() => {
    return products
      .filter((p) => p.name.includes(filterBy))
      .sort((a, b) => a[sortBy].localeCompare(b[sortBy]));
  }, [products, sortBy, filterBy]);

  return (
    <div>
      <div className="controls">
        <input type="text" value={filterBy} onChange={(e) => setFilterBy(e.target.value)} />
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="name">Name</option>
          <option value="price">Price</option>
        </select>
      </div>
      <CoreProductList products={enhancedProducts} />
    </div>
  );
}
```

### 2. Feature Detection

```jsx
function useFeatureDetection() {
  const [features, setFeatures] = useState({
    webgl: false,
    webworker: false,
    localstorage: false,
    touch: false,
  });

  useEffect(() => {
    setFeatures({
      webgl: !!window.WebGLRenderingContext,
      webworker: !!window.Worker,
      localstorage: !!window.localStorage,
      touch: 'ontouchstart' in window,
    });
  }, []);

  return features;
}

function ProgressiveApp() {
  const features = useFeatureDetection();

  return (
    <FeatureContext.Provider value={features}>
      <Router>
        <Routes>
          <Route path="/visualizations" element={features.webgl ? <WebGLViz /> : <BasicViz />} />
          <Route path="/data" element={features.webworker ? <WorkerData /> : <SimpleData />} />
        </Routes>
      </Router>
    </FeatureContext.Provider>
  );
}
```

## Network-Aware Loading

### 1. Connection-Based Loading

```jsx
function useNetworkStatus() {
  const [status, setStatus] = useState({
    type: 'unknown',
    speed: 'unknown',
  });

  useEffect(() => {
    if ('connection' in navigator) {
      const connection = navigator.connection;

      const updateStatus = () => {
        setStatus({
          type: connection.effectiveType,
          speed: connection.downlink,
        });
      };

      connection.addEventListener('change', updateStatus);
      updateStatus();

      return () => connection.removeEventListener('change', updateStatus);
    }
  }, []);

  return status;
}

function AdaptiveImage({ src, lowResSrc }) {
  const { type } = useNetworkStatus();
  const imageSrc = type === '4g' ? src : lowResSrc;

  return <img src={imageSrc} alt="" loading="lazy" />;
}
```

### 2. Progressive Loading Pattern

```jsx
function useProgressiveLoading(stages) {
  const [currentStage, setCurrentStage] = useState(0);
  const { type: networkType } = useNetworkStatus();

  useEffect(() => {
    let timeout;

    const loadNextStage = () => {
      if (currentStage < stages.length - 1) {
        const delay = networkType === '4g' ? 100 : 500;
        timeout = setTimeout(() => {
          setCurrentStage((prev) => prev + 1);
        }, delay);
      }
    };

    loadNextStage();
    return () => clearTimeout(timeout);
  }, [currentStage, stages.length, networkType]);

  return stages[currentStage];
}

function ProgressiveUI() {
  const content = useProgressiveLoading([
    <CoreContent />,
    <EnhancedContent />,
    <FullFeaturedContent />,
  ]);

  return <div className="progressive-ui">{content}</div>;
}
```

## Performance Budgets

### 1. Bundle Size Control

```jsx
// webpack.config.js
module.exports = {
  performance: {
    maxAssetSize: 244 * 1024, // 244KB
    maxEntrypointSize: 244 * 1024,
    hints: 'error',
  },
};

// Component level splitting
const HeavyFeature = lazy(() => {
  if (navigator.connection?.effectiveType === '4g') {
    return import('./HeavyFeature');
  }
  return import('./LightFeature');
});
```

### 2. Runtime Budget

```jsx
function usePerformanceBudget(budget) {
  const [isWithinBudget, setIsWithinBudget] = useState(true);

  useEffect(() => {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const totalTime = entries.reduce((sum, entry) => sum + entry.duration, 0);

      setIsWithinBudget(totalTime <= budget);
    });

    observer.observe({ entryTypes: ['measure'] });
    return () => observer.disconnect();
  }, [budget]);

  return isWithinBudget;
}

function OptimizedFeature({ fallback }) {
  const isWithinBudget = usePerformanceBudget(100); // 100ms budget

  return isWithinBudget ? <ComplexFeature /> : fallback;
}
```

## Graceful Degradation

### 1. Feature Fallbacks

```jsx
function withFeatureFallback(FeatureComponent, FallbackComponent) {
  return function FeatureWrapper(props) {
    const features = useFeatureDetection();
    const { type: networkType } = useNetworkStatus();

    const shouldUseFeature =
      features.required.every((f) => features[f]) && networkType !== 'slow-2g';

    return shouldUseFeature ? <FeatureComponent {...props} /> : <FallbackComponent {...props} />;
  };
}

const EnhancedChart = withFeatureFallback(WebGLChart, BasicChart);
```

### 2. Capability-Based Rendering

```jsx
function useCapabilities() {
  const features = useFeatureDetection();
  const network = useNetworkStatus();
  const performance = usePerformanceMetrics();

  return {
    canRenderComplex: features.webgl && network.type === '4g' && performance.score > 0.8,
    canUseWorkers: features.webworker && performance.score > 0.5,
    canStoreLocally: features.localstorage && !performance.isLowMemory,
  };
}

function AdaptiveUI() {
  const capabilities = useCapabilities();

  return (
    <div>
      {capabilities.canRenderComplex ? <ComplexVisualization /> : <SimpleVisualization />}

      {capabilities.canUseWorkers && <BackgroundProcessor />}

      {capabilities.canStoreLocally && <OfflineSupport />}
    </div>
  );
}
```

## Best Practices

1. **Core Functionality**

   - Identify essential features
   - Implement basic version first
   - Ensure broad compatibility
   - Test core functionality

2. **Enhancement Strategy**

   - Progressive feature loading
   - Capability detection
   - Network-aware enhancements
   - Performance monitoring

3. **Fallback Implementation**
   - Graceful degradation
   - Meaningful alternatives
   - Clear user communication
   - Smooth transitions

## Conclusion

Progressive enhancement in React applications ensures a better user experience across different devices and conditions. Key principles:

- Start with core functionality
- Enhance based on capabilities
- Monitor performance impact
- Provide meaningful fallbacks
- Use network-aware loading

Remember that progressive enhancement is about:

- Delivering essential features first
- Adding enhancements gradually
- Maintaining performance budgets
- Ensuring broad accessibility

## Additional Resources

- [Web Vitals Guide](https://web.dev/vitals/)
- [Progressive Enhancement Patterns](https://www.patterns.dev/posts#progressive-enhancement)
- [Performance Budgets](https://web.dev/performance-budgets-101/)
- [Network Information API](https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation)
