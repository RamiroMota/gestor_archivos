import React, { useEffect } from 'react';
import { X, Lock, Eye, AlertTriangle } from 'lucide-react';
import type { DriveItem } from '../types/drive';
import { getFileType } from '../utils/driveHelper';

interface PreviewModalProps {
  item: DriveItem | null;
  onClose: () => void;
}

export default function PreviewModal({ item, onClose }: PreviewModalProps) {
  if (!item) return null;

  const fileType = getFileType(item.mimeType, item.name);

  // Efecto para bloquear clic derecho e intercepciones de teclado de seguridad
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Bloquear Ctrl + S (Guardar)
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        alert('Modo Lectura Estricto: La descarga está deshabilitada.');
      }
      // Bloquear Ctrl + P (Imprimir)
      if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
        alert('Modo Lectura Estricto: La impresión está deshabilitada.');
      }
      // Bloquear Ctrl + C (Copiar)
      if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
        e.preventDefault();
      }
      // Bloquear F12 (Herramientas de Desarrollador)
      if (e.key === 'F12') {
        e.preventDefault();
      }
    };

    // Agregar listeners
    document.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('keydown', handleKeyDown);

    // Limpieza de listeners al desmontar
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Renderizar la previsualización según el tipo de archivo
  const renderPreviewContent = () => {
    const isMock = item.id.startsWith('file-');
    const previewUrl = isMock ? '' : `/api/preview?fileId=${item.id}`;

    // Si es imagen
    if (fileType === 'image') {
      const src = isMock 
        ? (item.thumbnailLink?.replace('=s220', '=s1000') || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1000&q=80')
        : previewUrl;
      return (
        <div className="relative flex items-center justify-center h-full max-h-[70vh] bg-neutral-900/50 rounded-xl overflow-hidden select-none">
          <img 
            src={src} 
            alt={item.name} 
            className="max-h-full max-w-full object-contain rounded-lg pointer-events-none select-none"
            draggable="false"
          />
          {/* Capa invisible para evitar drag and drop o clicks en la imagen */}
          <div className="absolute inset-0 bg-transparent" />
        </div>
      );
    }

    if (fileType === 'pdf') {
      const src = isMock
        ? "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf-test.pdf#toolbar=0&navpanes=0&scrollbar=0"
        : `${previewUrl}#toolbar=0&navpanes=0&scrollbar=0`;
      return (
        <div className="relative w-full h-[65vh] bg-neutral-800 rounded-xl overflow-hidden">
          <iframe
            src={src}
            className="w-full h-full border-0 select-none"
            title={item.name}
          />
          {/* Capa de protección física de seguridad sobrepuesta en la barra de herramientas superior para evitar descarga/impresión mientras permite scrolling en el contenido */}
          <div className="absolute top-0 left-0 right-0 h-[56px] bg-transparent pointer-events-auto cursor-default" />
          
          <div className="absolute top-2 left-2 bg-slate-900/90 text-xs text-slate-300 px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-slate-700/50 backdrop-blur-md">
            <Lock className="w-3.5 h-3.5 text-brand-400 animate-pulse" /> Visor Seguro Activo (Modo Lectura)
          </div>
        </div>
      );
    }

    if (fileType === 'video') {
      const src = isMock
        ? "https://assets.mixkit.co/videos/preview/mixkit-stars-in-space-background-1611-large.mp4"
        : previewUrl;
      return (
        <div className="relative w-full max-h-[70vh] aspect-video bg-neutral-900 rounded-xl overflow-hidden">
          <video 
            controls 
            controlsList="nodownload nofullscreen" 
            disablePictureInPicture
            className="w-full h-full object-contain"
          >
            <source src={src} type={item.mimeType || 'video/mp4'} />
            Tu navegador no soporta reproducción de video.
          </video>
          {/* Capa para evitar menú contextual en el reproductor */}
          <div className="absolute inset-0 bg-transparent pointer-events-none" />
        </div>
      );
    }

    if (fileType === 'audio') {
      const src = isMock
        ? "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
        : previewUrl;
      return (
        <div className="flex flex-col items-center justify-center p-8 bg-slate-800/50 rounded-xl border border-slate-700/50 backdrop-blur-md">
          <div className="w-16 h-16 bg-brand-500/10 rounded-full flex items-center justify-center text-brand-400 mb-4 border border-brand-500/20">
            <Eye className="w-8 h-8" />
          </div>
          <p className="text-slate-300 font-medium mb-4">{item.name}</p>
          <audio 
            controls 
            controlsList="nodownload" 
            className="w-full max-w-md"
          >
            <source src={src} type={item.mimeType || 'audio/mpeg'} />
            Tu navegador no soporta reproducción de audio.
          </audio>
        </div>
      );
    }

    // Default fallback para documentos
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center bg-slate-800/40 rounded-xl border border-slate-700/50 backdrop-blur">
        <AlertTriangle className="w-12 h-12 text-yellow-500 mb-4" />
        <h4 className="text-slate-200 font-semibold mb-2">Previsualización Protegida</h4>
        <p className="text-slate-400 text-sm max-w-md mb-6">
          Este archivo ({item.name}) está protegido bajo la política de Modo Lectura Estricto. Puedes ver los metadatos pero el visor completo está deshabilitado temporalmente.
        </p>
        <div className="text-xs text-slate-500 bg-slate-900/50 px-4 py-2 rounded-lg border border-slate-700/30">
          ID de Archivo: {item.id} <br />
          MimeType: {item.mimeType}
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl bg-slate-900/90 rounded-2xl border border-slate-700/50 shadow-2xl overflow-hidden">
        {/* Cabecera del Modal */}
        <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-950/40">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-rose-500/10 text-rose-400 rounded-lg border border-rose-500/20">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-slate-100 font-semibold leading-none flex items-center gap-2">
                {item.name}
              </h3>
              <p className="text-slate-400 text-xs mt-1">Previsualización Segura • Descarga Bloqueada</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-slate-200 rounded-lg transition-colors border border-transparent hover:border-slate-700/50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Contenido del Modal */}
        <div className="p-6 overflow-y-auto max-h-[75vh]">
          {renderPreviewContent()}
        </div>

        {/* Pie del Modal */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-950/40 border-t border-slate-800 text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Encriptación de canal HTTPS activa</span>
          </div>
          <p>© 2026 TeraBox Clone - Modo Lectura Protegido</p>
        </div>
      </div>
    </div>
  );
}
