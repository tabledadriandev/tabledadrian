// Service Worker for Table d'Adrian Wellness PWA
// Enables offline functionality and caching

const CACHE_NAME = 'tabledadrian-v1.0.0';
const RUNTIME_CACHE = 'tabledadrian-runtime-v1';
const OFFLINE_URL = '/offline.html';

// Assets to cache on install
const PRECACHE_ASSETS = [
  '/',
  '/app',
  '/app/health',
  '/app/meals',
  '/app/coach',
  '/offline.html',
  '/icon.ico',
];

// Install event - cache assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => {
            return cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE;
          })
          .map((cacheName) => caches.delete(cacheName))
      );
    })
  );
  return self.clients.claim();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return caches.open(RUNTIME_CACHE).then((cache) => {
        return fetch(event.request)
          .then((response) => {
            // Cache successful responses
            if (response.status === 200) {
              cache.put(event.request, response.clone());
            }
            return response;
          })
          .catch(() => {
            // If offline and navigating, show offline page
            if (event.request.mode === 'navigate') {
              return caches.match(OFFLINE_URL);
            }
            return new Response('Offline', { status: 503 });
          });
      });
    })
  );
});

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-health-data') {
    event.waitUntil(syncHealthData());
  }
  if (event.tag === 'sync-meal-logs') {
    event.waitUntil(syncMealLogs());
  }
});

async function syncHealthData() {
  // Sync health data when back online
  const healthData = await getStoredHealthData();
  if (healthData.length > 0) {
    // Send to server
    await fetch('/api/health/sync', {
      method: 'POST',
      body: JSON.stringify(healthData),
    });
  }
}

async function syncMealLogs() {
  // Sync meal logs when back online
  const mealLogs = await getStoredMealLogs();
  if (mealLogs.length > 0) {
    await fetch('/api/meals/sync', {
      method: 'POST',
      body: JSON.stringify(mealLogs),
    });
  }
}

async function getStoredHealthData() {
  // Get from IndexedDB
  return [];
}

async function getStoredMealLogs() {
  // Get from IndexedDB
  return [];
}

// Push notifications
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || 'Table d\'Adrian';
  const options = {
    body: data.body || 'You have a new notification',
    icon: '/icon.ico',
    badge: '/icon.ico',
    data: data.url || '/app',
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// Notification click
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data || '/app')
  );
});

