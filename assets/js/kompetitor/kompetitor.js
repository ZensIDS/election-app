/**
 * =====================================================
 * POLITICAL INTELLIGENCE 2029
 * Kompetitor Intelligence Module
 * =====================================================
 *
 * CATATAN:
 * Data kecamatan (dpt/tps/historis/target) identik dengan
 * analisis-wilayah.js / heatmap.js / ai-recommendation.js
 * supaya seluruh modul konsisten. Suara per kompetitor DI
 * BAWAH INI SELURUHNYA DUMMY/SIMULASI (di-generate dengan
 * fungsi seeded supaya konsisten tiap reload, BUKAN data
 * KPU asli) - begitu ada data hasil pemilu sebenarnya per
 * kandidat/TPS, ganti bagian "GENERATE SUARA KOMPETITOR"
 * di bawah dengan data asli.
 *
 * Filter "Pemilu" & "Dapil" belum dibuat karena modul
 * tersebut belum ada datanya (lihat catatan di HTML) -
 * tinggal ditambahkan ke filter bar tanpa mengubah struktur
 * halaman begitu sudah tersedia.
 * =====================================================
 */

/* =====================================================
   DATA DUMMY: KABUPATEN/KOTA & KECAMATAN
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
   DAFTAR KOMPETITOR (dummy)
===================================================== */

const kompetitorList = [
  { id: "A", nama: "Kandidat A", partai: "Partai X", color: "#dc2626" },
  { id: "B", nama: "Kandidat B", partai: "Partai Y", color: "#2563eb" },
  { id: "C", nama: "Kandidat C", partai: "Partai Z", color: "#f59e0b" },
  { id: "D", nama: "Kandidat D", partai: "Partai X", color: "#7c3aed" },
];

/* =====================================================
   HELPERS
===================================================== */

function normalize(value, min, max) {
  if (max === min) return 50;
  return Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));
}

function seededScore(name, min, max) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) % 100000;
  }
  const rand = (hash % 1000) / 1000;
  return min + rand * (max - min);
}

function formatNumber(n) {
  return Math.round(n).toLocaleString("id-ID");
}

function formatPercent(n) {
  return `${n.toFixed(1)}%`;
}

/* =====================================================
   GENERATE SUARA KOMPETITOR (DUMMY)
   -----------------------------------------------------
   Untuk tiap kecamatan: kita sudah punya suara historis
   ("kita"). Sisanya (total suara sah dikurangi suara kita)
   didistribusikan ke 4 kompetitor + "Lainnya" secara
   proporsional memakai bobot seeded per kecamatan supaya
   hasilnya konsisten tiap reload (bukan random murni).
===================================================== */

kecamatanData.forEach((k) => {
  const extraRatio = seededScore(k.nama + "extra", 0.7, 1.5);
  const extraTotal = Math.round(k.historis * extraRatio);

  const weights = kompetitorList.map((c) => seededScore(k.nama + c.id, 15, 100));
  const lainnyaWeight = seededScore(k.nama + "lainnya", 5, 20);
  const totalWeight = weights.reduce((s, w) => s + w, 0) + lainnyaWeight;

  const kandidatVotes = { kita: k.historis };
  let distributed = 0;

  kompetitorList.forEach((c, i) => {
    const votes = Math.round((extraTotal * weights[i]) / totalWeight);
    kandidatVotes[c.id] = votes;
    distributed += votes;
  });

  kandidatVotes.lainnya = Math.max(0, extraTotal - distributed);

  k.kandidatVotes = kandidatVotes;
  k.totalSuaraSah = k.historis + extraTotal;

  // Tentukan pemenang kecamatan ini (siapa suara terbanyak)
  const ranking = Object.entries(kandidatVotes)
    .filter(([id]) => id !== "lainnya")
    .sort((a, b) => b[1] - a[1]);
  k.winner = ranking[0][0];
});

/* =====================================================
   STATE & FILTER
===================================================== */

