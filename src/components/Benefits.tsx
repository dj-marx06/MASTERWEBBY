import { motion } from 'motion/react';
import { Coins, Star, Users, Heart, Zap, ShieldCheck, Wallet, CalendarX, CheckCircle2 } from 'lucide-react';

export default function Benefits() {
  const benefits = [
    { title: 'SIN CUOTAS ANUALES', icon: CalendarX },
    { title: 'NO TIEMPO COMPARTIDO', icon: Zap },
    { title: 'PLAZOS CORTOS DE PAGO', icon: Wallet },
    { title: 'GARANTIA DE HOSPEDAJE', icon: ShieldCheck },
    { title: 'NUNCA COBROS POR MANTENIMIENTO', icon: Heart },
    { title: 'SERVICIOS PARA TODO EL NÚCLEO FAMILIAR', icon: Users },
    { title: 'GARANTIA DEL MEJOR VALOR COMPROBADO', icon: Star },
    { title: 'SIN CARGOS POR EL CERTIFICADO DE INVITADOS', icon: CheckCircle2 },
    { title: 'ÚNICO PAGO EN QUETZALES', icon: Coins },
  ];

  return (
    <div className="container mx-auto px-6">
      <div className="text-center max-w-3xl mx-auto mb-12 md:mb-20">
        <span className="text-xs font-bold uppercase tracking-[0.3em] text-brand-accent mb-4 block">Exclusividad</span>
        <h2 className="serif text-3xl md:text-5xl mb-6 px-4">Beneficios de formar parte de FC TRAVEL</h2>
        <p className="text-gray-500 px-4 text-sm md:text-base">
          Nuestros socios disfrutan de ventajas únicas diseñadas para hacer que cada viaje sea accesible, seguro y completamente personalizado.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {benefits.map((benefit, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -5 }}
            className="flex items-center gap-4 md:gap-6 p-6 md:p-8 rounded-2xl md:rounded-3xl bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-xl hover:border-brand-accent/20 transition-all group"
          >
            <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-white flex items-center justify-center border border-gray-100 group-hover:bg-brand-accent transition-colors shadow-sm shrink-0">
              <benefit.icon className="h-5 w-5 md:h-6 md:w-6 text-brand-accent group-hover:text-white transition-colors" />
            </div>
            <span className="text-[11px] md:text-sm font-bold uppercase tracking-widest text-brand-primary leading-tight">
              {benefit.title}
            </span>
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="mt-16 md:mt-20 p-8 md:p-12 rounded-[32px] md:rounded-[40px] bg-brand-accent/5 border border-brand-accent/10 flex flex-col lg:flex-row items-center gap-8 md:gap-12"
      >
        <div className="flex-1">
          <h3 className="serif text-3xl mb-4 italic">¿Por qué viajar con nosotros?</h3>
          <p className="text-gray-600 leading-relaxed">
            Sabemos que la mayoría de veces las personas no viajan por desconocimiento o por miedo de que los precios sean muy elevados. Con FC TRAVEL nuestros socios pueden beneficiarse de precios cómodos para viajar por todo el país y por todo el mundo.
          </p>
        </div>
        <div className="flex-shrink-0">
          <div className="bg-brand-primary text-white p-8 rounded-full h-32 w-32 flex flex-col items-center justify-center text-center shadow-xl">
            <span className="text-2xl font-bold italic">100%</span>
            <span className="text-[8px] uppercase font-bold tracking-[0.2em] opacity-60 leading-none">Garantizado</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
