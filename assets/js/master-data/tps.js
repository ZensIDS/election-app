/**
 * =====================================================
 * POLITICAL INTELLIGENCE 2029
 * Data TPS - Fondasi Analisis Mikro
 * =====================================================
 *
 * CATATAN:
 * Data Kabupaten/Kecamatan/Desa identik dengan modul lain
 * (wilayah, dapil) supaya seluruh aplikasi konsisten - lihat
 * generateDesaDanTps() yang polanya sama persis dengan
 * wilayah.js. Field mikro tambahan (L/P, suara historis,
 * Intelligence Score, klasifikasi) DI-GENERATE SEEDED di
 * atasnya - SEMUA DUMMY, bukan data KPU asli.
 *
 * CRUD (Tambah TPS) hanya in-memory (state JS), sama seperti
 * Data Wilayah & Data Dapil. Tombol "Import TPS" belum
 * terhubung ke modul Import Data (menu itu sendiri belum
 * dibangun) - saat ini hanya menampilkan pemberitahuan.
 * =====================================================
 */

/* =====================================================
   DATA DASAR: KABUPATEN, KECAMATAN (identik modul lain)
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

const kabupatenBase = [
  { nama: "Samarinda", kode: "64.72" },
  { nama: "Balikpapan", kode: "64.71" },
  { nama: "Bontang", kode: "64.74" },
  { nama: "Kutai Kartanegara", kode: "64.02" },
  { nama: "Kutai Timur", kode: "64.09" },
  { nama: "Kutai Barat", kode: "64.01" },
  { nama: "Paser", kode: "64.03" },
  { nama: "Penajam Paser Utara", kode: "64.10" },
];

const kabupatenData = kabupatenBase.map((k, i) => ({ id: `kab-${i + 1}`, kode: k.kode, nama: k.nama }));

function findKodeKabupaten(nama) {
  const k = kabupatenBase.find((x) => x.nama === nama);
  return k ? k.kode : "64.00";
}
function findKabupatenIdByNama(nama) {
  const k = kabupatenData.find((x) => x.nama === nama);
  return k ? k.id : null;
}

// Dapil (disederhanakan dari modul Data Dapil - 2 dapil DPR RI utama)
const KABUPATEN_TO_DAPIL = {
  Samarinda: "Kalimantan Timur 1",
  "Kutai Kartanegara": "Kalimantan Timur 1",
  "Kutai Timur": "Kalimantan Timur 1",
  Bontang: "Kalimantan Timur 1",
  Balikpapan: "Kalimantan Timur 2",
  "Penajam Paser Utara": "Kalimantan Timur 2",
  Paser: "Kalimantan Timur 2",
  "Kutai Barat": "Kalimantan Timur 2",
};

const kecamatanBase = [
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

const kecamatanData = kecamatanBase.map((k, i) => ({
  id: `kec-${i + 1}`,
  kode: `${findKodeKabupaten(k.kabupaten)}.${String(i + 1).padStart(2, "0")}`,
  nama: k.nama,
  kabupatenId: findKabupatenIdByNama(k.kabupaten),
  dpt: k.dpt,
  tps: k.tps,
  historis: k.historis,
  target: k.target,
}));

/* =====================================================
   HELPERS
===================================================== */

function formatNumber(n) {
  return Math.round(n).toLocaleString("id-ID");
}

function seededScore(name, min, max) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) % 100000;
  }
  const rand = (hash % 1000) / 1000;
  return min + rand * (max - min);
}

function splitInteger(total, parts, seedBase) {
  if (parts <= 1) return [total];
  const weights = [];
  for (let i = 0; i < parts; i++) weights.push(seededScore(seedBase + i, 40, 100));
  const sumW = weights.reduce((a, b) => a + b, 0);
  const allocated = weights.map((w) => Math.max(1, Math.round((w / sumW) * total)));
  const diff = total - allocated.reduce((a, b) => a + b, 0);
  allocated[allocated.length - 1] = Math.max(1, allocated[allocated.length - 1] + diff);
  return allocated;
}

function normalize(value, min, max) {
  if (max === min) return 50;
  return Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));
}

function getLevel(score) {
  if (score >= 66) return { key: "tinggi", label: "Tinggi" };
  if (score >= 33) return { key: "sedang", label: "Sedang" };
  return { key: "rendah", label: "Rendah" };
}

/* =====================================================
   GENERATE DESA & TPS + FIELD MIKRO
===================================================== */

