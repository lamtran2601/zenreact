# Data Display Card Pattern

## Overview

The Data Display Card pattern provides a consistent way to present content items with related information and actions in a contained, visually distinct element. This pattern is commonly used for product listings, user profiles, content previews, and any situation where multiple similar items need to be displayed in a grid or list.

## Use Cases

- Product cards in e-commerce applications
- User profile cards in social applications
- Content preview cards in media applications
- Feature highlight cards in marketing sections
- Dashboard summary cards in analytics applications

## Structure

### Core Elements

1. **Container**: The outer wrapper that provides visual boundaries and spacing
2. **Media**: Visual representation (image, icon, or illustration)
3. **Primary Content**: The main information (title, name)
4. **Secondary Content**: Supporting information (description, metadata)
5. **Actions**: Interactive elements (buttons, links)

### Visual Hierarchy

- The media element typically appears at the top or left
- Primary content is prominent and immediately follows the media
- Secondary content is styled with less visual weight
- Actions are typically positioned at the bottom or right

## TypeScript Interface

```typescript
interface DataDisplayCardProps<T> {
  /**
   * The data object to display in the card
   */
  item: T;
  
  /**
   * Optional custom renderer for the media section
   */
  renderMedia?: (item: T) => React.ReactNode;
  
  /**
   * Optional custom renderer for the primary content
   */
  renderPrimary?: (item: T) => React.ReactNode;
  
  /**
   * Optional custom renderer for the secondary content
   */
  renderSecondary?: (item: T) => React.ReactNode;
  
  /**
   * Optional custom renderer for the actions section
   */
  renderActions?: (item: T) => React.ReactNode;
  
  /**
   * Optional CSS class name for custom styling
   */
  className?: string;
  
  /**
   * Optional click handler for the entire card
   */
  onClick?: (item: T) => void;
  
  /**
   * Whether the card is currently in a loading state
   */
  isLoading?: boolean;
  
  /**
   * Whether the card is currently in a selected state
   */
  isSelected?: boolean;
  
  /**
   * Additional props to be spread to the container element
   */
  [key: string]: any;
}
```

## Implementation Example

### Basic Implementation

```tsx
import React from 'react';
import './DataDisplayCard.css';

interface DataDisplayCardProps<T> {
  item: T;
  renderMedia?: (item: T) => React.ReactNode;
  renderPrimary?: (item: T) => React.ReactNode;
  renderSecondary?: (item: T) => React.ReactNode;
  renderActions?: (item: T) => React.ReactNode;
  className?: string;
  onClick?: (item: T) => void;
  isLoading?: boolean;
  isSelected?: boolean;
}

export function DataDisplayCard<T>({
  item,
  renderMedia,
  renderPrimary,
  renderSecondary,
  renderActions,
  className = '',
  onClick,
  isLoading = false,
  isSelected = false,
  ...restProps
}: DataDisplayCardProps<T>): React.ReactElement {
  // Default renderers if custom ones are not provided
  const defaultRenderMedia = () => null;
  const defaultRenderPrimary = () => <div className="card-primary">No primary content</div>;
  const defaultRenderSecondary = () => null;
  const defaultRenderActions = () => null;

  // Use provided renderers or fall back to defaults
  const mediaContent = renderMedia ? renderMedia(item) : defaultRenderMedia();
  const primaryContent = renderPrimary ? renderPrimary(item) : defaultRenderPrimary();
  const secondaryContent = renderSecondary ? renderSecondary(item) : defaultRenderSecondary();
  const actionsContent = renderActions ? renderActions(item) : defaultRenderActions();

  // Combine class names
  const cardClassName = `data-display-card ${className} ${isLoading ? 'is-loading' : ''} ${isSelected ? 'is-selected' : ''}`;

  return (
    <div 
      className={cardClassName} 
      onClick={onClick ? () => onClick(item) : undefined}
      {...restProps}
    >
      {isLoading ? (
        <div className="card-loading-indicator">Loading...</div>
      ) : (
        <>
          {mediaContent && <div className="card-media">{mediaContent}</div>}
          <div className="card-content">
            <div className="card-primary">{primaryContent}</div>
            {secondaryContent && <div className="card-secondary">{secondaryContent}</div>}
          </div>
          {actionsContent && <div className="card-actions">{actionsContent}</div>}
        </>
      )}
    </div>
  );
}
```

