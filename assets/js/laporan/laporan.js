/*=====================================================
  LAPORAN
=====================================================*/

/*=====================================================
  DUMMY DATA (mengikuti pola data modul lain)
=====================================================*/

const executiveData = {
  kondisiElektoral: "Kompetitif, unggul tipis di 2 dari 2 dapil",
  targetKemenangan: 84500,
  estimasiSaatIni: 62300,
  wilayahPrioritas: [
    { nama: "Kecamatan Samarinda Utara", score: 92 },
    { nama: "Kecamatan Tenggarong", score: 87 },
    { nama: "Kecamatan Sangatta Utara", score: 81 },
    { nama: "Kecamatan Bontang Utara", score: 73 },
  ],
  kekuatanKandidat: [
    { nama: "Ahmad Wijaya", ket: "Incumbent, basis kuat di Samarinda Utara" },
    { nama: "Citra Dewi", ket: "Suara tertinggi se-dapil, basis di Kutai Timur" },
  ],
  ancamanKompetitor: [
    { nama: "Calon A (Partai Lain)", ket: "Dominan di Kecamatan C, strength 91" },
  ],
};

const kompetitorData = [
  { nama: "Calon A", suara: 32421, strength: 91 },
  { nama: "Calon B", suara: 28912, strength: 84 },
  { nama: "Calon C", suara: 21442, strength: 76 },
  { nama: "Calon D", suara: 15200, strength: 62 },
];

const kompetitorWilayahDominasi = [
  { nama: "Kecamatan C", score: 88 },
  { nama: "Kecamatan F", score: 74 },
  { nama: "Kecamatan H", score: 65 },
];

const tpsPrioritas = [
  { tps: "001", dpt: 286, target: 86, score: 94 },
  { tps: "023", dpt: 301, target: 91, score: 92 },
  { tps: "087", dpt: 312, target: 95, score: 90 },
  { tps: "045", dpt: 275, target: 80, score: 87 },
  { tps: "102", dpt: 290, target: 84, score: 85 },
];

const wilayahDetail = [
  { nama: "Kecamatan Samarinda Utara", potensi: 92, target: 32000, historis: 24500, gap: 7500 },
  { nama: "Kecamatan Tenggarong", potensi: 87, target: 28500, historis: 21200, gap: 7300 },
  { nama: "Kecamatan Sangatta Utara", potensi: 81, target: 24000, historis: 19800, gap: 4200 },
  { nama: "Kecamatan Bontang Utara", potensi: 73, target: 18000, historis: 12100, gap: 5900 },
];

const targetData = {
  targetTotal: 84500,
  estimasiSaatIni: 62300,
  coverage: 73,
  breakdown: [
    { kabupaten: "Kabupaten A (Samarinda)", target: 32000 },
    { kabupaten: "Kabupaten B (Kutai Kartanegara)", target: 28500 },
    { kabupaten: "Kabupaten C (Kutai Timur)", target: 24000 },
  ],
  trend: [
    { tahun: 2019, suara: 48200 },
    { tahun: 2024, suara: 62300 },
    { tahun: 2029, suara: null },
  ],
};

const relawanSummary = {
  total: 428,
  aktif: 361,
  tpsCover: 812,
  coveragePercent: 63.2,
  wilayahKurang: [
    { nama: "Kecamatan D", tpsBelumCover: 8 },
    { nama: "Kecamatan E", tpsBelumCover: 7 },
    { nama: "Kecamatan F", tpsBelumCover: 5 },
  ],
  targetMingguan: 150,
  realisasi: 127,
  perWilayah: [
    { nama: "Kecamatan A", percent: 92 },
    { nama: "Kecamatan B", percent: 71 },
    { nama: "Kecamatan C", percent: 84 },
  ],
};

const rekomendasiUtama = [
  "Fokus pada Kecamatan Samarinda Utara karena memiliki potential score tertinggi (92).",
  "Terdapat gap sekitar 22.200 suara terhadap target kemenangan yang perlu dikejar sebelum periode pemilu.",
  "23 TPS potensial belum memiliki coverage relawan yang memadai, prioritaskan penempatan di Kecamatan D, E, dan F.",
  "Kompetitor utama (Calon A) memiliki dominasi kuat di Kecamatan C, perlu strategi khusus untuk merebut basis suaranya.",
];