const state = {
  partai: "",
  kabupaten: "",
  kecamatan: "",
  selectedCompetitor: null,
};

function getFilteredData() {
  return kecamatanData.filter((k) => {
    if (state.kabupaten && k.kabupaten !== state.kabupaten) return false;
    if (state.kecamatan && k.nama !== state.kecamatan) return false;
    return true;
  });
}

function getFilteredCompetitors() {
  return kompetitorList.filter((c) => !state.partai || c.partai === state.partai);
}

/* =====================================================
   AGREGASI PER KOMPETITOR (mengikuti filter aktif)
===================================================== */

function computeAggregates() {
  const data = getFilteredData();
  const totalSuaraSahAll = data.reduce((s, k) => s + k.totalSuaraSah, 0);
  const kitaTotal = data.reduce((s, k) => s + k.historis, 0);
  const kitaShare = totalSuaraSahAll ? (kitaTotal / totalSuaraSahAll) * 100 : 0;
  const kitaDominantCount = data.filter((k) => k.winner === "kita").length;

  const competitors = getFilteredCompetitors().map((c) => {
    const totalSuara = data.reduce((s, k) => s + (k.kandidatVotes[c.id] || 0), 0);
    const voteShare = totalSuaraSahAll ? (totalSuara / totalSuaraSahAll) * 100 : 0;
    const dominantList = data.filter((k) => k.winner === c.id);
    const dominantCount = dominantList.length;

    const topKecamatan = [...data].sort(
      (a, b) => (b.kandidatVotes[c.id] || 0) - (a.kandidatVotes[c.id] || 0),
    )[0];

    const tpsDominan = dominantList.reduce((s, k) => s + k.tps, 0);

    // trend dummy: perubahan vote share dibanding "periode sebelumnya"
    const trendDelta = seededScore(c.id + "trend", -8, 12);

    return {
      ...c,
      totalSuara,
      voteShare,
      dominantCount,
      dominantList,
      topKecamatan,
      tpsDominan,
      trendDelta,
    };
  });

  const voteShareValues = competitors.map((c) => c.voteShare);
  const dominantValues = competitors.map((c) => c.dominantCount);
  const shareMin = Math.min(...voteShareValues, 0);
  const shareMax = Math.max(...voteShareValues, 1);
  const domMin = Math.min(...dominantValues, 0);
  const domMax = Math.max(...dominantValues, 1);

  competitors.forEach((c) => {
    const shareScore = normalize(c.voteShare, shareMin, shareMax);
    const geoScore = normalize(c.dominantCount, domMin, domMax);
    const trendScore = normalize(c.trendDelta, -8, 12);
    c.strengthScore = Math.round(shareScore * 0.5 + geoScore * 0.3 + trendScore * 0.2);
  });

  competitors.sort((a, b) => b.strengthScore - a.strengthScore);

  return { data, totalSuaraSahAll, kitaTotal, kitaShare, kitaDominantCount, competitors };
}

/* =====================================================
   INIT
===================================================== */

document.addEventListener("DOMContentLoaded", () => {
  populateFilters();
  bindFilterEvents();

  const agg = computeAggregates();
  state.selectedCompetitor = agg.competitors[0] ? agg.competitors[0].id : null;

  renderAll();
});

function populateFilters() {
  const partaiSelect = document.getElementById("filterPartai");
  const uniquePartai = [...new Set(kompetitorList.map((c) => c.partai))];
  uniquePartai.forEach((p) => {
    const opt = document.createElement("option");
    opt.value = p;
    opt.textContent = p;
    partaiSelect.appendChild(opt);
  });

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

  const list = state.kabupaten ? kecamatanData.filter((k) => k.kabupaten === state.kabupaten) : [];

  list.forEach((k) => {
    const opt = document.createElement("option");
    opt.value = k.nama;
    opt.textContent = k.nama;
    kecamatanSelect.appendChild(opt);
  });

  kecamatanSelect.disabled = list.length === 0;
}

