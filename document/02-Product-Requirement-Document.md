# Product Requirement Document (PRD)
## Personal Portfolio Web Platform

**Versi:** 1.0
**Tanggal:** 24 Juni 2026
**Referensi:** Product Definition Document v1.0

---

## 1. Tujuan Dokumen

Menjabarkan kebutuhan fungsional dan non-fungsional secara rinci, spesifikasi RESTful API, serta model data, sebagai acuan teknis untuk tim developer saat masuk fase development.

## 2. Ringkasan Arsitektur

```
[ React (Vite) + Tailwind + Aceternity UI ]  --Axios-->  [ Express RESTful API ]  --->  [ Supabase (PostgreSQL) ]
        Deploy: Vercel                              Deploy: Railway              Managed oleh Supabase
```

- Frontend dan backend di-deploy terpisah, berkomunikasi via HTTP/JSON.
- Autentikasi admin menggunakan JWT yang diterbitkan oleh Express, disimpan di client (HttpOnly cookie atau localStorage — ditentukan di tahap desain teknis).

## 3. User Stories

### Persona: Visitor / Rekruter
| ID | User Story | Prioritas |
|---|---|---|
| US-01 | Sebagai visitor, saya ingin melihat ringkasan profil di halaman utama agar cepat memahami siapa pemilik portofolio. | Must |
| US-02 | Sebagai visitor, saya ingin melihat daftar proyek lengkap dengan deskripsi, tech stack, dan link demo/repo. | Must |
| US-03 | Sebagai visitor, saya ingin melihat daftar skill yang dikuasai, dikategorikan (bahasa, framework, tools). | Must |
| US-04 | Sebagai visitor, saya ingin melihat riwayat pengalaman/pendidikan dalam bentuk timeline. | Should |
| US-05 | Sebagai visitor, saya ingin mengirim pesan/kontak langsung dari web tanpa harus membuka aplikasi email. | Must |
| US-06 | Sebagai visitor, saya ingin mengakses web dengan nyaman dari HP, tablet, maupun desktop. | Must |

### Persona: Admin (Pemilik)
| ID | User Story | Prioritas |
|---|---|---|
| US-07 | Sebagai admin, saya ingin login dengan aman sebelum mengakses dashboard. | Must |
| US-08 | Sebagai admin, saya ingin menambah, mengedit, dan menghapus data proyek tanpa mengubah kode. | Must |
| US-09 | Sebagai admin, saya ingin menambah, mengedit, dan menghapus data skill. | Must |
| US-10 | Sebagai admin, saya ingin melihat daftar pesan yang dikirim visitor melalui contact form. | Must |
| US-11 | Sebagai admin, saya ingin sesi login otomatis berakhir (expired token) demi keamanan. | Should |

## 4. Functional Requirements (FR)

### 4.1 Public Site
- **FR-01**: Sistem menampilkan halaman Hero/About berisi nama, headline, deskripsi singkat.
- **FR-02**: Sistem menampilkan daftar Project yang diambil dari API (`GET /api/projects`), masing-masing menampilkan judul, deskripsi, tech stack, thumbnail, link demo, dan link repo.
- **FR-03**: Sistem menampilkan daftar Skill yang diambil dari API (`GET /api/skills`), dikelompokkan per kategori.
- **FR-04**: Sistem menampilkan Experience/Timeline (data statis/seed, tidak melalui admin CRUD pada v1).
- **FR-05**: Sistem menyediakan form kontak (nama, email, pesan) yang mengirim data ke `POST /api/messages`.
- **FR-06**: Sistem menampilkan notifikasi sukses/gagal saat form kontak dikirim, tanpa reload halaman penuh.

### 4.2 Autentikasi
- **FR-07**: Sistem menyediakan endpoint login admin (`POST /api/auth/login`) yang memverifikasi kredensial dan mengembalikan JWT.
- **FR-08**: Sistem menolak akses ke endpoint CRUD admin (Projects/Skills create-update-delete, Messages read) tanpa token valid (`401 Unauthorized`).
- **FR-09**: Token JWT memiliki masa berlaku (expiry) — direkomendasikan 1–24 jam.

### 4.3 Admin Dashboard
- **FR-10**: Sistem menyediakan halaman login khusus admin, terpisah dari routing publik.
- **FR-11**: Setelah login, admin dapat melihat, menambah, mengedit, dan menghapus data Project.
- **FR-12**: Setelah login, admin dapat melihat, menambah, mengedit, dan menghapus data Skill.
- **FR-13**: Setelah login, admin dapat melihat daftar pesan masuk dari contact form (read-only minimal; delete opsional).
- **FR-14**: Sistem mengarahkan kembali ke halaman login jika token tidak valid/kedaluwarsa saat mengakses dashboard.

### 4.4 Error Handling
- **FR-15**: Setiap request ke API yang gagal (validasi, server error, not found) mengembalikan response JSON terstruktur (`{ success, message }`) dengan HTTP status code yang sesuai — tidak boleh menyebabkan frontend crash.
- **FR-16**: Frontend menampilkan fallback UI (misal toast/error state) ketika API gagal diakses, bukan blank page.

