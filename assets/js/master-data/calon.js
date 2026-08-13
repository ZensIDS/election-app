/**
 * =====================================================
 * POLITICAL INTELLIGENCE 2029
 * Data Calon - Master Data Controller
 * =====================================================
 *
 * CATATAN:
 * State in-memory (sama seperti wilayah.js & dapil.js) -
 * refresh halaman kembali ke data dummy awal.
 * Data Partai & Data Dapil di sini didefinisikan ulang
 * secara ringkas (nama saja) karena tiap halaman master
 * data berjalan independen (belum ada shared store).
 * =====================================================
 */

/* =====================================================
   MASTER RINGAN: PARTAI, DAPIL, KABUPATEN
===================================================== */

const partaiList = ["Partai A", "Partai B", "Partai C", "Partai D"];

const dapilList = ["Kalimantan Timur 1", "Kalimantan Timur 2"];

// DPT per dapil (dipakai untuk hitung persentase suara) - sama seperti di dapil.js
const dapilDpt = {
  "Kalimantan Timur 1": 1470000,
  "Kalimantan Timur 2": 1010000,
};

// Kabupaten/kota anggota tiap dapil (sama seperti di dapil.js)
const dapilWilayah = {
  "Kalimantan Timur 1": ["Samarinda", "Kutai Kartanegara", "Kutai Timur", "Bontang"],
  "Kalimantan Timur 2": ["Balikpapan", "Paser", "Kutai Barat", "Penajam Paser Utara"],
};

const semuaKabupaten = [
  "Samarinda",
  "Balikpapan",
  "Bontang",
  "Kutai Kartanegara",
  "Kutai Timur",
  "Kutai Barat",
  "Paser",
  "Penajam Paser Utara",
];

/* =====================================================
   STATE: DAFTAR CALON (in-memory)
===================================================== */

let calonData = [
  mkCalon(1, "Ahmad Wijaya", "A. Wijaya", "Laki-laki", "Partai A", "Kalimantan Timur 1", 1, "Aktif", "Ya", "Samarinda", "Samarinda Ulu", 18000, 24532, "Terpilih", "Petahana dua periode, basis kuat di Samarinda Ulu.", { suaraHistoris: 85, kekuatanWilayah: 88, incumbency: 90, konsistensi: 76 }),
  mkCalon(2, "Budi Santoso", "B. Santoso", "Laki-laki", "Partai B", "Kalimantan Timur 1", 2, "Aktif", "Tidak", "Kutai Kartanegara", "Tenggarong", 12000, 18231, "Tidak Terpilih", "Pendatang baru, tren suara naik dari pemilu sebelumnya.", { suaraHistoris: 62, kekuatanWilayah: 58, incumbency: 40, konsistensi: 55 }),
  mkCalon(3, "Citra Dewi", "C. Dewi", "Perempuan", "Partai C", "Kalimantan Timur 2", 1, "Aktif", "Ya", "Balikpapan", "Balikpapan Selatan", 24000, 31452, "Terpilih", "Petahana dengan basis suara terbesar di dapil ini.", { suaraHistoris: 91, kekuatanWilayah: 89, incumbency: 92, konsistensi: 84 }),
  mkCalon(4, "Dedi Kurniawan", "D. Kurniawan", "Laki-laki", "Partai D", "Kalimantan Timur 1", 3, "Aktif", "Tidak", "Kutai Timur", "Sangatta Utara", 8500, 14200, "Tidak Terpilih", "Fokus kampanye di wilayah Kutai Timur.", { suaraHistoris: 58, kekuatanWilayah: 61, incumbency: 40, konsistensi: 50 }),
  mkCalon(5, "Eka Putri", "E. Putri", "Perempuan", "Partai A", "Kalimantan Timur 2", 2, "Aktif", "Tidak", "Balikpapan", "Balikpapan Utara", 15200, 21870, "Tidak Terpilih", "Pertumbuhan suara signifikan, kandidat naik daun.", { suaraHistoris: 70, kekuatanWilayah: 66, incumbency: 40, konsistensi: 63 }),
  mkCalon(6, "Fajar Nugroho", "F. Nugroho", "Laki-laki", "Partai B", "Kalimantan Timur 2", 3, "Nonaktif", "Tidak", "Paser", "Tanah Grogot", 7200, 8900, "Tidak Terpilih", "Nonaktif sejak awal 2026, digantikan calon pengganti.", { suaraHistoris: 44, kekuatanWilayah: 40, incumbency: 40, konsistensi: 38 }),
  mkCalon(7, "Gita Ramadhani", "G. Ramadhani", "Perempuan", "Partai C", "Kalimantan Timur 1", 4, "Aktif", "Ya", "Bontang", "Bontang Utara", 14800, 19650, "Tidak Terpilih", "Incumbent DPRD, mencalonkan diri ke tingkat lebih tinggi.", { suaraHistoris: 68, kekuatanWilayah: 72, incumbency: 78, konsistensi: 66 }),
  mkCalon(8, "Hendra Saputra", "H. Saputra", "Laki-laki", "Partai D", "Kalimantan Timur 2", 4, "Aktif", "Tidak", "Kutai Barat", "Barong Tongkok", 10100, 15320, "Tidak Terpilih", "Kandidat muda, jaringan relawan kuat di Kutai Barat.", { suaraHistoris: 60, kekuatanWilayah: 57, incumbency: 40, konsistensi: 52 }),
];