function bindFilterEvents() {
  document.getElementById("filterPartai").addEventListener("change", (e) => {
    state.partai = e.target.value;
    renderAll();
  });

  document.getElementById("filterKabupaten").addEventListener("change", (e) => {
    state.kabupaten = e.target.value;
    state.kecamatan = "";
    updateKecamatanOptions();
    renderAll();
  });

  document.getElementById("filterKecamatan").addEventListener("change", (e) => {
    state.kecamatan = e.target.value;
    renderAll();
  });

  document.getElementById("resetFilterBtn").addEventListener("click", () => {
    state.partai = "";
    state.kabupaten = "";
    state.kecamatan = "";

    document.getElementById("filterPartai").value = "";
    document.getElementById("filterKabupaten").value = "";
    updateKecamatanOptions();

    renderAll();
  });
}

function renderAll() {
  const agg = computeAggregates();

  if (!agg.competitors.find((c) => c.id === state.selectedCompetitor)) {
    state.selectedCompetitor = agg.competitors[0] ? agg.competitors[0].id : null;
  }

  renderKpi(agg);
  renderRanking(agg);
  renderProfile(agg);
  renderMap(agg);
  renderComparisonCharts(agg);
  renderAlerts(agg);
}

/* =====================================================
   2. KPI KOMPETITOR
===================================================== */

function renderKpi(agg) {
  const topCompetitor = agg.competitors[0];
  const highestVote = [...agg.competitors].sort((a, b) => b.totalSuara - a.totalSuara)[0];
  const wilayahDominanKompetitor = agg.data.length - agg.kitaDominantCount;
  const avgShare = agg.competitors.length
    ? agg.competitors.reduce((s, c) => s + c.voteShare, 0) / agg.competitors.length
    : 0;

  const cards = [
    { label: "Total Kompetitor", value: agg.competitors.length, note: "kandidat terpantau" },
    { label: "Kompetitor Utama", value: topCompetitor ? topCompetitor.nama : "-", note: topCompetitor ? topCompetitor.partai : "" },
    { label: "Suara Tertinggi", value: highestVote ? formatNumber(highestVote.totalSuara) : "-", note: highestVote ? highestVote.nama : "" },
    { label: "Wilayah Dominan Kompetitor", value: wilayahDominanKompetitor, note: `dari ${agg.data.length} kecamatan` },
    { label: "Average Vote Share", value: formatPercent(avgShare), note: "seluruh kompetitor" },
  ];

  document.getElementById("kompKpiGrid").innerHTML = cards
    .map(
      (c) => `
      <div class="komp-kpi-card">
        <span>${c.label}</span>
        <h2>${c.value}</h2>
        <small>${c.note}</small>
      </div>
    `,
    )
    .join("");
}

/* =====================================================
   3. RANKING KOMPETITOR
===================================================== */

function getStrengthColor(score) {
  if (score >= 75) return "#dc2626";
  if (score >= 50) return "#f59e0b";
  return "#16a34a";
}

function renderRanking(agg) {
  const tbody = document.getElementById("rankingTableBody");

  if (!agg.competitors.length) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;color:var(--text-light);">Tidak ada kompetitor pada filter ini.</td></tr>`;
    return;
  }

  tbody.innerHTML = agg.competitors
    .map(
      (c, i) => `
      <tr class="ranking-table-row ${c.id === state.selectedCompetitor ? "selected" : ""}" data-id="${c.id}">
        <td>${i + 1}</td>
        <td>
          <div class="ranking-name-cell">
            <span class="competitor-dot" style="background:${c.color}"></span>
            ${c.nama}
          </div>
        </td>
        <td>${c.partai}</td>
        <td>${formatNumber(c.totalSuara)}</td>
        <td>${formatPercent(c.voteShare)}</td>
        <td><span class="strength-score-pill" style="background:${getStrengthColor(c.strengthScore)}">${c.strengthScore}</span></td>
      </tr>
    `,
    )
    .join("");

  tbody.querySelectorAll(".ranking-table-row").forEach((row) => {
    row.addEventListener("click", () => {
      state.selectedCompetitor = row.dataset.id;
      const newAgg = computeAggregates();
      renderRanking(newAgg);
      renderProfile(newAgg);
      renderMap(newAgg);
    });
  });
}

