/**
 * =====================================================
 * POLITICAL INTELLIGENCE 2029
 * Kompetitor Intelligence Module
 * =====================================================
 *
 * CATATAN SUMBER DATA:
 * - KPI, Ranking, Competitor Profile, Chart (Suara 2024 vs
 *   Threshold, Vote Share), Competitive Alert, dan widget
 *   Simulasi Kebutuhan Kursi SEMUANYA memakai data REAL hasil
 *   Pemilu DPR RI 2024 Dapil Kalimantan Timur (studi kasus
 *   simulasi Sainte Lague 2 kursi) - lihat kompetitorList,
 *   kitaInfo, simulasiKursiInfo di bawah. Bagian-bagian ini
 *   TIDAK dipengaruhi filter Kabupaten/Kecamatan karena data
 *   sumbernya memang di level Dapil (provinsi), bukan per
 *   kecamatan.
 * - Peta Kekuatan Kompetitor & panel "Kita vs Kompetitor per
 *   wilayah" MASIH memakai data kecamatan DUMMY/SIMULASI
 *   (di-generate dengan fungsi seeded) karena studi kasus
 *   belum menyediakan breakdown suara per kecamatan/TPS.
 *   Begitu data KPU per kecamatan tersedia, ganti bagian
 *   "GENERATE SUARA KOMPETITOR" di bawah dengan data asli.
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
   DAFTAR KOMPETITOR (REAL - Pemilu DPR RI 2024 Dapil Kaltim)
   -----------------------------------------------------
   Suara 2024 diambil dari studi kasus (hasil rekapitulasi
   Sainte Lague, halaman 11-12 PDF). "kitaInfo" = Partai
   Golkar, satu-satunya partai yang sudah mengamankan 2 kursi
   di dapil ini, dipakai sebagai baseline pembanding.
===================================================== */

const kitaInfo = { nama: "Kita (Partai Golkar)", partai: "GOLKAR", color: "#4f46e5", suara2024: 538147 };

const kompetitorList = [
  { id: "gerindra", nama: "Partai Gerindra", partai: "GERINDRA", color: "#f97316", suara2024: 307259 },
  { id: "pdip", nama: "PDI Perjuangan", partai: "PDIP", color: "#dc2626", suara2024: 252714 },
  { id: "nasdem", nama: "Partai NasDem", partai: "NASDEM", color: "#2563eb", suara2024: 227803 },
  { id: "pks", nama: "PKS", partai: "PKS", color: "#f59e0b", suara2024: 145538 },
  { id: "pkb", nama: "PKB", partai: "PKB", color: "#16a34a", suara2024: 143852 },
  { id: "pan", nama: "PAN", partai: "PAN", color: "#0ea5e9", suara2024: 111141 },
];

const totalSuaraDapilAtas = kitaInfo.suara2024 + kompetitorList.reduce((s, c) => s + c.suara2024, 0);

/* =====================================================
   DATA STUDI KASUS: SIMULASI KEBUTUHAN SUARA 2 KURSI DPR RI
   -----------------------------------------------------
   Sumber: hasil rekapitulasi metode Sainte Lague Pemilu 2024,
   Dapil Kalimantan Timur (8 kursi DPR RI) - diambil dari PDF
   studi kasus halaman 11-12. Data ini REAL (bukan dummy) dan
   berdiri sendiri (dapil-level), tidak terpengaruh filter
   Kabupaten/Kecamatan di atas.
===================================================== */

const simulasiKursiInfo = {
  dapil: "Kalimantan Timur",
  totalKursi: 8,
  metode: "Sainte Lague",
  tahunPemilu: 2024,
  partaiAman: { nama: "Partai Golkar", suara: 538147, kursi: 2 },
  thresholdKursiKe2: 333424,
  kursiTerakhir: { partai: "PAN", suara: 111141, kursiKe: 8 },
};

const simulasiKursiData = [
  {
    id: "gerindra",
    catatan:
      "Pembagi ke-3 berada di 102.419 suara, hanya selisih -8.700 dari kursi terakhir PAN.",
  },
  { id: "pdip", catatan: "Butuh peningkatan sekitar 32% dari capaian Pemilu 2024." },
  { id: "nasdem", catatan: "Butuh peningkatan sekitar 46% dari capaian Pemilu 2024." },
  { id: "pks", catatan: "Butuh kerja ekstra masif, peningkatan >100% dari basis suara 2024." },
  { id: "pkb", catatan: "Butuh kerja ekstra masif, peningkatan >100% dari basis suara 2024." },
  { id: "pan", catatan: "Butuh kerja ekstra masif, peningkatan >200% dari basis suara 2024." },
];

