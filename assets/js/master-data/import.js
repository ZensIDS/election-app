/**
 * =====================================================
 * POLITICAL INTELLIGENCE 2029
 * Import Data - Data Ingestion Center
 * =====================================================
 *
 * CATATAN PENTING (baca dulu):
 * - Parsing XLSX/XLS/CSV di sini SUNGGUHAN (pakai SheetJS),
 *   bukan simulasi - file yang di-upload benar-benar dibaca.
 * - Parsing PDF sengaja HANYA disimulasikan (progress bar +
 *   data contoh), sesuai arahan awal: parser PDF sungguhan
 *   di luar scope demo client-side ini.
 * - Karena tiap halaman Master Data (wilayah.js, dapil.js,
 *   dst) punya state in-memory sendiri-sendiri dan belum ada
 *   backend/shared store, hasil import DI SINI TIDAK benar-
 *   benar masuk ke halaman Data Wilayah/Dapil/dst. Ini murni
 *   memvalidasi & mencatat riwayat - integrasi nyata butuh
 *   backend.
 * =====================================================
 */

/* =====================================================
   KONFIGURASI JENIS DATA & SKEMA KOLOM
===================================================== */

const jenisConfig = {
  wilayah: {
    label: "Data Wilayah",
    icon: "fa-map-location-dot",
    desc: "Import wilayah administratif",
    columns: [
      { key: "kode", label: "Kode Wilayah", required: true, numeric: false },
      { key: "nama", label: "Nama Wilayah", required: true, numeric: false },
      { key: "jenis", label: "Jenis Wilayah", required: true, numeric: false },
      { key: "induk", label: "Wilayah Induk", required: false, numeric: false },
      { key: "status", label: "Status", required: false, numeric: false },
    ],
  },
  dapil: {
    label: "Data Dapil",
    icon: "fa-landmark",
    desc: "Import daerah pemilihan",
    columns: [
      { key: "kode", label: "Kode Dapil", required: true, numeric: false },
      { key: "nama", label: "Nama Dapil", required: true, numeric: false },
      { key: "jenisPemilu", label: "Jenis Pemilu", required: true, numeric: false },
      { key: "kursi", label: "Jumlah Kursi", required: true, numeric: true },
      { key: "target", label: "Target Suara", required: false, numeric: true },
    ],
  },
  partai: {
    label: "Data Partai",
    icon: "fa-flag",
    desc: "Import partai politik",
    columns: [
      { key: "noUrut", label: "Nomor Urut", required: true, numeric: true },
      { key: "nama", label: "Nama Partai", required: true, numeric: false },
      { key: "singkatan", label: "Singkatan", required: false, numeric: false },
    ],
  },
  calon: {
    label: "Data Calon",
    icon: "fa-user",
    desc: "Import calon legislatif",
    columns: [
      { key: "noUrut", label: "Nomor Urut", required: true, numeric: true },
      { key: "nama", label: "Nama Calon", required: true, numeric: false },
      { key: "partai", label: "Partai", required: true, numeric: false },
      { key: "dapil", label: "Dapil", required: true, numeric: false },
      { key: "suara", label: "Perolehan Suara", required: false, numeric: true },
    ],
  },
  tps: {
    label: "Data TPS",
    icon: "fa-building",
    desc: "Import tempat pemungutan suara",
    columns: [
      { key: "nomorTps", label: "Nomor TPS", required: true, numeric: false },
      { key: "desa", label: "Desa/Kelurahan", required: true, numeric: false },
      { key: "kecamatan", label: "Kecamatan", required: true, numeric: false },
      { key: "dpt", label: "DPT", required: true, numeric: true },
    ],
  },
  suara: {
    label: "Data Suara",
    icon: "fa-chart-column",
    desc: "Import hasil perolehan suara",
    columns: [
      { key: "tps", label: "TPS", required: true, numeric: false },
      { key: "partaiCalon", label: "Partai/Calon", required: true, numeric: false },
      { key: "jumlahSuara", label: "Jumlah Suara", required: true, numeric: true },
    ],
  },
};

