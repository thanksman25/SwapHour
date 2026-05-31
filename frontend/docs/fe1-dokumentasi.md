# SwapHour FE-1 — Dokumentasi Halaman & Komponen

**Branch:** `feat/fe1-auth-onboarding` → merged ke `frontend`
**Developer:** FE-1
**Terakhir diperbarui:** 2026-05-29

---

## Struktur File yang Dibuat FE-1
```
src/
├── assets/
│ └── logo.png — Logo SwapHour (PNG, putih via CSS filter)
├── styles/
│ └── landing.css — Design system FE-1: variables, glassmorphism,
│ semua styling landing & auth pages
├── components/
│ ├── landing/
│ │ ├── Navbar.tsx — Floating glass navbar landing page
│ │ ├── HeroSection.tsx — Hero utama + badge + stats + CTA
│ │ ├── HowItWorks.tsx — Section 3 langkah cara kerja
│ │ ├── Features.tsx — Section 4 fitur utama SwapHour
│ │ └── Footer.tsx — Footer dengan link navigasi
│ ├── layout/
│ │ ├── AppLayout.tsx / .css — Grid layout utama (FE-2, dipakai bersama)
│ │ └── Navbar.tsx / .css — Navbar dashboard (FE-2, dipakai bersama)
│ └── ui/
│ ├── Button.tsx — Tombol reusable (primary/outline/ghost)
│ ├── Input.tsx — Input field dengan label & error message
│ ├── ErrorAlert.tsx — Kotak pesan error merah
│ ├── Spinner.tsx — Loading indicator animasi (sm/md/lg)
│ ├── ProtectedRoute.tsx — HOC cek token, redirect ke /login
│ └── Badge.tsx — Badge status warna-warni
└── pages/
├── LandingPage.tsx — / (Landing Page)
├── RegisterPage.tsx — /register
├── LoginPage.tsx — /login
├── EditProfilePage.tsx — /profile/edit
└── AddSkillPage.tsx — /skills/new

```
---

## Halaman-Halaman FE-1

### 1. Landing Page (`/`)
- Hero section: badge + heading besar + subtitle + 2 CTA buttons
- Stats glass card: 10K+ Pengguna | 50K+ Jam Ditukar | 200+ Keahlian
- Section HowItWorks: 3 kartu langkah (Daftar → Tawarkan Skill → Swap)
- Section Features: 4 kartu fitur (Time Banking, Komunitas, Aman, Tanpa Batas)
- CTA Section: glass card ajakan daftar
- Footer: logo + tagline + link navigasi
- **GSAP:** stagger animasi badge → title → subtitle → buttons → stats
- Dot grid background pattern + radial glow orbs

### 2. Register (`/register`)
- Layout 2 kolom: kiri panel hijau promosi, kanan form glass
- Field: Nama Lengkap, Email, Password
- Validasi frontend: format email, password min 8 karakter
- Stats card glass: 10K+ Pengguna | 50K+ Jam | 200+ Keahlian
- Integrasi API: `POST /api/auth/register`
- Redirect ke `/login` setelah sukses (status 201)
- Tampilkan error dari `response.data.message` jika gagal
- **GSAP:** form card slide dari bawah `ease: back.out(1.5)`

### 3. Login (`/login`)
- Layout 2 kolom: kiri form glass, kanan panel hijau
- Field: Email, Password
- Validasi frontend: format email, password min 8 karakter
- Integrasi API: `POST /api/auth/login`
- Simpan token ke `localStorage('token')` setelah sukses
- Redirect ke `/dashboard` setelah sukses
- Tampilkan error dari `response.data.message` jika gagal
- **GSAP:** form card slide dari bawah `ease: back.out(1.5)`

### 4. Edit Profil (`/profile/edit`)
- Protected route: cek token → redirect `/login` jika kosong
- Fetch data profil dari `GET /api/users/profile` saat load
- Field: Nama Lengkap, Bio, Avatar URL
- Preview avatar dari URL
- Progress bar kelengkapan profil (0-100%) dengan warna dinamis:
  - Merah jika < 50%, Amber jika < 80%, Hijau jika ≥ 80%
- Warning jika profil completion < 80% (belum bisa swap)
- Tombol Simpan: `disabled={isLoading}` saat request berjalan
- Success message setelah simpan berhasil
- Integrasi API: `PUT /api/users/profile`
- **GSAP:** card fade dari bawah + progress bar animasi dari 0%

