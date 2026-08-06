//=====================================================
// SIDEBAR SUBMENU
//=====================================================

const submenuItems = document.querySelectorAll(".has-submenu");

submenuItems.forEach((item) => {
  const toggle = item.querySelector(".menu-toggle");

  toggle.addEventListener("click", () => {
    // Tutup submenu lain
    submenuItems.forEach((otherItem) => {
      if (otherItem !== item) {
        otherItem.classList.remove("active");
      }
    });

    // Toggle submenu yang dipilih
    item.classList.toggle("active");
  });
});

//=====================================================
// MOBILE SIDEBAR (OFF-CANVAS) TOGGLE
//=====================================================

(function () {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("sidebarOverlay");
  const openBtn = document.getElementById("sidebarToggleBtn");
  const closeBtn = document.getElementById("sidebarCloseBtn");

  if (!sidebar) return;

  function openSidebar() {
    sidebar.classList.add("mobile-open");
    if (overlay) overlay.classList.add("active");
    document.body.classList.add("no-scroll");
  }

  function closeSidebar() {
    sidebar.classList.remove("mobile-open");
    if (overlay) overlay.classList.remove("active");
    document.body.classList.remove("no-scroll");
  }

  if (openBtn) openBtn.addEventListener("click", openSidebar);
  if (closeBtn) closeBtn.addEventListener("click", closeSidebar);
  if (overlay) overlay.addEventListener("click", closeSidebar);

  // Tutup sidebar otomatis saat salah satu menu/submenu diklik (khusus mobile)
  document.querySelectorAll(".sidebar li:not(.has-submenu)").forEach((item) => {
    item.addEventListener("click", () => {
      if (window.innerWidth <= 768) closeSidebar();
    });
  });

  // Reset state saat resize melewati breakpoint mobile
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) closeSidebar();
  });

  // Broadcast event setiap kali ukuran/posisi sidebar selesai berubah
  // (dipakai maps.js untuk invalidateSize() Leaflet supaya peta tidak rusak)
  sidebar.addEventListener("transitionend", (e) => {
    if (e.propertyName === "transform" || e.propertyName === "width") {
      window.dispatchEvent(new Event("layout:sidebar-changed"));
    }
  });
})();