// sw.js - Service Worker

/**
 * Este archivo se ejecuta en segundo plano, incluso cuando la página está cerrada.
 * Su principal función aquí es escuchar eventos 'push' del servidor.
 */
self.addEventListener('push', function(event) {
  console.log('[Service Worker] Push Recibido.');
  
  // El servidor envía los datos de la notificación como texto.
  // Lo convertimos de nuevo a un objeto JSON.
  const data = event.data.json();
  
  console.log('[Service Worker] Datos de la notificación:', data);

  const title = data.title || 'Alerta de Calidad del Aire';
  const options = {
    body: data.body || 'Se ha detectado un cambio importante.',
    icon: data.icon || 'images/icon.png',
    badge: data.badge || 'images/badge.png'
  };

  // Le decimos al navegador que espere hasta que la notificación se haya mostrado.
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', function(event) {
  console.log('[Service Worker] Clic en la notificación recibido.');

  event.notification.close();

  // Abre la página del monitor. 
  // ¡CAMBIA ESTA URL POR LA URL DE TU FRONTEND EN RENDER!
  const targetUrl = 'https://ver-calidad-aire.onrender.com';

  event.waitUntil(
    clients.openWindow(targetUrl)
  );
});
