import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, ListTodo } from "lucide-react";

export default function Landing() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 gradient-bg relative overflow-hidden">
      {/* Decorative Blur Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 -z-10 animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-[30rem] h-[30rem] bg-blue-500/10 rounded-full blur-3xl translate-y-1/2 -z-10" />

      <div className="z-10 max-w-2xl w-full text-center space-y-8 animate-in fade-in zoom-in duration-700">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-4">
          <ListTodo className="h-3.5 w-3.5" />
          Beta Now Available
        </div>
        <h1 className="text-6xl font-extrabold tracking-tight sm:text-7xl">
          Manage tasks <br />
          <span className="text-primary italic">together.</span>
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed max-w-lg mx-auto">
          A sleek, high-performance task manager for teams that prioritize speed and clarity.
        </p>
        
        <div className="flex items-center justify-center gap-4 pt-4">
          <Link to="/login">
            <Button size="lg" className="px-8 shadow-xl shadow-primary/20 active:scale-95 transition-all h-14 text-base font-bold">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link to="/signup">
            <Button size="lg" variant="outline" className="px-8 bg-white/50 backdrop-blur-sm h-14 text-base font-bold">
              View Features
            </Button>
          </Link>
        </div>
      </div>

      <div className="mt-24 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl w-full z-10">
        {[
          { title: "Real-time", desc: "Instant updates across all devices." },
          { title: "Secure", desc: "Enterprise-grade RLS protection." },
          { title: "Modern", desc: "Built with React & Supabase." }
        ].map((feat, i) => (
          <div key={i} className="p-6 rounded-2xl bg-white/40 backdrop-blur-sm border border-white/20 shadow-sm hover:shadow-md transition-all">
            <h3 className="font-bold mb-1">{feat.title}</h3>
            <p className="text-sm text-muted-foreground">{feat.desc}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
