import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import MainLayout from './components/layout/MainLayout';
import TaskPage from './features/tasks/TaskPage';
import DashboardPage from './features/dashboard/DashboardPage';
import ProfilePage from './features/profile/ProfilePage';
import SettingsPage from './features/settings/SettingsPage';

const NotFound = () => (
  <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
    <h1 className="text-6xl font-bold text-error">404</h1>
    <p className="text-2xl mt-4 mb-8">Page Not Found</p>
    <a href="/" className="btn btn-primary">Return to Dashboard</a>
  </div>
);

function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={
          <MainLayout>
            <DashboardPage />
          </MainLayout>
        } />
        <Route path="/tasks" element={
          <MainLayout>
            <TaskPage />
          </MainLayout>
        } />
        <Route path="/profile" element={
          <MainLayout>
            <ProfilePage />
          </MainLayout>
        } />
        <Route path="/settings" element={
          <MainLayout>
            <SettingsPage />
          </MainLayout>
        } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App; 