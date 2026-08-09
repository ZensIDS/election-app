/**
 * =====================================================
 * POLITICAL INTELLIGENCE 2029
 * Simulasi Menang - Simulation Engine
 * =====================================================
 *
 * CATATAN:
 * Data di bawah DUMMY untuk demo/prototype (mewakili
 * "Dapil Kaltim 1": Samarinda, Kutai Kartanegara,
 * Kutai Timur, Bontang). Semua perhitungan reaktif -
 * ubah parameter di UI, semua section di halaman ini
 * (hasil simulasi, distribusi, scenario, what-if,
 * victory map, rekomendasi) hitung ulang otomatis
 * tanpa reload halaman.
 * =====================================================
 */

/* =====================================================
   DATA DUMMY: KECAMATAN DALAM DAPIL
   current = perolehan suara saat ini/baseline
   dpt     = daftar pemilih tetap (potensi maksimum)
===================================================== */

const kecamatanData = [
  { kabupaten: "Samarinda", nama: "Samarinda Ulu", current: 8200, dpt: 45000, lat: -0.52, lng: 117.13 },
  { kabupaten: "Samarinda", nama: "Samarinda Ilir", current: 6100, dpt: 32000, lat: -0.49, lng: 117.17 },
  { kabupaten: "Samarinda", nama: "Samarinda Utara", current: 9400, dpt: 51000, lat: -0.46, lng: 117.15 },

  { kabupaten: "Kutai Kartanegara", nama: "Tenggarong", current: 7100, dpt: 38000, lat: -0.4, lng: 116.99 },
  { kabupaten: "Kutai Kartanegara", nama: "Tenggarong Seberang", current: 4800, dpt: 26000, lat: -0.44, lng: 117.02 },
  { kabupaten: "Kutai Kartanegara", nama: "Loa Janan", current: 3600, dpt: 19000, lat: -0.58, lng: 117.08 },

  { kabupaten: "Kutai Timur", nama: "Sangatta Utara", current: 6300, dpt: 33000, lat: 0.5, lng: 117.57 },
  { kabupaten: "Kutai Timur", nama: "Sangatta Selatan", current: 4900, dpt: 24000, lat: 0.47, lng: 117.6 },
  { kabupaten: "Kutai Timur", nama: "Bengalon", current: 2200, dpt: 14000, lat: 0.6, lng: 117.5 },

  { kabupaten: "Bontang", nama: "Bontang Utara", current: 6800, dpt: 29000, lat: 0.16, lng: 117.48 },
  { kabupaten: "Bontang", nama: "Bontang Selatan", current: 5900, dpt: 25000, lat: 0.1, lng: 117.5 },
  { kabupaten: "Bontang", nama: "Bontang Barat", current: 4500, dpt: 18000, lat: 0.13, lng: 117.44 },
];

const baseCurrent = kecamatanData.reduce((s, k) => s + k.current, 0);
const BASELINE_TURNOUT = 75; // % turnout basis data historis

const SCENARIO_MULTIPLIER = {
  conservative: 1.04,
  moderate: 1.15,
  aggressive: 1.27,
};

const SCENARIO_LABEL = {
  conservative: "Conservative",
  moderate: "Moderate",
  aggressive: "Aggressive",
};

/* =====================================================
   STATE
===================================================== */

const state = {
  target: 85000,
  turnout: 82,
  skenario: "moderate",
  whatifAdditions: {}, // { namaKecamatan: tambahanSuara }
  whatifTurnoutDelta: 0,
  selectedVictoryArea: null,
};

let victoryMapInstance = null;
let distribusiChartInstance = null;
let scenarioChartInstance = null;

/* =====================================================
   HELPERS
===================================================== */

function formatNumber(n) {
  return Math.round(n).toLocaleString("id-ID");
}

function turnoutFactor(turnout) {
  return turnout / BASELINE_TURNOUT;
}

function estimasiFromScenario(skenarioKey, turnout) {
  return baseCurrent * SCENARIO_MULTIPLIER[skenarioKey] * turnoutFactor(turnout);
}