// Whitelist ringan untuk cross-check (dummy, meniru Data Partai/Dapil yang sudah ada)
const partaiWhitelist = ["Partai A", "Partai B", "Partai C", "Partai D"];
const dapilWhitelist = ["Kalimantan Timur 1", "Kalimantan Timur 2"];

/* =====================================================
   STATE
===================================================== */

const wizard = {
  step: 1,
  jenisKey: null,
  file: null,
  headers: [],
  rawRows: [],
  mapping: {},
  validatedRows: [],
  counts: { total: 0, valid: 0, warning: 0, error: 0, duplikat: 0 },
};

let riwayatData = [
  {
    id: 1,
    waktu: "12 Aug 2026 09:14",
    file: "data_tps.xlsx",
    jenis: "Data TPS",
    jumlah: 1284,
    user: "Admin",
    status: "Berhasil",
    messages: [],
  },
  {
    id: 2,
    waktu: "11 Aug 2026 15:40",
    file: "data_partai.xlsx",
    jenis: "Data Partai",
    jumlah: 18,
    user: "Admin",
    status: "Berhasil",
    messages: [],
  },
  {
    id: 3,
    waktu: "10 Aug 2026 11:02",
    file: "data_calon.xlsx",
    jenis: "Data Calon",
    jumlah: 245,
    user: "Admin",
    status: "Warning",
    messages: ["Baris 124: TPS tidak ditemukan", "Baris 387: Dapil tidak valid"],
  },
];

let nextRiwayatId = 4;

/* =====================================================
   HELPERS
===================================================== */

function formatNumber(n) {
  return Math.round(n).toLocaleString("id-ID");
}