const NAMA_DESA_POOL = [
  "Sidodadi", "Sempaja", "Loa Bakung", "Sungai Dama", "Air Putih",
  "Simpang Tiga", "Bukit Indah", "Karang Asam", "Loa Buah", "Sungai Pinang",
  "Rapak Dalam", "Muara Rapak", "Gunung Bahagia", "Damai Baru", "Damai Bahagia",
  "Sepinggan", "Karang Joang", "Batu Ampar", "Gunung Samarinda", "Telaga Sari",
  "Bontang Baru", "Api-Api", "Guntung", "Loktuan", "Berbas Tengah",
  "Tanjung Laut", "Timbau", "Mangkurawang", "Loa Ipuh", "Jahab",
  "Sangkima", "Swarga Bara", "Singa Geweh", "Teluk Lingga", "Sepaso",
  "Linggang Bigung", "Tering", "Barong Tongkok", "Ombau Asa", "Muara Bunyut",
  "Tanjung Aru", "Rangan", "Kerang Dayo", "Suatang", "Padang Pengrapat",
  "Sotek", "Nenang", "Girimukti", "Semoi Dua", "Argo Mulyo",
];

const desaData = [];
const tpsData = [];

function scatterPoint(centerLat, centerLng, radius, seedName) {
  const angle = seededScore(seedName + "angle", 0, Math.PI * 2);
  const r = radius * Math.sqrt(seededScore(seedName + "r", 0, 1));
  const lat = centerLat + r * Math.cos(angle);
  const lng = centerLng + (r * Math.sin(angle)) / Math.cos((centerLat * Math.PI) / 180);
  return { lat, lng };
}

function generateDesaDanTps() {
  let desaSeq = 1;
  let tpsSeq = 1;

  kecamatanData.forEach((kec) => {
    const kab = kabupatenData.find((k) => k.id === kec.kabupatenId);
    const center = kabupatenCenters[kab.nama];
    const desaCount = Math.min(6, Math.max(3, Math.round(kec.tps / 55)));

    const tpsSplits = splitInteger(kec.tps, desaCount, kec.nama + "tps");
    const dptSplits = splitInteger(kec.dpt, desaCount, kec.nama + "dpt");
    const targetSplits = splitInteger(kec.target, desaCount, kec.nama + "target");
    const historisSplits = splitInteger(kec.historis, desaCount, kec.nama + "historis");

    for (let i = 0; i < desaCount; i++) {
      const namaDesa = NAMA_DESA_POOL[(desaSeq - 1) % NAMA_DESA_POOL.length];
      const desaId = `desa-${desaSeq}`;

      const desa = {
        id: desaId,
        kode: `${kec.kode}.${String(i + 1).padStart(2, "0")}`,
        nama: namaDesa,
        kecamatanId: kec.id,
        tpsCount: tpsSplits[i],
        dpt: dptSplits[i],
        target: targetSplits[i],
        historis: historisSplits[i],
      };
      desaData.push(desa);

      const tpsCountForDesa = tpsSplits[i];
      const tpsDptSplits = splitInteger(desa.dpt, tpsCountForDesa, desa.id + "dpt");
      const tpsTargetSplits = splitInteger(desa.target, tpsCountForDesa, desa.id + "target");
      const tpsHistorisSplits = splitInteger(desa.historis, tpsCountForDesa, desa.id + "his2024");

      for (let t = 0; t < tpsCountForDesa; t++) {
        const dpt = tpsDptSplits[t];
        const target2029 = tpsTargetSplits[t];
        const historis2024 = tpsHistorisSplits[t];
        const historis2019 = Math.round(historis2024 * seededScore(desaId + "his2019" + t, 0.78, 0.95));

        // L/P split (~50/50 dengan sedikit variasi)
        const lakiRatio = seededScore(desaId + "gender" + t, 0.47, 0.53);
        const lakiLaki = Math.round(dpt * lakiRatio);
        const perempuan = dpt - lakiLaki;

        // Data pemilu 2024: suara sah = historis2024 (dipakai sbg suara sah terakhir)
        const partisipasi = Math.min(97, Math.max(55, (historis2024 / dpt) * 100 + seededScore(desaId + "part" + t, -8, 8)));
        const suaraSah = Math.round(dpt * (partisipasi / 100));
        const golput = Math.max(0, dpt - suaraSah);

        const isNonaktif = seededScore(desaId + "status" + t, 0, 1) < 0.03;
        const isTerpetakan = seededScore(desaId + "mapped" + t, 0, 1) < 0.973;
        const isLengkap = seededScore(desaId + "lengkap" + t, 0, 1) < 0.973;

        const point = scatterPoint(center.lat, center.lng, center.radius, `${desaId}pt${t}`);

        tpsData.push({
          id: `tps-${tpsSeq}`,
          kode: `${desa.kode}.${String(t + 1).padStart(3, "0")}`,
          nomor: String(t + 1).padStart(3, "0"),
          desaId: desa.id,
          dpt,
          lakiLaki,
          perempuan,
          historis2019,
          historis2024,
          target2029,
          suaraSah,
          golput,
          partisipasi,
          status: isNonaktif ? "Nonaktif" : "Aktif",
          terpetakan: isTerpetakan,
          lengkap: isLengkap,
          lat: point.lat,
          lng: point.lng,
          deleted: false,
        });

        tpsSeq++;
      }

      desaSeq++;
    }
  });
}