let nextId = 9;
let currentDetailId = null;
let compareSelection = new Set();
let historisChartInstance = null; // dipakai untuk reflow saat sidebar toggle

const state = {
  search: "",
  partai: "",
  dapil: "",
  status: "",
  incumbent: "",
};

/* =====================================================
   HELPER: BUAT OBJEK CALON
===================================================== */

function mkCalon(id, nama, namaSingkat, gender, partai, dapil, noUrut, status, incumbent, kabupaten, kecamatan, suara2019, suara2024, statusKursi, catatan, score) {
  return {
    id,
    nama,
    namaSingkat,
    gender,
    foto: `https://i.pravatar.cc/150?img=${(id % 70) + 1}`,
    partai,
    dapil,
    noUrut,
    status,
    incumbent,
    kabupaten,
    kecamatan,
    suaraHistoris: [
      { tahun: 2019, suara: suara2019 },
      { tahun: 2024, suara: suara2024 },
    ],
    statusKursi,
    catatan,
    score,
    kekuatanWilayah: buildKekuatanWilayah(dapil, kabupaten, score.kekuatanWilayah),
  };
}

function buildKekuatanWilayah(dapil, kabupatenBasis, skorBasis) {
  const anggota = dapilWilayah[dapil] || [];

  return anggota.map((kab) => {
    if (kab === kabupatenBasis) {
      return { kabupaten: kab, skor: skorBasis };
    }
    // wilayah lain: skor lebih rendah & sedikit bervariasi, tetap deterministik
    const variasi = (kab.length * 7) % 25;
    return { kabupaten: kab, skor: Math.max(20, skorBasis - 30 - variasi) };
  });
}

function formatNumber(n) {
  return Math.round(n).toLocaleString("id-ID");
}

function computeScore(score) {
  return Math.round(
    (score.suaraHistoris + score.kekuatanWilayah + score.incumbency + score.konsistensi) / 4,
  );
}

function getWilayahTag(skor) {
  if (skor >= 85) return { key: "basis", label: "Basis" };
  if (skor >= 65) return { key: "kuat", label: "Kuat" };
  if (skor >= 45) return { key: "sedang", label: "Sedang" };
  return { key: "lemah", label: "Lemah" };
}

/* =====================================================
   INIT
===================================================== */