const scheduledReports = [
  { nama: "Executive Report", jadwal: "Setiap Senin", jam: "08:00" },
  { nama: "TPS Priority Report", jadwal: "Setiap Jumat", jam: "17:00" },
];

const reportTypes = [
  { key: "executive", icon: "fa-briefcase", nama: "Executive Summary", desc: "Laporan ringkas untuk client/pimpinan." },
  { key: "wilayah", icon: "fa-map-location-dot", nama: "Analisis Wilayah", desc: "Menjawab: di mana kandidat harus fokus?" },
  { key: "target", icon: "fa-bullseye", nama: "Target Suara", desc: "Target kemenangan, estimasi, dan gap." },
  { key: "kompetitor", icon: "fa-users", nama: "Kompetitor", desc: "Analisis kekuatan & basis kompetitor." },
  { key: "tps", icon: "fa-map-pin", nama: "TPS Prioritas", desc: "TPS mana yang harus dikejar." },
  { key: "relawan", icon: "fa-user-group", nama: "Relawan", desc: "Coverage, aktivitas, dan performa relawan." },
];

let riwayatLaporan = [
  { id: 1, tanggal: "2026-08-13", nama: "Executive Report", jenis: "Executive Summary", wilayah: "Semua Wilayah", status: "Selesai" },
  { id: 2, tanggal: "2026-08-12", nama: "Analisis TPS", jenis: "TPS Prioritas", wilayah: "Kalimantan Timur 1", status: "Selesai" },
  { id: 3, tanggal: "2026-08-10", nama: "Competitor Report", jenis: "Kompetitor", wilayah: "Kalimantan Timur 1", status: "Selesai" },
  { id: 4, tanggal: "2026-08-05", nama: "Laporan Wilayah Q3", jenis: "Analisis Wilayah", wilayah: "Semua Wilayah", status: "Selesai" },
  { id: 5, tanggal: "2026-07-29", nama: "Target Suara Agustus", jenis: "Target Suara", wilayah: "Kalimantan Timur 2", status: "Selesai" },
];

let nextId = 6;
let lastPreview = null;
let currentPage = 1;
const PAGE_SIZE = 6;
const riwayatState = { search: "" };

/*=====================================================
  HELPERS
=====================================================*/

function formatNumber(value) {
  return new Intl.NumberFormat("id-ID").format(value);
}

function formatDate(dateStr) {
  if (!dateStr) return "-";
  return new Date(dateStr).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
}

/*=====================================================
  INIT
=====================================================*/

document.addEventListener("DOMContentLoaded", () => {
  bindEvents();
  renderKpiSummary();
  renderTabOverview();
  renderTabExecutive();
  renderTabWilayah();
  renderTabTarget();
  renderTabKompetitor();
  renderTabTps();
  renderTabRelawan();
  renderRiwayatTable();
});

function bindEvents() {
  document.querySelectorAll(".tab").forEach((tab) => {
    tab.addEventListener("click", () => switchTab(tab.dataset.tab));
  });

  document.getElementById("btnBuatLaporan").addEventListener("click", openBuilderModal);
  document.getElementById("modalCloseBtn").addEventListener("click", closeBuilderModal);
  document.getElementById("modalCancelBtn").addEventListener("click", closeBuilderModal);
  document.getElementById("builderModalOverlay").addEventListener("click", (e) => {
    if (e.target.id === "builderModalOverlay") closeBuilderModal();
  });

  document.querySelectorAll(".format-option").forEach((opt) => {
    opt.addEventListener("click", () => {
      document.querySelectorAll(".format-option").forEach((o) => o.classList.remove("selected"));
      opt.classList.add("selected");
    });
  });

  document.getElementById("builderForm").addEventListener("submit", (e) => {
    e.preventDefault();
    generateReport();
  });

  document.getElementById("searchRiwayat").addEventListener("input", (e) => {
    riwayatState.search = e.target.value.toLowerCase();
    currentPage = 1;
    renderRiwayatTable();
  });
}

function switchTab(key) {
  document.querySelectorAll(".tab").forEach((t) => t.classList.toggle("active", t.dataset.tab === key));
  document.querySelectorAll(".tab-panel").forEach((p) => p.classList.toggle("active", p.id === `panel-${key}`));
}

/*=====================================================
  SUMMARY CARDS
=====================================================*/

