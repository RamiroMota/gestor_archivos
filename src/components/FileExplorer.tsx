import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Grid, 
  List, 
  ArrowLeft, 
  FolderPlus, 
  ChevronRight, 
  Database, 
  Clock, 
  ShieldCheck, 
  HardDrive,
  RefreshCw,
  Eye
} from 'lucide-react';
import type { DriveItem, DriveListResponse } from '../types/drive';
import { getFileType, getFileIcon, getFileTypeStyles, formatBytes } from '../utils/driveHelper';
import PreviewModal from './PreviewModal';

export default function FileExplorer() {
  const [items, setItems] = useState<DriveItem[]>([]);
  const [currentFolderId, setCurrentFolderId] = useState<string>('root');
  const [parentFolderId, setParentFolderId] = useState<string | undefined>(undefined);
  const [folderName, setFolderName] = useState<string>('Carpeta Raíz');
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Historial de navegación para breadcrumbs
  const [navigationStack, setNavigationStack] = useState<{ id: string; name: string }[]>([
    { id: 'root', name: 'Carpeta Raíz' }
  ]);

  // Estado para el Modo Lectura Estricto
  const [previewItem, setPreviewItem] = useState<DriveItem | null>(null);

  // Cargar archivos de la carpeta actual
  const fetchFolderContents = async (folderId: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/drive?folderId=${folderId}`);
      if (response.ok) {
        const data: DriveListResponse = await response.json();
        setItems(data.items);
        setCurrentFolderId(data.currentFolderId);
        setParentFolderId(data.parentFolderId);
        setFolderName(data.folderName);
      } else {
        console.error('Error al cargar la carpeta');
      }
    } catch (err) {
      console.error('Error de red:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFolderContents(currentFolderId);
  }, [currentFolderId]);

  // Manejar navegación interna de carpetas
  const handleItemClick = (item: DriveItem) => {
    const isFolder = item.mimeType === 'application/vnd.google-apps.folder';
    if (isFolder) {
      // Actualizar pila de navegación
      const folderExistsInStack = navigationStack.some(f => f.id === item.id);
      if (!folderExistsInStack) {
        setNavigationStack([...navigationStack, { id: item.id, name: item.name }]);
      }
      setCurrentFolderId(item.id);
    } else {
      // Abrir en Modo Lectura Estricto
      setPreviewItem(item);
    }
  };

  // Navegar mediante los breadcrumbs
  const handleBreadcrumbClick = (folderId: string, index: number) => {
    setNavigationStack(navigationStack.slice(0, index + 1));
    setCurrentFolderId(folderId);
  };

  // Regresar al directorio anterior
  const handleGoBack = () => {
    if (parentFolderId) {
      setNavigationStack(navigationStack.slice(0, -1));
      setCurrentFolderId(parentFolderId);
    } else if (currentFolderId !== 'root') {
      setNavigationStack([{ id: 'root', name: 'Carpeta Raíz' }]);
      setCurrentFolderId('root');
    }
  };

  // Filtrar elementos según búsqueda
  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-slate-955 text-slate-100 font-sans overflow-hidden">
      {/* 1. BARRA LATERAL (Sidebar) */}
      <aside className="w-64 bg-slate-900 border-r border-slate-700 p-5 flex flex-col justify-between hidden md:flex shadow-xl shadow-slate-200/50 z-10">
        <div>
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8 px-2">
            <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center overflow-hidden border border-slate-800 shadow-md">
              <img src="/logo.png" alt="Logo UPGCH" className="w-full h-full object-contain p-1" />
            </div>
            <div>
              <h2 className="font-bold text-lg leading-tight tracking-wide bg-gradient-to-r from-slate-100 to-slate-400 bg-clip-text text-transparent">
                UPGCH
              </h2>
              <span className="text-xs text-brand-400 font-medium">Gestor de Archivos</span>
            </div>
          </div>

          {/* Menú de Navegación */}
          <nav className="space-y-1">
            <button 
              onClick={() => {
                setCurrentFolderId('root');
                setNavigationStack([{ id: 'root', name: 'Carpeta Raíz' }]);
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl bg-slate-800 text-slate-100 font-semibold text-sm border border-slate-700 transition-all shadow-sm"
            >
              <HardDrive className="w-4 h-4 text-brand-400" />
              <span>Todos los archivos</span>
            </button>
            <div className="pt-4 px-3">
              <span className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">Seguridad</span>
            </div>
            <div className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:text-slate-200 text-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Lectura Estricta Activa</span>
            </div>
          </nav>
        </div>

      </aside>

      {/* 2. AREA DE CONTENIDO PRINCIPAL */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Barra de Búsqueda y Perfil superior */}
        <header className="h-16 border-b border-slate-700 px-6 flex items-center justify-between bg-slate-900 shadow-sm z-10">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="Buscar archivos en esta carpeta..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 focus:border-brand-500 rounded-xl text-sm placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-brand-500/20 transition-all text-slate-200"
            />
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => fetchFolderContents(currentFolderId)}
              className="p-2 bg-slate-800 border border-slate-700 hover:bg-slate-800/80 rounded-xl transition-all text-slate-400 hover:text-slate-200 shadow-sm"
              title="Refrescar contenido"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <div className="h-8 w-[1px] bg-slate-700" />
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-slate-800 flex items-center justify-center text-xs font-semibold text-brand-400 border border-brand-500/20">
                U
              </div>
              <span className="text-xs text-slate-300 font-medium hidden sm:inline">Usuario Evaluador</span>
            </div>
          </div>
        </header>

        {/* Explorador de Archivos */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Navegación de Carpeta y Modos de Vista */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Breadcrumbs de Navegación */}
            <div className="flex items-center gap-1.5 overflow-x-auto py-1">
              {currentFolderId !== 'root' && (
                <button 
                  onClick={handleGoBack}
                  className="p-1.5 hover:bg-slate-900 border border-slate-800 hover:border-slate-700/60 text-slate-400 hover:text-slate-200 rounded-lg mr-2 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
              )}
              {navigationStack.map((nav, index) => (
                <React.Fragment key={nav.id}>
                  {index > 0 && <ChevronRight className="w-3.5 h-3.5 text-slate-600" />}
                  <button 
                    onClick={() => handleBreadcrumbClick(nav.id, index)}
                    className={`text-sm font-medium px-2 py-1 rounded-lg transition-colors whitespace-nowrap ${
                      index === navigationStack.length - 1 
                        ? 'text-slate-100 bg-slate-900/60 border border-slate-800' 
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {nav.name}
                  </button>
                </React.Fragment>
              ))}
            </div>

            {/* Alternador de Vista (Grid / List) */}
            <div className="flex items-center gap-1 bg-slate-900/60 p-1 rounded-xl border border-slate-800 self-end sm:self-auto">
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-brand-500 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg transition-all ${viewMode === 'list' ? 'bg-brand-500 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Renderizado de Archivos / Carpetas */}
          {loading ? (
            <div className="flex flex-col items-center justify-center h-64 space-y-4">
              <div className="w-10 h-10 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-slate-400 text-xs tracking-wider">Cargando tus archivos seguros...</p>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 border border-dashed border-slate-800 rounded-3xl p-8 bg-slate-900/10">
              <FolderPlus className="w-12 h-12 text-slate-700 mb-3" />
              <h3 className="text-slate-300 font-semibold mb-1">Carpeta Vacía o Sin Coincidencias</h3>
              <p className="text-slate-500 text-xs max-w-sm text-center">No se encontraron archivos en este directorio o con la búsqueda ingresada.</p>
            </div>
          ) : viewMode === 'grid' ? (
            // VISTA EN CUADRICULA
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {filteredItems.map((item) => {
                const type = getFileType(item.mimeType, item.name);
                const Icon = getFileIcon(type);
                const styles = getFileTypeStyles(type);
                const isFolder = type === 'folder';
                const showThumbnail = type === 'image' && item.thumbnailLink;

                return (
                  <div 
                    key={item.id}
                    onClick={() => handleItemClick(item)}
                    className={`group relative flex flex-col p-4 bg-slate-900 border border-slate-700 rounded-2xl cursor-pointer transition-all duration-300 transform hover:-translate-y-1 shadow-sm ${styles.hoverBg} ${styles.hoverBorder} ${styles.hoverShadow} select-none`}
                  >
                    {/* Contenedor del Icono */}
                    <div className={`aspect-square w-full rounded-xl ${styles.bg} flex items-center justify-center mb-3 transition-colors duration-300 border border-transparent group-hover:border-slate-700 overflow-hidden relative`}>
                      {showThumbnail ? (
                        <>
                          <img 
                            src={item.thumbnailLink} 
                            alt={item.name} 
                            className="w-full h-full object-cover rounded-xl pointer-events-none group-hover:scale-105 transition-transform duration-300"
                            draggable="false"
                          />
                          <div className="absolute inset-0 bg-slate-950/20" />
                        </>
                      ) : (
                        <Icon className={`w-10 h-10 ${styles.text} transition-transform duration-300 group-hover:scale-110`} />
                      )}
                      
                      {/* Badge flotante de vista en Modo Lectura */}
                      {!isFolder && (
                        <div className="absolute bottom-2 right-2 p-1.5 bg-slate-900 shadow-md rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-slate-700">
                          <Eye className="w-3.5 h-3.5 text-brand-400" />
                        </div>
                      )}
                    </div>

                    {/* Nombre e info del archivo */}
                    <div className="space-y-1">
                      <h4 className="text-xs font-semibold text-slate-200 group-hover:text-slate-100 truncate pr-1" title={item.name}>
                        {item.name}
                      </h4>
                      <div className="flex items-center justify-between text-[10px] text-slate-500 font-medium">
                        <span>{isFolder ? 'Carpeta' : formatBytes(item.size)}</span>
                        {item.modifiedTime && (
                          <span className="flex items-center gap-1">
                            <Clock className="w-2.5 h-2.5" />
                            {new Date(item.modifiedTime).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            // VISTA EN LISTA
            <div className="bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden shadow-md">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-700 bg-slate-800 text-slate-400 text-xs font-semibold">
                      <th className="p-4">Nombre</th>
                      <th className="p-4">Modificado</th>
                      <th className="p-4">Tamaño</th>
                      <th className="p-4 text-right">Acción</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-750">
                    {filteredItems.map((item) => {
                      const type = getFileType(item.mimeType, item.name);
                      const Icon = getFileIcon(type);
                      const styles = getFileTypeStyles(type);
                      const isFolder = type === 'folder';

                      return (
                        <tr 
                          key={item.id}
                          onClick={() => handleItemClick(item)}
                          className={`hover:bg-slate-900 cursor-pointer transition-colors duration-250 select-none group ${styles.hoverBg}`}
                        >
                          <td className="p-4 flex items-center gap-3">
                            <div className={`p-2.5 rounded-lg ${styles.bg} border border-transparent group-hover:border-slate-700`}>
                              <Icon className={`w-4 h-4 ${styles.text}`} />
                            </div>
                            <span className="text-xs font-semibold text-slate-200 truncate max-w-md group-hover:text-slate-100">
                              {item.name}
                            </span>
                          </td>
                          <td className="p-4 text-xs text-slate-500 font-medium">
                            {item.modifiedTime ? new Date(item.modifiedTime).toLocaleDateString() : '--'}
                          </td>
                          <td className="p-4 text-xs text-slate-500 font-medium">
                            {isFolder ? 'Carpeta' : formatBytes(item.size)}
                          </td>
                          <td className="p-4 text-right">
                            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand-400 bg-brand-500/10 px-2.5 py-1 rounded-lg border border-brand-500/20 group-hover:bg-brand-500 group-hover:text-white transition-colors duration-200">
                              {isFolder ? 'Abrir' : 'Ver'}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* 3. MODAL DE MODO LECTURA ESTRICTO */}
      <PreviewModal 
        item={previewItem} 
        onClose={() => setPreviewItem(null)} 
      />
    </div>
  );
}
