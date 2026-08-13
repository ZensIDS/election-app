/**
 * =====================================================
 * POLITICAL INTELLIGENCE 2029
 * Data Dapil - Master Data Controller
 * =====================================================
 *
 * CATATAN:
 * State in-memory (sama seperti wilayah.js) - refresh
 * halaman akan mengembalikan ke data dummy awal.
 * DPT & TPS setiap dapil TIDAK diinput manual, tapi
 * dihitung otomatis dari kabupaten/kota yang dicentang
 * (lihat wilayahMaster di bawah).
 * =====================================================
 */

/* =====================================================
   MASTER WILAYAH (sumber DPT/TPS & struktur kecamatan)
   Nanti idealnya ini datang dari Data Wilayah, bukan
   dihardcode di sini.
===================================================== */

const wilayahMaster = {
  "Samarinda": { dpt: 620000, tps: 850, kecamatan: ["Samarinda Ulu", "Samarinda Ilir", "Samarinda Utara"] },
  "Balikpapan": { dpt: 580000, tps: 780, kecamatan: ["Balikpapan Utara", "Balikpapan Selatan", "Balikpapan Timur"] },
  "Bontang": { dpt: 150000, tps: 210, kecamatan: ["Bontang Utara", "Bontang Selatan", "Bontang Barat"] },
  "Kutai Kartanegara": { dpt: 420000, tps: 560, kecamatan: ["Tenggarong", "Tenggarong Seberang", "Loa Janan"] },
  "Kutai Timur": { dpt: 280000, tps: 380, kecamatan: ["Sangatta Utara", "Sangatta Selatan", "Bengalon"] },
  "Kutai Barat": { dpt: 140000, tps: 190, kecamatan: ["Barong Tongkok", "Melak", "Long Iram"] },
  "Paser": { dpt: 160000, tps: 220, kecamatan: ["Tanah Grogot", "Batu Sopang", "Long Ikis"] },
  "Penajam Paser Utara": { dpt: 130000, tps: 175, kecamatan: ["Penajam", "Sepaku", "Waru"] },
};

/* =====================================================
   STATE: DAFTAR DAPIL (in-memory)
===================================================== */

let dapilData = [
  {
    id: 1,
    kode: "KALTIM-01",
    nama: "Kalimantan Timur 1",
    jenisPemilu: "DPR RI",
    provinsi: "Kalimantan Timur",
    kursi: 8,
    status: "Aktif",
    wilayah: ["Samarinda", "Kutai Kartanegara", "Kutai Timur", "Bontang"],
    suaraHistoris: [
      { tahun: 2019, suara: 72450 },
      { tahun: 2024, suara: 81200 },
    ],
    targetSuara: 95000,
    wilayahPrioritas: [
      { nama: "Samarinda Utara", capaian: 92 },
      { nama: "Tenggarong", capaian: 78 },
      { nama: "Bontang Barat", capaian: 71 },
      { nama: "Sangatta Utara", capaian: 64 },
      { nama: "Loa Janan", capaian: 55 },
    ],
  },
  {
    id: 2,
    kode: "KALTIM-02",
    nama: "Kalimantan Timur 2",
    jenisPemilu: "DPR RI",
    provinsi: "Kalimantan Timur",
    kursi: 6,
    status: "Aktif",
    wilayah: ["Balikpapan", "Paser", "Kutai Barat", "Penajam Paser Utara"],
    suaraHistoris: [
      { tahun: 2019, suara: 58200 },
      { tahun: 2024, suara: 66700 },
    ],
    targetSuara: 80000,
    wilayahPrioritas: [
      { nama: "Balikpapan Selatan", capaian: 88 },
      { nama: "Tanah Grogot", capaian: 74 },
      { nama: "Penajam", capaian: 69 },
      { nama: "Barong Tongkok", capaian: 60 },
      { nama: "Waru", capaian: 52 },
    ],
  },
];

let nextId = 3;
let currentDetailId = null;

const state = {
  provinsi: "",
  jenis: "",
  status: "",
  search: "",
};

const PAGE_SIZE = 5;
let currentPage = 1;

/* =====================================================
   HELPERS
===================================================== */

function formatNumber(n) {
  return Math.round(n).toLocaleString("id-ID");
}

function computeDpt(wilayahArr) {
  return wilayahArr.reduce((s, w) => s + (wilayahMaster[w]?.dpt || 0), 0);
}

function computeTps(wilayahArr) {
  return wilayahArr.reduce((s, w) => s + (wilayahMaster[w]?.tps || 0), 0);
}

/* =====================================================
   INIT
===================================================== */

document.addEventListener("DOMContentLoaded", () => {
  bindFilterEvents();
  bindModalEvents();
  bindDetailEvents();

  renderTable();
});

/* =====================================================
   LIST VIEW: FILTER + TABLE
===================================================== */

