# React Hook Template

This template provides the standard structure for creating custom React hooks in the ZenReact framework. Follow this pattern to ensure consistency across the codebase.

## Hook Structure

Every custom hook should follow this file structure and organization:

```typescript
// 1. Imports
import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next'; // If needed

// 2. Import related hooks/utilities
import { useApiClient } from '@/hooks/useApiClient';
import { debounce } from '@/utils/performance';

// 3. Type definitions
interface UseFeatureOptions {
  /** Description of the option */
  initialValue?: string;
  /** Description of the flag */
  enableCache?: boolean;
  /** Description of the timeout */
  debounceMs?: number;
}

interface FeatureState {
  data: any[] | null;
  isLoading: boolean;
  error: Error | null;
}

// 4. Hook definition
export function useFeature({
  initialValue = '',
  enableCache = true,
  debounceMs = 300
}: UseFeatureOptions = {}) {
  // 5. State declarations
  const [state, setState] = useState<FeatureState>({
    data: null,
    isLoading: false,
    error: null
  });
  
  // 6. Refs (for values that shouldn't trigger re-renders)
  const cacheRef = useRef<Map<string, any>>(new Map());
  const isMountedRef = useRef<boolean>(true);
  
  // 7. Context/other hooks
  const { t } = useTranslation();
  const apiClient = useApiClient();
  
  // 8. Memoized values
  const normalizedValue = useMemo(() => {
    return initialValue.trim().toLowerCase();
  }, [initialValue]);
  
  // 9. Effect cleanup pattern
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);
  
  // 10. Core functionality effect
  useEffect(() => {
    if (!normalizedValue) {
      return;
    }
    
    const fetchData = async () => {
      // Only update state if component is still mounted
      if (!isMountedRef.current) return;
      
      // Check cache first
      if (enableCache && cacheRef.current.has(normalizedValue)) {
        setState({
          data: cacheRef.current.get(normalizedValue),
          isLoading: false,
          error: null
        });
        return;
      }
      
      try {
        setState(prev => ({ ...prev, isLoading: true }));
        
        const response = await apiClient.get(`/endpoint/${normalizedValue}`);
        
        // Only update state if component is still mounted
        if (!isMountedRef.current) return;
        
        // Save to cache
        if (enableCache) {
          cacheRef.current.set(normalizedValue, response.data);
        }
        
        setState({
          data: response.data,
          isLoading: false,
          error: null
        });
      } catch (error) {
        // Only update state if component is still mounted
        if (!isMountedRef.current) return;
        
        setState({
          data: null,
          isLoading: false,
          error: error instanceof Error ? error : new Error(t('common.unknownError'))
        });
      }
    };
    
    // 11. Debounce pattern (if needed)
    const debouncedFetch = debounce(fetchData, debounceMs);
    debouncedFetch();
    
    // Cleanup debounce on dependency changes
    return () => {
      debouncedFetch.cancel();
    };
  }, [normalizedValue, apiClient, enableCache, debounceMs, t]);
  
  // 12. Callback functions
  const refresh = useCallback(async () => {
    // Implement refresh logic
    if (!normalizedValue) return;
    
    try {
      setState(prev => ({ ...prev, isLoading: true }));
      
      const response = await apiClient.get(`/endpoint/${normalizedValue}`, {
        headers: { 'Cache-Control': 'no-cache' }
      });
      
      // Only update state if component is still mounted
      if (!isMountedRef.current) return;
      
      // Update cache
      if (enableCache) {
        cacheRef.current.set(normalizedValue, response.data);
      }
      
      setState({
        data: response.data,
        isLoading: false,
        error: null
      });
    } catch (error) {
      // Only update state if component is still mounted
      if (!isMountedRef.current) return;
      
      setState({
        data: null,
        isLoading: false,
        error: error instanceof Error ? error : new Error(t('common.unknownError'))
      });
    }
  }, [normalizedValue, apiClient, enableCache, t]);
  
  const clearCache = useCallback(() => {
    cacheRef.current.clear();
  }, []);
  
  // 13. Return object (with consistent properties)
  return {
    // State
    data: state.data,
    isLoading: state.isLoading,
    error: state.error,
    
    // Derived state
    isEmpty: !state.data || state.data.length === 0,
    isError: state.error !== null,
    
    // Actions
    refresh,
    clearCache
  };
}

// 14. Default export (optional)
export default useFeature; 