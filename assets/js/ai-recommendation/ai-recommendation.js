/**
 * =====================================================
 * POLITICAL INTELLIGENCE 2029
 * AI Recommendation - Decision Support Engine
 * =====================================================
 *
 * CATATAN:
 * Semua angka & narasi di bawah ini DATA DUMMY / template
 * (struktur & data kecamatan sama seperti analisis-wilayah.js
 * & heatmap.js supaya ketiga modul konsisten).
 *
 * PRINSIP PENTING (sesuai arahan): untuk dummy, angka simulasi
 * boleh dipakai. Begitu data KPU asli sudah masuk, seluruh
 * rekomendasi & narasi di file ini WAJIB dihitung dari data
 * yang tersedia (fungsi buildAlasan/buildTindakan/narrative di
 * bawah), BUKAN dikarang bebas oleh AI/hardcode manual.
 *
 * Halaman ini adalah "otak interpretasi": mengonsumsi data yang
 * sama dengan Heatmap & Analisis Wilayah, lalu menerjemahkannya
 * jadi rekomendasi tindakan yang actionable.
 * =====================================================
 */

/* =====================================================
   DATA DUMMY: KABUPATEN/KOTA & KECAMATAN
   (identik dengan analisis-wilayah.js / heatmap.js)
===================================================== */

const kabupatenList = [
  "Samarinda",
  "Balikpapan",
  "Bontang",
  "Kutai Kartanegara",
  "Kutai Timur",
  "Kutai Barat",
  "Paser",
  "Penajam Paser Utara",
];

const kecamatanData = [
  {
    kabupaten: "Samarinda",
    nama: "Samarinda Ulu",
    dpt: 145000,
    tps: 210,
    historis: 58000,
    target: 75000,
  },
  {
    kabupaten: "Samarinda",
    nama: "Samarinda Ilir",
    dpt: 98000,
    tps: 140,
    historis: 52000,
    target: 48000,
  },
  {
    kabupaten: "Samarinda",
    nama: "Samarinda Utara",
    dpt: 162000,
    tps: 225,
    historis: 44000,
    target: 70000,
  },

  {
    kabupaten: "Balikpapan",
    nama: "Balikpapan Utara",
    dpt: 138000,
    tps: 190,
    historis: 61000,
    target: 66000,
  },
  {
    kabupaten: "Balikpapan",
    nama: "Balikpapan Selatan",
    dpt: 121000,
    tps: 168,
    historis: 70000,
    target: 68000,
  },
  {
    kabupaten: "Balikpapan",
    nama: "Balikpapan Timur",
    dpt: 95000,
    tps: 130,
    historis: 38000,
    target: 55000,
  },

  {
    kabupaten: "Bontang",
    nama: "Bontang Utara",
    dpt: 52000,
    tps: 74,
    historis: 21000,
    target: 30000,
  },
  {
    kabupaten: "Bontang",
    nama: "Bontang Selatan",
    dpt: 47000,
    tps: 66,
    historis: 25000,
    target: 27000,
  },
  {
    kabupaten: "Bontang",
    nama: "Bontang Barat",
    dpt: 31000,
    tps: 44,
    historis: 12000,
    target: 18000,
  },

  {
    kabupaten: "Kutai Kartanegara",
    nama: "Tenggarong",
    dpt: 88000,
    tps: 120,
    historis: 34000,
    target: 50000,
  },
  {
    kabupaten: "Kutai Kartanegara",
    nama: "Tenggarong Seberang",
    dpt: 61000,
    tps: 84,
    historis: 22000,
    target: 35000,
  },
  {
    kabupaten: "Kutai Kartanegara",
    nama: "Loa Janan",
    dpt: 44000,
    tps: 60,
    historis: 19000,
    target: 24000,
  },

  {
    kabupaten: "Kutai Timur",
    nama: "Sangatta Utara",
    dpt: 76000,
    tps: 104,
    historis: 29000,
    target: 45000,
  },
  {
    kabupaten: "Kutai Timur",
    nama: "Sangatta Selatan",
    dpt: 53000,
    tps: 72,
    historis: 24000,
    target: 30000,
  },
  {
    kabupaten: "Kutai Timur",
    nama: "Bengalon",
    dpt: 29000,
    tps: 40,
    historis: 9000,
    target: 16000,
  },

  {
    kabupaten: "Kutai Barat",
    nama: "Barong Tongkok",
    dpt: 38000,
    tps: 52,
    historis: 14000,
    target: 22000,
  },
  {
    kabupaten: "Kutai Barat",
    nama: "Melak",
    dpt: 26000,
    tps: 36,
    historis: 11000,
    target: 15000,
  },
  {
    kabupaten: "Kutai Barat",
    nama: "Long Iram",
    dpt: 19000,
    tps: 26,
    historis: 6000,
    target: 11000,
  },

  {
    kabupaten: "Paser",
    nama: "Tanah Grogot",
    dpt: 47000,
    tps: 64,
    historis: 16000,
    target: 28000,
  },
  {
    kabupaten: "Paser",
    nama: "Batu Sopang",
    dpt: 22000,
    tps: 30,
    historis: 8000,
    target: 14000,
  },
  {
    kabupaten: "Paser",
    nama: "Long Ikis",
    dpt: 25000,
    tps: 34,
    historis: 9000,
    target: 15000,
  },

  {
    kabupaten: "Penajam Paser Utara",
    nama: "Penajam",
    dpt: 58000,
    tps: 80,
    historis: 27000,
    target: 34000,
  },
  {
    kabupaten: "Penajam Paser Utara",
    nama: "Sepaku",
    dpt: 41000,
    tps: 56,
    historis: 16000,
    target: 30000,
  },
  {
    kabupaten: "Penajam Paser Utara",
    nama: "Waru",
    dpt: 18000,
    tps: 24,
    historis: 8000,
    target: 12000,
  },
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
  return Math.round(min + rand * (max - min));
}