document.addEventListener("DOMContentLoaded", () => {
  populateDropdowns();
  bindFilterEvents();
  bindModalEvents();
  bindDetailEvents();
  bindCompareEvents();

  renderSummary();
  renderTable();
});

function populateDropdowns() {
  const filterPartai = document.getElementById("filterPartai");
  const filterDapil = document.getElementById("filterDapil");
  const formPartai = document.getElementById("formPartai");
  const formDapil = document.getElementById("formDapil");
  const formKabupaten = document.getElementById("formKabupaten");

  partaiList.forEach((p) => {
    filterPartai.insertAdjacentHTML("beforeend", `<option>${p}</option>`);
    formPartai.insertAdjacentHTML("beforeend", `<option>${p}</option>`);
  });

  dapilList.forEach((d) => {
    filterDapil.insertAdjacentHTML("beforeend", `<option>${d}</option>`);
    formDapil.insertAdjacentHTML("beforeend", `<option>${d}</option>`);
  });

  semuaKabupaten.forEach((k) => {
    formKabupaten.insertAdjacentHTML("beforeend", `<option>${k}</option>`);
  });
}

/* =====================================================
   SUMMARY CARDS
===================================================== */

function renderSummary() {
  const total = calonData.length;
  const aktif = calonData.filter((c) => c.status === "Aktif").length;
  const partaiTerpakai = new Set(calonData.map((c) => c.partai)).size;
  const dapilTerpakai = new Set(calonData.map((c) => c.dapil)).size;
  const incumbent = calonData.filter((c) => c.incumbent === "Ya").length;

  const cards = [
    { label: "Total Calon", value: total, icon: "fa-users" },
    { label: "Calon Aktif", value: aktif, icon: "fa-user-check" },
    { label: "Partai", value: partaiTerpakai, icon: "fa-flag" },
    { label: "Dapil", value: dapilTerpakai, icon: "fa-landmark" },
    { label: "Incumbent", value: incumbent, icon: "fa-crown" },
  ];

  document.getElementById("summaryGrid").innerHTML = cards
    .map(
      (c) => `
        <div class="summary-card">
          <span><i class="fa-solid ${c.icon}"></i> ${c.label}</span>
          <h2>${c.value}</h2>
        </div>
      `,
    )
    .join("");
}

/* =====================================================
   FILTER + TABLE
===================================================== */

function bindFilterEvents() {
  document.getElementById("searchCalon").addEventListener("input", (e) => {
    state.search = e.target.value.toLowerCase();
    renderTable();
  });

  document.getElementById("filterPartai").addEventListener("change", (e) => {
    state.partai = e.target.value;
    renderTable();
  });

  document.getElementById("filterDapil").addEventListener("change", (e) => {
    state.dapil = e.target.value;
    renderTable();
  });

  document.getElementById("filterStatus").addEventListener("change", (e) => {
    state.status = e.target.value;
    renderTable();
  });

  document.getElementById("filterIncumbent").addEventListener("change", (e) => {
    state.incumbent = e.target.value;
    renderTable();
  });

  document.getElementById("resetFilterBtn").addEventListener("click", () => {
    state.search = "";
    state.partai = "";
    state.dapil = "";
    state.status = "";
    state.incumbent = "";

    document.getElementById("searchCalon").value = "";
    document.getElementById("filterPartai").value = "";
    document.getElementById("filterDapil").value = "";
    document.getElementById("filterStatus").value = "";
    document.getElementById("filterIncumbent").value = "";

    renderTable();
  });
}

function getFilteredCalon() {
  return calonData.filter((c) => {
    if (state.search && !c.nama.toLowerCase().includes(state.search)) return false;
    if (state.partai && c.partai !== state.partai) return false;
    if (state.dapil && c.dapil !== state.dapil) return false;
    if (state.status && c.status !== state.status) return false;
    if (state.incumbent && c.incumbent !== state.incumbent) return false;
    return true;
  });
}