### 5. Tambah Skill (`/skills/new`)
- Protected route: cek token → redirect `/login` jika kosong
- Field: Judul Skill, Deskripsi, Kategori (dropdown), Durasi (jam)
- Validasi durasi: antara 0.5 - 24 jam
- Dropdown kategori: Teknologi, Desain, Bahasa, Musik, Memasak,
  Olahraga, Pendidikan, Bisnis, Kesehatan, Lainnya
- Info box penjelasan sistem kredit jam
- Integrasi API: `POST /api/skills`
- Body: `{ title, description, category, duration }`
- Success toast + redirect ke `/dashboard` setelah 2 detik
- **GSAP:** form card slide dari bawah `ease: back.out(1.5)`

---

## Komponen Shared (Dibuat FE-1, Dipakai FE-2)

| Komponen | File | Fungsi |
|---|---|---|
| `Button` | `ui/Button.tsx` | Tombol reusable — variant: primary/outline/ghost, props: isLoading, disabled, onClick, fullWidth |
| `Input` | `ui/Input.tsx` | Input field dengan label, placeholder, errorMessage, onChange |
| `ErrorAlert` | `ui/ErrorAlert.tsx` | Kotak pesan error merah dengan icon ⚠️ |
| `Spinner` | `ui/Spinner.tsx` | Loading indicator animasi — size: sm/md/lg, props: center |
| `ProtectedRoute` | `ui/ProtectedRoute.tsx` | HOC cek localStorage('token'), redirect ke /login jika kosong |
| `Badge` | `ui/Badge.tsx` | Badge status warna — props: status (pending/active/completed/rejected/expired) + animasi pulse untuk active |

---

## API Endpoints yang Digunakan FE-1

| Endpoint | Method | Digunakan di | Status |
|---|---|---|---|
| `/api/auth/register` | POST | RegisterPage | ○ Belum terhubung BE |
| `/api/auth/login` | POST | LoginPage | ○ Belum terhubung BE |
| `/api/users/profile` | GET | EditProfilePage | ○ Belum terhubung BE |
| `/api/users/profile` | PUT | EditProfilePage | ○ Belum terhubung BE |
| `/api/skills` | POST | AddSkillPage | ○ Belum terhubung BE |

---

## Design System & Glassmorphism

- **Typography:**
  - **Heading:** Sora (Google Fonts) — modern, geometric, bold
  - **Weights:** 300, 400, 600, 700, 800
- **Color Palette:**
  - **Primary Green:** `#1A6B4A` / light: `#2d8a61`
  - **Gold Accent:** `#F0A500` (CTA, hover, badge)
  - **Dark Base BG:** `#071810` (deepest) dan `#0f4530` (primary dark)
  - **Radial Glow:** Green dan amber glow di background setiap halaman
- **Glassmorphism Spec:**
  - **Surface BG:** `rgba(255,255,255,0.06)` untuk card
  - **Frosted Blur:** `blur(20px)` hingga `blur(28px)`
  - **Border:** `rgba(255,255,255,0.12)` tipis transparan
  - **Shadow:** `0 20px 80px rgba(0,0,0,0.4)` + inner glow
  - **Shimmer line:** gradient tipis di top border card
- **GSAP Animations per Halaman:**
  - **Landing:** Badge → Title → Subtitle → Buttons → Stats stagger `y:30→0, opacity:0→1`
  - **Register & Login:** Card slide dari bawah `y:60→0, ease: back.out(1.5)`
  - **Edit Profil:** Card fade `y:40→0` + progress bar animasi `width:0→n%`
  - **Tambah Skill:** Card slide `y:50→0, ease: back.out(1.5)`
  - **Navbar Landing:** Slide dari atas `y:-30→0, duration:0.7`
  - **Navbar Dashboard:** Logo ← kiri, links ↓ stagger, user → kanan

---

## Git — Urutan Commit yang Dilakukan

**25 Mei 2026 — Landing Page & Design System**
```bash
git commit -m "feat(fe1): setup project, landing page, glassmorphism design system"
```
Mencakup:
- Setup struktur folder, install GSAP
- Setup CSS variables & design system
- Navbar, HeroSection, HowItWorks, Features, Footer, CTA
- Font Sora via Google Fonts

**27 Mei 2026 — Auth Pages & Shared Components**
```bash
git commit -m "feat(fe1): auth pages register & login, 6 shared UI components"
```
Mencakup:
- 6 komponen shared: Button, Input, ErrorAlert, Spinner, ProtectedRoute, Badge
- Halaman Register & Login dengan glassmorphism 2 kolom
- Install react-router-dom, setup BrowserRouter + Routes
- Fix rename folder UI → ui (Windows case sensitive)

