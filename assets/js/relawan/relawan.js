/*=====================================================
  RELAWAN
=====================================================*/

const avatarColors = ["#4f46e5", "#ec4899", "#06b6d4", "#16a34a", "#d97706", "#9333ea", "#dc2626", "#0891b2"];

const jabatanOptions = ["Koordinator Wilayah", "Koordinator Kabupaten", "Koordinator Kecamatan", "Relawan Desa"];

/*=====================================================
  STATE
=====================================================*/

let relawanData = [
  {
    id: 1,
    nama: "Ahmad Wijaya",
    kontak: "0812-3456-7890",
    kabupaten: "Samarinda",
    kecamatan: "Samarinda Utara",
    desa: "Sempaja",
    jabatan: "Koordinator Kecamatan",
    koordinator: "Budi Hartono",
    status: "Aktif",
    tanggalBergabung: "2026-01-12",
    catatan: "Koordinator paling aktif di wilayah Samarinda Utara.",
    avatarColor: "#4f46e5",
    tps: [
      { kode: "TPS 001", status: "tercover" },
      { kode: "TPS 002", status: "tercover" },
      { kode: "TPS 003", status: "sebagian" },
      { kode: "TPS 004", status: "belum" },
    ],
    aktivitas: [
      { tanggal: "2026-08-12", kegiatan: "Kunjungan TPS 001" },
      { tanggal: "2026-08-11", kegiatan: "Pertemuan warga" },
      { tanggal: "2026-08-10", kegiatan: "Pendataan pemilih" },
      { tanggal: "2026-08-09", kegiatan: "Koordinasi relawan" },
    ],
    score: { total: 87, aktivitas: 92, coverageTps: 88, kehadiran: 84, pelaporan: 91, konsistensi: 80 },
  },
  {
    id: 2,
    nama: "Siti Rahmawati",
    kontak: "0813-2233-4455",
    kabupaten: "Samarinda",
    kecamatan: "Samarinda Utara",
    desa: "Sempaja",
    jabatan: "Relawan Desa",
    koordinator: "Ahmad Wijaya",
    status: "Aktif",
    tanggalBergabung: "2026-02-03",
    catatan: "Fokus pendataan pemilih pemula.",
    avatarColor: "#ec4899",
    tps: [
      { kode: "TPS 005", status: "tercover" },
      { kode: "TPS 006", status: "tercover" },
    ],
    aktivitas: [
      { tanggal: "2026-08-11", kegiatan: "Sosialisasi program" },
      { tanggal: "2026-08-08", kegiatan: "Monitoring TPS 005" },
    ],
    score: { total: 74, aktivitas: 78, coverageTps: 70, kehadiran: 80, pelaporan: 72, konsistensi: 70 },
  },
  {
    id: 3,
    nama: "Andi Prasetyo",
    kontak: "0821-9988-7766",
    kabupaten: "Kutai Kartanegara",
    kecamatan: "Tenggarong",
    desa: "Timbau",
    jabatan: "Koordinator Kecamatan",
    koordinator: "Deni Saputra",
    status: "Nonaktif",
    tanggalBergabung: "2025-11-20",
    catatan: "Sedang cuti sementara, digantikan koordinator pengganti.",
    avatarColor: "#06b6d4",
    tps: [
      { kode: "TPS 010", status: "belum" },
      { kode: "TPS 011", status: "belum" },
      { kode: "TPS 012", status: "sebagian" },
    ],
    aktivitas: [{ tanggal: "2026-07-28", kegiatan: "Pelaporan bulanan" }],
    score: { total: 38, aktivitas: 30, coverageTps: 40, kehadiran: 35, pelaporan: 45, konsistensi: 40 },
  },
  {
    id: 4,
    nama: "Rina Kusuma",
    kontak: "0822-1122-3344",
    kabupaten: "Kutai Kartanegara",
    kecamatan: "Tenggarong",
    desa: "Loa Ipuh",
    jabatan: "Relawan Desa",
    koordinator: "Andi Prasetyo",
    status: "Aktif",
    tanggalBergabung: "2026-03-15",
    catatan: "",
    avatarColor: "#16a34a",
    tps: [
      { kode: "TPS 013", status: "tercover" },
      { kode: "TPS 014", status: "tercover" },
      { kode: "TPS 015", status: "tercover" },
    ],
    aktivitas: [
      { tanggal: "2026-08-12", kegiatan: "Kunjungan TPS 013" },
      { tanggal: "2026-08-10", kegiatan: "Koordinasi relawan" },
      { tanggal: "2026-08-05", kegiatan: "Pendataan pemilih" },
    ],
    score: { total: 91, aktivitas: 94, coverageTps: 95, kehadiran: 88, pelaporan: 90, konsistensi: 88 },
  },
  {
    id: 5,
    nama: "Deni Saputra",
    kontak: "0856-7788-9900",
    kabupaten: "Kutai Timur",
    kecamatan: "Sangatta Utara",
    desa: "Swarga Bara",
    jabatan: "Koordinator Kabupaten",
    koordinator: "-",
    status: "Aktif",
    tanggalBergabung: "2025-09-01",
    catatan: "Membawahi 3 kecamatan di Kutai Timur.",
    avatarColor: "#d97706",
    tps: [
      { kode: "TPS 020", status: "tercover" },
      { kode: "TPS 021", status: "sebagian" },
      { kode: "TPS 022", status: "belum" },
      { kode: "TPS 023", status: "belum" },
    ],
    aktivitas: [
      { tanggal: "2026-08-12", kegiatan: "Rapat koordinasi kabupaten" },
      { tanggal: "2026-08-07", kegiatan: "Monitoring TPS 021" },
    ],
    score: { total: 80, aktivitas: 82, coverageTps: 65, kehadiran: 90, pelaporan: 85, konsistensi: 78 },
  },
  {
    id: 6,
    nama: "Maya Anggraini",
    kontak: "0877-6655-4433",
    kabupaten: "Bontang",
    kecamatan: "Bontang Utara",
    desa: "Guntung",
    jabatan: "Relawan Desa",
    koordinator: "Deni Saputra",
    status: "Aktif",
    tanggalBergabung: "2026-04-22",
    catatan: "",
    avatarColor: "#9333ea",
    tps: [{ kode: "TPS 030", status: "sebagian" }],
    aktivitas: [{ tanggal: "2026-08-09", kegiatan: "Sosialisasi program" }],
    score: { total: 55, aktivitas: 50, coverageTps: 45, kehadiran: 60, pelaporan: 55, konsistensi: 65 },
  },
];

