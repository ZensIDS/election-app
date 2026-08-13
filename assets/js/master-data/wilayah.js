/**
 * =====================================================
 * POLITICAL INTELLIGENCE 2029
 * Data Wilayah - Master Data Hierarkis
 * =====================================================
 *
 * CATATAN:
 * Data Kabupaten & Kecamatan (dpt/tps/target) identik dengan
 * modul lain (analisis-wilayah, heatmap, ai-recommendation,
 * kompetitor, simulasi-menang) supaya seluruh aplikasi
 * konsisten. Level Desa & TPS DI-GENERATE PROGRAMATIS dari
 * angka kecamatan tsb (bukan di-hardcode satu-satu, karena
 * totalnya ~2.100 TPS) - lihat generateDesaDanTps().
 *
 * SEMUA operasi CRUD (tambah/edit/hapus) di halaman ini
 * berfungsi penuh, tapi hanya menyimpan ke STATE IN-MEMORY
 * (array JS) - hilang saat halaman di-refresh. Begitu ada
 * backend/API, ganti fungsi saveWilayah()/deleteWilayah() di
 * bawah supaya memanggil endpoint yang sesuai.
 *
 * HAPUS = SOFT DELETE (field `deleted: true`), bukan
 * menghapus dari array, karena wilayah bisa sudah punya data
 * TPS/suara terkait. Penghapusan tidak di-cascade otomatis ke
 * level di bawahnya (mis. hapus kecamatan tidak ikut
 * menyembunyikan desa/TPS-nya) - ini simplifikasi untuk versi
 * dummy, tandai untuk diperbaiki saat masuk data produksi.
 * =====================================================
 */

/* =====================================================
   DATA DASAR: PROVINSI, KABUPATEN, KECAMATAN
   (kabupaten & kecamatan identik dgn modul lain)
===================================================== */

const provinsiData = [
  { id: "prov-1", kode: "64", nama: "Kalimantan Timur", status: "Aktif", deleted: false },
];

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

const kabupatenData = kabupatenBase.map((k, i) => ({
  id: `kab-${i + 1}`,
  kode: k.kode,
  nama: k.nama,
  provinsiId: "prov-1",
  status: "Aktif",
  deleted: false,
}));

function findKabupatenIdByNama(nama) {
  const k = kabupatenData.find((x) => x.nama === nama);
  return k ? k.id : null;
}

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
  target: k.target,
  status: "Aktif",
  deleted: false,
}));

function findKodeKabupaten(nama) {
  const k = kabupatenBase.find((x) => x.nama === nama);
  return k ? k.kode : "64.00";
}

/* =====================================================
   HELPERS UMUM
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

// Bagi `total` menjadi `parts` bagian integer dengan variasi
// seeded, tetapi jumlah totalnya PASTI sama persis dengan
// `total` (sisa pembulatan diserap oleh bagian terakhir).
function splitInteger(total, parts, seedBase) {
  if (parts <= 1) return [total];

  const weights = [];
  for (let i = 0; i < parts; i++) {
    weights.push(seededScore(seedBase + i, 40, 100));
  }
  const sumW = weights.reduce((a, b) => a + b, 0);

  const allocated = weights.map((w) => Math.max(1, Math.round((w / sumW) * total)));
  const diff = total - allocated.reduce((a, b) => a + b, 0);
  allocated[allocated.length - 1] = Math.max(1, allocated[allocated.length - 1] + diff);

  return allocated;
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
  return breaks;
}

/* =====================================================
   GENERATE DESA & TPS (programatis, bukan hardcode)
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

function generateDesaDanTps() {
  let desaSeq = 1;
  let tpsSeq = 1;

  kecamatanData.forEach((kec) => {
    const desaCount = Math.min(6, Math.max(3, Math.round(kec.tps / 55)));

    const tpsSplits = splitInteger(kec.tps, desaCount, kec.nama + "tps");
    const dptSplits = splitInteger(kec.dpt, desaCount, kec.nama + "dpt");
    const targetSplits = splitInteger(kec.target, desaCount, kec.nama + "target");

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
        status: "Aktif",
        deleted: false,
      };
      desaData.push(desa);

      const tpsCountForDesa = tpsSplits[i];
      const tpsDptSplits = splitInteger(desa.dpt, tpsCountForDesa, desa.id + "dpt");
      const tpsTargetSplits = splitInteger(desa.target, tpsCountForDesa, desa.id + "target");

      for (let t = 0; t < tpsCountForDesa; t++) {
        const targetTps = tpsTargetSplits[t];
        const suaraRatio = seededScore(desa.id + "suara" + t, 0.55, 1.05);
        const suaraAktual = Math.round(targetTps * suaraRatio);
        const isNonaktif = seededScore(desa.id + "status" + t, 0, 1) < 0.03;

        tpsData.push({
          id: `tps-${tpsSeq}`,
          kode: `${desa.kode}.${String(t + 1).padStart(3, "0")}`,
          nomor: String(t + 1).padStart(3, "0"),
          desaId: desa.id,
          dpt: tpsDptSplits[t],
          target: targetTps,
          suaraAktual,
          status: isNonaktif ? "Nonaktif" : "Aktif",
          deleted: false,
        });

        tpsSeq++;
      }

      desaSeq++;
    }
  });
}

generateDesaDanTps();

// Breakpoint "Potensi Wilayah" desa (dihitung sekali dari DPT seluruh desa)
const desaDptBreaks = computeBreakpoints(desaData.map((d) => d.dpt), 3);

function getPotensiWilayah(dpt) {
  if (dpt <= desaDptBreaks[0]) return "Rendah";
  if (dpt <= desaDptBreaks[1]) return "Sedang";
  return "Tinggi";
}

/* =====================================================
   RELASI HELPER (lookup naik ke atas)
===================================================== */

