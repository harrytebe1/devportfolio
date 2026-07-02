# Product Backlog
## Personal Portfolio Web Platform

**Versi:** 1.0
**Tanggal:** 24 Juni 2026
**Referensi:** PDD v1.0, PRD v1.0

---

## 1. Struktur Backlog

Backlog dipecah menjadi **5 Epic**, masing-masing berisi task konkret yang bisa langsung dikerjakan secara paralel. Estimasi dalam **poin (1 poin ≈ 1–2 jam kerja fokus)**.

Urutan epic mengikuti dependency teknis: backend & data layer dulu, baru frontend yang mengonsumsinya — supaya saat UI dibangun, API sudah bisa langsung diuji nyata (bukan dummy data).

---

## Epic 1 — Project Setup & Foundation

| ID | Task | Estimasi | Prioritas |
|---|---|---|---|
| T1.1 | Inisialisasi repo (frontend + backend, 2 folder/monorepo) | 1 | Must |
| T1.2 | Setup Vite + React + Tailwind CSS di frontend | 2 | Must |
| T1.3 | Install & konfigurasi Aceternity UI (dependency Framer Motion, dll) | 1 | Must |
| T1.4 | Setup Express project (struktur folder: routes, controllers, models, middlewares) | 2 | Must |
| T1.5 | Setup project Supabase (buat tabel: projects, skills, messages, admins) | 2 | Must |
| T1.6 | Koneksi Express ke Supabase (Postgres client / Supabase JS client) | 2 | Must |
| T1.7 | Setup environment variables (.env) untuk kedua sisi + .gitignore | 1 | Must |
| T1.8 | Setup Axios instance (baseURL, interceptor) di frontend | 1 | Must |

**Subtotal: 12 poin**

---

## Epic 2 — Backend: RESTful API & Auth

| ID | Task | Ref | Estimasi | Prioritas |
|---|---|---|---|---|
| T2.1 | Buat tabel & seed data awal (Project, Skill dummy) | FR-01–04 | 2 | Must |
| T2.2 | Endpoint `GET /api/projects` & `GET /api/projects/:id` | FR-02 | 2 | Must |
| T2.3 | Endpoint `POST/PUT/DELETE /api/projects` (protected) | FR-11 | 3 | Must |
| T2.4 | Endpoint `GET /api/skills` | FR-03 | 1 | Must |
| T2.5 | Endpoint `POST/PUT/DELETE /api/skills` (protected) | FR-12 | 3 | Must |
| T2.6 | Endpoint `POST /api/messages` (contact form, public) | FR-05 | 2 | Must |
| T2.7 | Endpoint `GET /api/messages` & `DELETE /api/messages/:id` (protected) | FR-13 | 2 | Should |
| T2.8 | Buat akun admin awal (hash password dgn bcrypt, insert manual/seed) | NFR-03 | 1 | Must |
| T2.9 | Endpoint `POST /api/auth/login` + generate JWT | FR-07 | 3 | Must |
| T2.10 | Middleware `verifyToken` untuk melindungi endpoint admin | FR-08 | 2 | Must |
| T2.11 | Validasi input (express-validator/Joi) di semua endpoint POST/PUT | FR-15 | 3 | Must |
| T2.12 | Global error handler middleware (response JSON konsisten) | FR-15 | 2 | Must |
| T2.13 | Setup CORS untuk komunikasi dengan domain Vercel | – | 1 | Must |

**Subtotal: 27 poin**

---

## Epic 3 — Frontend: Public Site

| ID | Task | Ref | Estimasi | Prioritas |
|---|---|---|---|---|
| T3.1 | Layout dasar (Navbar, Footer, routing react-router) | US-01 | 2 | Must |
| T3.2 | Section Hero/About (statis, styling Aceternity) | FR-01 | 3 | Must |
| T3.3 | Section Projects — fetch via Axios, render card list | FR-02 | 4 | Must |
| T3.4 | Detail/modal Project (opsional, jika ingin halaman detail) | FR-02 | 2 | Should |
| T3.5 | Section Skills — fetch & render per kategori | FR-03 | 2 | Must |
| T3.6 | Section Experience/Timeline (data statis) | FR-04 | 2 | Should |
| T3.7 | Contact Form + integrasi `POST /api/messages` + notifikasi sukses/gagal | FR-05, FR-06 | 3 | Must |
| T3.8 | Loading state & error fallback UI di semua section yang fetch data | FR-16 | 2 | Must |
| T3.9 | Responsive styling — breakpoint mobile/tablet/desktop di semua section | NFR-01 | 3 | Must |