/* =====================================================
   DISTRIBUSI TARGET (weighted: current + untapped DPT)
===================================================== */

function computeDistribusi(target) {
  const weights = kecamatanData.map((k) => k.current * 0.6 + (k.dpt - k.current) * 0.4);
  const totalWeight = weights.reduce((s, w) => s + w, 0);

  return kecamatanData.map((k, i) => {
    const share = weights[i] / totalWeight;
    const targetBagian = Math.round(target * share);
    const gap = targetBagian - k.current;
    const kontribusi = (targetBagian / target) * 100;

    return { ...k, targetBagian, gap, kontribusi };
  });
}

/* =====================================================
   INIT
===================================================== */

document.addEventListener("DOMContentLoaded", () => {
  buildWhatifControls();
  bindEvents();
  renderAll();
});

function bindEvents() {
  const targetInput = document.getElementById("paramTarget");
  const turnoutInput = document.getElementById("paramTurnout");
  const skenarioInput = document.getElementById("paramSkenario");
  const runBtn = document.getElementById("btnRunSimulasi");
  const whatifTurnout = document.getElementById("whatifTurnout");

  targetInput.addEventListener("input", () => {
    state.target = Number(targetInput.value) || 0;
    renderAll();
  });

  turnoutInput.addEventListener("input", () => {
    state.turnout = Number(turnoutInput.value);
    document.getElementById("paramTurnoutLabel").textContent = state.turnout + "%";
    renderAll();
  });

  skenarioInput.addEventListener("change", () => {
    state.skenario = skenarioInput.value;
    renderAll();
  });

  runBtn.addEventListener("click", () => {
    renderAll();
    document
      .getElementById("hasilSimulasiGrid")
      .scrollIntoView({ behavior: "smooth", block: "center" });
  });

  whatifTurnout.addEventListener("input", () => {
    state.whatifTurnoutDelta = Number(whatifTurnout.value);
    document.getElementById("whatifTurnoutLabel").textContent =
      "+" + state.whatifTurnoutDelta + "%";
    renderWhatif();
  });
}

/* =====================================================
   RENDER ALL
===================================================== */

function renderAll() {
  renderHasilSimulasi();
  renderDistribusi();
  renderScenarioComparison();
  renderWhatif();
  renderVictoryMap();
  renderRecommendation();
}

/* =====================================================
   2. HASIL SIMULASI
===================================================== */

function renderHasilSimulasi() {
  const estimasi = estimasiFromScenario(state.skenario, state.turnout);
  const gap = state.target - estimasi;
  const menang = estimasi >= state.target;

  const grid = document.getElementById("hasilSimulasiGrid");

  grid.innerHTML = `
    <div class="hasil-card">
      <span><i class="fa-solid fa-bullseye"></i> Target Suara</span>
      <h2>${formatNumber(state.target)}</h2>
    </div>

    <div class="hasil-card">
      <span><i class="fa-solid fa-chart-line"></i> Estimasi Suara</span>
      <h2>${formatNumber(estimasi)}</h2>
    </div>

    <div class="hasil-card gap-card ${gap > 0 ? "status-belum" : "status-menang"}">
      <span><i class="fa-solid fa-arrows-left-right"></i> Gap</span>
      <h2>${gap > 0 ? "-" : "+"}${formatNumber(Math.abs(gap))}</h2>
    </div>

    <div class="hasil-card status-card ${menang ? "menang" : "belum"}">
      <span><i class="fa-solid fa-flag-checkered"></i> Status</span>
      <h2>${menang ? "🟢 MENANG" : "🔴 BELUM MENANG"}</h2>
    </div>
  `;
}

/* =====================================================
   3. DISTRIBUSI TARGET
===================================================== */