function getKabupaten(id) {
  return kabupatenData.find((k) => k.id === id);
}
function getKecamatan(id) {
  return kecamatanData.find((k) => k.id === id);
}
function getDesa(id) {
  return desaData.find((d) => d.id === id);
}

/* =====================================================
   AGREGASI LIVE (dihitung ulang tiap render, bukan cache)
===================================================== */

function aggProvinsi(prov) {
  const kabs = kabupatenData.filter((k) => k.provinsiId === prov.id && !k.deleted);
  const kecs = kecamatanData.filter((k) => kabs.some((kb) => kb.id === k.kabupatenId) && !k.deleted);
  const desas = desaData.filter((d) => kecs.some((k) => k.id === d.kecamatanId) && !d.deleted);

  return {
    jumlahKabupaten: kabs.length,
    jumlahKecamatan: kecs.length,
    jumlahDesa: desas.length,
    totalTps: kecs.reduce((s, k) => s + k.tps, 0),
    totalDpt: kecs.reduce((s, k) => s + k.dpt, 0),
  };
}

function aggKabupaten(kab) {
  const kecs = kecamatanData.filter((k) => k.kabupatenId === kab.id && !k.deleted);
  const desas = desaData.filter((d) => kecs.some((k) => k.id === d.kecamatanId) && !d.deleted);

  return {
    jumlahKecamatan: kecs.length,
    jumlahDesa: desas.length,
    jumlahTps: kecs.reduce((s, k) => s + k.tps, 0),
    dpt: kecs.reduce((s, k) => s + k.dpt, 0),
  };
}

function aggKecamatan(kec) {
  const desas = desaData.filter((d) => d.kecamatanId === kec.id && !d.deleted);
  return { jumlahDesa: desas.length };
}

/* =====================================================
   STATE
===================================================== */

const state = {
  tab: "provinsi",
  filters: { kabupaten: "", kecamatan: "", desa: "" },
  search: "",
  page: 1,
  pageSize: 20,
};

const modalState = { mode: "add", level: "kecamatan", editingId: null };

/* =====================================================
   INIT
===================================================== */

document.addEventListener("DOMContentLoaded", () => {
  populateFilterDropdowns();
  bindTabEvents();
  bindFilterEvents();
  bindToolbarEvents();
  bindModalEvents();

  render();
});

function populateFilterDropdowns() {
  const kabupatenSelect = document.getElementById("filterKabupaten");
  kabupatenData
    .filter((k) => !k.deleted)
    .forEach((k) => {
      const opt = document.createElement("option");
      opt.value = k.id;
      opt.textContent = k.nama;
      kabupatenSelect.appendChild(opt);
    });
}

