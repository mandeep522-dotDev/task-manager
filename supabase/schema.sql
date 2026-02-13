create table tasks (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  status text check (status in ('Todo', 'In Progress', 'Done')) default 'Todo',
  user_id uuid references auth.users not null default auth.uid(),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table tasks enable row level security;

create policy "Users can view their own tasks"
on tasks for select
using (auth.uid() = user_id);

create policy "Users can insert their own tasks"
on tasks for insert
with check (auth.uid() = user_id);

create policy "Users can update their own tasks"
on tasks for update
using (auth.uid() = user_id);

create policy "Users can delete their own tasks"
on tasks for delete
using (auth.uid() = user_id);
