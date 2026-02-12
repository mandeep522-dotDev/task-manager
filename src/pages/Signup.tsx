import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { UserPlus } from "lucide-react";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`,
      },
    });

    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-6 gradient-bg relative overflow-hidden">
      <div className="absolute top-1/4 -right-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl -z-10" />

      <Card className="w-full max-w-md shadow-2xl animate-in fade-in zoom-in duration-500 bg-white/80 backdrop-blur-xl border-white/20">
        <CardHeader className="space-y-3 pb-8">
          <div className="flex justify-center mb-2">
            <div className="p-3 rounded-2xl bg-primary/10 text-primary">
              <UserPlus className="h-8 w-8" />
            </div>
          </div>
          <CardTitle className="text-3xl font-extrabold text-center tracking-tight">Join TeamTask</CardTitle>
          <CardDescription className="text-center text-sm font-medium text-muted-foreground leading-relaxed">
            Create an account to start managing <br /> your team efficiently.
          </CardDescription>
        </CardHeader>
        {success ? (
          <CardContent className="space-y-6 pb-12">
            <div className="p-4 rounded-xl bg-green-50 border border-green-100 text-green-700 text-center space-y-2">
              <p className="font-bold text-lg">Check your inbox</p>
              <p className="text-sm font-medium">We've sent a verification link to your email to complete your setup.</p>
            </div>
            <Link to="/login" className="block w-full">
              <Button className="w-full h-12 rounded-xl font-bold">Return to Login</Button>
            </Link>
          </CardContent>
        ) : (
          <form onSubmit={handleSignup}>
            <CardContent className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Work Email</Label>
                <Input
                  id="email"
                  type="email"
                  className="bg-white/50 border-border/50 h-12 focus:ring-primary/20 transition-all rounded-xl"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Password</Label>
                <Input
                  id="password"
                  type="password"
                  className="bg-white/50 border-border/50 h-12 focus:ring-primary/20 transition-all rounded-xl"
                  placeholder="Min. 8 characters"
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
                    Creating account...
                  </div>
                ) : "Create Account"}
              </Button>
              <p className="text-sm text-center font-medium text-muted-foreground">
                Already have an account?{" "}
                <Link to="/login" className="text-primary hover:underline font-bold">
                  Sign In
                </Link>
              </p>
            </CardFooter>
          </form>
        )}
      </Card>
    </div>
  );
}
