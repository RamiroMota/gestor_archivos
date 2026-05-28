import { 
  Folder, 
  FileText, 
  Image, 
  FileSpreadsheet, 
  Presentation, 
  Video, 
  Music, 
  Archive, 
  FileCode2, 
  FileCheck2,
  FileQuestion,
  type LucideIcon 
} from 'lucide-react';
import type { FileType } from '../types/drive';

/**
 * Formatea un tamaño en bytes a un formato legible por humanos (MB, KB, etc.)
 */
export function formatBytes(bytesStr?: string | number, decimals = 2): string {
  if (!bytesStr) return '--';
  const bytes = typeof bytesStr === 'string' ? parseInt(bytesStr, 10) : bytesStr;
  if (isNaN(bytes) || bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

/**
 * Obtiene la categoría del tipo de archivo a partir de su mimeType y nombre
 */
export function getFileType(mimeType: string, fileName: string): FileType {
  if (mimeType === 'application/vnd.google-apps.folder') return 'folder';
  if (mimeType === 'application/pdf') return 'pdf';
  if (mimeType.startsWith('image/')) return 'image';
  
  if (
    mimeType.startsWith('video/') || 
    mimeType === 'application/vnd.google-apps.video'
  ) return 'video';
  
  if (
    mimeType.startsWith('audio/') || 
    mimeType === 'application/vnd.google-apps.audio'
  ) return 'audio';

  const ext = fileName.split('.').pop()?.toLowerCase();
  
  // Hojas de cálculo
  if (
    mimeType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
    mimeType === 'application/vnd.google-apps.spreadsheet' ||
    ext === 'xlsx' || ext === 'xls' || ext === 'csv'
  ) return 'spreadsheet';

  // Presentaciones
  if (
    mimeType === 'application/vnd.openxmlformats-officedocument.presentationml.presentation' ||
    mimeType === 'application/vnd.google-apps.presentation' ||
    ext === 'pptx' || ext === 'ppt'
  ) return 'presentation';

  // Documentos de texto
  if (
    mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
    mimeType === 'application/vnd.google-apps.document' ||
    mimeType === 'text/plain' ||
    ext === 'docx' || ext === 'doc' || ext === 'txt' || ext === 'md'
  ) return 'document';

  // Archivos comprimidos
  if (
    mimeType === 'application/zip' ||
    mimeType === 'application/x-rar-compressed' ||
    ext === 'zip' || ext === 'rar' || ext === 'tar' || ext === 'gz'
  ) return 'archive';

  return 'unknown';
}

/**
 * Retorna el Icono de Lucide correspondiente según el tipo de archivo
 */
export function getFileIcon(type: FileType): LucideIcon {
  switch (type) {
    case 'folder':
      return Folder;
    case 'pdf':
      return FileCheck2; // O un icono rojo
    case 'image':
      return Image;
    case 'document':
      return FileText;
    case 'spreadsheet':
      return FileSpreadsheet;
    case 'presentation':
      return Presentation;
    case 'video':
      return Video;
    case 'audio':
      return Music;
    case 'archive':
      return Archive;
    default:
      return FileQuestion;
  }
}

/**
 * Retorna las clases de colores de Tailwind recomendadas según el tipo
 */
export function getFileTypeStyles(type: FileType): { bg: string, text: string, hoverBg: string, hoverBorder: string, hoverShadow: string } {
  switch (type) {
    case 'folder':
      return { 
        bg: 'bg-blue-50', 
        text: 'text-blue-500', 
        hoverBg: 'hover:bg-blue-50/60', 
        hoverBorder: 'hover:border-blue-200', 
        hoverShadow: 'hover:shadow-blue-500/5' 
      };
    case 'pdf':
      return { 
        bg: 'bg-red-50', 
        text: 'text-red-500', 
        hoverBg: 'hover:bg-red-50/60', 
        hoverBorder: 'hover:border-red-200', 
        hoverShadow: 'hover:shadow-red-500/5' 
      };
    case 'image':
      return { 
        bg: 'bg-purple-50', 
        text: 'text-purple-500', 
        hoverBg: 'hover:bg-purple-50/60', 
        hoverBorder: 'hover:border-purple-200', 
        hoverShadow: 'hover:shadow-purple-500/5' 
      };
    case 'document':
      return { 
        bg: 'bg-sky-50', 
        text: 'text-sky-500', 
        hoverBg: 'hover:bg-sky-50/60', 
        hoverBorder: 'hover:border-sky-200', 
        hoverShadow: 'hover:shadow-sky-500/5' 
      };
    case 'spreadsheet':
      return { 
        bg: 'bg-green-50', 
        text: 'text-green-500', 
        hoverBg: 'hover:bg-green-50/60', 
        hoverBorder: 'hover:border-green-200', 
        hoverShadow: 'hover:shadow-green-500/5' 
      };
    case 'presentation':
      return { 
        bg: 'bg-amber-50', 
        text: 'text-amber-500', 
        hoverBg: 'hover:bg-amber-50/60', 
        hoverBorder: 'hover:border-amber-200', 
        hoverShadow: 'hover:shadow-amber-500/5' 
      };
    case 'video':
      return { 
        bg: 'bg-rose-50', 
        text: 'text-rose-500', 
        hoverBg: 'hover:bg-rose-50/60', 
        hoverBorder: 'hover:border-rose-200', 
        hoverShadow: 'hover:shadow-rose-500/5' 
      };
    case 'audio':
      return { 
        bg: 'bg-indigo-50', 
        text: 'text-indigo-500', 
        hoverBg: 'hover:bg-indigo-50/60', 
        hoverBorder: 'hover:border-indigo-200', 
        hoverShadow: 'hover:shadow-indigo-500/5' 
      };
    case 'archive':
      return { 
        bg: 'bg-yellow-50', 
        text: 'text-yellow-600', 
        hoverBg: 'hover:bg-yellow-50/60', 
        hoverBorder: 'hover:border-yellow-200', 
        hoverShadow: 'hover:shadow-yellow-500/5' 
      };
    default:
      return { 
        bg: 'bg-gray-50', 
        text: 'text-gray-500', 
        hoverBg: 'hover:bg-gray-50/60', 
        hoverBorder: 'hover:border-gray-250', 
        hoverShadow: 'hover:shadow-gray-500/5' 
      };
  }
}
