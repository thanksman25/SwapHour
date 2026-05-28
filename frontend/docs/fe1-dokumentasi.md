===========================================================================
PERUBAHAN (27 Mei 2026 - Halaman Auth & Komponen Shared):
===========================================================================

- Komponen Shared: Buat 6 komponen di src/components/ui/
  - Button.tsx → Tombol reusable (primary/outline/ghost + isLoading)
  - Input.tsx → Input field dengan label & error message
  - ErrorAlert.tsx → Kotak pesan error merah
  - Spinner.tsx → Loading indicator animasi (sm/md/lg)
  - ProtectedRoute.tsx → HOC cek token, redirect ke /login
  - Badge.tsx → Badge status (pending/active/completed/rejected/expired)

- Halaman Register (/register):
  - Layout 2 kolom — kiri panel hijau promosi, kanan form glass
  - Field: Nama Lengkap, Email, Password
  - Validasi frontend sebelum hit API
  - Integrasi API POST /api/auth/register
  - GSAP animasi form slide dari bawah ease back.out(1.5)
  - Redirect ke /login setelah sukses
  - Stats card glass: 10K+ Pengguna, 50K+ Jam, 200+ Keahlian

- Halaman Login (/login):
  - Layout 2 kolom — kiri form glass, kanan panel hijau
  - Field: Email, Password
  - Validasi frontend sebelum hit API
  - Integrasi API POST /api/auth/login
  - Simpan token ke localStorage('token') setelah sukses
  - GSAP animasi form slide dari bawah ease back.out(1.5)
  - Redirect ke /dashboard setelah sukses
  - Stats card glass: 10K+ Pengguna, 200+ Keahlian, 50K+ Jam

- CSS Tambahan di landing.css:
  - Styling komponen UI: .ui-btn, .ui-input, .ui-error-alert
  - Styling spinner: .ui-spinner, animasi spin
  - Styling badge: .ui-badge semua variant + animasi pulse active
  - Styling auth pages: .auth-page, .auth-left, .auth-right
  - Styling auth form card dengan glassmorphism

- Install Dependencies baru:
  - react-router-dom
  - @types/react-router-dom

- Update App.tsx:
  - Tambah BrowserRouter + Routes
  - Route "/" → LandingPage
  - Route "/register" → RegisterPage
  - Route "/login" → LoginPage

- Bug fixes:
  - Rename folder UI → ui (case sensitive Windows issue)
  - Fix GSAP opacity stuck dengan gsap.fromTo()
  - Fix full width layout dengan reset App.css & index.css

===========================================================================

===========================================================================
SWAPHOUR - DOKUMENTASI STRUKTUR FRONTEND (React + TypeScript - FE-1)
Untuk referensi tim Backend & anggota baru
Diperbarui: 25 Mei 2026
===========================================================================

CATATAN PENTING:
Landing Page sudah selesai dengan design Glassmorphism + GSAP Animation.
Halaman Auth (Register, Login) belum dibuat.
Halaman Profil & Skill belum dibuat.
Dokumentasi ini menjelaskan state terkini dan kebutuhan pengerjaan berikutnya.

PERUBAHAN TERBARU (25 Mei 2026 - Landing Page & Design System):

- Setup Project: Inisialisasi project React + TypeScript + Vite.
- Install GSAP: Animasi halaman menggunakan GSAP 3.x.
- Design System: Setup CSS Variables glassmorphism, warna, font Sora.
- Landing Page: Selesai dengan 5 komponen utama.
- Navbar: Fixed floating glass navbar dengan animasi slide dari atas.
- HeroSection: Heading besar + badge + stats + CTA buttons + GSAP stagger.
- HowItWorks: 3 kartu langkah dengan glass card + hover effect.
- Features: 4 kartu fitur dengan glassmorphism + top border hover.
- Footer: Glass footer dengan link navigasi.
- CTA Section: Glass card section ajakan daftar.
- Routing: Setup React Router DOM, route "/" → LandingPage.
- Full Width: Fix layout full width tanpa batas kanan kiri.
- Dokumentasi: Pembuatan file dokumentasi fe1-landing-final.md.

===========================================================================

1. # STRUKTUR FOLDER (swaphour-frontend/src/)

