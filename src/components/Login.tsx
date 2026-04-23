import { useState } from 'react';
import type { FormEvent } from 'react';
import { motion } from 'motion/react';
import { Lock, User, Plane, MapPin } from 'lucide-react';

interface LoginProps {
  onLogin: (status: boolean) => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulating a bit of delay for the "experience"
    setTimeout(() => {
      if (username === 'FCTRAVELMEMBER' && password === 'FCGT2026') {
        onLogin(true);
      } else {
        setError('Acceso denegado. Verifique sus credenciales.');
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-brand-primary"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?q=80&w=2070&auto=format&fit=crop" 
          alt="Couple on the beach from behind" 
          className="h-full w-full object-cover opacity-40"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-primary via-transparent to-transparent" />
      </div>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="relative z-10 w-full max-w-md px-6"
      >
        <div className="mb-8 text-center">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-brand-accent text-white"
          >
            <Plane className="h-8 w-8" />
          </motion.div>
          <h1 className="serif text-4xl font-light tracking-tight text-white">FC TRAVEL</h1>
          <p className="mt-2 text-sm uppercase tracking-[0.2em] text-white/60">Member Access</p>
        </div>

        <div className="rounded-2xl bg-white/10 p-8 backdrop-blur-xl border border-white/10 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-white/50">
                Usuario
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-white/40">
                  <User className="h-4 w-4" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full rounded-xl bg-white/5 border border-white/10 py-3 pl-11 pr-4 text-white placeholder-white/20 transition-all focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-brand-accent/50"
                  placeholder="Ingrese su usuario"
                  required
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-white/50">
                Contraseña
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-white/40">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl bg-white/5 border border-white/10 py-3 pl-11 pr-4 text-white placeholder-white/20 transition-all focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-brand-accent/50"
                  placeholder="********"
                  required
                />
              </div>
            </div>

            {error && (
              <motion.p 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-sm font-medium text-red-400"
              >
                {error}
              </motion.p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full overflow-hidden rounded-xl bg-brand-accent py-4 font-semibold text-white transition-all hover:shadow-[0_0_20px_rgba(197,160,89,0.4)] disabled:opacity-50"
            >
              <span className={isLoading ? 'opacity-0' : 'opacity-100 flex items-center justify-center gap-2'}>
                Explorar Destinos
                <motion.div animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                  <MapPin className="h-4 w-4" />
                </motion.div>
              </span>
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                </div>
              )}
            </button>
          </form>
        </div>

        <p className="mt-8 text-center text-xs text-white/30">
          &copy; 2026 FC TRAVEL Agencia de Viajes. Todos los derechos reservados.
        </p>
      </motion.div>
    </motion.div>
  );
}
