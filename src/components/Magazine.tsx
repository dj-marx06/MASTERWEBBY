import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion'; // Corregido: usualmente es framer-motion o motion
import { Document, Page, pdfjs } from 'react-pdf';
import HTMLFlipBook from 'react-pageflip';
import { BookOpen, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

// Estilos necesarios para react-pdf
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Configuración del Worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function Magazine() {
  const [numPages, setNumPages] = useState<number>(0);
  const file = '/revista.pdf'; // Ruta directa a la carpeta public
  
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const bookRef = useRef<any>(null);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  const getBookSize = () => {
    if (windowWidth < 640) return { width: (windowWidth - 40) / 2, height: ((windowWidth - 40) / 2) * 1.4 };
    if (windowWidth < 1024) return { width: 350, height: 500 };
    return { width: 450, height: 600 };
  };

  const bookSize = getBookSize();

  const handleExpand = () => {
    window.open(file, '_blank');
  };

  // Componente de página con corrección de escala
  const PageContent = ({ pageNumber }: { pageNumber: number }) => {
    return (
      <div className="page-content-inner bg-white w-full h-full flex items-center justify-center">
        <Page 
          pageNumber={pageNumber} 
          width={bookSize.width}
          scale={1} // Ajusta a 1.2 o 1.5 si se ve borroso
          renderTextLayer={false} 
          renderAnnotationLayer={false}
          className="pdf-page-canvas"
        />
      </div>
    );
  };

  return (
    <div className="container mx-auto px-6 py-10">
      {/* Header */}
      <div className="flex flex-col lg:flex-row items-center lg:items-end justify-between mb-16 gap-8">
        <div className="max-w-2xl text-center lg:text-left">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-orange-500 mb-4 block">Experiencia Digital</span>
          <h2 className="text-3xl md:text-5xl mb-6 font-serif text-white">Nuestra Revista</h2>
          <p className="text-white/60 mb-4">Explora nuestras últimas ediciones interactivas.</p>
        </div>

        <button 
          onClick={handleExpand}
          className="flex items-center gap-3 rounded-full bg-orange-600 px-8 py-4 text-[11px] font-bold uppercase tracking-widest text-white hover:bg-orange-500 transition-all group"
        >
          <Maximize2 className="h-4 w-4" />
          Ver PDF Original
        </button>
      </div>

      {/* Revista Container */}
      <div className="relative mx-auto flex flex-col items-center">
        <div className="relative p-2 md:p-10 rounded-[40px] bg-white/5 border border-white/10 shadow-2xl backdrop-blur-sm">
          
          <Document 
            file={file} 
            onLoadSuccess={onDocumentLoadSuccess} 
            loading={<div className="text-white p-20">Cargando revista...</div>}
          >
            {numPages > 0 && (
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
                  {Array.from(new Array(numPages), (_, index) => (
                    <div key={`page_${index + 1}`} className="page-wrapper">
                      <PageContent pageNumber={index + 1} />
                    </div>
                  ))}
                </HTMLFlipBook>

                {/* Controles */}
                <div className="mt-12 flex items-center gap-10">
                  <button 
                    onClick={() => bookRef.current?.pageFlip()?.flipPrev()}
                    className="p-4 rounded-full border border-white/10 text-white hover:bg-orange-600 transition-all"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  
                  <div className="flex flex-col items-center">
                     <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-1">Hojear</span>
                     <BookOpen className="h-5 w-5 text-orange-500" />
                  </div>

                  <button 
                    onClick={() => bookRef.current?.pageFlip()?.flipNext()}
                    className="p-4 rounded-full border border-white/10 text-white hover:bg-orange-600 transition-all"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </div>
              </div>
            )}
          </Document>
        </div>
      </div>

      {/* CSS CRUCIAL PARA VITE/REACT */}
      <style>{`
        .magazine-container {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }
        .page-wrapper {
          background-color: white;
          overflow: hidden;
        }
        .page-content-inner {
          width: 100%;
          height: 100%;
        }
        /* Esto obliga al PDF a dibujarse correctamente */
        .pdf-page-canvas canvas {
          width: 100% !important;
          height: auto !important;
          display: block !important;
        }
        .react-pdf__Page {
          background-color: transparent !important;
        }
      `}</style>
    </div>
  );
}