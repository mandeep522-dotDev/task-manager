# Team Task Manager

A premium, high-performance task management application for teams that prioritize speed and clarity. Built with **React**, **Vite**, **Tailwind CSS**, and **Supabase**.

## �️ Tech Stack

- **Frontend**: React 18, Vite 5, TypeScript
- **Styling**: Tailwind CSS (PostCSS)
- **State Management**: React Hooks & Supabase Real-time
- **Backend/Database**: Supabase (Postgres)
- **Auth**: Supabase Auth (JWT/RLS)
- **Icons**: Lucide React

## 🏁 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- A [Supabase](https://supabase.com/) project

### Installation

1. **Clone the repository**:
   ```bash
   git clone <your-repo-url>
   cd "task manager"
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
   Run the SQL script located in `supabase/schema.sql` in your Supabase SQL Editor to create the `tasks` table and set up Row Level Security (RLS) policies.

### Running Locally

```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🏗️ Architecture Overview

The application follows a modern monolithic frontend architecture with a decoupled Backend-as-a-Service (BaaS).

- **Client Layer**: React-based SPA using Vite for lightning-fast HMR. Component-driven UI using functional components and Tailwind CSS for atomic styling.
- **Service Layer**: Centralized Supabase client in `src/lib/supabase.ts` manages all side effects (data fetching, real-time subscriptions, auth).
- **Data Layer**: Postgres database with Row Level Security (RLS) ensuring each user only accesses their own tasks and data.
- **Routing**: `react-router-dom` handles navigation, with protected routes ensuring auth-only access to the dashboard.

## 🤖 Where AI Was Used

AI (Antigravity) was instrumental in the lifecycle of this project:
- **Architectural Design**: Planning the migration from Next.js to Vite to optimize for performance and developer experience.
- **Implementation**: Generating complex UI components, setting up Supabase RLS policies, and implementing real-time data synchronization.
- **Debugging**: Solving critical Vercel deployment issues, specifically resolving "Permission Denied" errors and ESM/CJS configuration conflicts.
- **Project Governance**: Automating the creation of implementation plans, walkthroughs, and technical documentation.

## 🚀 Future Improvements

Given more time, the following enhancements would be prioritized:
- **Offline Support**: Implementing a PWA strategy with Service Workers and IndexedDB for offline task management.
- **Collaborative Workspaces**: Adding support for teams and shared task lists with fine-grained permission levels.
- **Rich Task Metadata**: Adding support for attachments, comments, and task history/audit logs.
- **Performance Optimization**: Implementing server-side rendering (SSR) or static generation for the landing page to improve SEO and FCP.
- **Automated Testing**: Increasing coverage with Playwright for E2E tests and Vitest for unit/integration tests.

## 📄 License

MIT

