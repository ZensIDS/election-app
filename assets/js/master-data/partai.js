/* =====================================================
   DATA PARTAI
   POLITICAL INTELLIGENCE 2029
===================================================== */

/* =====================================================
   STATE
===================================================== */

let partaiData = [
  {
    id: 1,

    nomor: 1,

    kode: "PA",

    nama: "Partai Nusantara",

    singkatan: "PN",

    jenisPemilu: "DPR RI",

    dapil: "Kaltim 1",

    suara2024: 85200,

    persentase: 13.4,

    kursi: 2,

    status: "Aktif",

    historis: [
      {
        tahun: 2019,
        suara: 65200,
        persentase: 10.8,
        kursi: 1,
      },

      {
        tahun: 2024,
        suara: 85200,
        persentase: 13.4,
        kursi: 2,
      },
    ],

    target2029: 100000,

    wilayah: [
      {
        nama: "Samarinda Utara",
        suara: 12500,
        persentase: 68,
      },

      {
        nama: "Samarinda Selatan",
        suara: 9800,
        persentase: 54,
      },

      {
        nama: "Sungai Kunjang",
        suara: 7600,
        persentase: 43,
      },

      {
        nama: "Samarinda Ilir",
        suara: 6200,
        persentase: 35,
      },
    ],

    calon: [
      {
        nama: "Ahmad Pratama",
        nomor: 1,
        suara: 28500,
      },

      {
        nama: "Budi Santoso",
        nomor: 2,
        suara: 21400,
      },

      {
        nama: "Citra Dewi",
        nomor: 3,
        suara: 17600,
      },
    ],
  },

  {
    id: 2,

    nomor: 2,

    kode: "PB",

    nama: "Partai Demokrasi Rakyat",

    singkatan: "PDR",

    jenisPemilu: "DPR RI",

    dapil: "Kaltim 1",

    suara2024: 72500,

    persentase: 11.6,

    kursi: 1,

    status: "Aktif",

    historis: [
      {
        tahun: 2019,
        suara: 58400,
        persentase: 9.6,
        kursi: 1,
      },

      {
        tahun: 2024,
        suara: 72500,
        persentase: 11.6,
        kursi: 1,
      },
    ],

    target2029: 85000,

    wilayah: [
      {
        nama: "Balikpapan Selatan",
        suara: 11400,
        persentase: 62,
      },

      {
        nama: "Balikpapan Kota",
        suara: 9200,
        persentase: 49,
      },

      {
        nama: "Balikpapan Timur",
        suara: 7100,
        persentase: 41,
      },

      {
        nama: "Balikpapan Utara",
        suara: 6200,
        persentase: 36,
      },
    ],

    calon: [
      {
        nama: "Dedi Kurniawan",
        nomor: 1,
        suara: 24900,
      },

      {
        nama: "Eka Putri",
        nomor: 2,
        suara: 18300,
      },

      {
        nama: "Fajar Rahman",
        nomor: 3,
        suara: 14200,
      },
    ],
  },

  {
    id: 3,

    nomor: 3,

    kode: "PC",

    nama: "Partai Indonesia Maju",

    singkatan: "PIM",

    jenisPemilu: "DPR RI",

    dapil: "Kaltim 2",

    suara2024: 61300,

    persentase: 9.8,

    kursi: 1,

    status: "Aktif",

    historis: [
      {
        tahun: 2019,
        suara: 49100,
        persentase: 8.2,
        kursi: 0,
      },

      {
        tahun: 2024,
        suara: 61300,
        persentase: 9.8,
        kursi: 1,
      },
    ],

    target2029: 78000,

    wilayah: [
      {
        nama: "Tenggarong",
        suara: 10200,
        persentase: 57,
      },

      {
        nama: "Muara Jawa",
        suara: 8500,
        persentase: 48,
      },

      {
        nama: "Loa Janan",
        suara: 6900,
        persentase: 40,
      },
    ],

    calon: [
      {
        nama: "Gilang Ramadhan",
        nomor: 1,
        suara: 22100,
      },

      {
        nama: "Hana Lestari",
        nomor: 2,
        suara: 16300,
      },
    ],
  },

  {
    id: 4,

    nomor: 4,

    kode: "PD",

    nama: "Partai Keadilan Nasional",

    singkatan: "PKN",

    jenisPemilu: "DPR RI",

    dapil: "Kaltim 2",

    suara2024: 48700,

    persentase: 7.8,

    kursi: 0,

    status: "Aktif",

    historis: [
      {
        tahun: 2019,
        suara: 40200,
        persentase: 6.7,
        kursi: 0,
      },

      {
        tahun: 2024,
        suara: 48700,
        persentase: 7.8,
        kursi: 0,
      },
    ],

    target2029: 65000,

    wilayah: [
      {
        nama: "Bontang Barat",
        suara: 8200,
        persentase: 51,
      },

      {
        nama: "Bontang Utara",
        suara: 7300,
        persentase: 45,
      },

      {
        nama: "Sangatta",
        suara: 6100,
        persentase: 39,
      },
    ],

    calon: [
      {
        nama: "Indra Wijaya",
        nomor: 1,
        suara: 17600,
      },

      {
        nama: "Joko Saputra",
        nomor: 2,
        suara: 12100,
      },
    ],
  },

  {
    id: 5,

    nomor: 5,

    kode: "PE",

    nama: "Partai Persatuan Indonesia",

    singkatan: "PPI",

    jenisPemilu: "DPR RI",

    dapil: "Kaltim 3",

    suara2024: 39100,

    persentase: 6.2,

    kursi: 0,

    status: "Aktif",

    historis: [
      {
        tahun: 2019,
        suara: 32600,
        persentase: 5.5,
        kursi: 0,
      },

      {
        tahun: 2024,
        suara: 39100,
        persentase: 6.2,
        kursi: 0,
      },
    ],

    target2029: 55000,

    wilayah: [
      {
        nama: "Muara Badak",
        suara: 6700,
        persentase: 43,
      },

      {
        nama: "Anggana",
        suara: 5800,
        persentase: 38,
      },
    ],

    calon: [
      {
        nama: "Kurniawan Hadi",
        nomor: 1,
        suara: 14300,
      },

      {
        nama: "Lina Maharani",
        nomor: 2,
        suara: 10800,
      },
    ],
  },

  {
    id: 6,
    nomor: 6,
    kode: "PF",
    nama: "Partai Harapan Rakyat",
    singkatan: "PHR",
    jenisPemilu: "DPRD Provinsi",
    dapil: "Kaltim 1",
    suara2024: 33500,
    persentase: 5.4,
    kursi: 1,
    status: "Aktif",
    historis: [
      {
        tahun: 2019,
        suara: 28900,
        persentase: 4.8,
        kursi: 0,
      },
      {
        tahun: 2024,
        suara: 33500,
        persentase: 5.4,
        kursi: 1,
      },
    ],
    target2029: 47000,
    wilayah: [
      {
        nama: "Samarinda Ulu",
        suara: 6100,
        persentase: 41,
      },
      {
        nama: "Samarinda Ilir",
        suara: 4900,
        persentase: 34,
      },
    ],
    calon: [
      {
        nama: "Maya Sari",
        nomor: 1,
        suara: 12400,
      },
      {
        nama: "Nanda Putra",
        nomor: 2,
        suara: 8900,
      },
    ],
  },
];

