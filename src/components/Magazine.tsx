import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Document, Page, pdfjs } from 'react-pdf';
import HTMLFlipBook from 'react-pageflip';
import { BookOpen, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

// Setup worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function Magazine() {
  const [numPages, setNumPages] = useState<number>(0);
  const file = 'https://raw.githubusercontent.com/mozilla/pdf.js/master/web/compressed.tracemonkey-pldi-09.pdf'; // Sample PDF
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
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

  const PageContent = ({ pageNumber }: { pageNumber: number }) => {
    const pageWidth = bookSize.width;
    return (
      <div className="bg-white shadow-xl h-full flex items-center justify-center p-2 sm:p-4">
        <Page 
          pageNumber={pageNumber} 
          width={pageWidth} 
          renderTextLayer={false} 
          renderAnnotationLayer={false}
        />
      </div>
    );
  };

  return (
    <div className="container mx-auto px-6">
      <div className="flex flex-col lg:flex-row items-center lg:items-end justify-between mb-16 gap-8">
        <div className="max-w-2xl text-center lg:text-left">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-brand-accent mb-4 block">Experiencia Digital</span>
          <h2 className="serif text-3xl md:text-5xl mb-6">Nuestra Revista</h2>
          <p className="text-white/60 mb-4">
            Explora las últimas tendencias, destinos y consejos de viaje en nuestra revista interactiva. Desliza para pasar página como una revista real.
          </p>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-brand-accent font-medium italic text-lg"
          >
            "Hojear el mundo nunca fue tan sencillo. Toca, desliza y descubre tu próxima historia."
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
        {file ? (
          <div className="relative p-8 md:p-12 rounded-[40px] bg-gradient-to-br from-black/40 via-brand-primary/20 to-black/40 border border-white/10 shadow-2xl overflow-hidden backdrop-blur-sm">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='even-even' %3E%3Cg fill='%23ffffff' fill-opacity='1' %3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}></div>
            
            <Document file={file} onLoadSuccess={onDocumentLoadSuccess} loading={
              <div className="flex flex-col items-center justify-center h-[600px] w-full text-white/40">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-brand-accent mb-4" />
                <p className="text-xs uppercase tracking-widest">Cargando Revista...</p>
              </div>
            }>
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
                  >
                    {Array.from(new Array(numPages), (el, index) => (
                      <div key={`page_${index + 1}`} className="page">
                        <PageContent pageNumber={index + 1} />
                      </div>
                    ))}
                  </HTMLFlipBook>

                  <div className="mt-12 flex items-center gap-10">
                    <button 
                      onClick={() => bookRef.current.pageFlip().flipPrev()}
                      className="p-4 rounded-full border border-white/10 hover:bg-brand-accent transition-all hover:border-brand-accent group"
                    >
                      <ChevronLeft className="h-6 w-6 text-white group-hover:scale-110 transition-transform" />
                    </button>
                    <div className="flex flex-col items-center">
                       <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/40 mb-1">Pass Page</span>
                       <BookOpen className="h-5 w-5 text-brand-accent" />
                    </div>
                    <button 
                      onClick={() => bookRef.current.pageFlip().flipNext()}
                      className="p-4 rounded-full border border-white/10 hover:bg-brand-accent transition-all hover:border-brand-accent group"
                    >
                      <ChevronRight className="h-6 w-6 text-white group-hover:scale-110 transition-transform" />
                    </button>
                  </div>
                </div>
              )}
            </Document>
          </div>
        ) : (
          <div className="h-96 w-full flex items-center justify-center rounded-[40px] border-2 border-dashed border-white/10">
            <p className="text-white/40 uppercase text-xs tracking-widest">No hay revista seleccionada</p>
          </div>
        )}
      </div>

      <style>{`
        .magazine-container {
          box-shadow: 0 50px 100px -20px rgba(0,0,0,0.5);
        }
        .page {
          background-color: #fff;
        }
        .react-pdf__Page__canvas {
          max-width: 100%;
          height: auto !important;
        }
      `}</style>
    </div>
  );
}
