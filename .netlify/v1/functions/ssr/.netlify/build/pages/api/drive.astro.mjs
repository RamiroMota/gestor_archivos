import { google } from 'googleapis';
export { renderers } from '../../renderers.mjs';

const GOOGLE_CLIENT_EMAIL = "portal-robot@cool-splice-493319-g9.iam.gserviceaccount.com";
const GOOGLE_PRIVATE_KEY = "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCZ+LQLhPqKYt2K\n9puLDQPhl1iJ0ZjRVJMVWYM1MhsWH8Jf/ljA0XEyVSALJVnmI1/yfO1K4aHVOjCl\nKjZo5fZGjNS8LnL2IOfUyB3f/MAT/uTOBb60brmT/RTzPSy5QCYAlmTDA4QK/JZP\ng0RRR+Y8dO9x6RdW41MHIKeYCQFfYRKulEGygp4olS6YtjEFdNu3F87uT1AE04yc\ntqUrdq6r+Rlr6f+Ph8SNu4ZHOm7CSvg61b/2nJGc3ln+DYXfiu+n4OXe8+ERyy7J\nK5QBG4ic46jFyvV4tyuxDSaOgKu8rKsmMNeteh7NwVwJzUGqV0s+hFiXopAsJDWX\n8Ywz3Vk1AgMBAAECggEAA/f8YhChKZh/R+Hv4+9nsnSleFXx97FTojj+sAwU1Sbn\n6nQCoyOy5H57tzXVAaDXTAeK0UOMGZQopVU3dlA5HxvprtkOpwf1mc83r+qSo+FN\n0f6laf6xo14iYFurD7JW2GyH99vbFzJoCHAkfmjZRyUnd9rvelKdNQGTOFDBG415\nguhF43FuSYVL8PzTkq9MdprGV9AXIyiS68GRFq2JnN1Xm3/Qbl1FRIYLq02q0nS1\nv9b4t73nxsjdvsn5ggOUfCpiknv6s12oaEQYTAtiOoBkKSQnYihAodAZzyhSZHMc\nAj0Bee03MGbve/8KdJ6UtaIAKExkDwQQBJt1jVHwGQKBgQDG84o+cKkp3RiHX8yT\n8KvRGRoHTUGBUBKzuizm9/oDix3a/mFKADzfW54qQPBISzdsPxqXBC8rNDNIWiFd\njG76rvTVKKPIqA72vL/biiUG84kOkA8bJxYH4f8gIq8e/OlDakLrkhes1RL3OA34\nkQV7iUwZdRt9K1DxTAJ8y3DQqQKBgQDGH1Hgcc2srXL1wZEjnWyJqmuB54h97pL+\nCiGnbpvhgq/BFcM3e90xh9ex0qMWzJ6Y+I2S2H6FovRC6EZIYOL5vyop0BsaEMyB\ntjDCaGMWCwHsTikwnYifC0wQnIVaKsrzcfjz4kxW+nFp3lwRV+ccUfZ4JZbRoAGs\nO1fK54j/rQKBgB/LAXeS92WKQIY5p+6oUjy6/y7ViLdKfYKdKNnMHPb9/0pkxlVW\nDmQ/NtpXwE49PuEcgHpLn+IOmHdid9yEOaPz24pI0Uual7GUXjCONfaTan6aRN+4\n8ktWMTgIcuXH0tsEGyecFA55imtZWNo1CqRAP5n93eO1zVySIf+hXyjpAoGAdgLf\n5V5EUa/7QxGqn1k89n9xjC5a6hA6tGFajH3hEiGjCNMqthjst30f6Mb76C+35Ixg\n3/Be5MEc1+G9Q42ahYLt3XwdOJh7CGR6hMJjCxVBbv1boZ6ka3/yLg7di8jjnMDt\ntm+8Yy7IcXRGyPngKslTk1toi7LQbEPo1m619v0CgYEAksA6gt5wZI/ZeacETIOo\nYRZ0la1TJNuD0IochFGUIW3QPUBmMciz4dt0oZYwrJArWJV5RN/gGC/ZghGLyz+r\nLI2rW+OZkuRd0C9bPD3PpEytKz9CrLD1V7MOlcuBOBV+Pppf+iv9BxR4STBKfHUu\nkFAbrlcvu2JRJZaiWphCNWA=\n-----END PRIVATE KEY-----";
const ROOT_FOLDER_ID = "18qhlscU4DYqgWMMVMpgS6YXGPTEuNz6x";
const GET = async ({ request }) => {
  const url = new URL(request.url);
  const requestedFolderId = url.searchParams.get("folderId") || "root";
  let folderId = requestedFolderId;
  if (folderId === "root" && ROOT_FOLDER_ID !== "root") {
    folderId = ROOT_FOLDER_ID;
  }
  try {
    const auth = new google.auth.JWT(
      GOOGLE_CLIENT_EMAIL,
      void 0,
      GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      // Corregir saltos de línea de la clave privada
      ["https://www.googleapis.com/auth/drive.readonly"]
    );
    const drive = google.drive({ version: "v3", auth });
    let folderName = "Carpeta Raíz";
    let parentFolderId = void 0;
    if (folderId !== ROOT_FOLDER_ID && folderId !== "root") {
      const folderMeta = await drive.files.get({
        fileId: folderId,
        fields: "name, parents"
      });
      folderName = folderMeta.data.name || "Carpeta";
      if (folderMeta.data.parents && folderMeta.data.parents.length > 0) {
        parentFolderId = folderMeta.data.parents[0];
        if (parentFolderId === ROOT_FOLDER_ID) {
          parentFolderId = "root";
        }
      }
    }
    const query = `'${folderId}' in parents and trashed = false`;
    const driveResponse = await drive.files.list({
      q: query,
      fields: "files(id, name, mimeType, size, modifiedTime, thumbnailLink, iconLink)",
      orderBy: "folder,name",
      // Carpetas primero, luego archivos alfabéticamente
      pageSize: 100
    });
    const driveFiles = driveResponse.data.files || [];
    const items = driveFiles.map((file) => ({
      id: file.id || "",
      name: file.name || "Sin nombre",
      mimeType: file.mimeType || "application/octet-stream",
      size: file.size || void 0,
      modifiedTime: file.modifiedTime || void 0,
      thumbnailLink: file.thumbnailLink || void 0,
      iconLink: file.iconLink || void 0
    }));
    const responseData = {
      items,
      currentFolderId: requestedFolderId,
      parentFolderId,
      folderName
    };
    return new Response(JSON.stringify(responseData), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=60"
        // Guardar en cache 60 segundos
      }
    });
  } catch (error) {
    console.error("Error fetching data from Google Drive API:", error);
    return new Response(JSON.stringify({
      error: "Error al conectar con la API de Google Drive",
      details: error.message
    }), {
      status: 500,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
