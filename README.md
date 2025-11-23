# Tugas-Pemweb
# Guide Hub: Aplikasi Manajemen Kegiatan Pemandu 

## Deskripsi Singkat

Guide Hub adalah platform berbasis web yang dirancang untuk memfasilitasi manajemen, perencanaan, dan pengorganisasian kegiatan bagi sekelompok Pemandu (Guides) dalam sebuah komunitas. Aplikasi ini menyediakan sistem CRUD untuk kegiatan dan dilengkapi dengan fitur autentikasi (Login/Register) serta file upload yang aman. 

## Problem Statement

Dalam komunitas yang mengandalkan pemandu, seringkali terjadi fragmentasi data kegiatan yang menyebabkan inefisiensi. Proyek ini mengatasi:
1.  Kurangnya Sentralisasi Data: Rincian kegiatan, lokasi, tanggal, dan panduan pendukung sering tersebar di berbagai alat komunikasi, yang berisiko menyebabkan kehilangan informasi kritis.
2.  Keterbatasan Kontrol Akses: Kurangnya sistem autentikasi yang jelas membuat sulit untuk mengontrol siapa yang memiliki izin untuk membuat, memodifikasi, atau mengakses data kegiatan sensitif.

***

## Solution Overview

Guide Hub menawarkan solusi yang menyatukan manajemen kegiatan dan keamanan akses:
1. Pusat Informasi Terpadu: Menyediakan antarmuka pengguna (UI) yang bersih dan terorganisir untuk melihat, membuat, dan melacak semua kegiatan komunitas.
2. Autentikasi Aman dengan JWT: Menggunakan JSON Web Tokens (JWT) dan Bcrypt untuk memastikan otorisasi sesi yang aman, hanya mengizinkan pengguna terdaftar untuk memanipulasi data.
3. Manajemen File Terintegrasi: Memungkinkan upload dokumen pendukung hingga 100MB per dokumen, yang terlampir langsung pada kegiatan yang relevan.
4. Otorisasi Berbasis Kepemilikan: Menerapkan middleware di backend untuk memastikan hanya pengguna yang membuat data kegiatan yang memiliki izin untuk memodifikasinya (edit/hapus).

***

## Tech Stack & Fitur Utama
### Tech Stack 
1. Backend: Node.js, Express.js 
2. Database: MongoDB (Atlas) 
3. Frontend: React (Vite) Library JavaScript 
4. Autentikasi: JWT, Bcryptjs 
5. File Handling: Multer 

### Fitur Utama
1. Autentikasi Penuh: Registrasi dan Login pengguna yang aman.
2. CRUD Kegiatan: Operasi lengkap untuk mengelola Activity (membuat, menampilkan daftar, melihat detail, mengubah, dan menghapus).
3. File Upload Fleksibel: Mendukung berbagai tipe file (images, PDF, dokumen) sebagai pendukung kegiatan.
4. Sesi Persistensi: Mempertahankan sesi pengguna melalui token yang disimpan di browser.
5. Akses Terproteksi: Semua route CRUD utama dilindungi oleh middleware otorisasi (`protect`).