generateDesaDanTps();

/* =====================================================
   INTELLIGENCE SCORE & KLASIFIKASI (dihitung sekali di atas
   data hasil generate, breakpoint dari seluruh populasi TPS)
===================================================== */

const dptValues = tpsData.map((t) => t.dpt);
const dptMin = Math.min(...dptValues), dptMax = Math.max(...dptValues);

const historisRatios = tpsData.map((t) => t.historis2024 / t.dpt);
const ratioMin = Math.min(...historisRatios), ratioMax = Math.max(...historisRatios);

const potensiRatios = tpsData.map((t) => (t.target2029 - t.historis2024) / t.dpt);
const potensiMin = Math.min(...potensiRatios), potensiMax = Math.max(...potensiRatios);

// Pass 1: hitung skor mentah (rata-rata 5 indikator) per TPS
const rawScores = tpsData.map((t, i) => {
  const jumlahPemilihScore = normalize(t.dpt, dptMin, dptMax);
  const partisipasiScore = Math.min(100, t.partisipasi);
  const suaraHistorisScore = normalize(historisRatios[i], ratioMin, ratioMax);
  const potensiPertumbuhanScore = normalize(potensiRatios[i], potensiMin, potensiMax);
  const persainganScore = seededScore(t.id + "kompetisi", 40, 92); // dummy, pending modul Kompetitor per-TPS

  return {
    jumlahPemilihScore,
    partisipasiScore,
    suaraHistorisScore,
    potensiPertumbuhanScore,
    persainganScore,
    raw: (jumlahPemilihScore + partisipasiScore + suaraHistorisScore + potensiPertumbuhanScore + persainganScore) / 5,
  };
});

// Pass 2: re-normalisasi skor mentah ke rentang 0-100 penuh, supaya
// sebaran Tinggi/Sedang/Rendah representatif (kalau langsung dipakai
// tanpa ini, rata-rata 5 indikator cenderung mengumpul di tengah
// karena partisipasi & persaingan dibatasi rentang yang lebih sempit
// dibanding indikator lain)
const rawValues = rawScores.map((r) => r.raw);
const rawMin = Math.min(...rawValues), rawMax = Math.max(...rawValues);

tpsData.forEach((t, i) => {
  const r = rawScores[i];
  const potentialScore = Math.round(normalize(r.raw, rawMin, rawMax));

  t.indikator = {
    jumlahPemilih: Math.round(r.jumlahPemilihScore),
    partisipasi: Math.round(r.partisipasiScore),
    suaraHistoris: Math.round(r.suaraHistorisScore),
    potensiPertumbuhan: Math.round(r.potensiPertumbuhanScore),
    persaingan: Math.round(r.persainganScore),
  };
  t.potentialScore = potentialScore;
  t.potensiLevel = getLevel(potentialScore);

  const historisRatio = t.historis2024 / t.dpt;
  if (historisRatio >= 0.55) {
    t.klasifikasi = { key: "basis", label: "Basis", desc: "Suara kandidat tinggi, potensi mempertahankan tinggi" };
  } else if (potentialScore >= 60) {
    t.klasifikasi = { key: "potensial", label: "Potensial", desc: "Suara historis sedang, masih bisa ditingkatkan" };
  } else if (r.persainganScore >= 60) {
    t.klasifikasi = { key: "persaingan", label: "Persaingan", desc: "Perbedaan antar kandidat kecil" };
  } else {
    t.klasifikasi = { key: "sulit", label: "Sulit", desc: "Dominasi kompetitor tinggi" };
  }

  t.targetShare = t.dpt ? (t.target2029 / t.dpt) * 100 : 0;
});

/* =====================================================
   RELASI HELPER
===================================================== */

function getDesa(id) {
  return desaData.find((d) => d.id === id);
}
function getKecamatan(id) {
  return kecamatanData.find((k) => k.id === id);
}
function getKabupaten(id) {
  return kabupatenData.find((k) => k.id === id);
}
function getDapil(kabupatenNama) {
  return KABUPATEN_TO_DAPIL[kabupatenNama] || "-";
}

/* =====================================================
   STATE
===================================================== */

const state = {
  search: "",
  filters: { kabupaten: "", kecamatan: "", desa: "", status: "" },
  view: "table",
  page: 1,
  pageSize: 20,
};

