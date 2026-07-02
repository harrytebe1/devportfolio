# UI/UX Specification Document (UXD)
## Personal Portfolio Web Platform

**Versi:** 1.0
**Tanggal:** 24 Juni 2026
**Referensi:** PDD v1.0, PRD v1.0, Product Backlog v1.0

---

## 1. Tujuan Dokumen

Menjadi acuan visual & interaksi sebelum proses desain visual dan implementasi frontend. Mencakup identitas visual, struktur layout per halaman, inventori komponen, serta pemetaan ke library Aceternity UI.

## 2. Prinsip Desain

| Prinsip | Penerapan |
|---|---|
| **Confidence over clutter** | Whitespace lega, fokus ke 1 pesan per section, hindari elemen dekoratif tanpa fungsi |
| **Selective wow-factor** | Efek visual (animasi, gradient, parallax) hanya di section yang paling dilihat: Hero & Projects |
| **Recruiter-first hierarchy** | Informasi paling krusial (siapa kamu, apa yang bisa kamu buat) harus terlihat tanpa scroll |
| **Fungsional tetap kredibel** | Bagian Admin tidak perlu "wah" — prioritaskan jelas, cepat, efisien |

## 3. Identitas Visual

### 3.1 Tema
Dark theme sebagai default — kontras tinggi, terasa modern/technical, dan komponen Aceternity (glow, beams, gradient border) tampil maksimal di atas latar gelap.

### 3.2 Palet Warna

| Token | Hex | Penggunaan |
|---|---|---|
| `bg-base` | `#0B0B0F` | Background utama |
| `bg-surface` | `#15151C` | Card, panel, navbar |
| `bg-surface-elevated` | `#1E1E27` | Modal, dropdown |
| `accent-primary` | `#6366F1` | CTA, link, highlight |
| `accent-secondary` | `#A855F7` | Gradient pair dengan primary |
| `text-primary` | `#F5F5F7` | Heading, body utama |
| `text-secondary` | `#9CA3AF` | Caption, label, deskripsi sekunder |
| `border-subtle` | `#2A2A35` | Border card, divider |
| `state-success` | `#22C55E` | Notifikasi sukses |
| `state-error` | `#EF4444` | Notifikasi error, validasi |

Gradient signature: `linear-gradient(135deg, #6366F1 0%, #A855F7 100%)` — dipakai di CTA button utama & accent text di Hero.

### 3.3 Tipografi

| Role | Font | Sumber |
|---|---|---|
| Heading | **Space Grotesk** (600/700) | Google Fonts |
| Body | **Inter** (400/500) | Google Fonts |
| Code/Tech label | **JetBrains Mono** (400) | Google Fonts |

**Scale:** H1 `clamp(2.5rem, 5vw, 4rem)` · H2 `2rem` · H3 `1.5rem` · Body `1rem` · Caption `0.875rem`

### 3.4 Spacing & Radius
- Spacing scale (px): 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96
- Border radius: card `16px`, button `8px`, badge `999px` (pill)

## 4. Layout & Breakpoint

| Breakpoint | Lebar | Kolom Grid |
|---|---|---|
| Mobile | ≤ 640px | 1 kolom, padding horizontal 16px |
| Tablet | 641–1024px | 2 kolom untuk card grid |
| Desktop | ≥ 1025px | 3 kolom untuk card grid, max-width container 1200px |

Navigasi: mobile **hanya** pakai hamburger menu (slide-in dari kanan) — tidak ada bottom tab bar tambahan, untuk menghindari navigasi ganda/redundan; desktop pakai horizontal navbar sticky.

## 5. Spesifikasi Halaman Publik

### 5.1 Halaman "About" (berfungsi sebagai Home) — Hero + Bio dalam 1 route

> Keputusan final: Hero & About BUKAN dua tujuan navigasi terpisah. Navbar hanya punya 4 item (About, Projects, Skills, Contact) — "About" berperan sebagai halaman utama/home, dengan Hero sebagai sub-section teratas dan Bio sebagai sub-section di bawahnya, dalam satu halaman yang sama.

**Sub-section A — Hero (full-viewport, di atas):**
- **Layout:** teks rata kiri (desktop) / center (mobile), CTA ganda ("Lihat Proyek", "Hubungi Saya")
- **Konten:** Nama, role/headline ("Fullstack Developer in Progress"), 1–2 kalimat value proposition, badge tech stack singkat, elemen dekoratif (mis. code-snippet preview), tombol scroll-indicator
- **Aceternity mapping:** ambient glow/gradient background, `Text Generate Effect` untuk headline muncul bertahap

**Sub-section B — Bio (langsung di bawah Hero, halaman sama):**
- Foto/avatar, paragraf singkat latar belakang, link CV/resume download
- **Aceternity mapping:** `Hover Border Gradient` untuk tombol download CV

### 5.3 Projects
- **Layout:** Grid card (1/2/3 kolom sesuai breakpoint), tiap card: thumbnail, judul, 1 baris deskripsi, badge tech stack, link demo+repo
- Data: fetch dari `GET /api/projects`, skeleton loading saat fetch, fallback state jika kosong/error
- **Aceternity mapping:** `3D Card Effect` (tilt on hover) atau `Bento Grid` untuk variasi ukuran card pada proyek unggulan

