# Team Task Manager

A premium, high-performance task management application for teams that prioritize speed and clarity. Built with **React**, **Vite**, **Tailwind CSS**, and **Supabase**.

## 🚀 Features

- **Real-time Synchronization**: Powered by Supabase for instant updates.
- **Premium Design**: Modern aesthetic featuring glassmorphism, custom gradients, and micro-animations.
- **Complete CRUD**: Create, view, update (status/content), and delete tasks.
- **Secure Auth**: Full authentication flow with protected routes and Row Level Security (RLS).
- **Responsive UI**: Optimized for all devices.

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, TypeScript
- **Styling**: Tailwind CSS
- **Backend/Auth**: Supabase (Postgres)
- **Icons**: Lucide React

## 🏁 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- A [Supabase](https://supabase.com/) project

### Installation

1. **Clone the repository**:
   ```bash
   git clone <your-repo-url>
   cd "team task manager"
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up Environment Variables**:
   Create a `.env` file in the root directory and add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Initialize the Database**:
   Run the SQL script located in `supabase/schema.sql` in your Supabase SQL Editor to create the `tasks` table and set up RLS policies.

### Running Locally

```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📁 Project Structure

- `src/pages`: Main application views (Landing, Login, Signup, Dashboard).
- `src/components`: UI components and task-specific logic.
- `src/lib`: Supabase client and utility functions.
- `supabase/`: Database schema and migrations.

## 📄 License

MIT
