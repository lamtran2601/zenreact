/**
 * Main App Component
 * 
 * @guide Decision Frameworks: .ai-assistant/guides/DECISION_FRAMEWORKS.md
 * @guide Self-Review: .ai-assistant/guides/SELF_REVIEW_CHECKLISTS.md
 * @guide Testing: .ai-assistant/guides/AUTOMATED_TESTING_GUIDE.md
 */
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from './components/layout/Header';
import TicketList from './components/tickets/TicketList';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <main className="container mx-auto py-8 px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2">Football Tickets</h1>
            <p className="text-gray-600">Find and purchase tickets for upcoming football matches</p>
          </div>
          
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Available Tickets</h2>
              <TicketList />
            </div>
          </div>
        </main>
        
        <footer className="footer p-10 bg-neutral text-neutral-content mt-10">
          <div>
            <span className="footer-title">Services</span> 
            <a className="link link-hover">Branding</a>
            <a className="link link-hover">Design</a>
            <a className="link link-hover">Marketing</a>
            <a className="link link-hover">Advertisement</a>
          </div> 
          <div>
            <span className="footer-title">Company</span> 
            <a className="link link-hover">About us</a>
            <a className="link link-hover">Contact</a>
            <a className="link link-hover">Jobs</a>
            <a className="link link-hover">Press kit</a>
          </div> 
          <div>
            <span className="footer-title">Legal</span> 
            <a className="link link-hover">Terms of use</a>
            <a className="link link-hover">Privacy policy</a>
            <a className="link link-hover">Cookie policy</a>
          </div>
        </footer>
      </div>
    </QueryClientProvider>
  );
}

export default App;