function formatFileSize(bytes) {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

function normalizeText(str) {
  return String(str || "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
}

/* =====================================================
   INIT
===================================================== */

document.addEventListener("DOMContentLoaded", () => {
  renderJenisCards();
  renderSummary();
  renderRiwayat();
  bindUploadEvents();
  bindStepNav();
  bindValidasiEvents();
  bindPreviewEvents();
  bindModalEvents();
});

/* =====================================================
   STEP NAVIGATION
===================================================== */

function goToStep(step) {
  wizard.step = step;

  document.querySelectorAll(".step-panel").forEach((panel) => {
    panel.classList.toggle("active", panel.id === `step${step}`);
  });

  document.querySelectorAll(".step-dot").forEach((dot) => {
    const dotStep = Number(dot.dataset.step);
    dot.classList.toggle("active", dotStep === step);
    dot.classList.toggle("done", dotStep < step);
  });
}

function bindStepNav() {
  document.querySelectorAll("[data-goto]").forEach((btn) => {
    btn.addEventListener("click", () => goToStep(Number(btn.dataset.goto)));
  });
}

/* =====================================================
   STEP 1: PILIH JENIS DATA
===================================================== */

function renderJenisCards() {
  const grid = document.getElementById("jenisGrid");

  grid.innerHTML = Object.entries(jenisConfig)
    .map(
      ([key, cfg]) => `
        <div class="jenis-card" data-jenis="${key}">
          <i class="fa-solid ${cfg.icon}"></i>
          <strong>${cfg.label}</strong>
          <p>${cfg.desc}</p>
        </div>
      `,
    )
    .join("");

  grid.querySelectorAll(".jenis-card").forEach((card) => {
    card.addEventListener("click", () => {
      grid.querySelectorAll(".jenis-card").forEach((c) => c.classList.remove("selected"));
      card.classList.add("selected");

      wizard.jenisKey = card.dataset.jenis;
      resetUploadState();

      const cfg = jenisConfig[wizard.jenisKey];
      document.getElementById("step2Subtitle").textContent =
        `Upload file untuk ${cfg.label}`;

      goToStep(2);
    });
  });
}

/* =====================================================
   STEP 2: UPLOAD
===================================================== */

function resetUploadState() {
  wizard.file = null;
  wizard.headers = [];
  wizard.rawRows = [];
  wizard.mapping = {};
  wizard.validatedRows = [];

  document.getElementById("fileInfo").style.display = "none";
  document.getElementById("pdfProgress").style.display = "none";
  document.getElementById("btnToMapping").disabled = true;
  document.getElementById("fileInput").value = "";
}

function bindUploadEvents() {
  const area = document.getElementById("uploadArea");
  const input = document.getElementById("fileInput");
  const btnPilih = document.getElementById("btnPilihFile");

  btnPilih.addEventListener("click", (e) => {
    e.stopPropagation();
    input.click();
  });

  area.addEventListener("click", () => input.click());

  input.addEventListener("change", () => {
    if (input.files.length) handleFile(input.files[0]);
  });

  ["dragenter", "dragover"].forEach((evt) => {
    area.addEventListener(evt, (e) => {
      e.preventDefault();
      area.classList.add("dragover");
    });
  });

  ["dragleave", "drop"].forEach((evt) => {
    area.addEventListener(evt, (e) => {
      e.preventDefault();
      area.classList.remove("dragover");
    });
  });

  area.addEventListener("drop", (e) => {
    if (e.dataTransfer.files.length) handleFile(e.dataTransfer.files[0]);
  });

  document.getElementById("btnToMapping").addEventListener("click", () => {
    buildMappingStep();
    goToStep(3);
  });
}

function handleFile(file) {
  wizard.file = file;

  const ext = file.name.split(".").pop().toLowerCase();

  document.getElementById("fileInfo").style.display = "flex";
  document.getElementById("fileInfo").innerHTML = `
    <i class="fa-solid ${ext === "pdf" ? "fa-file-pdf" : "fa-file-excel"}"></i>
    <div class="file-meta">
      <strong>${file.name}</strong>
      <small>${formatFileSize(file.size)}</small>
    </div>
    <span class="file-status">Menunggu diproses</span>
    <button class="file-remove" id="btnRemoveFile" title="Hapus file">
      <i class="fa-solid fa-xmark"></i>
    </button>
  `;

  document.getElementById("btnRemoveFile").addEventListener("click", (e) => {
    e.stopPropagation();
    resetUploadState();
  });

  if (ext === "pdf") {
    simulatePdfExtraction(file);
  } else {
    parseSpreadsheet(file);
  }
}

/* ---------- Parsing XLSX / XLS / CSV (SUNGGUHAN) ---------- */

function parseSpreadsheet(file) {
  const reader = new FileReader();

  reader.onload = (e) => {
    try {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const firstSheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[firstSheetName];
      const rows = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: "" });

      if (!rows.length) {
        alert("File kosong atau tidak terbaca.");
        return;
      }

      const headers = rows[0].map((h) => String(h).trim()).filter((h) => h !== "");
      const dataRows = rows
        .slice(1)
        .map((r) => {
          const obj = {};
          headers.forEach((h, i) => {
            obj[h] = r[i] !== undefined ? r[i] : "";
          });
          return obj;
        })
        .filter((row) => Object.values(row).some((v) => String(v).trim() !== ""));

      wizard.headers = headers;
      wizard.rawRows = dataRows;

      updateFileStatus(`${dataRows.length} baris terbaca`, true);
      document.getElementById("btnToMapping").disabled = false;
    } catch (err) {
      console.error(err);
      alert("Gagal membaca file. Pastikan formatnya XLSX/XLS/CSV yang valid.");
    }
  };

  reader.readAsArrayBuffer(file);
}

function updateFileStatus(text, ready) {
  const statusEl = document.querySelector("#fileInfo .file-status");
  if (!statusEl) return;

  statusEl.textContent = text;
  statusEl.style.background = ready ? "#dcfce7" : "#fef3c7";
  statusEl.style.color = ready ? "#15803d" : "#b45309";
}

/* ---------- Simulasi ekstraksi PDF ---------- */