**29 Mei 2026 — Edit Profil, Tambah Skill, Logo & Merge**
```bash
git commit -m "feat(fe1): edit profile, add skill, logo, navbar dropdown fix, merge FE-2"
```
Mencakup:
- Halaman Edit Profil dengan progress bar & protected route
- Halaman Tambah Skill dengan dropdown kategori & validasi durasi
- Logo SwapHour PNG di semua halaman FE-1
- Fix navbar dropdown (hover → click toggle + closeOnClickOutside)
- Tambah link Edit Profil di dropdown navbar dashboard
- Merge conflict: package.json, index.css, App.tsx

---

## Bug Fixes & Troubleshooting

| Tanggal | Bug | Fix |
|---------|-----|-----|
| 25 Mei | GSAP animasi stuck opacity:0 | Ganti ke `gsap.fromTo()` dengan `clearProps` |
| 25 Mei | Halaman tidak full width | Reset `App.css` dan `index.css` |
| 26 Mei | Import error komponen ui | Rename folder `UI` → `ui` (Windows case sensitive) |
| 27 Mei | Dropdown navbar hilang saat hover | Ganti sistem hover CSS ke click toggle dengan useState |
| 28 Mei | Merge conflict package.json | Gabung dependencies FE-1 & FE-2 manual |
| 28 Mei | Merge conflict index.css | Gabung reset CSS + design system FE-2 |
| 28 Mei | Merge conflict App.tsx | Gabung routes FE-1 & FE-2 + QueryClientProvider |

---

## Checklist Progress FE-1

### Landing Page ✅ Selesai 25 Mei 2026
- [x] Setup struktur folder
- [x] Install GSAP
- [x] Setup CSS variables & glassmorphism design system
- [x] Font Sora dari Google Fonts
- [x] Navbar floating glass
- [x] Hero section + badge + stats
- [x] HowItWorks section + 3 kartu glass
- [x] Features section + 4 kartu glass
- [x] CTA section glass card
- [x] Footer glass
- [x] Full width responsive
- [x] GSAP animasi semua komponen

### Komponen Shared ✅ Selesai 27 Mei 2026
- [x] Button.tsx
- [x] Input.tsx
- [x] ErrorAlert.tsx
- [x] Spinner.tsx
- [x] ProtectedRoute.tsx
- [x] Badge.tsx

### Auth Pages ✅ Selesai 27 Mei 2026
- [x] Halaman Register (/register)
- [x] Halaman Login (/login)
- [x] Integrasi API POST /api/auth/register
- [x] Integrasi API POST /api/auth/login

### Profile & Skill ✅ Selesai 29 Mei 2026
- [x] Halaman Edit Profil (/profile/edit)
- [x] Halaman Tambah Skill (/skills/new)
- [x] Integrasi API GET /api/users/profile
- [x] Integrasi API PUT /api/users/profile
- [x] Integrasi API POST /api/skills

### Merge & Integration ✅ Selesai 29 Mei 2026
- [x] Merge branch FE-2 ke frontend
- [x] Fix semua conflict
- [x] Logo SwapHour di semua halaman
- [x] Navbar dropdown dengan link Edit Profil

---

## Catatan untuk Tim & Anggota Baru

1. **Branch:** Semua pekerjaan FE-1 sudah merged ke branch `frontend`

2. **Install & Run:**
```bash
   cd SwapHour/frontend/swaphour-frontend
   npm install
   npm run dev
```
   Buka `http://localhost:5173`

3. **GSAP:** Sudah terinstall. Import: `import gsap from 'gsap'`
   TypeScript types sudah built-in, tidak perlu install terpisah.

4. **CSS:** Semua styling FE-1 ada di `src/styles/landing.css`.
   Gunakan CSS variables yang sudah ada, jangan hardcode warna.

5. **Komponen UI:** Semua di `src/components/ui/` — selalu gunakan
   komponen ini untuk konsistensi tampilan.

6. **Protected Route:** Semua halaman yang butuh login wajib cek
   `localStorage.getItem('token')` dan redirect ke `/login` jika kosong.

7. **Glass Effect:** Selalu gunakan variabel `--glass`, `--glass2`,
   `--gborder`, dan `--blur` dari `landing.css` agar konsisten.

8. **Logo:** Ada di `src/assets/logo.png`. Gunakan CSS filter
   `brightness(0) invert(1)` untuk tampilan putih di background gelap.

---
