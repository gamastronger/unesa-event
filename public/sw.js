// UNESA Event Hub - Service Worker v2 (Robust Offline Persistence)
const CACHE_VERSION = 'unesa-eventhub-v2';
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const DYNAMIC_CACHE = `${CACHE_VERSION}-dynamic`;
const OFFLINE_DATA_CACHE = `${CACHE_VERSION}-data`;

const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
  '/apple-icon.png',
  '/placeholder-logo.png',
  '/placeholder.jpg',
];

// Install: Pre-cache core shell safely without failing on single asset error
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then(async (cache) => {
      // Use resilient individual caching so one missing asset won't abort installation
      await Promise.allSettled(
        STATIC_ASSETS.map(async (url) => {
          try {
            const res = await fetch(url, { cache: 'no-cache' });
            if (res && res.status === 200) {
              await cache.put(url, res);
            }
          } catch (err) {
            console.warn('[SW] Non-critical precache failed for:', url, err);
          }
        })
      );
    }).then(() => self.skipWaiting())
  );
});

// Activate: Purge obsolete cache versions and claim all open clients immediately
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => !key.startsWith(CACHE_VERSION))
          .map((key) => {
            console.log('[SW] Removing old cache:', key);
            return caches.delete(key);
          })
      );
    }).then(() => self.clients.claim())
  );
});

// Listen to messages from clients for offline data sync and control
self.addEventListener('message', async (event) => {
  if (!event.data || !event.data.type) return;

  const { type, payload } = event.data;

  if (type === 'SYNC_OFFLINE_EVENTS') {
    try {
      const cache = await caches.open(OFFLINE_DATA_CACHE);
      const dataToStore = {
        savedIds: payload?.savedIds || [],
        events: payload?.events || [],
        timestamp: payload?.timestamp || Date.now(),
      };

      const response = new Response(JSON.stringify(dataToStore), {
        status: 200,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'X-Offline-Storage': 'true',
          'Cache-Control': 'no-cache',
        },
      });

      await cache.put('/api/offline-events', response);

      // Reply back to port if provided
      if (event.ports && event.ports[0]) {
        event.ports[0].postMessage({ success: true, count: dataToStore.events.length });
      }
    } catch (err) {
      console.error('[SW] Error saving offline data to cache:', err);
      if (event.ports && event.ports[0]) {
        event.ports[0].postMessage({ success: false, error: err.message });
      }
    }
  }

  if (type === 'GET_OFFLINE_EVENTS') {
    try {
      const cache = await caches.open(OFFLINE_DATA_CACHE);
      const cachedRes = await cache.match('/api/offline-events');
      if (cachedRes) {
        const data = await cachedRes.json();
        if (event.ports && event.ports[0]) {
          event.ports[0].postMessage({ success: true, data });
        }
      } else {
        if (event.ports && event.ports[0]) {
          event.ports[0].postMessage({ success: true, data: null });
        }
      }
    } catch (err) {
      if (event.ports && event.ports[0]) {
        event.ports[0].postMessage({ success: false, error: err.message });
      }
    }
  }

  if (type === 'CLEAR_OFFLINE_EVENTS') {
    try {
      await caches.delete(OFFLINE_DATA_CACHE);
      if (event.ports && event.ports[0]) {
        event.ports[0].postMessage({ success: true });
      }
    } catch (err) {
      if (event.ports && event.ports[0]) {
        event.ports[0].postMessage({ success: false, error: err.message });
      }
    }
  }

  if (type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Fetch event handler with smart strategies:
// 1. Synthetic /api/offline-events -> Cache Storage
// 2. Navigation -> Network First with cached HTML fallback
// 3. Static Assets & Next.js chunks -> Stale-While-Revalidate
// 4. Default -> Network First with Cache Fallback
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Only handle HTTP/HTTPS GET requests
  if (!request.url.startsWith('http') || request.method !== 'GET') {
    return;
  }

  // Bypass HMR and WebSockets in development
  if (
    request.url.includes('/_next/webpack-hmr') ||
    request.url.includes('/_next/turbopack-hmr') ||
    request.headers.get('upgrade') === 'websocket'
  ) {
    return;
  }

  const url = new URL(request.url);

  // 1. Handle synthetic offline data API
  if (url.pathname === '/api/offline-events') {
    event.respondWith(
      caches.open(OFFLINE_DATA_CACHE).then(async (cache) => {
        const cached = await cache.match('/api/offline-events');
        if (cached) return cached;
        return new Response(JSON.stringify({ savedIds: [], events: [], timestamp: Date.now() }), {
          status: 200,
          headers: { 'Content-Type': 'application/json; charset=utf-8' },
        });
      })
    );
    return;
  }

  // 2. Navigation requests (HTML documents)
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const clone = networkResponse.clone();
            caches.open(DYNAMIC_CACHE).then((cache) => cache.put(request, clone));
          }
          return networkResponse;
        })
        .catch(async () => {
          // Fallback to exact cached request or root page
          const cached = await caches.match(request);
          if (cached) return cached;
          const rootCached = await caches.match('/');
          if (rootCached) return rootCached;

          return new Response(
            `<!DOCTYPE html>
            <html lang="id">
              <head>
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>UNESA Event Hub — Mode Luring</title>
                <style>
                  body { font-family: -apple-system, sans-serif; background: #ffffff; color: #202124; margin: 0; padding: 40px 20px; text-align: center; }
                  .card { max-width: 420px; margin: 40px auto; padding: 32px 24px; border: 1px solid #dadce0; border-radius: 12px; }
                  h1 { font-size: 20px; margin-bottom: 8px; }
                  p { color: #5f6368; font-size: 14px; line-height: 1.5; }
                  button { margin-top: 20px; padding: 10px 20px; background: #1a73e8; color: #fff; border: 0; border-radius: 6px; font-weight: 500; cursor: pointer; }
                </style>
              </head>
              <body>
                <div class="card">
                  <h1>UNESA Event Hub (Offline)</h1>
                  <p>Anda sedang tidak terhubung ke internet. Muat ulang halaman saat jaringan sudah stabil atau buka koleksi acara yang telah tersimpan offline.</p>
                  <button onclick="window.location.reload()">Coba Muat Ulang</button>
                </div>
              </body>
            </html>`,
            { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
          );
        })
    );
    return;
  }

  // 3. Static assets: Next.js bundles, CSS, JS, images, fonts (Stale-While-Revalidate)
  if (
    request.destination === 'style' ||
    request.destination === 'script' ||
    request.destination === 'image' ||
    request.destination === 'font' ||
    url.pathname.includes('/_next/')
  ) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        const fetchPromise = fetch(request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              const clone = networkResponse.clone();
              caches.open(STATIC_CACHE).then((cache) => cache.put(request, clone));
            }
            return networkResponse;
          })
          .catch(() => cachedResponse);

        return cachedResponse || fetchPromise;
      })
    );
    return;
  }

  // 4. Default: Network first with Cache fallback
  event.respondWith(
    fetch(request)
      .then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const clone = networkResponse.clone();
          caches.open(DYNAMIC_CACHE).then((cache) => cache.put(request, clone));
        }
        return networkResponse;
      })
      .catch(async () => {
        const cached = await caches.match(request);
        if (cached) return cached;
        return new Response('Offline resource unavailable', { status: 503, statusText: 'Offline' });
      })
  );
});