function simulatePdfExtraction(file) {
  const progressWrap = document.getElementById("pdfProgress");
  const fill = document.getElementById("pdfProgressFill");
  const label = document.getElementById("pdfProgressLabel");

  progressWrap.style.display = "block";
  updateFileStatus("Membaca PDF...", false);

  let pct = 0;
  const interval = setInterval(() => {
    pct += Math.random() * 18 + 7;
    if (pct >= 100) {
      pct = 100;
      clearInterval(interval);

      fill.style.width = "100%";
      label.textContent = "100%";

      setTimeout(() => {
        generateSimulatedPdfData();
        updateFileStatus(`${wizard.rawRows.length} baris diekstrak (simulasi)`, true);
        document.getElementById("btnToMapping").disabled = false;
      }, 300);

      return;
    }

    fill.style.width = pct + "%";
    label.textContent = Math.round(pct) + "%";
  }, 220);
}

function generateSimulatedPdfData() {
  // Data contoh hasil "ekstraksi" PDF - disesuaikan skema jenis yang dipilih
  const cfg = jenisConfig[wizard.jenisKey];
  const headers = cfg.columns.map((c) => c.label);

  const sampleValues = {
    "Kode Wilayah": (i) => `64.72.${String(i + 1).padStart(2, "0")}`,
    "Nama Wilayah": (i) => `Kecamatan Contoh ${i + 1}`,
    "Jenis Wilayah": () => "Kecamatan",
    "Wilayah Induk": () => "Samarinda",
    "Kode Dapil": (i) => `KALTIM-0${i + 1}`,
    "Nama Dapil": (i) => `Kalimantan Timur ${i + 1}`,
    "Jenis Pemilu": () => "DPR RI",
    "Jumlah Kursi": () => 6 + Math.floor(Math.random() * 4),
    "Target Suara": () => 50000 + Math.floor(Math.random() * 40000),
    "Nomor Urut": (i) => i + 1,
    "Nama Partai": (i) => `Partai ${String.fromCharCode(65 + (i % 4))}`,
    Singkatan: (i) => `P${String.fromCharCode(65 + (i % 4))}`,
    "Nama Calon": (i) => `Calon Contoh ${i + 1}`,
    Partai: (i) => partaiWhitelist[i % partaiWhitelist.length],
    Dapil: (i) => dapilWhitelist[i % dapilWhitelist.length],
    "Perolehan Suara": () => 5000 + Math.floor(Math.random() * 20000),
    "Nomor TPS": (i) => String(i + 1).padStart(3, "0"),
    "Desa/Kelurahan": (i) => `Desa Contoh ${((i % 5) + 1)}`,
    Kecamatan: () => "Samarinda Ulu",
    DPT: () => 250 + Math.floor(Math.random() * 200),
    TPS: (i) => String(i + 1).padStart(3, "0"),
    "Partai/Calon": (i) => `Partai ${String.fromCharCode(65 + (i % 4))}`,
    "Jumlah Suara": () => 20 + Math.floor(Math.random() * 200),
    Status: () => "Aktif",
  };

  const totalRows = 20;
  const dataRows = [];

  for (let i = 0; i < totalRows; i++) {
    const row = {};
    headers.forEach((h) => {
      row[h] = sampleValues[h] ? sampleValues[h](i) : "";
    });
    dataRows.push(row);
  }

  wizard.headers = headers;
  wizard.rawRows = dataRows;
}

/* =====================================================
   STEP 3: MAPPING KOLOM
===================================================== */

function autoMatchHeader(systemCol, headers) {
  const target = normalizeText(systemCol.label);
  const targetKey = normalizeText(systemCol.key);

  // 1. exact match
  let match = headers.find((h) => normalizeText(h) === target || normalizeText(h) === targetKey);
  if (match) return match;

  // 2. substring match (dua arah)
  match = headers.find((h) => {
    const nh = normalizeText(h);
    return nh.includes(targetKey) || targetKey.includes(nh) || nh.includes(target) || target.includes(nh);
  });

  return match || null;
}

