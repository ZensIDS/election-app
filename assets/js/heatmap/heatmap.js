/**
 * =====================================================
 * POLITICAL INTELLIGENCE 2029
 * Heatmap Analysis Module
 * =====================================================
 *
 * CATATAN:
 * Semua angka DATA DUMMY untuk kebutuhan demo/prototype
 * (struktur & angka sama seperti analisis-wilayah.js supaya
 * kedua modul konsisten). Nanti tinggal diganti lewat data
 * KPU asli di kecamatanData.
 *
 * GRANULARITAS PETA vs GRANULARITAS DATA:
 * Peta baru punya koordinat sampai level KABUPATEN/KOTA
 * (belum ada batas wilayah kecamatan), jadi polygon di peta
 * menampilkan AGREGAT per kabupaten. Sedangkan ranking
 * "Wilayah Terpanas", chart distribusi, dan panel detail
 * tetap bekerja di level KECAMATAN (lebih presisi).
 * Klik polygon kabupaten di peta = drill-down (filter ke
 * kabupaten itu) + otomatis tampilkan kecamatan dengan skor
 * tertinggi di panel detail. Klik salah satu baris di
 * "Wilayah Terpanas" untuk lihat detail kecamatan tertentu.
 *
 * 4 LAYER YANG DIAKTIFKAN (dummy versi pertama):
 * Priority Score (default), DPT Density, Historical Vote,
 * Gap Target 2029. Layer lain (Potential, TPS Density,
 * Competitor Strength) tinggal ditambahkan ke object LAYERS
 * tanpa mengubah struktur halaman.
 * =====================================================
 */

/* =====================================================
   DATA DUMMY: KABUPATEN/KOTA (pusat koordinat untuk peta)
===================================================== */

const kabupatenCenters = {
  Samarinda: { lat: -0.5022, lng: 117.1537, radius: 0.16 },
  Balikpapan: { lat: -1.2654, lng: 116.8312, radius: 0.14 },
  Bontang: { lat: 0.1324, lng: 117.4854, radius: 0.1 },
  "Kutai Kartanegara": { lat: -0.329, lng: 116.626, radius: 0.22 },
  "Kutai Timur": { lat: 0.55, lng: 117.27, radius: 0.26 },
  "Kutai Barat": { lat: -0.59, lng: 115.62, radius: 0.28 },
  Paser: { lat: -1.86, lng: 116.15, radius: 0.24 },
  "Penajam Paser Utara": { lat: -1.29, lng: 116.72, radius: 0.16 },
};

/* =====================================================
   DATA DUMMY: KECAMATAN
===================================================== */

