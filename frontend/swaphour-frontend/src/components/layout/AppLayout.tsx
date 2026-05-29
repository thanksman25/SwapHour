import { Outlet, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import './AppLayout.css';

export default function AppLayout() {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="app-layout__right">
        <Header />
        <main className="app-layout__main">
          <div className="container page-content">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