src/
├── main.tsx - Entry point React + import global CSS
├── App.tsx - Root component + routing setup
├── App.css - Reset CSS root
├── index.css - Reset global html & body
│
├── styles/
│ └── landing.css - Design system: variables, glassmorphism,
│ semua styling komponen landing page
│
├── pages/
│ └── LandingPage.tsx ✅ - Halaman utama route "/"
│ Merakit semua komponen landing
│
└── components/
└── landing/
├── Navbar.tsx ✅ - Fixed floating glass navbar
│ Logo + link Masuk & Daftar
│ Animasi: slide dari atas (GSAP)
│
├── HeroSection.tsx ✅ - Hero utama halaman
│ Badge + Heading + Subtitle
│ 2 CTA Buttons + Stats (10K/50K/200+)
│ Animasi: stagger fade dari bawah (GSAP)
│
├── HowItWorks.tsx ✅ - Section cara kerja SwapHour
│ 3 kartu: Daftar → Tawarkan Skill → Swap
│ Animasi: fade stagger saat load (GSAP)
│
├── Features.tsx ✅ - Section fitur utama SwapHour
│ 4 kartu: Time Banking, Komunitas,
│ Aman & Terpercaya, Tanpa Batas
│ Animasi: fade stagger saat load (GSAP)
│
└── Footer.tsx ✅ - Footer halaman
Logo + tagline + link Daftar & Masuk
Animasi: fade dari bawah (GSAP)

CATATAN: Halaman Register, Login, Edit Profil, Tambah Skill belum dibuat.
Semua akan dibuat di branch feat/fe1-auth-onboarding.

# =========================================================================== 2. HALAMAN & ROUTE

| Route         | Halaman      | Status          | API Endpoint            |
| ------------- | ------------ | --------------- | ----------------------- |
| /             | Landing Page | ✅ SELESAI      | -                       |
| /register     | Register     | 🔄 BELUM DIBUAT | POST /api/auth/register |
| /login        | Login        | 🔄 BELUM DIBUAT | POST /api/auth/login    |
| /profile/edit | Edit Profil  | 🔄 BELUM DIBUAT | GET /api/users/profile  |
| /skills/new   | Tambah Skill | 🔄 BELUM DIBUAT | POST /api/skills        |

# =========================================================================== 3. DESIGN SYSTEM

─────────────────────────────────────────────────────────────
3.1 FONT
─────────────────────────────────────────────────────────────
Family : Sora (Google Fonts)
Weights : 300 (light), 400 (regular), 600 (semibold),
700 (bold), 800 (extrabold)
Import : index.html via Google Fonts link tag

─────────────────────────────────────────────────────────────
3.2 WARNA UTAMA
─────────────────────────────────────────────────────────────
Variable | Hex | Kegunaan
-----------|-----------|----------------------------------
--p1 | #071810 | Background paling gelap
--p2 | #0a2318 | Background gelap
--p3 | #1A6B4A | Primary hijau utama
--p4 | #2d8a61 | Primary hijau terang
--accent | #F0A500 | Aksen amber/kuning (CTA, hover)
--accent2 | #ffdd80 | Aksen amber terang
--white | #ffffff | Teks utama
--muted | rgba(255,255,255,0.65) | Teks sekunder
--muted2 | rgba(255,255,255,0.35) | Teks tersier

─────────────────────────────────────────────────────────────
3.3 GLASSMORPHISM VARIABLES
─────────────────────────────────────────────────────────────
Variable | Value | Kegunaan
-----------|----------------------------|----------------------
--glass | rgba(255,255,255,0.05) | Background card glass
--glass2 | rgba(255,255,255,0.09) | Background card glass
--glass3 | rgba(255,255,255,0.13) | Background card hover
--gborder | rgba(255,255,255,0.10) | Border card glass
--gborder2 | rgba(255,255,255,0.18) | Border card hover
--blur | blur(20px) | Backdrop filter glass
--glow-green | rgba(45,138,97,0.35) | Glow effect hijau
--glow-amber | rgba(240,165,0,0.20) | Glow effect amber