/* =====================================================
   DATA STUDI KASUS 2: INDEKS HARGA KURSI & PROYEKSI 2029
   -----------------------------------------------------
   Sumber: hasil rekapitulasi Sainte Lague Pemilu 2024 Dapil
   Kalimantan Timur (BPP Nominal & Harga Kursi Minimal) serta
   data DPR RI hasil Pemilu 2019 (Rata-rata Suara Individu
   Caleg Terpilih). Data ini REAL (bukan dummy), dapil-level,
   tidak terpengaruh filter Kabupaten/Kecamatan.
===================================================== */

const indeksHargaKursiInfo = {
  totalSuaraSah2024: 2013394,
  totalKursi: 8,
  bppNominal: 251674, // 2.013.394 : 8
  hargaKursiMinimal: 111142, // ditentukan kursi ke-8 (PAN)
  rataRataSuaraCaleg2019: 80647, // 45.242.731 : 561 (data nasional 2019)
  totalSuaraCaleg2019: 45242731,
  totalCalegTerpilih2019: 561,
};

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

/* =====================================================
   AGREGASI PER KOMPETITOR
   -----------------------------------------------------
   `competitors` & `kitaTotal/kitaShare` di sini memakai
   angka REAL (suara2024, tetap/fixed) - tidak dijumlahkan
   dari data kecamatan dummy, dan TIDAK berubah oleh filter
   Kabupaten/Kecamatan (hanya filter Partai yang berlaku).
   `data` (kecamatan) hanya dipakai untuk widget Peta &
   Wilayah Detail yang masih ilustratif.
===================================================== */

