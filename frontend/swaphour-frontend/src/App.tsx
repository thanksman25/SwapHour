import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css';

// Layout
import AppLayout from './components/layout/AppLayout';

// Pages — FE-2 scope
import Dashboard     from './pages/Dashboard';
import SkillCatalog  from './pages/SkillCatalog';
import SkillDetail   from './pages/SkillDetail';
import Swaps         from './pages/Swaps';
import Notifications from './pages/Notifications';
import Wallet        from './pages/Wallet';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* Semua route FE-2 di bawah AppLayout */}
          <Route element={<AppLayout />}>
            <Route path="/"              element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard"     element={<Dashboard />} />
            <Route path="/skills"        element={<SkillCatalog />} />
            <Route path="/skills/:id"    element={<SkillDetail />} />
            <Route path="/swaps"         element={<Swaps />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/wallet"        element={<Wallet />} />
            <Route path="*"              element={<Navigate to="/dashboard" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
