# SwapHour Frontend Documentation

Frontend SwapHour dibangun dengan **React**, **TypeScript**, dan **Vite**. Aplikasi ini mengusung desain **Glassmorphism** dengan perpaduan warna hijau (*Forest Green*) dan emas (*Gold*).

## Teknologi Utama
- **Framework**: React 18
- **Build Tool**: Vite
- **Bahasa**: TypeScript
- **Styling**: CSS murni dengan CSS Variables (Custom Properties)
- **Animasi**: GSAP (GreenSock Animation Platform)
- **Routing**: React Router DOM
- **Icons**: Phosphor Icons / SVG Kustom (Sistem adaptif tema)

## Struktur Direktori
- `src/assets/`: Berisi file gambar dan logo SVG adaptif (`swaphour_black.svg`, `swaphour_gold.svg`).
- `src/components/`: Komponen UI _reusable_.
  - `layout/`: `Sidebar`, `Header`, dan `AppLayout`.
  - `ui/`: Komponen kecil seperti `Logo`, `NotifBadge`.
- `src/context/`: State global seperti `ThemeContext` (Mengelola Mode Terang/Gelap/Sistem).
- `src/pages/`: Halaman utama (`Dashboard`, `Wallet`, `SettingsPage`, `Swaps`, dll).
- `src/styles/`: File CSS global seperti `landing.css`.
- `src/index.css`: File utama yang mengatur variabel tema dan reset CSS.

## Sistem Tema (Light / Dark Mode)
Aplikasi mendukung 3 mode tema yang dikelola oleh `ThemeContext`:
1. **Dark Mode (Default)**: Menggunakan variabel `--color-bg-deep` bernuansa hijau gelap (`#0d2e1a`).
2. **Light Mode**: Diaktifkan melalui opsi di `SettingsPage`. Elemen HTML (`<html>`) akan mendapatkan atribut `data-theme="light"`, yang akan me-*override* variabel warna di `index.css` menjadi latar terang (seperti `#f1f5f9` dan `#f8fafc`).
3. **System Default**: Mengikuti preferensi OS pengguna melalui `window.matchMedia('(prefers-color-scheme: light)')`.

### Penyesuaian Desain Glassmorphism
Komponen melayang seperti *Sidebar*, *Header*, dan *Modal* menggunakan variabel `var(--glass-bg)` dan `var(--color-bg)` agar tetap beradaptasi menjadi semi-transparan dengan baik, baik saat di tema gelap maupun terang, menghindari nilai `rgba()` statis yang bisa merusak salah satu tema.

## Menjalankan Proyek secara Lokal

1. **Install Dependencies**
   Pastikan Anda berada di direktori `frontend/swaphour-frontend`, lalu jalankan:
   ```bash
   npm install
   ```

2. **Jalankan Development Server**
   ```bash
   npm run dev
   ```
   Aplikasi bisa diakses melalui `http://localhost:5173`.

3. **Build untuk Production**
   ```bash
   npm run build
   ```
   Hasil *compile* statis yang telah dioptimisasi akan tersimpan di dalam folder `dist/`.