const kecamatanData = [
  { kabupaten: "Samarinda", nama: "Samarinda Ulu", dpt: 145000, tps: 210, historis: 58000, target: 75000 },
  { kabupaten: "Samarinda", nama: "Samarinda Ilir", dpt: 98000, tps: 140, historis: 52000, target: 48000 },
  { kabupaten: "Samarinda", nama: "Samarinda Utara", dpt: 162000, tps: 225, historis: 44000, target: 70000 },

  { kabupaten: "Balikpapan", nama: "Balikpapan Utara", dpt: 138000, tps: 190, historis: 61000, target: 66000 },
  { kabupaten: "Balikpapan", nama: "Balikpapan Selatan", dpt: 121000, tps: 168, historis: 70000, target: 68000 },
  { kabupaten: "Balikpapan", nama: "Balikpapan Timur", dpt: 95000, tps: 130, historis: 38000, target: 55000 },

  { kabupaten: "Bontang", nama: "Bontang Utara", dpt: 52000, tps: 74, historis: 21000, target: 30000 },
  { kabupaten: "Bontang", nama: "Bontang Selatan", dpt: 47000, tps: 66, historis: 25000, target: 27000 },
  { kabupaten: "Bontang", nama: "Bontang Barat", dpt: 31000, tps: 44, historis: 12000, target: 18000 },

  { kabupaten: "Kutai Kartanegara", nama: "Tenggarong", dpt: 88000, tps: 120, historis: 34000, target: 50000 },
  { kabupaten: "Kutai Kartanegara", nama: "Tenggarong Seberang", dpt: 61000, tps: 84, historis: 22000, target: 35000 },
  { kabupaten: "Kutai Kartanegara", nama: "Loa Janan", dpt: 44000, tps: 60, historis: 19000, target: 24000 },

  { kabupaten: "Kutai Timur", nama: "Sangatta Utara", dpt: 76000, tps: 104, historis: 29000, target: 45000 },
  { kabupaten: "Kutai Timur", nama: "Sangatta Selatan", dpt: 53000, tps: 72, historis: 24000, target: 30000 },
  { kabupaten: "Kutai Timur", nama: "Bengalon", dpt: 29000, tps: 40, historis: 9000, target: 16000 },

  { kabupaten: "Kutai Barat", nama: "Barong Tongkok", dpt: 38000, tps: 52, historis: 14000, target: 22000 },
  { kabupaten: "Kutai Barat", nama: "Melak", dpt: 26000, tps: 36, historis: 11000, target: 15000 },
  { kabupaten: "Kutai Barat", nama: "Long Iram", dpt: 19000, tps: 26, historis: 6000, target: 11000 },

  { kabupaten: "Paser", nama: "Tanah Grogot", dpt: 47000, tps: 64, historis: 16000, target: 28000 },
  { kabupaten: "Paser", nama: "Batu Sopang", dpt: 22000, tps: 30, historis: 8000, target: 14000 },
  { kabupaten: "Paser", nama: "Long Ikis", dpt: 25000, tps: 34, historis: 9000, target: 15000 },

  { kabupaten: "Penajam Paser Utara", nama: "Penajam", dpt: 58000, tps: 80, historis: 27000, target: 34000 },
  { kabupaten: "Penajam Paser Utara", nama: "Sepaku", dpt: 41000, tps: 56, historis: 16000, target: 30000 },
  { kabupaten: "Penajam Paser Utara", nama: "Waru", dpt: 18000, tps: 24, historis: 8000, target: 12000 },
];

/* =====================================================
   HELPERS: NORMALISASI & PEMBAGIAN KELAS (BUCKET)
===================================================== */

function normalize(value, min, max) {
  if (max === min) return 50;
  return Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));
}

// Hash sederhana & deterministik dari nama wilayah -> dipakai untuk
// men-generate skor kompetisi DUMMY (belum ada data modul Kompetitor asli)
function seededScore(name, min, max) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) % 100000;
  }
  const rand = (hash % 1000) / 1000;
  return Math.round(min + rand * (max - min));
}

function computeBreakpoints(values, levels) {
  const sorted = [...values].sort((a, b) => a - b);
  const breaks = [];
  for (let i = 1; i < levels; i++) {
    const p = i / levels;
    const idx = (sorted.length - 1) * p;
    const lo = Math.floor(idx);
    const hi = Math.ceil(idx);
    breaks.push(sorted[lo] + (sorted[hi] - sorted[lo]) * (idx - lo));
  }
  return breaks; // panjang = levels - 1, ascending
}

function bucketFromBreaks(value, breaks, colors, labels) {
  for (let i = 0; i < breaks.length; i++) {
    if (value <= breaks[i]) return { color: colors[i], label: labels[i] };
  }
  return { color: colors[colors.length - 1], label: labels[labels.length - 1] };
}

function formatNumber(n) {
  return Math.round(n).toLocaleString("id-ID");
}

/* =====================================================
   HITUNG FIELD TURUNAN PER KECAMATAN
===================================================== */

kecamatanData.forEach((k) => {
  k.gap = k.target - k.historis;
  k.potensi = Math.round((k.historis / k.target) * 100);
  // dummy placeholder, pending modul Kompetitor asli
  k.competisi = seededScore(k.nama, 40, 88);
});

const dptValues = kecamatanData.map((k) => k.dpt);
const historisValues = kecamatanData.map((k) => k.historis);
const gapPositiveValues = kecamatanData.filter((k) => k.gap > 0).map((k) => k.gap);
// "potensi pertumbuhan" = gap relatif terhadap jumlah pemilih (DPT),
// bukan gap mentah, supaya wilayah ber-DPT besar dgn gap besar tidak
// otomatis dianggap paling "berpotensi" dibanding wilayah kecil yg gap-nya
// proporsional jauh lebih besar terhadap basis pemilihnya
const potentialRatios = kecamatanData.map((k) => k.gap / k.dpt);
const potentialMin = Math.min(...potentialRatios);
const potentialMax = Math.max(...potentialRatios);
const dptMin = Math.min(...dptValues);
const dptMax = Math.max(...dptValues);
const historisMin = Math.min(...historisValues);
const historisMax = Math.max(...historisValues);

