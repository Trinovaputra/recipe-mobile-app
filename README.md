# Recipe Mobile App

Aplikasi mobile untuk mencari dan menyimpan resep favorit. Memungkinkan pengguna untuk browsing ribuan resep dari MealAPI, melihat detail resep, dan menambahkan resep ke favorit dengan autentikasi menggunakan Clerk.

## 📋 Tech Stack

### Frontend (Mobile)
- **React Native** - Cross-platform mobile development
- **Expo** - Framework untuk React Native development
- **Expo Router** - Navigation untuk app
- **Clerk** - Authentication & user management
- **React Navigation** - Advanced navigation patterns
- **Expo Secure Store** - Secure credential storage

### Backend
- **Express.js** - Web framework
- **Drizzle ORM** - Type-safe SQL query builder
- **Neon** - Serverless PostgreSQL database
- **Node.js** - Runtime environment

### External API
- **MealAPI** - Public API untuk meal/recipe data (https://www.themealdb.com/api.php)

---

## 🚀 Prerequisites

Sebelum memulai, pastikan Anda telah menginstall:

- **Node.js** (v18 atau lebih baru) - [Download](https://nodejs.org/)
- **npm** atau **yarn** - Biasanya sudah terinstall dengan Node.js
- **Expo CLI** - Install dengan: `npm install -g expo-cli`
- **Git** - Untuk version control

Untuk menjalankan di mobile device:
- **Android**: Android Studio atau Android device dengan Expo Go
- **iOS**: Xcode atau iOS device dengan Expo Go

---

## 📦 Installation

### 1. Clone Repository

```bash
git clone <repository-url>
cd recipe-mobile
```

### 2. Setup Backend

#### 2.1 Navigate ke Backend Directory
```bash
cd backend
```

#### 2.2 Install Dependencies
```bash
npm install
```

#### 2.3 Setup Environment Variables

Buat file `.env` di folder `backend/`:

```bash
# .env
PORT=3000
DATABASE_URL=postgresql://user:password@host/dbname
```

**Cara mendapatkan `DATABASE_URL` dari Neon:**
1. Buka [Neon Console](https://console.neon.tech/)
2. Buat project baru atau gunakan yang sudah ada
3. Copy connection string dari dashboard
4. Format: `postgresql://[user]:[password]@[host]/[database]`

#### 2.4 Setup Database Migrations

```bash
# Generate migrations
npm run db:generate

# Run migrations
npm run db:migrate
```

#### 2.5 Start Backend Server

```bash
npm run dev
```

Backend akan berjalan di `http://localhost:3000`

---

### 3. Setup Frontend (Mobile)

#### 3.1 Navigate ke Mobile Directory
```bash
cd ../mobile
```

#### 3.2 Install Dependencies
```bash
npm install
```

#### 3.3 Setup Environment Variables

Buat file `.env` di folder `mobile/`:

```bash
# .env
EXPO_PUBLIC_API_BASE_URL=http://localhost:3000/api
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

**Cara mendapatkan Clerk Keys:**
1. Buka [Clerk Dashboard](https://dashboard.clerk.com/)
2. Login atau buat akun baru
3. Buat application baru
4. Copy **Publishable Key** dari settings

#### 3.4 Setup Clerk di Expo App

Edit `mobile/app/_layout.jsx` dan pastikan Clerk sudah dikonfigurasi dengan keys yang benar.

---

## 🎮 Running the Project

### Backend

```bash
cd backend
npm run dev
```

Server akan berjalan di port 3000

### Frontend

```bash
cd mobile
npm start
```

Pilih salah satu:
- Tekan `a` untuk Android (butuh Android Emulator atau device)
- Tekan `i` untuk iOS (butuh Mac dengan Xcode)
- Tekan `w` untuk Web
- Scan QR code dengan **Expo Go** app di mobile device

---

## 📂 Project Structure

```
recipe-mobile/
├── backend/                          # Express Backend
│   ├── src/
│   │   ├── server.js                # Entry point
│   │   ├── config/
│   │   │   ├── db.js                # Database connection
│   │   │   ├── env.js               # Environment variables
│   │   │   └── cron.js              # Scheduled tasks
│   │   └── db/
│   │       ├── schema.js            # Drizzle schema
│   │       └── migrations/          # Database migrations
│   ├── .env                         # Environment variables (create this)
│   ├── package.json
│   └── drizzle.config.js
│
└── mobile/                          # React Native Frontend
    ├── app/
    │   ├── (auth)/                  # Authentication screens
    │   │   ├── sign-in.jsx
    │   │   ├── sign-up.jsx
    │   │   └── verify-email.jsx
    │   ├── (tabs)/                  # Main app tabs
    │   │   ├── index.jsx            # Home
    │   │   ├── search.jsx           # Search recipes
    │   │   └── favorites.jsx        # Saved favorites
    │   └── recipe/
    │       └── [id].jsx             # Recipe detail
    ├── components/                  # Reusable components
    │   ├── RecipesCard.jsx
    │   ├── LoadingSpinner.jsx
    │   ├── CategoryFilter.jsx
    │   └── ...
    ├── services/
    │   ├── mealAPI.js               # MealAPI integration
    ├── hooks/
    │   └── useDebounce.js
    ├── constants/
    │   ├── api.js
    │   └── colors.js
    ├── .env                         # Environment variables (create this)
    ├── app.json
    ├── package.json
    └── tsconfig.json
```

---

## 🔑 Environment Variables Reference

### Backend (.env)

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Port untuk server | `3000` |
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@localhost/recipe_db` |

### Mobile (.env)

| Variable | Description | Example |
|----------|-------------|---------|
| `EXPO_PUBLIC_API_BASE_URL` | Backend API base URL | `http://localhost:3000/api` |
| `EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk publishable key | `pk_test_xxxxxxxxxxxx` |

---

## 🎯 Features

- ✅ Browse ribuan resep dari MealAPI
- ✅ Search resep berdasarkan nama dan kategori
- ✅ Lihat detail resep lengkap (ingredients, instructions)
- ✅ Simpan resep ke favorit
- ✅ Authentication dengan Clerk
- ✅ Responsive design untuk mobile
- ✅ Support Android, iOS, dan Web

---

## 📡 API Integration

### MealAPI
- **Base URL**: `https://www.themealdb.com/api/json/v1/1/`
- **Endpoints yang digunakan**:
  - `search.php?s=Arrabiata` - Search meal by name
  - `filter.php?c=Seafood` - Filter by category
  - `lookup.php?i=52772` - Get meal details

---

## 🔧 Common Issues & Solutions

### 1. Backend tidak connect ke database
```
Error: Cannot connect to DATABASE_URL
```
**Solusi:**
- Pastikan `DATABASE_URL` sudah benar di `.env`
- Cek koneksi internet
- Verifikasi credentials di Neon console

### 2. Clerk authentication error
```
Error: Publishable key not found
```
**Solusi:**
- Pastikan `EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY` sudah benar di `.env`
- Restart Expo: Tekan `Ctrl+C` dan jalankan `npm start` lagi

### 3. CORS error saat call API
```
Error: Access to XMLHttpRequest blocked by CORS policy
```
**Solusi:**
- Backend sudah setup CORS di Express
- Pastikan `EXPO_PUBLIC_API_BASE_URL` sesuai dengan running backend

---

## 📚 Useful Commands

### Backend
```bash
npm run dev      # Start development server
npm run start    # Start production server
```

### Mobile
```bash
npm start        # Start Expo development server
npm run android  # Build dan run di Android Emulator
npm run ios      # Build dan run di iOS Simulator
npm run web      # Run di web browser
npm run lint     # Check code quality
```

---

## 🚢 Deployment

### Backend (ke Vercel)
```bash
npm run build
npm run start
```

Lihat `vercel.json` untuk konfigurasi Vercel.

### Mobile
- **Android**: Generate APK/AAB melalui EAS Build
- **iOS**: Generate IPA melalui EAS Build
- **Web**: Deploy ke Vercel atau service lainnya

---

## 📝 License

ISC

---

## 🤝 Support

Jika ada pertanyaan atau issue, silakan buat issue di repository ini.

---

**Happy Cooking! 👨‍🍳**
