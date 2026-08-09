/**
 * =====================================================
 * POLITICAL INTELLIGENCE 2029
 * Analisis Wilayah - Decision Support Module
 * =====================================================
 *
 * CATATAN:
 * Semua angka di bawah ini DATA DUMMY untuk kebutuhan
 * demo/prototype. Struktur sudah disiapkan supaya nanti
 * tinggal diganti dengan data KPU asli (baseline 2025 →
 * target 2029) lewat fungsi loadKecamatanData().
 *
 * Level agregasi saat ini baru sampai KECAMATAN.
 * Dropdown Desa/Kelurahan & TPS masih placeholder UI
 * (belum ada data sungguhan di level itu).
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
   (dpt, tps, historis = perolehan suara pemilu sebelumnya,
   target = target suara 2029)
===================================================== */

const kecamatanData = [
  {
    kabupaten: "Samarinda",
    nama: "Samarinda Ulu",
    dpt: 145000,
    tps: 210,
    historis: 58000,
    target: 75000,
  },
  {
    kabupaten: "Samarinda",
    nama: "Samarinda Ilir",
    dpt: 98000,
    tps: 140,
    historis: 52000,
    target: 48000,
  },
  {
    kabupaten: "Samarinda",
    nama: "Samarinda Utara",
    dpt: 162000,
    tps: 225,
    historis: 44000,
    target: 70000,
  },

  {
    kabupaten: "Balikpapan",
    nama: "Balikpapan Utara",
    dpt: 138000,
    tps: 190,
    historis: 61000,
    target: 66000,
  },
  {
    kabupaten: "Balikpapan",
    nama: "Balikpapan Selatan",
    dpt: 121000,
    tps: 168,
    historis: 70000,
    target: 68000,
  },
  {
    kabupaten: "Balikpapan",
    nama: "Balikpapan Timur",
    dpt: 95000,
    tps: 130,
    historis: 38000,
    target: 55000,
  },

  {
    kabupaten: "Bontang",
    nama: "Bontang Utara",
    dpt: 52000,
    tps: 74,
    historis: 21000,
    target: 30000,
  },
  {
    kabupaten: "Bontang",
    nama: "Bontang Selatan",
    dpt: 47000,
    tps: 66,
    historis: 25000,
    target: 27000,
  },
  {
    kabupaten: "Bontang",
    nama: "Bontang Barat",
    dpt: 31000,
    tps: 44,
    historis: 12000,
    target: 18000,
  },

  {
    kabupaten: "Kutai Kartanegara",
    nama: "Tenggarong",
    dpt: 88000,
    tps: 120,
    historis: 34000,
    target: 50000,
  },
  {
    kabupaten: "Kutai Kartanegara",
    nama: "Tenggarong Seberang",
    dpt: 61000,
    tps: 84,
    historis: 22000,
    target: 35000,
  },
  {
    kabupaten: "Kutai Kartanegara",
    nama: "Loa Janan",
    dpt: 44000,
    tps: 60,
    historis: 19000,
    target: 24000,
  },

  {
    kabupaten: "Kutai Timur",
    nama: "Sangatta Utara",
    dpt: 76000,
    tps: 104,
    historis: 29000,
    target: 45000,
  },
  {
    kabupaten: "Kutai Timur",
    nama: "Sangatta Selatan",
    dpt: 53000,
    tps: 72,
    historis: 24000,
    target: 30000,
  },
  {
    kabupaten: "Kutai Timur",
    nama: "Bengalon",
    dpt: 29000,
    tps: 40,
    historis: 9000,
    target: 16000,
  },

  {
    kabupaten: "Kutai Barat",
    nama: "Barong Tongkok",
    dpt: 38000,
    tps: 52,
    historis: 14000,
    target: 22000,
  },
  {
    kabupaten: "Kutai Barat",
    nama: "Melak",
    dpt: 26000,
    tps: 36,
    historis: 11000,
    target: 15000,
  },
  {
    kabupaten: "Kutai Barat",
    nama: "Long Iram",
    dpt: 19000,
    tps: 26,
    historis: 6000,
    target: 11000,
  },

  {
    kabupaten: "Paser",
    nama: "Tanah Grogot",
    dpt: 47000,
    tps: 64,
    historis: 16000,
    target: 28000,
  },
  {
    kabupaten: "Paser",
    nama: "Batu Sopang",
    dpt: 22000,
    tps: 30,
    historis: 8000,
    target: 14000,
  },
  {
    kabupaten: "Paser",
    nama: "Long Ikis",
    dpt: 25000,
    tps: 34,
    historis: 9000,
    target: 15000,
  },

  {
    kabupaten: "Penajam Paser Utara",
    nama: "Penajam",
    dpt: 58000,
    tps: 80,
    historis: 27000,
    target: 34000,
  },
  {
    kabupaten: "Penajam Paser Utara",
    nama: "Sepaku",
    dpt: 41000,
    tps: 56,
    historis: 16000,
    target: 30000,
  },
  {
    kabupaten: "Penajam Paser Utara",
    nama: "Waru",
    dpt: 18000,
    tps: 24,
    historis: 8000,
    target: 12000,
  },
];