let nextId = 7;
let currentDetailId = null;

let currentPage = 1;
const PAGE_SIZE = 6;

const state = {
  kabupaten: "",
  kecamatan: "",
  koordinator: "",
  status: "",
  search: "",
};

/*=====================================================
  HELPERS
=====================================================*/

function formatNumber(value) {
  return new Intl.NumberFormat("id-ID").format(value);
}

function getInitials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function formatDate(dateStr) {
  if (!dateStr) return "-";
  return new Date(dateStr).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
}

function totalAktivitas(r) {
  return r.aktivitas.length;
}

/*=====================================================
  INIT
=====================================================*/

document.addEventListener("DOMContentLoaded", () => {
  populateFilterOptions();
  bindEvents();
  renderKpiSummary();
  renderQuickStats();
  renderTable();
  renderOrgTree();
  renderCoverageOverview();
  renderTargetRealisasi();
});

function populateFilterOptions() {
  const kabupatenSet = [...new Set(relawanData.map((r) => r.kabupaten))];
  const kecamatanSet = [...new Set(relawanData.map((r) => r.kecamatan))];
  const koordinatorSet = [...new Set(relawanData.map((r) => r.koordinator).filter((k) => k && k !== "-"))];

  const fKab = document.getElementById("filterKabupaten");
  const fKec = document.getElementById("filterKecamatan");
  const fKoor = document.getElementById("filterKoordinator");

  fKab.querySelectorAll("option:not(:first-child)").forEach((o) => o.remove());
  fKec.querySelectorAll("option:not(:first-child)").forEach((o) => o.remove());
  fKoor.querySelectorAll("option:not(:first-child)").forEach((o) => o.remove());

  kabupatenSet.forEach((k) => fKab.insertAdjacentHTML("beforeend", `<option>${k}</option>`));
  kecamatanSet.forEach((k) => fKec.insertAdjacentHTML("beforeend", `<option>${k}</option>`));
  koordinatorSet.forEach((k) => fKoor.insertAdjacentHTML("beforeend", `<option>${k}</option>`));
}