function renderDistribusi() {
  const data = [...computeDistribusi(state.target)].sort(
    (a, b) => b.targetBagian - a.targetBagian,
  );

  document.getElementById("distribusiSubtitle").textContent =
    `${formatNumber(state.target)} suara harus dicari dari 12 kecamatan di dapil ini`;

  const container = document.getElementById("distribusiChart");

  distribusiChartInstance = Highcharts.chart(container, {
    chart: { type: "bar" },
    title: { text: null },
    xAxis: { categories: data.map((k) => k.nama) },
    yAxis: { title: { text: null } },
    legend: { enabled: true },
    tooltip: { shared: true },
    series: [
      { name: "Current", data: data.map((k) => k.current), color: "#6366f1" },
      { name: "Target Bagian", data: data.map((k) => k.targetBagian), color: "#ec4899" },
    ],
  });

  const tbody = document.getElementById("distribusiTable");

  tbody.innerHTML = data
    .map((k) => {
      const gapClass = k.gap > 0 ? "positive" : "negative";
      const gapLabel = (k.gap > 0 ? "+" : "") + formatNumber(k.gap);

      return `
        <tr>
          <td>${k.nama}<br><small style="color:var(--text-light);">${k.kabupaten}</small></td>
          <td>${formatNumber(k.current)}</td>
          <td>${formatNumber(k.targetBagian)}</td>
          <td class="gap-cell ${gapClass}">${gapLabel}</td>
          <td>${k.kontribusi.toFixed(1)}%</td>
        </tr>
      `;
    })
    .join("");
}

/* =====================================================
   4. SCENARIO COMPARISON
===================================================== */

function renderScenarioComparison() {
  const keys = ["conservative", "moderate", "aggressive"];
  const values = keys.map((k) => estimasiFromScenario(k, state.turnout));

  const container = document.getElementById("scenarioChart");

  scenarioChartInstance = Highcharts.chart(container, {
    chart: { type: "column" },
    title: { text: null },
    xAxis: { categories: keys.map((k) => SCENARIO_LABEL[k]) },
    yAxis: {
      title: { text: null },
      plotLines: [
        {
          value: state.target,
          color: "#111827",
          dashStyle: "dash",
          width: 2,
          label: { text: "Target" },
        },
      ],
    },
    legend: { enabled: false },
    series: [
      {
        name: "Estimasi Suara",
        data: values.map((v, i) => ({
          y: Math.round(v),
          color: keys[i] === state.skenario ? "#4f46e5" : "#c7d2fe",
        })),
      },
    ],
  });

  const cardsContainer = document.getElementById("scenarioCards");

  cardsContainer.innerHTML = keys
    .map((key, i) => {
      const val = values[i];
      const menang = val >= state.target;
      const growthPct = Math.round((SCENARIO_MULTIPLIER[key] - 1) * 100);

      return `
        <div class="scenario-card">
          <div>
            <h4>${SCENARIO_LABEL[key]}</h4>
            <small>Pertumbuhan suara +${growthPct}%</small>
            <div><span class="scenario-badge ${menang ? "menang" : "belum"}">${menang ? "MENANG" : "BELUM MENANG"}</span></div>
          </div>
          <div class="scenario-value">
            <strong>${formatNumber(val)}</strong>
            <small>estimasi</small>
          </div>
        </div>
      `;
    })
    .join("");
}

/* =====================================================
   5. WHAT-IF ANALYSIS
===================================================== */

function buildWhatifControls() {
  // Ambil 4 kecamatan dengan current suara terbesar sebagai kandidat what-if
  const topKecamatan = [...kecamatanData]
    .sort((a, b) => b.current - a.current)
    .slice(0, 4);

  const container = document.getElementById("whatifControls");

  container.innerHTML = topKecamatan
    .map(
      (k) => `
      <div class="whatif-item">
        <label>
          ${k.nama}
          <strong id="whatifLabel-${slug(k.nama)}">+0</strong>
        </label>
        <input
          type="range"
          min="0"
          max="10000"
          step="250"
          value="0"
          data-nama="${k.nama}"
          class="whatif-slider"
        />
      </div>
    `,
    )
    .join("");

  container.querySelectorAll(".whatif-slider").forEach((slider) => {
    slider.addEventListener("input", () => {
      const nama = slider.dataset.nama;
      const val = Number(slider.value);

      state.whatifAdditions[nama] = val;
      document.getElementById(`whatifLabel-${slug(nama)}`).textContent =
        "+" + formatNumber(val);

      renderWhatif();
    });
  });
}