// Hitung gap & potensi tiap kecamatan sekali di awal
kecamatanData.forEach((k) => {
  k.gap = k.target - k.historis;
  k.potensi = Math.round((k.historis / k.target) * 100);
  k.status = getStatus(k.gap, k.potensi);
});

function getStatus(gap, potensi) {
  if (gap <= 0) return { key: "kuat", label: "Kuat", color: "#16a34a" };
  if (potensi >= 70)
    return { key: "potensial", label: "Potensial", color: "#f59e0b" };
  return { key: "lemah", label: "Lemah", color: "#ef4444" };
}

function getPriorityLabel(gap) {
  if (gap >= 15000) return { key: "tinggi", label: "Tinggi" };
  if (gap >= 6000) return { key: "sedang", label: "Sedang" };
  return { key: "rendah", label: "Rendah" };
}

/* =====================================================
   STATE
===================================================== */

const state = {
  kabupaten: "",
  kecamatan: "",
  mode: "historis",
};

let dashboardMap = null;
let trendChartInstance = null;
let potensiChartInstance = null;
let gapChartInstance = null;

/* =====================================================
   HELPER: DATA TERFILTER
===================================================== */

function getFilteredData() {
  return kecamatanData.filter((k) => {
    if (state.kabupaten && k.kabupaten !== state.kabupaten) return false;
    if (state.kecamatan && k.nama !== state.kecamatan) return false;
    return true;
  });
}

function formatNumber(n) {
  return Math.round(n).toLocaleString("id-ID");
}

/* =====================================================
   INIT
===================================================== */