### 5.4 Skills
- **Layout:** 3 kategori utama berjajar — Languages / Frameworks / Tools & Infra (gunakan label ini secara konsisten, jangan berubah jadi "Tools & Ops" di breakpoint lain) — badge/pill per skill. Ditambah 2 blok pelengkap: **Specialized Knowledge** (keahlian niche/teori) dan **Core Qualities** (soft skill list), serta 1 banner statistik ringkas di bagian bawah ("Always Learning" — jumlah project, kontribusi open source, dst).
- **Wajib konsisten di kedua breakpoint** — konten mobile dan desktop harus identik (kategori, badge, kedua blok pelengkap, banner statistik); hanya reflow grid yang berbeda (3 kolom desktop → 1 kolom stack mobile), bukan konten yang dikurangi/diganti.
- Data kategori utama (Languages/Frameworks/Tools & Infra) fetch dari `GET /api/skills`; blok Specialized Knowledge, Core Qualities, dan banner statistik bersifat statis (bukan bagian CRUD admin pada v1).
- **Aceternity mapping:** `Hover Border Gradient` pada badge, animasi ringan saja (hindari animasi berlebihan di section informasional)

### 5.5 Experience / Timeline
- **Layout:** Vertical timeline (mobile) / alternating left-right (desktop)
- Data: statis (seed), tidak melalui admin CRUD pada v1
- **Aceternity mapping:** komponen `Timeline`

### 5.6 Contact
- **Layout:** Form 1 kolom (nama, email, pesan) + info kontak alternatif (email, LinkedIn, GitHub icon links)
- Submit → `POST /api/messages`, tampilkan toast sukses/gagal, validasi inline (required, format email)
- **Aceternity mapping:** `Moving Border` pada tombol submit

### 5.7 Footer
- Copyright, social icons, link cepat ke section, dibuat ringan tanpa efek animasi.

## 6. Spesifikasi Admin Dashboard

> Prioritas: kejelasan & efisiensi, bukan estetika tinggi. Tetap pakai Tailwind + tema gelap yang konsisten, tanpa komponen Aceternity yang berat.

### 6.1 Login
- Form sederhana (email, password), pesan error jelas saat kredensial salah, tidak ada elemen dekoratif berlebih.

### 6.2 Dashboard Layout
- Sidebar kiri (desktop) / bottom-nav atau collapsible (mobile): menu Projects, Skills, Messages, Logout
- Topbar: judul halaman aktif + indikator user login

### 6.3 Projects & Skills (CRUD)
- Table/list view dengan kolom relevan, tombol Edit/Delete per row, tombol "+ Tambah" di header
- Form tambah/edit dalam modal atau halaman terpisah, validasi sebelum submit, konfirmasi sebelum delete

### 6.4 Messages
- List read-only: nama, email, snippet pesan, tanggal — expand untuk lihat pesan penuh

## 7. Inventori Komponen (untuk dibangun sebagai reusable component)

| Komponen | Dipakai di | Catatan |
|---|---|---|
| `Navbar` | Public | Sticky, responsive hamburger |
| `Footer` | Public | – |
| `ProjectCard` | Projects section | Props: title, desc, stack[], thumbnail, demoUrl, repoUrl |
| `SkillBadge` | Skills section | Props: name, category, level |
| `TimelineItem` | Experience | Props: title, org, period, desc |
| `ContactForm` | Contact | State: name, email, message, status (idle/loading/success/error) |
| `Toast` | Global | Untuk notifikasi sukses/error di seluruh app |
| `Button` (primary/secondary/ghost) | Global | Varian gradient untuk primary CTA |
| `AdminSidebar` | Admin | – |
| `DataTable` | Admin (Projects/Skills/Messages) | Generic, reusable untuk 3 resource |
| `Modal` | Admin (form tambah/edit) | – |
| `ProtectedRoute` | Admin | Wrapper routing, cek token |

## 8. Interaksi & Motion Guideline

- Durasi animasi: 200–400ms, easing `ease-out` — hindari animasi yang terasa lambat/berlebihan
- Hover state wajib ada di semua elemen interaktif (card, button, link)
- Animasi entrance (fade/slide on scroll) cukup di Hero & Projects, section lain statis agar performa tetap ringan
- Loading state: skeleton screen, bukan spinner penuh layar
- Semua animasi harus punya fallback aman jika `prefers-reduced-motion` aktif

## 9. Aksesibilitas Dasar

- Kontras teks minimal sesuai WCAG AA terhadap background gelap
- Semua form punya `label`, error message terasosiasi dengan input (`aria-describedby`)
- Navigasi bisa diakses via keyboard (tab order logis)
- Alt text untuk semua gambar/thumbnail project

## 10. Catatan untuk Handoff Desain Visual

Saat membuat desain visual, sertakan poin-poin berikut agar hasil konsisten dengan spec ini:
1. Dark theme, palet warna di section 3.2 (sebutkan hex code)
2. Font: Space Grotesk (heading) + Inter (body)
3. Style reference: "modern developer portfolio, subtle glow/gradient accents, generous whitespace, inspired by Aceternity UI aesthetic"
4. Generate per section terpisah (Hero, Projects, Skills, Timeline, Contact) supaya lebih mudah direvisi satu-satu, baru disatukan.
5. Sertakan versi mobile & desktop untuk tiap section penting (Hero, Projects).

---

*Dengan ini, keempat dokumen perancangan (PDD, PRD, Backlog, UXD) selesai. Tahap selanjutnya: desain visual berdasarkan dokumen ini, lalu development mengikuti urutan backlog.*
