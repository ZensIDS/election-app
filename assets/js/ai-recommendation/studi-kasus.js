/* =====================================================
   STUDI KASUS PANELS (AI RECOMMENDATION)
   -----------------------------------------------------
   Menampilkan 5 studi kasus (data REAL, dapil-level Kaltim)
   lewat dropdown "Studi Kasus" di filter bar. Studi Kasus
   1 & 2 butuh render JS (tabel + chart Highcharts) - datanya
   diambil dari halaman Kompetitor. Studi Kasus 3, 4, 5 murni
   HTML statis (sudah lengkap saat dipindah dari halaman
   Kompetitor & Analisis Wilayah), jadi tidak perlu render JS.

   formatNumber() sudah didefinisikan di ai-recommendation.js,
   di sini cuma tambah formatPercent() yang belum ada.
===================================================== */

function formatPercent(n) {
  return `${n.toFixed(1)}%`;
}

/* ---------- DATA STUDI KASUS 1 & 2 (real, dapil Kaltim 2024) ---------- */

const skKitaInfo = {
  nama: "Kita (Partai Golkar)",
  partai: "GOLKAR",
  color: "#4f46e5",
  suara2024: 538147,
};

const skKompetitorList = [
  { id: "gerindra", nama: "Partai Gerindra", partai: "GERINDRA", color: "#f97316", suara2024: 307259 },
  { id: "pdip", nama: "PDI Perjuangan", partai: "PDIP", color: "#dc2626", suara2024: 252714 },
  { id: "nasdem", nama: "Partai NasDem", partai: "NASDEM", color: "#2563eb", suara2024: 227803 },
  { id: "pks", nama: "PKS", partai: "PKS", color: "#f59e0b", suara2024: 145538 },
  { id: "pkb", nama: "PKB", partai: "PKB", color: "#16a34a", suara2024: 143852 },
  { id: "pan", nama: "PAN", partai: "PAN", color: "#0ea5e9", suara2024: 111141 },
];

const skSimulasiKursiInfo = {
  dapil: "Kalimantan Timur",
  totalKursi: 8,
  metode: "Sainte Lague",
  tahunPemilu: 2024,
  partaiAman: { nama: "Partai Golkar", suara: 538147, kursi: 2 },
  thresholdKursiKe2: 333424,
  kursiTerakhir: { partai: "PAN", suara: 111141, kursiKe: 8 },
};