### CSS Styling

```css
.data-display-card {
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  overflow: hidden;
  background-color: #ffffff;
  transition: box-shadow 0.2s ease-in-out, transform 0.2s ease-in-out;
  height: 100%;
}

.data-display-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.data-display-card.is-selected {
  border-color: #4a90e2;
  box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
}

.card-media {
  width: 100%;
  position: relative;
}

.card-media img {
  width: 100%;
  height: auto;
  display: block;
}

.card-content {
  padding: 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.card-primary {
  font-weight: 600;
  font-size: 1rem;
  color: #333333;
}

.card-secondary {
  font-size: 0.875rem;
  color: #666666;
  line-height: 1.4;
}

.card-actions {
  padding: 8px 16px 16px;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

.card-loading-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  color: #999999;
}

.is-loading {
  opacity: 0.7;
  pointer-events: none;
}
```

## Usage Example

### Product Card Example

```tsx
import React from 'react';
import { DataDisplayCard } from './DataDisplayCard';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  inStock: boolean;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const renderMedia = (item: Product) => (
    <img 
      src={item.imageUrl} 
      alt={item.name} 
      style={{ aspectRatio: '16/9', objectFit: 'cover' }}
    />
  );

  const renderPrimary = (item: Product) => (
    <div className="product-header">
      <h3>{item.name}</h3>
      <span className="product-price">${item.price.toFixed(2)}</span>
    </div>
  );

  const renderSecondary = (item: Product) => (
    <>
      <p className="product-description">{item.description}</p>
      <div className="product-status">
        {item.inStock ? (
          <span className="in-stock">In Stock</span>
        ) : (
          <span className="out-of-stock">Out of Stock</span>
        )}
      </div>
    </>
  );

  const renderActions = (item: Product) => (
    <button 
      className="add-to-cart-button" 
      onClick={(e) => {
        e.stopPropagation();
        onAddToCart(item);
      }}
      disabled={!item.inStock}
    >
      Add to Cart
    </button>
  );

  return (
    <DataDisplayCard<Product>
      item={product}
      renderMedia={renderMedia}
      renderPrimary={renderPrimary}
      renderSecondary={renderSecondary}
      renderActions={renderActions}
      onClick={() => console.log(`Product clicked: ${product.name}`)}
      className="product-card"
    />
  );
};
```

## Accessibility Considerations

1. **Keyboard Navigation**
   - Ensure card actions are keyboard accessible
   - Use proper focus management for interactive elements

2. **Screen Readers**
   - Use appropriate ARIA attributes
   - Ensure proper heading hierarchy
   - Provide alt text for images

3. **Visual Design**
   - Maintain sufficient color contrast
   - Don't rely on color alone to convey information
   - Ensure text is readable at various sizes

## Best Practices

1. **Keep Content Concise**
   - Limit text to essential information
   - Use truncation for long content
   - Maintain consistent card heights when possible

2. **Responsive Design**
   - Adjust layout for different screen sizes
   - Consider stacking elements vertically on smaller screens
   - Use appropriate image sizing and loading strategies

3. **Consistent Styling**
   - Maintain consistent spacing and alignment
   - Use a clear visual hierarchy
   - Apply consistent interaction patterns across all cards

4. **Performance**
   - Optimize images for performance
   - Consider lazy loading for cards not in the viewport
   - Use virtualization for long lists of cards

## Common Pitfalls

1. **Overcrowding**
   - Adding too much information to a single card
   - Not providing enough spacing between elements

2. **Inconsistent Heights**
   - Variable content lengths causing misalignment
   - Different action configurations causing jagged layouts

3. **Poor Affordance**
   - Unclear which elements are interactive
   - Inconsistent click targets

4. **Accessibility Issues**
   - Missing alt text for images
   - Poor keyboard navigation
   - Insufficient color contrast

## Related Patterns

- **List Pattern**: Similar to cards but often with a simpler, more condensed layout
- **Grid Layout Pattern**: Used to organize multiple cards in a grid
- **Skeleton Loading Pattern**: Used to show loading state for cards
- **Pagination Pattern**: Used when displaying many cards across multiple pages

## References

- [Material Design: Cards](https://material.io/components/cards)
- [Inclusive Components: Card](https://inclusive-components.design/cards/)
- [Atomic Design: Molecules and Organisms](https://atomicdesign.bradfrost.com/chapter-2/) 