function slug(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

function renderWhatif() {
  const totalTambahan = Object.values(state.whatifAdditions).reduce(
    (s, v) => s + v,
    0,
  );

  const turnoutBoostFactor = 1 + state.whatifTurnoutDelta / 100;
  const total = Math.round((baseCurrent + totalTambahan) * turnoutBoostFactor);

  const margin = total - state.target;
  const menang = total >= state.target;

  const rows = Object.entries(state.whatifAdditions)
    .filter(([, v]) => v > 0)
    .map(
      ([nama, v]) => `
        <div class="row">
          <span>${nama}</span>
          <strong>+${formatNumber(v)}</strong>
        </div>
      `,
    )
    .join("");

  const result = document.getElementById("whatifResult");

  result.innerHTML = `
    <div class="row">
      <span>Sebelumnya (baseline)</span>
      <strong>${formatNumber(baseCurrent)}</strong>
    </div>

    ${rows || `<div class="row"><span style="color:var(--text-light);">Belum ada tambahan wilayah</span></div>`}

    ${
      state.whatifTurnoutDelta > 0
        ? `<div class="row"><span>Boost turnout +${state.whatifTurnoutDelta}%</span><strong>&times;${turnoutBoostFactor.toFixed(2)}</strong></div>`
        : ""
    }

    <div class="row total">
      <span>Total Proyeksi</span>
      <strong>${formatNumber(total)}</strong>
    </div>

    <div class="row">
      <span>Target</span>
      <strong>${formatNumber(state.target)}</strong>
    </div>

    <div class="row margin">
      <span>Margin</span>
      <strong class="${margin >= 0 ? "positive" : "negative"}">
        ${margin >= 0 ? "+" : ""}${formatNumber(margin)}
      </strong>
    </div>

    <div class="whatif-status ${menang ? "menang" : "belum"}">
      ${menang ? "🟢 MENANG" : "🔴 BELUM MENANG"}
    </div>
  `;
}

/* =====================================================
   6. VICTORY MAP
===================================================== */

function createAreaPolygon(centerLat, centerLng, baseRadius = 0.045) {
  const sides = 8;
  const points = [];

  for (let i = 0; i < sides; i++) {
    const angle = (i / sides) * Math.PI * 2;
    const radius = baseRadius * (0.72 + Math.sin(i * 2.3) * 0.28);

    const lat = centerLat + radius * Math.cos(angle);
    const lng =
      centerLng + (radius * Math.sin(angle)) / Math.cos((centerLat * Math.PI) / 180);

    points.push([lat, lng]);
  }

  return points;
}

function getVictoryColor(current, targetBagian) {
  if (current >= targetBagian) return "#16a34a"; // tercapai
  const ratio = current / targetBagian;
  if (ratio >= 0.7) return "#f59e0b"; // masih butuh tambahan
  return "#ef4444"; // gap besar
}

function renderVictoryMap() {
  const container = document.getElementById("victoryMap");
  if (!container) return;

  if (victoryMapInstance) {
    victoryMapInstance.remove();
    victoryMapInstance = null;
  }

  victoryMapInstance = L.map("victoryMap", { zoomControl: true }).setView(
    [-0.1, 117.1],
    8,
  );

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap Contributors",
  }).addTo(victoryMapInstance);

  const data = computeDistribusi(state.target);
  const polygonLayers = [];

  data.forEach((k) => {
    const color = getVictoryColor(k.current, k.targetBagian);
    const coords = createAreaPolygon(k.lat, k.lng);

    const polygon = L.polygon(coords, {
      color,
      weight: 2,
      opacity: 0.9,
      fillColor: color,
      fillOpacity: 0.4,
    }).addTo(victoryMapInstance);

    polygon.bindTooltip(k.nama, {
      permanent: true,
      direction: "center",
      className: "map-area-label",
    });

    polygon.on("click", () => {
      state.selectedVictoryArea = k.nama;
      renderVictoryDetail(k);
    });

    polygon.on("mouseover", function () {
      this.setStyle({ fillOpacity: 0.6, weight: 3 });
    });

    polygon.on("mouseout", function () {
      this.setStyle({ fillOpacity: 0.4, weight: 2 });
    });

    polygonLayers.push(polygon);
  });

  if (polygonLayers.length) {
    victoryMapInstance.fitBounds(L.featureGroup(polygonLayers).getBounds(), {
      padding: [20, 20],
      maxZoom: 11,
    });
  }

  const legend = L.control({ position: "bottomright" });

  legend.onAdd = function () {
    const div = L.DomUtil.create("div", "map-legend");
    div.innerHTML = `
      <h4>Status Target</h4>
      <div><span style="color:#16a34a;">■</span> Tercapai</div>
      <div><span style="color:#f59e0b;">■</span> Butuh Tambahan</div>
      <div><span style="color:#ef4444;">■</span> Gap Besar</div>
    `;
    return div;
  };

  legend.addTo(victoryMapInstance);

  setTimeout(() => {
    if (victoryMapInstance) victoryMapInstance.invalidateSize();
  }, 250);

  // Re-render detail panel kalau ada area yang sudah dipilih sebelumnya
  if (state.selectedVictoryArea) {
    const selected = data.find((k) => k.nama === state.selectedVictoryArea);
    if (selected) renderVictoryDetail(selected);
  }
}

