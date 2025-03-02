---
title: Example Projects
description: Real-world examples of React applications optimized with ZenReact
head:
  - - meta
    - name: description
      content: Explore practical examples of using ZenReact to optimize React applications in real-world scenarios.
---

# Example Projects

Explore these example projects to see ZenReact in action and learn best practices for common optimization scenarios.

## Basic Examples

### Search Component

A search input with automatic debouncing and optimized re-renders.

```jsx
import { useOptimizedState, withOptimization } from '@zenreact/core';

function SearchResults({ results }) {
  return (
    <ul>
      {results.map((item) => (
        <li key={item.id}>{item.title}</li>
      ))}
    </ul>
  );
}

// Optimize the results list
const OptimizedResults = withOptimization(SearchResults);

export function SearchExample() {
  const [query, setQuery] = useOptimizedState('');
  const [results, setResults] = useOptimizedState([]);

  useEffect(() => {
    // API calls are automatically debounced
    searchAPI(query).then(setResults);
  }, [query]);

  return (
    <div>
      <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search..." />
      <OptimizedResults results={results} />
    </div>
  );
}
```

### Data Grid

A large data grid with optimized rendering and sorting.

```jsx
import { withOptimization, useOptimizedState } from '@zenreact/core';

function DataGridRow({ item }) {
  return (
    <tr>
      <td>{item.id}</td>
      <td>{item.name}</td>
      <td>{item.value}</td>
    </tr>
  );
}

// Optimize individual rows
const OptimizedRow = withOptimization(DataGridRow);

function DataGrid({ data }) {
  const [sortField, setSortField] = useOptimizedState('id');
  const [sortOrder, setSortOrder] = useOptimizedState('asc');

  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => {
      const modifier = sortOrder === 'asc' ? 1 : -1;
      return a[sortField] > b[sortField] ? modifier : -modifier;
    });
  }, [data, sortField, sortOrder]);

  return (
    <table>
      <thead>
        <tr>
          <th onClick={() => setSortField('id')}>ID</th>
          <th onClick={() => setSortField('name')}>Name</th>
          <th onClick={() => setSortField('value')}>Value</th>
        </tr>
      </thead>
      <tbody>
        {sortedData.map((item) => (
          <OptimizedRow key={item.id} item={item} />
        ))}
      </tbody>
    </table>
  );
}

export default withOptimization(DataGrid);
```

## Advanced Examples

### Real-time Dashboard

A dashboard with live data updates and optimized rendering.

```jsx
import { withOptimization, useOptimizedState } from '@zenreact/core';

function MetricCard({ title, value, trend }) {
  return (
    <div className="metric-card">
      <h3>{title}</h3>
      <div className="value">{value}</div>
      <div className={`trend ${trend > 0 ? 'up' : 'down'}`}>{trend}%</div>
    </div>
  );
}

const OptimizedMetricCard = withOptimization(MetricCard);

export function Dashboard() {
  const [metrics, setMetrics] = useOptimizedState({
    sales: { value: 0, trend: 0 },
    users: { value: 0, trend: 0 },
    revenue: { value: 0, trend: 0 },
  });

  useEffect(() => {
    // Connect to WebSocket for live updates
    const socket = new WebSocket('wss://api.example.com/metrics');

    socket.onmessage = (event) => {
      // Updates are automatically batched
      setMetrics(JSON.parse(event.data));
    };

    return () => socket.close();
  }, []);

  return (
    <div className="dashboard">
      <OptimizedMetricCard title="Sales" value={metrics.sales.value} trend={metrics.sales.trend} />
      <OptimizedMetricCard title="Users" value={metrics.users.value} trend={metrics.users.trend} />
      <OptimizedMetricCard
        title="Revenue"
        value={metrics.revenue.value}
        trend={metrics.revenue.trend}
      />
    </div>
  );
}
```

### Form Builder

A dynamic form builder with optimized field rendering.

```jsx
import { withOptimization, useOptimizedState } from '@zenreact/core';

const FormField = withOptimization(({ field, value, onChange }) => {
  switch (field.type) {
    case 'text':
      return <input type="text" value={value} onChange={(e) => onChange(e.target.value)} />;
    case 'select':
      return (
        <select value={value} onChange={(e) => onChange(e.target.value)}>
          {field.options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      );
    default:
      return null;
  }
});

export function FormBuilder() {
  const [fields, setFields] = useOptimizedState([
    { id: 1, type: 'text', label: 'Name' },
    {
      id: 2,
      type: 'select',
      label: 'Country',
      options: [
        { value: 'us', label: 'United States' },
        { value: 'uk', label: 'United Kingdom' },
      ],
    },
  ]);

  const [values, setValues] = useOptimizedState({});

  const handleFieldChange = (fieldId, value) => {
    setValues((prev) => ({
      ...prev,
      [fieldId]: value,
    }));
  };

  return (
    <form>
      {fields.map((field) => (
        <div key={field.id} className="field">
          <label>{field.label}</label>
          <FormField
            field={field}
            value={values[field.id] || ''}
            onChange={(value) => handleFieldChange(field.id, value)}
          />
        </div>
      ))}
    </form>
  );
}
```

## Complete Applications

For more complex examples, check out our sample applications:

1. [E-commerce Site](https://github.com/zenreact/example-ecommerce)

   - Product listing with filters
   - Shopping cart optimization
   - Checkout process

2. [Admin Dashboard](https://github.com/zenreact/example-admin)

   - Data tables with sorting and filtering
   - Real-time metrics
   - Form handling

3. [Social Media Feed](https://github.com/zenreact/example-social)
   - Infinite scroll optimization
   - Real-time updates
   - Media optimization

Each example includes:

- Full source code
- Setup instructions
- Performance comparison metrics
- Documentation of optimization strategies

## Contributing

Have an example to share? We welcome contributions! Please check our [contribution guidelines](https://github.com/zenreact/examples/CONTRIBUTING.md) for more information.