function renderKpiSummary() {
  const bulanIni = riwayatLaporan.filter((r) => r.tanggal.startsWith("2026-08")).length;
  const terbaru = riwayatLaporan.reduce((latest, r) => (r.tanggal > latest ? r.tanggal : latest), riwayatLaporan[0]?.tanggal || "");
  const terjadwal = scheduledReports.length;

  const cards = [
    { label: "Total Laporan", value: riwayatLaporan.length },
    { label: "Bulan Ini", value: bulanIni },
    { label: "Terbaru", value: formatDate(terbaru) },
    { label: "Terjadwal", value: terjadwal },
  ];

  document.getElementById("kpiSummaryGrid").innerHTML = cards
    .map((c) => `<div class="kpi-card"><span>${c.label}</span><h2 style="font-size:22px;">${c.value}</h2></div>`)
    .join("");
}

/*=====================================================
  TAB: OVERVIEW
=====================================================*/

function renderTabOverview() {
  document.getElementById("reportTypeGrid").innerHTML = reportTypes
    .map(
      (t) => `
        <div class="report-type-card" data-tab="${t.key}">
          <i class="fa-solid ${t.icon}"></i>
          <h4>${t.nama}</h4>
          <p>${t.desc}</p>
        </div>
      `
    )
    .join("");

  document.querySelectorAll(".report-type-card").forEach((card) => {
    card.addEventListener("click", () => switchTab(card.dataset.tab));
  });

  document.getElementById("scheduledList").innerHTML = scheduledReports
    .map(
      (s) => `
        <div class="scheduled-item">
          <div>
            <h4>${s.nama}</h4>
            <span>${s.jadwal}</span>
          </div>
          <div class="scheduled-time">${s.jam}</div>
        </div>
      `
    )
    .join("");

  renderPreview();
}

function renderPreview() {
  const container = document.getElementById("previewContent");

  if (!lastPreview) {
    container.innerHTML = `
      <div class="preview-empty">
        <i class="fa-solid fa-file-circle-plus"></i>
        <p>Belum ada laporan yang di-generate. Klik "Buat Laporan" untuk membuat preview.</p>
      </div>
    `;
    return;
  }

  const p = lastPreview;

  container.innerHTML = `
    <div class="preview-box">
      <div class="preview-masthead">
        <div class="brand">Political Intelligence 2029</div>
        <h2>${p.jenis}</h2>
        <div class="periode">Periode: ${p.periode} &middot; Wilayah: ${p.wilayah}</div>
      </div>

      ${p.komponen.includes("Summary") ? `
        <div class="preview-section">
          <h4>Executive Summary</h4>
          <ul>
            <li>Target kemenangan: ${formatNumber(executiveData.targetKemenangan)} suara</li>
            <li>Estimasi saat ini: ${formatNumber(executiveData.estimasiSaatIni)} suara</li>
            <li>Gap: ${formatNumber(executiveData.targetKemenangan - executiveData.estimasiSaatIni)} suara</li>
          </ul>
        </div>
      ` : ""}

      ${p.komponen.includes("Analisis Wilayah") ? `
        <div class="preview-section">
          <h4>Wilayah Prioritas</h4>
          <ol>
            ${executiveData.wilayahPrioritas.map((w) => `<li>${w.nama} &mdash; Score ${w.score}</li>`).join("")}
          </ol>
        </div>
      ` : ""}

      ${p.komponen.includes("Kompetitor") ? `
        <div class="preview-section">
          <h4>Competitor Snapshot</h4>
          <ul>
            ${kompetitorData.slice(0, 3).map((k) => `<li>${k.nama} &mdash; ${formatNumber(k.suara)} suara (strength ${k.strength})</li>`).join("")}
          </ul>
        </div>
      ` : ""}

      <div class="preview-section">
        <h4>Format</h4>
        <p style="font-size:14px;">${p.format}</p>
      </div>
    </div>
  `;
}

/*=====================================================
  TAB: EXECUTIVE
=====================================================*/

