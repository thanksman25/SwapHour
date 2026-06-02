<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:667eea,100:764ba2&height=220&section=header&text=SwapHour&fontSize=80&fontColor=ffffff&fontAlignY=38&desc=Skill%20Exchange%20Platform%20%E2%80%94%20Time%20is%20the%20Currency&descAlignY=58&descSize=20&descColor=e2e8f0" width="100%" />

<br/>

[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Express](https://img.shields.io/badge/Express-5.x-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Prisma](https://img.shields.io/badge/Prisma%20ORM-7.x-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://swap-hour-api.vercel.app)
[![License](https://img.shields.io/badge/License-ISC-6B48FF?style=for-the-badge)](./LICENSE)

<br/>

🌐 **[Live API](https://swap-hour-api.vercel.app)** &nbsp;·&nbsp;
📚 **[API Docs](https://swap-hour-api.vercel.app/api-docs)** &nbsp;·&nbsp;
🐛 **[Report Issue](https://github.com/Nixzouxu/SwapHour/issues)** &nbsp;·&nbsp;
💡 **[Request Feature](https://github.com/Nixzouxu/SwapHour/issues)**

</div>

---

<br/>

> _To every developer, recruiter, evaluator, and curious mind who has landed on this page welcome._
>
> _This is not just a repository. It is a record of four semester-4 students learning to engineer
> something that actually solves a real problem: the idea that knowledge should be accessible to
> everyone, regardless of financial ability. Pull up a chair._

<br/>

---

## 📖 Background

Pernahkah kamu ingin belajar sesuatu desain, coding, memasak, atau bahasa asing tapi terhenti karena biaya les atau jasa yang tidak terjangkau?

Itulah masalah yang kami lihat sehari-hari di lingkungan kampus. Banyak orang punya keahlian berharga yang diam-diam tidak dimanfaatkan. Di sisi lain, banyak yang sangat ingin belajar tapi tidak mampu membayar. Dua kebutuhan ini saling bersilangan, namun tidak pernah bertemu karena satu penghalang: **uang**.

Proyek ini lahir dari pertanyaan sederhana di kelas semester 4: **bagaimana jika kita hapus uang dari persamaannya?**

Jawabannya menjadi SwapHour sebuah platform pertukaran keahlian berbasis **time banking**, di mana waktu yang kamu berikan adalah mata uangnya. Tidak perlu dompet. Tidak perlu transfer bank. Cukup keahlian dan waktu.

---

## 💡 What This Project Is

SwapHour adalah **platform backend berbasis REST API** yang menggerakkan ekosistem barter keahlian antar pengguna menggunakan sistem kredit waktu (*time credits*) sebagai satuan nilai.

Bayangkan ini:

```
Kamu ahli edit video.
Seseorang butuh video diedit — 2 jam pekerjaan.
Kamu selesaikan tugasnya.

→ Kamu mendapat 2 jam kredit di wallet SwapHour kamu.

Besoknya, kamu ingin belajar desain grafis.
Kamu temukan desainer di platform, tawarkan 2 jam kredit.
Dia setuju. Proses berlangsung.

→ 2 jam kredit berpindah otomatis dari wallet kamu ke wallet-nya.
```

Tidak ada uang yang bergerak. Sistem yang bekerja. Adil untuk semua pihak.

Di balik layar, SwapHour dibangun di atas **Node.js + TypeScript + PostgreSQL** dengan arsitektur yang dirancang layaknya sistem production lengkap dengan autentikasi JWT, validasi input berlapis, keamanan HTTP headers, hingga penjadwalan transfer kredit otomatis.

---

## 📋 Table of Contents

- [Background](#-background)
- [What This Project Is](#-what-this-project-is)
- [Tech Stack](#%EF%B8%8F-tech-stack)
- [Key Features](#-key-features)
- [Project Architecture](#-project-architecture)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation & Local Run](#installation--local-run)
- [Available Scripts](#-available-scripts)
- [API Documentation](#-api-documentation)
- [Security Implementation](#-security-implementation)
- [Deployment](#-deployment)
- [Engineering Decisions & Lessons](#-engineering-decisions--lessons)
- [Roadmap](#%EF%B8%8F-roadmap)
- [Contributing](#-contributing)
- [Team](#-team)
- [License](#-license)
- [Acknowledgements](#-acknowledgements)

---

## 🛠️ Tech Stack

Setiap teknologi dipilih dengan alasan, bukan sekadar tren:

| Layer | Teknologi | Alasan Pemilihan |
|-------|-----------|-----------------|
| **Language** | TypeScript 6.x (strict mode) | Menangkap bug di compile-time, bukan saat production crash |
| **Runtime** | Node.js ≥ 18 | Non-blocking I/O cocok untuk API dengan banyak concurrent request |
| **Framework** | Express 5.x | Minimalis, mature, ekosistem middleware terlengkap |
| **Database** | PostgreSQL | ACID-compliant kritis untuk transaksi kredit yang tidak boleh gagal di tengah jalan |
| **ORM** | Prisma 7.x | Type-safe query, migration otomatis, Prisma Studio untuk debug |
| **Auth** | JWT + bcrypt 6.x | Stateless auth yang scalable; password di-hash dengan salt |
| **Validation** | express-validator 7.x | Sanitasi dan validasi setiap input sebelum menyentuh database |
| **Security** | helmet 8.x + express-rate-limit | Proteksi header HTTP + pembatasan request per IP |
| **Scheduler** | node-cron 4.x | Cron job untuk transfer kredit otomatis tanpa trigger manual |
| **API Docs** | Swagger (jsdoc + UI) | Dokumentasi interaktif langsung dari kode — selalu sinkron |
| **Logging** | morgan | Request logging untuk debugging dan monitoring |
| **Deployment** | Vercel (Serverless) | Zero-config deploy, preview environment gratis |

---

## ✨ Key Features

### Untuk Pengguna Umum

- **🔐 Daftar & Masuk dengan Aman** : Sistem registrasi dan login dengan password terenkripsi. Token JWT memastikan sesi kamu aman.
- **👛 Wallet Kredit Waktu** : Setiap akun memiliki wallet yang menyimpan saldo jam kredit. Transparent, real-time, dan tercatat.
- **🔄 Ajukan & Terima Swap** : Temukan orang dengan keahlian yang kamu butuhkan, ajukan swap, dan sepakati bersama.
- **✅ Penyelesaian Otomatis** : Setelah swap selesai dikonfirmasi, sistem langsung memindahkan kredit tanpa perlu langkah manual.

### Untuk Developer / Evaluator Teknis

- **🏗️ Layered Architecture** : Routes → Controllers → Services → Prisma. Setiap lapisan memiliki tanggung jawab tunggal yang jelas.
- **🔒 Multi-Layer Security** : Helmet (11+ HTTP headers) + rate limiter + input validator + JWT guard membentuk pertahanan berlapis.
- **⚙️ Transactional Credit Transfer** : Transfer kredit menggunakan Prisma `$transaction` : atomik, tidak ada partial execution.
- **📅 Automated Cron Scheduler** : `node-cron` menjalankan background job untuk resolusi transfer tanpa bergantung pada user action.
- **📄 OpenAPI 3.0 Documentation** : Swagger UI yang dapat langsung dicoba di browser, di-generate otomatis dari JSDoc annotations.
- **🚀 Serverless Ready** : Dikonfigurasi untuk Vercel serverless dengan rewrite rules yang tepat.

---

## 📁 Project Architecture

```
SwapHour/
│
├── 📂 src/                          # TypeScript source — entry point semua logika
│   ├── 📂 routes/                   # Definisi endpoint HTTP (auth, users, swaps, wallet)
│   ├── 📂 controllers/              # Menerima request, panggil service, kirim response
│   ├── 📂 middlewares/              # JWT guard · rate limiter · input validator
│   ├── 📂 services/                 # Business logic: swap engine, wallet operations
│   ├── 📂 utils/                    # Helper: JWT generator, response formatter, logger
│   └── 📄 index.ts                  # Bootstrap Express app, mount semua middleware & routes
│
├── 📂 prisma/
│   ├── 📄 schema.prisma             # Definisi model & relasi database
│   └── 📂 migrations/              # Riwayat versi migration (tidak pernah diedit manual)
│
├── 📂 frontend/                     # Layer antarmuka (HTML + CSS)
│
├── 📂 dist/                         # Output kompilasi TypeScript (auto-generated, gitignored)
│
├── 📄 prisma.config.ts              # Konfigurasi datasource & path migration Prisma
├── 📄 tsconfig.json                 # Compiler options TypeScript (strict mode aktif)
├── 📄 vercel.json                   # Serverless rewrite rules untuk Vercel deployment
├── 📄 package.json                  # Manifest dependencies + npm scripts
└── 📄 .gitignore                    # Excludes: dist/, node_modules/, .env, *.log
```

**Pola Arsitektur:** SwapHour menggunakan **Layered Architecture** yang memisahkan concern secara tegas:

```
HTTP Request
     │
     ▼
  [ Route ]          →  Mendefinisikan path & method
     │
     ▼
[ Controller ]       →  Orkestrasi: validasi → panggil service → format response
     │
     ▼
  [ Service ]        →  Core business logic (swap lifecycle, wallet math)
     │
     ▼
[ Prisma Client ]    →  Type-safe database queries & transactions
     │
     ▼
 [ PostgreSQL ]      →  Persistent storage
```

---

## 🏃 Getting Started

### Prerequisites

Sebelum menjalankan proyek, pastikan tools berikut sudah terinstal:

| Tool | Versi Minimum | Download |
|------|---------------|----------|
| **Node.js** | `v18.0.0` | [nodejs.org/download](https://nodejs.org/en/download) |
| **npm** | `v9.0.0` | Sudah termasuk dalam Node.js |
| **PostgreSQL** | `v14.0` | [postgresql.org/download](https://www.postgresql.org/download/) |
| **Git** | Latest | [git-scm.com](https://git-scm.com/downloads) |

**Cara cek apakah sudah terinstal:**
```bash
node --version    # Harus menampilkan v18.x.x atau lebih baru
npm --version     # Harus menampilkan 9.x.x atau lebih baru
psql --version    # Harus menampilkan 14.x atau lebih baru
git --version     # Versi berapapun oke
```

Jika salah satu belum terinstal, ikuti link download di atas terlebih dahulu sebelum lanjut.

---

### Installation & Local Run

Ikuti setiap langkah secara berurutan. Jangan skip satu pun.

#### ① Clone Repository ke komputermu

```bash
git clone https://github.com/Nixzouxu/SwapHour.git
```

Setelah selesai, masuk ke folder proyek:

```bash
cd SwapHour
```

#### ② Install semua dependencies

```bash
npm install
```

Tunggu hingga selesai. Proses ini mengunduh semua library yang dibutuhkan.
`postinstall` script akan otomatis menjalankan `prisma generate` di akhir.

> ℹ️ Jika muncul peringatan (warning), itu normal. Yang penting tidak ada **error** merah.

---

#### ③ Buat Database PostgreSQL

Buka terminal baru (jangan tutup terminal sebelumnya), lalu masuk ke PostgreSQL:

```bash
# macOS / Linux
psql -U postgres

# Windows — buka Command Prompt sebagai Administrator, lalu:
psql -U postgres
```

Di dalam psql shell, jalankan perintah ini:

```sql
CREATE DATABASE swaphour_db;
```

Seharusnya muncul pesan: `CREATE DATABASE`

Keluar dari psql:

```sql
\q
```

---

#### ④ Buat file konfigurasi `.env`

Di root folder proyek (`SwapHour/`), buat file baru bernama `.env`:

```bash
# macOS / Linux
touch .env

# Windows (Command Prompt)
type nul > .env
```

Buka file `.env` dengan teks editor apapun (Notepad, VS Code, dll), lalu isi dengan:

```env
# ─── Database Connection ──────────────────────────────────────────
# Ganti YOUR_PASSWORD dengan password PostgreSQL kamu
# Ganti swaphour_db jika kamu pakai nama database yang berbeda
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/swaphour_db"

# ─── JWT Authentication ───────────────────────────────────────────
# String acak minimal 32 karakter. Jangan pernah share ini ke siapapun!
JWT_SECRET="ganti_dengan_string_rahasia_minimal_32_karakter_disini"
JWT_EXPIRES_IN="7d"

# ─── Server Configuration ─────────────────────────────────────────
PORT=3000
NODE_ENV=development
```

> 💡 **Cara generate JWT_SECRET yang aman:**
> Buka terminal baru dan jalankan:
> ```bash
> node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
> ```
> Copy hasilnya dan paste sebagai nilai `JWT_SECRET`.

> ⚠️ **Penting:** File `.env` sudah masuk `.gitignore` — artinya tidak akan ter-upload ke GitHub. Aman.

---

#### ⑤ Jalankan Migrasi Database

Perintah ini membuat semua tabel yang dibutuhkan di database:

```bash
npx prisma migrate dev --name init
```

Tunggu hingga muncul pesan sukses. Proses ini:
- Membaca `prisma/schema.prisma`
- Membuat semua tabel di database `swaphour_db`
- Menyimpan riwayat migration di folder `prisma/migrations/`

> 🔍 **Ingin lihat isi database secara visual?** Jalankan:
> ```bash
> npx prisma studio
> ```
> Buka browser di `http://localhost:5000` kamu akan melihat semua tabel beserta datanya.

---

#### ⑥ Jalankan Server

```bash
npm run dev
```

Jika berhasil, kamu akan melihat output seperti ini di terminal:

```
[INFO] Server running on http://localhost:5000
[INFO] API Documentation: http://localhost:5000/api-docs
[INFO] Database connected successfully
```

Sekarang buka browser dan akses:

```
http://localhost:5000/api-docs
```

Kamu akan melihat Swagger UI dokumentasi interaktif di mana kamu bisa langsung mencoba semua endpoint! ✅

---

## 📜 Available Scripts

| Perintah | Fungsi |
|----------|--------|
| `npm run dev` | Jalankan server development dengan hot-reload (perubahan kode langsung terdeteksi) |
| `npm run build` | Kompilasi TypeScript ke JavaScript di folder `dist/` |
| `npm start` | Jalankan server dari hasil build (mode production) |
| `npx prisma generate` | Regenerate Prisma Client setelah schema berubah |
| `npx prisma migrate dev` | Buat dan apply migration baru ke database |
| `npx prisma studio` | Buka GUI visual untuk melihat dan mengedit data |
| `npx prisma migrate reset` | Reset total database (⚠️ semua data hilang) |

---

## 📖 API Documentation

Akses dokumentasi interaktif di Swagger UI:

```
Development  →  http://localhost:5000/api-docs
Production   →  https://swap-hour-api.vercel.app/api-docs (Tidak Nyala lagi, Tidak perlu ditest)
```

Di Swagger UI, kamu bisa langsung mencoba setiap endpoint tanpa perlu Postman.

### Peta Lengkap Endpoint

```
🔓 Publik (tidak perlu login)
├── POST  /api/auth/register        Daftar akun baru
└── POST  /api/auth/login           Login dan dapatkan token

🔒 Protected (wajib sertakan JWT token di header)
│
├── 👤 Users
│   ├── GET   /api/users/me         Lihat profil diri sendiri
│   └── PUT   /api/users/me         Update data profil
│
├── 👛 Wallet
│   ├── GET   /api/wallet           Cek saldo kredit waktu
│   └── GET   /api/wallet/history   Riwayat semua transaksi kredit
│
└── 🔄 Swaps
    ├── POST  /api/swaps             Buat pengajuan swap baru
    ├── GET   /api/swaps             Lihat semua swap yang kamu buat/terima
    ├── GET   /api/swaps/:id         Detail satu swap tertentu
    ├── PUT   /api/swaps/:id/accept  Terima pengajuan swap dari orang lain
    ├── PUT   /api/swaps/:id/complete  Tandai swap selesai → kredit auto-transfer
    └── DELETE /api/swaps/:id        Batalkan swap (sebelum diterima)
```

**Contoh: Mendaftar akun baru**
```bash
curl -X POST https://swap-hour-api.vercel.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Hafidz",
    "email": "hafidz@example.com",
    "password": "password123"
  }'
```

**Contoh: Membuat pengajuan swap**
```bash
curl -X POST https://swap-hour-api.vercel.app/api/swaps \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "targetUserId": "id-pengguna-tujuan",
    "offeredSkill": "Video Editing",
    "requestedSkill": "Graphic Design",
    "durationHours": 2
  }'
```

---

## 🔒 Security Implementation

Keamanan bukan tambahan di akhir — ia dirancang dari awal sebagai bagian dari arsitektur:

```
Request Masuk
      │
      ▼
┌─────────────┐
│   Helmet    │  → Inject 11+ security HTTP headers
│             │    (X-Frame-Options, CSP, HSTS, dll)
└──────┬──────┘
       │
       ▼
┌──────────────────┐
│  Rate Limiter    │  → Batasi maks. N request per IP per window
│                  │    Proteksi dari brute-force & DDoS
└──────┬───────────┘
       │
       ▼
┌───────────────────┐
│  Input Validator  │  → Sanitasi & validasi req.body / req.params
│                   │    Cegah SQL injection & malformed data
└──────┬────────────┘
       │
       ▼
┌──────────────┐
│  JWT Guard   │  → Verifikasi signature & expiry token
│              │    Reject request tanpa token valid
└──────┬───────┘
       │
       ▼
   Controller
```

| Mekanisme | Library | Perlindungan |
|-----------|---------|-------------|
| HTTP Headers | `helmet` | Clickjacking, XSS, MIME sniffing, dll |
| Rate Limiting | `express-rate-limit` | Brute-force attack, request flooding |
| Input Validation | `express-validator` | Injection attack, malformed payload |
| Password | `bcrypt` | Plain-text password exposure di database |
| Authentication | `jsonwebtoken` | Session hijacking, unauthorized access |





---

## 🧠 Engineering Decisions & Lessons

Bagian ini adalah yang paling jujur dari seluruh dokumentasi ini keputusan teknis yang kami buat, mengapa kami membuatnya, dan apa yang kami pelajari dari konsekuensinya.

### 1. PostgreSQL atas MongoDB

SwapHour membutuhkan jaminan bahwa ketika transfer kredit dieksekusi, operasi debit dan kredit **selalu terjadi bersama atau tidak sama sekali**. MongoDB transactions ada, tapi PostgreSQL adalah pilihan lebih natural untuk data relasional dengan foreign key constraints yang ketat.

```typescript
// Transfer kredit: atomik dengan Prisma $transaction
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
    data: { status: 'COMPLETED' },
  }),
]);
// Jika salah satu gagal → semua di-rollback otomatis
```

### 2. TypeScript Strict Mode dari Hari Pertama

Keputusan untuk mengaktifkan `"strict": true` dan `"noUncheckedIndexedAccess": true` di `tsconfig.json` membuat development lebih lambat di awal, tapi mengeliminasi puluhan potensi `undefined is not a function` sebelum kode bahkan dijalankan.

### 3. Layered Architecture bukan Flat Structure

Di proyek kecil, flat structure (`routes/everything.ts`) terasa lebih cepat. Tapi ketika fitur swap lifecycle mulai kompleks, pemisahan `routes → controllers → services` terbukti krusial. Tiap anggota tim bisa mengerjakan layer berbeda tanpa konflik.

### 4. Tantangan: Express di Vercel Serverless

Express diasumsikan berjalan sebagai persistent server dengan port terbuka. Vercel serverless tidak begitu. Solusinya adalah konfigurasi `vercel.json` rewrite + memastikan tidak ada state yang bergantung pada memori server yang persisten.

### 5. node-cron vs Event-Driven Transfer

Awalnya transfer kredit direncanakan dipicu langsung saat endpoint `/complete` dipanggil. Tapi untuk ketahanan terhadap network failure di tengah jalan, kami menambahkan cron job sebagai failsafe yang memverifikasi dan menyelesaikan swap yang statusnya stuck.

---

## 🗺️ Roadmap

Visi jangka panjang SwapHour melampaui tugas kuliah:

**Phase 1 — Core Platform** ✅ *(Selesai)*
- [x] JWT Authentication system
- [x] Time credit wallet engine
- [x] Swap lifecycle (propose → accept → complete)
- [x] Automated cron-based credit transfer
- [x] Swagger API documentation
- [ ] Vercel deployment (Tidak jadi)

**Phase 2 — Richer User Experience** 🔄 *(Direncanakan)*
- [ ] Rating & review system setelah swap selesai
- [ ] Kategori keahlian dengan sistem pencarian & filter
- [ ] Notifikasi real-time via WebSocket
- [ ] Profil pengguna dengan portofolio keahlian
- [ ] Riwayat swap dengan pagination

**Phase 3 — Production Maturity** 🔮 *(Masa Depan)*
- [ ] Unit & integration testing (Jest + Supertest)
- [ ] CI/CD pipeline via GitHub Actions
- [ ] Redis caching untuk endpoint yang sering diakses
- [ ] Admin moderation dashboard
- [ ] Frontend penuh berbasis React
- [ ] Email notification (Resend / Nodemailer)
- [ ] Mobile app (React Native)

---

## 🤝 Contributing

Proyek ini terbuka untuk kontribusi. Apakah itu bug fix kecil, ide fitur, atau perbaikan dokumentasi — semua diterima dengan senang hati.

```bash
# 1. Fork repository ini (klik tombol Fork di GitHub)

# 2. Clone fork milikmu
git clone https://github.com/USERNAME_KAMU/SwapHour.git
cd SwapHour

# 3. Buat branch baru dengan nama yang deskriptif
git checkout -b feature/nama-fitur
# atau
git checkout -b fix/deskripsi-bug

# 4. Lakukan perubahan, lalu commit
git add .
git commit -m "feat: deskripsi singkat apa yang ditambahkan"

# 5. Push ke fork kamu
git push origin feature/nama-fitur

# 6. Buka Pull Request dari GitHub
```

**Panduan Commit Message:**

| Prefix | Digunakan Untuk |
|--------|----------------|
| `feat:` | Menambahkan fitur baru |
| `fix:` | Memperbaiki bug |
| `docs:` | Perubahan dokumentasi |
| `refactor:` | Refactoring tanpa mengubah behavior |
| `chore:` | Update konfigurasi / tooling |

**Sebelum Submit PR, pastikan:**
- Tidak ada TypeScript error (`npm run build` berhasil)
- Tidak memasukkan file `.env` atau `dist/` ke commit
- Mengikuti pola arsitektur yang sudah ada

---

## 👨‍💻 Team

SwapHour dibangun oleh empat mahasiswa Teknik Informatika Semester 4 yang percaya bahwa proyek terbaik lahir dari masalah nyata.

<br/>

| | Nama | Peran | Kontribusi |
|---|------|-------|-----------|
| 👨‍💼 | **Muhammad Hafidz** | Project Manager · QA · Backend Dev | Arsitektur sistem, koordinasi tim, quality assurance, backend core |
| 👨‍💻 | **Muhammad Yazid Arrazi** | Backend Developer | Implementasi API endpoints, business logic, database queries |
| 🎨 | **Abdan Syakura Bin Yasir** | Frontend Dev · System Design | Desain antarmuka, user flow, system architecture diagram |
| 🎨 | **Aulia Lutfi** | Frontend Dev · System Design | UI implementation, user experience, visual system design |

<br/>

> _"Kami bukan yang paling berpengalaman. Tapi kami adalah yang paling serius mencoba."_

---

## 📄 License

Proyek ini didistribusikan di bawah **ISC License**  izin terbuka yang memperbolehkan penggunaan, modifikasi, dan distribusi selama kredit dicantumkan.

```
ISC License

Copyright (c) 2025 SwapHour Team
(Muhammad Hafidz, Muhammad Yazid Arrazi, Abdan Syakura Bin Yasir, Aulia Lutfi)

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
```

---

## 🙏 Acknowledgements

Proyek ini tidak akan ada tanpa bahu-membahu dengan ekosistem open source yang luar biasa:

- [**Prisma**](https://www.prisma.io/) — ORM yang membuat database relationship terasa intuitif
- [**Express.js**](https://expressjs.com/) — Minimalist framework yang tidak pernah mengecewakan
- [**Vercel**](https://vercel.com/) — Deploy semudah `git push`, gratis untuk mahasiswa
- [**Swagger UI**](https://swagger.io/tools/swagger-ui/) — Dokumentasi API yang bisa langsung dicoba
- [**Shields.io**](https://shields.io/) — Badge generator untuk README yang lebih hidup
- [**capsule-render**](https://github.com/kyechan99/capsule-render) — Wave header yang mempercantik tampilan
- [**Best-README-Template**](https://github.com/othneildrew/Best-README-Template) — Inspirasi struktur dokumentasi profesional
- Seluruh dosen dan teman-teman Informatika yang menjadi sumber semangat dan feedback

---

<div align="center">

<br/>

**Ada pertanyaan? Buka [Issue](https://github.com/Nixzouxu/SwapHour/issues) atau hubungi tim kami.**

<br/>

[![GitHub Stars](https://img.shields.io/github/stars/Nixzouxu/SwapHour?style=social)](https://github.com/Nixzouxu/SwapHour)
&nbsp;&nbsp;
[![GitHub Forks](https://img.shields.io/github/forks/Nixzouxu/SwapHour?style=social)](https://github.com/Nixzouxu/SwapHour/fork)

<br/>

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:667eea,100:764ba2&height=120&section=footer" width="100%" />

_SwapHour © 2026 Karena waktu adalah satu-satunya mata uang yang benar-benar setara untuk semua orang._

</div>