function formatNumber(n) {
  return Math.round(n).toLocaleString("id-ID");
}

function getLevel(score) {
  if (score >= 66) return { key: "tinggi", label: "Tinggi" };
  if (score >= 33) return { key: "sedang", label: "Sedang" };
  return { key: "rendah", label: "Rendah" };
}

function getPriorityBucket(score) {
  if (score >= 90)
    return {
      key: "sangat-tinggi",
      label: "Prioritas Sangat Tinggi",
      color: "#dc2626",
    };
  if (score >= 75)
    return { key: "tinggi", label: "Prioritas Tinggi", color: "#f97316" };
  if (score >= 60)
    return { key: "sedang", label: "Prioritas Sedang", color: "#eab308" };
  return { key: "rendah", label: "Prioritas Rendah", color: "#16a34a" };
}

function getPriorityLabelForTps(gap) {
  if (gap >= 15000) return { key: "tinggi", label: "Tinggi" };
  if (gap >= 6000) return { key: "sedang", label: "Sedang" };
  return { key: "rendah", label: "Rendah" };
}

/* =====================================================
   HITUNG FIELD TURUNAN & PRIORITY SCORE
   (formula identik dengan heatmap.js supaya konsisten
   lintas modul)
===================================================== */

kecamatanData.forEach((k) => {
  k.gap = k.target - k.historis;
  k.potensi = Math.round((k.historis / k.target) * 100);
  // dummy placeholder, pending modul Kompetitor asli
  k.competisi = seededScore(k.nama, 40, 88);
});

const dptValues = kecamatanData.map((k) => k.dpt);
const historisValues = kecamatanData.map((k) => k.historis);
const gapValues = kecamatanData.map((k) => k.gap);
const potentialRatios = kecamatanData.map((k) => k.gap / k.dpt);
const gapPerTpsValues = kecamatanData.map((k) => k.gap / k.tps);

const dptMin = Math.min(...dptValues),
  dptMax = Math.max(...dptValues);
const historisMin = Math.min(...historisValues),
  historisMax = Math.max(...historisValues);
const gapMin = Math.min(...gapValues),
  gapMax = Math.max(...gapValues);
const potentialMin = Math.min(...potentialRatios),
  potentialMax = Math.max(...potentialRatios);
const gapPerTpsMin = Math.min(...gapPerTpsValues),
  gapPerTpsMax = Math.max(...gapPerTpsValues);