/*=====================================================
  EVENTS
=====================================================*/

function bindEvents() {
  document.getElementById("filterKabupaten").addEventListener("change", (e) => {
    state.kabupaten = e.target.value;
    currentPage = 1;
    renderTable();
  });

  document.getElementById("filterKecamatan").addEventListener("change", (e) => {
    state.kecamatan = e.target.value;
    currentPage = 1;
    renderTable();
  });

  document.getElementById("filterKoordinator").addEventListener("change", (e) => {
    state.koordinator = e.target.value;
    currentPage = 1;
    renderTable();
  });

  document.getElementById("filterStatus").addEventListener("change", (e) => {
    state.status = e.target.value;
    currentPage = 1;
    renderTable();
  });

  document.getElementById("searchRelawan").addEventListener("input", (e) => {
    state.search = e.target.value.toLowerCase();
    currentPage = 1;
    renderTable();
  });

  document.getElementById("resetFilterBtn").addEventListener("click", () => {
    state.kabupaten = "";
    state.kecamatan = "";
    state.koordinator = "";
    state.status = "";
    state.search = "";
    currentPage = 1;

    document.getElementById("filterKabupaten").value = "";
    document.getElementById("filterKecamatan").value = "";
    document.getElementById("filterKoordinator").value = "";
    document.getElementById("filterStatus").value = "";
    document.getElementById("searchRelawan").value = "";

    renderTable();
  });

  document.getElementById("btnTambahRelawan").addEventListener("click", () => openModal());
  document.getElementById("modalCloseBtn").addEventListener("click", closeModal);
  document.getElementById("modalCancelBtn").addEventListener("click", closeModal);
  document.getElementById("relawanModalOverlay").addEventListener("click", (e) => {
    if (e.target.id === "relawanModalOverlay") closeModal();
  });

  document.getElementById("relawanForm").addEventListener("submit", (e) => {
    e.preventDefault();
    saveRelawan();
  });

  document.getElementById("btnBackToList").addEventListener("click", () => {
    document.getElementById("detailView").style.display = "none";
    document.getElementById("listView").style.display = "flex";
    currentDetailId = null;
  });

  document.getElementById("btnEditFromDetail").addEventListener("click", () => {
    if (currentDetailId) openModal(currentDetailId);
  });
}

/*=====================================================
  1. OVERVIEW (KPI + QUICK STATS)
=====================================================*/

function renderKpiSummary() {
  const total = relawanData.length;
  const aktif = relawanData.filter((r) => r.status === "Aktif").length;
  const wilayah = new Set(relawanData.map((r) => r.kecamatan)).size;
  const allTps = relawanData.flatMap((r) => r.tps);
  const tpsCovered = new Set(allTps.filter((t) => t.status !== "belum").map((t) => t.kode)).size;

  const cards = [
    { label: "Total Relawan", value: total },
    { label: "Relawan Aktif", value: aktif },
    { label: "Wilayah", value: wilayah },
    { label: "TPS Tercover", value: tpsCovered },
  ];

  document.getElementById("kpiSummaryGrid").innerHTML = cards
    .map((c) => `<div class="kpi-card"><span>${c.label}</span><h2>${formatNumber(c.value)}</h2></div>`)
    .join("");
}

function renderQuickStats() {
  const total = relawanData.length;
  const aktif = relawanData.filter((r) => r.status === "Aktif").length;
  const aktifPercent = total ? Math.round((aktif / total) * 100) : 0;

  const allTps = relawanData.flatMap((r) => r.tps);
  const uniqueTps = new Set(allTps.map((t) => t.kode)).size || 1;
  const tpsCovered = new Set(allTps.filter((t) => t.status !== "belum").map((t) => t.kode)).size;
  const coveragePercent = Math.round((tpsCovered / uniqueTps) * 100);

  const aktivitasMingguIni = relawanData.reduce((sum, r) => sum + totalAktivitas(r), 0);

  const stats = [
    { label: "Relawan Aktif", value: `${aktifPercent}%`, percent: aktifPercent },
    { label: "TPS Tercover", value: `${coveragePercent}%`, percent: coveragePercent },
    { label: "Aktivitas Minggu Ini", value: formatNumber(aktivitasMingguIni), percent: Math.min(100, aktivitasMingguIni) },
  ];

  document.getElementById("quickStatsRow").innerHTML = stats
    .map(
      (s) => `
        <div class="quick-stat-card">
          <div class="quick-stat-card-top"><span>${s.label}</span><strong>${s.value}</strong></div>
          <div class="quick-stat-bar-track"><div class="quick-stat-bar-fill" style="width:${s.percent}%"></div></div>
        </div>
      `
    )
    .join("");
}