function computeAggregates() {
  const data = getFilteredData();

  const competitors = getFilteredCompetitors().map((c) => {
    const kekurangan = simulasiKursiInfo.thresholdKursiKe2 - c.suara2024;
    const pctKenaikan = c.suara2024 ? (kekurangan / c.suara2024) * 100 : 0;
    const voteShare = totalSuaraDapilAtas ? (c.suara2024 / totalSuaraDapilAtas) * 100 : 0;

    return {
      ...c,
      totalSuara: c.suara2024,
      voteShare,
      kekurangan,
      pctKenaikan,
    };
  });

  const voteShareValues = competitors.map((c) => c.voteShare);
  const pctValues = competitors.map((c) => c.pctKenaikan);
  const shareMin = Math.min(...voteShareValues, 0);
  const shareMax = Math.max(...voteShareValues, 1);
  const pctMin = Math.min(...pctValues, 0);
  const pctMax = Math.max(...pctValues, 1);

  competitors.forEach((c) => {
    const shareScore = normalize(c.voteShare, shareMin, shareMax);
    // Makin kecil % kenaikan suara yang dibutuhkan, makin tinggi closenessScore
    const closenessScore = 100 - normalize(c.pctKenaikan, pctMin, pctMax);
    c.strengthScore = Math.round(shareScore * 0.5 + closenessScore * 0.5);
  });

  competitors.sort((a, b) => b.strengthScore - a.strengthScore);

  const kitaTotal = kitaInfo.suara2024;
  const kitaShare = totalSuaraDapilAtas ? (kitaTotal / totalSuaraDapilAtas) * 100 : 0;

  return { data, kitaTotal, kitaShare, competitors };
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
  renderSimulasiKursi();
  renderIndeksHargaKursi();
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
  const gapTerdekat = highestVote ? agg.kitaTotal - highestVote.totalSuara : null;
  const avgShare = agg.competitors.length
    ? agg.competitors.reduce((s, c) => s + c.voteShare, 0) / agg.competitors.length
    : 0;

  const cards = [
    { label: "Total Kompetitor", value: agg.competitors.length, note: "partai terpantau &mdash; Dapil Kaltim" },
    { label: "Kompetitor Utama", value: topCompetitor ? topCompetitor.nama : "-", note: topCompetitor ? "paling berpeluang kursi ke-2" : "" },
    { label: "Suara Tertinggi Kompetitor", value: highestVote ? formatNumber(highestVote.totalSuara) : "-", note: highestVote ? highestVote.nama : "" },
    {
      label: "Selisih Kita vs Terdekat",
      value: gapTerdekat !== null ? formatNumber(Math.abs(gapTerdekat)) : "-",
      note: gapTerdekat === null ? "" : gapTerdekat >= 0 ? "kita masih unggul" : "kompetitor unggul",
    },
    { label: "Average Vote Share Kompetitor", value: formatPercent(avgShare), note: "rata-rata 6 partai kompetitor" },
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

  let statusClass, statusIcon, statusText;
  if (c.pctKenaikan <= 20) {
    statusClass = "down";
    statusIcon = "fa-circle-check";
    statusText = "Paling berpeluang meraih kursi ke-2";
  } else if (c.pctKenaikan <= 100) {
    statusClass = "flat";
    statusIcon = "fa-arrow-trend-up";
    statusText = "Butuh kenaikan suara cukup signifikan";
  } else {
    statusClass = "up";
    statusIcon = "fa-triangle-exclamation";
    statusText = "Butuh kerja ekstra masif untuk kejar kursi ke-2";
  }

  container.innerHTML = `
    <div class="profile-header">
      <div class="profile-avatar" style="background:${c.color}">${c.partai.charAt(0)}</div>
      <div>
        <h4>${c.nama}</h4>
        <small>${c.partai} &bull; Suara 2024 Dapil Kaltim</small>
      </div>
    </div>

    <div class="profile-metrics">
      <div class="profile-metric">
        <span>Total Suara 2024</span>
        <strong>${formatNumber(c.totalSuara)}</strong>
      </div>
      <div class="profile-metric">
        <span>Vote Share</span>
        <strong>${formatPercent(c.voteShare)}</strong>
      </div>
      <div class="profile-metric">
        <span>Kekurangan ke 2 Kursi</span>
        <strong>${formatNumber(c.kekurangan)}</strong>
      </div>
      <div class="profile-metric">
        <span>Kenaikan Dibutuhkan</span>
        <strong>${formatPercent(c.pctKenaikan)}</strong>
      </div>
    </div>

    <div class="profile-trend-label ${statusClass}">
      <i class="fa-solid ${statusIcon}"></i>
      ${statusText}
    </div>
  `;
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

function getKabupatenAggForCompetitor(namaKabupaten, competitorId, namaKecamatan) {
  const list = kecamatanData.filter(
    (k) => k.kabupaten === namaKabupaten && (!namaKecamatan || k.nama === namaKecamatan),
  );
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
  let scopeLabel = "per Kabupaten/Kota";
  if (state.kabupaten && state.kecamatan) scopeLabel = `di ${state.kabupaten} &mdash; ${state.kecamatan}`;
  else if (state.kabupaten) scopeLabel = `di ${state.kabupaten}`;

  document.getElementById("mapCompetitorLabel").innerHTML = c
    ? `Kekuatan ${c.nama} (${c.partai}) ${scopeLabel}`
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

  const kabNames = state.kabupaten ? [state.kabupaten] : Object.keys(kabupatenCenters);
  const shareValues = kabNames.map((n) => getKabupatenAggForCompetitor(n, c.id, state.kecamatan).compShare);
  const breaks = computeBreakpoints(shareValues, 4);

  const polygonLayers = [];

  kabNames.forEach((nama) => {
    const center = kabupatenCenters[nama];
    const kabAgg = getKabupatenAggForCompetitor(nama, c.id, state.kecamatan);
    const bucket = bucketFromBreaks(kabAgg.compShare, breaks, MAP_COLORS, MAP_LABELS);
    const coords = createAreaPolygon(center.lat, center.lng, center.radius);
    const labelWilayah = state.kecamatan ? `${nama} &mdash; ${state.kecamatan}` : nama;

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
      <strong>${labelWilayah}</strong>
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
      renderWilayahDetail(nama, c, state.kecamatan);
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

function renderWilayahDetail(namaKabupaten, c, namaKecamatan) {
  const container = document.getElementById("wilayahDetail");
  const kabAgg = getKabupatenAggForCompetitor(namaKabupaten, c.id, namaKecamatan);
  const gap = kabAgg.kitaSuara - kabAgg.compSuara;
  const gapClass = gap >= 0 ? "positive" : "negative";
  const judul = namaKecamatan ? `${namaKabupaten} &mdash; ${namaKecamatan}` : namaKabupaten;

  container.innerHTML = `
    <div class="wd-header">
      <h4>${judul}</h4>
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

  const sorted = [...agg.competitors].sort((a, b) => b.totalSuara - a.totalSuara);
  const categories = sorted.map((c) => c.nama);
  const values = sorted.map((c) => c.totalSuara);
  const colors = sorted.map((c) => c.color);

  Highcharts.chart(container, {
    chart: { type: "bar" },
    title: { text: null },
    xAxis: { categories },
    yAxis: {
      title: { text: "Suara 2024" },
      plotLines: [
        {
          value: simulasiKursiInfo.thresholdKursiKe2,
          color: "#16a34a",
          width: 2,
          dashStyle: "Dash",
          zIndex: 5,
          label: {
            text: `Threshold 2 Kursi (${formatNumber(simulasiKursiInfo.thresholdKursiKe2)})`,
            style: { color: "#16a34a", fontSize: "11px", fontWeight: "600" },
          },
        },
      ],
    },
    legend: { enabled: false },
    tooltip: {
      formatter: function () {
        return `<strong>${this.x}</strong><br>${formatNumber(this.y)} suara`;
      },
    },
    series: [
      {
        name: "Suara 2024",
        data: values.map((v, i) => ({ y: v, color: colors[i] })),
      },
    ],
  });
}

function renderShareChart(agg) {
  const container = document.getElementById("shareChart");
  if (!container) return;

  const data = [
    { name: kitaInfo.nama, y: agg.kitaShare, color: kitaInfo.color },
    ...agg.competitors.map((c) => ({ name: c.nama, y: c.voteShare, color: c.color })),
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

  // Alert 1: kompetitor paling dekat menembus threshold 2 kursi
  const sortedByKekurangan = [...agg.competitors].sort((a, b) => a.kekurangan - b.kekurangan);
  const closest = sortedByKekurangan[0];
  if (closest) {
    alerts.push({
      priority: closest.pctKenaikan <= 15 ? "high" : "medium",
      icon: "fa-triangle-exclamation",
      title: `${closest.nama} &mdash; Ancaman Kursi ke-2`,
      desc: `Hanya butuh tambahan ${formatNumber(closest.kekurangan)} suara (naik ${formatPercent(closest.pctKenaikan)} dari capaian 2024) untuk menembus threshold 2 kursi (${formatNumber(simulasiKursiInfo.thresholdKursiKe2)} suara).`,
    });
  }

  // Alert 2: berapa banyak kompetitor yang masih butuh kenaikan >100%
  const massive = agg.competitors.filter((c) => c.pctKenaikan >= 100);
  if (massive.length) {
    alerts.push({
      priority: massive.length >= agg.competitors.length - 1 ? "high" : "medium",
      icon: "fa-chart-line",
      title: "Mayoritas Kompetitor Masih Jauh dari Kursi ke-2",
      desc: `${massive.length} dari ${agg.competitors.length} partai kompetitor (${massive.map((c) => c.nama).join(", ")}) butuh kenaikan suara lebih dari 100% dari capaian 2024 untuk mengejar kursi ke-2.`,
    });
  }

  // Alert 3: selisih kita vs kompetitor dengan suara tertinggi
  const highestVote = [...agg.competitors].sort((a, b) => b.totalSuara - a.totalSuara)[0];
  if (highestVote) {
    const gap = agg.kitaTotal - highestVote.totalSuara;
    alerts.push({
      priority: Math.abs(gap) < 50000 ? "high" : "medium",
      icon: "fa-scale-unbalanced",
      title: gap >= 0 ? "Kita Masih Unggul dari Kompetitor Terdekat" : "Kompetitor Terdekat Mengungguli Kita",
      desc: `Selisih ${formatNumber(Math.abs(gap))} suara antara kita (${formatNumber(agg.kitaTotal)}) dan ${highestVote.nama} (${formatNumber(highestVote.totalSuara)}), kompetitor dengan suara tertinggi.`,
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
   6. SIMULASI KEBUTUHAN SUARA 2 KURSI DPR RI
   -----------------------------------------------------
   Menggunakan simulasiKursiInfo & simulasiKursiData (data
   real dari studi kasus, lihat definisi di atas). Bagian
   ini dapil-level, jadi tidak dipanggil ulang oleh
   renderAll() / filter kabupaten-kecamatan.
===================================================== */

function computeSimulasiKursiRows() {
  const rows = simulasiKursiData.map((p) => {
    const partai = kompetitorList.find((c) => c.id === p.id);
    const suara2024 = partai.suara2024;
    const kekurangan = simulasiKursiInfo.thresholdKursiKe2 - suara2024;
    const pctKenaikan = suara2024 ? (kekurangan / suara2024) * 100 : 0;
    return { partai: partai.nama, suara2024, kekurangan, pctKenaikan, catatan: p.catatan };
  });

  // Urutkan dari kekurangan suara paling kecil (paling potensial) ke terbesar
  rows.sort((a, b) => a.kekurangan - b.kekurangan);
  return rows;
}

function renderSimulasiKursi() {
  const tbody = document.getElementById("simulasiKursiTableBody");
  if (!tbody) return;

  const rows = computeSimulasiKursiRows();
  const potensial = rows[0];

  tbody.innerHTML = rows
    .map(
      (p) => `
      <tr>
        <td>
          ${p.partai}
          ${p === potensial ? '<span class="badge-potensial">Paling Potensial</span>' : ""}
        </td>
        <td>${formatNumber(p.suara2024)}</td>
        <td>${formatNumber(simulasiKursiInfo.thresholdKursiKe2)}</td>
        <td>${formatNumber(p.kekurangan)}</td>
        <td>${formatPercent(p.pctKenaikan)}</td>
        <td>${p.catatan}</td>
      </tr>
    `,
    )
    .join("");

  renderSimulasiKursiChart(rows);
}

function renderSimulasiKursiChart(rows) {
  const container = document.getElementById("simulasiKursiChart");
  if (!container) return;

  const minKekurangan = Math.min(...rows.map((r) => r.kekurangan));

  Highcharts.chart(container, {
    chart: { type: "column" },
    title: { text: null },
    xAxis: { categories: rows.map((r) => r.partai) },
    yAxis: { title: { text: "Kekurangan Suara" } },
    legend: { enabled: false },
    tooltip: {
      formatter: function () {
        return `<strong>${this.x}</strong><br>Kekurangan: ${formatNumber(this.y)} suara`;
      },
    },
    series: [
      {
        name: "Kekurangan Suara",
        data: rows.map((r) => ({
          y: r.kekurangan,
          color: r.kekurangan === minKekurangan ? "#16a34a" : "#4f46e5",
        })),
      },
    ],
  });
}

/* =====================================================
   7. INDEKS HARGA KURSI & PROYEKSI 2029
   -----------------------------------------------------
   Menggunakan indeksHargaKursiInfo (studi kasus 2, data
   real) + simulasiKursiInfo/simulasiKursiData (studi kasus 1)
   untuk kolom "Target 2 Kursi (Suara : 3)". Dapil-level,
   tidak dipanggil ulang oleh filter kabupaten/kecamatan.
===================================================== */

function renderIndeksHargaKursi() {
  renderIndeksKpiCards();
  renderIndeksKursiTable();
  renderPosisiBatasKursiChart();
  renderIndeksTrendChart();
}

function renderIndeksKpiCards() {
  const grid = document.getElementById("indeksKpiGrid");
  if (!grid) return;

  const cards = [
    {
      icon: "fa-chart-simple",
      label: "Harga Kursi Rata-rata (BPP Nominal)",
      value: `${formatNumber(indeksHargaKursiInfo.bppNominal)}`,
      note: `Suara/Kursi \u2022 ${formatNumber(indeksHargaKursiInfo.totalSuaraSah2024)} : ${indeksHargaKursiInfo.totalKursi} kursi`,
    },
    {
      icon: "fa-shield-halved",
      label: "Harga Kursi Minimal / Batas Aman Riil",
      value: `${formatNumber(indeksHargaKursiInfo.hargaKursiMinimal)}`,
      note: `Suara \u2022 ditentukan kursi ke-8 (${simulasiKursiInfo.kursiTerakhir.partai})`,
    },
    {
      icon: "fa-user-group",
      label: "Rata-rata Suara Individu Caleg Terpilih",
      value: `${formatNumber(indeksHargaKursiInfo.rataRataSuaraCaleg2019)}`,
      note: `Suara/caleg \u2022 ${formatNumber(indeksHargaKursiInfo.totalSuaraCaleg2019)} : ${indeksHargaKursiInfo.totalCalegTerpilih2019} caleg (2019)`,
    },
    {
      icon: "fa-bullseye",
      label: "Total Suara Sah Pemilu 2024",
      value: `${formatNumber(indeksHargaKursiInfo.totalSuaraSah2024)}`,
      note: `Suara \u2022 Dapil Kalimantan Timur`,
    },
  ];

  grid.innerHTML = cards
    .map(
      (c) => `
      <div class="komp-kpi-card">
        <span><i class="fa-solid ${c.icon}"></i> ${c.label}</span>
        <h2>${c.value}</h2>
        <small>${c.note}</small>
      </div>
    `,
    )
    .join("");
}

function renderIndeksKursiTable() {
  const tbody = document.getElementById("indeksKursiTableBody");
  if (!tbody) return;

  const rows = kompetitorList
    .map((c) => {
      const target2Kursi = c.suara2024 / 3;
      const kekurangan = simulasiKursiInfo.thresholdKursiKe2 - c.suara2024;
      const pctKenaikan = c.suara2024 ? (kekurangan / c.suara2024) * 100 : 0;
      return { ...c, target2Kursi, kekurangan, pctKenaikan };
    })
    .sort((a, b) => a.kekurangan - b.kekurangan);

  tbody.innerHTML = rows
    .map(
      (p) => `
      <tr>
        <td>${p.nama}</td>
        <td>${formatNumber(p.suara2024)}</td>
        <td>${formatNumber(p.target2Kursi)}</td>
        <td>${formatNumber(simulasiKursiInfo.thresholdKursiKe2)}</td>
        <td>${formatNumber(p.kekurangan)}</td>
        <td>${formatPercent(p.pctKenaikan)}</td>
      </tr>
    `,
    )
    .join("");
}

function renderPosisiBatasKursiChart() {
  const container = document.getElementById("posisiBatasKursiChart");
  if (!container) return;

  // Golkar (kita) + 6 kompetitor, diurutkan dari suara tertinggi ke terendah.
  // Party dengan suara TERENDAH (= PAN, kursi ke-8) adalah penentu ambang
  // batas minimal, jadi bar-nya di-highlight beda warna - bukan "kita".
  const allParties = [
    { nama: "Golkar", suara: kitaInfo.suara2024 },
    ...kompetitorList.map((c) => ({ nama: c.nama.replace("Partai ", ""), suara: c.suara2024 })),
  ].sort((a, b) => b.suara - a.suara);

  const minSuara = Math.min(...allParties.map((p) => p.suara));

  Highcharts.chart(container, {
    chart: { type: "column" },
    title: { text: null },
    xAxis: {
      categories: allParties.map((p) =>
        p.suara === minSuara ? `${p.nama}<br><small>(Kursi ke-8)</small>` : p.nama,
      ),
    },
    yAxis: {
      title: { text: "Suara" },
      plotLines: [
        {
          value: indeksHargaKursiInfo.hargaKursiMinimal,
          color: "#dc2626",
          dashStyle: "Dash",
          width: 2,
          zIndex: 5,
          label: {
            text: `Ambang Batas Minimal (Kursi ke-8)<br>${formatNumber(indeksHargaKursiInfo.hargaKursiMinimal)} suara`,
            style: { color: "#dc2626", fontSize: "11px", fontWeight: "600" },
            align: "right",
            x: -5,
          },
        },
      ],
    },
    legend: { enabled: false },
    tooltip: {
      formatter: function () {
        return `<strong>${this.x.replace(/<br>.*/, "")}</strong><br>${formatNumber(this.y)} suara`;
      },
    },
    plotOptions: {
      column: {
        dataLabels: {
          enabled: true,
          formatter: function () {
            return formatNumber(this.y);
          },
          style: { fontSize: "10px", fontWeight: "600" },
        },
      },
    },
    series: [
      {
        name: "Suara 2024",
        data: allParties.map((p) => ({
          y: p.suara,
          color: p.suara === minSuara ? "#3b82f6" : "#1e3a8a",
        })),
      },
    ],
  });
}

function renderIndeksTrendChart() {
  const container = document.getElementById("indeksTrendChart");
  if (!container) return;

  Highcharts.chart(container, {
    chart: { type: "line" },
    title: { text: "Trend Proyeksi Total Suara Sah (Juta Suara)" },
    xAxis: { categories: ["2024", "2029 (Proyeksi)"] },
    yAxis: {
      title: { text: "Juta Suara" },
      min: 1.9,
      max: 2.3,
    },
    legend: { enabled: false },
    tooltip: {
      formatter: function () {
        return `<strong>${this.x}</strong><br>${formatNumber(this.y * 1000000)} suara`;
      },
    },
    series: [
      {
        name: "Total Suara Sah",
        data: [2.013394, 2.21],
        marker: { enabled: true, radius: 5 },
        color: "#4f46e5",
      },
    ],
  });
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