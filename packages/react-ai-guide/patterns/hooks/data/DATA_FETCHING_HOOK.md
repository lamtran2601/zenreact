# Data Fetching Hook Pattern

## Overview

The Data Fetching Hook pattern provides a consistent, reusable approach for handling API requests in React applications. This pattern encapsulates fetching logic, loading states, error handling, and caching, enabling components to focus on presentation rather than data retrieval details.

## Use Cases

- Retrieving data from REST APIs
- Making GraphQL queries
- Implementing real-time data updates
- Handling paginated data
- Implementing search and filtering functionality
- Managing form submissions
- Uploading files
- Polling for updates
- Implementing infinite scroll

## Structure

### Core Elements

1. **Request State Management**: Track loading, error, and data states
2. **Fetch Function**: Execute and manage API requests
3. **Response Handling**: Process and transform API responses
4. **Error Handling**: Manage and communicate error conditions
5. **Retry Mechanism**: Optionally retry failed requests
6. **Cancellation**: Handle component unmount or dependency changes
7. **Caching**: Optional caching of responses for performance

### State Structure

- `data`: The successfully fetched response data
- `isLoading`: Boolean indicating if a request is in progress
- `error`: Any error that occurred during the request
- `isError`: Boolean indicating if an error occurred
- Additional optional states like `isSuccess`, `isFetching` (for background refreshes)

## TypeScript Interface

```typescript
interface UseFetchOptions<TData, TError> {
  /**
   * Initial data to use before the first fetch completes
   */
  initialData?: TData;
  
  /**
   * Whether to fetch data immediately when the hook is mounted
   */
  fetchOnMount?: boolean;
  
  /**
   * Dependencies that trigger a refetch when changed
   */
  dependencies?: any[];
  
  /**
   * Transform function to format the raw response
   */
  transformData?: (data: any) => TData;
  
  /**
   * Callback to handle successful responses
   */
  onSuccess?: (data: TData) => void;
  
  /**
   * Callback to handle errors
   */
  onError?: (error: TError) => void;
  
  /**
   * Number of times to retry on failure
   */
  retryCount?: number;
  
  /**
   * Delay between retry attempts in milliseconds
   */
  retryDelay?: number;
  
  /**
   * Whether to cache the response
   */
  cache?: boolean;
  
  /**
   * Time in milliseconds to keep cached data
   */
  cacheTime?: number;
  
  /**
   * Additional fetch options (headers, credentials, etc.)
   */
  fetchOptions?: RequestInit;
}

interface FetchState<TData, TError> {
  /**
   * The fetched data, undefined until the first successful response
   */
  data: TData | undefined;
  
  /**
   * Whether the initial fetch is in progress
   */
  isLoading: boolean;
  
  /**
   * Whether a fetch is in progress (initial or background)
   */
  isFetching: boolean;
  
  /**
   * Whether the last fetch was successful
   */
  isSuccess: boolean;
  
  /**
   * Whether the last fetch resulted in an error
   */
  isError: boolean;
  
  /**
   * The error that occurred during the fetch, if any
   */
  error: TError | null;
}

interface UseFetchResult<TData, TError> extends FetchState<TData, TError> {
  /**
   * Manually trigger a fetch
   * @param overrideUrl Optional URL to override the initial URL
   * @param overrideOptions Optional fetch options to override the initial options
   */
  refetch: (overrideUrl?: string, overrideOptions?: RequestInit) => Promise<TData>;
  
  /**
   * Cancel the current fetch operation
   */
  cancel: () => void;
  
  /**
   * Reset the state to initial values
   */
  reset: () => void;
}

/**
 * Hook for fetching data from an API
 */
function useFetch<TData = any, TError = Error>(
  url: string,
  options?: UseFetchOptions<TData, TError>
): UseFetchResult<TData, TError>;
```

## Implementation Example