document.addEventListener("DOMContentLoaded", () => {
  populateFilters();
  bindFilterEvents();
  bindModeTabs();
  bindSimulasi();

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

function updateDesaTpsPlaceholder() {
  // Desa & TPS masih placeholder dummy (belum ada data sungguhan di level ini)
  const desaSelect = document.getElementById("filterDesa");
  const tpsSelect = document.getElementById("filterTps");

  if (state.kecamatan) {
    desaSelect.innerHTML =
      '<option value="">Semua Desa</option>' +
      [1, 2, 3]
        .map((i) => `<option value="Desa ${i}">Desa ${i} (contoh)</option>`)
        .join("");
    desaSelect.disabled = false;
  } else {
    desaSelect.innerHTML = '<option value="">Semua Desa</option>';
    desaSelect.disabled = true;
  }

  tpsSelect.innerHTML = '<option value="">Semua TPS</option>';
  tpsSelect.disabled = true;
}

function bindFilterEvents() {
  document.getElementById("filterKabupaten").addEventListener("change", (e) => {
    state.kabupaten = e.target.value;
    state.kecamatan = "";

    updateKecamatanOptions();
    updateDesaTpsPlaceholder();
    renderAll();
  });

  document.getElementById("filterKecamatan").addEventListener("change", (e) => {
    state.kecamatan = e.target.value;

    updateDesaTpsPlaceholder();
    renderAll();
  });

  document.getElementById("filterDesa").addEventListener("change", () => {
    const tpsSelect = document.getElementById("filterTps");

    if (document.getElementById("filterDesa").value) {
      tpsSelect.innerHTML =
        '<option value="">Semua TPS</option>' +
        Array.from({ length: 5 }, (_, i) => {
          const no = String(i + 1).padStart(3, "0");
          return `<option value="TPS ${no}">TPS ${no} (contoh)</option>`;
        }).join("");
      tpsSelect.disabled = false;
    } else {
      tpsSelect.innerHTML = '<option value="">Semua TPS</option>';
      tpsSelect.disabled = true;
    }
  });

  document.getElementById("resetFilterBtn").addEventListener("click", () => {
    state.kabupaten = "";
    state.kecamatan = "";

    document.getElementById("filterKabupaten").value = "";
    updateKecamatanOptions();
    updateDesaTpsPlaceholder();

    renderAll();
  });
}

/* =====================================================
   MODE TABS
===================================================== */

function bindModeTabs() {
  const tabs = document.querySelectorAll(".mode-tab");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      state.mode = tab.dataset.mode;

      document
        .getElementById("simulasiPanel")
        .classList.toggle("visible", state.mode === "simulasi");

      document
        .getElementById("kompetitorPanel")
        .classList.toggle("visible", state.mode === "kompetitor");

      renderCharts();
    });
  });
}

/* =====================================================
   RENDER ALL
===================================================== */

function renderAll() {
  renderKpi();
  renderMap();
  renderRanking();
  renderCharts();
  renderRekomendasi();
  renderTpsPrioritas();
  populateSimulasiDropdown();
}

/* =====================================================
   KPI CARDS
===================================================== */

function renderKpi() {
  const data = getFilteredData();

  const dpt = data.reduce((sum, k) => sum + k.dpt, 0);
  const tps = data.reduce((sum, k) => sum + k.tps, 0);
  const historis = data.reduce((sum, k) => sum + k.historis, 0);
  const gap = data.reduce((sum, k) => sum + k.gap, 0);

  const cards = [
    {
      label: "DPT",
      value: formatNumber(dpt),
      icon: "fa-users",
      note: `${data.length} kecamatan`,
    },
    {
      label: "Total TPS",
      value: formatNumber(tps),
      icon: "fa-building",
      note: "titik pemungutan suara",
    },
    {
      label: "Suara Historis",
      value: formatNumber(historis),
      icon: "fa-clock-rotate-left",
      note: "pemilu sebelumnya",
    },
    {
      label: "Gap Menuju Target",
      value: (gap >= 0 ? "+" : "") + formatNumber(gap),
      icon: "fa-bullseye",
      note: gap >= 0 ? "kurang dari target" : "sudah melebihi target",
      cls: gap >= 0 ? "gap-positive" : "gap-negative",
    },
  ];

  const grid = document.getElementById("analisisKpiGrid");

  grid.innerHTML = cards
    .map(
      (c) => `
      <div class="analisis-kpi-card ${c.cls || ""}">
        <span><i class="fa-solid ${c.icon}"></i> ${c.label}</span>
        <h2>${c.value}</h2>
        <small>${c.note}</small>
      </div>
    `,
    )
    .join("");
}