function buildMappingStep() {
  const cfg = jenisConfig[wizard.jenisKey];
  const container = document.getElementById("mappingTable");

  wizard.mapping = {};

  container.innerHTML = cfg.columns
    .map((col) => {
      const guessed = autoMatchHeader(col, wizard.headers);
      wizard.mapping[col.key] = guessed;

      const options = [`<option value="">-- Tidak dipetakan --</option>`]
        .concat(
          wizard.headers.map(
            (h) => `<option value="${h}" ${h === guessed ? "selected" : ""}>${h}</option>`,
          ),
        )
        .join("");

      return `
        <div class="mapping-row" data-key="${col.key}">
          <div class="col-label">
            Kolom File
            <strong>${guessed || "(pilih manual)"}</strong>
          </div>
          <i class="fa-solid fa-arrow-right-long arrow"></i>
          <div class="col-label">
            Kolom Sistem
            <strong>${col.label}${col.required ? " *" : ""}</strong>
          </div>
          <select data-key="${col.key}">
            ${options}
          </select>
        </div>
      `;
    })
    .join("");

  container.querySelectorAll("select").forEach((select) => {
    select.addEventListener("change", () => {
      wizard.mapping[select.dataset.key] = select.value || null;
    });
  });

  document.getElementById("btnToValidasi").onclick = () => {
    const cfg2 = jenisConfig[wizard.jenisKey];
    const missingRequired = cfg2.columns.filter(
      (c) => c.required && !wizard.mapping[c.key],
    );

    if (missingRequired.length) {
      alert(
        "Kolom wajib belum dipetakan: " +
          missingRequired.map((c) => c.label).join(", "),
      );
      return;
    }

    runValidation();
    goToStep(4);
  };
}

/* =====================================================
   STEP 4: VALIDASI (engine sungguhan atas data ter-parse)
===================================================== */

function runValidation() {
  const cfg = jenisConfig[wizard.jenisKey];
  const seenKeys = new Set();

  const rows = wizard.rawRows.map((raw, idx) => {
    const rowNum = idx + 2; // +1 karena header, +1 karena 1-indexed
    const normalized = {};
    const messages = [];

    cfg.columns.forEach((col) => {
      const sourceHeader = wizard.mapping[col.key];
      const val = sourceHeader ? raw[sourceHeader] : undefined;
      normalized[col.key] = val;

      const isEmpty = val === undefined || val === null || String(val).trim() === "";

      if (col.required && isEmpty) {
        messages.push({ level: "error", text: `${col.label} kosong` });
      } else if (col.numeric && !isEmpty && isNaN(Number(val))) {
        messages.push({ level: "warning", text: `${col.label} bukan angka ("${val}")` });
      }
    });

    // Cross-check whitelist khusus Data Calon
    if (wizard.jenisKey === "calon") {
      if (normalized.partai && !partaiWhitelist.includes(String(normalized.partai).trim())) {
        messages.push({
          level: "warning",
          text: `Partai "${normalized.partai}" belum terdaftar di Data Partai`,
        });
      }
      if (normalized.dapil && !dapilWhitelist.includes(String(normalized.dapil).trim())) {
        messages.push({
          level: "warning",
          text: `Dapil "${normalized.dapil}" belum terdaftar di Data Dapil`,
        });
      }
    }

    // Deteksi duplikat berdasarkan kombinasi kolom required
    const dupKey = cfg.columns
      .filter((c) => c.required)
      .map((c) => normalizeText(normalized[c.key]))
      .join("|");

    let isDuplicate = false;
    if (dupKey && seenKeys.has(dupKey)) {
      isDuplicate = true;
      messages.push({ level: "duplikat", text: "Baris duplikat dengan baris sebelumnya" });
    } else if (dupKey) {
      seenKeys.add(dupKey);
    }

    const hasError = messages.some((m) => m.level === "error");
    const hasWarning = messages.some((m) => m.level === "warning");

    let status = "valid";
    if (hasError) status = "error";
    else if (isDuplicate) status = "duplikat";
    else if (hasWarning) status = "warning";

    return { rowNum, normalized, messages, status };
  });

  wizard.validatedRows = rows;

  wizard.counts = {
    total: rows.length,
    valid: rows.filter((r) => r.status === "valid").length,
    warning: rows.filter((r) => r.status === "warning").length,
    error: rows.filter((r) => r.status === "error").length,
    duplikat: rows.filter((r) => r.status === "duplikat").length,
  };

  renderValidasi();
}

