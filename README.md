# Team Task Manager

This is a simple full-stack Task Manager application.  
Users can sign up, log in, and manage their own tasks.  
Each user can only see and manage their own data.


## Tech Stack

Frontend:
- React (Vite)
- JavaScript / TypeScript
- Tailwind CSS
- Deployed on Vercel

Backend:
- Supabase
  - PostgreSQL Database
  - Supabase Auth (Email & Password)
  - Row Level Security (RLS)


## Architecture Overview

- The frontend is built using React and deployed on Vercel.
- Supabase is used as the backend service.
- React directly communicates with Supabase using Supabase Client SDK.
- Authentication, database, and security are handled by Supabase.
- No separate backend server is used.

Flow:
User -> React App -> Supabase -> Database


## Setup Steps

1. Clone the repository
```bash
git clone https://github.com/mandeep522-dotDev/task-manager.git
cd task-manager
````

2. Install dependencies

```bash
npm install
```

3. Create `.env` file and add Supabase keys

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Run the project

```bash
npm run dev
```


## Where AI Was Used

AI tools were used for:

* Understanding Supabase authentication and RLS
* Debugging errors during development
* Improving code structure and logic

All code was reviewed and understood before using it.


## What I’d Improve With More Time

* Better UI and animations
* Task search and filter options
* Role-based access (Admin/User)
* Better error handling
* Unit testing


## Deployment

* Frontend is deployed on Vercel
* Backend services are handled by Supabase
* The application is fully live and working