/* =====================================================
   PETA INTERAKTIF (drill-down per kabupaten)
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

function renderMap() {
  const container = document.getElementById("analisisMap");
  if (!container) return;

  if (dashboardMap) {
    dashboardMap.remove();
    dashboardMap = null;
  }

  dashboardMap = L.map("analisisMap", { zoomControl: true }).setView(
    [-0.5022, 117.1537],
    7,
  );

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap Contributors",
  }).addTo(dashboardMap);

  const polygonLayers = [];

  Object.entries(kabupatenCenters).forEach(([nama, center]) => {
    const kecamatanList = kecamatanData.filter((k) => k.kabupaten === nama);

    const avgPotensi = Math.round(
      kecamatanList.reduce((s, k) => s + k.potensi, 0) / kecamatanList.length,
    );
    const totalGap = kecamatanList.reduce((s, k) => s + k.gap, 0);
    const status = getStatus(totalGap, avgPotensi);

    const isActive = state.kabupaten === nama;
    const coords = createAreaPolygon(center.lat, center.lng, center.radius);

    const polygon = L.polygon(coords, {
      color: status.color,
      weight: isActive ? 4 : 2,
      opacity: 0.9,
      fillColor: status.color,
      fillOpacity: isActive ? 0.55 : 0.32,
    }).addTo(dashboardMap);

    polygon.bindPopup(`
      <strong>${nama}</strong>
      <hr>
      <b>Rata-rata Potensi</b><br>${avgPotensi}%
      <br><br>
      <b>Total Gap</b><br>${formatNumber(totalGap)} suara
      <br><br>
      <em>Klik area untuk drill-down &rarr;</em>
    `);

    polygon.bindTooltip(nama, {
      permanent: true,
      direction: "center",
      className: "map-area-label",
    });

    polygon.on("mouseover", function () {
      if (!isActive) this.setStyle({ fillOpacity: 0.5, weight: 3 });
    });

    polygon.on("mouseout", function () {
      if (!isActive) this.setStyle({ fillOpacity: 0.32, weight: 2 });
    });

    // DRILL-DOWN: klik area -> set filter kabupaten
    polygon.on("click", () => {
      state.kabupaten = nama;
      state.kecamatan = "";

      document.getElementById("filterKabupaten").value = nama;
      updateKecamatanOptions();
      updateDesaTpsPlaceholder();

      renderAll();
    });

    polygonLayers.push(polygon);
  });

  if (polygonLayers.length) {
    const targetLayers = state.kabupaten
      ? polygonLayers.filter(
          (_, i) => Object.keys(kabupatenCenters)[i] === state.kabupaten,
        )
      : polygonLayers;

    const bounds = L.featureGroup(
      targetLayers.length ? targetLayers : polygonLayers,
    ).getBounds();

    dashboardMap.fitBounds(bounds, { padding: [20, 20], maxZoom: 11 });
  }

  const legend = L.control({ position: "bottomright" });

  legend.onAdd = function () {
    const div = L.DomUtil.create("div", "map-legend");
    div.innerHTML = `
      <h4>Status Wilayah</h4>
      <div><span style="color:#16a34a;">■</span> Kuat</div>
      <div><span style="color:#f59e0b;">■</span> Potensial</div>
      <div><span style="color:#ef4444;">■</span> Lemah</div>
    `;
    return div;
  };

  legend.addTo(dashboardMap);

  setTimeout(() => {
    if (dashboardMap) dashboardMap.invalidateSize();
  }, 250);
}

/* =====================================================
   RANKING WILAYAH
===================================================== */

function renderRanking() {
  const data = [...getFilteredData()].sort((a, b) => b.gap - a.gap);

  const scopeLabel = document.getElementById("rankingScopeLabel");
  scopeLabel.textContent = state.kabupaten
    ? state.kabupaten
    : "Semua Kabupaten/Kota";

  const list = document.getElementById("rankingList");

  list.innerHTML = data
    .map((k, i) => {
      const gapClass = k.gap >= 0 ? "positive" : "negative";
      const gapLabel = (k.gap >= 0 ? "+" : "") + formatNumber(k.gap);

      return `
        <li class="ranking-item" data-kecamatan="${k.nama}">
          <div class="ranking-rank">${i + 1}</div>
          <div class="ranking-info">
            <strong>${k.nama}</strong>
            <small>${k.kabupaten} &middot; Potensi ${k.potensi}%</small>
          </div>
          <div class="ranking-gap ${gapClass}">${gapLabel}</div>
        </li>
      `;
    })
    .join("");

  list.querySelectorAll(".ranking-item").forEach((item) => {
    item.addEventListener("click", () => {
      const nama = item.dataset.kecamatan;
      const kec = kecamatanData.find((k) => k.nama === nama);

      if (!kec) return;

      state.kabupaten = kec.kabupaten;
      state.kecamatan = kec.nama;

      document.getElementById("filterKabupaten").value = kec.kabupaten;
      updateKecamatanOptions();
      document.getElementById("filterKecamatan").value = kec.nama;
      updateDesaTpsPlaceholder();

      renderAll();
    });
  });
}

