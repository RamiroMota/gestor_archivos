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
export function getFileTypeStyles(type: FileType): { bg: string, text: string } {
  switch (type) {
    case 'folder':
      return { bg: 'bg-blue-50 dark:bg-blue-950/40', text: 'text-blue-500 dark:text-blue-400' };
    case 'pdf':
      return { bg: 'bg-red-50 dark:bg-red-950/40', text: 'text-red-500 dark:text-red-400' };
    case 'image':
      return { bg: 'bg-purple-50 dark:bg-purple-950/40', text: 'text-purple-500 dark:text-purple-400' };
    case 'document':
      return { bg: 'bg-sky-50 dark:bg-sky-950/40', text: 'text-sky-500 dark:text-sky-400' };
    case 'spreadsheet':
      return { bg: 'bg-green-50 dark:bg-green-950/40', text: 'text-green-500 dark:text-green-400' };
    case 'presentation':
      return { bg: 'bg-amber-50 dark:bg-amber-950/40', text: 'text-amber-500 dark:text-amber-400' };
    case 'video':
      return { bg: 'bg-rose-50 dark:bg-rose-950/40', text: 'text-rose-500 dark:text-rose-400' };
    case 'audio':
      return { bg: 'bg-indigo-50 dark:bg-indigo-950/40', text: 'text-indigo-500 dark:text-indigo-400' };
    case 'archive':
      return { bg: 'bg-yellow-50 dark:bg-yellow-950/40', text: 'text-yellow-600 dark:text-yellow-400' };
    default:
      return { bg: 'bg-gray-50 dark:bg-gray-800', text: 'text-gray-500 dark:text-gray-400' };
  }
}
