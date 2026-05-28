export interface DriveItem {
  id: string;
  name: string;
  mimeType: string;
  size?: string;
  modifiedTime?: string;
  thumbnailLink?: string;
  iconLink?: string;
}

export interface DriveListResponse {
  items: DriveItem[];
  currentFolderId: string;
  parentFolderId?: string;
  folderName: string;
}

export type FileType = 'folder' | 'pdf' | 'image' | 'document' | 'spreadsheet' | 'presentation' | 'video' | 'audio' | 'archive' | 'unknown';