/* =====================================================
   COMPETITOR PROFILE
===================================================== */

function renderProfile(agg) {
  const container = document.getElementById("competitorProfile");
  const c = agg.competitors.find((x) => x.id === state.selectedCompetitor);

  if (!c) {
    container.innerHTML = `
      <div class="empty-state">
        <i class="fa-solid fa-user-slash"></i>
        <p>Tidak ada kompetitor untuk ditampilkan pada filter ini.</p>
      </div>
    `;
    return;
  }

  const trendUp = c.trendDelta >= 1.5;
  const trendDown = c.trendDelta <= -1.5;
  const trendClass = trendUp ? "up" : trendDown ? "down" : "flat";
  const trendIcon = trendUp ? "fa-arrow-trend-up" : trendDown ? "fa-arrow-trend-down" : "fa-minus";
  const trendText = `${c.trendDelta >= 0 ? "+" : ""}${c.trendDelta.toFixed(1)} poin vote share vs periode sebelumnya`;

  container.innerHTML = `
    <div class="profile-header">
      <div class="profile-avatar" style="background:${c.color}">${c.nama.charAt(c.nama.length - 1)}</div>
      <div>
        <h4>${c.nama}</h4>
        <small>${c.partai}</small>
      </div>
    </div>

    <div class="profile-metrics">
      <div class="profile-metric">
        <span>Total Suara</span>
        <strong>${formatNumber(c.totalSuara)}</strong>
      </div>
      <div class="profile-metric">
        <span>Vote Share</span>
        <strong>${formatPercent(c.voteShare)}</strong>
      </div>
      <div class="profile-metric">
        <span>TPS Dominan</span>
        <strong>${formatNumber(c.tpsDominan)}</strong>
      </div>
      <div class="profile-metric">
        <span>Kecamatan Kuat</span>
        <strong>${c.topKecamatan ? c.topKecamatan.nama : "-"}</strong>
      </div>
    </div>

    <div id="profileTrendChart" class="profile-trend-container"></div>
    <div class="profile-trend-label ${trendClass}">
      <i class="fa-solid ${trendIcon}"></i>
      ${trendText}
    </div>
  `;

  renderTrendSparkline(c);
}

function renderTrendSparkline(c) {
  const container = document.getElementById("profileTrendChart");
  if (!container) return;

  // 5 titik tren dummy yang berakhir konsisten dengan trendDelta saat ini
  const base = c.voteShare - c.trendDelta;
  const points = [0, 1, 2, 3, 4].map((i) => {
    const noise = seededScore(c.id + "trendpoint" + i, -1.5, 1.5);
    return Math.max(0, base + (c.trendDelta * i) / 4 + noise);
  });
  points[4] = c.voteShare;

  Highcharts.chart(container, {
    chart: { type: "spline", backgroundColor: "transparent" },
    title: { text: null },
    xAxis: { visible: false },
    yAxis: { visible: false },
    legend: { enabled: false },
    credits: { enabled: false },
    tooltip: {
      formatter: function () {
        return `Periode ${this.point.index + 1}: ${this.y.toFixed(1)}%`;
      },
    },
    series: [
      {
        name: c.nama,
        data: points,
        color: c.color,
        marker: { enabled: true, radius: 3 },
      },
    ],
  });
}

/* =====================================================
   4. PETA KEKUATAN KOMPETITOR
===================================================== */

let kompMap = null;

