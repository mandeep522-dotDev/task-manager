import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { ListTodo } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-6 gradient-bg relative overflow-hidden">
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl -z-10" />

      <Card className="w-full max-w-md shadow-2xl animate-in fade-in zoom-in duration-500 bg-white/80 backdrop-blur-xl border-white/20">
        <CardHeader className="space-y-3 pb-8">
          <div className="flex justify-center mb-2">
            <div className="p-3 rounded-2xl bg-primary/10 text-primary">
              <ListTodo className="h-8 w-8" />
            </div>
          </div>
          <CardTitle className="text-3xl font-extrabold text-center tracking-tight">Welcome back</CardTitle>
          <CardDescription className="text-center text-sm font-medium text-muted-foreground leading-relaxed">
            Enter your credentials to access your <br /> TeamTask workspace.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Email Address</Label>
              <Input
                id="email"
                type="email"
                className="bg-white/50 border-border/50 h-12 focus:ring-primary/20 transition-all rounded-xl"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <Label htmlFor="password" className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Password</Label>
                <Link to="#" className="text-xs font-bold text-primary hover:underline">Forgot?</Link>
              </div>
              <Input
                id="password"
                type="password"
                className="bg-white/50 border-border/50 h-12 focus:ring-primary/20 transition-all rounded-xl"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && (
              <div className="p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm font-medium animate-in fade-in slide-in-from-top-1">
                {error}
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col gap-6 pt-4 pb-8">
            <Button className="w-full h-12 rounded-xl font-bold shadow-lg shadow-primary/20 active:scale-[0.98] transition-all" type="submit" disabled={loading}>
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Logging in...
                </div>
              ) : "Sign In"}
            </Button>
            <p className="text-sm text-center font-medium text-muted-foreground">
              New to TeamTask?{" "}
              <Link to="/signup" className="text-primary hover:underline font-bold">
                Create account
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