kecamatanData.forEach((k, i) => {
  k.dptScore = normalize(k.dpt, dptMin, dptMax);
  k.historisScore = normalize(k.historis, historisMin, historisMax);
  k.gapScore = normalize(k.gap, Math.min(...kecamatanData.map((x) => x.gap)), Math.max(...kecamatanData.map((x) => x.gap)));
  k.potentialScore = normalize(potentialRatios[i], potentialMin, potentialMax);

  // Priority Score = kombinasi berbobot (Gap paling berat karena paling
  // dekat dengan pertanyaan "di mana kita harus mencari tambahan suara?")
  k.priorityScore = Math.round(
    k.gapScore * 0.35 +
      k.potentialScore * 0.2 +
      k.historisScore * 0.15 +
      k.dptScore * 0.15 +
      k.competisi * 0.15,
  );
  k.priorityScore = Math.min(100, Math.max(0, k.priorityScore));
});

/* =====================================================
   BREAKPOINTS UNTUK BUCKET (level KECAMATAN)
===================================================== */

const KEC_BREAKS = {
  dpt: computeBreakpoints(dptValues, 4),
  historis: computeBreakpoints(historisValues, 5),
  gapPositive: gapPositiveValues.length ? computeBreakpoints(gapPositiveValues, 3) : [5000, 10000],
};

const DPT_COLORS = ["#bfdbfe", "#60a5fa", "#2563eb", "#1e3a8a"];
const DPT_LABELS = ["Jarang", "Sedang", "Padat", "Sangat Padat"];

const HISTORIS_COLORS = ["#dc2626", "#f97316", "#eab308", "#22c55e", "#166534"];
const HISTORIS_LABELS = ["Sangat Lemah", "Lemah", "Sedang", "Kuat", "Sangat Kuat"];

const GAP_COLORS = ["#fde68a", "#f59e0b", "#dc2626", "#991b1b"];
const GAP_LABELS = ["Gap Kecil", "Gap Sedang", "Gap Besar", "Gap Sangat Besar"];

function getDptBucket(value, breaks) {
  return bucketFromBreaks(value, breaks, DPT_COLORS, DPT_LABELS);
}

function getHistorisBucket(value, breaks) {
  return bucketFromBreaks(value, breaks, HISTORIS_COLORS, HISTORIS_LABELS);
}

function getGapBucket(gap, breaks) {
  if (gap <= 0) return { color: "#16a34a", label: "Target Tercapai" };
  return bucketFromBreaks(gap, breaks, GAP_COLORS, GAP_LABELS);
}

function getPriorityBucket(score) {
  if (score >= 90) return { color: "#dc2626", label: "Prioritas Sangat Tinggi" };
  if (score >= 75) return { color: "#f97316", label: "Prioritas Tinggi" };
  if (score >= 60) return { color: "#eab308", label: "Prioritas Sedang" };
  return { color: "#16a34a", label: "Prioritas Rendah" };
}

/* =====================================================
   KONFIGURASI LAYER
   getValue()   : angka mentah yang ditampilkan di ranking/detail
   getBucket()  : { color, label } untuk kecamatan (dipakai ranking & chart)
   legend       : daftar tetap untuk panel legend di kanan peta
===================================================== */

