<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:6366f1,50:8b5cf6,100:a855f7&height=220&section=header&text=SwapHour&fontSize=80&fontColor=ffffff&fontAlignY=38&desc=Where%20Skills%20Meet%20%E2%80%94%20Time%20is%20the%20Only%20Currency&descAlignY=58&descSize=19&descColor=e2e8f0" width="100%" />

<br/>

**Frontend**

[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-Build_Tool-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TanStack Query](https://img.shields.io/badge/TanStack_Query-v5-FF4154?style=for-the-badge&logo=reactquery&logoColor=white)](https://tanstack.com/query)
[![React Router](https://img.shields.io/badge/React_Router-v6-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)](https://reactrouter.com/)
[![GSAP](https://img.shields.io/badge/GSAP-Animation-88CE02?style=for-the-badge&logo=greensock&logoColor=black)](https://gsap.com/)
[![Axios](https://img.shields.io/badge/Axios-HTTP_Client-5A29E4?style=for-the-badge&logo=axios&logoColor=white)](https://axios-http.com/)

<br/>

**Backend**

[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.x-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14+-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Prisma](https://img.shields.io/badge/Prisma-7.x-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![Vercel](https://img.shields.io/badge/Deployed-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://swap-hour-api.vercel.app)
[![License](https://img.shields.io/badge/License-ISC-8b5cf6?style=for-the-badge)](./LICENSE)

<br/>

🌐 **[Live Demo](https://swap-hour-api.vercel.app)** &nbsp;·&nbsp;
📚 **[API Docs](https://swap-hour-api.vercel.app/api-docs)** &nbsp;·&nbsp;
🐛 **[Report Issue](https://github.com/Nixzouxu/SwapHour/issues)** &nbsp;·&nbsp;
💡 **[Request Feature](https://github.com/Nixzouxu/SwapHour/issues)**

</div>

---

<br/>

> _To every developer, recruiter, evaluator, and curious mind who has landed on this page welcome._
>
> _This is not just a repository. It is a record of four semester-4 students learning to build
> a real product from end to end: from the animated React interface a user sees and touches,
> to the TypeScript API that powers every transaction, to the PostgreSQL database that keeps
> every credit safe. Pull up a chair._

<br/>

---

## 📖 Background

Pernahkah kamu ingin belajar sesuatu desain, coding, memasak, atau bahasa asing tapi terhenti karena biaya kursus yang tidak terjangkau?

Itulah masalah nyata yang kami lihat di lingkungan kampus. Banyak mahasiswa punya keahlian berharga yang tidak dimanfaatkan. Di sisi lain, banyak yang ingin belajar tapi tidak mampu membayar. Dua kebutuhan ini terus bersilangan, namun tidak pernah bertemu karena satu penghalang: **uang**.

Proyek ini lahir dari pertanyaan sederhana di semester 4: **bagaimana jika kita hapus uang dari persamaannya?**

Jawabannya menjadi SwapHour.

---

## 💡 What is SwapHour?

SwapHour adalah **platform skill exchange** berbasis konsep **time banking** sistem ekonomi alternatif di mana setiap orang menukar keahlian menggunakan **kredit waktu (jam)** sebagai mata uang, bukan rupiah.

Cara kerjanya sangat sederhana:

```
Kamu ahli desain grafis.
Seseorang butuh bantuanmu 2 jam pekerjaan.

Selesai → kamu mendapat 2 jam kredit di wallet SwapHour kamu.

Besoknya, kamu ingin belajar editing video.
Kamu tawarkan 2 jam kreditmu ke editor di platform.

Dia setuju → sistem langsung transfer kredit secara otomatis.
```

Tidak ada uang bergerak. Tidak ada yang dirugikan. Adil untuk semua pihak.

SwapHour adalah aplikasi **full-stack** yang dibangun dengan teknologi modern di kedua sisi:
antarmuka React yang responsif dan dianimasikan dengan GSAP di frontend, dan REST API TypeScript yang aman dan terdokumentasi penuh di backend.

---

## 📋 Table of Contents

- [Background](#-background)
- [What is SwapHour?](#-what-is-swaphour)
- [Application Preview](#-application-preview)
- [Tech Stack](#%EF%B8%8F-tech-stack)
- [Features](#-features)
- [Project Architecture](#-project-architecture)
- [Frontend Deep Dive](#-frontend-deep-dive)
- [Backend Deep Dive](#-backend-deep-dive)
- [Getting Started](#-getting-started)
- [Available Scripts](#-available-scripts)
- [API Documentation](#-api-documentation)
- [Security](#-security)
- [Engineering Decisions & Lessons](#-engineering-decisions--lessons)
- [Roadmap](#%EF%B8%8F-roadmap)
- [Contributing](#-contributing)
- [Team](#-team)
- [License](#-license)
- [Acknowledgements](#-acknowledgements)

---

## 📸 Application Preview
```
┌──────────────────────────────────────────────────────────────┐
│                     SwapHour - React App                     │
│                                                              │
│  ┌──────────────────┐    ┌──────────────────────────────┐   │
│  │   🏠 Landing     │    │       📊 Dashboard            │   │
│  │                  │    │                              │   │
│  │  [Hero Section]  │    │  💰 Wallet: 5 Jam Kredit     │   │
│  │  GSAP Animation  │    │  🔄 Swap Aktif: 3            │   │
│  │                  │    │  ✅ Selesai: 12              │   │
│  │  [Mulai Swap →]  │    │  [+ Buat Swap Baru]         │   │
│  └──────────────────┘    └──────────────────────────────┘   │
│                                                              │
│  ┌──────────────────┐    ┌──────────────────────────────┐   │
│  │   🔐 Auth Page   │    │       🔄 Swap Marketplace    │   │
│  │                  │    │                              │   │
│  │  [Login Form]    │    │  Video Edit ←→ UI Design 2h  │   │
│  │  [Register Form] │    │  Coding    ←→ Fotografi  3h  │   │
│  │                  │    │  [Terima] [Detail]           │   │
│  │  React Router v6 │    │  TanStack Query (cache) ✨   │   │
│  └──────────────────┘    └──────────────────────────────┘   │
└──────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

SwapHour adalah aplikasi **full-stack modern** dengan pilihan teknologi yang masing-masing punya alasan kuat.

### 🎨 Frontend

| Teknologi | Versi | Peran | Alasan Dipilih |
|-----------|-------|-------|----------------|
| **React** | 18 | UI library | Component-based, ekosistem besar, concurrent features |
| **TypeScript** | 5.x | Bahasa | Type safety end-to-end, autocomplete yang kuat |
| **Vite** | Latest | Build tool | Cold start < 300ms, HMR instan, jauh lebih cepat dari CRA |
| **TanStack Query** | v5 | Server state | Caching, background refetch, loading/error state otomatis |
| **React Router** | v6 | Client routing | Nested routes, lazy loading, declarative navigation |
| **GSAP** | Latest | Animasi | Performa 60fps, kontrol timeline yang presisi |
| **Axios** | Latest | HTTP Client | Interceptors, auto JSON transform, error handling terpusat |

### ⚙️ Backend

| Teknologi | Versi | Peran | Alasan Dipilih |
|-----------|-------|-------|----------------|
| **TypeScript** | 6.x (strict) | Bahasa | Menangkap bug di compile time, bukan saat runtime crash |
| **Node.js** | ≥ 18 | Runtime | Non-blocking I/O, cocok untuk API dengan banyak concurrent request |
| **Express** | 5.x | HTTP framework | Minimalis, mature, ekosistem middleware terlengkap |
| **PostgreSQL** | ≥ 14 | Database | ACID-compliant wajib untuk transaksi kredit yang atomik |
| **Prisma ORM** | 7.x | Query builder | Type-safe queries, schema migration otomatis, Prisma Studio |
| **JWT + bcrypt** | 9.x / 6.x | Auth & hashing | Stateless authentication + password protection berlapis |
| **express-validator** | 7.x | Validation | Sanitasi dan validasi setiap input sebelum menyentuh DB |
| **helmet** | 8.x | HTTP security | 11+ security headers otomatis |
| **express-rate-limit** | 8.x | Rate limiting | Proteksi brute-force dan request flooding |
| **node-cron** | 4.x | Scheduler | Background jobs untuk auto-resolusi transfer kredit |
| **Swagger UI** | 5.x | API Docs | Interactive OpenAPI 3.0 documentation |

### 🚀 Deployment & Tooling

| Tool | Fungsi |
|------|--------|
| **Vercel** | Cloud deployment backend (serverless) |
| **ts-node-dev** | Hot-reload development server (backend) |
| **Prisma Migrate** | Database schema versioning |

---

## ✨ Features

### Untuk pengguna umum

- **🔐 Autentikasi yang Mulus** - Registrasi dan login dengan form yang divalidasi di frontend dan backend. Token JWT disimpan dengan aman dan di-refresh secara transparan.
- **👛 Wallet Kredit Waktu** - Saldo jam kredit ditampilkan real-time di dashboard. Setiap perubahan langsung ter-reflect berkat TanStack Query yang otomatis refetch setelah mutation.
- **🔄 Buat & Kelola Swap** - Form pengajuan swap yang intuitif. Lihat status swap secara live: `Menunggu → Diterima → Selesai`.
- **✅ Transfer Kredit Otomatis** - Begitu swap ditandai selesai, kredit berpindah tanpa perlu langkah manual apapun.
- **📜 Riwayat Lengkap** - Lacak semua swap dan transaksi kredit dengan filter dan tampilan yang bersih.
- **✨ Animasi yang Berkesan** - GSAP menggerakkan transisi halaman, hero section, dan micro-interactions yang membuat pengalaman terasa premium.

### Untuk developer dan evaluator teknis

- **⚛️ React 18 Concurrent Features** - Memanfaatkan `Suspense` dan concurrent rendering untuk UI yang responsif meski data belum dimuat.
- **🔄 Server State Management** - TanStack Query mengelola semua data dari API: caching, background refetch, optimistic updates, dan sinkronisasi otomatis.
- **🧭 Client-Side Routing** - React Router v6 dengan nested routes, protected routes (redirect jika belum login), dan lazy loading per halaman.
- **⚡ Vite Build Pipeline** - HMR (Hot Module Replacement) instan saat development, output bundle yang optimal saat production build.
- **🔒 Axios Interceptors** - Token JWT otomatis disertakan di setiap request. Response error 401 otomatis redirect ke login.
- **🏗️ Layered Backend Architecture** - Routes → Controllers → Services → Prisma. Setiap layer punya tanggung jawab tunggal.
- **⚛️ Atomic Credit Transfer** - Transfer menggunakan Prisma `$transaction` - semua commit atau semua rollback.

---

## 📁 Project Architecture

SwapHour adalah **monorepo full-stack** dengan struktur yang bersih:

```
SwapHour/
│
├── 🎨 frontend/                         # React + TypeScript + Vite App
│   ├── src/
│   │   ├── components/                  # Reusable UI components
│   │   │   ├── ui/                      # Base components (Button, Input, Card)
│   │   │   ├── layout/                  # Navbar, Sidebar, Footer
│   │   │   └── swap/                    # SwapCard, SwapForm, SwapStatus
│   │   │
│   │   ├── pages/                       # Route-level components
│   │   │   ├── LandingPage.tsx          # Hero + cara kerja + CTA
│   │   │   ├── LoginPage.tsx            # Form login
│   │   │   ├── RegisterPage.tsx         # Form registrasi
│   │   │   ├── DashboardPage.tsx        # Wallet + daftar swap
│   │   │   └── SwapPage.tsx             # Buat & detail swap
│   │   │
│   │   ├── hooks/                       # Custom React hooks
│   │   │   ├── useAuth.ts               # Auth state, login, logout
│   │   │   ├── useWallet.ts             # Wallet data via TanStack Query
│   │   │   └── useSwaps.ts              # Swap CRUD via TanStack Query
│   │   │
│   │   ├── services/                    # Axios API calls
│   │   │   ├── api.ts                   # Axios instance + interceptors
│   │   │   ├── auth.service.ts          # register, login
│   │   │   ├── wallet.service.ts        # getWallet, getHistory
│   │   │   └── swap.service.ts          # createSwap, acceptSwap, etc.
│   │   │
│   │   ├── animations/                  # GSAP animation configs
│   │   │   ├── hero.animation.ts        # Landing page hero entrance
│   │   │   └── page.transition.ts       # Page transition timelines
│   │   │
│   │   ├── router/
│   │   │   └── index.tsx                # React Router v6 route definitions
│   │   │
│   │   ├── types/                       # TypeScript interfaces & types
│   │   │   ├── user.types.ts
│   │   │   ├── swap.types.ts
│   │   │   └── wallet.types.ts
│   │   │
│   │   ├── App.tsx                      # Root component + QueryClientProvider
│   │   └── main.tsx                     # Vite entry point
│   │
│   ├── index.html                       # Vite HTML template
│   ├── vite.config.ts                   # Vite config (proxy ke backend)
│   └── tsconfig.json                    # TypeScript config untuk frontend
│
├── ⚙️ src/                              # Backend TypeScript (Express)
│   ├── routes/                          # Definisi endpoint HTTP
│   ├── controllers/                     # Request handlers
│   ├── middlewares/                     # Auth guard, validator, rate limiter
│   ├── services/                        # Business logic (swap engine, wallet)
│   ├── utils/                           # JWT helper, response formatter
│   └── index.ts                         # Bootstrap Express server
│
├── 🗄️ prisma/
│   ├── schema.prisma                    # Database models & relations
│   └── migrations/                     # Versioned migration history
│
├── 📦 dist/                             # Backend compiled output (gitignored)
├── prisma.config.ts
├── tsconfig.json                        # TypeScript config untuk backend
├── vercel.json                          # Serverless deployment config
└── package.json                         # Backend dependencies & scripts
```

---

## 🎨 Frontend Deep Dive

### Arsitektur State Management

SwapHour memisahkan dua jenis state dengan tegas:

```
┌─────────────────────────────────────────────────┐
│              State Management Strategy          │
│                                                 │
│  Server State (data dari API)                   │
│  └── TanStack Query                             │
│       ├── useQuery()   → GET /api/wallet        │
│       ├── useQuery()   → GET /api/swaps         │
│       └── useMutation() → POST/PUT/DELETE       │
│            └── onSuccess: invalidate cache      │
│                 └── UI otomatis re-fetch ✅      │
│                                                 │
│  Client State (UI-only state)                   │
│  └── React useState / useReducer                │
│       ├── Form input values                     │
│       ├── Modal open/close                      │
│       └── Toast notifications                  │
└─────────────────────────────────────────────────┘
```

### Axios Interceptor Pattern

```typescript
// services/api.ts - Sentralisasi semua HTTP config
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
});

// Request interceptor: auto-attach JWT token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Response interceptor: handle 401 globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login'; // Auto redirect
    }
    return Promise.reject(error);
  }
);
```

### React Router v6 - Protected Routes

```typescript
// router/index.tsx
const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>   {/* Redirect ke /login jika belum auth */}
        <DashboardPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/swaps/:id',
    element: (
      <ProtectedRoute>
        <SwapDetailPage />
      </ProtectedRoute>
    ),
  },
]);
```

### GSAP Animation

```typescript
// animations/hero.animation.ts
export const animateHeroEntrance = (containerRef: RefObject<HTMLDivElement>) => {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.from('.hero-title', { opacity: 0, y: 60, duration: 0.8 })
    .from('.hero-subtitle', { opacity: 0, y: 40, duration: 0.6 }, '-=0.4')
    .from('.hero-cta', { opacity: 0, scale: 0.9, duration: 0.5 }, '-=0.3')
    .from('.hero-illustration', { opacity: 0, x: 80, duration: 0.8 }, '-=0.6');

  return tl;
};
```

### Alur Lengkap Pengguna

```
Browser
  │
  ▼
Vite Dev Server / Production Build
  │
  ├── React Router v6 → match URL ke component
  │
  ├── ProtectedRoute → cek token di localStorage
  │     ├── Token ada → render halaman
  │     └── Tidak ada → redirect /login
  │
  ├── Page Component render
  │     └── TanStack Query hooks:
  │           ├── useQuery → fetch data → tampilkan / loading / error
  │           └── useMutation → aksi user → update server → invalidate cache
  │
  ├── Axios → kirim request ke backend
  │     └── Interceptor otomatis sertakan JWT header
  │
  └── GSAP → animasikan transisi dan elemen masuk
```

---

## ⚙️ Backend Deep Dive

### Request Pipeline

```
HTTP Request dari Axios (Frontend)
        │
        ▼
┌──────────────┐
│   Helmet     │  → Inject 11+ HTTP security headers
└──────┬───────┘
       │
       ▼
┌──────────────────┐
│  Rate Limiter    │  → Batasi request per IP per window
└──────┬───────────┘
       │
       ▼
┌───────────────────┐
│  Input Validator  │  → Sanitasi & validasi body/params
└──────┬────────────┘
       │
       ▼
┌──────────────┐
│  JWT Guard   │  → Verifikasi token (protected routes)
└──────┬───────┘
       │
       ▼
   Controller
       │
       ▼
    Service         → Business logic (swap engine, wallet math)
       │
       ▼
  Prisma Client     → Type-safe database queries
       │
       ▼
  PostgreSQL        → Persistent storage
```

### Database Schema

```
User ─────────────────────────────────────────────────
 id · name · email · passwordHash · createdAt

        │ 1:1                │ 1:N (as initiator)
        ▼                    ▼
      Wallet               Swap
  id · credits          id · initiatorId · receiverId
  userId                offeredSkill · requestedSkill
                         durationHours
        │ 1:N             status: PENDING | ACCEPTED
        ▼                         COMPLETED | CANCELLED
  WalletTransaction       completedAt
  id · walletId
  type: CREDIT | DEBIT
  amount · relatedSwapId
```

### Atomic Credit Transfer

```typescript
// services/swap.service.ts
// Seluruh operasi ini atomic - gagal satu, semua di-rollback
await prisma.$transaction([
  prisma.wallet.update({
    where: { userId: initiatorId },
    data: { credits: { decrement: durationHours } },
  }),
  prisma.wallet.update({
    where: { userId: receiverId },
    data: { credits: { increment: durationHours } },
  }),
  prisma.swap.update({
    where: { id: swapId },
    data: { status: 'COMPLETED', completedAt: new Date() },
  }),
  prisma.walletTransaction.createMany({
    data: [
      { walletId: initiatorWalletId, type: 'DEBIT', amount: durationHours, relatedSwapId: swapId },
      { walletId: receiverWalletId, type: 'CREDIT', amount: durationHours, relatedSwapId: swapId },
    ],
  }),
]);
```

---

## 🏃 Getting Started

Proyek ini terdiri dari dua aplikasi yang berjalan secara bersamaan:
- **Backend** - Express API di `http://localhost:5000`
- **Frontend** - React App di `http://localhost:5173` (via Vite)

### Prerequisites

| Tool | Versi Minimum | Link Download |
|------|---------------|---------------|
| **Node.js** | v18.0.0 | [nodejs.org](https://nodejs.org/) |
| **npm** | v9.0.0 | Sudah termasuk Node.js |
| **PostgreSQL** | v14.0 | [postgresql.org](https://www.postgresql.org/download/) |
| **Git** | Latest | [git-scm.com](https://git-scm.com/) |

**Cek versi yang sudah terpasang:**
```bash
node --version    # harus v18.x.x atau lebih
npm --version     # harus 9.x.x atau lebih
psql --version    # harus 14.x atau lebih
```

---

### Setup Backend

#### ① Clone repository

```bash
git clone https://github.com/Nixzouxu/SwapHour.git
cd SwapHour
```

#### ② Install backend dependencies

```bash
npm install
```

> ℹ️ Script `postinstall` otomatis menjalankan `prisma generate` setelah instalasi selesai.

#### ③ Buat database PostgreSQL

```bash
# Masuk ke psql shell
psql -U postgres

# Buat database
CREATE DATABASE swaphour_db;

# Keluar
\q
```

#### ④ Buat file `.env` di root project

```bash
touch .env        # macOS / Linux
type nul > .env   # Windows
```

Isi file `.env`:

```env
# ─── Database ─────────────────────────────────────────────────
# Ganti YOUR_PASSWORD dengan password PostgreSQL kamu
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/swaphour_db"

# ─── Authentication ───────────────────────────────────────────
JWT_SECRET="ganti_dengan_string_acak_minimal_32_karakter_disini"
JWT_EXPIRES_IN="7d"

# ─── Server ───────────────────────────────────────────────────
PORT=3000
NODE_ENV=development
```

> 💡 **Generate JWT_SECRET yang aman:**
> ```bash
> node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
> ```

#### ⑤ Jalankan migrasi database

```bash
npx prisma migrate dev --name init
```

> 🔍 Untuk melihat isi database secara visual:
> ```bash
> npx prisma studio    # buka http://localhost:5555
> ```

#### ⑥ Jalankan backend server

```bash
npm run dev
```

Backend berjalan di `http://localhost:5000` ✅

---

### Setup Frontend

Buka terminal **baru** (jangan tutup terminal backend).

#### ① Masuk ke folder frontend

```bash
cd frontend
```

#### ② Install frontend dependencies

```bash
npm install
```

#### ③ Buat file `.env` untuk frontend

```bash
touch .env        # macOS / Linux
type nul > .env   # Windows
```

Isi file `frontend/.env`:

```env
# URL backend yang sudah berjalan
VITE_API_URL=http://localhost:3000/api
```

#### ④ Jalankan frontend development server

```bash
npm run dev
```

Frontend berjalan di `http://localhost:5173` ✅

---

### Sekarang Keduanya Berjalan

```
Terminal 1 (Backend)   →   http://localhost:5000
Terminal 2 (Frontend)  →   http://localhost:5173
```

Buka browser di `http://localhost:5173` dan SwapHour siap digunakan! 🎉

---

## 📜 Available Scripts

### Backend (dari root `/`)

| Perintah | Fungsi |
|----------|--------|
| `npm run dev` | Server development dengan hot-reload |
| `npm run build` | Kompilasi TypeScript → `dist/` |
| `npm start` | Jalankan dari hasil build |
| `npx prisma generate` | Regenerate Prisma Client |
| `npx prisma migrate dev` | Buat & apply migration baru |
| `npx prisma studio` | GUI visual database |
| `npx prisma migrate reset` | ⚠️ Reset total database |

### Frontend (dari folder `frontend/`)

| Perintah | Fungsi |
|----------|--------|
| `npm run dev` | Vite dev server dengan HMR |
| `npm run build` | Build production ke `dist/` |
| `npm run preview` | Preview hasil production build |
| `npm run lint` | Jalankan ESLint |

---

## 📖 API Documentation

Akses Swagger UI di:

```
Development  →  http://localhost:3000/api-docs
Production   →  https://swap-hour-api.vercel.app/api-docs
```

### Peta Lengkap Endpoint

```
🔓 Public
├── POST  /api/auth/register      Daftar akun baru
└── POST  /api/auth/login         Login & dapatkan JWT token

🔒 Protected  (Header: Authorization: Bearer <token>)
│
├── 👤 Users
│   ├── GET   /api/users/me       Profil pengguna saat ini
│   └── PUT   /api/users/me       Update profil
│
├── 👛 Wallet
│   ├── GET   /api/wallet         Cek saldo kredit waktu
│   └── GET   /api/wallet/history Riwayat semua transaksi
│
└── 🔄 Swaps
    ├── POST  /api/swaps               Buat swap baru
    ├── GET   /api/swaps               Semua swap
    ├── GET   /api/swaps/:id           Detail swap
    ├── PUT   /api/swaps/:id/accept    Terima swap
    ├── PUT   /api/swaps/:id/complete  Selesaikan → auto-transfer kredit ✅
    └── DELETE /api/swaps/:id          Batalkan swap
```

---

## 🔒 Security

| Layer | Implementasi | Proteksi |
|-------|-------------|---------|
| **HTTP Headers** | `helmet` | XSS, clickjacking, MIME sniffing, HSTS |
| **Rate Limiting** | `express-rate-limit` | Brute-force, request flooding |
| **Input Validation** | `express-validator` | SQL injection, malformed payload |
| **Password Hashing** | `bcrypt` (6.x) | Plain-text credential exposure |
| **Authentication** | `jsonwebtoken` | Session hijacking, unauthorized access |
| **CORS** | `cors` | Restrict API access ke origin yang diizinkan |
| **Axios Interceptors** | Frontend | Auto-handle 401, centralised error management |

---

## 🧠 Engineering Decisions & Lessons

### 1. React + Vite bukan Create React App

CRA sudah deprecated dan build speed-nya lambat untuk development aktif. Vite memberikan **cold start < 300ms** dan HMR yang benar-benar instan - membuat iterasi frontend jauh lebih cepat dan menyenangkan. Untuk proyek tim dengan banyak perubahan UI, ini sangat terasa.

### 2. TanStack Query untuk Server State

Awalnya kami mencoba `useState + useEffect` untuk fetch data dari API. Masalahnya: loading state tersebar di mana-mana, cache tidak ada, dan setelah mutation data tidak otomatis update. TanStack Query menyelesaikan semua itu sekaligus - satu hook menggantikan puluhan baris boilerplate.

```tsx
// Sebelum: boilerplate tersebar
const [data, setData] = useState(null);
const [loading, setLoading] = useState(false);
useEffect(() => { fetchWallet().then(setData); }, []);

// Sesudah: TanStack Query
const { data, isLoading, error } = useQuery({
  queryKey: ['wallet'],
  queryFn: walletService.getWallet,
});
```

### 3. Axios Interceptors untuk Auth Terpusat

Daripada menyertakan `Authorization: Bearer token` di setiap Axios call secara manual, satu request interceptor menangani semuanya. Ketika token expired dan backend mengembalikan 401, response interceptor otomatis membersihkan state dan redirect ke login - tanpa perlu logika ini di setiap halaman.

### 4. GSAP bukan CSS Animations untuk Hero

CSS animations cukup untuk micro-interactions sederhana. Tapi untuk hero landing page dengan multiple elements masuk secara sequence, GSAP `timeline` memberikan kontrol presisi dan performa GPU-accelerated yang tidak bisa dicapai dengan CSS saja.

### 5. PostgreSQL + Prisma Transaction untuk Keamanan Kredit

Transfer kredit adalah operasi paling kritis. Menggunakan `prisma.$transaction` memastikan debit dan credit terjadi **secara atomik**. Jika server crash di tengah eksekusi, tidak ada kredit yang hilang atau dobel.

### 6. Monorepo: Frontend dan Backend Satu Repo

Memilih monorepo memudahkan koordinasi tim - ketika API berubah, perubahan type di backend bisa langsung terlihat bersamaan dengan update di frontend service layer. PR review lebih kontekstual karena perubahan contract API dan konsumernya ada di satu tempat.

---

## 🗺️ Roadmap

**Phase 1 - Foundation** ✅ *(Selesai)*
- [x] React 18 + TypeScript + Vite frontend
- [x] TanStack Query server state management
- [x] React Router v6 dengan protected routes
- [x] GSAP animations
- [x] Axios dengan interceptors
- [x] Express + TypeScript backend
- [x] JWT authentication
- [x] Time credit wallet engine
- [x] Swap lifecycle dengan atomic transfer
- [x] Vercel deployment

**Phase 2 - Enhanced Platform** 🔄 *(Direncanakan)*
- [ ] Rating & review post-swap
- [ ] Kategori keahlian & fitur pencarian
- [ ] Notifikasi real-time via WebSocket + React state
- [ ] Infinite scroll / pagination dengan TanStack Query
- [ ] Optimistic updates di swap actions
- [ ] Dark mode dengan CSS custom properties

**Phase 3 - Production Grade** 🔮 *(Masa Depan)*
- [ ] Unit tests: Vitest + React Testing Library (frontend)
- [ ] Integration tests: Jest + Supertest (backend)
- [ ] CI/CD pipeline via GitHub Actions
- [ ] Redis caching untuk endpoint populer
- [ ] Email notifikasi (Resend)
- [ ] PWA support (service worker + offline mode)
- [ ] Mobile app dengan React Native + Expo

---

## 🤝 Contributing

```bash
# 1. Fork repository (klik "Fork" di GitHub)

# 2. Clone fork kamu
git clone https://github.com/USERNAME_KAMU/SwapHour.git
cd SwapHour

# 3. Buat branch baru
git checkout -b feature/nama-fitur
# atau: git checkout -b fix/nama-bug

# 4. Lakukan perubahan & commit
git add .
git commit -m "feat: tambahkan fitur X"

# 5. Push dan buka Pull Request
git push origin feature/nama-fitur
```

**Commit Convention:**

| Prefix | Untuk |
|--------|-------|
| `feat:` | Fitur baru |
| `fix:` | Perbaikan bug |
| `docs:` | Dokumentasi |
| `style:` | Perubahan CSS/styling |
| `refactor:` | Refactoring tanpa ubah behavior |
| `chore:` | Konfigurasi / tooling |

**Sebelum submit PR:**
- Backend: `npm run build` harus berhasil tanpa TypeScript error
- Frontend: `npm run lint` harus bersih
- Tidak ada file `.env`, `dist/`, atau `node_modules/` dalam commit

---

## 👨‍💻 Team

Dibangun oleh empat mahasiswa **Informatika Semester 4** yang percaya bahwa proyek terbaik lahir dari masalah nyata.

<br/>

| | Nama | Peran | Fokus Utama |
|---|------|-------|-------------|
| 👨‍💼 | **Muhammad Hafidz** | Project Manager · QA · Backend Dev | Arsitektur sistem, koordinasi tim, testing, backend core |
| 👨‍💻 | **Muhammad Yazid Arrazi** | Backend Developer | API endpoints, business logic, Prisma schema & queries |
| 🎨 | **Abdan Syakura Bin Yasir** | Frontend Dev · System Design | React components, routing, system architecture design |
| 🎨 | **Aulia Lutfi** | Frontend Dev · System Design | UI/UX, GSAP animations, visual design system |

<br/>

> _"Kami bukan yang paling berpengalaman. Tapi kami adalah yang paling serius mencoba."_

---

## 📄 License

Proyek ini menggunakan **ISC License**.

```
ISC License

Copyright (c) 2026 SwapHour Team
Muhammad Hafidz · Muhammad Yazid Arrazi · Abdan Syakura Bin Yasir · Aulia Lutfi

Permission to use, copy, modify, and/or distribute this software for any purpose
with or without fee is hereby granted, provided that the above copyright notice
and this permission notice appear in all copies.
```

Lihat file [`LICENSE`](./LICENSE) untuk teks lengkap.

---

## 🙏 Acknowledgements

- [**React**](https://react.dev/) - UI library yang mengubah cara kita berpikir tentang antarmuka
- [**TanStack Query**](https://tanstack.com/query) - Server state yang tidak pernah membuat kami kecewa
- [**Vite**](https://vitejs.dev/) - Build tool yang membuktikan development bisa se-instan itu
- [**GSAP**](https://gsap.com/) - Animasi yang berjalan di 60fps tanpa kompromi
- [**Prisma**](https://www.prisma.io/) - ORM yang membuat database interaction terasa natural
- [**Express.js**](https://expressjs.com/) - Framework minimalis yang tidak pernah mengecewakan
- [**Vercel**](https://vercel.com/) - Deploy semudah `git push`
- [**Shields.io**](https://shields.io/) - Badge yang mempercantik README
- [**capsule-render**](https://github.com/kyechan99/capsule-render) - Header animasi wave
- [**MDN Web Docs**](https://developer.mozilla.org/) - Referensi web terbaik yang pernah ada
- Seluruh dosen dan teman-teman Informatika atas feedback, diskusi, dan dukungannya

---

<div align="center">

<br/>

**Ada pertanyaan atau ingin berkontribusi?**
Buka [Issue](https://github.com/Nixzouxu/SwapHour/issues) atau kirim Pull Request.

<br/>

[![GitHub Stars](https://img.shields.io/github/stars/Nixzouxu/SwapHour?style=social)](https://github.com/Nixzouxu/SwapHour)
&nbsp;&nbsp;
[![GitHub Forks](https://img.shields.io/github/forks/Nixzouxu/SwapHour?style=social)](https://github.com/Nixzouxu/SwapHour/fork)

<br/>

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:6366f1,50:8b5cf6,100:a855f7&height=120&section=footer" width="100%" />

_SwapHour © 2026 · Karena waktu adalah satu-satunya mata uang yang benar-benar setara untuk semua orang._

</div>
