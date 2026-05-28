import { j as createComponent, h as addAttribute, l as renderHead, n as renderSlot, o as renderTemplate, i as createAstro, r as renderComponent } from '../chunks/astro/server_CFkDHHzY.mjs';
/* empty css                                 */
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import React, { useEffect, useState } from 'react';
import { FileQuestion, Archive, Music, Video, Presentation, FileSpreadsheet, FileText, Image, FileCheck2, Folder, Lock, X, Eye, AlertTriangle, HardDrive, ShieldCheck, Search, RefreshCw, ArrowLeft, ChevronRight, Grid, List, FolderPlus, Clock } from 'lucide-react';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="es" class="light"> <head><meta charset="UTF-8"><meta name="description" content="UPGCH - Gestor de archivos moderno y seguro con Modo Lectura Estricto"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/png" href="/favicon.png"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title><!-- Fuentes Premium de Google Fonts --><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;500;600;700&display=swap" rel="stylesheet">${renderHead()}</head> <body class="bg-slate-950 text-slate-100 antialiased overflow-hidden"> ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "C:/Users/LIC.RAMIRO/Documents/Devs/Gestor_Archivos/src/layouts/Layout.astro", void 0);

function formatBytes(bytesStr, decimals = 2) {
  if (!bytesStr) return "--";
  const bytes = typeof bytesStr === "string" ? parseInt(bytesStr, 10) : bytesStr;
  if (isNaN(bytes) || bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}
function getFileType(mimeType, fileName) {
  if (mimeType === "application/vnd.google-apps.folder") return "folder";
  if (mimeType === "application/pdf") return "pdf";
  if (mimeType.startsWith("image/")) return "image";
  if (mimeType.startsWith("video/") || mimeType === "application/vnd.google-apps.video") return "video";
  if (mimeType.startsWith("audio/") || mimeType === "application/vnd.google-apps.audio") return "audio";
  const ext = fileName.split(".").pop()?.toLowerCase();
  if (mimeType === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || mimeType === "application/vnd.google-apps.spreadsheet" || ext === "xlsx" || ext === "xls" || ext === "csv") return "spreadsheet";
  if (mimeType === "application/vnd.openxmlformats-officedocument.presentationml.presentation" || mimeType === "application/vnd.google-apps.presentation" || ext === "pptx" || ext === "ppt") return "presentation";
  if (mimeType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || mimeType === "application/vnd.google-apps.document" || mimeType === "text/plain" || ext === "docx" || ext === "doc" || ext === "txt" || ext === "md") return "document";
  if (mimeType === "application/zip" || mimeType === "application/x-rar-compressed" || ext === "zip" || ext === "rar" || ext === "tar" || ext === "gz") return "archive";
  return "unknown";
}
function getFileIcon(type) {
  switch (type) {
    case "folder":
      return Folder;
    case "pdf":
      return FileCheck2;
    case "image":
      return Image;
    case "document":
      return FileText;
    case "spreadsheet":
      return FileSpreadsheet;
    case "presentation":
      return Presentation;
    case "video":
      return Video;
    case "audio":
      return Music;
    case "archive":
      return Archive;
    default:
      return FileQuestion;
  }
}
function getFileTypeStyles(type) {
  switch (type) {
    case "folder":
      return {
        bg: "bg-blue-50",
        text: "text-blue-500",
        hoverBg: "hover:bg-blue-50/60",
        hoverBorder: "hover:border-blue-200",
        hoverShadow: "hover:shadow-blue-500/5"
      };
    case "pdf":
      return {
        bg: "bg-red-50",
        text: "text-red-500",
        hoverBg: "hover:bg-red-50/60",
        hoverBorder: "hover:border-red-200",
        hoverShadow: "hover:shadow-red-500/5"
      };
    case "image":
      return {
        bg: "bg-purple-50",
        text: "text-purple-500",
        hoverBg: "hover:bg-purple-50/60",
        hoverBorder: "hover:border-purple-200",
        hoverShadow: "hover:shadow-purple-500/5"
      };
    case "document":
      return {
        bg: "bg-sky-50",
        text: "text-sky-500",
        hoverBg: "hover:bg-sky-50/60",
        hoverBorder: "hover:border-sky-200",
        hoverShadow: "hover:shadow-sky-500/5"
      };
    case "spreadsheet":
      return {
        bg: "bg-green-50",
        text: "text-green-500",
        hoverBg: "hover:bg-green-50/60",
        hoverBorder: "hover:border-green-200",
        hoverShadow: "hover:shadow-green-500/5"
      };
    case "presentation":
      return {
        bg: "bg-amber-50",
        text: "text-amber-500",
        hoverBg: "hover:bg-amber-50/60",
        hoverBorder: "hover:border-amber-200",
        hoverShadow: "hover:shadow-amber-500/5"
      };
    case "video":
      return {
        bg: "bg-rose-50",
        text: "text-rose-500",
        hoverBg: "hover:bg-rose-50/60",
        hoverBorder: "hover:border-rose-200",
        hoverShadow: "hover:shadow-rose-500/5"
      };
    case "audio":
      return {
        bg: "bg-indigo-50",
        text: "text-indigo-500",
        hoverBg: "hover:bg-indigo-50/60",
        hoverBorder: "hover:border-indigo-200",
        hoverShadow: "hover:shadow-indigo-500/5"
      };
    case "archive":
      return {
        bg: "bg-yellow-50",
        text: "text-yellow-600",
        hoverBg: "hover:bg-yellow-50/60",
        hoverBorder: "hover:border-yellow-200",
        hoverShadow: "hover:shadow-yellow-500/5"
      };
    default:
      return {
        bg: "bg-gray-50",
        text: "text-gray-500",
        hoverBg: "hover:bg-gray-50/60",
        hoverBorder: "hover:border-gray-250",
        hoverShadow: "hover:shadow-gray-500/5"
      };
  }
}

function PreviewModal({ item, onClose }) {
  if (!item) return null;
  const fileType = getFileType(item.mimeType, item.name);
  useEffect(() => {
    const handleContextMenu = (e) => {
      e.preventDefault();
    };
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        alert("Modo Lectura Estricto: La descarga está deshabilitada.");
      }
      if ((e.ctrlKey || e.metaKey) && e.key === "p") {
        e.preventDefault();
        alert("Modo Lectura Estricto: La impresión está deshabilitada.");
      }
      if ((e.ctrlKey || e.metaKey) && e.key === "c") {
        e.preventDefault();
      }
      if (e.key === "F12") {
        e.preventDefault();
      }
    };
    document.addEventListener("contextmenu", handleContextMenu);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  const renderPreviewContent = () => {
    const isMock = item.id.startsWith("file-");
    const previewUrl = isMock ? "" : `/api/preview?fileId=${item.id}`;
    if (fileType === "image") {
      const src = isMock ? item.thumbnailLink?.replace("=s220", "=s1000") || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1000&q=80" : previewUrl;
      return /* @__PURE__ */ jsxs("div", { className: "relative flex items-center justify-center h-full max-h-[70vh] bg-neutral-900/50 rounded-xl overflow-hidden select-none", children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            src,
            alt: item.name,
            className: "max-h-full max-w-full object-contain rounded-lg pointer-events-none select-none",
            draggable: "false"
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-transparent" })
      ] });
    }
    if (fileType === "pdf") {
      const src = isMock ? "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf-test.pdf#toolbar=0&navpanes=0&scrollbar=0" : `${previewUrl}#toolbar=0&navpanes=0&scrollbar=0`;
      return /* @__PURE__ */ jsxs("div", { className: "relative w-full h-[65vh] bg-neutral-800 rounded-xl overflow-hidden", children: [
        /* @__PURE__ */ jsx(
          "iframe",
          {
            src,
            className: "w-full h-full border-0 select-none",
            title: item.name
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 right-0 h-[56px] bg-transparent pointer-events-auto cursor-default" }),
        /* @__PURE__ */ jsxs("div", { className: "absolute top-2 left-2 bg-slate-900/90 text-xs text-slate-300 px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-slate-700/50 backdrop-blur-md", children: [
          /* @__PURE__ */ jsx(Lock, { className: "w-3.5 h-3.5 text-brand-400 animate-pulse" }),
          " Visor Seguro Activo (Modo Lectura)"
        ] })
      ] });
    }
    if (fileType === "video") {
      const src = isMock ? "https://assets.mixkit.co/videos/preview/mixkit-stars-in-space-background-1611-large.mp4" : previewUrl;
      return /* @__PURE__ */ jsxs("div", { className: "relative w-full max-h-[70vh] aspect-video bg-neutral-900 rounded-xl overflow-hidden", children: [
        /* @__PURE__ */ jsxs(
          "video",
          {
            controls: true,
            controlsList: "nodownload nofullscreen",
            disablePictureInPicture: true,
            className: "w-full h-full object-contain",
            children: [
              /* @__PURE__ */ jsx("source", { src, type: item.mimeType || "video/mp4" }),
              "Tu navegador no soporta reproducción de video."
            ]
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-transparent pointer-events-none" })
      ] });
    }
    if (fileType === "audio") {
      const src = isMock ? "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" : previewUrl;
      return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center p-8 bg-slate-800/50 rounded-xl border border-slate-700/50 backdrop-blur-md", children: [
        /* @__PURE__ */ jsx("div", { className: "w-16 h-16 bg-brand-500/10 rounded-full flex items-center justify-center text-brand-400 mb-4 border border-brand-500/20", children: /* @__PURE__ */ jsx(Eye, { className: "w-8 h-8" }) }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-300 font-medium mb-4", children: item.name }),
        /* @__PURE__ */ jsxs(
          "audio",
          {
            controls: true,
            controlsList: "nodownload",
            className: "w-full max-w-md",
            children: [
              /* @__PURE__ */ jsx("source", { src, type: item.mimeType || "audio/mpeg" }),
              "Tu navegador no soporta reproducción de audio."
            ]
          }
        )
      ] });
    }
    return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center p-12 text-center bg-slate-800/40 rounded-xl border border-slate-700/50 backdrop-blur", children: [
      /* @__PURE__ */ jsx(AlertTriangle, { className: "w-12 h-12 text-yellow-500 mb-4" }),
      /* @__PURE__ */ jsx("h4", { className: "text-slate-200 font-semibold mb-2", children: "Previsualización Protegida" }),
      /* @__PURE__ */ jsxs("p", { className: "text-slate-400 text-sm max-w-md mb-6", children: [
        "Este archivo (",
        item.name,
        ") está protegido bajo la política de Modo Lectura Estricto. Puedes ver los metadatos pero el visor completo está deshabilitado temporalmente."
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "text-xs text-slate-500 bg-slate-900/50 px-4 py-2 rounded-lg border border-slate-700/30", children: [
        "ID de Archivo: ",
        item.id,
        " ",
        /* @__PURE__ */ jsx("br", {}),
        "MimeType: ",
        item.mimeType
      ] })
    ] });
  };
  return /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in", children: /* @__PURE__ */ jsxs("div", { className: "relative w-full max-w-4xl bg-slate-900/90 rounded-2xl border border-slate-700/50 shadow-2xl overflow-hidden", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between p-4 border-b border-slate-800 bg-slate-950/40", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsx("div", { className: "p-2 bg-rose-500/10 text-rose-400 rounded-lg border border-rose-500/20", children: /* @__PURE__ */ jsx(Lock, { className: "w-4 h-4" }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "text-slate-100 font-semibold leading-none flex items-center gap-2", children: item.name }),
          /* @__PURE__ */ jsx("p", { className: "text-slate-400 text-xs mt-1", children: "Previsualización Segura • Descarga Bloqueada" })
        ] })
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: onClose,
          className: "p-1.5 hover:bg-slate-800 text-slate-400 hover:text-slate-200 rounded-lg transition-colors border border-transparent hover:border-slate-700/50",
          children: /* @__PURE__ */ jsx(X, { className: "w-5 h-5" })
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "p-6 overflow-y-auto max-h-[75vh]", children: renderPreviewContent() }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between px-6 py-4 bg-slate-950/40 border-t border-slate-800 text-xs text-slate-400", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsx("span", { className: "w-2 h-2 rounded-full bg-emerald-500 animate-pulse" }),
        /* @__PURE__ */ jsx("span", { children: "Encriptación de canal HTTPS activa" })
      ] }),
      /* @__PURE__ */ jsx("p", { children: "UPGCH © 2026 Gestor de archivos - Modo Lectura Protegido" })
    ] })
  ] }) });
}