function createAreaPolygon(centerLat, centerLng, baseRadius) {
  const sides = 8;
  const points = [];

  for (let i = 0; i < sides; i++) {
    const angle = (i / sides) * Math.PI * 2;
    const radius = baseRadius * (0.72 + Math.sin(i * 2.3) * 0.28);

    const lat = centerLat + radius * Math.cos(angle);
    const lng = centerLng + (radius * Math.sin(angle)) / Math.cos((centerLat * Math.PI) / 180);

    points.push([lat, lng]);
  }

  return points;
}

const MAP_COLORS = ["#fee2e2", "#fca5a5", "#ef4444", "#991b1b"];
const MAP_LABELS = ["Lemah", "Sedang", "Kuat", "Sangat Kuat"];

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
  return breaks;
}

function bucketFromBreaks(value, breaks, colors, labels) {
  for (let i = 0; i < breaks.length; i++) {
    if (value <= breaks[i]) return { color: colors[i], label: labels[i] };
  }
  return { color: colors[colors.length - 1], label: labels[labels.length - 1] };
}

function getKabupatenAggForCompetitor(namaKabupaten, competitorId) {
  const list = kecamatanData.filter((k) => k.kabupaten === namaKabupaten);
  const totalSuaraSah = list.reduce((s, k) => s + k.totalSuaraSah, 0);
  const kitaSuara = list.reduce((s, k) => s + k.historis, 0);
  const compSuara = list.reduce((s, k) => s + (k.kandidatVotes[competitorId] || 0), 0);
  const compShare = totalSuaraSah ? (compSuara / totalSuaraSah) * 100 : 0;
  const kitaShare = totalSuaraSah ? (kitaSuara / totalSuaraSah) * 100 : 0;

  return { totalSuaraSah, kitaSuara, kitaShare, compSuara, compShare };
}

function renderMap(agg) {
  const container = document.getElementById("kompMap");
  if (!container) return;

  const c = agg.competitors.find((x) => x.id === state.selectedCompetitor);
  document.getElementById("mapCompetitorLabel").textContent = c
    ? `Kekuatan ${c.nama} (${c.partai}) per Kabupaten/Kota`
    : "Tidak ada kompetitor dipilih";

  renderMapLegend();

  if (kompMap) {
    kompMap.remove();
    kompMap = null;
  }
  if (!c) return;

  kompMap = L.map("kompMap", { zoomControl: true }).setView([-0.5022, 117.1537], 7);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap Contributors",
  }).addTo(kompMap);

  const kabNames = Object.keys(kabupatenCenters);
  const shareValues = kabNames.map((n) => getKabupatenAggForCompetitor(n, c.id).compShare);
  const breaks = computeBreakpoints(shareValues, 4);

  const polygonLayers = [];

  kabNames.forEach((nama) => {
    const center = kabupatenCenters[nama];
    const kabAgg = getKabupatenAggForCompetitor(nama, c.id);
    const bucket = bucketFromBreaks(kabAgg.compShare, breaks, MAP_COLORS, MAP_LABELS);
    const coords = createAreaPolygon(center.lat, center.lng, center.radius);

    const polygon = L.polygon(coords, {
      color: bucket.color,
      weight: 2,
      opacity: 0.9,
      fillColor: bucket.color,
      fillOpacity: 0.45,
    }).addTo(kompMap);

    polygon.bindTooltip(nama, {
      permanent: true,
      direction: "center",
      className: "map-area-label",
    });

    polygon.bindPopup(`
      <strong>${nama}</strong>
      <hr>
      <b>${c.nama}</b><br>${formatPercent(kabAgg.compShare)} (${formatNumber(kabAgg.compSuara)} suara)
      <br><br>
      <b>Kita</b><br>${formatPercent(kabAgg.kitaShare)} (${formatNumber(kabAgg.kitaSuara)} suara)
      <br><br>
      <em>Klik area untuk detail lengkap &rarr;</em>
    `);

    polygon.on("mouseover", function () {
      this.setStyle({ fillOpacity: 0.65, weight: 3 });
    });

    polygon.on("mouseout", function () {
      this.setStyle({ fillOpacity: 0.45, weight: 2 });
    });

    polygon.on("click", () => {
      renderWilayahDetail(nama, c);
    });

    polygonLayers.push(polygon);
  });

  if (polygonLayers.length) {
    kompMap.fitBounds(L.featureGroup(polygonLayers).getBounds(), { padding: [20, 20], maxZoom: 11 });
  }

  setTimeout(() => {
    if (kompMap) kompMap.invalidateSize();
  }, 250);
}

