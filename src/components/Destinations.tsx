import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, ArrowRight } from 'lucide-react';

interface Destination {
  id: number;
  title: string;
  description: string;
  price: string;
  image: string;
  type: 'nacional' | 'internacional';
}

const destinations: Destination[] = [
  // Nacionales
  {
    id: 1,
    title: 'Antigua Guatemala',
    description: '3-2 noches de hospedaje.',
    price: 'Desde Q599.00',
    image: 'https://images.unsplash.com/photo-1596434440026-64668ba4df21?q=80&w=2072&auto=format&fit=crop',
    type: 'nacional'
  },
  {
    id: 2,
    title: 'Casas en Monterrico',
    description: '3-2 noches de hospedaje. Incluye: (8 a 10 personas entre semana).',
    price: 'Desde Q2,650.00',
    image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=2070&auto=format&fit=crop',
    type: 'nacional'
  },
  {
    id: 3,
    title: 'Cobán Alta Verapaz',
    description: '3-2 Noches de hospedaje. Incluye: desayunos.',
    price: 'Desde Q649.00',
    image: 'https://images.unsplash.com/photo-1589412227349-33ad69046ccf?q=80&w=2074&auto=format&fit=crop',
    type: 'nacional'
  },
  // Internacionales
  {
    id: 4,
    title: 'Orlando, Florida',
    description: '8-7 Noches de hospedaje. Incluye: Boleto ida y vuelta, traslados aeropuerto-hotel y hotel-aeropuerto.',
    price: 'Desde Q6,199.00',
    image: 'https://images.unsplash.com/photo-1597466599360-3b9775841aec?q=80&w=2070&auto=format&fit=crop',
    type: 'internacional'
  },
  {
    id: 5,
    title: 'Cancún, México',
    description: '4-3 Noches de hospedaje. Incluye: Desayunos, boleto ida y vuelta, traslados aeropuerto hotel y hotel aeropuerto.',
    price: 'Desde Q4,500.00',
    image: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?q=80&w=2070&auto=format&fit=crop',
    type: 'internacional'
  },
  {
    id: 6,
    title: 'Punta Cana, Rep. Dominicana',
    description: '6-5 Noches de hospedaje. Incluye: Boleto ida y vuelta, traslados aeropuerto hotel y hotel aeropuerto.',
    price: 'Desde Q7,090.00',
    image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=2049&auto=format&fit=crop',
    type: 'internacional'
  }
];

export default function Destinations() {
  const [filter, setFilter] = useState<'nacional' | 'internacional'>('nacional');

  const filteredDestinations = destinations.filter(d => d.type === filter);

  const scrollToMagazine = () => {
    const element = document.getElementById('revista');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="container mx-auto px-6">
      <div className="text-center mb-16">
        <span className="text-xs font-bold uppercase tracking-[0.3em] text-brand-accent mb-4 block">Destinos</span>
        <h2 className="serif text-3xl md:text-5xl mb-12">Explora Próximas Aventuras</h2>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => setFilter('nacional')}
            className={`px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
              filter === 'nacional'
                ? 'bg-brand-primary text-white shadow-xl'
                : 'bg-white text-brand-primary border border-gray-100 hover:bg-gray-50'
            }`}
          >
            Nacionales
          </button>
          <button
            onClick={() => setFilter('internacional')}
            className={`px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
              filter === 'internacional'
                ? 'bg-brand-primary text-white shadow-xl'
                : 'bg-white text-brand-primary border border-gray-100 hover:bg-gray-50'
            }`}
          >
            Internacionales
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="wait">
          {filteredDestinations.map((dest) => (
            <motion.div
              key={dest.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="group bg-white rounded-[32px] overflow-hidden shadow-sm hover:shadow-2xl transition-all border border-gray-100"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={dest.image}
                  alt={dest.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg">
                  <span className="text-sm font-bold text-brand-primary">{dest.price}</span>
                </div>
              </div>
              
              <div className="p-8">
                <div className="flex items-center gap-2 text-brand-accent mb-3">
                  <MapPin className="h-4 w-4" />
                </div>
                <h3 className="serif text-2xl mb-4 italic">{dest.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-8">
                  {dest.description.includes('Incluye:') ? (
                    <>
                      {dest.description.split('Incluye:')[0]}
                      <span className="block mt-2 font-medium text-brand-primary/80">Incluye: {dest.description.split('Incluye:')[1]}</span>
                    </>
                  ) : (
                    dest.description
                  )}
                </p>
                <button
                  onClick={scrollToMagazine}
                  className="w-full flex items-center justify-center gap-3 py-4 rounded-xl border border-brand-accent text-brand-accent text-[11px] font-bold uppercase tracking-widest transition-all hover:bg-brand-accent hover:text-white group/btn"
                >
                  Ver más en la revista
                  <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