function renderTable() {
  const data = getFilteredCalon();
  const tbody = document.getElementById("calonTable");

  document.getElementById("dataCount").textContent = `${data.length} Data`;
  document.getElementById("paginationInfo").textContent = data.length
    ? "Halaman 1 dari 1"
    : "Tidak ada data";

  if (!data.length) {
    tbody.innerHTML = `<tr><td colspan="11" style="text-align:center;color:var(--text-light);padding:30px;">Tidak ada data calon yang cocok.</td></tr>`;
    return;
  }

  tbody.innerHTML = data
    .map((c, i) => {
      const suaraTerakhir = c.suaraHistoris[c.suaraHistoris.length - 1]?.suara || 0;
      const statusClass = c.status === "Aktif" ? "aktif" : "nonaktif";
      const incumbentClass = c.incumbent === "Ya" ? "ya" : "tidak";
      const checked = compareSelection.has(c.id) ? "checked" : "";

      return `
        <tr>
          <td><input type="checkbox" class="compare-checkbox" data-id="${c.id}" ${checked} /></td>
          <td>${i + 1}</td>
          <td>
            <div class="calon-photo-cell">
              <img src="${c.foto}" alt="${c.nama}" />
              <div>
                <strong>${c.nama}</strong><br>
                <small style="color:var(--text-light);">No. Urut ${c.noUrut}</small>
              </div>
            </div>
          </td>
          <td>${c.partai}</td>
          <td>${c.dapil}</td>
          <td>${c.kabupaten}</td>
          <td><span class="status-badge ${statusClass}">${c.status}</span></td>
          <td><span class="incumbent-badge ${incumbentClass}">${c.incumbent}</span></td>
          <td>${formatNumber(suaraTerakhir)}</td>
          <td>${
            c.statusKursi === "Terpilih"
              ? `<span class="kursi-badge"><i class="fa-solid fa-circle-check"></i> Terpilih</span>`
              : `<span class="kursi-badge pending">&ndash;</span>`
          }</td>
          <td>
            <div class="row-actions">
              <button class="row-action-btn" data-action="detail" data-id="${c.id}" title="Detail"><i class="fa-solid fa-eye"></i></button>
              <button class="row-action-btn" data-action="edit" data-id="${c.id}" title="Edit"><i class="fa-solid fa-pen"></i></button>
              <button class="row-action-btn delete-btn" data-action="delete" data-id="${c.id}" title="Hapus"><i class="fa-solid fa-trash"></i></button>
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
      if (action === "delete") deleteCalon(id);
    });
  });

  tbody.querySelectorAll(".compare-checkbox").forEach((cb) => {
    cb.addEventListener("change", () => {
      const id = Number(cb.dataset.id);
      if (cb.checked) {
        compareSelection.add(id);
      } else {
        compareSelection.delete(id);
      }
      updateCompareButton();
    });
  });
}

function deleteCalon(id) {
  const calon = calonData.find((c) => c.id === id);
  if (!calon) return;

  const confirmed = confirm(`Hapus data calon "${calon.nama}"?`);
  if (!confirmed) return;

  calonData = calonData.filter((c) => c.id !== id);
  compareSelection.delete(id);

  updateCompareButton();
  renderSummary();
  renderTable();
}

/* =====================================================
   DETAIL VIEW (PROFIL CALON)
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
  const calon = calonData.find((c) => c.id === id);
  if (!calon) return;

  currentDetailId = id;

  document.getElementById("listView").style.display = "none";
  document.getElementById("detailView").style.display = "flex";

  renderDetail(calon);
}

function renderDetail(c) {
  const suaraTerakhir = c.suaraHistoris[c.suaraHistoris.length - 1]?.suara || 0;
  const persentase = ((suaraTerakhir / (dapilDpt[c.dapil] || 1)) * 100).toFixed(2);
  const totalScore = computeScore(c.score);

  document.getElementById("profilePhoto").src = c.foto;
  document.getElementById("profilePhoto").alt = c.nama;
  document.getElementById("profileNama").textContent = c.nama;
  document.getElementById("profilePartaiDapil").textContent = `${c.partai} \u00B7 Dapil ${c.dapil}`;

  const statusClass = c.status === "Aktif" ? "aktif" : "nonaktif";
  const incumbentClass = c.incumbent === "Ya" ? "ya" : "tidak";

  document.getElementById("profileBadges").innerHTML = `
    <span class="status-badge ${statusClass}">${c.status}</span>
    <span class="incumbent-badge ${incumbentClass}">${c.incumbent === "Ya" ? "Incumbent" : "Non-Incumbent"}</span>
  `;

  document.getElementById("profileKpiGrid").innerHTML = `
    <div class="detail-kpi-card">
      <span><i class="fa-solid fa-hashtag"></i> No. Urut</span>
      <h2>${c.noUrut}</h2>
    </div>
    <div class="detail-kpi-card">
      <span><i class="fa-solid fa-check-to-slot"></i> Suara Terakhir</span>
      <h2>${formatNumber(suaraTerakhir)}</h2>
    </div>
    <div class="detail-kpi-card">
      <span><i class="fa-solid fa-percent"></i> Persentase</span>
      <h2>${persentase}%</h2>
    </div>
    <div class="detail-kpi-card">
      <span><i class="fa-solid fa-medal"></i> Status Kursi</span>
      <h2 style="font-size:18px;">${c.statusKursi}</h2>
    </div>
  `;

  // COMPETITOR STRENGTH SCORE
  document.getElementById("scoreGauge").innerHTML = `
    <div class="score-value">
      <strong>${totalScore}</strong>
      <small>/ 100</small>
    </div>
  `;

  const scoreLabels = {
    suaraHistoris: "Suara Historis",
    kekuatanWilayah: "Kekuatan Wilayah",
    incumbency: "Incumbency",
    konsistensi: "Konsistensi",
  };

  document.getElementById("scoreBreakdown").innerHTML = Object.entries(c.score)
    .map(
      ([key, val]) => `
        <div class="score-item">
          <div class="score-item-label">
            <span>${scoreLabels[key] || key}</span>
            <span>${val}</span>
          </div>
          <div class="score-bar-track">
            <div class="score-bar-fill" style="width:${val}%;"></div>
          </div>
        </div>
      `,
    )
    .join("");

  // RIWAYAT SUARA CHART
  const categories = [...c.suaraHistoris.map((h) => String(h.tahun)), "2029"];
  const values = [...c.suaraHistoris.map((h) => h.suara), null];

  historisChartInstance = Highcharts.chart("historisChart", {
    chart: { type: "line" },
    title: { text: null },
    xAxis: { categories },
    yAxis: { title: { text: null } },
    legend: { enabled: false },
    series: [
      {
        name: "Suara",
        data: values,
        color: "#4f46e5",
        marker: { enabled: true },
      },
    ],
  });

  // KEKUATAN WILAYAH
  document.getElementById("strengthBars").innerHTML = c.kekuatanWilayah
    .map((w) => {
      const tag = getWilayahTag(w.skor);
      return `
        <div class="strength-item">
          <div class="strength-item-label">
            <span>${w.kabupaten}</span>
            <span><span class="tag ${tag.key}">${tag.label}</span> ${w.skor}</span>
          </div>
          <div class="strength-bar-track">
            <div class="strength-bar-fill" style="width:${w.skor}%;"></div>
          </div>
        </div>
      `;
    })
    .join("");

  // CATATAN
  document.getElementById("catatanText").textContent =
    c.catatan || "Belum ada catatan untuk calon ini.";
}

/* =====================================================
   MODAL: TAMBAH / EDIT
===================================================== */

function bindModalEvents() {
  document.getElementById("btnTambahCalon").addEventListener("click", () => openModal(null));

  document.getElementById("modalCloseBtn").addEventListener("click", closeModal);
  document.getElementById("modalCancelBtn").addEventListener("click", closeModal);

  document.getElementById("calonModalOverlay").addEventListener("click", (e) => {
    if (e.target.id === "calonModalOverlay") closeModal();
  });

  document.getElementById("calonForm").addEventListener("submit", (e) => {
    e.preventDefault();
    saveCalon();
  });
}

function openModal(id) {
  const overlay = document.getElementById("calonModalOverlay");
  const title = document.getElementById("modalTitle");
  const form = document.getElementById("calonForm");

  form.reset();
  document.getElementById("formId").value = "";

  if (id) {
    const c = calonData.find((c) => c.id === id);
    if (!c) return;

    title.textContent = "Edit Calon";
    document.getElementById("formId").value = c.id;
    document.getElementById("formNama").value = c.nama;
    document.getElementById("formNamaSingkat").value = c.namaSingkat;
    document.getElementById("formGender").value = c.gender;
    document.getElementById("formFoto").value = "";
    document.getElementById("formPartai").value = c.partai;
    document.getElementById("formDapil").value = c.dapil;
    document.getElementById("formNoUrut").value = c.noUrut;
    document.getElementById("formStatus").value = c.status;
    document.getElementById("formIncumbent").value = c.incumbent;
    document.getElementById("formKabupaten").value = c.kabupaten;
    document.getElementById("formKecamatan").value = c.kecamatan;
    document.getElementById("formSuara").value =
      c.suaraHistoris[c.suaraHistoris.length - 1]?.suara || 0;
    document.getElementById("formStatusKursi").value = c.statusKursi;
    document.getElementById("formCatatan").value = c.catatan;
  } else {
    title.textContent = "Tambah Calon";
  }

  overlay.classList.add("open");
}

function closeModal() {
  document.getElementById("calonModalOverlay").classList.remove("open");
}

function saveCalon() {
  const id = document.getElementById("formId").value;
  const fotoInput = document.getElementById("formFoto").value.trim();
  const suaraBaru = Number(document.getElementById("formSuara").value);

  const payload = {
    nama: document.getElementById("formNama").value.trim(),
    namaSingkat: document.getElementById("formNamaSingkat").value.trim(),
    gender: document.getElementById("formGender").value,
    partai: document.getElementById("formPartai").value,
    dapil: document.getElementById("formDapil").value,
    noUrut: Number(document.getElementById("formNoUrut").value),
    status: document.getElementById("formStatus").value,
    incumbent: document.getElementById("formIncumbent").value,
    kabupaten: document.getElementById("formKabupaten").value,
    kecamatan: document.getElementById("formKecamatan").value.trim(),
    statusKursi: document.getElementById("formStatusKursi").value,
    catatan: document.getElementById("formCatatan").value.trim(),
  };

  if (id) {
    // EDIT: pertahankan riwayat suara & score yang sudah ada,
    // hanya update suara terakhir kalau field-nya diubah
    const existing = calonData.find((c) => c.id === Number(id));
    Object.assign(existing, payload);

    if (fotoInput) existing.foto = fotoInput;

    const lastEntry = existing.suaraHistoris[existing.suaraHistoris.length - 1];
    if (lastEntry) {
      lastEntry.suara = suaraBaru;
    } else {
      existing.suaraHistoris.push({ tahun: 2024, suara: suaraBaru });
    }

    existing.kekuatanWilayah = buildKekuatanWilayah(
      existing.dapil,
      existing.kabupaten,
      existing.score.kekuatanWilayah,
    );
  } else {
    // TAMBAH BARU: score & riwayat mulai dari data minimal (belum ada histori)
    const newId = nextId++;
    const defaultScore = { suaraHistoris: 40, kekuatanWilayah: 40, incumbency: payload.incumbent === "Ya" ? 70 : 30, konsistensi: 40 };

    calonData.push({
      id: newId,
      ...payload,
      foto: fotoInput || `https://i.pravatar.cc/150?img=${(newId % 70) + 1}`,
      suaraHistoris: [{ tahun: 2024, suara: suaraBaru }],
      score: defaultScore,
      kekuatanWilayah: buildKekuatanWilayah(payload.dapil, payload.kabupaten, defaultScore.kekuatanWilayah),
    });
  }

  closeModal();
  renderSummary();
  renderTable();

  if (currentDetailId !== null && Number(id) === currentDetailId) {
    const updated = calonData.find((c) => c.id === currentDetailId);
    if (updated) renderDetail(updated);
  }
}

