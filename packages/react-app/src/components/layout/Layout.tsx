import { FC, ReactNode } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

/**
 * @pattern LayoutComponent
 * @rule EfficientRendering
 * Main layout component with optimized structure
 */
interface LayoutProps {
  children: ReactNode;
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-base-100">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
}; 