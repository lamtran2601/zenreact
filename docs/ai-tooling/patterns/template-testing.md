# Testing Pattern Templates

## Overview

This document defines standardized templates for creating consistent, comprehensive test suites across the project. These templates ensure proper test coverage, maintainability, and reliability.

## Table of Contents

1. [Unit Testing Templates](#unit-testing-templates)
2. [Integration Testing Templates](#integration-testing-templates)
3. [Component Testing Templates](#component-testing-templates)
4. [End-to-End Testing Templates](#end-to-end-testing-templates)
5. [Performance Testing Templates](#performance-testing-templates)
6. [Best Practices](#best-practices)

## Unit Testing Templates

### Function Test Template

```typescript
import { functionToTest } from './path-to-function';

describe('functionToTest', () => {
  // Basic functionality test
  it('should perform its primary function correctly', () => {
    // Arrange
    const input = 'test input';
    const expectedOutput = 'expected result';
    
    // Act
    const result = functionToTest(input);
    
    // Assert
    expect(result).toEqual(expectedOutput);
  });
  
  // Edge cases
  it('should handle edge case: empty input', () => {
    // Arrange
    const input = '';
    
    // Act
    const result = functionToTest(input);
    
    // Assert
    expect(result).toEqual(/* expected result for empty input */);
  });
  
  it('should handle edge case: null input', () => {
    // Arrange
    const input = null;
    
    // Act & Assert
    expect(() => functionToTest(input)).toThrow(/* expected error */);
  });
  
  // Error cases
  it('should throw appropriate error for invalid input', () => {
    // Arrange
    const invalidInput = { /* invalid structure */ };
    
    // Act & Assert
    expect(() => functionToTest(invalidInput)).toThrow(/specific error message/);
  });
  
  // Performance considerations (if applicable)
  it('should handle large inputs efficiently', () => {
    // Arrange
    const largeInput = /* generate large input */;
    
    // Act
    const startTime = performance.now();
    const result = functionToTest(largeInput);
    const endTime = performance.now();
    
    // Assert
    expect(endTime - startTime).toBeLessThan(/* acceptable time in ms */);
    expect(result).toEqual(/* expected result */);
  });
});
```

### Utility Class Test Template

```typescript
import { UtilityClass } from './path-to-utility';

describe('UtilityClass', () => {
  let instance: UtilityClass;
  
  // Setup before each test
  beforeEach(() => {
    instance = new UtilityClass(/* constructor params */);
  });
  
  // Teardown after each test (if needed)
  afterEach(() => {
    // Clean up resources
  });
  
  // Method tests
  describe('methodName', () => {
    it('should perform its primary function correctly', () => {
      // Arrange
      const input = 'test input';
      const expectedOutput = 'expected result';
      
      // Act
      const result = instance.methodName(input);
      
      // Assert
      expect(result).toEqual(expectedOutput);
    });
    
    // Additional test cases for the method
  });
  
  // Another method
  describe('anotherMethod', () => {
    it('should perform its function correctly', () => {
      // Test implementation
    });
    
    // Additional test cases
  });
  
  // State management tests
  describe('state management', () => {
    it('should update internal state correctly', () => {
      // Arrange - initial state
      
      // Act - perform operations that change state
      instance.methodThatChangesState();
      
      // Assert - verify state changed correctly
      expect(instance.getState()).toEqual(/* expected state */);
    });
  });
});
```

### Hook Test Template

```typescript
import { renderHook, act } from '@testing-library/react-hooks';
import { useCustomHook } from './path-to-hook';

describe('useCustomHook', () => {
  // Basic functionality
  it('should return the expected initial values', () => {
    // Arrange & Act
    const { result } = renderHook(() => useCustomHook(/* initial params */));
    
    // Assert
    expect(result.current.value).toEqual(/* expected initial value */);
    expect(typeof result.current.updateValue).toBe('function');
  });
  
  // State update tests
  it('should update value when updateValue is called', () => {
    // Arrange
    const { result } = renderHook(() => useCustomHook(/* initial params */));
    const newValue = 'new value';
    
    // Act
    act(() => {
      result.current.updateValue(newValue);
    });
    
    // Assert
    expect(result.current.value).toEqual(newValue);
  });
  
  // Effect tests
  it('should call effect on dependency change', () => {
    // Arrange
    const effectCallback = jest.fn();
    const { rerender } = renderHook(
      ({ dependency }) => useCustomHook(dependency, effectCallback),
      { initialProps: { dependency: 'initial' } }
    );
    
    // Initial render should call effect
    expect(effectCallback).toHaveBeenCalledTimes(1);
    
    // Act - rerender with same dependency
    rerender({ dependency: 'initial' });
    
    // Assert - effect should not be called again
    expect(effectCallback).toHaveBeenCalledTimes(1);
    
    // Act - rerender with new dependency
    rerender({ dependency: 'changed' });
    
    // Assert - effect should be called again
    expect(effectCallback).toHaveBeenCalledTimes(2);
  });
  
  // Cleanup tests
  it('should clean up resources on unmount', () => {
    // Arrange
    const cleanup = jest.fn();
    const { unmount } = renderHook(() => {
      useCustomHook(/* params */);
      return () => cleanup();
    });
    
    // Act
    unmount();
    
    // Assert
    expect(cleanup).toHaveBeenCalledTimes(1);
  });
});
```

## Integration Testing Templates

### Service Integration Test Template

```typescript
import { ServiceA } from './path-to-service-a';
import { ServiceB } from './path-to-service-b';
import { Database } from './path-to-database';

describe('Service Integration', () => {
  let serviceA: ServiceA;
  let serviceB: ServiceB;
  let database: Database;
  
  // Setup test environment
  beforeAll(async () => {
    // Initialize test database
    database = new Database(/* test config */);
    await database.connect();
    
    // Initialize services with dependencies
    serviceB = new ServiceB(database);
    serviceA = new ServiceA(serviceB);
  });
  
  // Clean up after tests
  afterAll(async () => {
    await database.disconnect();
  });
  
  // Reset database between tests
  beforeEach(async () => {
    await database.reset();
  });
  
  // Integration test cases
  it('should complete end-to-end workflow', async () => {
    // Arrange
    const testData = { /* test data */ };
    
    // Act
    await serviceA.processData(testData);
    
    // Assert
    const result = await serviceB.getProcessedResult(testData.id);
    expect(result).toEqual(/* expected processed result */);
    
    // Verify database state
    const dbRecord = await database.findRecord(testData.id);
    expect(dbRecord).toEqual(/* expected database state */);
  });
  
  // Error handling across services
  it('should handle errors appropriately', async () => {
    // Arrange
    const invalidData = { /* invalid data */ };
    
    // Act & Assert
    await expect(serviceA.processData(invalidData)).rejects.toThrow();
    
    // Verify error was handled correctly
    const errorLog = await serviceB.getErrorLog();
    expect(errorLog).toContain(/* expected error details */);
  });
  
  // Performance across services
  it('should meet performance requirements', async () => {
    // Arrange
    const largeDataSet = /* generate large test data */;
    
    // Act
    const startTime = Date.now();
    await serviceA.processData(largeDataSet);
    const endTime = Date.now();
    
    // Assert
    expect(endTime - startTime).toBeLessThan(/* acceptable time in ms */);
  });
});
```

### API Integration Test Template

```typescript
import request from 'supertest';
import { app } from './path-to-app';
import { setupTestDatabase, teardownTestDatabase } from './test-utils';

describe('API Integration', () => {
  // Setup test environment
  beforeAll(async () => {
    await setupTestDatabase();
  });
  
  // Clean up after tests
  afterAll(async () => {
    await teardownTestDatabase();
  });
  
  // API endpoint tests
  describe('GET /api/resource', () => {
    it('should return list of resources', async () => {
      // Act
      const response = await request(app)
        .get('/api/resource')
        .set('Authorization', 'Bearer test-token');
      
      // Assert
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('data');
      expect(Array.isArray(response.body.data)).toBe(true);
    });
    
    it('should filter resources by query parameters', async () => {
      // Act
      const response = await request(app)
        .get('/api/resource?filter=test')
        .set('Authorization', 'Bearer test-token');
      
      // Assert
      expect(response.status).toBe(200);
      expect(response.body.data.every(item => item.name.includes('test'))).toBe(true);
    });
    
    it('should require authentication', async () => {
      // Act
      const response = await request(app)
        .get('/api/resource');
      
      // Assert
      expect(response.status).toBe(401);
    });
  });
  
  describe('POST /api/resource', () => {
    it('should create a new resource', async () => {
      // Arrange
      const newResource = { /* resource data */ };
      
      // Act
      const response = await request(app)
        .post('/api/resource')
        .set('Authorization', 'Bearer test-token')
        .send(newResource);
      
      // Assert
      expect(response.status).toBe(201);
      expect(response.body.data).toMatchObject(newResource);
      
      // Verify resource was created
      const getResponse = await request(app)
        .get(`/api/resource/${response.body.data.id}`)
        .set('Authorization', 'Bearer test-token');
      
      expect(getResponse.status).toBe(200);
      expect(getResponse.body.data).toMatchObject(newResource);
    });
    
    it('should validate request body', async () => {
      // Arrange
      const invalidResource = { /* invalid data */ };
      
      // Act
      const response = await request(app)
        .post('/api/resource')
        .set('Authorization', 'Bearer test-token')
        .send(invalidResource);
      
      // Assert
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });
  });
});
```

## Component Testing Templates

### Basic Component Test Template

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { Component } from './path-to-component';

describe('Component', () => {
  // Rendering tests
  it('should render correctly with default props', () => {
    // Arrange & Act
    render(<Component />);
    
    // Assert
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
    // Additional assertions on rendered output
  });
  
  it('should render correctly with custom props', () => {
    // Arrange
    const customProps = {
      title: 'Custom Title',
      description: 'Custom Description'
    };
    
    // Act
    render(<Component {...customProps} />);
    
    // Assert
    expect(screen.getByText('Custom Title')).toBeInTheDocument();
    expect(screen.getByText('Custom Description')).toBeInTheDocument();
  });
  
  // Interaction tests
  it('should handle click events', () => {
    // Arrange
    const handleClick = jest.fn();
    render(<Component onClick={handleClick} />);
    const button = screen.getByRole('button');
    
    // Act
    fireEvent.click(button);
    
    // Assert
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  
  it('should handle input changes', () => {
    // Arrange
    render(<Component />);
    const input = screen.getByRole('textbox');
    
    // Act
    fireEvent.change(input, { target: { value: 'New Value' } });
    
    // Assert
    expect(input).toHaveValue('New Value');
    // Additional assertions on component state or behavior
  });
  
  // Accessibility tests
  it('should meet accessibility requirements', () => {
    // Arrange
    const { container } = render(<Component />);
    
    // Assert
    expect(container).toBeAccessible();
  });
  
  // Snapshot test (if applicable)
  it('should match snapshot', () => {
    // Arrange
    const { container } = render(<Component />);
    
    // Assert
    expect(container).toMatchSnapshot();
  });
});
```

### Complex Component Test Template

```typescript
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Component } from './path-to-component';
import { DataProvider } from './path-to-provider';

// Mock dependencies
jest.mock('./path-to-service', () => ({
  fetchData: jest.fn().mockResolvedValue({ data: 'mocked data' })
}));

describe('Component', () => {
  // Setup and teardown
  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
  });
  
  // Helper function for common rendering
  const renderComponent = (props = {}) => {
    return render(
      <DataProvider>
        <Component {...props} />
      </DataProvider>
    );
  };
  
  // Rendering tests
  it('should render loading state initially', () => {
    // Arrange & Act
    renderComponent();
    
    // Assert
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
  
  it('should render data after loading', async () => {
    // Arrange & Act
    renderComponent();
    
    // Assert - wait for loading to complete
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });
    
    expect(screen.getByText('mocked data')).toBeInTheDocument();
  });
  
  // State management tests
  it('should update state on user interaction', async () => {
    // Arrange
    renderComponent();
    
    // Wait for initial load
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });
    
    // Act - user interaction
    const button = screen.getByRole('button', { name: 'Update' });
    userEvent.click(button);
    
    // Assert - state updated
    await waitFor(() => {
      expect(screen.getByText('Updated State')).toBeInTheDocument();
    });
  });
  
  // Error handling tests
  it('should handle error states', async () => {
    // Arrange - mock service to reject
    const { fetchData } = require('./path-to-service');
    fetchData.mockRejectedValueOnce(new Error('Test error'));
    
    // Act
    renderComponent();
    
    // Assert - error state rendered
    await waitFor(() => {
      expect(screen.getByText('Error: Test error')).toBeInTheDocument();
    });
    
    // Act - retry
    const retryButton = screen.getByRole('button', { name: 'Retry' });
    userEvent.click(retryButton);
    
    // Assert - loading again
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
  
  // Prop change tests
  it('should respond to prop changes', async () => {
    // Arrange
    const { rerender } = renderComponent({ initialValue: 'Initial' });
    
    // Wait for initial render
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });
    
    // Act - change props
    rerender(
      <DataProvider>
        <Component initialValue="Updated" />
      </DataProvider>
    );
    
    // Assert
    expect(screen.getByText('Updated')).toBeInTheDocument();
  });
  
  // Event handler tests
  it('should call event handlers with correct arguments', async () => {
    // Arrange
    const handleChange = jest.fn();
    renderComponent({ onChange: handleChange });
    
    // Wait for initial render
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });
    
    // Act
    const input = screen.getByRole('textbox');
    userEvent.type(input, 'New Value');
    
    // Assert
    expect(handleChange).toHaveBeenCalledWith('New Value');
  });
});
```

## End-to-End Testing Templates

### User Flow Test Template

```typescript
import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  // Setup for all tests in this group
  test.beforeEach(async ({ page }) => {
    // Navigate to starting page
    await page.goto('https://example.com');
    
    // Perform login if needed
    await page.fill('input[name="username"]', 'testuser');
    await page.fill('input[name="password"]', 'password');
    await page.click('button[type="submit"]');
    
    // Verify login successful
    await expect(page.locator('.user-profile')).toBeVisible();
  });
  
  // Test complete user flow
  test('should complete end-to-end user flow', async ({ page }) => {
    // Step 1: Navigate to feature
    await page.click('nav >> text=Feature');
    await expect(page).toHaveURL(/.*\/feature/);
    
    // Step 2: Interact with feature
    await page.fill('input[name="search"]', 'test query');
    await page.click('button >> text=Search');
    
    // Verify search results
    await expect(page.locator('.search-results')).toBeVisible();
    await expect(page.locator('.result-item')).toHaveCount(5);
    
    // Step 3: Select item from results
    await page.click('.result-item:first-child');
    await expect(page).toHaveURL(/.*\/item\/\d+/);
    
    // Step 4: Perform action on item
    await page.click('button >> text=Add to Cart');
    
    // Verify action successful
    await expect(page.locator('.notification')).toContainText('Added to cart');
    
    // Step 5: Navigate to cart
    await page.click('nav >> text=Cart');
    await expect(page).toHaveURL(/.*\/cart/);
    
    // Verify item in cart
    await expect(page.locator('.cart-item')).toHaveCount(1);
    
    // Step 6: Checkout process
    await page.click('button >> text=Checkout');
    await expect(page).toHaveURL(/.*\/checkout/);
    
    // Fill shipping information
    await page.fill('input[name="address"]', '123 Test St');
    await page.fill('input[name="city"]', 'Test City');
    await page.fill('input[name="zip"]', '12345');
    await page.click('button >> text=Continue');
    
    // Fill payment information
    await page.fill('input[name="cardNumber"]', '4111111111111111');
    await page.fill('input[name="expiry"]', '12/25');
    await page.fill('input[name="cvv"]', '123');
    await page.click('button >> text=Pay Now');
    
    // Verify order confirmation
    await expect(page).toHaveURL(/.*\/confirmation/);
    await expect(page.locator('.order-confirmation')).toContainText('Thank you for your order');
    await expect(page.locator('.order-number')).toBeVisible();
  });
  
  // Test error handling
  test('should handle validation errors', async ({ page }) => {
    // Navigate to feature
    await page.click('nav >> text=Feature');
    
    // Submit form with invalid data
    await page.click('button >> text=Submit');
    
    // Verify validation errors
    await expect(page.locator('.error-message')).toBeVisible();
    await expect(page.locator('.error-message')).toContainText('Required field');
    
    // Fix errors and submit
    await page.fill('input.invalid', 'Valid input');
    await page.click('button >> text=Submit');
    
    // Verify success
    await expect(page.locator('.success-message')).toBeVisible();
  });
  
  // Test responsive behavior
  test('should work on mobile viewport', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Verify mobile navigation
    await expect(page.locator('.mobile-menu-button')).toBeVisible();
    await page.click('.mobile-menu-button');
    await expect(page.locator('.mobile-menu')).toBeVisible();
    
    // Complete core flow on mobile
    await page.click('.mobile-menu >> text=Feature');
    // Continue with mobile-specific interactions
  });
});
```

## Performance Testing Templates

### Component Performance Test Template

```typescript
import { render, screen } from '@testing-library/react';
import { Component } from './path-to-component';