function renderTabExecutive() {
  const gap = executiveData.targetKemenangan - executiveData.estimasiSaatIni;

  const infoRows = [
    { label: "Kondisi Elektoral", value: executiveData.kondisiElektoral },
    { label: "Target Kemenangan", value: `${formatNumber(executiveData.targetKemenangan)} suara` },
    { label: "Estimasi Saat Ini", value: `${formatNumber(executiveData.estimasiSaatIni)} suara` },
    { label: "Gap", value: `${formatNumber(gap)} suara` },
  ];

  document.getElementById("executiveSummaryList").innerHTML = infoRows
    .map((r) => `<div class="detail-info-row"><span>${r.label}</span><strong>${r.value}</strong></div>`)
    .join("");

  const maxScore = Math.max(...executiveData.wilayahPrioritas.map((w) => w.score));
  document.getElementById("executiveWilayahBars").innerHTML = executiveData.wilayahPrioritas
    .map(
      (w, i) => `
        <div class="priority-item">
          <div class="priority-item-label">
            <span><span class="rank">#${i + 1}</span> ${w.nama}</span>
            <span>${w.score}</span>
          </div>
          <div class="priority-bar-track">
            <div class="priority-bar-fill" style="width:${(w.score / maxScore) * 100}%"></div>
          </div>
        </div>
      `
    )
    .join("");

  document.getElementById("executiveKandidatTable").innerHTML = `
    <thead><tr><th>Kandidat Kita</th><th>Keterangan</th></tr></thead>
    <tbody>
      ${executiveData.kekuatanKandidat.map((k) => `<tr><td class="highlight">${k.nama}</td><td>${k.ket}</td></tr>`).join("")}
    </tbody>
    <thead><tr><th>Ancaman Kompetitor</th><th>Keterangan</th></tr></thead>
    <tbody>
      ${executiveData.ancamanKompetitor.map((k) => `<tr><td class="highlight">${k.nama}</td><td>${k.ket}</td></tr>`).join("")}
    </tbody>
  `;

  document.getElementById("recommendationList").innerHTML = rekomendasiUtama
    .map((r, i) => `<div class="recommendation-item"><div class="recommendation-rank">${i + 1}</div><p>${r}</p></div>`)
    .join("");
}

/*=====================================================
  TAB: WILAYAH
=====================================================*/

function renderTabWilayah() {
  Highcharts.chart("wilayahChart", {
    chart: { type: "bar", backgroundColor: "transparent" },
    title: { text: null },
    credits: { enabled: false },
    xAxis: { categories: wilayahDetail.map((w) => w.nama) },
    yAxis: { title: { text: null }, max: 100 },
    legend: { enabled: false },
    series: [{ name: "Potential Score", data: wilayahDetail.map((w) => w.potensi), color: "#4f46e5", borderRadius: 6 }],
  });

  document.getElementById("wilayahDetailTable").innerHTML = `
    <thead>
      <tr><th>Wilayah</th><th>Potensi</th><th>Target</th><th>Historis</th><th>Gap</th></tr>
    </thead>
    <tbody>
      ${wilayahDetail
        .map(
          (w) => `
            <tr>
              <td>${w.nama}</td>
              <td class="highlight">${w.potensi}</td>
              <td>${formatNumber(w.target)}</td>
              <td>${formatNumber(w.historis)}</td>
              <td>${formatNumber(w.gap)}</td>
            </tr>
          `
        )
        .join("")}
    </tbody>
  `;
}

/*=====================================================
  TAB: TARGET
=====================================================*/

function renderTabTarget() {
  const gap = targetData.targetTotal - targetData.estimasiSaatIni;
  const percent = Math.round((targetData.estimasiSaatIni / targetData.targetTotal) * 100);

  document.getElementById("targetHeroGrid").innerHTML = `
    <div class="target-hero-stat">
      <span>Target Total Suara</span>
      <strong>${formatNumber(targetData.targetTotal)}</strong>
    </div>
    <div class="target-hero-stat">
      <span>Estimasi Saat Ini</span>
      <strong>${formatNumber(targetData.estimasiSaatIni)}</strong>
    </div>
    <div class="target-hero-stat gap">
      <span>Gap</span>
      <strong>${formatNumber(gap)}</strong>
    </div>
  `;

  document.getElementById("targetHeroFill").style.width = `${percent}%`;

  document.getElementById("targetBreakdownTable").innerHTML = `
    <thead><tr><th>Kabupaten</th><th>Target Suara</th></tr></thead>
    <tbody>
      ${targetData.breakdown.map((b) => `<tr><td>${b.kabupaten}</td><td class="highlight">${formatNumber(b.target)}</td></tr>`).join("")}
    </tbody>
  `;

  Highcharts.chart("trendChart", {
    chart: { type: "line", backgroundColor: "transparent" },
    title: { text: null },
    credits: { enabled: false },
    xAxis: { categories: targetData.trend.map((t) => t.tahun) },
    yAxis: { title: { text: null } },
    legend: { enabled: false },
    series: [
      {
        name: "Suara",
        data: targetData.trend.map((t) => t.suara),
        color: "#4f46e5",
        connectNulls: false,
      },
    ],
  });
}