const LAYERS = {
  priority: {
    label: "Priority Score",
    unit: "skor",
    question: "\u201cDari semua wilayah, mana yang harus menjadi prioritas untuk mencapai target kemenangan 2029?\u201d",
    getValue: (k) => k.priorityScore,
    formatValue: (v) => `${v}`,
    getBucket: (k) => getPriorityBucket(k.priorityScore),
    legend: [
      { color: "#dc2626", label: "90 \u2013 100", desc: "Prioritas Sangat Tinggi" },
      { color: "#f97316", label: "75 \u2013 89", desc: "Prioritas Tinggi" },
      { color: "#eab308", label: "60 \u2013 74", desc: "Prioritas Sedang" },
      { color: "#16a34a", label: "< 60", desc: "Prioritas Rendah" },
    ],
  },
  dpt: {
    label: "DPT Density",
    unit: "pemilih",
    question: "\u201cDi mana konsentrasi pemilih terbesar?\u201d",
    getValue: (k) => k.dpt,
    formatValue: (v) => formatNumber(v),
    getBucket: (k) => getDptBucket(k.dpt, KEC_BREAKS.dpt),
    legend: DPT_LABELS.map((label, i) => ({ color: DPT_COLORS[i], label, desc: "" })),
  },
  historis: {
    label: "Historical Vote",
    unit: "suara",
    question: "\u201cDi mana basis suara kita sebelumnya?\u201d",
    getValue: (k) => k.historis,
    formatValue: (v) => formatNumber(v),
    getBucket: (k) => getHistorisBucket(k.historis, KEC_BREAKS.historis),
    legend: HISTORIS_LABELS.map((label, i) => ({ color: HISTORIS_COLORS[i], label, desc: "" })),
  },
  gap: {
    label: "Gap Target 2029",
    unit: "suara",
    question: "\u201cDi mana kita perlu mencari tambahan suara?\u201d",
    getValue: (k) => k.gap,
    formatValue: (v) => (v >= 0 ? "+" : "") + formatNumber(v),
    getBucket: (k) => getGapBucket(k.gap, KEC_BREAKS.gapPositive),
    legend: [
      { color: "#16a34a", label: "\u2264 0", desc: "Target Tercapai" },
      ...GAP_LABELS.map((label, i) => ({ color: GAP_COLORS[i], label, desc: "" })),
    ],
  },
};

/* =====================================================
   STATE
===================================================== */

const state = {
  kabupaten: "",
  kecamatan: "",
  layer: "priority",
  selected: null, // nama kecamatan yang sedang ditampilkan di panel detail
};

let heatmapMap = null;
let distribusiChartInstance = null;

function getFilteredData() {
  return kecamatanData.filter((k) => {
    if (state.kabupaten && k.kabupaten !== state.kabupaten) return false;
    if (state.kecamatan && k.nama !== state.kecamatan) return false;
    return true;
  });
}

function currentLayer() {
  return LAYERS[state.layer];
}

/* =====================================================
   INIT
===================================================== */

document.addEventListener("DOMContentLoaded", () => {
  populateFilters();
  bindFilterEvents();
  bindLayerToggle();

  renderAll();
});

/* =====================================================
   FILTER: POPULATE & CASCADE
===================================================== */

function populateFilters() {
  const kabupatenSelect = document.getElementById("filterKabupaten");

  Object.keys(kabupatenCenters).forEach((nama) => {
    const opt = document.createElement("option");
    opt.value = nama;
    opt.textContent = nama;
    kabupatenSelect.appendChild(opt);
  });
}

function updateKecamatanOptions() {
  const kecamatanSelect = document.getElementById("filterKecamatan");
  kecamatanSelect.innerHTML = '<option value="">Semua Kecamatan</option>';

  const list = state.kabupaten
    ? kecamatanData.filter((k) => k.kabupaten === state.kabupaten)
    : [];

  list.forEach((k) => {
    const opt = document.createElement("option");
    opt.value = k.nama;
    opt.textContent = k.nama;
    kecamatanSelect.appendChild(opt);
  });

  kecamatanSelect.disabled = list.length === 0;
}

function bindFilterEvents() {
  document.getElementById("filterKabupaten").addEventListener("change", (e) => {
    state.kabupaten = e.target.value;
    state.kecamatan = "";
    state.selected = null;

    updateKecamatanOptions();
    renderAll();
  });

  document.getElementById("filterKecamatan").addEventListener("change", (e) => {
    state.kecamatan = e.target.value;
    state.selected = e.target.value || null;

    renderAll();
  });

  document.getElementById("resetFilterBtn").addEventListener("click", () => {
    state.kabupaten = "";
    state.kecamatan = "";
    state.selected = null;

    document.getElementById("filterKabupaten").value = "";
    updateKecamatanOptions();

    renderAll();
  });
}

/* =====================================================
   LAYER TOGGLE
   UI multi-toggle, behavior single active layer.
===================================================== */