```tsx
import { useState, useEffect, useRef, useCallback } from 'react';

interface UseFetchOptions<TData, TError> {
  initialData?: TData;
  fetchOnMount?: boolean;
  dependencies?: any[];
  transformData?: (data: any) => TData;
  onSuccess?: (data: TData) => void;
  onError?: (error: TError) => void;
  retryCount?: number;
  retryDelay?: number;
  cache?: boolean;
  cacheTime?: number;
  fetchOptions?: RequestInit;
}

interface FetchState<TData, TError> {
  data: TData | undefined;
  isLoading: boolean;
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: TError | null;
}

interface UseFetchResult<TData, TError> extends FetchState<TData, TError> {
  refetch: (overrideUrl?: string, overrideOptions?: RequestInit) => Promise<TData>;
  cancel: () => void;
  reset: () => void;
}

// Simple in-memory cache
const cache = new Map<string, { data: any; timestamp: number }>();

export function useFetch<TData = any, TError = Error>(
  url: string,
  options: UseFetchOptions<TData, TError> = {}
): UseFetchResult<TData, TError> {
  const {
    initialData,
    fetchOnMount = true,
    dependencies = [],
    transformData = (data) => data as TData,
    onSuccess,
    onError,
    retryCount = 0,
    retryDelay = 1000,
    cache: useCache = false,
    cacheTime = 5 * 60 * 1000, // 5 minutes
    fetchOptions = {}
  } = options;

  // State for tracking loading, data, and errors
  const [state, setState] = useState<FetchState<TData, TError>>({
    data: initialData,
    isLoading: fetchOnMount,
    isFetching: fetchOnMount,
    isSuccess: false,
    isError: false,
    error: null
  });

  // Refs for handling race conditions and cancellation
  const abortControllerRef = useRef<AbortController | null>(null);
  const isMountedRef = useRef(true);
  const activeRequestUrlRef = useRef<string | null>(null);
  const retryCountRef = useRef(0);
  const retryTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Function to create a cache key from URL and options
  const getCacheKey = useCallback((fetchUrl: string, fetchOpts: RequestInit) => {
    return `${fetchUrl}:${JSON.stringify(fetchOpts)}`;
  }, []);

  // Function to get data from cache
  const getFromCache = useCallback((fetchUrl: string, fetchOpts: RequestInit) => {
    const key = getCacheKey(fetchUrl, fetchOpts);
    const cachedItem = cache.get(key);
    
    if (!cachedItem) return null;
    
    const now = Date.now();
    if (now - cachedItem.timestamp > cacheTime) {
      cache.delete(key);
      return null;
    }
    
    return cachedItem.data;
  }, [getCacheKey, cacheTime]);

  // Function to set data in cache
  const setInCache = useCallback((fetchUrl: string, fetchOpts: RequestInit, data: any) => {
    const key = getCacheKey(fetchUrl, fetchOpts);
    cache.set(key, { data, timestamp: Date.now() });
  }, [getCacheKey]);

  // Function to perform the fetch operation
  const fetchData = useCallback(
    async (fetchUrl: string, fetchOpts: RequestInit = {}): Promise<TData> => {
      // Cancel any in-progress fetch
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      // Check cache if enabled
      if (useCache) {
        const cachedData = getFromCache(fetchUrl, fetchOpts);
        if (cachedData) {
          if (isMountedRef.current) {
            const transformedData = transformData(cachedData);
            setState(prev => ({
              ...prev,
              data: transformedData,
              isLoading: false,
              isFetching: false,
              isSuccess: true,
              isError: false,
              error: null
            }));
            onSuccess?.(transformedData);
          }
          return transformData(cachedData);
        }
      }

      // Create a new abort controller for this request
      const abortController = new AbortController();
      abortControllerRef.current = abortController;
      activeRequestUrlRef.current = fetchUrl;

      // Update loading state
      setState(prev => ({
        ...prev,
        isFetching: true,
        ...(prev.data === undefined && { isLoading: true })
      }));

      const mergedOptions: RequestInit = {
        ...fetchOpts,
        signal: abortController.signal
      };

      try {
        // Perform the fetch operation
        const response = await fetch(fetchUrl, mergedOptions);

        // Handle HTTP errors
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        // Parse the response
        const responseData = await response.json();
        
        // Only update state if component is still mounted and this is the active request
        if (isMountedRef.current && activeRequestUrlRef.current === fetchUrl) {
          const transformedData = transformData(responseData);
          
          // Cache the response if enabled
          if (useCache) {
            setInCache(fetchUrl, fetchOpts, responseData);
          }
          
          // Update state with successful data
          setState({
            data: transformedData,
            isLoading: false,
            isFetching: false,
            isSuccess: true,
            isError: false,
            error: null
          });
          
          // Call success callback
          onSuccess?.(transformedData);
          
          // Reset retry count
          retryCountRef.current = 0;
          
          return transformedData;
        }
        
        // Return data even if component unmounted (for await refetch calls)
        return transformData(responseData);
      } catch (err) {
        // Don't update state if the fetch was aborted or component unmounted
        if (err.name === 'AbortError' || !isMountedRef.current || activeRequestUrlRef.current !== fetchUrl) {
          throw err;
        }

        // Handle retry logic
        if (retryCountRef.current < retryCount) {
          retryCountRef.current += 1;
          
          // Set up retry timer
          if (retryTimerRef.current) {
            clearTimeout(retryTimerRef.current);
          }
          
          return new Promise<TData>((resolve, reject) => {
            retryTimerRef.current = setTimeout(() => {
              fetchData(fetchUrl, fetchOpts).then(resolve).catch(reject);
            }, retryDelay);
          });
        }

        // Update state with error
        const error = err as TError;
        setState({
          data: initialData,
          isLoading: false,
          isFetching: false,
          isSuccess: false,
          isError: true,
          error
        });
        
        // Call error callback
        onError?.(error);
        
        // Reset retry count
        retryCountRef.current = 0;
        
        throw error;
      }
    },
    [
      initialData,
      transformData,
      onSuccess,
      onError,
      retryCount,
      retryDelay,
      useCache,
      getFromCache,
      setInCache
    ]
  );

  // Function to manually trigger a fetch
  const refetch = useCallback(
    (overrideUrl?: string, overrideOptions?: RequestInit) => {
      const fetchUrl = overrideUrl || url;
      const fetchOpts = { ...fetchOptions, ...overrideOptions };
      return fetchData(fetchUrl, fetchOpts);
    },
    [url, fetchOptions, fetchData]
  );

  // Function to cancel the current fetch
  const cancel = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    
    if (retryTimerRef.current) {
      clearTimeout(retryTimerRef.current);
      retryTimerRef.current = null;
    }
    
    activeRequestUrlRef.current = null;
    
    // Only update state if still loading/fetching
    if (state.isLoading || state.isFetching) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        isFetching: false
      }));
    }
  }, [state.isLoading, state.isFetching]);

  // Function to reset the state
  const reset = useCallback(() => {
    cancel();
    setState({
      data: initialData,
      isLoading: false,
      isFetching: false,
      isSuccess: false,
      isError: false,
      error: null
    });
    retryCountRef.current = 0;
  }, [cancel, initialData]);

  // Effect to fetch data on mount and when dependencies change
  useEffect(() => {
    if (fetchOnMount) {
      fetchData(url, fetchOptions).catch(() => {
        // Error already handled in fetchData
      });
    }

    return () => {
      // Clean up when the component unmounts or dependencies change
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      
      if (retryTimerRef.current) {
        clearTimeout(retryTimerRef.current);
      }
    };
  }, [url, fetchOnMount, fetchData, fetchOptions, ...dependencies]);

  // Effect to track component mount status
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  return {
    ...state,
    refetch,
    cancel,
    reset
  };
}
```

