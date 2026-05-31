import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Layout FE-2
import AppLayout from "./components/layout/AppLayout";

// Pages FE-1 (kamu)
import LandingPage from "./pages/LandingPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import EditProfilePage from "./pages/EditProfilePage";

// Pages FE-2 (teman)
import Dashboard from "./pages/Dashboard";
import SkillCatalog from "./pages/SkillCatalog";
import SkillDetail from "./pages/SkillDetail";
import Swaps from "./pages/Swaps";
import Notifications from "./pages/Notifications";
import Wallet from "./pages/Wallet";
import AddSkillPage from "./pages/AddSkillPage";
import SettingsPage from "./pages/SettingsPage";
import FAQPage from "./pages/FAQPage";

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
          {/* Routes FE-1 — Auth & Onboarding */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile/edit" element={<EditProfilePage />} />
          <Route path="/skills/new" element={<AddSkillPage />} />

          {/* Routes FE-2 — Dashboard & Fitur */}
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/skills" element={<SkillCatalog />} />
            <Route path="/skills/:id" element={<SkillDetail />} />
            <Route path="/swaps" element={<Swaps />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
