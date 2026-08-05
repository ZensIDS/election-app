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
  }).setView([-0.5022, 117.1537], 7); // Kalimantan Timur

  /* =====================================================
     BASEMAP
  ===================================================== */

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap Contributors",
  }).addTo(dashboardMap);

  /* =====================================================
     SAMPLE MARKERS
  ===================================================== */

  const locations = [
    {
      name: "Samarinda",
      lat: -0.5022,
      lng: 117.1537,
      suara: "145.230",
      peluang: "91%",
    },

    {
      name: "Balikpapan",
      lat: -1.2654,
      lng: 116.8312,
      suara: "121.870",
      peluang: "87%",
    },

    {
      name: "Bontang",
      lat: 0.1324,
      lng: 117.4854,
      suara: "63.410",
      peluang: "82%",
    },

    {
      name: "Kutai Kartanegara",
      lat: -0.329,
      lng: 116.626,
      suara: "98.540",
      peluang: "84%",
    },
  ];

  locations.forEach((item) => {
    L.marker([item.lat, item.lng]).addTo(dashboardMap).bindPopup(`
        <strong>${item.name}</strong>
        <hr>
        <b>Total Suara</b><br>
        ${item.suara}
        <br><br>

        <b>Peluang Menang</b><br>
        ${item.peluang}
      `);
  });

  /* =====================================================
     LEGEND (Sementara)
  ===================================================== */

  const legend = L.control({
    position: "bottomright",
  });

  legend.onAdd = function () {
    const div = L.DomUtil.create("div", "map-legend");

    div.innerHTML = `
        <h4>Status Wilayah</h4>

        <div><span style="color:#16a34a;">●</span> Dominan</div>

        <div><span style="color:#f59e0b;">●</span> Kompetitif</div>

        <div><span style="color:#ef4444;">●</span> Lemah</div>
    `;

    return div;
  };

  legend.addTo(dashboardMap);
}
