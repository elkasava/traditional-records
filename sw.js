/**
 * TRADITIONAL RECORDS — Service Worker v1.0
 * Strategy: Cache-first for static assets, network-first for pages.
 * Gives instant repeat-visit loads and basic offline support.
 */

const CACHE = 'tr-v1';
const STATIC = [
    '/',
    '/index.html',
    '/releases.html',
    '/style.css',
    '/script.js',
    '/logo.png',
    '/favicon.svg',
    '/cd-holder.jpg',
];

// ── INSTALL: pre-cache static shell ────────────────────────────────────────
self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE).then(cache => cache.addAll(STATIC)).then(() => self.skipWaiting())
    );
});

// ── ACTIVATE: clean up old caches ──────────────────────────────────────────
self.addEventListener('activate', e => {
    e.waitUntil(
        caches.keys().then(keys =>
            Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
        ).then(() => self.clients.claim())
    );
});

// ── FETCH ───────────────────────────────────────────────────────────────────
self.addEventListener('fetch', e => {
    const { request } = e;
    const url = new URL(request.url);

    // Only handle same-origin requests
    if (url.origin !== location.origin) return;

    // HTML pages: network-first (always serve fresh content)
    if (request.headers.get('accept')?.includes('text/html')) {
        e.respondWith(
            fetch(request)
                .then(res => {
                    const clone = res.clone();
                    caches.open(CACHE).then(c => c.put(request, clone));
                    return res;
                })
                .catch(() => caches.match(request))
        );
        return;
    }

    // Static assets (CSS, JS, images, fonts): cache-first
    e.respondWith(
        caches.match(request).then(cached => {
            if (cached) return cached;
            return fetch(request).then(res => {
                // Only cache successful responses
                if (res.ok && res.type !== 'opaque') {
                    const clone = res.clone();
                    caches.open(CACHE).then(c => c.put(request, clone));
                }
                return res;
            });
        })
    );
});