/* =====================================================
   CHARTS (Highcharts): TREND, POTENSI, GAP
===================================================== */

function renderCharts() {
  const data = getFilteredData();
  const categories = data.map((k) => k.nama);

  renderTrendChart(data, categories);
  renderPotensiChart(data, categories);
  renderGapChart(data, categories);
}

function renderTrendChart(data, categories) {
  const container = document.getElementById("trendChart");
  if (!container) return;

  trendChartInstance = Highcharts.chart(container, {
    chart: { type: "column" },
    title: { text: null },
    xAxis: { categories },
    yAxis: { title: { text: null } },
    legend: { enabled: true },
    tooltip: { shared: true },
    series: [
      {
        name: "Historis",
        data: data.map((k) => k.historis),
        color: "#6366f1",
      },
      {
        name: "Target 2029",
        data: data.map((k) => k.target),
        color: "#ec4899",
      },
    ],
  });
}

function renderPotensiChart(data, categories) {
  const container = document.getElementById("potensiChart");
  if (!container) return;

  const sorted = [...data].sort((a, b) => b.potensi - a.potensi);

  potensiChartInstance = Highcharts.chart(container, {
    chart: { type: "bar" },
    title: { text: null },
    xAxis: { categories: sorted.map((k) => k.nama) },
    yAxis: { title: { text: null }, max: 120 },
    legend: { enabled: false },
    series: [
      {
        name: "Potensi (%)",
        data: sorted.map((k) => ({
          y: k.potensi,
          color: k.status.color,
        })),
      },
    ],
  });
}

function renderGapChart(data, categories) {
  const container = document.getElementById("gapChart");
  if (!container) return;

  const sorted = [...data].sort((a, b) => b.gap - a.gap);

  gapChartInstance = Highcharts.chart(container, {
    chart: { type: "bar" },
    title: { text: null },
    xAxis: { categories: sorted.map((k) => k.nama) },
    yAxis: { title: { text: null } },
    legend: { enabled: false },
    series: [
      {
        name: "Gap",
        data: sorted.map((k) => ({
          y: k.gap,
          color: k.gap >= 0 ? "#ef4444" : "#16a34a",
        })),
      },
    ],
  });
}

/* =====================================================
   REKOMENDASI: wilayah yang harus dikejar
===================================================== */

function renderRekomendasi() {
  const top3 = [...getFilteredData()]
    .filter((k) => k.gap > 0)
    .sort((a, b) => b.gap - a.gap)
    .slice(0, 3);

  const list = document.getElementById("rekomendasiList");

  if (!top3.length) {
    list.innerHTML = `<p style="color:var(--text-light);">Semua wilayah pada filter ini sudah mencapai target. 🎉</p>`;
    return;
  }

  list.innerHTML = top3
    .map(
      (k, i) => `
      <div class="rekomendasi-card">
        <span class="rekomendasi-rank">Prioritas #${i + 1}</span>
        <h4>${k.nama}</h4>
        <p>${k.kabupaten} &middot; butuh tambahan <strong>${formatNumber(k.gap)}</strong> suara untuk capai target (potensi saat ini ${k.potensi}%).</p>
      </div>
    `,
    )
    .join("");
}

/* =====================================================
   TPS PRIORITAS
   (sintesis dummy: bagi data kecamatan prioritas ke
   beberapa TPS contoh, karena data per-TPS asli belum ada)
===================================================== */

