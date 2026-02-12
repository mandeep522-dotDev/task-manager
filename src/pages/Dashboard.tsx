import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import TaskForm, { Task } from "@/components/TaskForm";
import TaskItem from "@/components/TaskItem";
import { Plus, LogOut, ListTodo } from "lucide-react";

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching tasks:", error.message);
    } else {
      setTasks(data || []);
    }
    setLoading(false);
  };

  const handleCreateTask = async (taskData: Omit<Task, "id" | "user_id">) => {
    const { error } = await supabase.from("tasks").insert([
      { ...taskData, user_id: user.id },
    ]);

    if (error) {
      alert(error.message);
    } else {
      setShowCreateForm(false);
      fetchTasks();
    }
  };

  const handleUpdateTask = async (id: string, data: Partial<Task>) => {
    const { error } = await supabase
      .from("tasks")
      .update(data)
      .eq("id", id);

    if (error) {
      alert(error.message);
    } else {
      fetchTasks();
    }
  };

  const handleDeleteTask = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      const { error } = await supabase.from("tasks").delete().eq("id", id);
      if (error) {
        alert(error.message);
      } else {
        fetchTasks();
      }
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col gradient-bg">
      <header className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 group">
            <div className="p-2 rounded-xl bg-primary/10 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
              <ListTodo className="h-6 w-6" />
            </div>
            <h1 className="text-xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
              TeamTask
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end mr-2">
              <span className="text-[10px] text-muted-foreground font-extrabold uppercase tracking-widest">Workspace</span>
              <span className="text-sm font-bold text-foreground">{user?.email}</span>
            </div>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        <div className="flex flex-col gap-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight">Active Tasks</h2>
              <p className="text-muted-foreground text-sm font-medium">Manage and track your private team progress.</p>
            </div>
            <Button onClick={() => setShowCreateForm(true)} className="shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all transform hover:-translate-y-0.5">
              <Plus className="h-4 w-4 mr-2" />
              New Task
            </Button>
          </div>

          {showCreateForm && (
            <Card className="mb-6 shadow-2xl border-primary/20 animate-in fade-in slide-in-from-top-4 duration-300 bg-white/90 backdrop-blur-xl">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold">Create New Task</CardTitle>
              </CardHeader>
              <CardContent>
                <TaskForm
                  onSubmit={handleCreateTask}
                  onCancel={() => setShowCreateForm(false)}
                />
              </CardContent>
            </Card>
          )}

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {loading ? (
              <div className="col-span-full flex flex-col items-center justify-center py-20 text-muted-foreground">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
                <p className="font-medium">Syncing with Supabase...</p>
              </div>
            ) : tasks.length === 0 ? (
              <div className="col-span-full flex flex-col items-center justify-center py-32 bg-white/50 backdrop-blur-sm rounded-2xl border border-dashed border-primary/20">
                <div className="p-4 rounded-full bg-primary/5 mb-6">
                  <ListTodo className="h-12 w-12 text-primary/40" />
                </div>
                <p className="text-xl font-bold text-foreground mb-2">No tasks found</p>
                <p className="text-muted-foreground mb-8 text-center max-w-xs">Your workspace is empty. Start by creating your first task above.</p>
                <Button variant="outline" onClick={() => setShowCreateForm(true)} className="hover:bg-primary hover:text-primary-foreground transform active:scale-95 transition-all">
                  Get Started
                </Button>
              </div>
            ) : (
              tasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onUpdate={handleUpdateTask}
                  onDelete={handleDeleteTask}
                />
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