/*=====================================================
  TAB: KOMPETITOR
=====================================================*/

function renderTabKompetitor() {
  document.getElementById("kompetitorTable").innerHTML = `
    <thead><tr><th>Calon</th><th>Suara</th><th>Strength</th></tr></thead>
    <tbody>
      ${kompetitorData
        .map((k) => `<tr><td>${k.nama}</td><td>${formatNumber(k.suara)}</td><td class="highlight">${k.strength}</td></tr>`)
        .join("")}
    </tbody>
  `;

  const terkuat = kompetitorData.reduce((max, k) => (k.strength > max.strength ? k : max), kompetitorData[0]);

  document.getElementById("kompetitorBasisList").innerHTML = `
    <div class="detail-info-row"><span>Kompetitor Terkuat</span><strong>${terkuat.nama}</strong></div>
    <div class="detail-info-row"><span>Strength Score</span><strong>${terkuat.strength}</strong></div>
    <div class="detail-info-row"><span>Basis Kompetitor</span><strong>${kompetitorWilayahDominasi[0].nama}</strong></div>
    <div class="detail-info-row"><span>Gap vs Kandidat Kita</span><strong>${formatNumber(kompetitorData[0].suara - executiveData.estimasiSaatIni)}</strong></div>
  `;

  const maxScore = Math.max(...kompetitorWilayahDominasi.map((w) => w.score));
  document.getElementById("kompetitorWilayahBars").innerHTML = kompetitorWilayahDominasi
    .map(
      (w, i) => `
        <div class="priority-item">
          <div class="priority-item-label">
            <span><span class="rank">#${i + 1}</span> ${w.nama}</span>
            <span>${w.score}</span>
          </div>
          <div class="priority-bar-track">
            <div class="priority-bar-fill" style="width:${(w.score / maxScore) * 100}%"></div>
          </div>
        </div>
      `
    )
    .join("");
}

/*=====================================================
  TAB: TPS
=====================================================*/

function renderTabTps() {
  document.getElementById("tpsPrioritasTable").innerHTML = `
    <thead><tr><th>TPS</th><th>DPT</th><th>Target</th><th>Score</th></tr></thead>
    <tbody>
      ${tpsPrioritas
        .map((t) => `<tr><td>${t.tps}</td><td>${formatNumber(t.dpt)}</td><td>${formatNumber(t.target)}</td><td class="highlight">${t.score}</td></tr>`)
        .join("")}
    </tbody>
  `;
}

/*=====================================================
  TAB: RELAWAN
=====================================================*/

function renderTabRelawan() {
  const cards = [
    { label: "Total Relawan", value: relawanSummary.total },
    { label: "Aktif", value: relawanSummary.aktif },
    { label: "TPS Tercover", value: relawanSummary.tpsCover },
    { label: "Coverage", value: `${relawanSummary.coveragePercent}%` },
  ];

  document.getElementById("relawanKpiGrid").innerHTML = cards
    .map((c) => `<div class="kpi-card"><span>${c.label}</span><h2 style="font-size:22px;">${c.value}</h2></div>`)
    .join("");

  document.getElementById("relawanKurangTable").innerHTML = `
    <thead><tr><th>Wilayah</th><th>TPS Belum Cover</th></tr></thead>
    <tbody>
      ${relawanSummary.wilayahKurang.map((w) => `<tr><td>${w.nama}</td><td class="highlight">${w.tpsBelumCover}</td></tr>`).join("")}
    </tbody>
  `;

  const percent = Math.round((relawanSummary.realisasi / relawanSummary.targetMingguan) * 100);
  document.getElementById("relawanTargetFill").style.width = `${percent}%`;

  document.getElementById("relawanTargetBars").innerHTML = relawanSummary.perWilayah
    .map(
      (w, i) => `
        <div class="priority-item">
          <div class="priority-item-label">
            <span><span class="rank">#${i + 1}</span> ${w.nama}</span>
            <span>${w.percent}%</span>
          </div>
          <div class="priority-bar-track">
            <div class="priority-bar-fill" style="width:${w.percent}%"></div>
          </div>
        </div>
      `
    )
    .join("");
}