function bindFilterEvents() {
  document.getElementById("filterProvinsi").addEventListener("change", (e) => {
    state.provinsi = e.target.value;
    currentPage = 1;
    renderTable();
  });

  document.getElementById("filterJenis").addEventListener("change", (e) => {
    state.jenis = e.target.value;
    currentPage = 1;
    renderTable();
  });

  document.getElementById("filterStatus").addEventListener("change", (e) => {
    state.status = e.target.value;
    currentPage = 1;
    renderTable();
  });

  document.getElementById("searchDapil").addEventListener("input", (e) => {
    state.search = e.target.value.toLowerCase();
    currentPage = 1;
    renderTable();
  });

  document.getElementById("resetFilterBtn").addEventListener("click", () => {
    state.provinsi = "";
    state.jenis = "";
    state.status = "";
    state.search = "";
    currentPage = 1;

    document.getElementById("filterProvinsi").value = "";
    document.getElementById("filterJenis").value = "";
    document.getElementById("filterStatus").value = "";
    document.getElementById("searchDapil").value = "";

    renderTable();
  });
}

function getFilteredDapil() {
  return dapilData.filter((d) => {
    if (state.provinsi && d.provinsi !== state.provinsi) return false;
    if (state.jenis && d.jenisPemilu !== state.jenis) return false;
    if (state.status && d.status !== state.status) return false;

    if (state.search) {
      const haystack = (d.nama + " " + d.kode).toLowerCase();
      if (!haystack.includes(state.search)) return false;
    }

    return true;
  });
}