/* =====================================================
   BANDINGKAN CALON
===================================================== */

function bindCompareEvents() {
  document.getElementById("btnBandingkan").addEventListener("click", openCompareModal);
  document.getElementById("compareModalCloseBtn").addEventListener("click", closeCompareModal);

  document.getElementById("compareModalOverlay").addEventListener("click", (e) => {
    if (e.target.id === "compareModalOverlay") closeCompareModal();
  });
}

function updateCompareButton() {
  const btn = document.getElementById("btnBandingkan");
  const countEl = document.getElementById("compareCount");

  countEl.textContent = compareSelection.size;
  btn.disabled = compareSelection.size < 2;
}

function openCompareModal() {
  const selected = calonData.filter((c) => compareSelection.has(c.id));
  if (selected.length < 2) return;

  const rows = [
    { label: "Foto", render: (c) => `<img src="${c.foto}" style="width:40px;height:40px;border-radius:50%;object-fit:cover;">` },
    { label: "Nama", render: (c) => `<strong>${c.nama}</strong>` },
    { label: "Partai", render: (c) => c.partai },
    { label: "Dapil", render: (c) => c.dapil },
    { label: "Status", render: (c) => c.status },
    { label: "Incumbent", render: (c) => c.incumbent },
    { label: "Suara Terakhir", render: (c) => formatNumber(c.suaraHistoris[c.suaraHistoris.length - 1]?.suara || 0) },
    { label: "Basis Wilayah", render: (c) => c.kabupaten },
    { label: "Competitor Strength", render: (c) => `<strong>${computeScore(c.score)}</strong> / 100` },
  ];

  const table = document.getElementById("compareTable");

  table.innerHTML = `
    <thead>
      <tr>
        <th>Kriteria</th>
        ${selected.map((c) => `<th>${c.nama}</th>`).join("")}
      </tr>
    </thead>
    <tbody>
      ${rows
        .map(
          (row) => `
            <tr>
              <td>${row.label}</td>
              ${selected.map((c) => `<td>${row.render(c)}</td>`).join("")}
            </tr>
          `,
        )
        .join("")}
    </tbody>
  `;

  document.getElementById("compareModalOverlay").classList.add("open");
}

function closeCompareModal() {
  document.getElementById("compareModalOverlay").classList.remove("open");
}
/* =====================================================
   RESPONSIVE FIX: RESIZE CHART SAAT SIDEBAR TOGGLE
   -----------------------------------------------------
   Highcharts otomatis reflow saat event `resize` bawaan
   browser terjadi, tapi TIDAK saat sidebar collapse/expand
   lewat class toggle (app.js), karena itu bukan resize asli
   window. Tanpa ini, lebar SVG chart jadi basi (stale) begitu
   sidebar berubah lebar, dan bisa terlihat "numpuk"/tidak pas
   dengan widget di sebelahnya. app.js mem-broadcast event
   custom `layout:sidebar-changed` setiap kali transisi
   sidebar selesai - kita dengarkan di sini untuk reflow.
===================================================== */

window.addEventListener("layout:sidebar-changed", () => {
  if (historisChartInstance) historisChartInstance.reflow();
});

window.addEventListener("resize", () => {
  if (historisChartInstance) historisChartInstance.reflow();
});