function renderValidasi() {
  const cfg = jenisConfig[wizard.jenisKey];
  const c = wizard.counts;

  document.getElementById("validasiSubtitle").textContent =
    `Hasil validasi untuk ${cfg.label} \u2014 ${wizard.file?.name || "PDF (simulasi)"}`;

  document.getElementById("validasiGrid").innerHTML = `
    <div class="validasi-card valid">
      <i class="fa-solid fa-circle-check"></i>
      <h2>${formatNumber(c.valid)}</h2>
      <span>Data Valid</span>
    </div>
    <div class="validasi-card warning">
      <i class="fa-solid fa-triangle-exclamation"></i>
      <h2>${formatNumber(c.warning)}</h2>
      <span>Data Warning</span>
    </div>
    <div class="validasi-card error">
      <i class="fa-solid fa-circle-xmark"></i>
      <h2>${formatNumber(c.error)}</h2>
      <span>Data Error</span>
    </div>
    <div class="validasi-card duplikat">
      <i class="fa-solid fa-clone"></i>
      <h2>${formatNumber(c.duplikat)}</h2>
      <span>Duplikat</span>
    </div>
  `;

  document.getElementById("errorDetailList").style.display = "none";
  document.getElementById("errorDetailList").innerHTML = "";
}

function bindValidasiEvents() {
  document.getElementById("btnLihatError").addEventListener("click", () => {
    const list = document.getElementById("errorDetailList");
    const isHidden = list.style.display === "none";

    if (isHidden) {
      const problemRows = wizard.validatedRows.filter((r) => r.status !== "valid");

      list.innerHTML = problemRows.length
        ? problemRows
            .map(
              (r) => `
                <div class="error-detail-item ${r.status}">
                  <span class="badge-row">Baris ${r.rowNum}</span>
                  <span>${r.messages.map((m) => m.text).join("; ")}</span>
                </div>
              `,
            )
            .join("")
        : `<p style="color:var(--text-light);font-size:13px;">Tidak ada error/warning/duplikat. Semua data valid.</p>`;
    }

    list.style.display = isHidden ? "flex" : "none";
    list.style.flexDirection = "column";
  });

  document.getElementById("btnToPreview").addEventListener("click", () => {
    renderPreview();
    goToStep(5);
  });
}

/* =====================================================
   STEP 5: PREVIEW & IMPORT
===================================================== */

function renderPreview() {
  const cfg = jenisConfig[wizard.jenisKey];
  const importable = wizard.validatedRows.filter(
    (r) => r.status === "valid" || r.status === "warning",
  );

  document.getElementById("previewBanner").innerHTML = `
    <strong>${formatNumber(importable.length)}</strong> data siap diimport dari total
    ${formatNumber(wizard.counts.total)} baris
    (${formatNumber(wizard.counts.error)} error &amp; ${formatNumber(wizard.counts.duplikat)} duplikat akan dilewati).
  `;

  document.getElementById("importCountLabel").textContent = formatNumber(importable.length);

  const previewRows = importable.slice(0, 50);
  const table = document.getElementById("previewTable");

  table.innerHTML = `
    <thead>
      <tr>
        <th>No</th>
        ${cfg.columns.map((c) => `<th>${c.label}</th>`).join("")}
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      ${previewRows
        .map(
          (r, i) => `
            <tr>
              <td>${i + 1}</td>
              ${cfg.columns
                .map((c) => `<td>${r.normalized[c.key] ?? "-"}</td>`)
                .join("")}
              <td><span class="status-badge ${r.status}">${
                r.status === "valid" ? "Valid" : "Warning"
              }</span></td>
            </tr>
          `,
        )
        .join("")}
    </tbody>
  `;

  if (importable.length > 50) {
    table.insertAdjacentHTML(
      "beforeend",
      `<tfoot><tr><td colspan="${cfg.columns.length + 2}" style="text-align:center;color:var(--text-light);padding:12px;">... dan ${formatNumber(importable.length - 50)} baris lainnya</td></tr></tfoot>`,
    );
  }
}

