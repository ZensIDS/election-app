/**
 * =====================================================
 * POLITICAL INTELLIGENCE 2029
 * Leaflet Maps Module
 * =====================================================
 */

let dashboardMap = null;

/* =====================================================
   INITIALIZE MAPS
===================================================== */

function initMaps() {
  console.log("Initializing Maps...");

  createMainMap();
}

/* =====================================================
   HELPER: BUAT POLYGON AREA DI SEKITAR TITIK KOORDINAT
   -----------------------------------------------------
   Catatan: ini adalah bentuk area ILUSTRATIF (bukan batas
   administratif asli), dibuat dengan menyebar beberapa titik
   di sekeliling koordinat pusat kota supaya tervisualisasi
   sebagai area/wilayah, bukan pin/titik tunggal.
   Kalau nanti sudah ada data GeoJSON batas wilayah/dapil yang
   sebenarnya, tinggal ganti fungsi ini dengan L.geoJSON(data).
===================================================== */

function createAreaPolygon(centerLat, centerLng, baseRadius = 0.22) {
  const totalPoints = 18;
  const points = [];

  // Seed berdasarkan koordinat supaya bentuk tiap kota selalu sama
  let seed = Math.abs(Math.sin(centerLat * centerLng) * 10000);

  function random() {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  }

  for (let i = 0; i < totalPoints; i++) {
    const angle = (i / totalPoints) * Math.PI * 2;

    // Radius acak
    const radius = baseRadius * (0.65 + random() * 0.55);

    const lat = centerLat + radius * Math.cos(angle);

    const lng =
      centerLng +
      (radius * Math.sin(angle)) / Math.cos((centerLat * Math.PI) / 180);

    points.push([lat, lng]);
  }

  return points;
}

/* =====================================================
   HELPER: WARNA STATUS BERDASARKAN PELUANG MENANG
===================================================== */

function getAreaStatus(peluangStr) {
  const value = parseInt(peluangStr, 10);

  if (value >= 90) {
    return { color: "#16a34a", label: "Dominan" };
  }

  if (value >= 80) {
    return { color: "#f59e0b", label: "Kompetitif" };
  }

  return { color: "#ef4444", label: "Lemah" };
}

/* =====================================================
   MAIN MAP
===================================================== */