## 5. Non-Functional Requirements (NFR)

| ID | Kategori | Requirement |
|---|---|---|
| NFR-01 | Responsivitas | Layout menyesuaikan minimal 3 breakpoint: mobile (≤480px), tablet (~768px), desktop (≥1024px) |
| NFR-02 | Stabilitas | Tidak ada unhandled exception yang menyebabkan blank screen/crash pada fitur utama |
| NFR-03 | Keamanan | Password admin di-hash (bcrypt) sebelum disimpan; JWT secret disimpan via environment variable |
| NFR-04 | Performa | Initial load halaman publik < 3 detik pada koneksi standar (4G) |
| NFR-05 | Skalabilitas Arsitektur | Pemisahan FE/BE memungkinkan scaling independen; API stateless (auth via token, bukan session server) |
| NFR-06 | Maintainability | Kode terstruktur per modul (routes, controllers, models) mengikuti konvensi Express umum |
| NFR-07 | Konvensi REST | URL endpoint menggunakan noun jamak, resource-based, tanpa verb (`/projects` bukan `/getProjects`) |
| NFR-08 | Cross-browser | Berfungsi baik di Chrome, Firefox, Edge versi terbaru |

## 6. Spesifikasi RESTful API

**Base URL:** `https://<railway-app>.up.railway.app/api`

### 6.1 Auth
| Method | Endpoint | Auth | Body | Response |
|---|---|---|---|---|
| POST | `/auth/login` | Public | `{ email, password }` | `201 { token, expiresIn }` / `401` |

### 6.2 Projects
| Method | Endpoint | Auth | Body | Response |
|---|---|---|---|---|
| GET | `/projects` | Public | – | `200 [ {id, title, description, techStack, thumbnailUrl, demoUrl, repoUrl, createdAt} ]` |
| GET | `/projects/:id` | Public | – | `200 {...}` / `404` |
| POST | `/projects` | Admin (JWT) | `{ title, description, techStack, thumbnailUrl, demoUrl, repoUrl }` | `201 {...}` |
| PUT | `/projects/:id` | Admin (JWT) | field yang diubah | `200 {...}` / `404` |
| DELETE | `/projects/:id` | Admin (JWT) | – | `204` / `404` |

### 6.3 Skills
| Method | Endpoint | Auth | Body | Response |
|---|---|---|---|---|
| GET | `/skills` | Public | – | `200 [ {id, name, category, level} ]` |
| POST | `/skills` | Admin (JWT) | `{ name, category, level }` | `201 {...}` |
| PUT | `/skills/:id` | Admin (JWT) | field yang diubah | `200 {...}` / `404` |
| DELETE | `/skills/:id` | Admin (JWT) | – | `204` / `404` |

### 6.4 Messages (Contact Form)
| Method | Endpoint | Auth | Body | Response |
|---|---|---|---|---|
| POST | `/messages` | Public | `{ name, email, message }` | `201 {...}` |
| GET | `/messages` | Admin (JWT) | – | `200 [ {id, name, email, message, createdAt} ]` |
| DELETE | `/messages/:id` | Admin (JWT) | – | `204` / `404` |

> Semua response error mengikuti format: `{ "success": false, "message": "..." }` dengan status 400/401/404/500 sesuai kasus.

## 7. Model Data (Entities)

**Project**
`id, title, description, techStack (array), thumbnailUrl, demoUrl, repoUrl, createdAt, updatedAt`

**Skill**
`id, name, category (enum: language/framework/tool), level (enum: basic/intermediate/advanced), createdAt`

**Message**
`id, name, email, message, createdAt`

**Admin**
`id, email, passwordHash, createdAt`

## 8. Acceptance Criteria (contoh per fitur kunci)

**Contact Form (US-05, FR-05)**
- ✅ Submit dengan data valid → tersimpan di DB, muncul notifikasi sukses.
- ✅ Submit dengan field kosong → ditolak validasi, pesan error jelas, tidak mengirim request ke server.
- ✅ Gagal koneksi ke API → muncul notifikasi error, form tidak hilang/reset.

**Admin CRUD Project (US-08, FR-11)**
- ✅ Tambah project baru → langsung muncul di list publik tanpa reload manual.
- ✅ Edit project → perubahan tercermin di halaman publik.
- ✅ Hapus project → hilang dari list, tidak ada broken reference di frontend.
- ✅ Akses endpoint tanpa token → `401`, redirect ke login di sisi frontend.

## 9. Out of Scope
(diwariskan dari PDD) Fitur Smart Chatbot, multi-admin, blog/CMS, analytics dashboard.

## 10. Dependensi & Risiko

| Risiko | Mitigasi |
|---|---|
| Free-tier Railway/Supabase punya limit resource/sleep mode | Cukup untuk demo portofolio; informasikan di README jika ada cold-start delay |
| JWT disimpan di localStorage rawan XSS | Sanitasi input, hindari render HTML mentah dari user input |
| Supabase connection string ter-expose | Simpan di environment variable, jangan commit ke repo |

---

*Dokumen selanjutnya: Product Backlog (breakdown task per sprint) dan UI/UX Specification Document.*