describe('Component Performance', () => {
  // Render performance
  it('should render efficiently', () => {
    // Arrange
    const start = performance.now();
    
    // Act
    render(<Component />);
    
    // Assert
    const end = performance.now();
    expect(end - start).toBeLessThan(100); // Render should take less than 100ms
  });
  
  // Re-render performance
  it('should re-render efficiently', () => {
    // Arrange
    const { rerender } = render(<Component value="initial" />);
    
    // Act
    const start = performance.now();
    rerender(<Component value="updated" />);
    const end = performance.now();
    
    // Assert
    expect(end - start).toBeLessThan(50); // Re-render should take less than 50ms
  });
  
  // Memory usage
  it('should not cause memory leaks', () => {
    // This is a simplified example - real memory testing often requires browser tools
    
    // Arrange
    const memoryBefore = window.performance.memory?.usedJSHeapSize || 0;
    
    // Act
    const { unmount } = render(<Component />);
    unmount();
    
    // Assert
    const memoryAfter = window.performance.memory?.usedJSHeapSize || 0;
    expect(memoryAfter - memoryBefore).toBeLessThan(1000000); // Less than 1MB increase
  });
  
  // Large data handling
  it('should handle large datasets efficiently', () => {
    // Arrange
    const largeDataset = Array.from({ length: 1000 }, (_, i) => ({ id: i, name: `Item ${i}` }));
    
    // Act
    const start = performance.now();
    render(<Component data={largeDataset} />);
    const end = performance.now();
    
    // Assert
    expect(end - start).toBeLessThan(500); // Should render large dataset in under 500ms
    
    // Verify all items rendered
    expect(screen.getAllByRole('listitem')).toHaveLength(1000);
  });
});
```

### API Performance Test Template

```typescript
import { performance } from 'perf_hooks';
import request from 'supertest';
import { app } from './path-to-app';