function renderTable() {
  const data = getFilteredDapil();
  const tbody = document.getElementById("dapilTable");

  const totalPages = Math.max(1, Math.ceil(data.length / PAGE_SIZE));
  if (currentPage > totalPages) currentPage = totalPages;

  const start = (currentPage - 1) * PAGE_SIZE;
  const pageData = data.slice(start, start + PAGE_SIZE);

  updateDataCount(data.length);

  if (!data.length) {
    tbody.innerHTML = `<tr><td colspan="9" style="text-align:center;color:var(--text-light);padding:30px;">Tidak ada data dapil yang cocok.</td></tr>`;
    renderPagination(0, totalPages);
    return;
  }

  tbody.innerHTML = pageData
    .map((d, i) => {
      const dpt = computeDpt(d.wilayah);
      const tps = computeTps(d.wilayah);
      const statusClass = d.status === "Aktif" ? "aktif" : "nonaktif";

      return `
        <tr>
          <td>${start + i + 1}</td>
          <td>
            <strong>${d.nama}</strong><br>
            <small>${d.kode} &middot; ${d.jenisPemilu}</small>
          </td>
          <td>${d.wilayah.join(", ")}</td>
          <td>${d.kursi}</td>
          <td>${formatNumber(dpt)}</td>
          <td>${formatNumber(tps)}</td>
          <td>${formatNumber(d.targetSuara)}</td>
          <td><span class="status-badge ${statusClass}">${d.status}</span></td>
          <td>
            <div class="row-actions">
              <button class="row-action-btn" data-action="detail" data-id="${d.id}" title="Detail"><i class="fa-solid fa-eye"></i></button>
              <button class="row-action-btn" data-action="edit" data-id="${d.id}" title="Edit"><i class="fa-solid fa-pen"></i></button>
              <button class="row-action-btn delete-btn" data-action="delete" data-id="${d.id}" title="Hapus"><i class="fa-solid fa-trash"></i></button>
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
      if (action === "delete") deleteDapil(id);
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

function deleteDapil(id) {
  const dapil = dapilData.find((d) => d.id === id);
  if (!dapil) return;

  const confirmed = confirm(`Hapus dapil "${dapil.nama}"?`);
  if (!confirmed) return;

  dapilData = dapilData.filter((d) => d.id !== id);
  renderTable();
}

/* =====================================================
   DETAIL VIEW
===================================================== */

function bindDetailEvents() {
  document.getElementById("btnBackToList").addEventListener("click", () => {
    document.getElementById("detailView").style.display = "none";
    document.getElementById("listView").style.display = "flex";
  });

  document.getElementById("btnEditFromDetail").addEventListener("click", () => {
    if (currentDetailId !== null) openModal(currentDetailId);
  });
}

function openDetail(id) {
  const dapil = dapilData.find((d) => d.id === id);
  if (!dapil) return;

  currentDetailId = id;

  document.getElementById("listView").style.display = "none";
  document.getElementById("detailView").style.display = "flex";

  renderDetail(dapil);
}

function renderDetail(d) {
  const dpt = computeDpt(d.wilayah);
  const tps = computeTps(d.wilayah);

  document.getElementById("detailKode").textContent = d.kode;
  document.getElementById("detailNama").textContent = d.nama;
  document.getElementById("detailJenisProvinsi").textContent =
    `${d.jenisPemilu} &middot; ${d.provinsi}`.replace("&middot;", "\u00B7");

  // 3. KPI
  document.getElementById("detailKpiGrid").innerHTML = `
    <div class="detail-kpi-card">
      <span><i class="fa-solid fa-users"></i> Total DPT</span>
      <h2>${formatNumber(dpt)}</h2>
    </div>
    <div class="detail-kpi-card">
      <span><i class="fa-solid fa-building"></i> Total TPS</span>
      <h2>${formatNumber(tps)}</h2>
    </div>
    <div class="detail-kpi-card">
      <span><i class="fa-solid fa-chair"></i> Kursi</span>
      <h2>${d.kursi}</h2>
    </div>
    <div class="detail-kpi-card">
      <span><i class="fa-solid fa-bullseye"></i> Target Suara</span>
      <h2>${formatNumber(d.targetSuara)}</h2>
    </div>
  `;

  // 2. WILAYAH CAKUPAN (tree)
  const tree = document.getElementById("wilayahTree");

  tree.innerHTML = d.wilayah
    .map((namaKab, idx) => {
      const kab = wilayahMaster[namaKab];
      if (!kab) return "";

      return `
        <div class="tree-kabupaten ${idx === 0 ? "open" : ""}" data-kab="${namaKab}">
          <div class="tree-kabupaten-header">
            <span><i class="fa-solid fa-city"></i> ${namaKab}
              <small style="font-weight:400;color:var(--text-light);"> &middot; ${formatNumber(kab.dpt)} DPT &middot; ${formatNumber(kab.tps)} TPS</small>
            </span>
            <i class="fa-solid fa-chevron-down"></i>
          </div>
          <div class="tree-kecamatan-list">
            ${kab.kecamatan
              .map(
                (kec) => `
                  <div class="tree-kecamatan-item">
                    ${kec}
                    <small>Desa 1, Desa 2, Desa 3 (placeholder)</small>
                  </div>
                `,
              )
              .join("")}
          </div>
        </div>
      `;
    })
    .join("");

  tree.querySelectorAll(".tree-kabupaten-header").forEach((header) => {
    header.addEventListener("click", () => {
      header.parentElement.classList.toggle("open");
    });
  });

  // 4. HISTORIS SUARA (chart + table)
  const categories = [...d.suaraHistoris.map((h) => String(h.tahun)), "Target 2029"];
  const values = [...d.suaraHistoris.map((h) => h.suara), d.targetSuara];

  Highcharts.chart("historisChart", {
    chart: { type: "column" },
    title: { text: null },
    xAxis: { categories },
    yAxis: { title: { text: null } },
    legend: { enabled: false },
    series: [
      {
        name: "Suara",
        data: values.map((v, i) => ({
          y: v,
          color: i === values.length - 1 ? "#ec4899" : "#6366f1",
        })),
      },
    ],
  });

  const totalDptForPct = dpt || 1;
  const historisTable = document.getElementById("historisTable");

  historisTable.innerHTML = `
    <thead>
      <tr><th>Pemilu</th><th>Suara</th><th>Persentase</th></tr>
    </thead>
    <tbody>
      ${d.suaraHistoris
        .map(
          (h) => `
            <tr>
              <td>${h.tahun}</td>
              <td>${formatNumber(h.suara)}</td>
              <td>${((h.suara / totalDptForPct) * 100).toFixed(1)}%</td>
            </tr>
          `,
        )
        .join("")}
      <tr>
        <td>Target 2029</td>
        <td class="target-row">${formatNumber(d.targetSuara)}</td>
        <td class="target-row">${((d.targetSuara / totalDptForPct) * 100).toFixed(1)}%</td>
      </tr>
    </tbody>
  `;

  // 5. TARGET KEMENANGAN
  const suaraTerakhir = d.suaraHistoris[d.suaraHistoris.length - 1]?.suara || 0;
  const gap = d.targetSuara - suaraTerakhir;
  const progress = Math.min(100, Math.round((suaraTerakhir / d.targetSuara) * 100));

  document.getElementById("targetKemenangan").innerHTML = `
    <div class="tk-row">
      <span>Target Kursi</span>
      <strong>${d.kursi} kursi</strong>
    </div>
    <div class="tk-row">
      <span>Estimasi Suara Aman</span>
      <strong>${formatNumber(d.targetSuara)}</strong>
    </div>
    <div class="tk-row">
      <span>Suara Saat Ini</span>
      <strong>${formatNumber(suaraTerakhir)}</strong>
    </div>
    <div class="tk-row gap">
      <span>Gap</span>
      <strong>${gap > 0 ? formatNumber(gap) + " suara" : "Sudah tercapai"}</strong>
    </div>

    <div class="tk-progress-wrap">
      <div class="tk-progress-label">
        <span>Progress</span>
        <strong>${progress}%</strong>
      </div>
      <div class="tk-progress-bar">
        <div class="tk-progress-fill" style="width:${progress}%;"></div>
      </div>
    </div>
  `;

  // 6. WILAYAH PRIORITAS
  const priorityContainer = document.getElementById("priorityBars");

  priorityContainer.innerHTML = d.wilayahPrioritas
    .map(
      (w, i) => `
        <div class="priority-item">
          <div class="priority-item-label">
            <span><span class="rank">${i + 1}.</span> ${w.nama}</span>
            <span>${w.capaian}%</span>
          </div>
          <div class="priority-bar-track">
            <div class="priority-bar-fill" style="width:${w.capaian}%;"></div>
          </div>
        </div>
      `,
    )
    .join("");
}

/* =====================================================
   MODAL: TAMBAH / EDIT
===================================================== */

function bindModalEvents() {
  document.getElementById("btnTambahDapil").addEventListener("click", () => openModal(null));

  document.getElementById("modalCloseBtn").addEventListener("click", closeModal);
  document.getElementById("modalCancelBtn").addEventListener("click", closeModal);

  document.getElementById("dapilModalOverlay").addEventListener("click", (e) => {
    if (e.target.id === "dapilModalOverlay") closeModal();
  });

  document.getElementById("dapilForm").addEventListener("submit", (e) => {
    e.preventDefault();
    saveDapil();
  });

  // Isi checkbox wilayah sekali di awal
  const grid = document.getElementById("wilayahCheckboxGrid");
  grid.innerHTML = Object.keys(wilayahMaster)
    .map(
      (nama) => `
        <label class="checkbox-item">
          <input type="checkbox" value="${nama}" />
          ${nama}
        </label>
      `,
    )
    .join("");
}

function openModal(id) {
  const overlay = document.getElementById("dapilModalOverlay");
  const title = document.getElementById("modalTitle");
  const form = document.getElementById("dapilForm");

  form.reset();
  document.getElementById("formId").value = "";

  document.querySelectorAll("#wilayahCheckboxGrid input").forEach((cb) => {
    cb.checked = false;
  });

  if (id) {
    const dapil = dapilData.find((d) => d.id === id);
    if (!dapil) return;

    title.textContent = "Edit Dapil";
    document.getElementById("formId").value = dapil.id;
    document.getElementById("formJenis").value = dapil.jenisPemilu;
    document.getElementById("formProvinsi").value = dapil.provinsi;
    document.getElementById("formKode").value = dapil.kode;
    document.getElementById("formNama").value = dapil.nama;
    document.getElementById("formKursi").value = dapil.kursi;
    document.getElementById("formTarget").value = dapil.targetSuara;
    document.getElementById("formStatus").value = dapil.status;

    document.querySelectorAll("#wilayahCheckboxGrid input").forEach((cb) => {
      cb.checked = dapil.wilayah.includes(cb.value);
    });
  } else {
    title.textContent = "Tambah Dapil";
  }

  overlay.classList.add("open");
}

function closeModal() {
  document.getElementById("dapilModalOverlay").classList.remove("open");
}

function saveDapil() {
  const id = document.getElementById("formId").value;

  const wilayahTerpilih = Array.from(
    document.querySelectorAll("#wilayahCheckboxGrid input:checked"),
  ).map((cb) => cb.value);

  if (!wilayahTerpilih.length) {
    alert("Pilih minimal satu wilayah (Kabupaten/Kota) untuk dapil ini.");
    return;
  }

  const payload = {
    jenisPemilu: document.getElementById("formJenis").value,
    provinsi: document.getElementById("formProvinsi").value,
    kode: document.getElementById("formKode").value.trim(),
    nama: document.getElementById("formNama").value.trim(),
    kursi: Number(document.getElementById("formKursi").value),
    targetSuara: Number(document.getElementById("formTarget").value),
    status: document.getElementById("formStatus").value,
    wilayah: wilayahTerpilih,
  };

  if (id) {
    // EDIT: pertahankan data historis & prioritas yang sudah ada
    const existing = dapilData.find((d) => d.id === Number(id));
    Object.assign(existing, payload);
  } else {
    // TAMBAH BARU: data historis & prioritas mulai kosong (belum ada histori)
    dapilData.push({
      id: nextId++,
      ...payload,
      suaraHistoris: [],
      wilayahPrioritas: [],
    });
  }

  closeModal();
  renderTable();

  // Kalau lagi buka detail dapil yang sama, refresh juga
  if (currentDetailId !== null && Number(id) === currentDetailId) {
    const updated = dapilData.find((d) => d.id === currentDetailId);
    if (updated) renderDetail(updated);
  }
}