import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import HTMLFlipBook from 'react-pageflip';
import { BookOpen, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

export default function Magazine() {
  // 1. LISTA DE IMÁGENES: Agrega aquí las rutas de tus imágenes en /public
  const pagesImages = [
    '/pagina1.png',
    '/pagina2.png',
    '/pagina3.png',
    '/pagina4.png',
    '/pagina5.png',
  ];

  const filePDF = '/revista.pdf'; // Mantenemos esto solo para el botón de expandir
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const bookRef = useRef<any>(null);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getBookSize = () => {
    if (windowWidth < 640) return { width: (windowWidth - 40) / 2, height: ((windowWidth - 40) / 2) * 1.4 };
    if (windowWidth < 1024) return { width: 350, height: 500 };
    return { width: 450, height: 600 };
  };

  const bookSize = getBookSize();

  const handleExpand = () => {
    window.open(filePDF, '_blank');
  };

  return (
    <div className="container mx-auto px-6 py-10">
      <div className="flex flex-col lg:flex-row items-center lg:items-end justify-between mb-16 gap-8">
        <div className="max-w-2xl text-center lg:text-left">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-orange-500 mb-4 block">Experiencia Digital</span>
          <h2 className="serif text-3xl md:text-5xl mb-6 text-white">Nuestra Revista</h2>
          <p className="text-white/60 mb-4">
            Explora nuestra edición interactiva con carga instantánea.
          </p>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-orange-500 font-medium italic text-lg"
          >
            "Hojear el mundo nunca fue tan sencillo."
          </motion.p>
        </div>

        {/* Mantenemos el botón igual como pediste */}
        <button 
          onClick={handleExpand}
          className="flex items-center gap-3 rounded-full bg-orange-600 px-8 py-4 text-[11px] font-bold uppercase tracking-widest text-white shadow-lg transition-all hover:-translate-y-1 group"
        >
          <Maximize2 className="h-4 w-4 transition-transform group-hover:scale-110" />
          Ver PDF Original
        </button>
      </div>

      <div className="relative mx-auto flex flex-col items-center">
        <div className="relative p-8 md:p-12 rounded-[40px] bg-white/5 border border-white/10 shadow-2xl backdrop-blur-sm">
          
          <div className="flex flex-col items-center">
            {/* @ts-ignore */}
            <HTMLFlipBook
              width={bookSize.width}
              height={bookSize.height}
              size="stretch"
              minWidth={280}
              maxWidth={1000}
              minHeight={400}
              maxHeight={1533}
              drawShadow={true}
              showCover={true}
              mobileScrollSupport={true}
              ref={bookRef}
              className="magazine-container"
            >
              {/* RENDERIZADO DE IMÁGENES */}
              {pagesImages.map((image, index) => (
                <div key={index} className="page-wrapper bg-white">
                  <img 
                    src={image} 
                    alt={`Página ${index + 1}`} 
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              ))}
            </HTMLFlipBook>

            {/* Controles de Navegación */}
            <div className="mt-12 flex items-center gap-10">
              <button 
                onClick={() => bookRef.current.pageFlip().flipPrev()}
                className="p-4 rounded-full border border-white/10 hover:bg-orange-600 transition-all group"
              >
                <ChevronLeft className="h-6 w-6 text-white group-hover:scale-110 transition-transform" />
              </button>
              
              <div className="flex flex-col items-center">
                 <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/40 mb-1">Pasar página</span>
                 <BookOpen className="h-5 w-5 text-orange-500" />
              </div>

              <button 
                onClick={() => bookRef.current.pageFlip().flipNext()}
                className="p-4 rounded-full border border-white/10 hover:bg-orange-600 transition-all group"
              >
                <ChevronRight className="h-6 w-6 text-white group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .magazine-container {
          box-shadow: 0 50px 100px -20px rgba(0,0,0,0.5);
        }
        .page-wrapper {
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}} />
    </div>
  );
}