function createMainMap() {
  const container = document.getElementById("map");

  if (!container) return;

  // Hindari inisialisasi ulang jika map sudah dibuat
  if (dashboardMap) {
    dashboardMap.remove();
    dashboardMap = null;
  }

  dashboardMap = L.map("map", {
    zoomControl: true,
  }).setView([-0.5022, 117.1537], 9); // Kalimantan Timur (zoom awal lebih dekat)

  /* =====================================================
     BASEMAP
  ===================================================== */

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap Contributors",
  }).addTo(dashboardMap);

  /* =====================================================
     SAMPLE AREA DATA
  ===================================================== */

  const locations = [
    {
      name: "Samarinda",
      lat: -0.5022,
      lng: 117.1537,
      radius: 0.28,
      suara: "145.230",
      peluang: "91%",
    },
    {
      name: "Balikpapan",
      lat: -1.2654,
      lng: 116.8312,
      radius: 0.04,
      suara: "121.870",
      peluang: "87%",
    },
    {
      name: "Bontang",
      lat: 0.1324,
      lng: 117.4854,
      radius: 0.18,
      suara: "63.410",
      peluang: "82%",
    },
    {
      name: "Kutai Kartanegara",
      lat: -0.329,
      lng: 116.626,
      radius: 0.22,
      suara: "98.540",
      peluang: "84%",
    },
    {
      name: "Kutai Timur",
      lat: 0.55,
      lng: 117.27,
      radius: 0.3,
      suara: "88.320",
      peluang: "79%",
    },
    {
      name: "Kutai Barat",
      lat: -0.59,
      lng: 115.62,
      radius: 0.32,
      suara: "57.600",
      peluang: "81%",
    },
    {
      name: "Paser",
      lat: -1.86,
      lng: 116.15,
      radius: 0.3,
      suara: "69.120",
      peluang: "74%",
    },
    {
      name: "Penajam Paser Utara",
      lat: -1.29,
      lng: 116.72,
      radius: 0.06,
      suara: "72.840",
      peluang: "86%",
    },
    {
      name: "IKN Nusantara",
      lat: -1.175,
      lng: 116.85,
      radius: 0.05,
      suara: "35.620",
      peluang: "89%",
    },
    
  ];

  /* =====================================================
     RENDER AREA POLYGON (bukan pin/titik)
  ===================================================== */

  const polygonLayers = [];

  locations.forEach((item) => {
    const status = getAreaStatus(item.peluang);
    const areaCoords = createAreaPolygon(item.lat, item.lng, item.radius);

    const areaPolygon = L.polygon(areaCoords, {
      color: status.color,
      weight: 2,
      opacity: 0.9,
      fillColor: status.color,
      fillOpacity: 0.35,
    }).addTo(dashboardMap);

    areaPolygon.bindPopup(`
        <strong>${item.name}</strong>
        <hr>
        <b>Status</b><br>
        ${status.label}
        <br><br>

        <b>Total Suara</b><br>
        ${item.suara}
        <br><br>

        <b>Peluang Menang</b><br>
        ${item.peluang}
      `);

    // Highlight halus saat kursor di atas area
    areaPolygon.on("mouseover", function () {
      this.setStyle({ fillOpacity: 0.55, weight: 3 });
    });

    areaPolygon.on("mouseout", function () {
      this.setStyle({ fillOpacity: 0.35, weight: 2 });
    });

    // Label nama wilayah tetap terlihat di tengah area
    areaPolygon.bindTooltip(item.name, {
      permanent: true,
      direction: "center",
      className: "map-area-label",
    });

    polygonLayers.push(areaPolygon);
  });

  /* =====================================================
     AUTO ZOOM: sesuaikan zoom & posisi peta supaya pas
     "membingkai" semua area polygon (lebih dekat/zoom-in
     dibanding sebelumnya yang zoom tetap level 7).
  ===================================================== */

  if (polygonLayers.length) {
    const bounds = L.featureGroup(polygonLayers).getBounds();

    dashboardMap.fitBounds(bounds, {
      padding: [15, 15],
      maxZoom: 13,
    });
  }

  /* =====================================================
     LEGEND
  ===================================================== */

  const legend = L.control({
    position: "bottomright",
  });

  legend.onAdd = function () {
    const div = L.DomUtil.create("div", "map-legend");

    div.innerHTML = `
        <h4>Status Wilayah</h4>

        <div><span style="color:#16a34a;">■</span> Dominan</div>

        <div><span style="color:#f59e0b;">■</span> Kompetitif</div>

        <div><span style="color:#ef4444;">■</span> Lemah</div>
    `;

    return div;
  };

  legend.addTo(dashboardMap);

  // Pastikan tile ter-render penuh & zoom tetap pas begitu container
  // sudah stabil ukurannya (dibutuhkan karena #map berada di dalam
  // layout yang lebar sidebarnya berubah-ubah di tablet/mobile).
  setTimeout(() => {
    if (!dashboardMap) return;

    dashboardMap.invalidateSize();

    if (polygonLayers.length) {
      dashboardMap.fitBounds(L.featureGroup(polygonLayers).getBounds(), {
        padding: [15, 15],
        maxZoom: 13,
      });
    }
  }, 300);
}

/* =====================================================
   RESPONSIVE FIX
   Leaflet tidak otomatis tahu kalau container-nya berubah
   ukuran (misal sidebar mobile dibuka/ditutup, atau sidebar
   collapse ke icon-only di tablet). invalidateSize()
   memaksa Leaflet menghitung ulang dimensi & re-render tile
   supaya peta tidak abu-abu/geser.
===================================================== */

window.addEventListener("resize", () => {
  if (dashboardMap) dashboardMap.invalidateSize();
});

window.addEventListener("layout:sidebar-changed", () => {
  if (dashboardMap) dashboardMap.invalidateSize();
});