kecamatanData.forEach((k, i) => {
  k.dptScore = normalize(k.dpt, dptMin, dptMax);
  k.historisScore = normalize(k.historis, historisMin, historisMax);
  k.gapScore = normalize(k.gap, gapMin, gapMax);
  k.potentialScore = normalize(potentialRatios[i], potentialMin, potentialMax);
  k.tpsPotentialScore = normalize(
    gapPerTpsValues[i],
    gapPerTpsMin,
    gapPerTpsMax,
  );

  k.priorityScore = Math.round(
    k.gapScore * 0.35 +
      k.potentialScore * 0.2 +
      k.historisScore * 0.15 +
      k.dptScore * 0.15 +
      k.competisi * 0.15,
  );
  k.priorityScore = Math.min(100, Math.max(0, k.priorityScore));
  k.bucket = getPriorityBucket(k.priorityScore);
});

/* =====================================================
   STATE & FILTER
===================================================== */

const state = { kabupaten: "" };

function getFilteredData() {
  return kecamatanData.filter(
    (k) => !state.kabupaten || k.kabupaten === state.kabupaten,
  );
}

/* =====================================================
   INIT
===================================================== */

document.addEventListener("DOMContentLoaded", () => {
  populateFilters();
  bindFilterEvents();
  renderAll();
});

function populateFilters() {
  const select = document.getElementById("filterKabupaten");
  kabupatenList.forEach((nama) => {
    const opt = document.createElement("option");
    opt.value = nama;
    opt.textContent = nama;
    select.appendChild(opt);
  });
}

function bindFilterEvents() {
  document.getElementById("filterKabupaten").addEventListener("change", (e) => {
    state.kabupaten = e.target.value;
    renderAll();
  });

  document.getElementById("resetFilterBtn").addEventListener("click", () => {
    state.kabupaten = "";
    document.getElementById("filterKabupaten").value = "";
    renderAll();
  });
}

function renderAll() {
  renderExecutiveSummary();
  renderWilayahPrioritas();
  renderRekomendasiPerWilayah();
  renderStrategiSegmen();
  renderPrioritasTps();
  renderActionPlan();
}

/* =====================================================
   1. EXECUTIVE SUMMARY
===================================================== */

function renderExecutiveSummary() {
  const data = getFilteredData();
  const sorted = [...data].sort((a, b) => b.priorityScore - a.priorityScore);

  const totalGap = data.filter((k) => k.gap > 0).reduce((s, k) => s + k.gap, 0);
  const highPriorityCount = data.filter((k) => k.priorityScore >= 75).length;
  const avgScore = Math.round(
    data.reduce((s, k) => s + k.priorityScore, 0) / data.length,
  );

  const cards = [
    { label: "Wilayah Dianalisis", value: data.length, note: "kecamatan" },
    {
      label: "Prioritas Tinggi ke Atas",
      value: highPriorityCount,
      note: "dari total wilayah",
    },
    {
      label: "Total Gap Menuju Target",
      value: formatNumber(totalGap),
      note: "suara",
    },
    { label: "Rata-rata Priority Score", value: avgScore, note: "skala 0-100" },
  ];

  document.getElementById("summaryKpiGrid").innerHTML = cards
    .map(
      (c) => `
      <div class="summary-kpi-card">
        <span>${c.label}</span>
        <h2>${c.value}</h2>
        <small>${c.note}</small>
      </div>
    `,
    )
    .join("");

  const top = sorted[0];
  const scope = state.kabupaten ? `di ${state.kabupaten}` : "di seluruh dapil";

  document.getElementById("summaryNarrative").innerHTML = top
    ? `Dari <strong>${data.length} kecamatan</strong> yang dianalisis ${scope}, <strong>${highPriorityCount} wilayah</strong> masuk kategori prioritas tinggi ke atas, dengan total gap sebesar <strong>${formatNumber(totalGap)} suara</strong> menuju target 2029. Wilayah dengan skor tertinggi adalah <strong>${top.nama}</strong> (Priority Score ${top.priorityScore}) yang membutuhkan tambahan <strong>${formatNumber(top.gap > 0 ? top.gap : 0)} suara</strong> untuk mencapai target. Fokuskan sumber daya pada wilayah prioritas sebelum memperluas ke wilayah dengan skor lebih rendah.`
    : "Tidak ada data pada filter ini.";
}