/*=====================================================
  2. FILTER + TABEL
=====================================================*/

function getFilteredRelawan() {
  return relawanData.filter((r) => {
    if (state.kabupaten && r.kabupaten !== state.kabupaten) return false;
    if (state.kecamatan && r.kecamatan !== state.kecamatan) return false;
    if (state.koordinator && r.koordinator !== state.koordinator) return false;
    if (state.status && r.status !== state.status) return false;
    if (state.search && !r.nama.toLowerCase().includes(state.search)) return false;
    return true;
  });
}

function renderTable() {
  const data = getFilteredRelawan();
  const tbody = document.getElementById("relawanTable");

  const totalPages = Math.max(1, Math.ceil(data.length / PAGE_SIZE));
  if (currentPage > totalPages) currentPage = totalPages;

  const start = (currentPage - 1) * PAGE_SIZE;
  const pageData = data.slice(start, start + PAGE_SIZE);

  updateDataCount(data.length);

  if (!data.length) {
    tbody.innerHTML = `<tr><td colspan="8" style="text-align:center;color:var(--text-light);padding:30px;">Tidak ada data relawan yang cocok.</td></tr>`;
    renderPagination(0, totalPages);
    return;
  }

  tbody.innerHTML = pageData
    .map((r, i) => {
      const statusClass = r.status === "Aktif" ? "aktif" : "nonaktif";

      return `
        <tr>
          <td>${start + i + 1}</td>
          <td>
            <div class="relawan-name-cell">
              <div class="relawan-avatar" style="background:${r.avatarColor}">${getInitials(r.nama)}</div>
              <div>
                <strong>${r.nama}</strong><br>
                <small>${r.jabatan}</small>
              </div>
            </div>
          </td>
          <td>${r.kecamatan}</td>
          <td>${r.tps.length}</td>
          <td>${r.koordinator}</td>
          <td><span class="status-badge ${statusClass}">${r.status}</span></td>
          <td>${totalAktivitas(r)}</td>
          <td>
            <div class="row-actions">
              <button class="row-action-btn" data-action="detail" data-id="${r.id}" title="Detail"><i class="fa-solid fa-eye"></i></button>
              <button class="row-action-btn" data-action="edit" data-id="${r.id}" title="Edit"><i class="fa-solid fa-pen"></i></button>
              <button class="row-action-btn delete-btn" data-action="delete" data-id="${r.id}" title="Hapus"><i class="fa-solid fa-trash"></i></button>
            </div>
          </td>
        </tr>
      `;
    })
    .join("");

  tbody.querySelectorAll(".row-action-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = Number(btn.dataset.id);
      const action = btn.dataset.action;

      if (action === "detail") openDetail(id);
      if (action === "edit") openModal(id);
      if (action === "delete") deleteRelawan(id);
    });
  });

  renderPagination(data.length, totalPages);
}

function updateDataCount(total) {
  document.getElementById("dataCount").textContent = `${formatNumber(total)} Data`;
}

function renderPagination(totalData, totalPages) {
  const el = document.getElementById("pagination");

  if (!totalData) {
    el.innerHTML = "";
    return;
  }

  el.innerHTML = `
    <button id="pagPrev" ${currentPage === 1 ? "disabled" : ""}>&laquo; Sebelumnya</button>
    <span>Halaman ${currentPage} dari ${totalPages}</span>
    <button id="pagNext" ${currentPage === totalPages ? "disabled" : ""}>Selanjutnya &raquo;</button>
  `;

  const prevBtn = document.getElementById("pagPrev");
  const nextBtn = document.getElementById("pagNext");

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        renderTable();
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      if (currentPage < totalPages) {
        currentPage++;
        renderTable();
      }
    });
  }
}

/*=====================================================
  3. STRUKTUR ORGANISASI (Kecamatan -> Desa -> relawan)
=====================================================*/

