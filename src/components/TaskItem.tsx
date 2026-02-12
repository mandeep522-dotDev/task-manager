import { useState } from "react";
import { cn } from "@/lib/utils";
import { Task } from "./TaskForm";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import TaskForm from "./TaskForm";
import { Edit2, Trash2, CheckCircle2, Circle, Clock } from "lucide-react";

interface TaskItemProps {
  task: Task;
  onUpdate: (id: string, data: Partial<Task>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export default function TaskItem({ task, onUpdate, onDelete }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (data: Omit<Task, "id" | "user_id">) => {
    setLoading(true);
    await onUpdate(task.id, data);
    setIsEditing(false);
    setLoading(false);
  };

  const statusIcons = {
    "Todo": <Circle className="h-5 w-5 text-gray-400" />,
    "In Progress": <Clock className="h-5 w-5 text-blue-500" />,
    "Done": <CheckCircle2 className="h-5 w-5 text-green-500" />
  };

  if (isEditing) {
    return (
      <Card className="p-4 bg-white/80 backdrop-blur-xl border-primary/20 shadow-2xl">
        <TaskForm
          initialData={task}
          onSubmit={handleUpdate}
          onCancel={() => setIsEditing(false)}
          loading={loading}
        />
      </Card>
    );
  }

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 border-opacity-50 hover:border-primary/30 flex flex-col h-full bg-white/50 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-background ring-1 ring-border group-hover:ring-primary/20 transition-all">
            {statusIcons[task.status]}
          </div>
          <CardTitle className="text-lg font-bold tracking-tight group-hover:text-primary transition-colors">{task.title}</CardTitle>
        </div>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
          <Button size="icon" variant="ghost" onClick={() => setIsEditing(true)} className="hover:bg-primary/10 hover:text-primary">
            <Edit2 className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="ghost" className="text-destructive hover:bg-destructive/10" onClick={() => onDelete(task.id)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-sm text-muted-foreground leading-relaxed">{task.description || "No description provided."}</p>
      </CardContent>
      <CardFooter className="pt-4 border-t border-border/50 shadow-inner bg-black/[0.01]">
        <div className={cn(
          "text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full border",
          task.status === "Done" ? "bg-green-50 text-green-700 border-green-200" :
          task.status === "In Progress" ? "bg-blue-50 text-blue-700 border-blue-200" :
          "bg-gray-50 text-gray-700 border-gray-200"
        )}>
          {task.status}
        </div>
      </CardFooter>
    </Card>
  );
}