─────────────────────────────────────────────────────────────
3.4 CARA PAKAI GLASS CARD
─────────────────────────────────────────────────────────────
.glass-card {
background: var(--glass2);
backdrop-filter: var(--blur);
-webkit-backdrop-filter: var(--blur);
border: 1px solid var(--gborder);
border-radius: 22px;
box-shadow: 0 4px 24px rgba(0,0,0,0.2),
inset 0 1px 0 rgba(255,255,255,0.08);
}

# =========================================================================== 4. DETAIL SETIAP KOMPONEN

─────────────────────────────────────────────────────────────
4.1 NAVBAR (components/landing/Navbar.tsx)
─────────────────────────────────────────────────────────────
Status : ✅ SELESAI
Route : Semua halaman (fixed)
Style : Floating glass navbar, top: 16px, border-radius: 18px
Isi : Logo SwapHour (kiri) + Link Masuk & Daftar (kanan)
Animasi : gsap.fromTo → slide dari atas, opacity 0→1, duration 0.7s
Catatan : Menggunakan position fixed + backdrop-filter blur(20px)

─────────────────────────────────────────────────────────────
4.2 HERO SECTION (components/landing/HeroSection.tsx)
─────────────────────────────────────────────────────────────
Status : ✅ SELESAI
Route : /
Style : Full viewport height, radial gradient background + dot grid
Isi : - Badge : "Platform Time Banking #1 di Indonesia" - Title : "Tukar Keahlian, Tanpa Uang Tunai"
(span amber gradient untuk "Tanpa Uang Tunai") - Subtitle: Deskripsi platform SwapHour - Buttons : "Mulai Gratis →" (amber) + "Masuk" (glass) - Stats : 10K+ Pengguna | 50K+ Jam Ditukar | 200+ Keahlian
(dalam glass card dengan divider)
Animasi : - Badge → Title → Subtitle → Buttons → Stats - gsap.fromTo stagger 0.15s, y: 30→0, opacity: 0→1

─────────────────────────────────────────────────────────────
4.3 HOW IT WORKS (components/landing/HowItWorks.tsx)
─────────────────────────────────────────────────────────────
Status : ✅ SELESAI
Route : /
Style : Dark background + glow orb kiri bawah
Isi : - Label : "CARA KERJA" - Title : "Semudah 3 Langkah" - Subtitle: "Bergabung dan mulai tukar keahlian dalam hitungan menit." - Kartu 01: Daftar - Buat akun gratis - Kartu 02: Tawarkan Skill - Tambahkan keahlian - Kartu 03: Swap! - Tukar jam keahlian
Animasi : gsap.fromTo stagger, y: 30→0, opacity: 0→1, delay 0.4s
Hover : translateY(-10px) + shimmer top border + inner glow

─────────────────────────────────────────────────────────────
4.4 FEATURES (components/landing/Features.tsx)
─────────────────────────────────────────────────────────────
Status : ✅ SELESAI
Route : /
Style : Dark background + glow orb kanan atas (amber)
Isi : - Title : "Mengapa SwapHour?" - Kartu 1: ⏰ Time Banking - Kartu 2: 🤝 Komunitas Setara - Kartu 3: 🔒 Aman & Terpercaya - Kartu 4: 🌍 Tanpa Batas
Animasi : gsap.fromTo stagger, y: 30→0, opacity: 0→1, delay 0.4s
Hover : translateY(-8px) + amber top border + amber inner glow

─────────────────────────────────────────────────────────────
4.5 CTA SECTION (pages/LandingPage.tsx - inline)
─────────────────────────────────────────────────────────────
Status : ✅ SELESAI
Route : /
Style : Glass card terpusat di atas gradient background + dot grid
Isi : Title + Subtitle + Tombol "Daftar Gratis Sekarang →"

─────────────────────────────────────────────────────────────
4.6 FOOTER (components/landing/Footer.tsx)
─────────────────────────────────────────────────────────────
Status : ✅ SELESAI
Route : /
Style : Dark glass footer dengan top border tipis
Isi : Logo + Tagline + Link Daftar & Masuk + Copyright
Animasi : gsap.fromTo, y: 30→0, opacity: 0→1

# =========================================================================== 5. ANIMASI GSAP

─────────────────────────────────────────────────────────────
5.1 PATTERN DASAR (single element)
─────────────────────────────────────────────────────────────
gsap.fromTo(
element,
{ opacity: 0, y: 30 },
{ opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }
)