function updateKecamatanFilterOptions() {
  const select = document.getElementById("filterKecamatan");
  select.innerHTML = '<option value="">Semua Kecamatan</option>';

  const list = state.filters.kabupaten
    ? kecamatanData.filter((k) => k.kabupatenId === state.filters.kabupaten && !k.deleted)
    : [];

  list.forEach((k) => {
    const opt = document.createElement("option");
    opt.value = k.id;
    opt.textContent = k.nama;
    select.appendChild(opt);
  });

  select.disabled = list.length === 0;
}

function updateDesaFilterOptions() {
  const select = document.getElementById("filterDesa");
  select.innerHTML = '<option value="">Semua Desa</option>';

  const list = state.filters.kecamatan
    ? desaData.filter((d) => d.kecamatanId === state.filters.kecamatan && !d.deleted)
    : [];

  list.forEach((d) => {
    const opt = document.createElement("option");
    opt.value = d.id;
    opt.textContent = d.nama;
    select.appendChild(opt);
  });

  select.disabled = list.length === 0;
}

/* =====================================================
   TAB EVENTS
===================================================== */

function bindTabEvents() {
  document.querySelectorAll(".tab").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tab").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      state.tab = btn.dataset.tab;
      state.page = 1;

      updateFilterAvailability();
      render();
    });
  });

  updateFilterAvailability();
}

function updateFilterAvailability() {
  const order = ["provinsi", "kabupaten", "kecamatan", "desa", "tps"];
  const idx = order.indexOf(state.tab);

  document.getElementById("filterKabupaten").disabled = idx < 1 || document.getElementById("filterKabupaten").options.length <= 1;
  document.getElementById("filterKecamatan").disabled = idx < 2 || document.getElementById("filterKecamatan").options.length <= 1;
  document.getElementById("filterDesa").disabled = idx < 4 || document.getElementById("filterDesa").options.length <= 1;
}

/* =====================================================
   FILTER EVENTS
===================================================== */

function bindFilterEvents() {
  document.getElementById("filterKabupaten").addEventListener("change", (e) => {
    state.filters.kabupaten = e.target.value;
    state.filters.kecamatan = "";
    state.filters.desa = "";
    state.page = 1;

    updateKecamatanFilterOptions();
    updateDesaFilterOptions();
    updateFilterAvailability();
    render();
  });

  document.getElementById("filterKecamatan").addEventListener("change", (e) => {
    state.filters.kecamatan = e.target.value;
    state.filters.desa = "";
    state.page = 1;

    updateDesaFilterOptions();
    updateFilterAvailability();
    render();
  });

  document.getElementById("filterDesa").addEventListener("change", (e) => {
    state.filters.desa = e.target.value;
    state.page = 1;
    render();
  });

  document.getElementById("resetFilterBtn").addEventListener("click", () => {
    state.filters = { kabupaten: "", kecamatan: "", desa: "" };
    state.page = 1;

    document.getElementById("filterKabupaten").value = "";
    updateKecamatanFilterOptions();
    updateDesaFilterOptions();
    updateFilterAvailability();

    render();
  });
}

/* =====================================================
   TOOLBAR (search)
===================================================== */

function bindToolbarEvents() {
  document.getElementById("searchInput").addEventListener("input", (e) => {
    state.search = e.target.value.trim().toLowerCase();
    state.page = 1;
    render();
  });

  document.getElementById("btnTambahWilayah").addEventListener("click", () => {
    openModal("add", state.tab === "tps" ? "tps" : state.tab, null);
  });
}

/* =====================================================
   DATA ROWS PER TAB (filter + search diterapkan di sini)
===================================================== */

function getRowsForTab(tab) {
  let rows = [];

  if (tab === "provinsi") {
    rows = provinsiData.filter((p) => !p.deleted);
  } else if (tab === "kabupaten") {
    rows = kabupatenData.filter((k) => !k.deleted);
  } else if (tab === "kecamatan") {
    rows = kecamatanData.filter((k) => !k.deleted);
    if (state.filters.kabupaten) rows = rows.filter((k) => k.kabupatenId === state.filters.kabupaten);
  } else if (tab === "desa") {
    rows = desaData.filter((d) => !d.deleted);
    if (state.filters.kecamatan) {
      rows = rows.filter((d) => d.kecamatanId === state.filters.kecamatan);
    } else if (state.filters.kabupaten) {
      const kecIds = kecamatanData.filter((k) => k.kabupatenId === state.filters.kabupaten).map((k) => k.id);
      rows = rows.filter((d) => kecIds.includes(d.kecamatanId));
    }
  } else if (tab === "tps") {
    rows = tpsData.filter((t) => !t.deleted);
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
  }

  if (state.search) {
    rows = rows.filter((r) => rowMatchesSearch(tab, r, state.search));
  }

  return rows;
}

