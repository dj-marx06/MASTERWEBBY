import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Document, Page, pdfjs } from 'react-pdf';
import HTMLFlipBook from 'react-pageflip';
import { BookOpen, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

// --- CONFIGURACIÓN DEL WORKER (CDN ROBUSTA) ---
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;

export default function Magazine() {
  const [numPages, setNumPages] = useState<number>(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const bookRef = useRef<any>(null);

  // --- RUTA AL PDF ---
  // Al estar en la carpeta 'public', se accede con '/'
  const file = '/revista.pdf';

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

  const PageContent = ({ pageNumber }: { pageNumber: number }) => {
    return (
      <div className="bg-white shadow-xl h-full flex items-center justify-center">
        <Page 
          pageNumber={pageNumber} 
          width={bookSize.width} 
          renderTextLayer={false} 
          renderAnnotationLayer={false}
          loading=""
        />
      </div>
    );
  };

  return (
    <div className="container mx-auto px-6 py-10">
      <div className="flex flex-col lg:flex-row items-center lg:items-end justify-between mb-16 gap-8">
        <div className="max-w-2xl text-center lg:text-left">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-brand-accent mb-4 block">
            Experiencia Digital
          </span>
          <h2 className="serif text-3xl md:text-5xl mb-6">Nuestra Revista</h2>
          <p className="text-white/60 mb-4">
            Explora las últimas tendencias y destinos en nuestra revista interactiva. 
            Desliza para pasar página.
          </p>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-brand-accent font-medium italic text-lg"
          >
            "Hojear el mundo nunca fue tan sencillo."
          </motion.p>
        </div>

        <button 
          onClick={handleExpand}
          className="flex items-center gap-3 rounded-full bg-brand-accent px-8 py-4 text-[11px] font-bold uppercase tracking-widest text-white shadow-lg hover:shadow-brand-accent/20 transition-all hover:-translate-y-1 group"
        >
          <Maximize2 className="h-4 w-4 transition-transform group-hover:scale-110" />
          Expandir Revista
        </button>
      </div>

      <div className="relative mx-auto flex flex-col items-center">
        <div className="relative p-4 md:p-12 rounded-[40px] bg-gradient-to-br from-black/40 via-brand-primary/20 to-black/40 border border-white/10 shadow-2xl overflow-hidden backdrop-blur-sm">
          
          <Document 
            file={file} 
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={(error) => console.error("Error al cargar PDF:", error)}
            loading={
              <div className="flex flex-col items-center justify-center h-[500px] w-full text-white/40">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-brand-accent mb-4" />
                <p className="text-xs uppercase tracking-widest">Cargando PDF...</p>
              </div>
            }
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
                  maxShadowOpacity={0.5}
                  showCover={true}
                  mobileScrollSupport={true}
                  ref={bookRef}
                  className="magazine-container"
                  style={{ margin: '0 auto' }}
                  startPage={0}
                  flippingTime={1000}
                  usePortrait={true}
                  startZIndex={0}
                  autoSize={true}
                  clickEventForward={true}
                  useMouseEvents={true}
                  swipeDistance={30}
                  showPageCorners={true}
                  disableFlipByClick={false}
                >
                  {Array.from(new Array(numPages), (_, index) => (
                    <div key={`page_${index + 1}`} className="page shadow-2xl">
                      <PageContent pageNumber={index + 1} />
                    </div>
                  ))}
                </HTMLFlipBook>

                <div className="mt-12 flex items-center gap-10">
                  <button 
                    onClick={() => bookRef.current?.pageFlip().flipPrev()}
                    className="p-4 rounded-full border border-white/10 hover:bg-brand-accent transition-all group"
                  >
                    <ChevronLeft className="h-6 w-6 text-white" />
                  </button>
                  
                  <div className="flex flex-col items-center">
                     <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-1">Pass Page</span>
                     <BookOpen className="h-5 w-5 text-brand-accent" />
                  </div>
                  
                  <button 
                    onClick={() => bookRef.current?.pageFlip().flipNext()}
                    className="p-4 rounded-full border border-white/10 hover:bg-brand-accent transition-all group"
                  >
                    <ChevronRight className="h-6 w-6 text-white" />
                  </button>
                </div>
              </div>
            )}
          </Document>
        </div>
      </div>

      <style>{`
        .magazine-container {
          box-shadow: 0 50px 100px -20px rgba(0,0,0,0.5);
        }
        .page {
          background-color: #fff;
          overflow: hidden;
        }
        /* Ajustes críticos para el renderizado del PDF */
        .react-pdf__Page__canvas {
          width: 100% !important;
          height: auto !important;
          display: block !important;
        }
        .react-pdf__Page {
          background-color: transparent !important;
          display: flex !important;
          justify-content: center !important;
        }
        .react-pdf__Page__textLayer, 
        .react-pdf__Page__annotations {
          display: none !important;
        }
      `}</style>
    </div>
  );
}