─────────────────────────────────────────────────────────────
5.2 PATTERN STAGGER (banyak elemen sekaligus)
─────────────────────────────────────────────────────────────
gsap.fromTo(
elements,
{ opacity: 0, y: 30 },
{
opacity: 1, y: 0,
duration: 0.7,
stagger: 0.15,
ease: 'power3.out',
delay: 0.2
}
)

─────────────────────────────────────────────────────────────
5.3 PATTERN TIMELINE (urutan animasi)
─────────────────────────────────────────────────────────────
const tl = gsap.timeline()
tl.fromTo(el1, { opacity:0, y:30 }, { opacity:1, y:0, duration:0.6 })
.fromTo(el2, { opacity:0, y:30 }, { opacity:1, y:0, duration:0.6 }, '-=0.3')
.fromTo(el3, { opacity:0, y:30 }, { opacity:1, y:0, duration:0.6 }, '-=0.3')

CATATAN: '-=0.3' artinya animasi mulai 0.3 detik sebelum animasi sebelumnya selesai.

# =========================================================================== 6. RINGKASAN ENDPOINT API (REFERENSI)

★ = Sudah terhubung ke Frontend
○ = Belum terhubung

AUTENTIKASI
Method | Endpoint | Status | Keterangan
-------|----------------------|--------|---------------------------
POST | /api/auth/register | ○ | Daftar akun baru
POST | /api/auth/login | ○ | Login user

PROFIL USER
Method | Endpoint | Status | Keterangan
-------|----------------------|--------|---------------------------
GET | /api/users/profile | ○ | Ambil data profil user
PUT | /api/users/profile | ○ | Update data profil user

SKILL
Method | Endpoint | Status | Keterangan
-------|----------------------|--------|---------------------------
POST | /api/skills | ○ | Tambah skill baru
GET | /api/skills | ○ | Ambil daftar skill

# =========================================================================== 7. CATATAN UNTUK TIM & ANGGOTA BARU

1. BRANCH: Semua pekerjaan FE-1 ada di feat/fe1-auth-onboarding.

2. INSTALL DEPENDENCIES:
   cd SwapHour/frontend/swaphour-frontend
   npm install
   npm run dev → buka http://localhost:5173

3. GSAP: Sudah terinstall (lihat package.json).
   Import: import gsap from 'gsap'
   TIDAK perlu install @types/gsap karena sudah built-in.

4. CSS: Semua styling ada di src/styles/landing.css.
   Gunakan CSS variables yang sudah ada, jangan hardcode warna.

5. KOMPONEN BARU: Letakkan di src/components/landing/ untuk
   komponen landing, atau buat folder baru sesuai halaman.

6. HALAMAN BARU: Letakkan di src/pages/ dan daftarkan
   route-nya di App.tsx.

7. GLASS EFFECT: Selalu gunakan variabel --glass, --glass2,
   --gborder, dan --blur agar konsisten di semua komponen.

# =========================================================================== 8. CHECKLIST PROGRESS FE-1

LANDING PAGE (Prioritas 1)
[x] Setup struktur folder
[x] Install GSAP
[x] Setup CSS variables & glassmorphism design system
[x] Font Sora dari Google Fonts
[x] Navbar floating glass
[x] Hero section + badge + stats
[x] HowItWorks section + 3 kartu glass
[x] Features section + 4 kartu glass
[x] CTA section glass card
[x] Footer glass
[x] Full width responsive
[x] GSAP animasi semua komponen
[x] Dokumentasi

AUTH PAGES (Prioritas 2 - Belum Dikerjakan)
[ ] Halaman Register (/register)
[ ] Halaman Login (/login)
[ ] Integrasi API POST /api/auth/register
[ ] Integrasi API POST /api/auth/login

PROFILE & SKILL (Prioritas 3 - Belum Dikerjakan)
[ ] Halaman Edit Profil (/profile/edit)
[ ] Halaman Tambah Skill (/skills/new)
[ ] Integrasi API GET /api/users/profile
[ ] Integrasi API POST /api/skills

===========================================================================
Dibuat oleh : [Nama Anda]
Branch : feat/fe1-auth-onboarding
Repo : [Link GitHub Repo SwapHour]
Diperbarui : 25 Mei 2026
===========================================================================