function rowMatchesSearch(tab, r, term) {
  const haystacks = [r.kode, r.nama, r.nomor];

  if (tab === "kecamatan") haystacks.push(getKabupaten(r.kabupatenId)?.nama);
  if (tab === "desa") haystacks.push(getKecamatan(r.kecamatanId)?.nama);
  if (tab === "tps") {
    const desa = getDesa(r.desaId);
    haystacks.push(desa?.nama);
    if (desa) haystacks.push(getKecamatan(desa.kecamatanId)?.nama);
  }

  return haystacks.filter(Boolean).some((h) => h.toLowerCase().includes(term));
}

/* =====================================================
   RENDER: TABLE HEAD + BODY PER TAB
===================================================== */

const TAB_COLUMNS = {
  provinsi: ["No", "Kode", "Nama Provinsi", "Kab/Kota", "Kecamatan", "Desa", "Total TPS", "Total DPT", "Status", "Aksi"],
  kabupaten: ["No", "Kode", "Nama Kabupaten/Kota", "Provinsi", "Kecamatan", "Desa", "TPS", "DPT", "Status", "Aksi"],
  kecamatan: ["No", "Kode", "Nama Kecamatan", "Kabupaten/Kota", "Desa", "TPS", "DPT", "Target Suara", "Status", "Aksi"],
  desa: ["No", "Kode", "Nama Desa", "Kecamatan", "TPS", "DPT", "Target Suara", "Potensi", "Status", "Aksi"],
  tps: ["No", "Kode TPS", "Nomor", "Desa", "Kecamatan", "Kab/Kota", "DPT", "Target", "Suara Aktual", "Gap", "Status", "Aksi"],
};

function render() {
  const allRows = getRowsForTab(state.tab);
  document.getElementById("dataCount").textContent = `${formatNumber(allRows.length)} Data`;

  const totalPages = Math.max(1, Math.ceil(allRows.length / state.pageSize));
  state.page = Math.min(state.page, totalPages);

  const start = (state.page - 1) * state.pageSize;
  const pageRows = allRows.slice(start, start + state.pageSize);

  renderTableHead();
  renderTableBody(pageRows, start);
  renderPagination(totalPages, allRows.length);
}

function renderTableHead() {
  const thead = document.getElementById("wilayahTableHead");
  const cols = TAB_COLUMNS[state.tab];
  thead.innerHTML = `<tr>${cols.map((c) => `<th>${c}</th>`).join("")}</tr>`;
}

function statusBadge(status) {
  const key = status === "Aktif" ? "aktif" : "nonaktif";
  return `<span class="status-badge ${key}">${status}</span>`;
}

function actionButtons(level, id) {
  return `
    <div class="row-actions">
      <button class="row-action-btn edit-btn" data-level="${level}" data-id="${id}" title="Edit">
        <i class="fa-solid fa-pen"></i>
      </button>
      <button class="row-action-btn delete-btn" data-level="${level}" data-id="${id}" title="Hapus">
        <i class="fa-solid fa-trash"></i>
      </button>
    </div>
  `;
}