function renderTpsPrioritas() {
  const topKecamatan = [...getFilteredData()]
    .filter((k) => k.gap > 0)
    .sort((a, b) => b.gap - a.gap)
    .slice(0, 5);

  const rows = [];

  topKecamatan.forEach((k) => {
    const sampleTps = Math.min(3, k.tps);

    for (let i = 1; i <= sampleTps; i++) {
      const dptTps = Math.round(k.dpt / k.tps);
      const historisTps = Math.round(k.historis / k.tps);
      const targetTps = Math.round(k.target / k.tps);
      const gapTps = targetTps - historisTps;
      const priority = getPriorityLabel(gapTps * (k.tps / sampleTps));

      rows.push({
        tps: `TPS ${String(i).padStart(3, "0")}`,
        kecamatan: k.nama,
        dpt: dptTps,
        historis: historisTps,
        target: targetTps,
        gap: gapTps,
        priority,
      });
    }
  });

  const tbody = document.getElementById("tpsPrioritasTable");

  if (!rows.length) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align:center;color:var(--text-light);">Tidak ada TPS prioritas pada filter ini.</td></tr>`;
    return;
  }

  tbody.innerHTML = rows
    .map(
      (r) => `
      <tr>
        <td>${r.tps}</td>
        <td>${r.kecamatan}</td>
        <td>${formatNumber(r.dpt)}</td>
        <td>${formatNumber(r.historis)}</td>
        <td>${formatNumber(r.target)}</td>
        <td>${r.gap >= 0 ? "+" : ""}${formatNumber(r.gap)}</td>
        <td><span class="priority-badge ${r.priority.key}">${r.priority.label}</span></td>
      </tr>
    `,
    )
    .join("");
}

/* =====================================================
   SIMULASI: "kalau target naik, gap-nya jadi apa?"
===================================================== */

function populateSimulasiDropdown() {
  const select = document.getElementById("simulasiKecamatan");
  const data = getFilteredData();

  select.innerHTML = data
    .map((k) => `<option value="${k.nama}">${k.nama} (${k.kabupaten})</option>`)
    .join("");

  renderSimulasi();
}

function bindSimulasi() {
  const slider = document.getElementById("simulasiSlider");
  const select = document.getElementById("simulasiKecamatan");

  slider.addEventListener("input", () => {
    document.getElementById("simulasiValueLabel").textContent = formatNumber(
      Number(slider.value),
    );
    renderSimulasi();
  });

  select.addEventListener("change", renderSimulasi);
}

function renderSimulasi() {
  const namaTerpilih = document.getElementById("simulasiKecamatan").value;
  const tambahan = Number(document.getElementById("simulasiSlider").value);

  const kec = kecamatanData.find((k) => k.nama === namaTerpilih);
  const result = document.getElementById("simulasiResult");

  if (!kec) {
    result.innerHTML = "";
    return;
  }

  const historisBaru = kec.historis + tambahan;
  const gapBaru = kec.target - historisBaru;
  const potensiBaru = Math.min(
    999,
    Math.round((historisBaru / kec.target) * 100),
  );
  const statusBaru = getStatus(gapBaru, potensiBaru);

  result.innerHTML = `
    <div class="simulasi-stat">
      <span>Historis Baru</span>
      <strong>${formatNumber(historisBaru)}</strong>
    </div>
    <div class="simulasi-stat">
      <span>Potensi Baru</span>
      <strong>${potensiBaru}%</strong>
    </div>
    <div class="simulasi-stat ${gapBaru >= 0 ? "" : ""}">
      <span>Gap Baru</span>
      <strong>${gapBaru >= 0 ? "+" : ""}${formatNumber(gapBaru)}</strong>
    </div>
    <div class="simulasi-stat status-${statusBaru.key}">
      <span>Status Baru</span>
      <strong>${statusBaru.label}</strong>
    </div>
  `;
}

/* =====================================================
   RESPONSIVE FIX UNTUK LEAFLET
===================================================== */

window.addEventListener("resize", () => {
  if (dashboardMap) dashboardMap.invalidateSize();
});

window.addEventListener("layout:sidebar-changed", () => {
  if (dashboardMap) dashboardMap.invalidateSize();
});