## CSS Styling

*This pattern doesn't directly involve CSS, as it's focused on data fetching logic.*

## Usage Example

### Basic Fetch on Mount

```tsx
import React from 'react';
import { useFetch } from './hooks/useFetch';
import { User } from './types';

interface UserProfileProps {
  userId: string;
}

export function UserProfile({ userId }: UserProfileProps) {
  const {
    data: user,
    isLoading,
    isError,
    error
  } = useFetch<User>(`/api/users/${userId}`);

  if (isLoading) {
    return <div>Loading user data...</div>;
  }

  if (isError) {
    return <div>Error loading user: {error?.message}</div>;
  }

  return (
    <div className="user-profile">
      <h2>{user?.name}</h2>
      <p>Email: {user?.email}</p>
      <p>Role: {user?.role}</p>
    </div>
  );
}
```

### Fetch with Manual Trigger

```tsx
import React, { useState } from 'react';
import { useFetch } from './hooks/useFetch';
import { SearchResult } from './types';

export function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const {
    data: results,
    isLoading,
    isError,
    refetch
  } = useFetch<SearchResult[]>('/api/search', {
    fetchOnMount: false,
    fetchOptions: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  });

  const handleSearch = async () => {
    if (!searchTerm) return;
    
    try {
      await refetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query: searchTerm })
      });
    } catch (err) {
      console.error('Search failed:', err);
    }
  };

  return (
    <div className="search-container">
      <div className="search-form">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
        />
        <button onClick={handleSearch} disabled={isLoading}>
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </div>
      
      {isError && <div className="error">Search failed. Please try again.</div>}
      
      {results && (
        <div className="results">
          {results.length === 0 ? (
            <p>No results found</p>
          ) : (
            <ul>
              {results.map((result) => (
                <li key={result.id}>{result.title}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
```

