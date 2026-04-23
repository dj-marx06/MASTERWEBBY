import { useState, FormEvent, ChangeEvent } from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, Clock, MapPin, MessageSquare, ExternalLink, Send, CheckCircle2 } from 'lucide-react';

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    socio: '',
    destino: ''
  });

  const contactInfo = [
    {
      title: 'Dirección',
      content: 'Edificio Ilumina, Roosevelt, Oficina 601A.',
      icon: MapPin,
      link: 'https://maps.google.com/?q=Edificio+Ilumina+Ciudad+de+Guatemala'
    },
    {
      title: 'Teléfonos',
      content: '2296-4430 / 2296-4431',
      icon: Phone,
      link: 'tel:22964430'
    },
    {
      title: 'WhatsApp',
      content: '5585-5004 / 5922-0367',
      icon: MessageSquare,
      link: 'https://wa.me/50255855004'
    },
    {
      title: 'Correo',
      content: 'fcservicio@aol.com',
      icon: Mail,
      link: 'mailto:fcservicio@aol.com'
    }
  ];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
        
        {/* Left: Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-white p-8 md:p-12 rounded-[40px] shadow-sm border border-gray-100"
        >
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-brand-accent mb-4 block">Formulario de Solicitud</span>
          <h2 className="serif text-4xl mb-8">Cotiza tu próximo destino</h2>
          
          {isSubmitted ? (
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="py-12 text-center"
            >
              <div className="h-16 w-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="h-8 w-8 text-green-500" />
              </div>
              <h3 className="serif text-2xl mb-4 text-brand-primary">¡Solicitud Enviada!</h3>
              <p className="text-gray-500">Un experto de FC TRAVEL se pondrá en contacto contigo pronto.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 pl-1">Nombre</label>
                  <input
                    type="text"
                    name="nombre"
                    required
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-3.5 px-5 text-sm focus:bg-white focus:border-brand-accent focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 pl-1">Apellido</label>
                  <input
                    type="text"
                    name="apellido"
                    required
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-3.5 px-5 text-sm focus:bg-white focus:border-brand-accent focus:outline-none transition-all"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 pl-1">Correo Electrónico</label>
                <input
                  type="email"
                  name="email"
                  required
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-3.5 px-5 text-sm focus:bg-white focus:border-brand-accent focus:outline-none transition-all"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 pl-1">Número de Socio</label>
                  <input
                    type="text"
                    name="socio"
                    placeholder="Ej. FCT-12345"
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-3.5 px-5 text-sm focus:bg-white focus:border-brand-accent focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 pl-1">Destino a Visitar</label>
                  <input
                    type="text"
                    name="destino"
                    required
                    placeholder="Ej. Madrid, España"
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-3.5 px-5 text-sm focus:bg-white focus:border-brand-accent focus:outline-none transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-brand-primary text-white font-bold text-xs uppercase tracking-widest py-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-brand-accent transition-all shadow-lg hover:shadow-brand-accent/20"
              >
                Enviar Solicitud
                <Send className="h-4 w-4" />
              </button>
            </form>
          )}
        </motion.div>

        {/* Right: Contact info & Hours */}
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-brand-accent mb-4 block">Atención Directa</span>
          <h2 className="serif text-4xl mb-8 leading-tight">Estamos listos para guiar tu próxima aventura.</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
            {contactInfo.map((info, index) => (
              <motion.a
                key={index}
                href={info.link}
                target={info.link.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                className="group flex flex-col p-6 rounded-3xl border border-gray-100 bg-white hover:shadow-xl hover:border-brand-accent/20 transition-all"
              >
                <div className="h-10 w-10 rounded-xl bg-gray-50 flex items-center justify-center mb-4 group-hover:bg-brand-accent transition-colors">
                  <info.icon className="h-5 w-5 text-brand-accent group-hover:text-white transition-all" />
                </div>
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">{info.title}</h4>
                <p className="text-[11px] font-semibold text-brand-primary leading-tight flex items-center justify-between">
                  {info.content}
                  <ExternalLink className="h-2 w-2 opacity-0 group-hover:opacity-100 transition-opacity ml-1" />
                </p>
              </motion.a>
            ))}
          </div>

          <div className="bg-brand-primary p-8 rounded-[40px] text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 p-8 opacity-10">
               <Clock className="h-24 w-24" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-2 w-2 rounded-full bg-brand-accent animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-accent">Estamos atendiendo</span>
              </div>
              <h3 className="serif text-2xl mb-4 italic">Nuestros Horarios</h3>
              <p className="text-white/60 text-sm leading-relaxed mb-6">
                Te esperamos en nuestras oficinas de Ciudad de Guatemala para una asesoría presencial de alta calidad.
              </p>
              <div className="flex items-center justify-between py-4 border-t border-white/10">
                <span className="text-[10px] uppercase font-bold tracking-widest text-white/40">Lunes - Viernes</span>
                <span className="text-sm font-bold tracking-tight">09:00 - 16:00 Hrs</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