/* =====================================================
   2. WILAYAH PRIORITAS (tabel ranking)
===================================================== */

function renderWilayahPrioritas() {
  const data = [...getFilteredData()].sort(
    (a, b) => b.priorityScore - a.priorityScore,
  );
  const tbody = document.getElementById("prioritasTableBody");

  tbody.innerHTML = data
    .map(
      (k, i) => `
      <tr>
        <td>${i + 1}</td>
        <td>${k.nama}</td>
        <td>${k.kabupaten}</td>
        <td>${formatNumber(k.historis)}</td>
        <td>${formatNumber(k.target)}</td>
        <td>${k.gap >= 0 ? "+" : ""}${formatNumber(k.gap)}</td>
        <td><span class="priority-score-pill" style="background:${k.bucket.color}">${k.priorityScore}</span></td>
        <td><span class="priority-badge ${priorityBadgeKey(k.bucket.key)}">${k.bucket.label}</span></td>
      </tr>
    `,
    )
    .join("");
}

// map bucket 4-level -> 3 kelas class badge yang sudah ada di CSS (tinggi/sedang/rendah)
function priorityBadgeKey(bucketKey) {
  if (bucketKey === "sangat-tinggi" || bucketKey === "tinggi") return "tinggi";
  if (bucketKey === "sedang") return "sedang";
  return "rendah";
}

/* =====================================================
   3. REKOMENDASI PER WILAYAH (cards + Why panel)
===================================================== */

function buildAlasan(k) {
  const dpt = getLevel(k.dptScore);
  const his = getLevel(k.historisScore);
  const pot = getLevel(k.potentialScore);

  const bullets = [];
  bullets.push(
    `Basis pemilih ${dpt.label.toLowerCase()} (DPT ${formatNumber(k.dpt)})`,
  );
  bullets.push(
    `Perolehan historis ${his.label.toLowerCase()} (${formatNumber(k.historis)} suara, ${k.potensi}% dari target)`,
  );
  bullets.push(
    k.gap > 0
      ? `Gap menuju target masih ${formatNumber(k.gap)} suara`
      : `Sudah melebihi target sebanyak ${formatNumber(-k.gap)} suara`,
  );
  bullets.push(
    `Potensi pertumbuhan ${pot.label.toLowerCase()} relatif terhadap basis pemilih`,
  );
  return bullets;
}

function buildTindakan(k) {
  switch (k.bucket.key) {
    case "sangat-tinggi":
      return [
        "Prioritaskan sumber daya & relawan di wilayah ini.",
        "Fokuskan kegiatan pada TPS dengan gap terbesar di kecamatan ini.",
        "Tingkatkan coverage lapangan sebelum memperluas ke wilayah dengan priority score lebih rendah.",
      ];
    case "tinggi":
      return [
        "Alokasikan sumber daya tambahan secara bertahap.",
        "Perkuat kampanye digital & tatap muka di segmen usia produktif.",
        "Pantau perkembangan gap setiap 2 minggu.",
      ];
    case "sedang":
      return [
        "Pertahankan aktivitas rutin tanpa penambahan sumber daya besar.",
        "Gunakan wilayah ini sebagai basis penguatan jaringan relawan.",
      ];
    default:
      return [
        "Pertahankan basis suara yang sudah ada.",
        "Alokasikan sumber daya minimal, fokuskan ke wilayah prioritas lain.",
      ];
  }
}

