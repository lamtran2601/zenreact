# Layout Components Context

This document outlines the layout components used throughout the ZenTask application. These components provide consistent structural elements that define the application's visual hierarchy and organization.

## MainLayout Component

### Purpose
Serves as the main layout wrapper for authenticated pages, including the header, sidebar, and main content area.

### Usage
```tsx
<MainLayout>
  <Dashboard />
</MainLayout>
```

### Props
```typescript
interface MainLayoutProps {
  /** Page content */
  children: React.ReactNode;
  /** Whether to show the sidebar */
  showSidebar?: boolean;
}
```

### Implementation Notes
- Responsive layout that adapts to all screen sizes
- Handles sidebar toggle functionality
- Maintains consistent spacing
- Provides sticky header and scrollable main content

## AuthLayout Component

### Purpose
Serves as the layout wrapper for authentication pages (login, register, etc.).

### Usage
```tsx
<AuthLayout>
  <LoginForm />
</AuthLayout>
```

### Props
```typescript
interface AuthLayoutProps {
  /** Page content */
  children: React.ReactNode;
  /** Optional page title */
  title?: string;
  /** Optional description text */
  description?: string;
}
```

### Implementation Notes
- Centered card layout for authentication forms
- Includes ZenTask branding
- Background styling with decorative elements
- Ensures proper form width and mobile responsiveness

## Header Component

### Purpose
Top navigation bar that appears on all authenticated pages.

### Usage
```tsx
<Header />
```

### Props
```typescript
interface HeaderProps {
  /** Whether to show the sidebar toggle */
  showSidebarToggle?: boolean;
}
```

### Subcomponents
- Logo: Application branding
- MainNav: Main navigation links
- SearchBar: Global search functionality
- UserMenu: User profile and settings dropdown

### Implementation Notes
- Sticky positioning at the top
- Contains branding, navigation, search, and user menu
- Responsive design that adapts to screen size
- Accessible navigation with proper ARIA roles

## Sidebar Component

### Purpose
Side navigation that provides access to major application sections.

### Usage
```tsx
<Sidebar isCollapsed={isCollapsed} onToggle={handleToggle} />
```

### Props
```typescript
interface SidebarProps {
  /** Whether the sidebar is collapsed */
  isCollapsed?: boolean;
  /** Callback when sidebar is toggled */
  onToggle?: () => void;
}
```

### Subcomponents
- SidebarSection: Grouping of related navigation items
- SidebarItem: Individual navigation link
- CategoryList: List of user's task categories
- FilterList: Quick access to common filters

### Implementation Notes
- Collapsible design with animation
- Supports both expanded and collapsed states
- Contains navigation links and quick filters
- Sticky positioning with scrollable sections if needed

## Container Component

### Purpose
Content container with consistent max-width and padding.

### Usage
```tsx
<Container>
  <Content />
</Container>
```

### Props
```typescript
interface ContainerProps {
  /** Container content */
  children: React.ReactNode;
  /** Container size variant */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  /** Additional class names */
  className?: string;
}
```

### Implementation Notes
- Centers content with appropriate max-width
- Consistent horizontal padding
- Different size options for various content types
- Responsive padding adjustments

## PageHeader Component

### Purpose
Consistent header for page content with title, description, and actions.

### Usage
```tsx
<PageHeader
  title="Tasks"
  description="Manage your tasks"
  actions={<Button>New Task</Button>}
/>
```

### Props
```typescript
interface PageHeaderProps {
  /** Page title */
  title: string;
  /** Optional page description */
  description?: string;
  /** Optional action buttons */
  actions?: React.ReactNode;
  /** Optional breadcrumbs */
  breadcrumbs?: Array<{ label: string; href: string }>;
}
```

### Implementation Notes
- Consistent spacing and typography
- Support for page title and optional description
- Action buttons positioned consistently
- Optional breadcrumb navigation

## Divider Component

### Purpose
Visual separator for content sections.

### Usage
```tsx
<Divider />
<Divider label="Section Title" />
```

### Props
```typescript
interface DividerProps {
  /** Optional label for the divider */
  label?: string;
  /** Divider orientation */
  orientation?: 'horizontal' | 'vertical';
  /** Additional class names */
  className?: string;
}
```

### Implementation Notes
- Horizontal or vertical orientation options
- Optional labeled divider with centered text
- Consistent margin/padding

## Grid Component

### Purpose
Grid layout system for organizing content in rows and columns.

### Usage
```tsx
<Grid cols={2} gap={4}>
  <GridItem>Content 1</GridItem>
  <GridItem>Content 2</GridItem>
</Grid>
```

### Props
```typescript
interface GridProps {
  /** Grid content */
  children: React.ReactNode;
  /** Number of columns (default responsive behavior) */
  cols?: number | { sm?: number; md?: number; lg?: number; xl?: number };
  /** Gap between grid items */
  gap?: 1 | 2 | 3 | 4 | 6 | 8;
  /** Additional class names */
  className?: string;
}

interface GridItemProps {
  /** Grid item content */
  children: React.ReactNode;
  /** Column span */
  colSpan?: number | { sm?: number; md?: number; lg?: number; xl?: number };
  /** Additional class names */
  className?: string;
}
```

### Implementation Notes
- Uses CSS Grid for layout
- Responsive column configurations
- Consistent gap spacing options
- Support for items spanning multiple columns

## Stack Component

### Purpose
Vertical or horizontal stack layout with consistent spacing.

### Usage
```tsx
<Stack spacing={4}>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Stack>
```

### Props
```typescript
interface StackProps {
  /** Stack content */
  children: React.ReactNode;
  /** Stack direction */
  direction?: 'vertical' | 'horizontal';
  /** Spacing between items */
  spacing?: 1 | 2 | 3 | 4 | 6 | 8;
  /** Alignment of items */
  align?: 'start' | 'center' | 'end' | 'stretch';
  /** Justification of items */
  justify?: 'start' | 'center' | 'end' | 'between' | 'around';
  /** Whether to add dividers between items */
  dividers?: boolean;
  /** Additional class names */
  className?: string;
}
```

### Implementation Notes
- Implements consistent spacing between child elements
- Vertical (column) or horizontal (row) direction
- Flexible alignment and justification options
- Optional dividers between items

## Layout Patterns

### Page Layout Pattern
All main pages follow this pattern:
```tsx
<MainLayout>
  <PageHeader title="Page Title" actions={<Actions />} />
  <Container>
    {/* Main content */}
  </Container>
</MainLayout>
```

### Content Section Pattern
Content sections within pages:
```tsx
<section>
  <SectionHeader title="Section Title" />
  <Card>
    {/* Section content */}
  </Card>
</section>
```

### Form Layout Pattern
Form layouts follow this pattern:
```tsx
<form>
  <Stack spacing={4}>
    <Input label="Field 1" />
    <Input label="Field 2" />
    <div className="flex justify-end gap-2">
      <Button variant="outline">Cancel</Button>
      <Button variant="primary" type="submit">Submit</Button>
    </div>
  </Stack>
</form>
```

### Responsive Design Strategy
- Components use responsive Tailwind classes
- Mobile-first approach with progressive enhancement
- Sidebar collapses on small screens
- Grid layouts adjust columns at different breakpoints
- Typography scales appropriately for readability 