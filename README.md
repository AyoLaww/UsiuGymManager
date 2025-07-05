# 🏋️‍♀️ USIU Gym Session Manager

A full-stack gym session management web app for USIU gym facilities.  
Built using **Next.js**, **Supabase**, **Tailwind CSS** and **ShadcnUI** — with role-based authentication, session booking, and admin controls.

---

## ✨ Features

### ✅ User Authentication
- Email/password sign-up & login via Supabase Auth
- Role-based redirects and protected routes (User, Instructor, Admin)

### 🧍‍♂️ User Dashboard
- Browse available gym sessions
- Join or cancel a session
- View real-time available slots based on capacity
- Prevent overbooking
- View sessions already joined

### 🛠️ Admin Dashboard
- Add, edit, and delete gym sessions
- View participant count (via SQL view)
- Prevent duplicate or invalid sessions

### 🔐 Route Protection
- Middleware enforces:
  - Authenticated access to `/admin` and `/user`
  - Automatic redirect to `/auth` if unauthenticated
  - Role-based routing after login

### 🧠 Backend Logic (Supabase)
- **Sessions Table**: Stores all gym session data (location, day, time, max_capacity)
- **Users Table**: Stores user roles (admin/user/instructor)
- **Bookings Table**: Maps users to sessions they've joined
- **SQL View (`session_participants`)**: Returns session ID + participant count

---

## 📦 Tech Stack

- **Frontend**: [Next.js 14](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/), [Shadcn](https://ui.shadcn.com)
- **Backend**: [Supabase](https://supabase.com/) (auth, database, API)
- **Auth Helpers**: `@supabase/ssr` for server-side auth sessions
- **UI**: Custom components using `shadcn/ui`, `lucide-react`, and Radix primitives

---