let tpsMap = null;
const MAP_MARKER_LIMIT = 300;

/* =====================================================
   INIT
===================================================== */

document.addEventListener("DOMContentLoaded", () => {
  renderSummary();
  populateFilterDropdowns();
  bindFilterEvents();
  bindViewToggle();
  bindDrawerEvents();
  bindModalEvents();

  render();
});

/* =====================================================
   SUMMARY CARDS
===================================================== */

function renderSummary() {
  const active = tpsData.filter((t) => !t.deleted);
  const totalTps = active.length;
  const tpsAktif = active.filter((t) => t.status === "Aktif").length;
  const totalPemilih = active.reduce((s, t) => s + t.dpt, 0);
  const terpetakan = active.filter((t) => t.terpetakan).length;
  const lengkap = active.filter((t) => t.lengkap).length;
  const dataLengkapPct = totalTps ? (lengkap / totalTps) * 100 : 0;

  const cards = [
    { label: "TOTAL TPS", value: formatNumber(totalTps) },
    { label: "TPS AKTIF", value: formatNumber(tpsAktif) },
    { label: "TOTAL PEMILIH", value: formatNumber(totalPemilih) },
    { label: "TPS TERPETAKAN", value: formatNumber(terpetakan) },
    { label: "DATA LENGKAP", value: `${dataLengkapPct.toFixed(1)}%` },
  ];

  document.getElementById("summaryGrid").innerHTML = cards
    .map((c) => `<div class="summary-card"><span>${c.label}</span><h2>${c.value}</h2></div>`)
    .join("");
}

/* =====================================================
   FILTER (cascading)
===================================================== */

function populateFilterDropdowns() {
  const kabupatenSelect = document.getElementById("filterKabupaten");
  kabupatenData.forEach((k) => {
    const opt = document.createElement("option");
    opt.value = k.id;
    opt.textContent = k.nama;
    kabupatenSelect.appendChild(opt);
  });
}

function updateKecamatanOptions() {
  const select = document.getElementById("filterKecamatan");
  select.innerHTML = '<option value="">Semua Kecamatan</option>';

  const list = state.filters.kabupaten ? kecamatanData.filter((k) => k.kabupatenId === state.filters.kabupaten) : [];
  list.forEach((k) => {
    const opt = document.createElement("option");
    opt.value = k.id;
    opt.textContent = k.nama;
    select.appendChild(opt);
  });
  select.disabled = list.length === 0;
}

function updateDesaOptions() {
  const select = document.getElementById("filterDesa");
  select.innerHTML = '<option value="">Semua Desa</option>';

  const list = state.filters.kecamatan ? desaData.filter((d) => d.kecamatanId === state.filters.kecamatan) : [];
  list.forEach((d) => {
    const opt = document.createElement("option");
    opt.value = d.id;
    opt.textContent = d.nama;
    select.appendChild(opt);
  });
  select.disabled = list.length === 0;
}

function bindFilterEvents() {
  document.getElementById("searchInput").addEventListener("input", (e) => {
    state.search = e.target.value.trim().toLowerCase();
    state.page = 1;
    render();
  });

  document.getElementById("filterKabupaten").addEventListener("change", (e) => {
    state.filters.kabupaten = e.target.value;
    state.filters.kecamatan = "";
    state.filters.desa = "";
    state.page = 1;
    updateKecamatanOptions();
    updateDesaOptions();
    render();
  });

  document.getElementById("filterKecamatan").addEventListener("change", (e) => {
    state.filters.kecamatan = e.target.value;
    state.filters.desa = "";
    state.page = 1;
    updateDesaOptions();
    render();
  });

  document.getElementById("filterDesa").addEventListener("change", (e) => {
    state.filters.desa = e.target.value;
    state.page = 1;
    render();
  });

  document.getElementById("filterStatus").addEventListener("change", (e) => {
    state.filters.status = e.target.value;
    state.page = 1;
    render();
  });

  document.getElementById("resetFilterBtn").addEventListener("click", () => {
    state.search = "";
    state.filters = { kabupaten: "", kecamatan: "", desa: "", status: "" };
    state.page = 1;

    document.getElementById("searchInput").value = "";
    document.getElementById("filterKabupaten").value = "";
    document.getElementById("filterStatus").value = "";
    updateKecamatanOptions();
    updateDesaOptions();

    render();
  });
}

/* =====================================================
   VIEW TOGGLE
===================================================== */

function bindViewToggle() {
  document.querySelectorAll(".view-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".view-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      state.view = btn.dataset.view;

      document.getElementById("tableViewPanel").classList.toggle("hidden", state.view !== "table");
      document.getElementById("mapViewPanel").classList.toggle("hidden", state.view !== "map");

      render();
    });
  });
}