let nextId = 7;

let currentDetailId = null;

let currentPage = 1;

const PAGE_SIZE = 6;

/* =====================================================
   STATE FILTER
===================================================== */

const state = {
  jenis: "",

  dapil: "",

  status: "",

  search: "",
};

/* =====================================================
   HELPER
===================================================== */

function formatNumber(value) {
  return Number(value || 0).toLocaleString("id-ID");
}

function formatPercent(value) {
  return `${Number(value || 0).toFixed(1)}%`;
}

/* =====================================================
   INIT
===================================================== */

document.addEventListener("DOMContentLoaded", () => {
  bindEvents();

  updateKPI();

  renderTable();
});

/* =====================================================
   EVENTS
===================================================== */

function bindEvents() {
  document
    .getElementById("btnTambahPartai")
    .addEventListener("click", () => openModal());

  document
    .getElementById("modalCloseBtn")
    .addEventListener("click", closeModal);

  document
    .getElementById("modalCancelBtn")
    .addEventListener("click", closeModal);

  document.getElementById("partaiForm").addEventListener("submit", (e) => {
    e.preventDefault();

    savePartai();
  });

  document.getElementById("filterJenis").addEventListener("change", (e) => {
    state.jenis = e.target.value;

    currentPage = 1;

    renderTable();
  });

  document.getElementById("filterDapil").addEventListener("change", (e) => {
    state.dapil = e.target.value;

    currentPage = 1;

    renderTable();
  });

  document.getElementById("filterStatus").addEventListener("change", (e) => {
    state.status = e.target.value;

    currentPage = 1;

    renderTable();
  });

  document.getElementById("searchPartai").addEventListener("input", (e) => {
    state.search = e.target.value.trim().toLowerCase();

    currentPage = 1;

    renderTable();
  });

  document
    .getElementById("btnResetFilter")
    .addEventListener("click", resetFilter);

  document.getElementById("btnEditFromDetail").addEventListener("click", () => {
    if (currentDetailId !== null) {
      openModal(currentDetailId);
    }
  });

  document
    .getElementById("partaiModalOverlay")
    .addEventListener("click", (e) => {
      if (e.target.id === "partaiModalOverlay") {
        closeModal();
      }
    });
}

