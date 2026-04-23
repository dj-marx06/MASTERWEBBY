import { motion } from 'motion/react';
import { ChevronDown, MapPin, Globe } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[700px] w-full overflow-hidden bg-brand-primary">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=2070&auto=format&fit=crop"
          alt="Couple in holiday resort"
          className="h-full w-full object-cover opacity-60"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/40 via-transparent to-brand-primary" />
      </div>

      <div className="container relative z-10 mx-auto flex h-full items-center px-6 pt-24 md:pt-20">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-4 md:mb-6 flex items-center gap-3">
              <span className="h-px w-8 md:w-12 bg-brand-accent"></span>
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-brand-accent">
                Bienvenido a FC TRAVEL
              </span>
            </div>
            
            <h1 className="serif mb-6 md:mb-8 text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-light leading-[1.2] text-white">
              Tu viaje, <span className="italic text-brand-accent">a tu manera</span>. Experiencias planeadas de principio a fin.
            </h1>
            
            <p className="mb-8 md:mb-10 max-w-xl text-sm md:text-lg leading-relaxed text-white/70">
              Con 16 años en el mercado, somos tu plataforma tecnológica líder para acceder a los mejores destinos turísticos del mundo con precios exclusivos.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-6 md:gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('revista')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full sm:w-auto rounded-full bg-brand-accent px-8 py-4 text-[10px] md:text-xs font-bold uppercase tracking-widest text-white shadow-lg transition-all hover:bg-brand-accent/90"
              >
                Explorar Revista
              </motion.button>
              <div className="flex items-center gap-4 md:gap-6 px-4">
                <div className="flex -space-x-3 overflow-hidden">
                  {[1, 2, 3, 4].map((i) => (
                    <img
                      key={i}
                      className="inline-block h-10 w-10 rounded-full ring-2 ring-brand-primary object-cover"
                      src={`https://picsum.photos/seed/traveler${i}/100/100`}
                      alt="Traveler"
                      referrerPolicy="no-referrer"
                    />
                  ))}
                </div>
                <span className="text-xs font-medium text-white/60">
                  +1.5k socios activos
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-12 left-1/2 z-10 -translate-x-1/2 cursor-pointer text-white/40 hover:text-white"
        onClick={() => document.getElementById('nosotros')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <ChevronDown className="h-8 w-8" />
      </motion.div>
    </section>
  );
}