function bindPreviewEvents() {
  document.getElementById("btnBatalImport").addEventListener("click", () => {
    if (confirm("Batalkan proses import ini?")) {
      resetWizardToStart();
    }
  });

  document.getElementById("btnKonfirmasiImport").addEventListener("click", confirmImport);
}

function confirmImport() {
  const cfg = jenisConfig[wizard.jenisKey];
  const importable = wizard.validatedRows.filter(
    (r) => r.status === "valid" || r.status === "warning",
  );

  const allMessages = wizard.validatedRows
    .filter((r) => r.messages.length)
    .map((r) => `Baris ${r.rowNum}: ${r.messages.map((m) => m.text).join("; ")}`);

  const status = wizard.counts.error > 0 || wizard.counts.duplikat > 0 ? "Warning" : "Berhasil";

  riwayatData.unshift({
    id: nextRiwayatId++,
    waktu: new Date().toLocaleString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }),
    file: wizard.file ? wizard.file.name : "(PDF - simulasi)",
    jenis: cfg.label,
    jumlah: importable.length,
    user: "Admin",
    status,
    messages: allMessages,
  });

  renderRiwayat();
  renderSummary();
  showToast(
    `Import selesai: ${formatNumber(importable.length)} data ${cfg.label} tervalidasi & tercatat di Riwayat Import.`,
  );

  resetWizardToStart();
}

function resetWizardToStart() {
  wizard.jenisKey = null;
  resetUploadState();

  document.querySelectorAll(".jenis-card").forEach((c) => c.classList.remove("selected"));

  goToStep(1);
}

/* =====================================================
   IMPORT SUMMARY
===================================================== */

function renderSummary() {
  const total = riwayatData.length;
  const berhasil = riwayatData.filter((r) => r.status === "Berhasil").length;
  const warning = riwayatData.filter((r) => r.status === "Warning").length;
  const gagal = riwayatData.filter((r) => r.status === "Gagal").length;

  document.getElementById("summaryGrid").innerHTML = `
    <div class="summary-card">
      <span><i class="fa-solid fa-file-import"></i> Total Import</span>
      <h2>${total}</h2>
    </div>
    <div class="summary-card success">
      <span><i class="fa-solid fa-circle-check"></i> Berhasil</span>
      <h2>${berhasil}</h2>
    </div>
    <div class="summary-card warning">
      <span><i class="fa-solid fa-triangle-exclamation"></i> Warning</span>
      <h2>${warning}</h2>
    </div>
    <div class="summary-card danger">
      <span><i class="fa-solid fa-circle-xmark"></i> Gagal</span>
      <h2>${gagal}</h2>
    </div>
  `;
}

/* =====================================================
   RIWAYAT IMPORT
===================================================== */