/* =====================================================
   FILTER
===================================================== */

function getFilteredPartai() {
  return partaiData.filter((p) => {
    if (state.jenis && p.jenisPemilu !== state.jenis) {
      return false;
    }

    if (state.dapil && p.dapil !== state.dapil) {
      return false;
    }

    if (state.status && p.status !== state.status) {
      return false;
    }

    if (state.search) {
      const haystack = (
        p.nama +
        " " +
        p.kode +
        " " +
        p.singkatan
      ).toLowerCase();

      if (!haystack.includes(state.search)) {
        return false;
      }
    }

    return true;
  });
}

/* =====================================================
   KPI
===================================================== */

function updateKPI() {
  const total = partaiData.length;

  const aktif = partaiData.filter((p) => p.status === "Aktif").length;

  const kursi = partaiData.reduce((sum, p) => sum + Number(p.kursi || 0), 0);

  const suara = partaiData.reduce(
    (sum, p) => sum + Number(p.suara2024 || 0),
    0,
  );

  document.getElementById("kpiTotalPartai").textContent = formatNumber(total);

  document.getElementById("kpiPartaiAktif").textContent = formatNumber(aktif);

  document.getElementById("kpiTotalKursi").textContent = formatNumber(kursi);

  document.getElementById("kpiTotalSuara").textContent = formatNumber(suara);
}

/* =====================================================
   TABLE
===================================================== */

function renderTable() {
  const data = getFilteredPartai();

  const tbody = document.getElementById("partaiTable");

  const totalPages = Math.max(1, Math.ceil(data.length / PAGE_SIZE));

  if (currentPage > totalPages) {
    currentPage = totalPages;
  }

  const start = (currentPage - 1) * PAGE_SIZE;

  const pageData = data.slice(start, start + PAGE_SIZE);

  document.getElementById("dataCount").textContent =
    `${formatNumber(data.length)} Data`;

  if (!data.length) {
    tbody.innerHTML = `

            <tr>

                <td
                    colspan="9"
                    style="
                        text-align:center;
                        padding:35px;
                        color:var(--text-light);
                    "
                >

                    Tidak ada data partai
                    yang cocok dengan filter.

                </td>

            </tr>

        `;

    renderPagination(0, 1);

    return;
  }

  tbody.innerHTML = pageData
    .map((p, index) => {
      const statusClass = p.status === "Aktif" ? "aktif" : "nonaktif";

      return `

                <tr>

                    <td>
                        ${start + index + 1}
                    </td>


                    <td>

                        <div class="partai-identity">

                            <div
                                class="partai-logo"
                                style="
                                    background:${getLogoColor(p.id)};
                                "
                            >

                                ${p.nomor}

                            </div>

                            <div>

                                <span class="partai-name">
                                    ${p.nama}
                                </span>

                                <span class="partai-code">
                                    ${p.kode} · ${p.singkatan}
                                </span>

                            </div>

                        </div>

                    </td>


                    <td>
                        ${p.jenisPemilu}
                    </td>


                    <td>
                        ${p.dapil}
                    </td>


                    <td>
                        ${formatNumber(p.suara2024)}
                    </td>


                    <td>
                        <strong>${p.kursi}</strong>
                    </td>


                    <td>
                        ${formatPercent(p.persentase)}
                    </td>


                    <td>

                        <span
                            class="status-badge ${statusClass}"
                        >

                            ${p.status}

                        </span>

                    </td>


                    <td>

                        <div class="row-actions">

                            <button
                                class="row-action-btn"
                                data-action="detail"
                                data-id="${p.id}"
                                title="Detail"
                            >

                                <i class="fa-solid fa-eye"></i>

                            </button>


                            <button
                                class="row-action-btn"
                                data-action="edit"
                                data-id="${p.id}"
                                title="Edit"
                            >

                                <i class="fa-solid fa-pen"></i>

                            </button>


                            <button
                                class="row-action-btn delete-btn"
                                data-action="delete"
                                data-id="${p.id}"
                                title="Hapus"
                            >

                                <i class="fa-solid fa-trash"></i>

                            </button>

                        </div>

                    </td>

                </tr>

            `;
    })
    .join("");

  tbody.querySelectorAll(".row-action-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const id = Number(button.dataset.id);

      const action = button.dataset.action;

      if (action === "detail") {
        openDetail(id);
      }

      if (action === "edit") {
        openModal(id);
      }

      if (action === "delete") {
        deletePartai(id);
      }
    });
  });

  renderPagination(data.length, totalPages);
}

