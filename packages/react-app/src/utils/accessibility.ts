/**
 * @pattern AccessibilityUtils
 * @rule A11yPatterns
 * Utilities for enhancing accessibility across components
 */

import { KeyboardEvent } from 'react';

/**
 * @pattern KeyboardHandler
 * @rule ConsistentKeyboardInteraction
 * Handles keyboard events for interactive elements
 */
export const handleKeyboardAction = (
  e: KeyboardEvent<HTMLElement>,
  action: () => void,
  keys: string[] = ['Enter', ' ']
) => {
  if (keys.includes(e.key)) {
    e.preventDefault();
    action();
  }
};

/**
 * @pattern FocusTrapping
 * @rule ModalFocus
 * Traps focus within a modal or dialog
 */
export const createFocusTrap = (containerRef: React.RefObject<HTMLElement>) => {
  let focusableElements: HTMLElement[] = [];
  
  const initialize = () => {
    if (!containerRef.current) return;
    
    focusableElements = Array.from(
      containerRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
    ) as HTMLElement[];
  };
  
  const trapFocus = (e: KeyboardEvent) => {
    if (!containerRef.current || focusableElements.length === 0) return;
    
    // If tab key is pressed
    if (e.key === 'Tab') {
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      
      // Shift + Tab
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } 
      // Tab
      else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    }
  };
  
  return {
    initialize,
    trapFocus,
  };
};

/**
 * @pattern SkipLink
 * @rule ContentSkipping
 * Creates a skip link for keyboard users to bypass navigation
 */
export const SkipToContent = () => {
  return {
    props: {
      className: "skip-to-content",
      href: "#main-content",
    },
    ariaLabel: "Skip to main content",
  };
};

/**
 * @pattern AriaProps
 * @rule ConsistentARIA
 * Generates consistent ARIA props for common component patterns
 */
export const ariaProps = {
  /**
   * Get ARIA props for a button that opens a dialog
   */
  dialogTrigger: (dialogId: string) => ({
    'aria-haspopup': 'dialog',
    'aria-expanded': 'false',
    'aria-controls': dialogId,
  }),
  
  /**
   * Get ARIA props for a dialog or modal
   */
  dialog: (titleId: string) => ({
    role: 'dialog',
    'aria-modal': 'true',
    'aria-labelledby': titleId,
  }),
  
  /**
   * Get ARIA props for a tab
   */
  tab: (selected: boolean, panelId: string) => ({
    role: 'tab',
    'aria-selected': selected.toString(),
    'aria-controls': panelId,
    tabIndex: selected ? 0 : -1,
  }),
  
  /**
   * Get ARIA props for a tab panel
   */
  tabPanel: (tabId: string) => ({
    role: 'tabpanel',
    'aria-labelledby': tabId,
  }),
  
  /**
   * Get ARIA props for a loading state
   */
  loading: () => ({
    'aria-busy': 'true',
    'aria-live': 'polite',
  }),
};

/**
 * @pattern A11yChecklist
 * @rule ImplementationValidation
 * Checklist for ensuring accessibility compliance in components
 */
export const a11yChecklist = {
  interactive: [
    'Has proper role attribute',
    'Has accessible name (aria-label, aria-labelledby, or visible text)',
    'Supports keyboard interaction',
    'Has appropriate focus styles',
    'Has appropriate hover/active styles',
  ],
  
  forms: [
    'All inputs have associated labels',
    'Error messages are associated with inputs',
    'Required fields are marked appropriately',
    'Form submissions provide feedback',
    'Form can be navigated and submitted via keyboard',
  ],
  
  media: [
    'Images have alt text',
    'Videos have captions',
    'Audio has transcripts',
    'Media can be paused/stopped',
    'Media controls are keyboard accessible',
  ],
  
  structure: [
    'Proper heading hierarchy',
    'Landmarks are used appropriately',
    'Consistent navigation structure',
    'Skip links provided for keyboard users',
    'Content is structured logically',
  ],
}; 