/* =====================================================
   FILTERED ROWS
===================================================== */

function getFilteredTps() {
  let rows = tpsData.filter((t) => !t.deleted);

  if (state.filters.desa) {
    rows = rows.filter((t) => t.desaId === state.filters.desa);
  } else if (state.filters.kecamatan) {
    const desaIds = desaData.filter((d) => d.kecamatanId === state.filters.kecamatan).map((d) => d.id);
    rows = rows.filter((t) => desaIds.includes(t.desaId));
  } else if (state.filters.kabupaten) {
    const kecIds = kecamatanData.filter((k) => k.kabupatenId === state.filters.kabupaten).map((k) => k.id);
    const desaIds = desaData.filter((d) => kecIds.includes(d.kecamatanId)).map((d) => d.id);
    rows = rows.filter((t) => desaIds.includes(t.desaId));
  }

  if (state.filters.status) {
    rows = rows.filter((t) => t.status === state.filters.status);
  }

  if (state.search) {
    const term = state.search;
    rows = rows.filter((t) => {
      const desa = getDesa(t.desaId);
      const kec = desa ? getKecamatan(desa.kecamatanId) : null;
      const kab = kec ? getKabupaten(kec.kabupatenId) : null;
      const haystack = [t.kode, t.nomor, desa?.nama, kec?.nama, kab?.nama].filter(Boolean).join(" ").toLowerCase();
      return haystack.includes(term);
    });
  }

  return rows;
}

/* =====================================================
   RENDER
===================================================== */

function render() {
  const rows = getFilteredTps();
  document.getElementById("dataCount").textContent = `${formatNumber(rows.length)} TPS`;

  if (state.view === "table") {
    renderTable(rows);
  } else {
    renderMap(rows);
  }
}

/* =====================================================
   TABLE VIEW
===================================================== */

function potensiBadgeHtml(t) {
  return `<span class="potensi-badge ${t.potensiLevel.key}">${t.potensiLevel.label}</span>`;
}

function statusBadgeHtml(status) {
  const key = status === "Aktif" ? "aktif" : "nonaktif";
  return `<span class="status-badge ${key}">${status}</span>`;
}

function renderTable(rows) {
  const totalPages = Math.max(1, Math.ceil(rows.length / state.pageSize));
  state.page = Math.min(state.page, totalPages);
  const start = (state.page - 1) * state.pageSize;
  const pageRows = rows.slice(start, start + state.pageSize);

  const tbody = document.getElementById("tpsTableBody");

  if (!pageRows.length) {
    tbody.innerHTML = `<tr><td colspan="13" style="text-align:center;color:var(--text-light);padding:30px;">Tidak ada data pada filter/pencarian ini.</td></tr>`;
  } else {
    tbody.innerHTML = pageRows
      .map((t, i) => {
        const desa = getDesa(t.desaId);
        const kec = getKecamatan(desa.kecamatanId);
        const kab = getKabupaten(kec.kabupatenId);

        return `
          <tr>
            <td>${start + i + 1}</td>
            <td>${t.kode}</td>
            <td>TPS ${t.nomor}</td>
            <td>${desa.nama}</td>
            <td>${kec.nama}</td>
            <td>${kab.nama}</td>
            <td>${getDapil(kab.nama)}</td>
            <td>${formatNumber(t.dpt)}</td>
            <td>${formatNumber(t.lakiLaki)}</td>
            <td>${formatNumber(t.perempuan)}</td>
            <td>${statusBadgeHtml(t.status)}</td>
            <td>${potensiBadgeHtml(t)}</td>
            <td><button class="row-action-btn detail-btn" data-id="${t.id}">Detail</button></td>
          </tr>
        `;
      })
      .join("");

    tbody.querySelectorAll(".detail-btn").forEach((btn) => {
      btn.addEventListener("click", () => openDrawer(btn.dataset.id));
    });
  }

  renderPagination(totalPages, rows.length);
}

function renderPagination(totalPages, totalRows) {
  const container = document.getElementById("pagination");

  if (totalRows <= state.pageSize) {
    container.innerHTML = "";
    return;
  }

  container.innerHTML = `
    <button id="prevPageBtn" ${state.page <= 1 ? "disabled" : ""}><i class="fa-solid fa-chevron-left"></i> Sebelumnya</button>
    <span>Halaman ${state.page} dari ${totalPages}</span>
    <button id="nextPageBtn" ${state.page >= totalPages ? "disabled" : ""}>Berikutnya <i class="fa-solid fa-chevron-right"></i></button>
  `;

  document.getElementById("prevPageBtn").addEventListener("click", () => {
    if (state.page > 1) {
      state.page--;
      renderTable(getFilteredTps());
    }
  });
  document.getElementById("nextPageBtn").addEventListener("click", () => {
    if (state.page < totalPages) {
      state.page++;
      renderTable(getFilteredTps());
    }
  });
}

