import { renderers } from './renderers.mjs';
import { s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_CvSoi7hX.mjs';
import { manifest } from './manifest_D_nxo__S.mjs';
import { createExports } from '@astrojs/netlify/ssr-function.js';

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/api/drive.astro.mjs');
const _page2 = () => import('./pages/api/preview.astro.mjs');
const _page3 = () => import('./pages/index.astro.mjs');

const pageMap = new Map([
    ["node_modules/.pnpm/astro@4.16.19_@types+node@2_fa96be74ea1379847e8f9174868a1f87/node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/api/drive.ts", _page1],
    ["src/pages/api/preview.ts", _page2],
    ["src/pages/index.astro", _page3]
]);
const serverIslandMap = new Map();
const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "da08b2e3-87c1-43c4-aed2-b6116a6b132e"
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (_start in serverEntrypointModule) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
