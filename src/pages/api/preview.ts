import type { APIRoute } from 'astro';
import { google } from 'googleapis';

const GOOGLE_CLIENT_EMAIL = import.meta.env.GOOGLE_CLIENT_EMAIL || process.env.GOOGLE_CLIENT_EMAIL;
const GOOGLE_PRIVATE_KEY = import.meta.env.GOOGLE_PRIVATE_KEY || process.env.GOOGLE_PRIVATE_KEY;

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const fileId = url.searchParams.get('fileId');

  if (!fileId) {
    return new Response(JSON.stringify({ error: 'ID de archivo requerido' }), { status: 400 });
  }

  // Si no hay credenciales, retornamos un placeholder para desarrollo
  if (!GOOGLE_CLIENT_EMAIL || !GOOGLE_PRIVATE_KEY) {
    return new Response(JSON.stringify({ error: 'Credenciales de Google no configuradas' }), { status: 500 });
  }

  try {
    const auth = new google.auth.JWT(
      GOOGLE_CLIENT_EMAIL,
      undefined,
      GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      ['https://www.googleapis.com/auth/drive.readonly']
    );

    const drive = google.drive({ version: 'v3', auth });

    // 1. Obtener los metadatos para conocer el tipo MIME exacto
    const metadata = await drive.files.get({
      fileId: fileId,
      fields: 'name, mimeType, size',
    });

    const mimeType = metadata.data.mimeType || 'application/octet-stream';

    // 2. Descargar el archivo como stream de datos binarios
    const driveResponse = await drive.files.get(
      { fileId: fileId, alt: 'media' },
      { responseType: 'stream' }
    );

    // Astro puede retornar el stream de Node.js directamente como cuerpo de la respuesta en SSR
    return new Response(driveResponse.data as any, {
      status: 200,
      headers: {
        'Content-Type': mimeType,
        'Content-Disposition': 'inline', // Muestra en el navegador en lugar de descargar
        'X-Content-Type-Options': 'nosniff',
        'Cache-Control': 'public, max-age=3600',
      },
    });

  } catch (error: any) {
    console.error('Error al hacer proxy del archivo desde Google Drive:', error);
    return new Response(JSON.stringify({
      error: 'No se pudo cargar la previsualización del archivo',
      details: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