function renderOrgTree() {
  const byKecamatan = {};

  relawanData.forEach((r) => {
    if (!byKecamatan[r.kecamatan]) byKecamatan[r.kecamatan] = {};
    if (!byKecamatan[r.kecamatan][r.desa]) byKecamatan[r.kecamatan][r.desa] = [];
    byKecamatan[r.kecamatan][r.desa].push(r);
  });

  const html = Object.entries(byKecamatan)
    .map(([kecamatan, desaMap]) => {
      const totalRelawan = Object.values(desaMap).flat().length;
      const totalTps = Object.values(desaMap).flat().reduce((s, r) => s + r.tps.length, 0);

      const children = Object.entries(desaMap)
        .map(
          ([desa, list]) => `
            <div class="org-child-item">
              ${desa}
              <small>${list.length} relawan &middot; ${list.reduce((s, r) => s + r.tps.length, 0)} TPS</small>
            </div>
          `
        )
        .join("");

      return `
        <div class="org-node">
          <div class="org-node-header" data-toggle>
            <span>
              ${kecamatan}
              <span class="org-role">${totalRelawan} relawan &middot; ${totalTps} TPS</span>
            </span>
            <i class="fa-solid fa-chevron-down"></i>
          </div>
          <div class="org-children">${children}</div>
        </div>
      `;
    })
    .join("");

  const el = document.getElementById("orgTree");
  el.innerHTML = html;

  el.querySelectorAll(".org-node-header").forEach((header) => {
    header.addEventListener("click", () => {
      header.closest(".org-node").classList.toggle("open");
    });
  });
}

/*=====================================================
  4/5. COVERAGE TPS (overview seluruh relawan)
=====================================================*/

function renderCoverageOverview() {
  const allTps = relawanData.flatMap((r) => r.tps);
  const seen = new Map();

  allTps.forEach((t) => {
    if (!seen.has(t.kode)) seen.set(t.kode, t.status);
  });

  const tpsList = [...seen.entries()].sort((a, b) => a[0].localeCompare(b[0]));

  document.getElementById("coverageSubtitle").textContent = `${tpsList.length} TPS terdata`;

  document.getElementById("tpsCoverageGrid").innerHTML = tpsList
    .map(([kode, status]) => `<span class="tps-dot ${status}">${kode}</span>`)
    .join("");
}

/*=====================================================
  7. TARGET VS REALISASI
=====================================================*/

function renderTargetRealisasi() {
  const targetMingguan = 150;
  const realisasi = relawanData.reduce((sum, r) => sum + totalAktivitas(r), 0);
  const percent = Math.min(100, Math.round((realisasi / targetMingguan) * 100));

  document.getElementById("targetAngka").textContent = formatNumber(targetMingguan);
  document.getElementById("targetRealisasi").textContent = formatNumber(realisasi);
  document.getElementById("targetPercent").textContent = `${percent}%`;
  document.getElementById("targetHeroFill").style.width = `${percent}%`;

  const byKecamatan = {};
  relawanData.forEach((r) => {
    if (!byKecamatan[r.kecamatan]) byKecamatan[r.kecamatan] = { target: 0, realisasi: 0 };
    byKecamatan[r.kecamatan].target += 30;
    byKecamatan[r.kecamatan].realisasi += totalAktivitas(r);
  });

  const entries = Object.entries(byKecamatan).sort((a, b) => b[1].realisasi / b[1].target - a[1].realisasi / a[1].target);

  document.getElementById("targetPerWilayah").innerHTML = entries
    .map(([kec, v], i) => {
      const pct = Math.min(100, Math.round((v.realisasi / v.target) * 100));
      return `
        <div class="priority-item">
          <div class="priority-item-label">
            <span><span class="rank">#${i + 1}</span> ${kec}</span>
            <span>${pct}%</span>
          </div>
          <div class="priority-bar-track">
            <div class="priority-bar-fill" style="width:${pct}%"></div>
          </div>
        </div>
      `;
    })
    .join("");
}

/*=====================================================
  MODAL TAMBAH / EDIT
=====================================================*/

function buildTpsCheckboxes(selectedTps = []) {
  const allTps = [...new Set(relawanData.flatMap((r) => r.tps.map((t) => t.kode)))].sort();
  const selectedKodes = selectedTps.map((t) => t.kode);

  const extra = [];
  for (let i = 1; i <= 5; i++) {
    const kode = `TPS ${String(100 + i)}`;
    if (!allTps.includes(kode)) extra.push(kode);
  }

  const options = [...allTps, ...extra];

  document.getElementById("tpsCheckboxGrid").innerHTML = options
    .map(
      (kode) => `
        <label class="checkbox-item">
          <input type="checkbox" value="${kode}" ${selectedKodes.includes(kode) ? "checked" : ""} />
          ${kode}
        </label>
      `
    )
    .join("");
}

