# Product Definition Document (PDD)
## Personal Portfolio Web Platform

**Versi:** 1.0
**Tanggal:** 24 Juni 2026
**Pemilik Produk:** [Nama Mahasiswa]

---

## 1. Latar Belakang & Konteks

Sebagai mahasiswa Teknik Informatika dengan minat di pengembangan web, dibutuhkan sebuah media yang merepresentasikan kompetensi teknis secara konkret kepada rekruter — bukan sekadar daftar CV statis, melainkan aplikasi web fungsional yang sekaligus *menjadi* bukti kemampuan (full-stack: frontend, backend, database, deployment).

Saat ini, proses showcase portofolio biasanya terbatas pada PDF CV, LinkedIn, atau repository GitHub yang tersebar — tidak ada satu titik akses terpusat yang sekaligus estetis dan mendemonstrasikan kapabilitas teknis secara langsung.

## 2. Visi Produk

> "Membangun platform portofolio pribadi berbasis web full-stack yang berfungsi sebagai etalase karya dan kompetensi teknis, dirancang untuk meninggalkan kesan profesional pada rekruter dalam hitungan detik pertama, sekaligus membuktikan kemampuan engineering melalui arsitektur aplikasinya sendiri."

## 3. Tujuan Produk (Goals)

| # | Tujuan | Indikator Keberhasilan |
|---|---|---|
| G1 | Menyajikan profil, proyek, dan keahlian secara menarik & mudah dicerna | Visitor dapat memahami profil dalam < 10 detik di halaman utama |
| G2 | Mendemonstrasikan kompetensi full-stack secara nyata | Tersedia RESTful API + database + deployment terpisah FE/BE |
| G3 | Memudahkan pemilik mengelola konten tanpa coding ulang | Admin dapat CRUD data Project & Skill via dashboard |
| G4 | Dapat diakses publik secara stabil | Uptime tinggi, responsif di berbagai device, tanpa crash pada fitur utama |
| G5 | Menjadi alat komunikasi ke rekruter | Tersedia jalur kontak langsung (form) yang tersimpan & dapat ditinjau |

## 4. Target Pengguna

| Persona | Deskripsi | Kebutuhan Utama |
|---|---|---|
| **Rekruter / HR** | Non-technical, waktu terbatas | First impression cepat, navigasi jelas, ringkasan proyek & skill |
| **Hiring Manager / Engineer** | Technical, mengevaluasi kedalaman skill | Detail teknis proyek, link source code, bukti arsitektur backend |
| **Pemilik (Admin)** | Mahasiswa itu sendiri | Kemudahan update konten tanpa redeploy, login aman |

## 5. Lingkup Produk (Scope)

### In-Scope (v1)
- Landing page publik: Hero, About, Projects, Skills, Experience, Contact
- RESTful API (Express) untuk Projects, Skills, Messages
- Database persistence (Supabase/PostgreSQL)
- Admin Dashboard dengan autentikasi (CRUD Project & Skill, lihat pesan masuk)
- Desain responsif (mobile, tablet, desktop)
- Deployment: Backend → Railway, Frontend → Vercel

### Out-of-Scope (v1 — kandidat v2)
- Fitur Smart Chatbot (chatbot tanya-jawab profil) — *ditunda, dicatat sebagai backlog masa depan*
- Multi-admin / role management
- Blog/CMS artikel
- Analytics dashboard pengunjung

## 6. Diferensiasi & Nilai Jual

1. **Bukan portofolio statis** — backend nyata dengan database, bisa didemokan live ke rekruter teknikal.
2. **Visual selektif berkelas** — kombinasi clean design + efek showcase (Aceternity UI) pada bagian yang paling dilihat (hero, project card).
3. **Self-manageable** — pemilik bisa update isi kapan saja lewat dashboard sendiri, tanpa sentuh kode.

## 7. Asumsi & Batasan

- Single admin user (tidak ada sistem registrasi publik untuk admin).
- Skala traffic kecil-menengah (portofolio pribadi), sehingga free-tier Railway/Vercel/Supabase mencukupi.
- Tidak menangani pembayaran atau transaksi apa pun.
- Bahasa antarmuka publik: Indonesia/Inggris (ditentukan saat UI/UX spec).

## 8. Gambaran Teknologi (High-Level)

| Layer | Teknologi |
|---|---|
| Build Tool | Vite |
| Frontend | React, Tailwind CSS, Aceternity UI |
| HTTP Client | Axios |
| Backend | Node.js + Express (RESTful) |
| Database | Supabase (PostgreSQL) |
| Auth (Admin) | JWT |
| Deployment | Railway (API), Vercel (Frontend) |

---

*Dokumen ini menjadi acuan untuk penyusunan Product Requirement Document (PRD), Product Backlog, dan UI/UX Specification Document selanjutnya.*
