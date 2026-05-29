# SwapHour — Panduan Testing 🧪

Dokumen ini menjelaskan strategi, struktur, dan cara menjalankan test suite pada proyek SwapHour Backend.

---

## 🛠️ Tech Stack Testing

| Tools | Kegunaan |
|---|---|
| **Jest** | Test runner utama |
| **ts-jest** | Kompilasi TypeScript saat test berjalan |
| **Supertest** | Simulasi HTTP request ke Express app |
| **Jest Mock** (`jest.fn()`) | Mengisolasi Prisma agar tidak menyentuh database asli |

---

## ⚙️ Konfigurasi (`jest.config.js`)

```js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.test.ts'],
  clearMocks: true,
};
```

- `preset: 'ts-jest'` — TypeScript dikompilasi otomatis tanpa perlu build terlebih dahulu
- `testEnvironment: 'node'` — Test berjalan di lingkungan Node.js (bukan browser)
- `clearMocks: true` — Semua mock di-reset otomatis sebelum setiap test case, mencegah state yang bocor antar test

---

## 📁 Struktur File Test

```
src/
└── __tests__/
    ├── auth.test.ts      # Register & Login
    ├── skill.test.ts     # CRUD Skill
    ├── swap.test.ts      # Buat & Respons Swap Request
    └── rating.test.ts    # Memberi Rating pasca-swap
```

---

## 🧠 Strategi: Mock Prisma

Semua test file **tidak menyentuh database sungguhan**. Prisma Client di-mock sepenuhnya menggunakan `jest.mock()`, sehingga:

- Test bisa berjalan tanpa koneksi database
- Setiap skenario dapat dikontrol penuh (sukses, gagal, data tidak ada)
- Eksekusi test lebih cepat dan stabil di CI/CD

```ts
// Contoh mock di awal setiap file test
jest.mock('../../src/utils/prismaClient', () => ({
  user: {
    findUnique: jest.fn(),
    create: jest.fn(),
  },
}));
```

---

## 📋 Detail Test Per Suite

### 1. `auth.test.ts` — Autentikasi

**Endpoint yang diuji:** `POST /api/auth/register`, `POST /api/auth/login`

| # | Skenario | Expected |
|---|---|---|
| ✅ | Register berhasil dengan data valid | `201` + `token` ada di response |
| ❌ | Register gagal — email sudah terdaftar | `400` + pesan "sudah terdaftar" |
| ❌ | Register gagal — format email tidak valid | `400` |
| ❌ | Register gagal — password < 6 karakter | `400` |
| ✅ | Login berhasil dengan email & password benar | `200` + `token` ada di response |
| ❌ | Login gagal — email tidak ditemukan | `401` + pesan "salah" |
| ❌ | Login gagal — password salah | `401` + pesan "salah" |

---

### 2. `skill.test.ts` — CRUD Skill

**Endpoint yang diuji:** `GET /api/skills`, `POST /api/skills`, `PUT /api/skills/:id`, `DELETE /api/skills/:id`

Token JWT valid di-generate langsung via `generateToken()` untuk simulasi user yang sudah login.

| # | Skenario | Expected |
|---|---|---|
| ✅ | Tambah skill berhasil (sudah login) | `201` + data skill di response |
| ❌ | Tambah skill gagal — tidak ada token | `401` |
| ✅ | Ambil semua skill berhasil | `200` + array + `results: 2` |
| ✅ | Filter skill berdasarkan `?category=` | `200` + data sesuai kategori |
| ✅ | Update skill milik sendiri berhasil | `200` + data ter-update |
| ❌ | Update skill milik orang lain | `403` |
| ✅ | Hapus skill milik sendiri berhasil | `204` |
| ❌ | Hapus skill milik orang lain | `403` |

---

### 3. `swap.test.ts` — Swap Request

**Endpoint yang diuji:** `POST /api/swaps`, `PATCH /api/swaps/:id/respond`

Dua token berbeda digunakan: `REQUESTER_TOKEN` dan `PROVIDER_TOKEN`, untuk mensimulasikan interaksi dua pengguna berbeda.

| # | Skenario | Expected |
|---|---|---|
| ✅ | Buat swap request — profil ≥ 80% & saldo cukup | `201` |
| ❌ | Buat swap request — profil < 80% | `403` + pesan "profil harus minimal 80%" |
| ❌ | Buat swap request — saldo tidak cukup | `400` + pesan "saldo" |
| ❌ | Buat swap request — skill milik sendiri | `400` + pesan "milik sendiri" |
| ❌ | Buat swap request — tanpa token | `401` |
| ✅ | Provider **accept** request → status jadi `active` | `200` + `status: active` |
| ✅ | Provider **reject** request → saldo requester dikembalikan | `200` + `status: rejected` |
| ❌ | Respond request — bukan provider yang berhak | `400` |

---

### 4. `rating.test.ts` — Rating

**Endpoint yang diuji:** `POST /api/ratings`

| # | Skenario | Expected |
|---|---|---|
| ✅ | Beri rating pada swap yang sudah `completed` | `201` |
| ❌ | Beri rating pada swap yang belum selesai (`active`) | `400` + pesan "sudah selesai" |
| ❌ | Skor di bawah 1 | `400` + pesan "antara 1 dan 5" |
| ❌ | Skor di atas 5 | `400` + pesan "antara 1 dan 5" |
| ❌ | User tidak terlibat dalam swap tersebut | `403` + pesan "tidak terlibat" |
| ❌ | Tanpa token | `401` |

---

## ▶️ Cara Menjalankan Test

### Install dependencies (jika belum)
```bash
npm install
```

### Jalankan semua test
```bash
npm test
```

### Mode watch (re-run otomatis saat file berubah)
```bash
npm run test:watch
```

> **Catatan:** Flag `--detectOpenHandles --forceExit` sudah dikonfigurasi di `package.json` untuk memastikan proses Jest tidak menggantung setelah test selesai.

---

## 📊 Ringkasan Coverage

| Suite | Total Test | ✅ Pass | ❌ Fail Skenario |
|---|---|---|---|
| Auth | 7 | 2 | 5 |
| Skill | 8 | 4 | 4 |
| Swap | 8 | 3 | 5 |
| Rating | 6 | 1 | 5 |
| **Total** | **29** | **10** | **19** |

> Dominasi skenario negatif (gagal) adalah hal yang baik — membuktikan validasi dan error handling diuji secara menyeluruh.