function openModal(id = null) {
  const form = document.getElementById("relawanForm");
  form.reset();

  if (id) {
    const r = relawanData.find((x) => x.id === id);
    if (!r) return;

    document.getElementById("modalTitle").textContent = "Edit Relawan";
    document.getElementById("formId").value = r.id;
    document.getElementById("formNama").value = r.nama;
    document.getElementById("formKontak").value = r.kontak;
    document.getElementById("formKabupaten").value = r.kabupaten;
    document.getElementById("formKecamatan").value = r.kecamatan;
    document.getElementById("formDesa").value = r.desa;
    document.getElementById("formJabatan").value = r.jabatan;
    document.getElementById("formKoordinator").value = r.koordinator;
    document.getElementById("formStatus").value = r.status;
    document.getElementById("formTanggalBergabung").value = r.tanggalBergabung;
    document.getElementById("formCatatan").value = r.catatan;

    buildTpsCheckboxes(r.tps);
  } else {
    document.getElementById("modalTitle").textContent = "Tambah Relawan";
    document.getElementById("formId").value = "";
    document.getElementById("formKabupaten").value = "Samarinda";

    buildTpsCheckboxes([]);
  }

  document.getElementById("relawanModalOverlay").classList.add("open");
}

function closeModal() {
  document.getElementById("relawanModalOverlay").classList.remove("open");
}

function saveRelawan() {
  const id = document.getElementById("formId").value;

  const selectedTpsKodes = [...document.querySelectorAll("#tpsCheckboxGrid input:checked")].map((el) => el.value);

  const payload = {
    nama: document.getElementById("formNama").value.trim(),
    kontak: document.getElementById("formKontak").value.trim(),
    kabupaten: document.getElementById("formKabupaten").value.trim(),
    kecamatan: document.getElementById("formKecamatan").value.trim(),
    desa: document.getElementById("formDesa").value.trim(),
    jabatan: document.getElementById("formJabatan").value,
    koordinator: document.getElementById("formKoordinator").value.trim(),
    status: document.getElementById("formStatus").value,
    tanggalBergabung: document.getElementById("formTanggalBergabung").value,
    catatan: document.getElementById("formCatatan").value.trim(),
  };

  if (id) {
    const idx = relawanData.findIndex((x) => x.id === Number(id));
    if (idx !== -1) {
      const existingTps = relawanData[idx].tps;
      const tps = selectedTpsKodes.map((kode) => {
        const found = existingTps.find((t) => t.kode === kode);
        return found || { kode, status: "belum" };
      });

      relawanData[idx] = { ...relawanData[idx], ...payload, tps };
    }
  } else {
    relawanData.push({
      id: nextId++,
      ...payload,
      avatarColor: avatarColors[relawanData.length % avatarColors.length],
      tps: selectedTpsKodes.map((kode) => ({ kode, status: "belum" })),
      aktivitas: [],
      score: { total: 0, aktivitas: 0, coverageTps: 0, kehadiran: 0, pelaporan: 0, konsistensi: 0 },
    });
  }

  closeModal();
  populateFilterOptions();
  renderKpiSummary();
  renderQuickStats();
  renderTable();
  renderOrgTree();
  renderCoverageOverview();
  renderTargetRealisasi();

  if (currentDetailId && String(currentDetailId) === String(id)) {
    openDetail(currentDetailId);
  }
}

function deleteRelawan(id) {
  if (!confirm("Hapus data relawan ini? Tindakan ini tidak bisa dibatalkan.")) return;

  relawanData = relawanData.filter((r) => r.id !== id);
  renderKpiSummary();
  renderQuickStats();
  renderTable();
  renderOrgTree();
  renderCoverageOverview();
  renderTargetRealisasi();
}

/*=====================================================
  DETAIL VIEW
=====================================================*/

function openDetail(id) {
  const r = relawanData.find((x) => x.id === id);
  if (!r) return;

  currentDetailId = id;

  document.getElementById("listView").style.display = "none";
  document.getElementById("detailView").style.display = "flex";

  renderDetail(r);
}

