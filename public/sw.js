const CACHE = 'pup-app-v1.3.0'

function preCache() {
	return caches.open(CACHE).then(cache => {
		return cache.addAll([
			'./',
			'./manifest.json'
		])
	})
}

self.addEventListener('install', (e) => {
	console.log('installing cache')
	e.waitUntil(preCache())
})

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((resp) => {
      return resp || fetch(event.request).then((response) => {
        let responseClone = response.clone();
        caches.open(CACHE).then((cache) => {
          cache.put(event.request, responseClone);
        });

        return response;
      });
    })
  );
});