function FileExplorer() {
  const [items, setItems] = useState([]);
  const [currentFolderId, setCurrentFolderId] = useState("root");
  const [parentFolderId, setParentFolderId] = useState(void 0);
  const [folderName, setFolderName] = useState("Carpeta Raíz");
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [navigationStack, setNavigationStack] = useState([
    { id: "root", name: "Carpeta Raíz" }
  ]);
  const [previewItem, setPreviewItem] = useState(null);
  const fetchFolderContents = async (folderId) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/drive?folderId=${folderId}`);
      if (response.ok) {
        const data = await response.json();
        setItems(data.items);
        setCurrentFolderId(data.currentFolderId);
        setParentFolderId(data.parentFolderId);
        setFolderName(data.folderName);
      } else {
        console.error("Error al cargar la carpeta");
      }
    } catch (err) {
      console.error("Error de red:", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchFolderContents(currentFolderId);
  }, [currentFolderId]);
  const handleItemClick = (item) => {
    const isFolder = item.mimeType === "application/vnd.google-apps.folder";
    if (isFolder) {
      const folderExistsInStack = navigationStack.some((f) => f.id === item.id);
      if (!folderExistsInStack) {
        setNavigationStack([...navigationStack, { id: item.id, name: item.name }]);
      }
      setCurrentFolderId(item.id);
    } else {
      setPreviewItem(item);
    }
  };
  const handleBreadcrumbClick = (folderId, index) => {
    setNavigationStack(navigationStack.slice(0, index + 1));
    setCurrentFolderId(folderId);
  };
  const handleGoBack = () => {
    if (parentFolderId) {
      setNavigationStack(navigationStack.slice(0, -1));
      setCurrentFolderId(parentFolderId);
    } else if (currentFolderId !== "root") {
      setNavigationStack([{ id: "root", name: "Carpeta Raíz" }]);
      setCurrentFolderId("root");
    }
  };
  const filteredItems = items.filter(
    (item) => item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return /* @__PURE__ */ jsxs("div", { className: "flex h-screen bg-slate-955 text-slate-100 font-sans overflow-hidden", children: [
    /* @__PURE__ */ jsx("aside", { className: "w-64 bg-slate-900 border-r border-slate-700 p-5 flex flex-col justify-between hidden md:flex shadow-xl shadow-slate-200/50 z-10", children: /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-8 px-2", children: [
        /* @__PURE__ */ jsx("div", { className: "w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center overflow-hidden border border-slate-800 shadow-md", children: /* @__PURE__ */ jsx("img", { src: "/logo.png", alt: "Logo UPGCH", className: "w-full h-full object-contain p-1" }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "font-bold text-lg leading-tight tracking-wide bg-gradient-to-r from-slate-100 to-slate-400 bg-clip-text text-transparent", children: "UPGCH" }),
          /* @__PURE__ */ jsx("span", { className: "text-xs text-brand-400 font-medium", children: "Gestor de Archivos" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("nav", { className: "space-y-1", children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => {
              setCurrentFolderId("root");
              setNavigationStack([{ id: "root", name: "Carpeta Raíz" }]);
            },
            className: "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl bg-slate-800 text-slate-100 font-semibold text-sm border border-slate-700 transition-all shadow-sm",
            children: [
              /* @__PURE__ */ jsx(HardDrive, { className: "w-4 h-4 text-brand-400" }),
              /* @__PURE__ */ jsx("span", { children: "Todos los archivos" })
            ]
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "pt-4 px-3", children: /* @__PURE__ */ jsx("span", { className: "text-slate-500 text-[10px] uppercase font-bold tracking-wider", children: "Seguridad" }) }),
        /* @__PURE__ */ jsxs("div", { className: "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:text-slate-200 text-sm", children: [
          /* @__PURE__ */ jsx(ShieldCheck, { className: "w-4 h-4 text-emerald-500" }),
          /* @__PURE__ */ jsx("span", { children: "Lectura Estricta Activa" })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("main", { className: "flex-1 flex flex-col overflow-hidden", children: [
      /* @__PURE__ */ jsxs("header", { className: "h-16 border-b border-slate-700 px-6 flex items-center justify-between bg-slate-900 shadow-sm z-10", children: [
        /* @__PURE__ */ jsxs("div", { className: "relative w-full max-w-md", children: [
          /* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              placeholder: "Buscar archivos en esta carpeta...",
              value: searchQuery,
              onChange: (e) => setSearchQuery(e.target.value),
              className: "w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 focus:border-brand-500 rounded-xl text-sm placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-brand-500/20 transition-all text-slate-200"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => fetchFolderContents(currentFolderId),
              className: "p-2 bg-slate-800 border border-slate-700 hover:bg-slate-800/80 rounded-xl transition-all text-slate-400 hover:text-slate-200 shadow-sm",
              title: "Refrescar contenido",
              children: /* @__PURE__ */ jsx(RefreshCw, { className: "w-4 h-4" })
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "h-8 w-[1px] bg-slate-700" }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2.5", children: [
            /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-xl bg-slate-800 flex items-center justify-center text-xs font-semibold text-brand-400 border border-brand-500/20", children: "U" }),
            /* @__PURE__ */ jsx("span", { className: "text-xs text-slate-300 font-medium hidden sm:inline", children: "Usuario Evaluador" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex-1 overflow-y-auto p-6 space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 overflow-x-auto py-1", children: [
            currentFolderId !== "root" && /* @__PURE__ */ jsx(
              "button",
              {
                onClick: handleGoBack,
                className: "p-1.5 hover:bg-slate-900 border border-slate-800 hover:border-slate-700/60 text-slate-400 hover:text-slate-200 rounded-lg mr-2 transition-colors",
                children: /* @__PURE__ */ jsx(ArrowLeft, { className: "w-4 h-4" })
              }
            ),
            navigationStack.map((nav, index) => /* @__PURE__ */ jsxs(React.Fragment, { children: [
              index > 0 && /* @__PURE__ */ jsx(ChevronRight, { className: "w-3.5 h-3.5 text-slate-600" }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => handleBreadcrumbClick(nav.id, index),
                  className: `text-sm font-medium px-2 py-1 rounded-lg transition-colors whitespace-nowrap ${index === navigationStack.length - 1 ? "text-slate-100 bg-slate-900/60 border border-slate-800" : "text-slate-400 hover:text-slate-200"}`,
                  children: nav.name
                }
              )
            ] }, nav.id))
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1 bg-slate-900/60 p-1 rounded-xl border border-slate-800 self-end sm:self-auto", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => setViewMode("grid"),
                className: `p-1.5 rounded-lg transition-all ${viewMode === "grid" ? "bg-brand-500 text-white shadow-md" : "text-slate-400 hover:text-slate-200"}`,
                children: /* @__PURE__ */ jsx(Grid, { className: "w-4 h-4" })
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => setViewMode("list"),
                className: `p-1.5 rounded-lg transition-all ${viewMode === "list" ? "bg-brand-500 text-white shadow-md" : "text-slate-400 hover:text-slate-200"}`,
                children: /* @__PURE__ */ jsx(List, { className: "w-4 h-4" })
              }
            )
          ] })
        ] }),
        loading ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center h-64 space-y-4", children: [
          /* @__PURE__ */ jsx("div", { className: "w-10 h-10 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" }),
          /* @__PURE__ */ jsx("p", { className: "text-slate-400 text-xs tracking-wider", children: "Cargando tus archivos seguros..." })
        ] }) : filteredItems.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center h-64 border border-dashed border-slate-800 rounded-3xl p-8 bg-slate-900/10", children: [
          /* @__PURE__ */ jsx(FolderPlus, { className: "w-12 h-12 text-slate-700 mb-3" }),
          /* @__PURE__ */ jsx("h3", { className: "text-slate-300 font-semibold mb-1", children: "Carpeta Vacía o Sin Coincidencias" }),
          /* @__PURE__ */ jsx("p", { className: "text-slate-500 text-xs max-w-sm text-center", children: "No se encontraron archivos en este directorio o con la búsqueda ingresada." })
        ] }) : viewMode === "grid" ? (
          // VISTA EN CUADRICULA
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4", children: filteredItems.map((item) => {
            const type = getFileType(item.mimeType, item.name);
            const Icon = getFileIcon(type);
            const styles = getFileTypeStyles(type);
            const isFolder = type === "folder";
            const showThumbnail = type === "image" && item.thumbnailLink;
            return /* @__PURE__ */ jsxs(
              "div",
              {
                onClick: () => handleItemClick(item),
                className: `group relative flex flex-col p-4 bg-slate-900 border border-slate-700 rounded-2xl cursor-pointer transition-all duration-300 transform hover:-translate-y-1 shadow-sm ${styles.hoverBg} ${styles.hoverBorder} ${styles.hoverShadow} select-none`,
                children: [
                  /* @__PURE__ */ jsxs("div", { className: `aspect-square w-full rounded-xl ${styles.bg} flex items-center justify-center mb-3 transition-colors duration-300 border border-transparent group-hover:border-slate-700 overflow-hidden relative`, children: [
                    showThumbnail ? /* @__PURE__ */ jsxs(Fragment, { children: [
                      /* @__PURE__ */ jsx(
                        "img",
                        {
                          src: item.thumbnailLink,
                          alt: item.name,
                          className: "w-full h-full object-cover rounded-xl pointer-events-none group-hover:scale-105 transition-transform duration-300",
                          draggable: "false"
                        }
                      ),
                      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-slate-950/20" })
                    ] }) : /* @__PURE__ */ jsx(Icon, { className: `w-10 h-10 ${styles.text} transition-transform duration-300 group-hover:scale-110` }),
                    !isFolder && /* @__PURE__ */ jsx("div", { className: "absolute bottom-2 right-2 p-1.5 bg-slate-900 shadow-md rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-slate-700", children: /* @__PURE__ */ jsx(Eye, { className: "w-3.5 h-3.5 text-brand-400" }) })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                    /* @__PURE__ */ jsx("h4", { className: "text-xs font-semibold text-slate-200 group-hover:text-slate-100 truncate pr-1", title: item.name, children: item.name }),
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-[10px] text-slate-500 font-medium", children: [
                      /* @__PURE__ */ jsx("span", { children: isFolder ? "Carpeta" : formatBytes(item.size) }),
                      item.modifiedTime && /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
                        /* @__PURE__ */ jsx(Clock, { className: "w-2.5 h-2.5" }),
                        new Date(item.modifiedTime).toLocaleDateString()
                      ] })
                    ] })
                  ] })
                ]
              },
              item.id
            );
          }) })
        ) : (
          // VISTA EN LISTA
          /* @__PURE__ */ jsx("div", { className: "bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden shadow-md", children: /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-left border-collapse", children: [
            /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b border-slate-700 bg-slate-800 text-slate-400 text-xs font-semibold", children: [
              /* @__PURE__ */ jsx("th", { className: "p-4", children: "Nombre" }),
              /* @__PURE__ */ jsx("th", { className: "p-4", children: "Modificado" }),
              /* @__PURE__ */ jsx("th", { className: "p-4", children: "Tamaño" }),
              /* @__PURE__ */ jsx("th", { className: "p-4 text-right", children: "Acción" })
            ] }) }),
            /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-slate-750", children: filteredItems.map((item) => {
              const type = getFileType(item.mimeType, item.name);
              const Icon = getFileIcon(type);
              const styles = getFileTypeStyles(type);
              const isFolder = type === "folder";
              return /* @__PURE__ */ jsxs(
                "tr",
                {
                  onClick: () => handleItemClick(item),
                  className: `hover:bg-slate-900 cursor-pointer transition-colors duration-250 select-none group ${styles.hoverBg}`,
                  children: [
                    /* @__PURE__ */ jsxs("td", { className: "p-4 flex items-center gap-3", children: [
                      /* @__PURE__ */ jsx("div", { className: `p-2.5 rounded-lg ${styles.bg} border border-transparent group-hover:border-slate-700`, children: /* @__PURE__ */ jsx(Icon, { className: `w-4 h-4 ${styles.text}` }) }),
                      /* @__PURE__ */ jsx("span", { className: "text-xs font-semibold text-slate-200 truncate max-w-md group-hover:text-slate-100", children: item.name })
                    ] }),
                    /* @__PURE__ */ jsx("td", { className: "p-4 text-xs text-slate-500 font-medium", children: item.modifiedTime ? new Date(item.modifiedTime).toLocaleDateString() : "--" }),
                    /* @__PURE__ */ jsx("td", { className: "p-4 text-xs text-slate-500 font-medium", children: isFolder ? "Carpeta" : formatBytes(item.size) }),
                    /* @__PURE__ */ jsx("td", { className: "p-4 text-right", children: /* @__PURE__ */ jsx("span", { className: "inline-flex items-center gap-1 text-[11px] font-semibold text-brand-400 bg-brand-500/10 px-2.5 py-1 rounded-lg border border-brand-500/20 group-hover:bg-brand-500 group-hover:text-white transition-colors duration-200", children: isFolder ? "Abrir" : "Ver" }) })
                  ]
                },
                item.id
              );
            }) })
          ] }) }) })
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      PreviewModal,
      {
        item: previewItem,
        onClose: () => setPreviewItem(null)
      }
    )
  ] });
}

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "TeraBox Clone - Explorador de Archivos Seguro" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "FileExplorer", FileExplorer, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/LIC.RAMIRO/Documents/Devs/Gestor_Archivos/src/components/FileExplorer", "client:component-export": "default" })} ` })}`;
}, "C:/Users/LIC.RAMIRO/Documents/Devs/Gestor_Archivos/src/pages/index.astro", void 0);

const $$file = "C:/Users/LIC.RAMIRO/Documents/Devs/Gestor_Archivos/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