### Fetch with Polling

```tsx
import React, { useState } from 'react';
import { useFetch } from './hooks/useFetch';
import { Message } from './types';

export function LiveChat({ chatId }: { chatId: string }) {
  const [pollingInterval, setPollingInterval] = useState(3000);
  
  const {
    data: messages,
    isLoading,
    isError,
    refetch
  } = useFetch<Message[]>(`/api/chats/${chatId}/messages`, {
    onSuccess: () => {
      // Schedule next poll
      setTimeout(() => {
        if (document.visibilityState !== 'hidden') {
          refetch();
        }
      }, pollingInterval);
    }
  });

  // Adjust polling frequency based on user activity
  const handleUserActivity = () => {
    setPollingInterval(3000); // More frequent polling when active
  };

  // Reduce polling frequency when user is inactive
  const handleUserInactivity = () => {
    setPollingInterval(10000); // Less frequent polling when inactive
  };

  if (isLoading && !messages) {
    return <div>Loading chat history...</div>;
  }

  if (isError) {
    return (
      <div>
        <p>Error loading messages. <button onClick={() => refetch()}>Retry</button></p>
      </div>
    );
  }

  return (
    <div 
      className="chat-container"
      onMouseMove={handleUserActivity}
      onKeyDown={handleUserActivity}
      onBlur={handleUserInactivity}
    >
      <div className="message-list">
        {messages?.map((message) => (
          <div key={message.id} className="message">
            <div className="message-sender">{message.sender}</div>
            <div className="message-content">{message.content}</div>
            <div className="message-time">{new Date(message.timestamp).toLocaleTimeString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### Fetch with Caching

```tsx
import React from 'react';
import { useFetch } from './hooks/useFetch';
import { Product } from './types';

