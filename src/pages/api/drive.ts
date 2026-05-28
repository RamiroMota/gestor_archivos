import type { APIRoute } from 'astro';
import { google } from 'googleapis';
import type { DriveItem, DriveListResponse } from '../../types/drive';

// Configuración de credenciales de Google desde las variables de entorno
const GOOGLE_CLIENT_EMAIL = import.meta.env.GOOGLE_CLIENT_EMAIL || process.env.GOOGLE_CLIENT_EMAIL;
const GOOGLE_PRIVATE_KEY = import.meta.env.GOOGLE_PRIVATE_KEY || process.env.GOOGLE_PRIVATE_KEY;
const ROOT_FOLDER_ID = import.meta.env.GOOGLE_DRIVE_ROOT_FOLDER_ID || process.env.GOOGLE_DRIVE_ROOT_FOLDER_ID || 'root';

// Datos Mock de alta fidelidad para desarrollo local instantáneo si no hay API configurada
const MOCK_ITEMS: Record<string, DriveItem[]> = {
  'root': [
    { id: 'folder-1', name: 'Documentación de Proyectos', mimeType: 'application/vnd.google-apps.folder', modifiedTime: '2026-05-20T10:00:00.000Z' },
    { id: 'folder-2', name: 'Diseños de Interfaz (UI/UX)', mimeType: 'application/vnd.google-apps.folder', modifiedTime: '2026-05-25T14:30:00.000Z' },
    { id: 'folder-3', name: 'Multimedia y Recursos', mimeType: 'application/vnd.google-apps.folder', modifiedTime: '2026-05-26T09:15:00.000Z' },
    { id: 'file-pdf-1', name: 'Especificación_Funcional_V2.pdf', mimeType: 'application/pdf', size: '2456780', modifiedTime: '2026-05-24T18:00:00.000Z' },
    { id: 'file-doc-1', name: 'Contrato de Desarrollo.docx', mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', size: '1048576', modifiedTime: '2026-05-21T11:20:00.000Z' },
    { id: 'file-img-1', name: 'Hero_Banner_TeraBox_Clone.jpg', mimeType: 'image/jpeg', size: '4194304', modifiedTime: '2026-05-27T12:00:00.000Z', thumbnailLink: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80' }
  ],
  'folder-1': [
    { id: 'file-pdf-2', name: 'Arquitectura_Limpia_Guia.pdf', mimeType: 'application/pdf', size: '5420100', modifiedTime: '2026-05-18T16:40:00.000Z' },
    { id: 'file-sheet-1', name: 'Presupuesto_2026.xlsx', mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', size: '512000', modifiedTime: '2026-05-19T10:10:00.000Z' }
  ],
  'folder-2': [
    { id: 'file-img-2', name: 'Paleta_Colores_Dashboard.png', mimeType: 'image/png', size: '824500', modifiedTime: '2026-05-26T15:20:00.000Z', thumbnailLink: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&q=80' },
    { id: 'file-img-3', name: 'Wireframes_Mobile_v1.jpg', mimeType: 'image/jpeg', size: '1540200', modifiedTime: '2026-05-25T11:05:00.000Z', thumbnailLink: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=400&q=80' }
  ],
  'folder-3': [
    { id: 'file-video-1', name: 'Presentacion_Producto_Demo.mp4', mimeType: 'video/mp4', size: '54289000', modifiedTime: '2026-05-24T17:35:00.000Z' },
    { id: 'file-audio-1', name: 'Audio_Entrevista_Feedback.mp3', mimeType: 'audio/mpeg', size: '8450000', modifiedTime: '2026-05-23T14:50:00.000Z' }
  ]
};

const FOLDER_NAMES: Record<string, string> = {
  'root': 'Carpeta Raíz',
  'folder-1': 'Documentación de Proyectos',
  'folder-2': 'Diseños de Interfaz (UI/UX)',
  'folder-3': 'Multimedia y Recursos'
};

const PARENT_FOLDERS: Record<string, string> = {
  'folder-1': 'root',
  'folder-2': 'root',
  'folder-3': 'root'
};

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  // Obtener la carpeta solicitada o por defecto usar la raíz
  const requestedFolderId = url.searchParams.get('folderId') || 'root';
  
  // Mapear 'root' al ID real de la carpeta de Drive compartida
  let folderId = requestedFolderId;
  if (folderId === 'root' && ROOT_FOLDER_ID !== 'root') {
    folderId = ROOT_FOLDER_ID;
  }

  // Verificamos si tenemos credenciales de Google configuradas en producción o local.
  // Si no existen, entramos en Modo Demostración de alta fidelidad.
  if (!GOOGLE_CLIENT_EMAIL || !GOOGLE_PRIVATE_KEY) {
    console.warn("Google credentials not configured. Serving mock demo data.");
    
    const items = MOCK_ITEMS[requestedFolderId] || [];
    const parentId = PARENT_FOLDERS[requestedFolderId];
    const folderName = FOLDER_NAMES[requestedFolderId] || 'Carpeta';

    const response: DriveListResponse = {
      items,
      currentFolderId: requestedFolderId,
      parentFolderId: parentId,
      folderName
    };

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  try {
    // Inicializar autenticación con la cuenta de servicio de Google
    const auth = new google.auth.JWT(
      GOOGLE_CLIENT_EMAIL,
      undefined,
      GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'), // Corregir saltos de línea de la clave privada
      ['https://www.googleapis.com/auth/drive.readonly']
    );

    const drive = google.drive({ version: 'v3', auth });

    // 1. Obtener detalles de la carpeta actual para el nombre
    let folderName = 'Carpeta Raíz';
    let parentFolderId: string | undefined = undefined;

    // Si no estamos en la raíz real ni virtual, consultar metadatos
    if (folderId !== ROOT_FOLDER_ID && folderId !== 'root') {
      const folderMeta = await drive.files.get({
        fileId: folderId,
        fields: 'name, parents',
      });
      folderName = folderMeta.data.name || 'Carpeta';
      if (folderMeta.data.parents && folderMeta.data.parents.length > 0) {
        parentFolderId = folderMeta.data.parents[0];
        // Si el padre es el ID de nuestra raíz de Drive, lo forzamos a 'root' para la navegación limpia del cliente
        if (parentFolderId === ROOT_FOLDER_ID) {
          parentFolderId = 'root';
        }
      }
    }

    // 2. Consultar archivos y subcarpetas dentro de esta carpeta
    const query = `'${folderId}' in parents and trashed = false`;
    const driveResponse = await drive.files.list({
      q: query,
      fields: 'files(id, name, mimeType, size, modifiedTime, thumbnailLink, iconLink)',
      orderBy: 'folder,name', // Carpetas primero, luego archivos alfabéticamente
      pageSize: 100,
    });

    const driveFiles = driveResponse.data.files || [];

    // Mapear los tipos de Google Drive a nuestra interfaz simplificada
    const items: DriveItem[] = driveFiles.map((file) => ({
      id: file.id || '',
      name: file.name || 'Sin nombre',
      mimeType: file.mimeType || 'application/octet-stream',
      size: file.size || undefined,
      modifiedTime: file.modifiedTime || undefined,
      thumbnailLink: file.thumbnailLink || undefined,
      iconLink: file.iconLink || undefined,
    }));

    const responseData: DriveListResponse = {
      items,
      currentFolderId: requestedFolderId,
      parentFolderId,
      folderName
    };

    return new Response(JSON.stringify(responseData), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=60' // Guardar en cache 60 segundos
      }
    });

  } catch (error: any) {
    console.error('Error fetching data from Google Drive API:', error);
    
    return new Response(JSON.stringify({ 
      error: 'Error al conectar con la API de Google Drive',
      details: error.message 
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};