function renderTableBody(rows, startIndex) {
  const tbody = document.getElementById("wilayahTableBody");

  if (!rows.length) {
    const colCount = TAB_COLUMNS[state.tab].length;
    tbody.innerHTML = `<tr><td colspan="${colCount}" style="text-align:center;color:var(--text-light);padding:30px;">Tidak ada data pada filter/pencarian ini.</td></tr>`;
    return;
  }

  let html = "";

  if (state.tab === "provinsi") {
    rows.forEach((p, i) => {
      const agg = aggProvinsi(p);
      html += `
        <tr>
          <td>${startIndex + i + 1}</td>
          <td>${p.kode}</td>
          <td>${p.nama}</td>
          <td>${agg.jumlahKabupaten}</td>
          <td>${agg.jumlahKecamatan}</td>
          <td>${agg.jumlahDesa}</td>
          <td>${formatNumber(agg.totalTps)}</td>
          <td>${formatNumber(agg.totalDpt)}</td>
          <td>${statusBadge(p.status)}</td>
          <td>${actionButtons("provinsi", p.id)}</td>
        </tr>
      `;
    });
  } else if (state.tab === "kabupaten") {
    rows.forEach((k, i) => {
      const agg = aggKabupaten(k);
      html += `
        <tr>
          <td>${startIndex + i + 1}</td>
          <td>${k.kode}</td>
          <td>${k.nama}</td>
          <td>Kalimantan Timur</td>
          <td>${agg.jumlahKecamatan}</td>
          <td>${agg.jumlahDesa}</td>
          <td>${formatNumber(agg.jumlahTps)}</td>
          <td>${formatNumber(agg.dpt)}</td>
          <td>${statusBadge(k.status)}</td>
          <td>${actionButtons("kabupaten", k.id)}</td>
        </tr>
      `;
    });
  } else if (state.tab === "kecamatan") {
    rows.forEach((k, i) => {
      const agg = aggKecamatan(k);
      const kab = getKabupaten(k.kabupatenId);
      html += `
        <tr>
          <td>${startIndex + i + 1}</td>
          <td>${k.kode}</td>
          <td>${k.nama}</td>
          <td>${kab ? kab.nama : "-"}</td>
          <td>${agg.jumlahDesa}</td>
          <td>${formatNumber(k.tps)}</td>
          <td>${formatNumber(k.dpt)}</td>
          <td>${formatNumber(k.target)}</td>
          <td>${statusBadge(k.status)}</td>
          <td>${actionButtons("kecamatan", k.id)}</td>
        </tr>
      `;
    });
  } else if (state.tab === "desa") {
    rows.forEach((d, i) => {
      const kec = getKecamatan(d.kecamatanId);
      html += `
        <tr>
          <td>${startIndex + i + 1}</td>
          <td>${d.kode}</td>
          <td>${d.nama}</td>
          <td>${kec ? kec.nama : "-"}</td>
          <td>${formatNumber(d.tpsCount)}</td>
          <td>${formatNumber(d.dpt)}</td>
          <td>${formatNumber(d.target)}</td>
          <td>${getPotensiWilayah(d.dpt)}</td>
          <td>${statusBadge(d.status)}</td>
          <td>${actionButtons("desa", d.id)}</td>
        </tr>
      `;
    });
  } else if (state.tab === "tps") {
    rows.forEach((t, i) => {
      const desa = getDesa(t.desaId);
      const kec = desa ? getKecamatan(desa.kecamatanId) : null;
      const kab = kec ? getKabupaten(kec.kabupatenId) : null;
      const gap = t.target - t.suaraAktual;

      html += `
        <tr>
          <td>${startIndex + i + 1}</td>
          <td>${t.kode}</td>
          <td>${t.nomor}</td>
          <td>${desa ? desa.nama : "-"}</td>
          <td>${kec ? kec.nama : "-"}</td>
          <td>${kab ? kab.nama : "-"}</td>
          <td>${formatNumber(t.dpt)}</td>
          <td>${formatNumber(t.target)}</td>
          <td>${formatNumber(t.suaraAktual)}</td>
          <td style="color:${gap > 0 ? "var(--danger)" : "var(--success)"}">${gap >= 0 ? "+" : ""}${formatNumber(gap)}</td>
          <td>${statusBadge(t.status)}</td>
          <td>${actionButtons("tps", t.id)}</td>
        </tr>
      `;
    });
  }

  tbody.innerHTML = html;

  tbody.querySelectorAll(".edit-btn").forEach((btn) => {
    btn.addEventListener("click", () => openModal("edit", btn.dataset.level, btn.dataset.id));
  });

  tbody.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", () => confirmDelete(btn.dataset.level, btn.dataset.id));
  });
}

/* =====================================================
   PAGINATION
===================================================== */