function bindLayerToggle() {
  const buttons = document.querySelectorAll(".layer-toggle-btn");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.dataset.layer === state.layer) return;

      buttons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      state.layer = btn.dataset.layer;

      renderAll();
    });
  });
}

/* =====================================================
   RENDER ALL
===================================================== */

function renderAll() {
  const layer = currentLayer();

  document.getElementById("layerQuestion").textContent = layer.question;
  document.getElementById("rankingLayerLabel").textContent = `Berdasarkan ${layer.label}`;
  document.getElementById("distribusiLayerLabel").textContent =
    `${layer.label} \u00b7 ${state.kabupaten || state.kecamatan ? "wilayah terfilter" : "seluruh kecamatan"}`;

  renderLegend();
  renderMap();
  renderTerpanas();
  renderDistribusiChart();
  renderDetail();
}

/* =====================================================
   LEGEND DINAMIS
===================================================== */

function renderLegend() {
  const layer = currentLayer();
  const container = document.getElementById("dynamicLegend");

  container.innerHTML = layer.legend
    .map(
      (item) => `
      <div class="legend-row">
        <span class="legend-swatch" style="background:${item.color}"></span>
        <div class="legend-text">
          <strong>${item.desc || item.label}</strong>
          ${item.desc ? `<small>${item.label}</small>` : ""}
        </div>
      </div>
    `,
    )
    .join("");
}

/* =====================================================
   PETA (agregasi per kabupaten, sesuai koordinat yang tersedia)
===================================================== */

function createAreaPolygon(centerLat, centerLng, baseRadius) {
  const sides = 8;
  const points = [];

  for (let i = 0; i < sides; i++) {
    const angle = (i / sides) * Math.PI * 2;
    const radius = baseRadius * (0.72 + Math.sin(i * 2.3) * 0.28);

    const lat = centerLat + radius * Math.cos(angle);
    const lng =
      centerLng +
      (radius * Math.sin(angle)) / Math.cos((centerLat * Math.PI) / 180);

    points.push([lat, lng]);
  }

  return points;
}

function getKabupatenAggregate(nama) {
  const list = kecamatanData.filter((k) => k.kabupaten === nama);
  const dpt = list.reduce((s, k) => s + k.dpt, 0);
  const historis = list.reduce((s, k) => s + k.historis, 0);
  const gap = list.reduce((s, k) => s + k.gap, 0);
  const priorityScore = Math.round(list.reduce((s, k) => s + k.priorityScore, 0) / list.length);
  const topKecamatan = [...list].sort((a, b) => currentLayer().getValue(b) - currentLayer().getValue(a))[0];

  return { dpt, historis, gap, priorityScore, list, topKecamatan };
}

function getKabupatenBucket(agg) {
  switch (state.layer) {
    case "dpt": {
      const kabDptValues = Object.keys(kabupatenCenters).map((n) => getKabupatenAggregate(n).dpt);
      return getDptBucket(agg.dpt, computeBreakpoints(kabDptValues, 4));
    }
    case "historis": {
      const kabHistorisValues = Object.keys(kabupatenCenters).map((n) => getKabupatenAggregate(n).historis);
      return getHistorisBucket(agg.historis, computeBreakpoints(kabHistorisValues, 5));
    }
    case "gap": {
      const kabGapPositive = Object.keys(kabupatenCenters)
        .map((n) => getKabupatenAggregate(n).gap)
        .filter((g) => g > 0);
      return getGapBucket(agg.gap, kabGapPositive.length ? computeBreakpoints(kabGapPositive, 3) : [20000, 40000]);
    }
    default:
      return getPriorityBucket(agg.priorityScore);
  }
}

