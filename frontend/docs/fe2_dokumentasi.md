# SwapHour FE-2 — Dokumentasi Halaman & Komponen

**Branch:** `feat/fe2-core-app`  
**Developer:** FE-2  
**Terakhir diperbarui:** 2026-05-27

---

## Struktur File yang Dibuat FE-2

```
src/
├── lib/
│   ├── apiClient.ts       — Axios instance + auth header + 401 redirect
│   └── auth.ts            — Helper localStorage (token, user)
├── types/
│   └── index.ts           — TypeScript interfaces (User, Skill, SwapRequest, dll)
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx / .css   — Bilah samping (Sidebar) kiri dengan navigasi dan menu
│   │   ├── Header.tsx / .css    — Bar atas (Header) kanan dengan info profil & saldo jam
│   │   └── AppLayout.tsx / .css — Grid layout utama (Sidebar + Header + Content)
│   ├── ui/
│   │   ├── NotifBadge.tsx       — Badge merah notifikasi unread
│   │   └── LoadingSkeleton.tsx / .css — Skeleton loading
│   ├── SkillCard.tsx / .css     — Kartu skill katalog
│   └── SwapCard.tsx / .css      — Kartu swap request
└── pages/
    ├── Login.tsx / .css          — Placeholder login (FE-1 scope)
    ├── Dashboard.tsx / .css      — /dashboard
    ├── SkillCatalog.tsx / .css   — /skills
    ├── SkillDetail.tsx / .css    — /skills/:id
    ├── Swaps.tsx / .css          — /swaps
    ├── Notifications.tsx / .css  — /notifications
    └── Wallet.tsx / .css         — /wallet
```

---

## Halaman-Halaman FE-2

### 1. Dashboard (`/dashboard`)
- Greeting dinamis (selamat pagi/siang/malam)
- Kartu saldo credit_hours dengan gradient hijau
- Progress bar kelengkapan profil
- 4 stat counter: Menunggu / Aktif / Selesai / Notif Baru
- Quick link cards ke semua section
- Daftar 4 aktivitas swap terbaru
- **GSAP:** stagger animasi kartu masuk dari bawah (`y:30 → 0`)
- **React Query:** `staleTime: 5 menit` untuk profil, `2 menit` untuk swap

### 2. Katalog Skill (`/skills`)
- Search bar dengan **debounce 500ms** — 1 ketuk = 1 request
- Tab filter kategori (pill style)
- Grid skill cards dengan loading skeleton
- **GSAP:** scale `0.95 → 1` dengan stagger `0.05s`
- **React Query:** `staleTime: 5 menit`

### 3. Detail Skill + Request Swap (`/skills/:id`)
- Layout 2 kolom: info skill (kiri) + panel swap (kanan, sticky)
- Cek saldo: warna merah jika tidak cukup
- Cek kelengkapan profil: warning jika < 80%
- Cek skill sendiri: disabled jika milik user sendiri
- Textarea notes (opsional)
- Tombol `disabled={isSubmitting}` — **aturan wajib backend**
- Pesan sukses/gagal dari API

### 4. Swap Saya (`/swaps`)
- Tab "Request Masuk" (provider) dan "Request Keluar" (requester)
- Badge angka pending di tab
- Tombol **Terima / Tolak** untuk incoming pending
- Tombol **Tandai Selesai** untuk swap active
- Indicator siapa yang sudah konfirmasi selesai

### 5. Notifikasi (`/notifications`)
- **Auto-refresh setiap 30 detik** (`refetchInterval: 30000`)
- Background pale green untuk notifikasi belum dibaca
- Titik hijau di kiri untuk notif baru
- Timestamp relatif: "5 menit lalu", "Kemarin", dll.
- Klik notif / tombol ✓ untuk mark as read
- Tombol "Tandai Semua Dibaca"

### 6. Wallet (`/wallet`)
- Kartu saldo besar dengan gradient hijau gelap
- Penjelasan sistem kredit (4 poin)
- Riwayat transaksi dengan ikon + warna per tipe (credit/debit/hold/release)
- Shortcut ke Katalog Skill

---

## Komponen Shared

| Komponen | File | Fungsi |
|---|---|---|
| `Sidebar` | `layout/Sidebar.tsx` | Nav samping kiri (Dashboard, Wallet, Exchange, Network, Analytics) + tombol post skill + Settings & Logout |
| `Header` | `layout/Header.tsx` | Bar atas kanan (Docs/API/Community links, saldo jam raw green, bel notifikasi unread, avatar & dropdown) |
| `AppLayout` | `layout/AppLayout.tsx` | Wrapper layout utama (Sidebar + Header + Main Content Outlet) |
| `SkillCard` | `SkillCard.tsx` | Kartu katalog skill |
| `SwapCard` | `SwapCard.tsx` | Kartu swap + tombol aksi kondisional |
| `NotifBadge` | `ui/NotifBadge.tsx` | Badge merah notifikasi unread |
| `LoadingSkeleton` | `ui/LoadingSkeleton.tsx` | Skeleton animasi (card/row/text/circle) |

---

## API Endpoints yang Digunakan

