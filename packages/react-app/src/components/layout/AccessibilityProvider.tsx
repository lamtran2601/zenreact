/**
 * @pattern AccessibilityProvider
 * @rule GlobalA11yProvision
 * Provider component for global accessibility enhancements
 */

import React, { useState, useEffect, useCallback, ReactNode } from 'react';

interface AccessibilityProviderProps {
  children: ReactNode;
}

/**
 * @pattern AccessibilityProvider
 * @rule GlobalA11yProvision
 * Provides global accessibility features and preferences
 */
export const AccessibilityProvider: React.FC<AccessibilityProviderProps> = ({ children }) => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'x-large'>('normal');
  const [announcement, setAnnouncement] = useState('');
  const [announcementPriority, setAnnouncementPriority] = useState<'polite' | 'assertive'>('polite');

  /**
   * @pattern MediaQueryEffect
   * @rule PreferenceDetection
   * Detect user's motion preference
   */
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  /**
   * @pattern LiveRegionAnnouncement
   * @rule DynamicAnnouncements
   * Manage announcements for screen readers
   */
  const announceLiveRegion = useCallback((message: string, priority: 'polite' | 'assertive' = 'polite') => {
    setAnnouncement(message);
    setAnnouncementPriority(priority);
    
    // Clear announcement after 3 seconds
    setTimeout(() => {
      setAnnouncement('');
    }, 3000);
  }, []);

  /**
   * @pattern ClassEffect
   * @rule GlobalPreferences
   * Apply global accessibility preferences through CSS classes
   */
  useEffect(() => {
    // Toggle high contrast mode
    if (highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
    
    // Remove all font size classes first
    document.documentElement.classList.remove('font-normal', 'font-large', 'font-x-large');
    
    // Add appropriate font size class
    switch (fontSize) {
      case 'large':
        document.documentElement.classList.add('font-large');
        break;
      case 'x-large':
        document.documentElement.classList.add('font-x-large');
        break;
      default:
        document.documentElement.classList.add('font-normal');
    }
  }, [highContrast, fontSize]);

  /**
   * @pattern AccessibilityControls
   * @rule UserPreferenceControls
   * Render accessibility controls for user preferences
   */
  const renderAccessibilityControls = () => (
    <div className="accessibility-controls">
      <button
        onClick={() => setHighContrast(!highContrast)}
        className="a11y-button"
        aria-pressed={highContrast}
      >
        {highContrast ? 'Disable' : 'Enable'} High Contrast
      </button>
      
      <div className="font-size-controls">
        <span id="font-size-label">Font Size:</span>
        <div role="radiogroup" aria-labelledby="font-size-label">
          <button
            onClick={() => setFontSize('normal')}
            className="a11y-button"
            aria-pressed={fontSize === 'normal'}
            role="radio"
          >
            Normal
          </button>
          <button
            onClick={() => setFontSize('large')}
            className="a11y-button"
            aria-pressed={fontSize === 'large'}
            role="radio"
          >
            Large
          </button>
          <button
            onClick={() => setFontSize('x-large')}
            className="a11y-button"
            aria-pressed={fontSize === 'x-large'}
            role="radio"
          >
            Extra Large
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <a
        className="skip-to-content"
        href="#main-content"
        aria-label="Skip to main content"
      >
        Skip to content
      </a>
      
      {renderAccessibilityControls()}
      
      {children}
      
      <div 
        aria-live={announcementPriority} 
        aria-atomic="true" 
        className="sr-only"
      >
        {announcement}
      </div>
    </>
  );
};

/**
 * @pattern AccessibilityHook
 * @rule A11yAnnouncement
 * Hook for announcing messages to screen readers
 */
export const useAnnounce = () => {
  // This is a placeholder for the actual implementation
  // In a real application, this would communicate with the AccessibilityProvider
  return (message: string, priority: 'polite' | 'assertive' = 'polite') => {
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', priority);
    announcer.setAttribute('aria-atomic', 'true');
    announcer.classList.add('sr-only');
    announcer.textContent = message;
    
    document.body.appendChild(announcer);
    
    setTimeout(() => {
      document.body.removeChild(announcer);
    }, 3000);
  };
}; 