/* =====================================================
   LOGO COLOR
===================================================== */

function getLogoColor(id) {
  const colors = [
    "#4f46e5",
    "#059669",
    "#d97706",
    "#9333ea",
    "#dc2626",
    "#0891b2",
  ];

  return colors[(id - 1) % colors.length];
}

/* =====================================================
   PAGINATION
===================================================== */

function renderPagination(totalData, totalPages) {
  const element = document.getElementById("pagination");

  if (!totalData) {
    element.innerHTML = "";

    return;
  }

  element.innerHTML = `

        <button
            id="pagPrev"
            ${currentPage === 1 ? "disabled" : ""}
        >

            <i class="fa-solid fa-chevron-left"></i>

        </button>


        <span>

            Halaman
            ${currentPage}
            dari
            ${totalPages}

        </span>


        <button
            id="pagNext"
            ${currentPage === totalPages ? "disabled" : ""}
        >

            <i class="fa-solid fa-chevron-right"></i>

        </button>

    `;

  document.getElementById("pagPrev")?.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;

      renderTable();
    }
  });

  document.getElementById("pagNext")?.addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage++;

      renderTable();
    }
  });
}

/* =====================================================
   MODAL
===================================================== */

function openModal(id = null) {
  const overlay = document.getElementById("partaiModalOverlay");

  const title = document.getElementById("modalTitle");

  document.getElementById("partaiForm").reset();

  document.getElementById("formId").value = "";

  if (id !== null) {
    const partai = partaiData.find((p) => p.id === id);

    if (!partai) return;

    title.textContent = "Edit Partai";

    document.getElementById("formId").value = partai.id;

    document.getElementById("formNomor").value = partai.nomor;

    document.getElementById("formKode").value = partai.kode;

    document.getElementById("formNama").value = partai.nama;

    document.getElementById("formSingkatan").value = partai.singkatan;

    document.getElementById("formJenis").value = partai.jenisPemilu;

    document.getElementById("formDapil").value = partai.dapil;

    document.getElementById("formSuara").value = partai.suara2024;

    document.getElementById("formPersentase").value = partai.persentase;

    document.getElementById("formKursi").value = partai.kursi;

    document.getElementById("formStatus").value = partai.status;
  } else {
    title.textContent = "Tambah Partai";
  }

  overlay.classList.add("open");
}

/* =====================================================
   CLOSE MODAL
===================================================== */

function closeModal() {
  document.getElementById("partaiModalOverlay").classList.remove("open");
}

/* =====================================================
   SAVE
===================================================== */

function savePartai() {
  const id = document.getElementById("formId").value;

  const payload = {
    nomor: Number(document.getElementById("formNomor").value),

    kode: document.getElementById("formKode").value.trim().toUpperCase(),

    nama: document.getElementById("formNama").value.trim(),

    singkatan: document
      .getElementById("formSingkatan")
      .value.trim()
      .toUpperCase(),

    jenisPemilu: document.getElementById("formJenis").value,

    dapil: document.getElementById("formDapil").value,

    suara2024: Number(document.getElementById("formSuara").value),

    persentase: Number(document.getElementById("formPersentase").value),

    kursi: Number(document.getElementById("formKursi").value),

    status: document.getElementById("formStatus").value,
  };

  if (id) {
    const existing = partaiData.find((p) => p.id === Number(id));

    if (!existing) return;

    Object.assign(existing, payload);
  } else {
    partaiData.push({
      id: nextId++,

      ...payload,

      target2029: payload.suara2024 * 1.2,

      historis: [
        {
          tahun: 2024,

          suara: payload.suara2024,

          persentase: payload.persentase,

          kursi: payload.kursi,
        },
      ],

      wilayah: [],

      calon: [],
    });
  }

  closeModal();

  updateKPI();

  renderTable();

  if (currentDetailId !== null && Number(id) === currentDetailId) {
    const updated = partaiData.find((p) => p.id === currentDetailId);

    if (updated) {
      renderDetail(updated);
    }
  }
}

