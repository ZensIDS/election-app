/**
 * =====================================================
 * BASE PATH RESOLVER
 * =====================================================
 * Setiap halaman WAJIB set atribut data-base-depth di <html>,
 * sesuai jumlah folder dari root project ke file halaman tsb:
 *   index.html                          -> depth 0
 *   pages/dashboard.html                -> depth 1
 *   pages/master-data/wilayah.html      -> depth 2
 *
 * BASE_PATH lalu dipakai untuk semua fetch/href/navigasi
 * internal, supaya aplikasi tetap jalan baik saat dihosting
 * di root domain maupun di dalam subfolder.
 */
(function () {
  const depth = parseInt(document.documentElement.dataset.baseDepth || "0", 10);
  window.BASE_PATH = depth > 0 ? "../".repeat(depth) : "./";
})();