**Subtotal: 23 poin**

---

## Epic 4 — Frontend: Admin Dashboard

| ID | Task | Ref | Estimasi | Prioritas |
|---|---|---|---|---|
| T4.1 | Halaman Login Admin + simpan token (cookie/localStorage) | FR-10, US-07 | 3 | Must |
| T4.2 | Protected Route wrapper (redirect ke login jika token invalid/expired) | FR-14 | 2 | Must |
| T4.3 | Dashboard layout (sidebar/menu: Projects, Skills, Messages) | – | 2 | Must |
| T4.4 | CRUD UI untuk Projects (table/list + form tambah/edit + konfirmasi hapus) | US-08 | 4 | Must |
| T4.5 | CRUD UI untuk Skills | US-09 | 3 | Must |
| T4.6 | List Messages (read-only, opsional delete) | US-10 | 2 | Should |
| T4.7 | Auto-logout / redirect saat token expired (interceptor Axios 401) | US-11 | 2 | Should |
| T4.8 | Responsive styling untuk dashboard (minimal tablet & desktop) | NFR-01 | 2 | Should |

**Subtotal: 20 poin**

---

## Epic 5 — Polish, Testing & Deployment

| ID | Task | Ref | Estimasi | Prioritas |
|---|---|---|---|---|
| T5.1 | Cross-browser & responsive check (Chrome, Firefox, berbagai device size) | NFR-08 | 2 | Must |
| T5.2 | Uji semua acceptance criteria di PRD (manual test checklist) | Section 8 PRD | 3 | Must |
| T5.3 | Error boundary di React (cegah blank screen saat exception) | NFR-02 | 2 | Must |
| T5.4 | Setup project di Railway, environment variables produksi | – | 2 | Must |
| T5.5 | Deploy backend ke Railway, uji endpoint via Postman/Thunder Client | – | 2 | Must |
| T5.6 | Setup project di Vercel, sambungkan ke repo frontend | – | 1 | Must |
| T5.7 | Deploy frontend ke Vercel, set `VITE_API_BASE_URL` ke URL Railway | – | 1 | Must |
| T5.8 | Final smoke test end-to-end di environment production | – | 2 | Must |
| T5.9 | Tulis README (cara run lokal, struktur project, link demo) | – | 2 | Should |

**Subtotal: 17 poin**

---

## 2. Rencana Sprint (Estimasi)

| Sprint | Fokus | Epic | Estimasi Poin |
|---|---|---|---|
| Sprint 1 | Foundation + Backend Core | Epic 1, Epic 2 | 39 |
| Sprint 2 | Public Site | Epic 3 | 23 |
| Sprint 3 | Admin Dashboard | Epic 4 | 20 |
| Sprint 4 | Polish, Test, Deploy | Epic 5 | 17 |

**Total: 99 poin** — dengan asumsi ±1.5–2 jam/poin, total estimasi **±150–200 jam** kerja efektif. Bisa dipercepat signifikan dengan pembagian tugas yang terstruktur untuk task implementasi (T2.x, T3.x, T4.x), sementara tim fokus pada review, testing, dan keputusan desain.

## 3. Definition of Done (DoD)

Sebuah task dianggap selesai jika:
- Kode berjalan tanpa error di local dev environment
- Sudah diuji manual sesuai acceptance criteria terkait (jika ada)
- Tidak menyebabkan crash/blank screen pada fitur lain
- Sudah responsive minimal di 3 breakpoint utama
- Sudah di-commit dengan message yang jelas

---

*Dokumen selanjutnya: UI/UX Specification Document (UXD) — sebelum mulai desain UI.*