function renderDetail(r) {
  document.getElementById("detailAvatar").style.background = r.avatarColor;
  document.getElementById("detailAvatar").textContent = getInitials(r.nama);
  document.getElementById("detailJabatan").textContent = r.jabatan;
  document.getElementById("detailNama").textContent = r.nama;
  document.getElementById("detailWilayahInfo").textContent = `${r.kecamatan}, ${r.kabupaten}`;

  const tpsCovered = r.tps.filter((t) => t.status !== "belum").length;
  const coveragePercent = r.tps.length ? Math.round((tpsCovered / r.tps.length) * 100) : 0;

  const detailKpis = [
    { label: "TPS Ditangani", value: r.tps.length },
    { label: "Aktivitas", value: totalAktivitas(r) },
    { label: "Coverage", value: `${coveragePercent}%` },
    { label: "Performance", value: r.score.total },
  ];

  document.getElementById("detailKpiGrid").innerHTML = detailKpis
    .map((k) => `<div class="kpi-card"><span>${k.label}</span><h2 style="font-size:20px;">${k.value}</h2></div>`)
    .join("");

  const infoRows = [
    { label: "Nomor Kontak", value: r.kontak },
    { label: "Status", value: r.status },
    { label: "Koordinator", value: r.koordinator },
    { label: "Kabupaten/Kota", value: r.kabupaten },
    { label: "Kecamatan", value: r.kecamatan },
    { label: "Desa/Kelurahan", value: r.desa },
    { label: "Tanggal Bergabung", value: formatDate(r.tanggalBergabung) },
  ];

  document.getElementById("detailInfoList").innerHTML = infoRows
    .map((row) => `<div class="detail-info-row"><span>${row.label}</span><strong>${row.value}</strong></div>`)
    .join("");

  renderScore(r);
  renderDetailTps(r);
  renderActivityTimeline(r);
}

function renderScore(r) {
  document.getElementById("scoreTotal").textContent = r.score.total;
  document.getElementById("scoreHeroFill").style.width = `${r.score.total}%`;

  let tag = { text: "Inactive", cls: "inactive" };
  if (r.score.total >= 85) tag = { text: "High Performance", cls: "high" };
  else if (r.score.total >= 65) tag = { text: "Good", cls: "good" };
  else if (r.score.total >= 40) tag = { text: "Need Attention", cls: "attention" };

  const tagEl = document.getElementById("scoreTag");
  tagEl.textContent = tag.text;
  tagEl.className = `score-hero-tag ${tag.cls}`;

  const items = [
    { label: "Aktivitas", value: r.score.aktivitas },
    { label: "Coverage TPS", value: r.score.coverageTps },
    { label: "Kehadiran", value: r.score.kehadiran },
    { label: "Pelaporan", value: r.score.pelaporan },
    { label: "Konsistensi", value: r.score.konsistensi },
  ];

  document.getElementById("scoreBreakdown").innerHTML = items
    .map(
      (i) => `
        <div class="score-item">
          <div class="score-item-label"><span>${i.label}</span><strong>${i.value}</strong></div>
          <div class="score-bar-track"><div class="score-bar-fill" style="width:${i.value}%"></div></div>
        </div>
      `
    )
    .join("");
}

function renderDetailTps(r) {
  if (!r.tps.length) {
    document.getElementById("detailTpsGrid").innerHTML = `<p style="color:var(--text-light);font-size:13px;">Belum ada TPS yang ditugaskan.</p>`;
    return;
  }

  document.getElementById("detailTpsGrid").innerHTML = r.tps
    .map((t) => `<span class="tps-dot ${t.status}">${t.kode}</span>`)
    .join("");
}

function renderActivityTimeline(r) {
  const container = document.getElementById("activityTimeline");

  if (!r.aktivitas.length) {
    container.innerHTML = `<p style="color:var(--text-light);font-size:13px;">Belum ada aktivitas tercatat.</p>`;
    return;
  }

  const sorted = [...r.aktivitas].sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal));

  container.innerHTML = sorted
    .map(
      (a) => `
        <div class="activity-day">
          <div class="activity-date">${formatDate(a.tanggal)}</div>
          <div class="activity-item"><i class="fa-solid fa-circle-check"></i> ${a.kegiatan}</div>
        </div>
      `
    )
    .join("");
}