function renderPagination(totalPages, totalRows) {
  const container = document.getElementById("pagination");

  if (totalRows <= state.pageSize) {
    container.innerHTML = "";
    return;
  }

  container.innerHTML = `
    <button id="prevPageBtn" ${state.page <= 1 ? "disabled" : ""}>
      <i class="fa-solid fa-chevron-left"></i> Sebelumnya
    </button>
    <span>Halaman ${state.page} dari ${totalPages}</span>
    <button id="nextPageBtn" ${state.page >= totalPages ? "disabled" : ""}>
      Berikutnya <i class="fa-solid fa-chevron-right"></i>
    </button>
  `;

  document.getElementById("prevPageBtn").addEventListener("click", () => {
    if (state.page > 1) {
      state.page--;
      render();
    }
  });

  document.getElementById("nextPageBtn").addEventListener("click", () => {
    if (state.page < totalPages) {
      state.page++;
      render();
    }
  });
}

/* =====================================================
   MODAL: TAMBAH / EDIT WILAYAH
===================================================== */

function bindModalEvents() {
  document.getElementById("modalCloseBtn").addEventListener("click", closeModal);
  document.getElementById("modalCancelBtn").addEventListener("click", closeModal);
  document.getElementById("modalOverlay").addEventListener("click", (e) => {
    if (e.target.id === "modalOverlay") closeModal();
  });

  document.getElementById("modalJenis").addEventListener("change", (e) => {
    modalState.level = e.target.value;
    updateModalFieldVisibility();
    populateModalCascade();
    suggestKode();
  });

  document.getElementById("modalKabupaten").addEventListener("change", () => {
    populateModalKecamatanOptions();
    suggestKode();
  });

  document.getElementById("modalKecamatan").addEventListener("change", () => {
    populateModalDesaOptions();
    suggestKode();
  });

  document.getElementById("modalDesa").addEventListener("change", suggestKode);

  document.getElementById("modalSaveBtn").addEventListener("click", saveWilayah);
}

function openModal(mode, level, id) {
  modalState.mode = mode;
  modalState.level = level;
  modalState.editingId = id;

  document.getElementById("modalTitle").textContent = mode === "add" ? "Tambah Wilayah" : "Edit Wilayah";
  document.getElementById("modalJenis").value = level;
  document.getElementById("modalJenis").disabled = mode === "edit";

  updateModalFieldVisibility();
  populateModalCascade();

  if (mode === "edit") {
    fillModalForEdit(level, id);
  } else {
    document.getElementById("modalNama").value = "";
    document.getElementById("modalKode").value = "";
    document.getElementById("modalDpt").value = "";
    document.getElementById("modalTarget").value = "";
    document.getElementById("modalStatus").value = "Aktif";
    suggestKode();
  }

  document.getElementById("modalOverlay").classList.add("open");
}

function closeModal() {
  document.getElementById("modalOverlay").classList.remove("open");
}

function updateModalFieldVisibility() {
  const level = modalState.level;
  const order = ["provinsi", "kabupaten", "kecamatan", "desa", "tps"];
  const idx = order.indexOf(level);

  toggleField("fieldKabupaten", idx >= 1);
  toggleField("fieldKecamatan", idx >= 2);
  toggleField("fieldDesa", idx >= 3);
  toggleField("fieldDptTarget", idx >= 2, true);

  document.getElementById("labelNama").textContent = level === "tps" ? "Nomor TPS" : "Nama Wilayah";
  document.getElementById("modalNama").placeholder = level === "tps" ? "cth. 001" : "cth. Samarinda Utara";
}

function toggleField(id, show, isRow) {
  const el = document.getElementById(id);
  if (show) el.classList.remove("hidden");
  else el.classList.add("hidden");
}

function populateModalCascade() {
  populateModalKabupatenOptions();
  populateModalKecamatanOptions();
  populateModalDesaOptions();
}

function populateModalKabupatenOptions() {
  const select = document.getElementById("modalKabupaten");
  select.innerHTML = kabupatenData
    .filter((k) => !k.deleted)
    .map((k) => `<option value="${k.id}">${k.nama}</option>`)
    .join("");
}

function populateModalKecamatanOptions() {
  const select = document.getElementById("modalKecamatan");
  const kabId = document.getElementById("modalKabupaten").value;

  select.innerHTML = kecamatanData
    .filter((k) => k.kabupatenId === kabId && !k.deleted)
    .map((k) => `<option value="${k.id}">${k.nama}</option>`)
    .join("");
}