describe('API Performance', () => {
  // Response time test
  it('should respond within acceptable time', async () => {
    // Act
    const start = performance.now();
    await request(app).get('/api/resource');
    const end = performance.now();
    
    // Assert
    expect(end - start).toBeLessThan(200); // Response within 200ms
  });
  
  // Concurrent requests test
  it('should handle concurrent requests efficiently', async () => {
    // Arrange
    const concurrentRequests = 10;
    const requests = Array.from({ length: concurrentRequests }, () => 
      request(app).get('/api/resource')
    );
    
    // Act
    const start = performance.now();
    await Promise.all(requests);
    const end = performance.now();
    
    // Assert
    const averageTime = (end - start) / concurrentRequests;
    expect(averageTime).toBeLessThan(300); // Average response time under 300ms
  });
  
  // Large payload test
  it('should handle large payloads efficiently', async () => {
    // Arrange
    const largePayload = {
      items: Array.from({ length: 1000 }, (_, i) => ({ 
        id: i, 
        name: `Item ${i}`,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
      }))
    };
    
    // Act
    const start = performance.now();
    await request(app)
      .post('/api/bulk-create')
      .send(largePayload);
    const end = performance.now();
    
    // Assert
    expect(end - start).toBeLessThan(1000); // Process large payload under 1 second
  });
  
  // Load test (simplified)
  it('should maintain performance under load', async () => {
    // Arrange
    const requestCount = 50;
    const results = [];
    
    // Act
    for (let i = 0; i < requestCount; i++) {
      const start = performance.now();
      await request(app).get('/api/resource');
      const end = performance.now();
      results.push(end - start);
    }
    
    // Assert
    const average = results.reduce((sum, time) => sum + time, 0) / requestCount;
    const max = Math.max(...results);
    
    expect(average).toBeLessThan(200); // Average under 200ms
    expect(max).toBeLessThan(500); // Max under 500ms
    
    // Check for degradation
    const firstHalf = results.slice(0, requestCount / 2);
    const secondHalf = results.slice(requestCount / 2);
    const firstAvg = firstHalf.reduce((sum, time) => sum + time, 0) / firstHalf.length;
    const secondAvg = secondHalf.reduce((sum, time) => sum + time, 0) / secondHalf.length;
    
    // Second half should not be significantly slower than first half
    expect(secondAvg / firstAvg).toBeLessThan(1.5);
  });
});
```

## Best Practices

### Testing Standards

```yaml
testing_standards:
  coverage:
    - Unit tests: 80%+ coverage
    - Integration tests: Key workflows
    - Component tests: All user interactions
    - E2E tests: Critical user journeys
    
  organization:
    - Group tests by feature/component
    - Clear test descriptions
    - Consistent naming patterns
    - Logical test order
    
  quality:
    - Test one concept per test
    - Avoid test interdependence
    - Clear arrange-act-assert structure
    - Meaningful assertions
    
  maintenance:
    - Regular test review
    - Update with feature changes
    - Remove obsolete tests
    - Performance optimization
```

### Test Implementation Guidelines

```yaml
implementation_guidelines:
  principles:
    - Write tests before implementation
    - Focus on behavior, not implementation
    - Test edge cases and error paths
    - Keep tests simple and readable
    
  mocking:
    - Mock external dependencies
    - Use realistic test data
    - Avoid excessive mocking
    - Verify mock interactions
    
  performance:
    - Optimize slow tests
    - Use appropriate test granularity
    - Parallelize when possible
    - Minimize setup/teardown overhead
    
  debugging:
    - Clear failure messages
    - Descriptive test names
    - Isolated test failures
    - Reproducible test runs
```

### Common Pitfalls

```yaml
common_pitfalls:
  to_avoid:
    - Brittle tests that break with minor changes
    - Testing implementation details
    - Overlapping test responsibilities
    - Slow or flaky tests
    - Inadequate error case coverage
    
  solutions:
    - Focus on component contracts
    - Test behavior, not implementation
    - Clear test boundaries
    - Stable test environment
    - Comprehensive error testing
``` 