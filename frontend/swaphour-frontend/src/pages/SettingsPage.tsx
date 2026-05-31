import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useTheme, type Theme } from "../context/ThemeContext";
import "./SettingsPage.css";

export default function SettingsPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  
  // Theme context
  const { theme, setTheme } = useTheme();

  // Dummy states
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(true);
  
  useEffect(() => {
    if (!pageRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".settings-title, .settings-desc", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out"
      });
      
      gsap.from(".settings-section-wrapper", {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.2
      });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="settings-page" ref={pageRef}>
      <h1 className="settings-title">Pengaturan <span className="text-gold-gradient">Akun</span></h1>
      <p className="settings-desc text-muted">Kelola preferensi akun, notifikasi, dan keamanan kamu di sini.</p>
      
      <div className="settings-grid">
        <div className="settings-section-wrapper">
          <div className="settings-section card">
            <div className="settings-section-head">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{color: 'var(--green-400)'}}>
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
              </svg>
              <h2>Profil & Preferensi</h2>
            </div>
            <div className="settings-list">
              <div className="settings-item">
                <div className="settings-item-info">
                  <h3>Informasi Pribadi</h3>
                  <p>Nama, bio, dan foto profil.</p>
                </div>
                <Link to="/profile/edit" className="btn btn-outline btn-sm">Edit Profil</Link>
              </div>
              
              <div className="settings-item">
                <div className="settings-item-info">
                  <h3>Tema Tampilan</h3>
                  <p>Pilih mode terang, gelap, atau sesuaikan dengan sistem.</p>
                </div>
                <select 
                  value={theme}
                  onChange={(e) => setTheme(e.target.value as Theme)}
                  style={{
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--glass-bg)',
                    border: '1px solid var(--glass-border)',
                    color: 'var(--color-text)',
                    outline: 'none',
                    fontFamily: 'var(--font-body)',
                    cursor: 'pointer'
                  }}
                >
                  <option value="system">Default Sistem</option>
                  <option value="dark">Mode Gelap</option>
                  <option value="light">Mode Terang</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="settings-section-wrapper">
          <div className="settings-section card">
            <div className="settings-section-head">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{color: 'var(--gold-400)'}}>
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
              <h2>Notifikasi</h2>
            </div>
            <div className="settings-list">
              <div className="settings-item">
                <div className="settings-item-info">
                  <h3>Push Notification</h3>
                  <p>Dapatkan pemberitahuan langsung di browser.</p>
                </div>
                <label className="settings-switch">
                  <input type="checkbox" checked={pushNotif} onChange={(e) => setPushNotif(e.target.checked)} />
                  <span className="slider round"></span>
                </label>
              </div>
              
              <div className="settings-item">
                <div className="settings-item-info">
                  <h3>Email Notification</h3>
                  <p>Terima update harian tentang request masuk.</p>
                </div>
                <label className="settings-switch">
                  <input type="checkbox" checked={emailNotif} onChange={(e) => setEmailNotif(e.target.checked)} />
                  <span className="slider round"></span>
                </label>
              </div>
            </div>
          </div>
        </div>
        
        <div className="settings-section-wrapper">
          <div className="settings-section card">
            <div className="settings-section-head">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{color: '#f87171'}}>
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              <h2>Keamanan</h2>
            </div>
          <div className="settings-list">
            <div className="settings-item">
              <div className="settings-item-info">
                <h3>Ubah Password</h3>
                <p>Perbarui kata sandi untuk keamanan ekstra.</p>
              </div>
              <button className="btn btn-outline" style={{padding: '6px 14px', fontSize: '13px'}} onClick={() => alert('Fitur akan segera hadir!')}>Ubah</button>
            </div>
            
            <div className="settings-item">
              <div className="settings-item-info">
                <h3 style={{color: '#f87171'}}>Hapus Akun</h3>
                <p>Tindakan ini tidak bisa dibatalkan.</p>
              </div>
              <button className="btn btn-outline" style={{borderColor: 'rgba(248,113,113,0.3)', color: '#f87171', padding: '6px 14px', fontSize: '13px'}} onClick={() => alert('Fitur akan segera hadir!')}>Hapus</button>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