export function ProductCatalog() {
  const {
    data: products,
    isLoading,
    isError,
    isFetching,
    refetch
  } = useFetch<Product[]>('/api/products', {
    cache: true,
    cacheTime: 5 * 60 * 1000, // Cache for 5 minutes
    onError: (err) => {
      console.error('Failed to fetch products:', err);
    }
  });

  return (
    <div className="product-catalog">
      <div className="catalog-header">
        <h1>Products</h1>
        <button 
          onClick={() => refetch()} 
          disabled={isLoading && !products}
        >
          {isFetching ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>
      
      {isLoading && !products && <div className="loading">Loading products...</div>}
      
      {isError && (
        <div className="error">
          Failed to load products. Please try again.
        </div>
      )}
      
      {isFetching && products && <div className="refreshing-indicator">Updating...</div>}
      
      <div className="product-grid">
        {products?.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.imageUrl} alt={product.name} />
            <h3>{product.name}</h3>
            <p className="price">${product.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

## Accessibility Considerations

Although this pattern doesn't directly involve UI elements, there are still accessibility considerations for data fetching:

1. **Loading States**
   - Clearly communicate loading states to all users
   - Consider using ARIA live regions for announcing dynamic content updates
   - Maintain focus appropriately during loading and after content changes

2. **Error Handling**
   - Make error messages descriptive and helpful
   - Ensure error states are perceivable to screen reader users
   - Provide clear recovery options

3. **Content Updates**
   - Use aria-live regions for announcing dynamic content changes
   - Consider using aria-busy for elements being updated
   - Maintain focus when content changes significantly

4. **Performance Impact**
   - Consider the impact of data fetching on the overall performance
   - Implement strategies like pagination for large data sets
   - Balance between keeping data fresh and unnecessary refetches

## Best Practices

1. **Error Handling**
   - Always handle and communicate errors
   - Provide recovery mechanisms like retry buttons
   - Log errors for debugging
   - Consider different types of errors (network, validation, authorization)

2. **Loading States**
   - Differentiate between initial loading and refreshing
   - Use skeleton screens for better user experience
   - Avoid layout shifts when loading completes

3. **Request Management**
   - Always cancel requests when components unmount
   - Handle race conditions properly
   - Consider the impact of rapid dependency changes

4. **Caching**
   - Implement appropriate caching strategies
   - Consider cache invalidation approaches
   - Balance between fresh data and redundant requests
   - Use stale-while-revalidate patterns when appropriate

5. **Dependencies**
   - Carefully manage fetch dependencies
   - Avoid unnecessary refetching
   - Consider debouncing or throttling for rapidly changing dependencies

6. **Pagination and Infinite Scroll**
   - Implement proper pagination for large data sets
   - Consider cursor-based pagination for consistency
   - Handle "load more" functionality efficiently
   - Keep track of scroll position after item selection

## Common Pitfalls

1. **Memory Leaks**
   - Not cancelling requests on unmount
   - Updating state after component unmounts
   - Memory leaks in subscription-based data fetching

2. **Race Conditions**
   - Not handling out-of-order responses
   - State updates from stale requests
   - Multiple concurrent requests for the same resource

3. **Error Handling Issues**
   - Ignoring error states
   - Unclear error messages
   - No recovery options for users
   - Not distinguishing between different error types

4. **Performance Problems**
   - Over-fetching data
   - Too frequent refetching
   - Not implementing pagination for large data sets
   - Not caching repeated requests

5. **State Management Complexity**
   - Confusing loading states (initial vs. refresh)
   - Not tracking all relevant states
   - Redundant state management across components
   - Not sharing fetch results between components when appropriate

## Related Patterns

- **Async State Management Pattern**: General approach for managing asynchronous state
- **Pagination Hook Pattern**: Specialized pattern for paginated data
- **Infinite Scroll Pattern**: Pattern for implementing continuous scrolling data loading
- **Cache Management Pattern**: Approaches for caching data across the application
- **Optimistic Updates Pattern**: Updating UI before server confirmation for better UX
- **Error Boundary Pattern**: React pattern for handling errors gracefully
- **Suspense Pattern**: React's built-in pattern for handling async data loading

## References

- [React Query Documentation](https://tanstack.com/query/latest)
- [SWR Documentation](https://swr.vercel.app/)
- [MDN Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [React Hooks Documentation](https://reactjs.org/docs/hooks-intro.html)
- [Web Accessibility Initiative - ARIA Live Regions](https://www.w3.org/WAI/ARIA/apg/patterns/live-region-alert/)
- [AbortController API](https://developer.mozilla.org/en-US/docs/Web/API/AbortController)
- [Kent C. Dodds - Remix Fetching](https://kentcdodds.com/blog/using-fetch-with-type-script) 