function renderMapLegend() {
  const container = document.getElementById("mapLegend");
  container.innerHTML = MAP_LABELS.map(
    (label, i) => `
      <div class="legend-row">
        <span class="legend-swatch" style="background:${MAP_COLORS[i]}"></span>
        <div class="legend-text"><strong>${label}</strong></div>
      </div>
    `,
  ).join("");
}

function renderWilayahDetail(namaKabupaten, c) {
  const container = document.getElementById("wilayahDetail");
  const kabAgg = getKabupatenAggForCompetitor(namaKabupaten, c.id);
  const gap = kabAgg.kitaSuara - kabAgg.compSuara;
  const gapClass = gap >= 0 ? "positive" : "negative";

  container.innerHTML = `
    <div class="wd-header">
      <h4>${namaKabupaten}</h4>
    </div>

    <div class="wd-compare-row">
      <div class="wd-compare-name">
        <span class="competitor-dot" style="background:${c.color}"></span>
        ${c.nama}
      </div>
      <div class="wd-compare-values">
        <strong>${formatNumber(kabAgg.compSuara)}</strong>
        <small>${formatPercent(kabAgg.compShare)}</small>
      </div>
    </div>

    <div class="wd-compare-row">
      <div class="wd-compare-name">
        <span class="competitor-dot" style="background:#4f46e5"></span>
        Kita
      </div>
      <div class="wd-compare-values">
        <strong>${formatNumber(kabAgg.kitaSuara)}</strong>
        <small>${formatPercent(kabAgg.kitaShare)}</small>
      </div>
    </div>

    <div class="wd-gap ${gapClass}">
      ${gap >= 0 ? "Unggul" : "Tertinggal"} ${formatNumber(Math.abs(gap))} suara
    </div>
  `;
}

/* =====================================================
   5. KITA VS KOMPETITOR
===================================================== */

function renderComparisonCharts(agg) {
  renderSuaraChart(agg);
  renderShareChart(agg);
}

function renderSuaraChart(agg) {
  const container = document.getElementById("suaraChart");
  if (!container) return;

  const categories = ["Kita", ...agg.competitors.map((c) => c.nama)];
  const values = [agg.kitaTotal, ...agg.competitors.map((c) => c.totalSuara)];
  const colors = ["#4f46e5", ...agg.competitors.map((c) => c.color)];

  Highcharts.chart(container, {
    chart: { type: "bar" },
    title: { text: null },
    xAxis: { categories },
    yAxis: { title: { text: "Suara" } },
    legend: { enabled: false },
    tooltip: {
      formatter: function () {
        return `<strong>${this.x}</strong><br>${formatNumber(this.y)} suara`;
      },
    },
    series: [
      {
        name: "Suara",
        data: values.map((v, i) => ({ y: v, color: colors[i] })),
      },
    ],
  });
}

function renderShareChart(agg) {
  const container = document.getElementById("shareChart");
  if (!container) return;

  const lainnyaShare = Math.max(
    0,
    100 - agg.kitaShare - agg.competitors.reduce((s, c) => s + c.voteShare, 0),
  );

  const data = [
    { name: "Kita", y: agg.kitaShare, color: "#4f46e5" },
    ...agg.competitors.map((c) => ({ name: c.nama, y: c.voteShare, color: c.color })),
    { name: "Lainnya", y: lainnyaShare, color: "#d1d5db" },
  ];

  Highcharts.chart(container, {
    chart: { type: "pie" },
    title: { text: null },
    legend: { enabled: true },
    tooltip: {
      pointFormat: "{point.y:.1f}%",
    },
    plotOptions: {
      pie: {
        innerSize: "60%",
        dataLabels: { enabled: true, format: "{point.name}: {point.y:.1f}%" },
      },
    },
    series: [{ name: "Vote Share", data }],
  });
}

