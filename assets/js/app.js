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