function renderRiwayat() {
  const tbody = document.getElementById("riwayatTable");

  if (!riwayatData.length) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align:center;color:var(--text-light);padding:24px;">Belum ada riwayat import.</td></tr>`;
    return;
  }

  const statusClassMap = { Berhasil: "berhasil", Warning: "warning", Gagal: "gagal" };

  tbody.innerHTML = riwayatData
    .map(
      (r) => `
        <tr>
          <td>${r.waktu}</td>
          <td>${r.file}</td>
          <td>${r.jenis}</td>
          <td>${formatNumber(r.jumlah)}</td>
          <td>${r.user}</td>
          <td><span class="status-badge ${statusClassMap[r.status]}">${r.status}</span></td>
          <td>
            <div class="row-actions">
              <button class="row-action-btn" data-action="detail" data-id="${r.id}" title="Detail"><i class="fa-solid fa-eye"></i></button>
              <button class="row-action-btn" data-action="log" data-id="${r.id}" title="Download Log"><i class="fa-solid fa-download"></i></button>
              <button class="row-action-btn delete-btn" data-action="rollback" data-id="${r.id}" title="Rollback"><i class="fa-solid fa-rotate-left"></i></button>
            </div>
          </td>
        </tr>
      `,
    )
    .join("");

  tbody.querySelectorAll(".row-action-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = Number(btn.dataset.id);
      const action = btn.dataset.action;

      if (action === "detail") openDetailModal(id);
      if (action === "log") downloadLog(id);
      if (action === "rollback") rollbackImport(id);
    });
  });
}

function rollbackImport(id) {
  const entry = riwayatData.find((r) => r.id === id);
  if (!entry) return;

  const confirmed = confirm(
    `Rollback import "${entry.file}"?\n\nCatatan: karena belum ada backend/shared store, rollback ini hanya menghapus catatan riwayatnya - tidak ada data lain yang perlu dibatalkan.`,
  );
  if (!confirmed) return;

  riwayatData = riwayatData.filter((r) => r.id !== id);
  renderRiwayat();
  renderSummary();
}

function downloadLog(id) {
  const entry = riwayatData.find((r) => r.id === id);
  if (!entry) return;

  const lines = [
    `Log Import - ${entry.file}`,
    `Waktu: ${entry.waktu}`,
    `Jenis: ${entry.jenis}`,
    `Jumlah data masuk: ${entry.jumlah}`,
    `User: ${entry.user}`,
    `Status: ${entry.status}`,
    "",
    "Detail pesan:",
    ...(entry.messages.length ? entry.messages : ["(tidak ada catatan error/warning)"]),
  ];

  const blob = new Blob([lines.join("\n")], { type: "text/plain" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `log-import-${entry.file.replace(/\.[^.]+$/, "")}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/* =====================================================
   MODAL: DETAIL RIWAYAT
===================================================== */

function bindModalEvents() {
  document.getElementById("detailModalCloseBtn").addEventListener("click", closeDetailModal);
  document.getElementById("detailModalOverlay").addEventListener("click", (e) => {
    if (e.target.id === "detailModalOverlay") closeDetailModal();
  });
}

function openDetailModal(id) {
  const entry = riwayatData.find((r) => r.id === id);
  if (!entry) return;

  document.getElementById("detailModalTitle").textContent = `Detail Import - ${entry.file}`;

  document.getElementById("detailModalBody").innerHTML = `
    <div class="mb-row"><span>Waktu</span><strong>${entry.waktu}</strong></div>
    <div class="mb-row"><span>Jenis Data</span><strong>${entry.jenis}</strong></div>
    <div class="mb-row"><span>Jumlah Data Masuk</span><strong>${formatNumber(entry.jumlah)}</strong></div>
    <div class="mb-row"><span>User</span><strong>${entry.user}</strong></div>
    <div class="mb-row"><span>Status</span><strong>${entry.status}</strong></div>
    <div>
      <strong style="display:block;margin-bottom:8px;">Catatan:</strong>
      ${
        entry.messages.length
          ? `<div class="error-detail-list" style="display:flex;max-height:220px;">${entry.messages
              .map((m) => `<div class="error-detail-item warning">${m}</div>`)
              .join("")}</div>`
          : `<p style="color:var(--text-light);font-size:13px;">Tidak ada catatan error/warning.</p>`
      }
    </div>
  `;

  document.getElementById("detailModalOverlay").classList.add("open");
}

function closeDetailModal() {
  document.getElementById("detailModalOverlay").classList.remove("open");
}

/* =====================================================
   TOAST
===================================================== */

function showToast(message) {
  let toast = document.querySelector(".toast");

  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span>${message}</span>`;
  requestAnimationFrame(() => toast.classList.add("show"));

  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 4500);
}