/* =====================================================
   COMPETITIVE ALERT
===================================================== */

function renderAlerts(agg) {
  const container = document.getElementById("alertList");
  const alerts = [];

  // Alert 1: kompetitor dengan tren menguat signifikan
  agg.competitors
    .filter((c) => c.trendDelta >= 4)
    .sort((a, b) => b.trendDelta - a.trendDelta)
    .slice(0, 2)
    .forEach((c) => {
      alerts.push({
        priority: c.trendDelta >= 8 ? "high" : "medium",
        icon: "fa-arrow-trend-up",
        title: `${c.nama} &mdash; Dominasi Meningkat`,
        desc: `Vote share ${c.nama} naik ${c.trendDelta.toFixed(1)} poin dibanding periode sebelumnya, terkuat di ${c.topKecamatan ? c.topKecamatan.nama : "-"}.`,
      });
    });

  // Alert 2: gap terbesar kita vs kompetitor di satu kecamatan
  let biggestGap = null;
  agg.data.forEach((k) => {
    agg.competitors.forEach((c) => {
      const compVotes = k.kandidatVotes[c.id] || 0;
      const gap = compVotes - k.historis;
      if (gap > 0 && (!biggestGap || gap > biggestGap.gap)) {
        biggestGap = { gap, kecamatan: k.nama, competitor: c };
      }
    });
  });

  if (biggestGap) {
    alerts.push({
      priority: biggestGap.gap >= 8000 ? "high" : "medium",
      icon: "fa-scale-unbalanced",
      title: "Competitive Gap Terbesar",
      desc: `Kita tertinggal ${formatNumber(biggestGap.gap)} suara dari ${biggestGap.competitor.nama} di ${biggestGap.kecamatan}.`,
    });
  }

  // Alert 3: kompetitor dengan basis geografis luas (banyak kecamatan dominan)
  const geoStrong = [...agg.competitors].sort((a, b) => b.dominantCount - a.dominantCount)[0];
  if (geoStrong && geoStrong.dominantCount > 0) {
    alerts.push({
      priority: geoStrong.dominantCount >= 4 ? "high" : "medium",
      icon: "fa-map",
      title: `${geoStrong.nama} &mdash; Basis Wilayah Luas`,
      desc: `Unggul di ${geoStrong.dominantCount} dari ${agg.data.length} kecamatan yang dianalisis &mdash; perlu strategi khusus di wilayah tersebut.`,
    });
  }

  if (!alerts.length) {
    container.innerHTML = `<p style="color:var(--text-light);">Tidak ada alert pada filter ini.</p>`;
    return;
  }

  const priorityRank = { high: 0, medium: 1 };
  alerts.sort((a, b) => priorityRank[a.priority] - priorityRank[b.priority]);

  container.innerHTML = alerts
    .map(
      (a) => `
      <div class="alert-card priority-${a.priority}">
        <div class="alert-icon"><i class="fa-solid ${a.icon}"></i></div>
        <div class="alert-body">
          <h4>${a.title}</h4>
          <p>${a.desc}</p>
        </div>
        <span class="alert-priority-tag">${a.priority === "high" ? "High" : "Medium"}</span>
      </div>
    `,
    )
    .join("");
}

/* =====================================================
   RESPONSIVE FIX UNTUK LEAFLET
===================================================== */

window.addEventListener("resize", () => {
  if (kompMap) kompMap.invalidateSize();
});

window.addEventListener("layout:sidebar-changed", () => {
  if (kompMap) kompMap.invalidateSize();
});