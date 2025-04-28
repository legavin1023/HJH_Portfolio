const CACHE_NAME = "portfolio-cache-v1";
const basePath = self.location.pathname.includes("/HJH_Portfolio/")
  ? "/HJH_Portfolio"
  : "";

const urlsToCache = [
  `${basePath}/image/portfolio/modalImage1.jpg`,
  `${basePath}/image/portfolio/modalImage2.jpg`,
  `${basePath}/image/portfolio/modalImage3.jpg`,
  `${basePath}/image/portfolio/modalImage4.jpg`,
  `${basePath}/image/portfolio/modalImage5.jpg`,
  `${basePath}/image/portfolio/modalImage6.jpg`,
  `${basePath}/image/portfolio/modalImage7.jpg`,
];

// 서비스 워커 설치 및 캐싱
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

// 서비스 워커 활성화 및 이전 캐시 정리
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log("Deleting old cache:", cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// 네트워크 요청 가로채기 및 캐싱된 리소스 제공
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // 캐싱된 리소스가 있으면 반환, 없으면 네트워크 요청
      return response || fetch(event.request);
    })
  );
});