const skSimulasiKursiData = [
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

const skIndeksHargaKursiInfo = {
  totalSuaraSah2024: 2013394,
  totalKursi: 8,
  bppNominal: 251674,
  hargaKursiMinimal: 111142,
  rataRataSuaraCaleg2019: 80647,
  totalSuaraCaleg2019: 45242731,
  totalCalegTerpilih2019: 561,
};

/* ---------- STUDI KASUS 1: SIMULASI KEBUTUHAN SUARA 2 KURSI ---------- */

function skComputeSimulasiKursiRows() {
  const rows = skSimulasiKursiData.map((p) => {
    const partai = skKompetitorList.find((c) => c.id === p.id);
    const suara2024 = partai.suara2024;
    const kekurangan = skSimulasiKursiInfo.thresholdKursiKe2 - suara2024;
    const pctKenaikan = suara2024 ? (kekurangan / suara2024) * 100 : 0;
    return { partai: partai.nama, suara2024, kekurangan, pctKenaikan, catatan: p.catatan };
  });
  rows.sort((a, b) => a.kekurangan - b.kekurangan);
  return rows;
}

function skRenderSimulasiKursi() {
  const tbody = document.getElementById("skSimulasiKursiTableBody");
  if (!tbody) return;

  const rows = skComputeSimulasiKursiRows();
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
        <td>${formatNumber(skSimulasiKursiInfo.thresholdKursiKe2)}</td>
        <td>${formatNumber(p.kekurangan)}</td>
        <td>${formatPercent(p.pctKenaikan)}</td>
        <td>${p.catatan}</td>
      </tr>
    `,
    )
    .join("");

  skRenderSimulasiKursiChart(rows);
}

function skRenderSimulasiKursiChart(rows) {
  const container = document.getElementById("skSimulasiKursiChart");
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

/* ---------- STUDI KASUS 2: INDEKS HARGA KURSI & PROYEKSI 2029 ---------- */

function skRenderIndeksHargaKursi() {
  skRenderIndeksKpiCards();
  skRenderIndeksKursiTable();
  skRenderPosisiBatasKursiChart();
  skRenderIndeksTrendChart();
}

function skRenderIndeksKpiCards() {
  const grid = document.getElementById("skIndeksKpiGrid");
  if (!grid) return;

  const cards = [
    {
      icon: "fa-chart-simple",
      label: "Harga Kursi Rata-rata (BPP Nominal)",
      value: `${formatNumber(skIndeksHargaKursiInfo.bppNominal)}`,
      note: `Suara/Kursi \u2022 ${formatNumber(skIndeksHargaKursiInfo.totalSuaraSah2024)} : ${skIndeksHargaKursiInfo.totalKursi} kursi`,
    },
    {
      icon: "fa-shield-halved",
      label: "Harga Kursi Minimal / Batas Aman Riil",
      value: `${formatNumber(skIndeksHargaKursiInfo.hargaKursiMinimal)}`,
      note: `Suara \u2022 ditentukan kursi ke-8 (${skSimulasiKursiInfo.kursiTerakhir.partai})`,
    },
    {
      icon: "fa-user-group",
      label: "Rata-rata Suara Individu Caleg Terpilih",
      value: `${formatNumber(skIndeksHargaKursiInfo.rataRataSuaraCaleg2019)}`,
      note: `Suara/caleg \u2022 ${formatNumber(skIndeksHargaKursiInfo.totalSuaraCaleg2019)} : ${skIndeksHargaKursiInfo.totalCalegTerpilih2019} caleg (2019)`,
    },
    {
      icon: "fa-bullseye",
      label: "Total Suara Sah Pemilu 2024",
      value: `${formatNumber(skIndeksHargaKursiInfo.totalSuaraSah2024)}`,
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

function skRenderIndeksKursiTable() {
  const tbody = document.getElementById("skIndeksKursiTableBody");
  if (!tbody) return;

  const rows = skKompetitorList
    .map((c) => {
      const target2Kursi = c.suara2024 / 3;
      const kekurangan = skSimulasiKursiInfo.thresholdKursiKe2 - c.suara2024;
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
        <td>${formatNumber(skSimulasiKursiInfo.thresholdKursiKe2)}</td>
        <td>${formatNumber(p.kekurangan)}</td>
        <td>${formatPercent(p.pctKenaikan)}</td>
      </tr>
    `,
    )
    .join("");
}

function skRenderPosisiBatasKursiChart() {
  const container = document.getElementById("skPosisiBatasKursiChart");
  if (!container) return;

  const allParties = [
    { nama: "Golkar", suara: skKitaInfo.suara2024 },
    ...skKompetitorList.map((c) => ({ nama: c.nama.replace("Partai ", ""), suara: c.suara2024 })),
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
          value: skIndeksHargaKursiInfo.hargaKursiMinimal,
          color: "#dc2626",
          dashStyle: "Dash",
          width: 2,
          zIndex: 5,
          label: {
            text: `Ambang Batas Minimal (Kursi ke-8)<br>${formatNumber(skIndeksHargaKursiInfo.hargaKursiMinimal)} suara`,
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

function skRenderIndeksTrendChart() {
  const container = document.getElementById("skIndeksTrendChart");
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
   DROPDOWN CONTROLLER
   -----------------------------------------------------
   Studi Kasus 1 & 2 perlu di-render via JS (tabel + chart).
   Studi Kasus 3, 4, 5 murni HTML statis, jadi cuma perlu
   ditampilkan (tidak perlu render ulang tiap kali dipilih).
   Chart di-render ulang setiap panel ditampilkan supaya
   Highcharts tidak salah hitung lebar container yang tadinya
   display:none.
===================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const select = document.getElementById("studiKasusSelect");
  const defaultWidgets = document.getElementById("defaultAiWidgets");
  const panels = {
    1: document.getElementById("studiKasusPanel1"),
    2: document.getElementById("studiKasusPanel2"),
    3: document.getElementById("studiKasusPanel3"),
    4: document.getElementById("studiKasusPanel4"),
    5: document.getElementById("studiKasusPanel5"),
  };

  if (!select) return;

  select.addEventListener("change", () => {
    const val = select.value;

    Object.values(panels).forEach((p) => {
      if (p) p.style.display = "none";
    });

    if (!val) {
      if (defaultWidgets) defaultWidgets.style.display = "";
      return;
    }

    if (defaultWidgets) defaultWidgets.style.display = "none";
    const panel = panels[val];
    if (!panel) return;
    panel.style.display = "";

    if (val === "1") skRenderSimulasiKursi();
    if (val === "2") skRenderIndeksHargaKursi();
  });
});