/* =====================================================
   MAP VIEW
===================================================== */

const KLASIFIKASI_COLOR = { basis: "#16a34a", potensial: "#2563eb", persaingan: "#eab308", sulit: "#dc2626" };

function renderMap(rows) {
  const noteEl = document.getElementById("mapNote");
  const mapContainer = document.getElementById("tpsMap");

  if (rows.length > MAP_MARKER_LIMIT) {
    noteEl.className = "map-note warning";
    noteEl.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> ${formatNumber(rows.length)} TPS pada filter ini - persempit filter (Kabupaten/Kecamatan/Desa) untuk menampilkan peta (maks ${MAP_MARKER_LIMIT} titik sekaligus agar tetap responsif).`;
    mapContainer.innerHTML = "";
    if (tpsMap) {
      tpsMap.remove();
      tpsMap = null;
    }
    document.getElementById("mapLegendInline").innerHTML = "";
    return;
  }

  noteEl.className = "map-note";
  noteEl.innerHTML = `<i class="fa-solid fa-circle-info"></i> Menampilkan ${formatNumber(rows.length)} titik TPS. Warna marker mengikuti klasifikasi TPS.`;

  if (tpsMap) {
    tpsMap.remove();
    tpsMap = null;
  }

  tpsMap = L.map("tpsMap", { zoomControl: true }).setView([-0.5022, 117.1537], 8);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap Contributors",
  }).addTo(tpsMap);

  const markers = [];

  rows.forEach((t) => {
    const desa = getDesa(t.desaId);
    const color = KLASIFIKASI_COLOR[t.klasifikasi.key];

    const marker = L.circleMarker([t.lat, t.lng], {
      radius: 6,
      color,
      weight: 1,
      fillColor: color,
      fillOpacity: 0.85,
    }).addTo(tpsMap);

    marker.bindPopup(`
      <div class="tps-marker-popup">
        <strong>TPS ${t.nomor}</strong>
        ${desa.nama}
        <br><br>
        DPT: ${formatNumber(t.dpt)}<br>
        Target: ${formatNumber(t.target2029)}<br>
        Potensi: ${t.potensiLevel.label}<br>
        Klasifikasi: ${t.klasifikasi.label}
        <br>
        <button class="popup-detail-btn" data-id="${t.id}">Detail</button>
      </div>
    `);

    marker.on("popupopen", () => {
      const btn = document.querySelector(`.popup-detail-btn[data-id="${t.id}"]`);
      if (btn) btn.addEventListener("click", () => openDrawer(t.id));
    });

    markers.push(marker);
  });

  if (markers.length) {
    tpsMap.fitBounds(L.featureGroup(markers).getBounds(), { padding: [30, 30], maxZoom: 14 });
  }

  document.getElementById("mapLegendInline").innerHTML = Object.entries({
    basis: "Basis", potensial: "Potensial", persaingan: "Persaingan", sulit: "Sulit",
  })
    .map(([key, label]) => `<span><span class="dot" style="background:${KLASIFIKASI_COLOR[key]}"></span>${label}</span>`)
    .join("");

  setTimeout(() => {
    if (tpsMap) tpsMap.invalidateSize();
  }, 250);
}

/* =====================================================
   DETAIL DRAWER
===================================================== */

function bindDrawerEvents() {
  document.getElementById("drawerCloseBtn").addEventListener("click", closeDrawer);
  document.getElementById("drawerOverlay").addEventListener("click", (e) => {
    if (e.target.id === "drawerOverlay") closeDrawer();
  });
}

function openDrawer(tpsId) {
  const t = tpsData.find((x) => x.id === tpsId);
  if (!t) return;

  const desa = getDesa(t.desaId);
  const kec = getKecamatan(desa.kecamatanId);
  const kab = getKabupaten(kec.kabupatenId);

  const priorityLevel = t.potentialScore >= 66 ? "tinggi" : t.potentialScore >= 33 ? "sedang" : "rendah";
  const priorityText =
    priorityLevel === "tinggi"
      ? "TPS ini memiliki potensi besar untuk menjadi target strategis Pemilu 2029."
      : priorityLevel === "sedang"
        ? "TPS ini punya peluang cukup untuk dikembangkan dengan pendekatan yang tepat."
        : "TPS ini relatif aman/stabil - alokasikan sumber daya secukupnya.";

  document.getElementById("drawerBody").innerHTML = `
    <div class="drawer-identity">
      <h2>TPS ${t.nomor}</h2>
      <p>${desa.nama}, ${kec.nama}, ${kab.nama}</p>
      <p style="margin-top:4px;">${statusBadgeHtml(t.status)} <span class="klasifikasi-badge ${t.klasifikasi.key}"><span class="klasifikasi-dot"></span>${t.klasifikasi.label}</span></p>
    </div>

    <div class="drawer-section">
      <div class="drawer-section-title">Data Pemilih</div>
      <div class="drawer-metric-grid">
        <div class="drawer-metric"><span>DPT</span><strong>${formatNumber(t.dpt)}</strong></div>
        <div class="drawer-metric"><span>Laki-laki</span><strong>${formatNumber(t.lakiLaki)}</strong></div>
        <div class="drawer-metric"><span>Perempuan</span><strong>${formatNumber(t.perempuan)}</strong></div>
      </div>
    </div>

    <div class="drawer-section">
      <div class="drawer-section-title">Data Pemilu</div>
      <div class="drawer-metric-grid">
        <div class="drawer-metric"><span>Suara Sah</span><strong>${formatNumber(t.suaraSah)}</strong></div>
        <div class="drawer-metric"><span>Golput</span><strong>${formatNumber(t.golput)}</strong></div>
        <div class="drawer-metric"><span>Partisipasi</span><strong>${t.partisipasi.toFixed(1)}%</strong></div>
      </div>
    </div>

    <div class="drawer-section">
      <div class="drawer-section-title">Potensi</div>
      <div class="drawer-metric-grid">
        <div class="drawer-metric"><span>Potensi TPS</span><strong>${t.potensiLevel.label}</strong></div>
        <div class="drawer-metric"><span>Target Suara</span><strong>${formatNumber(t.target2029)}</strong></div>
        <div class="drawer-metric"><span>Suara Historis</span><strong>${formatNumber(t.historis2024)}</strong></div>
      </div>
    </div>

    <div class="drawer-section">
      <div class="drawer-section-title">Intelligence Score</div>

      <div class="score-gauge-row">
        <div class="score-gauge-value">${t.potentialScore}<small> / 100</small></div>
        <div class="score-gauge-track"><div class="score-gauge-fill" style="width:${t.potentialScore}%"></div></div>
      </div>

      ${renderScoreIndicator("Jumlah Pemilih", t.indikator.jumlahPemilih)}
      ${renderScoreIndicator("Partisipasi", t.indikator.partisipasi)}
      ${renderScoreIndicator("Suara Historis", t.indikator.suaraHistoris)}
      ${renderScoreIndicator("Potensi Pertumbuhan", t.indikator.potensiPertumbuhan)}
      ${renderScoreIndicator("Persaingan", t.indikator.persaingan)}

      <div class="priority-callout ${priorityLevel}">
        <i class="fa-solid fa-fire"></i>
        <div>
          <strong>${priorityLevel === "tinggi" ? "PRIORITAS TINGGI" : priorityLevel === "sedang" ? "PRIORITAS SEDANG" : "PRIORITAS RENDAH"}</strong>
          ${priorityText}
        </div>
      </div>
    </div>

    <div class="drawer-section">
      <div class="drawer-section-title">Target Suara per TPS</div>
      <div class="drawer-metric-grid" style="margin-bottom:14px;">
        <div class="drawer-metric"><span>Estimasi Hadir</span><strong>${formatNumber(t.suaraSah)}</strong></div>
        <div class="drawer-metric"><span>Target Share</span><strong>${t.targetShare.toFixed(1)}%</strong></div>
      </div>

      <table class="drawer-historis-table">
        <thead><tr><th>Pemilu</th><th>Suara</th></tr></thead>
        <tbody>
          <tr><td>2019</td><td>${formatNumber(t.historis2019)}</td></tr>
          <tr><td>2024</td><td>${formatNumber(t.historis2024)}</td></tr>
          <tr class="target-row"><td>2029 (Target)</td><td>${formatNumber(t.target2029)}</td></tr>
        </tbody>
      </table>
    </div>

    <button class="btn-analisis" id="btnLihatAnalisis">
      <i class="fa-solid fa-chart-line"></i> Lihat Analisis di Heatmap
    </button>
  `;

  document.getElementById("btnLihatAnalisis").addEventListener("click", () => {
    location.href = "/pages/heatmap/heatmap.html";
  });

  document.getElementById("drawerOverlay").classList.add("open");
}

function renderScoreIndicator(label, value) {
  return `
    <div class="score-indicator-row">
      <div class="score-indicator-label">${label}</div>
      <div class="score-indicator-track"><div class="score-indicator-fill" style="width:${value}%"></div></div>
      <div class="score-indicator-value">${value}</div>
    </div>
  `;
}

function closeDrawer() {
  document.getElementById("drawerOverlay").classList.remove("open");
}

/* =====================================================
   MODAL: TAMBAH TPS (in-memory)
===================================================== */

function bindModalEvents() {
  document.getElementById("btnTambahTps").addEventListener("click", openAddModal);
  document.getElementById("modalCloseBtn").addEventListener("click", closeAddModal);
  document.getElementById("modalCancelBtn").addEventListener("click", closeAddModal);
  document.getElementById("modalOverlay").addEventListener("click", (e) => {
    if (e.target.id === "modalOverlay") closeAddModal();
  });

  document.getElementById("modalKabupaten").addEventListener("change", populateModalKecamatan);
  document.getElementById("modalKecamatan").addEventListener("change", populateModalDesa);

  document.getElementById("modalSaveBtn").addEventListener("click", saveNewTps);

  document.getElementById("btnImportTps").addEventListener("click", () => {
    alert(
      "Import massal TPS akan menggunakan modul \"Import Data\" (belum dibangun). Untuk saat ini, silakan tambah TPS satu per satu lewat tombol \"Tambah TPS\".",
    );
  });
}

function openAddModal() {
  const kabSelect = document.getElementById("modalKabupaten");
  kabSelect.innerHTML = kabupatenData.map((k) => `<option value="${k.id}">${k.nama}</option>`).join("");
  populateModalKecamatan();

  document.getElementById("modalNomor").value = "";
  document.getElementById("modalLaki").value = "";
  document.getElementById("modalPerempuan").value = "";
  document.getElementById("modalStatus").value = "Aktif";

  document.getElementById("modalOverlay").classList.add("open");
}

function closeAddModal() {
  document.getElementById("modalOverlay").classList.remove("open");
}

function populateModalKecamatan() {
  const kabId = document.getElementById("modalKabupaten").value;
  const select = document.getElementById("modalKecamatan");
  select.innerHTML = kecamatanData
    .filter((k) => k.kabupatenId === kabId)
    .map((k) => `<option value="${k.id}">${k.nama}</option>`)
    .join("");
  populateModalDesa();
}

function populateModalDesa() {
  const kecId = document.getElementById("modalKecamatan").value;
  const select = document.getElementById("modalDesa");
  select.innerHTML = desaData
    .filter((d) => d.kecamatanId === kecId)
    .map((d) => `<option value="${d.id}">${d.nama}</option>`)
    .join("");
}

function saveNewTps() {
  const desaId = document.getElementById("modalDesa").value;
  const nomor = document.getElementById("modalNomor").value.trim();
  const lakiLaki = Number(document.getElementById("modalLaki").value) || 0;
  const perempuan = Number(document.getElementById("modalPerempuan").value) || 0;
  const status = document.getElementById("modalStatus").value;

  if (!desaId || !nomor) {
    alert("Desa dan Nomor TPS wajib diisi.");
    return;
  }

  const desa = getDesa(desaId);
  const dpt = lakiLaki + perempuan;
  const countInDesa = tpsData.filter((t) => t.desaId === desaId && !t.deleted).length;

  const nums = tpsData.map((x) => Number(x.id.split("-")[1]) || 0);
  const newId = `tps-${Math.max(...nums) + 1}`;

  const target2029 = Math.round(dpt * 0.6);
  const historis2024 = Math.round(dpt * 0.45);
  const historis2019 = Math.round(historis2024 * 0.85);
  const partisipasi = dpt ? (historis2024 / dpt) * 100 : 0;
  const suaraSah = Math.round(dpt * (partisipasi / 100));

  const newTps = {
    id: newId,
    kode: `${desa.kode}.${String(countInDesa + 1).padStart(3, "0")}`,
    nomor,
    desaId,
    dpt,
    lakiLaki,
    perempuan,
    historis2019,
    historis2024,
    target2029,
    suaraSah,
    golput: Math.max(0, dpt - suaraSah),
    partisipasi,
    status,
    terpetakan: false,
    lengkap: false,
    lat: kabupatenCenters[getKabupaten(getKecamatan(desa.kecamatanId).kabupatenId).nama].lat,
    lng: kabupatenCenters[getKabupaten(getKecamatan(desa.kecamatanId).kabupatenId).nama].lng,
    deleted: false,
    indikator: { jumlahPemilih: 50, partisipasi: 50, suaraHistoris: 50, potensiPertumbuhan: 50, persaingan: 50 },
    potentialScore: 50,
    potensiLevel: getLevel(50),
    klasifikasi: { key: "potensial", label: "Potensial", desc: "Data baru - belum ada histori lengkap" },
    targetShare: dpt ? (target2029 / dpt) * 100 : 0,
  };

  tpsData.push(newTps);

  closeAddModal();
  renderSummary();
  render();
}