import { motion } from 'motion/react';
import { Target, Eye, ShieldCheck, Award } from 'lucide-react';

export default function About() {
  const associations = [
    { 
      name: 'Cámara de Comercio de Guatemala', 
      logo: 'https://www.camaradecomercio.org.gt/wp-content/uploads/2021/08/logo-ccg.png' 
    },
    { 
      name: 'INGUAT', 
      logo: 'https://visitguatemala.com/wp-content/uploads/2024/01/logo-inguat-blanco.png' 
    },
    { 
      name: 'Cámara de Turismo de Guatemala', 
      logo: 'https://camtur.org/wp-content/uploads/2021/05/logo_camtur.png' 
    },
  ];

  return (
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="relative z-10 overflow-hidden rounded-3xl aspect-[4/5] shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=1974&auto=format&fit=crop" 
              alt="About FC Travel" 
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -bottom-10 -right-10 z-0 h-64 w-64 rounded-full bg-brand-accent/10 blur-3xl"></div>
          
          <div className="absolute -left-10 top-20 z-20 hidden lg:block">
            <motion.div 
              initial={{ rotate: -15, scale: 0.8 }}
              whileInView={{ rotate: -5, scale: 1 }}
              className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100"
            >
              <Award className="h-8 w-8 text-brand-accent mb-2" />
              <p className="font-bold text-2xl serif">16 Años</p>
              <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">En el mercado</p>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-brand-accent mb-4 block text-center lg:text-left">Acerca de FC TRAVEL</span>
          <h2 className="serif text-3xl md:text-5xl mb-8 leading-[1.2] text-center lg:text-left">Experiencias que trascienden fronteras.</h2>
          
          <div className="space-y-6 text-gray-600 leading-relaxed text-center lg:text-left px-4 lg:px-0">
            <p>
              En FC Travel, no solo vendemos viajes; gestionamos el acceso a un estilo de vida. Durante más de una década, hemos consolidado una comunidad privada donde el viajar deja de ser una aspiración para convertirse en una realidad constante.
            </p>
            <p>
              Pertenecer a FC Travel significa contar con el respaldo de una infraestructura tecnológica global que nuestros socios utilizan para diseñar sus propias experiencias. Al ser un club de membresía, eliminamos los intermediarios y el miedo a los costos elevados, permitiéndote comparar y seleccionar vuelos, cruceros y alojamientos en tiempo real con beneficios que el público general no puede alcanzar. Aquí, tú tienes el control de tu itinerario y nosotros garantizamos la exclusividad de tu tarifa.
            </p>
          </div>

          <div className="mt-12">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-8 underline underline-offset-4 decoration-brand-accent text-center lg:text-left">Asociados con</p>
            <div className="flex flex-wrap gap-8 md:gap-12 justify-center lg:justify-start items-center">
              {associations.map((item) => (
                <div key={item.name} className="flex flex-col items-center group">
                  <div className="h-16 w-32 md:h-20 md:w-40 flex items-center justify-center p-2 rounded-xl bg-white border border-gray-100 shadow-sm transition-all grayscale hover:grayscale-0 hover:shadow-md">
                    <img 
                      src={item.logo} 
                      alt={item.name} 
                      className={`max-h-[80%] max-w-[80%] object-contain ${item.name === 'INGUAT' ? 'brightness-0 opacity-80' : ''}`}
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <span className="text-[7px] uppercase font-bold mt-2 text-center max-w-[100px] text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity tracking-widest leading-none">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white p-12 rounded-[40px] shadow-sm border border-gray-100 hover:shadow-xl transition-all group"
        >
          <div className="h-16 w-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-brand-accent transition-colors">
            <Target className="h-8 w-8 text-brand-accent group-hover:text-white transition-colors" />
          </div>
          <h3 className="serif text-3xl mb-6 italic">Nuestra Misión</h3>
          <p className="text-gray-500 leading-relaxed">
            Brindar un servicio altamente personalizado, de excelencia y fiabilidad, diseñando experiencias de viaje únicas con precios accesibles sin comprometer la calidad. Garantizamos el mejor valor del mercado superando consistentemente las expectativas de nuestros socios.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="bg-brand-primary p-12 rounded-[40px] shadow-sm text-white hover:shadow-2xl transition-all group"
        >
          <div className="h-16 w-16 bg-white/5 rounded-2xl flex items-center justify-center mb-8 border border-white/10 group-hover:bg-brand-accent transition-colors">
            <Eye className="h-8 w-8 text-brand-accent group-hover:text-white transition-colors" />
          </div>
          <h3 className="serif text-3xl mb-6 italic text-white">Nuestra Visión</h3>
          <p className="text-white/60 leading-relaxed">
            Convertirnos en una agencia de viajes de renombre regional, reconocida por la confiabilidad y seguridad que ofrecemos. Aspiramos a lograr la máxima satisfacción del cliente mediante servicios innovadores y la promoción de un entorno estable para relaciones interpersonales positivas.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