/* =====================================================
   DELETE
===================================================== */

function deletePartai(id) {
  const partai = partaiData.find((p) => p.id === id);

  if (!partai) return;

  const confirmed = confirm(`Hapus partai "${partai.nama}"?`);

  if (!confirmed) return;

  partai.status = "Nonaktif";

  updateKPI();

  renderTable();

  if (currentDetailId === id) {
    renderDetail(partai);
  }
}

/* =====================================================
   RESET FILTER
===================================================== */

function resetFilter() {
  state.jenis = "";

  state.dapil = "";

  state.status = "";

  state.search = "";

  document.getElementById("filterJenis").value = "";

  document.getElementById("filterDapil").value = "";

  document.getElementById("filterStatus").value = "";

  document.getElementById("searchPartai").value = "";

  currentPage = 1;

  renderTable();
}

/* =====================================================
   DETAIL
===================================================== */

function openDetail(id) {
  const partai = partaiData.find((p) => p.id === id);

  if (!partai) return;

  currentDetailId = id;

  document.getElementById("listView").style.display = "none";
  document.getElementById("detailView").style.display = "flex";

  renderDetail(partai);
}

/* =====================================================
   RENDER DETAIL
===================================================== */

function renderDetail(p) {
  document.getElementById("detailKode").textContent =
    `${p.kode} · No. ${p.nomor}`;

  document.getElementById("detailNama").textContent = p.nama;

  document.getElementById("detailInfo").textContent =
    `${p.jenisPemilu} · ${p.dapil} · ${p.status}`;

  const target = Number(p.target2029 || 0);

  const growth =
    p.suara2024 > 0 ? ((target - p.suara2024) / p.suara2024) * 100 : 0;

  document.getElementById("detailKpiGrid").innerHTML = `

            <div class="detail-kpi-card">

                <span>
                    <i class="fa-solid fa-chart-column"></i>
                    Suara 2024
                </span>

                <h2>
                    ${formatNumber(p.suara2024)}
                </h2>

            </div>


            <div class="detail-kpi-card">

                <span>
                    <i class="fa-solid fa-percent"></i>
                    Persentase
                </span>

                <h2>
                    ${formatPercent(p.persentase)}
                </h2>

            </div>


            <div class="detail-kpi-card">

                <span>
                    <i class="fa-solid fa-chair"></i>
                    Kursi
                </span>

                <h2>
                    ${formatNumber(p.kursi)}
                </h2>

            </div>


            <div class="detail-kpi-card">

                <span>
                    <i class="fa-solid fa-bullseye"></i>
                    Target 2029
                </span>

                <h2>
                    ${formatNumber(target)}
                </h2>

            </div>

        `;

  renderHistoris(p);

  renderDapilPerformance(p);

  renderWilayahPerformance(p);

  renderCandidates(p);
}

/* =====================================================
   HISTORIS
===================================================== */

function renderHistoris(p) {
  const categories = [...p.historis.map((h) => String(h.tahun)), "Target 2029"];

  const values = [...p.historis.map((h) => h.suara), p.target2029];

  Highcharts.chart("historisChart", {
    chart: {
      type: "column",

      backgroundColor: "transparent",
    },

    title: {
      text: null,
    },

    credits: {
      enabled: false,
    },

    xAxis: {
      categories,
    },

    yAxis: {
      title: {
        text: "Suara",
      },
    },

    legend: {
      enabled: false,
    },

    tooltip: {
      pointFormat: "<b>{point.y:,.0f}</b> suara",
    },

    series: [
      {
        name: "Suara",

        data: values.map((value, index) => ({
          y: value,

          color: index === values.length - 1 ? "#ec4899" : "#6366f1",
        })),
      },
    ],
  });

  const table = document.getElementById("historisTable");

  table.innerHTML = `

        <table>

            <thead>

                <tr>

                    <th>Tahun</th>

                    <th>Suara</th>

                    <th>Persentase</th>

                    <th>Kursi</th>

                </tr>

            </thead>

            <tbody>

                ${p.historis
                  .map(
                    (h) => `

                        <tr>

                            <td>${h.tahun}</td>

                            <td>
                                ${formatNumber(h.suara)}
                            </td>

                            <td>
                                ${formatPercent(h.persentase)}
                            </td>

                            <td>
                                ${h.kursi}
                            </td>

                        </tr>

                    `,
                  )
                  .join("")}

                <tr>

                    <td>
                        <strong>Target 2029</strong>
                    </td>

                    <td>
                        <strong>
                            ${formatNumber(p.target2029)}
                        </strong>
                    </td>

                    <td>
                        -
                    </td>

                    <td>
                        -
                    </td>

                </tr>

            </tbody>

        </table>

    `;
}