function populateModalDesaOptions() {
  const select = document.getElementById("modalDesa");
  const kecId = document.getElementById("modalKecamatan").value;

  select.innerHTML = desaData
    .filter((d) => d.kecamatanId === kecId && !d.deleted)
    .map((d) => `<option value="${d.id}">${d.nama}</option>`)
    .join("");
}

function suggestKode() {
  const level = modalState.level;
  const kodeInput = document.getElementById("modalKode");
  if (modalState.mode === "edit") return; // jangan timpa kode saat edit

  if (level === "provinsi") {
    kodeInput.value = "64";
  } else if (level === "kabupaten") {
    kodeInput.value = `64.${String(kabupatenData.filter((k) => !k.deleted).length + 1).padStart(2, "0")}`;
  } else if (level === "kecamatan") {
    const kab = getKabupaten(document.getElementById("modalKabupaten").value);
    const count = kecamatanData.filter((k) => k.kabupatenId === kab?.id && !k.deleted).length;
    kodeInput.value = kab ? `${kab.kode}.${String(count + 1).padStart(2, "0")}` : "";
  } else if (level === "desa") {
    const kec = getKecamatan(document.getElementById("modalKecamatan").value);
    const count = desaData.filter((d) => d.kecamatanId === kec?.id && !d.deleted).length;
    kodeInput.value = kec ? `${kec.kode}.${String(count + 1).padStart(2, "0")}` : "";
  } else if (level === "tps") {
    const desa = getDesa(document.getElementById("modalDesa").value);
    const count = tpsData.filter((t) => t.desaId === desa?.id && !t.deleted).length;
    kodeInput.value = desa ? `${desa.kode}.${String(count + 1).padStart(3, "0")}` : "";
    document.getElementById("modalNama").value = String(count + 1).padStart(3, "0");
  }
}

function fillModalForEdit(level, id) {
  if (level === "provinsi") {
    const p = provinsiData.find((x) => x.id === id);
    document.getElementById("modalNama").value = p.nama;
    document.getElementById("modalKode").value = p.kode;
    document.getElementById("modalStatus").value = p.status;
  } else if (level === "kabupaten") {
    const k = kabupatenData.find((x) => x.id === id);
    document.getElementById("modalNama").value = k.nama;
    document.getElementById("modalKode").value = k.kode;
    document.getElementById("modalStatus").value = k.status;
  } else if (level === "kecamatan") {
    const k = kecamatanData.find((x) => x.id === id);
    document.getElementById("modalKabupaten").value = k.kabupatenId;
    populateModalKecamatanOptions();
    document.getElementById("modalNama").value = k.nama;
    document.getElementById("modalKode").value = k.kode;
    document.getElementById("modalDpt").value = k.dpt;
    document.getElementById("modalTarget").value = k.target;
    document.getElementById("modalStatus").value = k.status;
  } else if (level === "desa") {
    const d = desaData.find((x) => x.id === id);
    const kec = getKecamatan(d.kecamatanId);
    document.getElementById("modalKabupaten").value = kec.kabupatenId;
    populateModalKecamatanOptions();
    document.getElementById("modalKecamatan").value = kec.id;
    populateModalDesaOptions();
    document.getElementById("modalNama").value = d.nama;
    document.getElementById("modalKode").value = d.kode;
    document.getElementById("modalDpt").value = d.dpt;
    document.getElementById("modalTarget").value = d.target;
    document.getElementById("modalStatus").value = d.status;
  } else if (level === "tps") {
    const t = tpsData.find((x) => x.id === id);
    const desa = getDesa(t.desaId);
    const kec = getKecamatan(desa.kecamatanId);
    document.getElementById("modalKabupaten").value = kec.kabupatenId;
    populateModalKecamatanOptions();
    document.getElementById("modalKecamatan").value = kec.id;
    populateModalDesaOptions();
    document.getElementById("modalDesa").value = desa.id;
    document.getElementById("modalNama").value = t.nomor;
    document.getElementById("modalKode").value = t.kode;
    document.getElementById("modalDpt").value = t.dpt;
    document.getElementById("modalTarget").value = t.target;
    document.getElementById("modalStatus").value = t.status;
  }
}

/* =====================================================
   SAVE (Tambah / Edit) - in-memory
===================================================== */