/*=====================================================
  TAB: RIWAYAT
=====================================================*/

function getFilteredRiwayat() {
  return riwayatLaporan
    .filter((r) => !riwayatState.search || r.nama.toLowerCase().includes(riwayatState.search))
    .sort((a, b) => (a.tanggal < b.tanggal ? 1 : -1));
}

function renderRiwayatTable() {
  const data = getFilteredRiwayat();
  const tbody = document.getElementById("riwayatTable");

  const totalPages = Math.max(1, Math.ceil(data.length / PAGE_SIZE));
  if (currentPage > totalPages) currentPage = totalPages;

  const start = (currentPage - 1) * PAGE_SIZE;
  const pageData = data.slice(start, start + PAGE_SIZE);

  document.getElementById("dataCount").textContent = `${formatNumber(data.length)} Data`;

  if (!data.length) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;color:var(--text-light);padding:30px;">Tidak ada riwayat laporan yang cocok.</td></tr>`;
    renderPagination(0, totalPages);
    return;
  }

  tbody.innerHTML = pageData
    .map((r) => {
      const statusClass = r.status === "Selesai" ? "selesai" : r.status === "Terjadwal" ? "terjadwal" : "draft";

      return `
        <tr>
          <td>${formatDate(r.tanggal)}</td>
          <td><strong>${r.nama}</strong></td>
          <td>${r.jenis}</td>
          <td>${r.wilayah}</td>
          <td><span class="status-badge ${statusClass}">${r.status}</span></td>
          <td>
            <div class="row-actions">
              <button class="row-action-btn" data-action="lihat" data-id="${r.id}" title="Lihat"><i class="fa-solid fa-eye"></i></button>
              <button class="row-action-btn" data-action="export" data-id="${r.id}" title="Export"><i class="fa-solid fa-download"></i></button>
              <button class="row-action-btn delete-btn" data-action="hapus" data-id="${r.id}" title="Hapus"><i class="fa-solid fa-trash"></i></button>
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
      const item = riwayatLaporan.find((r) => r.id === id);
      if (!item) return;

      if (action === "lihat") {
        lastPreview = {
          jenis: item.jenis,
          periode: "Januari - Agustus 2026",
          wilayah: item.wilayah,
          komponen: ["Summary", "Analisis Wilayah", "Kompetitor"],
          format: "PDF",
        };
        switchTab("overview");
        renderPreview();
      }

      if (action === "export") {
        alert(`Laporan "${item.nama}" akan diexport (dummy - belum terhubung ke backend).`);
      }

      if (action === "hapus") {
        if (!confirm(`Hapus laporan "${item.nama}"?`)) return;
        riwayatLaporan = riwayatLaporan.filter((r) => r.id !== id);
        renderKpiSummary();
        renderRiwayatTable();
      }
    });
  });

  renderPagination(data.length, totalPages);
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
        renderRiwayatTable();
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      if (currentPage < totalPages) {
        currentPage++;
        renderRiwayatTable();
      }
    });
  }
}

/*=====================================================
  REPORT BUILDER
=====================================================*/

function openBuilderModal() {
  document.getElementById("builderModalOverlay").classList.add("open");
}

function closeBuilderModal() {
  document.getElementById("builderModalOverlay").classList.remove("open");
}

function generateReport() {
  const jenis = document.getElementById("builderJenis").value;
  const periodeAwal = document.getElementById("builderPeriodeAwal").value;
  const periodeAkhir = document.getElementById("builderPeriodeAkhir").value;
  const wilayah = document.getElementById("builderWilayah").value;
  const format = document.querySelector('input[name="format"]:checked').value;

  const komponen = [...document.querySelectorAll("#komponenGrid input:checked")].map((el) => el.value);

  lastPreview = {
    jenis,
    periode: `${periodeAwal} - ${periodeAkhir}`,
    wilayah,
    komponen,
    format,
  };

  const today = new Date().toISOString().slice(0, 10);
  riwayatLaporan.unshift({
    id: nextId++,
    tanggal: today,
    nama: `${jenis} ${wilayah !== "Semua Wilayah" ? "- " + wilayah : ""}`.trim(),
    jenis,
    wilayah,
    status: "Selesai",
  });

  closeBuilderModal();
  renderKpiSummary();
  renderRiwayatTable();
  switchTab("overview");
  renderPreview();
}