function renderRekomendasiPerWilayah() {
  const data = [...getFilteredData()]
    .sort((a, b) => b.priorityScore - a.priorityScore)
    .slice(0, 6);
  const container = document.getElementById("rekomendasiCards");

  if (!data.length) {
    container.innerHTML = `<p style="color:var(--text-light);">Tidak ada data pada filter ini.</p>`;
    return;
  }

  container.innerHTML = data
    .map((k, i) => {
      const alasan = buildAlasan(k);
      const tindakan = buildTindakan(k);
      const estimasi =
        k.gap > 0
          ? `+${formatNumber(k.gap)} suara`
          : "Pertahankan perolehan saat ini";

      const dptLevel = getLevel(k.dptScore);
      const hisLevel = getLevel(k.historisScore);
      const gapLevel = getLevel(k.gapScore);
      const tpsLevel = getLevel(k.tpsPotentialScore);

      return `
        <div class="rekomendasi-card-full" id="rc-${i}">
          <div class="rc-header">
            <div class="rc-header-title">
              <div class="rc-rank-badge">#${i + 1}</div>
              <div>
                <h4>${k.nama}</h4>
                <small>${k.kabupaten}</small>
              </div>
            </div>
            <span class="rc-status-badge" style="background:${k.bucket.color}">
              Priority Score ${k.priorityScore} &middot; ${k.bucket.label}
            </span>
          </div>

          <div class="rc-body">
            <div class="rc-col">
              <h5>Alasan</h5>
              <ul class="rc-alasan-list">
                ${alasan.map((a) => `<li>${a}</li>`).join("")}
              </ul>
            </div>

            <div class="rc-col">
              <h5>Rekomendasi Tindakan</h5>
              <ol class="rc-tindakan-list">
                ${tindakan.map((t) => `<li>${t}</li>`).join("")}
              </ol>
              <div class="rc-estimasi">
                <i class="fa-solid fa-arrow-trend-up"></i>
                Estimasi target: ${estimasi}
              </div>
            </div>
          </div>

          <div class="rc-footer">
            <button class="rc-why-btn" data-target="rc-${i}">
              <i class="fa-solid fa-circle-question"></i>
              Mengapa direkomendasikan?
            </button>
          </div>

          <div class="rc-why-panel" id="rc-why-${i}">
            <h5>Why This Recommendation?</h5>
            <div class="why-metric-grid">
              <div class="why-metric">
                <span>Priority Score</span>
                <strong>${k.priorityScore}</strong>
              </div>
              <div class="why-metric level-${dptLevel.key}">
                <span>DPT Density</span>
                <strong>${dptLevel.label}</strong>
              </div>
              <div class="why-metric level-${hisLevel.key}">
                <span>Historical Vote</span>
                <strong>${hisLevel.label}</strong>
              </div>
              <div class="why-metric level-${gapLevel.key}">
                <span>Gap Target</span>
                <strong>${gapLevel.label}</strong>
              </div>
            </div>
            <div class="why-metric-grid" style="grid-template-columns: repeat(1, 1fr);">
              <div class="why-metric level-${tpsLevel.key}" style="text-align:left;">
                <span>TPS Potential</span>
                <strong>${tpsLevel.label}</strong>
              </div>
            </div>
            <div class="why-conclusion">
              <strong>Kesimpulan:</strong>
              Wilayah memiliki kombinasi basis pemilih ${dptLevel.label.toLowerCase()}, performa historis yang ${hisLevel.label.toLowerCase().replace("tinggi", "cukup baik").replace("rendah", "masih lemah")}, dan gap target yang ${k.gap > 0 ? "masih dapat dikejar" : "sudah tercapai"}.
            </div>
          </div>
        </div>
      `;
    })
    .join("");

  container.querySelectorAll(".rc-why-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.dataset.target;
      const panel = document.getElementById(`rc-why-${targetId.split("-")[1]}`);
      panel.classList.toggle("open");
    });
  });
}

/* =====================================================
   4. STRATEGI SEGMEN
   Template pendekatan generik per tingkat prioritas
   (belum berdasarkan data demografi asli - dummy dulu)
===================================================== */

const SEGMEN_STRATEGY = [
  {
    tier: "Prioritas Sangat Tinggi",
    color: "#dc2626",
    audiens: "Pemilih muda (17-30 tahun) & keluarga di area padat penduduk",
    channel: "Kampanye digital tersegmentasi + kunjungan door-to-door intensif",
    pesan:
      "Isu lokal spesifik wilayah, janji program yang terasa langsung dampaknya",
  },
  {
    tier: "Prioritas Tinggi",
    color: "#f97316",
    audiens: "Pemilih swing & kelompok usia produktif",
    channel: "Media sosial + kegiatan komunitas (arisan, pengajian, olahraga)",
    pesan: "Rekam jejak & bukti konkret, ajakan bergabung sebagai relawan",
  },
  {
    tier: "Prioritas Sedang",
    color: "#eab308",
    audiens: "Basis pendukung yang sudah stabil",
    channel: "Media sosial reguler + newsletter/whatsapp blast",
    pesan: "Penguatan loyalitas, update program & pencapaian",
  },
  {
    tier: "Prioritas Rendah",
    color: "#16a34a",
    audiens: "Basis suara yang sudah dominan",
    channel: "Komunikasi minimal, monitoring rutin",
    pesan: "Apresiasi & ajakan menjadi juru kampanye ke wilayah lain",
  },
];

