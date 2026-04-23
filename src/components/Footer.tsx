import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';
// Importamos tu logo desde la carpeta assets
import logoImage from '../assets/LOGO.png';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white pt-24 pb-12 overflow-hidden border-t border-gray-100">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between items-start mb-24 gap-16">
          <div className="max-w-xs">
            {/* Contenedor del Logo ajustado */}
            <div className="flex items-center gap-2 mb-8">
              <img 
                src={logoImage} 
                alt="FC TRAVEL Logo" 
                className="h-12 w-auto" 
              />
            </div>
            
            <p className="text-gray-500 leading-relaxed mb-8">
              Más de una década conectando a nuestros socios con el mundo. Acceso privado, tarifas exclusivas y la libertad de crear tu propia travesía con el respaldo de FC Travel.
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => (
                <a 
                  key={i} 
                  href="#" 
                  className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-50 text-gray-400 hover:bg-brand-accent hover:text-white transition-all transform hover:-translate-y-1"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-24">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-6 text-brand-primary">Agencia</h4>
              <ul className="space-y-4 text-sm text-gray-500">
                <li><a href="#nosotros" className="hover:text-brand-accent transition-colors">Nosotros</a></li>
                <li><a href="#beneficios" className="hover:text-brand-accent transition-colors">Beneficios</a></li>
                <li><a href="#revista" className="hover:text-brand-accent transition-colors">Revista Digital</a></li>
                <li><a href="#contacto" className="hover:text-brand-accent transition-colors">Atención al Cliente</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-6 text-brand-primary">Legal</h4>
              <ul className="space-y-4 text-sm text-gray-500">
                <li><a href="#" className="hover:text-brand-accent transition-colors">Términos y condiciones</a></li>
                <li><a href="#" className="hover:text-brand-accent transition-colors">Política de Privacidad</a></li>
                <li><a href="#" className="hover:text-brand-accent transition-colors">Garantías</a></li>
              </ul>
            </div>
            <div className="col-span-2 lg:col-span-1">
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-6 text-brand-primary">Ubicación</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Edificio Ilumina, Calzada Roosevelt,<br />
                Oficina 601A. Ciudad de Guatemala.
              </p>
              <p className="mt-4 text-sm font-bold text-brand-primary">
                +502 2296-4430
              </p>
            </div>
          </div>
        </div>

        <div className="relative pt-12 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] uppercase font-bold tracking-widest text-gray-400">
            &copy; {currentYear} FC TRAVEL Agencia de Viajes. All Rights Reserved.
          </p>
          <div className="flex gap-8 items-center opacity-30 pointer-events-none">
             <span className="text-[10px] font-bold uppercase tracking-widest">INGUAT Verified</span>
             <span className="text-[10px] font-bold uppercase tracking-widest">CAMTUR Member</span>
          </div>
          
          <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-brand-accent/5 blur-3xl opacity-50"></div>
        </div>
      </div>
    </footer>
  );
}