function renderVictoryDetail(k) {
  const detail = document.getElementById("victoryDetail");

  detail.innerHTML = `
    <h4>${k.nama.toUpperCase()}</h4>
    <div class="vd-row"><span>Target</span><strong>${formatNumber(k.targetBagian)}</strong></div>
    <div class="vd-row"><span>Current</span><strong>${formatNumber(k.current)}</strong></div>
    <div class="vd-row"><span>Gap</span><strong>${k.gap > 0 ? "+" : ""}${formatNumber(k.gap)}</strong></div>
    <div class="vd-row"><span>Kontribusi terhadap target kemenangan</span><strong>${k.kontribusi.toFixed(1)}%</strong></div>
  `;
}

/* =====================================================
   7. ACTION RECOMMENDATION
===================================================== */

function renderRecommendation() {
  const estimasi = estimasiFromScenario(state.skenario, state.turnout);
  const gapTotal = state.target - estimasi;

  const summary = document.getElementById("recommendationSummary");

  summary.innerHTML = `
    Target kemenangan: <strong>${formatNumber(state.target)}</strong><br>
    Current projection (skenario ${SCENARIO_LABEL[state.skenario]}): <strong>${formatNumber(estimasi)}</strong><br>
    Gap: <strong>${gapTotal > 0 ? formatNumber(gapTotal) : "0 (sudah tercapai)"}</strong> suara
  `;

  const data = computeDistribusi(state.target)
    .filter((k) => k.gap > 0)
    .sort((a, b) => b.gap - a.gap)
    .slice(0, 4);

  const list = document.getElementById("recommendationList");

  if (!data.length) {
    list.innerHTML = `<p style="color:var(--text-light);">Semua wilayah pada distribusi target ini sudah tercapai. 🎉</p>`;
    return;
  }

  list.innerHTML = data
    .map(
      (k, i) => `
      <div class="recommendation-card">
        <div class="recommendation-rank">${i + 1}</div>
        <div>
          <h4>${k.nama}</h4>
          <span>Tambahan +${formatNumber(k.gap)}</span>
        </div>
      </div>
    `,
    )
    .join("");
}

/* =====================================================
   RESPONSIVE FIX UNTUK LEAFLET
===================================================== */

window.addEventListener("resize", () => {
  if (victoryMapInstance) victoryMapInstance.invalidateSize();
});

window.addEventListener("layout:sidebar-changed", () => {
  if (victoryMapInstance) victoryMapInstance.invalidateSize();
});