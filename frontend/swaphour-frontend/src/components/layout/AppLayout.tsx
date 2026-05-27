import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import './AppLayout.css';

// NOTE: Auth guard dinonaktifkan sementara untuk development FE-2.
// Akan diaktifkan kembali setelah merge dengan branch FE-1.
export default function AppLayout() {
  return (
    <div className="app-layout">
      <Navbar />
      <main className="app-layout__main">
        <div className="container page-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