/* =====================================================
   DAPIL PERFORMANCE
===================================================== */

function renderDapilPerformance(p) {
  const container = document.getElementById("dapilPerformance");

  const max = Math.max(p.suara2024, 1);

  const data = [
    {
      nama: p.dapil,
      suara: p.suara2024,
      persentase: p.persentase,
    },

    {
      nama: "Kaltim 2",
      suara: Math.round(p.suara2024 * 0.72),
      persentase: p.persentase * 0.72,
    },

    {
      nama: "Kaltim 3",
      suara: Math.round(p.suara2024 * 0.54),
      persentase: p.persentase * 0.54,
    },
  ];

  container.innerHTML = data
    .map((item) => {
      const width = Math.min(100, (item.suara / max) * 100);

      return `

                    <div class="performance-item">

                        <div class="performance-info">

                            <span>
                                ${item.nama}
                            </span>

                            <strong>
                                ${formatNumber(item.suara)}
                            </strong>

                        </div>

                        <div class="performance-bar">

                            <div
                                class="performance-fill"
                                style="width:${width}%"
                            ></div>

                        </div>

                        <small style="
                            color:var(--text-light);
                            font-size:11px;
                        ">

                            ${formatPercent(item.persentase)}

                        </small>

                    </div>

                `;
    })
    .join("");
}

/* =====================================================
   WILAYAH PERFORMANCE
===================================================== */

function renderWilayahPerformance(p) {
  const container = document.getElementById("wilayahPerformance");

  if (!p.wilayah.length) {
    container.innerHTML = `

            <div style="
                grid-column:1/-1;
                text-align:center;
                padding:25px;
                color:var(--text-light);
            ">

                Belum ada data wilayah.

            </div>

        `;

    return;
  }

  container.innerHTML = p.wilayah
    .map(
      (wilayah) => `

                <div class="wilayah-item">

                    <strong>
                        ${wilayah.nama}
                    </strong>

                    <span>
                        ${formatNumber(wilayah.suara)}
                        suara
                    </span>

                    <div
                        class="performance-bar"
                        style="margin-top:10px;"
                    >

                        <div
                            class="performance-fill"
                            style="
                                width:${wilayah.persentase}%
                            "
                        ></div>

                    </div>

                    <span
                        style="
                            display:block;
                            margin-top:7px;
                        "
                    >

                        Kekuatan:
                        ${wilayah.persentase}%

                    </span>

                </div>

            `,
    )
    .join("");
}

/* =====================================================
   CANDIDATES
===================================================== */

function renderCandidates(p) {
  const container = document.getElementById("candidateGrid");

  if (!p.calon.length) {
    container.innerHTML = `

            <div style="
                grid-column:1/-1;
                text-align:center;
                padding:25px;
                color:var(--text-light);
            ">

                Belum ada data calon.

            </div>

        `;

    return;
  }

  container.innerHTML = p.calon
    .map(
      (calon) => `

                <div class="candidate-card">

                    <div class="candidate-avatar">

                        ${calon.nomor}

                    </div>

                    <div>

                        <strong>
                            ${calon.nama}
                        </strong>

                        <span>
                            ${formatNumber(calon.suara)}
                            suara
                        </span>

                    </div>

                </div>

            `,
    )
    .join("");
}

/* =====================================================
   BACK TO LIST
===================================================== */

document.getElementById("btnBackToList")?.addEventListener("click", () => {
  document.getElementById("detailView").style.display = "none";
  document.getElementById("listView").style.display = "flex";

  currentDetailId = null;
});