function renderMap() {
  const container = document.getElementById("heatmapMap");
  if (!container) return;

  if (heatmapMap) {
    heatmapMap.remove();
    heatmapMap = null;
  }

  heatmapMap = L.map("heatmapMap", { zoomControl: true }).setView([-0.5022, 117.1537], 7);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap Contributors",
  }).addTo(heatmapMap);

  const polygonLayers = [];
  const layer = currentLayer();

  Object.entries(kabupatenCenters).forEach(([nama, center]) => {
    const agg = getKabupatenAggregate(nama);
    const bucket = getKabupatenBucket(agg);
    const isActive = state.kabupaten === nama;
    const coords = createAreaPolygon(center.lat, center.lng, center.radius);

    const polygon = L.polygon(coords, {
      color: bucket.color,
      weight: isActive ? 4 : 2,
      opacity: 0.9,
      fillColor: bucket.color,
      fillOpacity: isActive ? 0.6 : 0.4,
    }).addTo(heatmapMap);

    polygon.bindPopup(`
      <strong>${nama}</strong>
      <hr>
      <b>${layer.label}</b><br>${bucket.label}
      <br><br>
      <b>Kecamatan tertinggi</b><br>${agg.topKecamatan ? agg.topKecamatan.nama : "-"}
      <br><br>
      <em>Klik area untuk drill-down &rarr;</em>
    `);

    polygon.bindTooltip(nama, {
      permanent: true,
      direction: "center",
      className: "map-area-label",
    });

    polygon.on("mouseover", function () {
      if (!isActive) this.setStyle({ fillOpacity: 0.55, weight: 3 });
    });

    polygon.on("mouseout", function () {
      if (!isActive) this.setStyle({ fillOpacity: 0.4, weight: 2 });
    });

    polygon.on("click", () => {
      state.kabupaten = nama;
      state.kecamatan = "";
      state.selected = agg.topKecamatan ? agg.topKecamatan.nama : null;

      document.getElementById("filterKabupaten").value = nama;
      updateKecamatanOptions();

      renderAll();
    });

    polygonLayers.push(polygon);
  });

  if (polygonLayers.length) {
    const kabNames = Object.keys(kabupatenCenters);
    const targetLayers = state.kabupaten
      ? polygonLayers.filter((_, i) => kabNames[i] === state.kabupaten)
      : polygonLayers;

    const bounds = L.featureGroup(targetLayers.length ? targetLayers : polygonLayers).getBounds();
    heatmapMap.fitBounds(bounds, { padding: [20, 20], maxZoom: 11 });
  }

  setTimeout(() => {
    if (heatmapMap) heatmapMap.invalidateSize();
  }, 250);
}

/* =====================================================
   WILAYAH TERPANAS (ranking level kecamatan)
===================================================== */

function renderTerpanas() {
  const layer = currentLayer();
  const data = [...getFilteredData()].sort((a, b) => layer.getValue(b) - layer.getValue(a)).slice(0, 8);

  const list = document.getElementById("terpanasList");

  if (!data.length) {
    list.innerHTML = `<li style="color:var(--text-light); padding: 10px 0;">Tidak ada wilayah pada filter ini.</li>`;
    return;
  }

  list.innerHTML = data
    .map((k, i) => {
      const bucket = layer.getBucket(k);
      const gapLabel = (k.gap >= 0 ? "+" : "") + formatNumber(k.gap);

      return `
        <li class="ranking-item" data-kecamatan="${k.nama}">
          <div class="ranking-rank" style="background:${bucket.color}">${i + 1}</div>
          <div class="ranking-info">
            <strong>${k.nama}</strong>
            <small>${k.kabupaten} &middot; ${bucket.label}</small>
          </div>
          <div class="ranking-value">
            <strong>${layer.formatValue(layer.getValue(k))}</strong>
            <small>Gap ${gapLabel}</small>
          </div>
        </li>
      `;
    })
    .join("");

  list.querySelectorAll(".ranking-item").forEach((item) => {
    item.addEventListener("click", () => {
      const nama = item.dataset.kecamatan;
      const kec = kecamatanData.find((k) => k.nama === nama);
      if (!kec) return;

      state.selected = nama;

      // Sinkronkan filter kabupaten (tanpa mengunci ke 1 kecamatan)
      // supaya konteks peta & daftar tetap terlihat luas
      if (state.kabupaten !== kec.kabupaten) {
        state.kabupaten = kec.kabupaten;
        document.getElementById("filterKabupaten").value = kec.kabupaten;
        updateKecamatanOptions();
      }

      renderMap();
      renderDetail();
    });
  });
}

/* =====================================================
   CHART DISTRIBUSI (Highcharts, bar per kecamatan)
===================================================== */

