# Task Management Backend

<div align="center">

![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)

</div>

## Overview 👋

Task Management Backend adalah sistem backend yang kuat dan efisien untuk mengelola tugas dan aktivitas. Dibangun dengan Express.js dan PostgreSQL, aplikasi ini menyediakan API RESTful yang memungkinkan pengguna untuk membuat, membaca, memperbarui, dan menghapus tugas dengan mudah.

### Fitur Utama 🚀

- **Autentikasi yang Aman**: Sistem login dan registrasi dengan JWT
- **Manajemen Tugas**: CRUD operasi untuk tugas
- **Database Persisten**: Penyimpanan data menggunakan PostgreSQL
- **API Documentation**: Dokumentasi API dengan Swagger
- **Validasi Data**: Validasi input yang kuat untuk memastikan integritas data
- **Error Handling**: Penanganan error yang komprehensif

## Teknologi yang Digunakan

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **Autentikasi**: JWT 
- **Neon**: Platform Database Berbasis Cloud

## Prasyarat

Sebelum menjalankan aplikasi, pastikan sistem Anda memiliki:

- Node.js (versi 14 atau lebih baru)
- npm (Node Package Manager)
- PostgreSQL

## Instalasi

1. Clone repositori ini:
```bash
git clone https://github.com/bbreezyX/be.git
cd be
```

2. Install dependensi yang diperlukan:
```bash
npm install
```

3. Buat file `.env` di root direktori dan isi dengan konfigurasi berikut:
```
DB_HOST=localhost
DB_USER=your_db_username
DB_PASSWORD=your_db_password
DB_NAME=task_management
DB_PORT=5432

JWT_SECRET=your_jwt_secret_key
PORT=3000
```

4. Siapkan database:
```bash
npm run db:migrate
```

## Menjalankan Aplikasi

### Mode Development
```bash
npm run dev
```

### Mode Production
```bash
npm run start
```

Aplikasi akan berjalan di `http://localhost:3000` (atau port yang Anda tentukan di file .env)

## API Documentation

Dokumentasi API tersedia melalui Swagger UI di endpoint `/api-docs` setelah menjalankan aplikasi.

## Endpoint API

### Autentikasi
- POST `/auth/register` - Registrasi pengguna baru
- POST `/auth/login` - Login pengguna

### Tasks
- GET `/tasks` - Mendapatkan semua task
- POST `/tasks` - Membuat task baru
- GET `/tasks/:id` - Mendapatkan detail task
- PUT `/tasks/:id` - Mengupdate task
- DELETE `/tasks/:id` - Menghapus task

## Testing
Untuk menjalankan test:
```bash
npm run test
```

## Struktur Proyek
```
be/
├── src/
│   ├── config/        # Konfigurasi database dan aplikasi
│   ├── controllers/   # Logic controller
│   ├── middlewares/   # Middleware Express
│   ├── models/        # Model database
│   ├── routes/        # Definisi route
│   └── app.js         # Entry point aplikasi
├── tests/             # File-file testing
├── .env.example       # Contoh file environment
├── package.json
└── README.md
```