function renderStrategiSegmen() {
  document.getElementById("segmenGrid").innerHTML = SEGMEN_STRATEGY.map(
    (s) => `
      <div class="segmen-card">
        <span class="segmen-tier" style="background:${s.color}">${s.tier}</span>
        <dl>
          <div>
            <dt>Target Audiens</dt>
            <dd>${s.audiens}</dd>
          </div>
          <div>
            <dt>Channel</dt>
            <dd>${s.channel}</dd>
          </div>
          <div>
            <dt>Pesan / Pendekatan</dt>
            <dd>${s.pesan}</dd>
          </div>
        </dl>
      </div>
    `,
  ).join("");
}

/* =====================================================
   5. PRIORITAS TPS
   (sintesis dummy dari kecamatan prioritas tertinggi,
   karena data per-TPS asli belum ada)
===================================================== */

function renderPrioritasTps() {
  const topKecamatan = [...getFilteredData()]
    .filter((k) => k.gap > 0)
    .sort((a, b) => b.priorityScore - a.priorityScore)
    .slice(0, 5);

  const rows = [];

  topKecamatan.forEach((k) => {
    const sampleTps = Math.min(3, k.tps);

    for (let i = 1; i <= sampleTps; i++) {
      const dptTps = Math.round(k.dpt / k.tps);
      const historisTps = Math.round(k.historis / k.tps);
      const targetTps = Math.round(k.target / k.tps);
      const gapTps = targetTps - historisTps;
      const priority = getPriorityLabelForTps(gapTps * (k.tps / sampleTps));

      rows.push({
        tps: `TPS ${String(i).padStart(3, "0")}`,
        kecamatan: k.nama,
        dpt: dptTps,
        historis: historisTps,
        target: targetTps,
        gap: gapTps,
        priority,
      });
    }
  });

  const tbody = document.getElementById("tpsPrioritasTable");

  if (!rows.length) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align:center;color:var(--text-light);">Tidak ada TPS prioritas pada filter ini.</td></tr>`;
    return;
  }

  tbody.innerHTML = rows
    .map(
      (r) => `
      <tr>
        <td>${r.tps}</td>
        <td>${r.kecamatan}</td>
        <td>${formatNumber(r.dpt)}</td>
        <td>${formatNumber(r.historis)}</td>
        <td>${formatNumber(r.target)}</td>
        <td>${r.gap >= 0 ? "+" : ""}${formatNumber(r.gap)}</td>
        <td><span class="priority-badge ${r.priority.key}">${r.priority.label}</span></td>
      </tr>
    `,
    )
    .join("");
}

/* =====================================================
   6. ACTION PLAN
===================================================== */

function renderActionPlan() {
  const top = [...getFilteredData()]
    .sort((a, b) => b.priorityScore - a.priorityScore)
    .slice(0, 6);
  const tbody = document.getElementById("actionPlanTable");

  if (!top.length) {
    tbody.innerHTML = `<tr><td colspan="4" style="text-align:center;color:var(--text-light);">Tidak ada data pada filter ini.</td></tr>`;
    return;
  }

  tbody.innerHTML = top
    .map((k) => {
      const tindakan = buildTindakan(k)[0];
      const estimasi =
        k.gap > 0 ? `+${formatNumber(k.gap)} suara` : "Pertahankan perolehan";

      return `
      <tr>
        <td>${tindakan}</td>
        <td>${k.nama}, ${k.kabupaten}</td>
        <td><span class="priority-badge ${priorityBadgeKey(k.bucket.key)}">${k.bucket.label}</span></td>
        <td>${estimasi}</td>
      </tr>
    `;
    })
    .join("");
}