| Endpoint | Method | Digunakan di |
|---|---|---|
| `/auth/login` | POST | Login page |
| `/users/profile` | GET | Dashboard, SkillDetail, Navbar |
| `/skills` | GET | SkillCatalog |
| `/skills/:id` | GET | SkillDetail |
| `/swaps` | GET | Dashboard, Swaps |
| `/swaps` | POST | SkillDetail (request swap) |
| `/swaps/:id/respond` | PATCH | Swaps (terima/tolak) |
| `/swaps/:id/complete` | PATCH | Swaps (tandai selesai) |
| `/notifications` | GET | Notifications, Navbar |
| `/notifications/:id/read` | PATCH | Notifications |
| `/wallet/transactions` | GET | Wallet (opsional, fallback jika belum ada) |

---

## Aturan Backend yang Dipatuhi

| # | Aturan | Implementasi |
|---|---|---|
| 1 | Cache data publik dengan React Query | `staleTime: 5 * 60 * 1000` di semua query |
| 2 | Debounce search 500ms | `useDebounce` hook custom di SkillCatalog |
| 3 | Kunci tombol saat request berjalan | `disabled={isSubmitting}` di semua form submit |

---

## Design System & Aesthetica (Premium Version)

- **Typography:**
  - **Heading:** Sora (Google Fonts) — modern, geometric, and bold.
  - **Body:** DM Sans (Google Fonts) — clean and highly readable.
- **Color Palette:**
  - **Primary Green:** `#1A6B4A` / hover: `#2D9E6F`
  - **Gold Accents:** `#F0A500` (CTA, ratings, highlighted icons, card gradients)
  - **Dark Base BG:** `#0d2e1a` (deep forest green) and `#061a0f` (deepest green orb source)
  - **Radial Glow Effects:** Radial green and gold lighting sources attached to body background and card highlights.
- **Glassmorphism Spec:**
  - **Surface BG:** `rgba(255, 255, 255, 0.06)` (cards) and `rgba(13, 46, 26, 0.7)` (floating panels/navbar)
  - **Frosted Blur:** `blur(18px)` or `blur(24px)` for maximum depth.
  - **Borders:** Thin transparent borders (`rgba(255, 255, 255, 0.12)`) and gold frosted border highlights (`rgba(240, 165, 0, 0.35)`).
- **GSAP Orchestrated Animations:**
  - **Dashboard:** Hero texts slide-up stagger, floating credit card (sine loop), credit hours counter animation, quick access cards stagger, recent activity slide-in.
  - **Skill Catalog:** Scale-in stagger animation for SkillCards upon load/search/category filtering.
  - **Skill Detail:** Staggered fade-up and slide-in breadcrumb, main card detail, and request swap sidebar.
  - **Swaps:** Active tab indicator dot, exit-enter slide-up stagger for swap cards upon tab change.
  - **Notifications:** Staggered list entrance slide-in.
  - **Wallet:** Header fade-up, credit balance card zoom-in, info list stagger, and transaction items slide-in.

---

## Git — Rekomendasi Urutan Commit per Fitur

Kamu bisa mencicil commit per fitur atau halaman dengan menggunakan git command berikut:

1. **Setup dependencies & global styles**
   ```bash
   git add package.json package-lock.json src/index.css index.html
   git commit -m "chore: setup dependencies, fonts, dan premium dark glassmorphism design system"
   ```

2. **Shared Layout, Routing & Components**
   ```bash
   git add src/App.tsx src/components/layout/AppLayout.tsx src/components/layout/AppLayout.css src/components/layout/Sidebar.tsx src/components/layout/Sidebar.css src/components/layout/Header.tsx src/components/layout/Header.css src/components/ui/LoadingSkeleton.tsx src/components/ui/LoadingSkeleton.css src/components/ui/NotifBadge.tsx src/components/SkillCard.tsx src/components/SkillCard.css src/components/SwapCard.tsx src/components/SwapCard.css src/lib/apiClient.ts src/lib/auth.ts src/types/index.ts
   git commit -m "feat: tambah routing layout dan shared components (Sidebar, Header, SkillCard, SwapCard, Skeleton)"
   ```

3. **Dashboard Page**
   ```bash
   git add src/pages/Dashboard.tsx src/pages/Dashboard.css
   git commit -m "feat: tambah halaman dashboard dengan GSAP counter dan floating card"
   ```

4. **Katalog Skill Page**
   ```bash
   git add src/pages/SkillCatalog.tsx src/pages/SkillCatalog.css
   git commit -m "feat: tambah halaman katalog skill dengan filter kategori dan search debounce"
   ```

5. **Detail Skill Page**
   ```bash
   git add src/pages/SkillDetail.tsx src/pages/SkillDetail.css
   git commit -m "feat: tambah halaman detail skill dengan GSAP entrance dan panel request swap"
   ```

6. **Notifikasi Page**
   ```bash
   git add src/pages/Notifications.tsx src/pages/Notifications.css
   git commit -m "feat: tambah halaman notifikasi dengan auto-refresh 30s"
   ```

7. **Swap Saya Page**
   ```bash
   git add src/pages/Swaps.tsx src/pages/Swaps.css
   git commit -m "feat: tambah halaman swap saya dengan filter tab masuk/keluar"
   ```

8. **Wallet Page**
   ```bash
   git add src/pages/Wallet.tsx src/pages/Wallet.css
   git commit -m "feat: tambah halaman wallet dengan list transaksi jam kredit"
   ```

9. **Dokumentasi FE-2**
   ```bash
   git add frontend/docs/fe2_dokumentasi.md
   git commit -m "docs: tambah dokumentasi lengkap fitur dan halaman FE-2"
   ```