function nextNumericId(prefix, arr) {
  const nums = arr.map((x) => Number(x.id.split("-")[1]) || 0);
  const max = nums.length ? Math.max(...nums) : 0;
  return `${prefix}-${max + 1}`;
}

function saveWilayah() {
  const level = modalState.level;
  const nama = document.getElementById("modalNama").value.trim();
  const kode = document.getElementById("modalKode").value.trim();
  const status = document.getElementById("modalStatus").value;

  if (!nama || !kode) {
    alert("Nama/Nomor dan Kode Wilayah wajib diisi.");
    return;
  }

  if (level === "provinsi") {
    if (modalState.mode === "add") {
      provinsiData.push({ id: nextNumericId("prov", provinsiData), kode, nama, status, deleted: false });
    } else {
      const p = provinsiData.find((x) => x.id === modalState.editingId);
      Object.assign(p, { kode, nama, status });
    }
  } else if (level === "kabupaten") {
    if (modalState.mode === "add") {
      kabupatenData.push({
        id: nextNumericId("kab", kabupatenData),
        kode,
        nama,
        provinsiId: "prov-1",
        status,
        deleted: false,
      });
      populateFilterDropdowns();
    } else {
      const k = kabupatenData.find((x) => x.id === modalState.editingId);
      Object.assign(k, { kode, nama, status });
    }
  } else if (level === "kecamatan") {
    const kabupatenId = document.getElementById("modalKabupaten").value;
    const dpt = Number(document.getElementById("modalDpt").value) || 0;
    const target = Number(document.getElementById("modalTarget").value) || 0;

    if (modalState.mode === "add") {
      kecamatanData.push({
        id: nextNumericId("kec", kecamatanData),
        kode,
        nama,
        kabupatenId,
        dpt,
        tps: 0,
        target,
        status,
        deleted: false,
      });
    } else {
      const k = kecamatanData.find((x) => x.id === modalState.editingId);
      Object.assign(k, { kode, nama, kabupatenId, dpt, target, status });
    }
  } else if (level === "desa") {
    const kecamatanId = document.getElementById("modalKecamatan").value;
    const dpt = Number(document.getElementById("modalDpt").value) || 0;
    const target = Number(document.getElementById("modalTarget").value) || 0;

    if (modalState.mode === "add") {
      desaData.push({
        id: nextNumericId("desa", desaData),
        kode,
        nama,
        kecamatanId,
        tpsCount: 0,
        dpt,
        target,
        status,
        deleted: false,
      });
    } else {
      const d = desaData.find((x) => x.id === modalState.editingId);
      Object.assign(d, { kode, nama, kecamatanId, dpt, target, status });
    }
  } else if (level === "tps") {
    const desaId = document.getElementById("modalDesa").value;
    const dpt = Number(document.getElementById("modalDpt").value) || 0;
    const target = Number(document.getElementById("modalTarget").value) || 0;

    if (modalState.mode === "add") {
      tpsData.push({
        id: nextNumericId("tps", tpsData),
        kode,
        nomor: nama,
        desaId,
        dpt,
        target,
        suaraAktual: 0,
        status,
        deleted: false,
      });
    } else {
      const t = tpsData.find((x) => x.id === modalState.editingId);
      Object.assign(t, { kode, nomor: nama, desaId, dpt, target, status });
    }
  }

  closeModal();

  // Pindah ke tab level yang baru saja ditambah/diedit supaya
  // hasilnya langsung terlihat
  const tabBtn = document.querySelector(`.tab[data-tab="${level}"]`);
  if (tabBtn) {
    document.querySelectorAll(".tab").forEach((b) => b.classList.remove("active"));
    tabBtn.classList.add("active");
    state.tab = level;
    updateFilterAvailability();
  }

  render();
}

/* =====================================================
   DELETE (soft delete)
===================================================== */

function confirmDelete(level, id) {
  const ok = confirm(
    "Hapus wilayah ini? Data tidak akan dihapus permanen (soft delete) karena mungkin sudah punya data TPS/suara terkait.",
  );
  if (!ok) return;

  const arrays = { provinsi: provinsiData, kabupaten: kabupatenData, kecamatan: kecamatanData, desa: desaData, tps: tpsData };
  const arr = arrays[level];
  const item = arr.find((x) => x.id === id);
  if (item) item.deleted = true;

  if (level === "kabupaten") populateFilterDropdowns();

  render();
}