function renderDistribusiChart() {
  const container = document.getElementById("distribusiChart");
  if (!container) return;

  const layer = currentLayer();
  const data = [...getFilteredData()].sort((a, b) => layer.getValue(b) - layer.getValue(a));

  distribusiChartInstance = Highcharts.chart(container, {
    chart: { type: "bar" },
    title: { text: null },
    xAxis: { categories: data.map((k) => k.nama) },
    yAxis: { title: { text: layer.label } },
    legend: { enabled: false },
    tooltip: {
      formatter: function () {
        return `<strong>${this.x}</strong><br>${layer.label}: ${layer.formatValue(this.y)}`;
      },
    },
    series: [
      {
        name: layer.label,
        data: data.map((k) => ({
          y: layer.getValue(k),
          color: layer.getBucket(k).color,
        })),
      },
    ],
  });
}

/* =====================================================
   DETAIL WILAYAH (muncul saat polygon/ranking diklik)
===================================================== */

function renderDetail() {
  const container = document.getElementById("detailWilayah");
  const kec = state.selected ? kecamatanData.find((k) => k.nama === state.selected) : null;

  if (!kec) {
    container.innerHTML = `
      <div class="empty-state">
        <i class="fa-solid fa-hand-pointer"></i>
        <p>
          Klik area pada peta atau salah satu wilayah pada daftar
          "Wilayah Terpanas" untuk melihat detail lengkap.
        </p>
      </div>
    `;
    return;
  }

  const priorityBucket = getPriorityBucket(kec.priorityScore);
  const gapClass = kec.gap >= 0 ? "gap-positive" : "gap-negative";
  const rekomendasi = getRekomendasiText(kec, priorityBucket);

  container.innerHTML = `
    <div class="detail-header">
      <div>
        <h4>${kec.nama}</h4>
        <small>${kec.kabupaten}</small>
      </div>
      <span class="detail-priority-badge" style="background:${priorityBucket.color}">
        ${kec.priorityScore}
      </span>
    </div>

    <div class="detail-metrics">
      <div class="detail-metric">
        <span>DPT</span>
        <strong>${formatNumber(kec.dpt)}</strong>
      </div>
      <div class="detail-metric">
        <span>TPS</span>
        <strong>${formatNumber(kec.tps)}</strong>
      </div>
      <div class="detail-metric">
        <span>Suara Historis</span>
        <strong>${formatNumber(kec.historis)}</strong>
      </div>
      <div class="detail-metric">
        <span>Target 2029</span>
        <strong>${formatNumber(kec.target)}</strong>
      </div>
      <div class="detail-metric ${gapClass}">
        <span>Gap</span>
        <strong>${kec.gap >= 0 ? "+" : ""}${formatNumber(kec.gap)}</strong>
      </div>
      <div class="detail-metric">
        <span>Potensi</span>
        <strong>${kec.potensi}%</strong>
      </div>
    </div>

    <div class="detail-rekomendasi">
      <strong>Rekomendasi</strong>
      ${rekomendasi}
    </div>
  `;
}

function getRekomendasiText(kec, priorityBucket) {
  if (priorityBucket.label === "Prioritas Sangat Tinggi") {
    return `Fokuskan sumber daya kampanye pada wilayah ini &mdash; gap menuju target masih ${formatNumber(kec.gap)} suara dengan basis DPT ${formatNumber(kec.dpt)} pemilih.`;
  }
  if (priorityBucket.label === "Prioritas Tinggi") {
    return `Tingkatkan intensitas kampanye lapangan &mdash; wilayah ini punya peluang cukup besar untuk menutup gap ${formatNumber(kec.gap)} suara.`;
  }
  if (priorityBucket.label === "Prioritas Sedang") {
    return `Pantau perkembangan secara berkala, alokasikan sumber daya secukupnya sambil memprioritaskan wilayah lain yang lebih mendesak.`;
  }
  return `Wilayah ini relatif aman/sudah mendekati target. Pertahankan basis suara yang ada tanpa perlu tambahan sumber daya besar.`;
}

/* =====================================================
   RESPONSIVE FIX UNTUK LEAFLET
===================================================== */

window.addEventListener("resize", () => {
  if (heatmapMap) heatmapMap.invalidateSize();
});

window.addEventListener("layout:sidebar-changed", () => {
  if (heatmapMap) heatmapMap.invalidateSize();
});