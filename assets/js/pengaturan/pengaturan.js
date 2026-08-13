/**
 * =====================================================
 * POLITICAL INTELLIGENCE 2029
 * Pengaturan - System Configuration
 * =====================================================
 *
 * CATATAN:
 * - Semua pengaturan di sini SUNGGUHAN tersimpan ke
 *   localStorage browser ini (key: "pid2029_settings"),
 *   bukan sekadar tampilan. Refresh halaman akan memuat
 *   ulang nilai yang terakhir disimpan.
 * - Ini murni penyimpanan LOKAL per-browser, bukan
 *   database server - belum ada backend/API di tahap ini.
 * - Preview tema gelap di tab Tampilan hanya berlaku untuk
 *   area konten Pengaturan sebagai contoh, belum diterapkan
 *   ke seluruh halaman aplikasi.
 * =====================================================
 */

const STORAGE_KEY = "pid2029_settings";

const defaultSettings = {
  umum: {
    namaAplikasi: "Political Intelligence Dashboard",
    namaSingkat: "PID 2029",
    tahunPemilu: 2029,
    provinsi: "Kalimantan Timur",
    bahasa: "Indonesia",
    timezone: "Asia/Jakarta",
  },
  kandidat: {
    foto: "",
    nama: "Ahmad Wijaya",
    partai: "Partai A",
    dapil: "Kalimantan Timur 1",
    noUrut: 4,
    targetKursi: 1,
    status: "Aktif",
  },
  parameter: {
    bobotHistoris: 30,
    bobotPotensi: 25,
    bobotKompetitor: 20,
    bobotPartisipasi: 15,
    bobotCoverage: 10,
    thresholdTinggi: 80,
    thresholdSedang: 60,
  },
  target: {
    kursi: 1,
    suara: 84500,
    minWin: 78000,
    safetyMargin: 8,
    coverageTps: 90,
    relawan: 500,
    estimasiSaatIni: 62300,
  },
  notifikasi: {
    tpsPrioritas: true,
    gapTinggi: true,
    importGagal: true,
    kompetitorNaik: true,
    laporanSelesai: true,
    emailNotif: false,
  },
  importdata: {
    duplikasi: "update",
    dataInvalid: "tolak",
    formatDefault: "XLSX",
    backupSebelum: true,
  },
  tampilan: {
    sidebarMode: "expanded",
    tema: "light",
    compact: false,
    animasi: true,
  },
  backup: {
    lastBackup: "13 Aug 2026, 08:30",
    dataRecords: 12482,
    storagePct: 68,
  },
};

const weightMeta = [
  { key: "bobotHistoris", label: "Bobot Suara Historis" },
  { key: "bobotPotensi", label: "Bobot Potensi Wilayah" },
  { key: "bobotKompetitor", label: "Bobot Kekuatan Kompetitor" },
  { key: "bobotPartisipasi", label: "Bobot Partisipasi" },
  { key: "bobotCoverage", label: "Bobot Coverage Relawan" },
];

const notifikasiMeta = [
  { key: "tpsPrioritas", label: "TPS potensial belum memiliki relawan" },
  { key: "gapTinggi", label: "Target suara mengalami gap tinggi" },
  { key: "importGagal", label: "Data import gagal" },
  { key: "kompetitorNaik", label: "Kompetitor mengalami peningkatan suara" },
  { key: "laporanSelesai", label: "Laporan selesai dibuat" },
  { key: "emailNotif", label: "Email notification" },
];

let penggunaData = [
  { id: 1, nama: "Admin", role: "Administrator", status: "Aktif", lastLogin: "Today" },
  { id: 2, nama: "Budi", role: "Analyst", status: "Aktif", lastLogin: "Today" },
  { id: 3, nama: "Siti", role: "Operator", status: "Aktif", lastLogin: "Yesterday" },
];

let settings = loadSettings();

/* =====================================================
   LOAD / SAVE (localStorage sungguhan)
===================================================== */

function loadSettings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return JSON.parse(JSON.stringify(defaultSettings));

    const parsed = JSON.parse(raw);
    // merge dangkal supaya field baru dari defaultSettings tetap ada
    const merged = {};
    Object.keys(defaultSettings).forEach((section) => {
      merged[section] = { ...defaultSettings[section], ...(parsed[section] || {}) };
    });
    return merged;
  } catch (err) {
    console.error("Gagal load settings, pakai default.", err);
    return JSON.parse(JSON.stringify(defaultSettings));
  }
}

function persistSettings() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
}

function formatNumber(n) {
  return Math.round(n).toLocaleString("id-ID");
}

/* =====================================================
   INIT
===================================================== */

document.addEventListener("DOMContentLoaded", () => {
  bindTabNav();

  fillUmumForm();
  fillKandidatForm();
  buildParameterForm();
  fillTargetForm();
  renderRoleGrid();
  renderPenggunaTable();
  buildNotifikasiList();
  fillImportDataForm();
  renderBackupStatus();
  fillTampilanForm();

  bindSaveButtons();
  bindKandidatFoto();
  bindTargetActions();
  bindPenggunaModal();
  bindBackupActions();
  bindResetModal();
  bindTampilanPreview();
});

/* =====================================================
   TAB NAVIGATION
===================================================== */

function bindTabNav() {
  document.querySelectorAll(".settings-nav-item").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".settings-nav-item").forEach((b) => b.classList.remove("active"));
      document.querySelectorAll(".settings-panel").forEach((p) => p.classList.remove("active"));

      btn.classList.add("active");
      document.getElementById(`panel-${btn.dataset.tab}`).classList.add("active");
    });
  });
}

/* =====================================================
   SAVE BUTTON HANDLER (generik)
===================================================== */

function bindSaveButtons() {
  document.querySelectorAll("[data-save]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const section = btn.dataset.save;
      const saveFn = {
        umum: saveUmum,
        kandidat: saveKandidat,
        parameter: saveParameter,
        target: saveTarget,
        notifikasi: saveNotifikasi,
        importdata: saveImportData,
        tampilan: saveTampilan,
      }[section];

      if (saveFn) saveFn();

      persistSettings();
      showToast("Pengaturan tersimpan di browser ini (localStorage).");
    });
  });
}

/* =====================================================
   1. UMUM
===================================================== */

function fillUmumForm() {
  const s = settings.umum;
  document.getElementById("umumNamaAplikasi").value = s.namaAplikasi;
  document.getElementById("umumNamaSingkat").value = s.namaSingkat;
  document.getElementById("umumTahunPemilu").value = s.tahunPemilu;
  document.getElementById("umumProvinsi").value = s.provinsi;
  document.getElementById("umumBahasa").value = s.bahasa;
  document.getElementById("umumTimezone").value = s.timezone;
}

function saveUmum() {
  settings.umum = {
    namaAplikasi: document.getElementById("umumNamaAplikasi").value,
    namaSingkat: document.getElementById("umumNamaSingkat").value,
    tahunPemilu: Number(document.getElementById("umumTahunPemilu").value),
    provinsi: document.getElementById("umumProvinsi").value,
    bahasa: document.getElementById("umumBahasa").value,
    timezone: document.getElementById("umumTimezone").value,
  };
}

/* =====================================================
   2. PROFIL KANDIDAT
===================================================== */

function fillKandidatForm() {
  const s = settings.kandidat;
  document.getElementById("kandidatNama").value = s.nama;
  document.getElementById("kandidatPartai").value = s.partai;
  document.getElementById("kandidatDapil").value = s.dapil;
  document.getElementById("kandidatNoUrut").value = s.noUrut;
  document.getElementById("kandidatTargetKursi").value = s.targetKursi;
  document.getElementById("kandidatStatus").value = s.status;

  const preview = document.getElementById("kandidatFotoPreview");
  preview.src = s.foto || "https://i.pravatar.cc/150?img=12";
}

function bindKandidatFoto() {
  document.getElementById("btnUploadFoto").addEventListener("click", () => {
    document.getElementById("kandidatFotoInput").click();
  });

  document.getElementById("kandidatFotoInput").addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      document.getElementById("kandidatFotoPreview").src = ev.target.result;
      settings.kandidat.foto = ev.target.result;
    };
    reader.readAsDataURL(file);
  });
}

function saveKandidat() {
  settings.kandidat = {
    ...settings.kandidat,
    nama: document.getElementById("kandidatNama").value,
    partai: document.getElementById("kandidatPartai").value,
    dapil: document.getElementById("kandidatDapil").value,
    noUrut: Number(document.getElementById("kandidatNoUrut").value),
    targetKursi: Number(document.getElementById("kandidatTargetKursi").value),
    status: document.getElementById("kandidatStatus").value,
  };
}

/* =====================================================
   3. PARAMETER ANALISIS
===================================================== */

function buildParameterForm() {
  const s = settings.parameter;
  const container = document.getElementById("weightList");

  container.innerHTML = weightMeta
    .map(
      (w) => `
        <div class="weight-item">
          <div class="weight-item-label">
            <span>${w.label}</span>
            <strong id="weightVal-${w.key}">${s[w.key]}%</strong>
          </div>
          <input type="range" min="0" max="100" value="${s[w.key]}" data-key="${w.key}" class="weight-slider" />
        </div>
      `,
    )
    .join("");

  container.querySelectorAll(".weight-slider").forEach((slider) => {
    slider.addEventListener("input", () => {
      document.getElementById(`weightVal-${slider.dataset.key}`).textContent = slider.value + "%";
      updateWeightTotal();
    });
  });

  document.getElementById("thresholdTinggi").value = s.thresholdTinggi;
  document.getElementById("thresholdSedang").value = s.thresholdSedang;

  document.getElementById("thresholdTinggi").addEventListener("input", updateThresholdLabel);
  document.getElementById("thresholdSedang").addEventListener("input", updateThresholdLabel);

  updateWeightTotal();
  updateThresholdLabel();
}

function getWeightValues() {
  const values = {};
  weightMeta.forEach((w) => {
    values[w.key] = Number(document.querySelector(`.weight-slider[data-key="${w.key}"]`).value);
  });
  return values;
}

function updateWeightTotal() {
  const values = getWeightValues();
  const total = Object.values(values).reduce((s, v) => s + v, 0);
  const totalEl = document.getElementById("weightTotal");

  totalEl.textContent = `Total: ${total}%` + (total !== 100 ? " (harus 100%)" : " ✓");
  totalEl.classList.toggle("invalid", total !== 100);
}

function updateThresholdLabel() {
  const sedang = Number(document.getElementById("thresholdSedang").value) || 0;
  document.getElementById("thresholdRendahLabel").textContent = sedang;
}

function saveParameter() {
  const values = getWeightValues();
  const total = Object.values(values).reduce((s, v) => s + v, 0);

  if (total !== 100) {
    alert(`Total bobot harus 100%. Saat ini ${total}%. Sesuaikan dulu sebelum menyimpan.`);
    return;
  }

  settings.parameter = {
    ...values,
    thresholdTinggi: Number(document.getElementById("thresholdTinggi").value),
    thresholdSedang: Number(document.getElementById("thresholdSedang").value),
  };
}

/* =====================================================
   4. TARGET PEMILU
===================================================== */

function fillTargetForm() {
  const s = settings.target;
  document.getElementById("targetKursi").value = s.kursi;
  document.getElementById("targetSuara").value = s.suara;
  document.getElementById("targetMinWin").value = s.minWin;
  document.getElementById("targetSafetyMargin").value = s.safetyMargin;
  document.getElementById("targetCoverageTps").value = s.coverageTps;
  document.getElementById("targetRelawan").value = s.relawan;

  renderTargetKemenangan();
}

function renderTargetKemenangan() {
  const suara = Number(document.getElementById("targetSuara").value) || 0;
  const estimasi = settings.target.estimasiSaatIni;
  const gap = suara - estimasi;
  const progress = suara > 0 ? Math.min(100, Math.round((estimasi / suara) * 100)) : 0;

  document.getElementById("targetKemenanganGrid").innerHTML = `
    <div class="target-kpi-card">
      <span>Target Suara</span>
      <h2>${formatNumber(suara)}</h2>
    </div>
    <div class="target-kpi-card">
      <span>Estimasi Saat Ini</span>
      <h2>${formatNumber(estimasi)}</h2>
    </div>
    <div class="target-kpi-card gap">
      <span>Gap</span>
      <h2>${gap > 0 ? formatNumber(gap) : "0 (tercapai)"}</h2>
    </div>
    <div class="target-kpi-card">
      <span>Progress</span>
      <h2>${progress}%</h2>
    </div>
    <div class="target-progress-wrap">
      <div class="target-progress-bar">
        <div class="target-progress-fill" style="width:${progress}%;"></div>
      </div>
    </div>
  `;
}

function bindTargetActions() {
  document.getElementById("btnHitungUlang").addEventListener("click", () => {
    const suara = Number(document.getElementById("targetSuara").value) || 0;
    const margin = Number(document.getElementById("targetSafetyMargin").value) || 0;

    const minWin = Math.round(suara * (1 - margin / 100));
    document.getElementById("targetMinWin").value = minWin;

    renderTargetKemenangan();
    showToast("Target dihitung ulang berdasarkan Target Suara & Safety Margin.");
  });

  ["targetSuara"].forEach((id) => {
    document.getElementById(id).addEventListener("input", renderTargetKemenangan);
  });
}

function saveTarget() {
  settings.target = {
    ...settings.target,
    kursi: Number(document.getElementById("targetKursi").value),
    suara: Number(document.getElementById("targetSuara").value),
    minWin: Number(document.getElementById("targetMinWin").value),
    safetyMargin: Number(document.getElementById("targetSafetyMargin").value),
    coverageTps: Number(document.getElementById("targetCoverageTps").value),
    relawan: Number(document.getElementById("targetRelawan").value),
  };
}

/* =====================================================
   5. PENGGUNA & HAK AKSES
===================================================== */

function renderRoleGrid() {
  const roles = [
    { name: "Admin", access: ["Semua akses"] },
    { name: "Analyst", access: ["Dashboard", "Analisis", "Heatmap", "Kompetitor", "Laporan"] },
    { name: "Operator", access: ["Master Data", "TPS", "Relawan"] },
    { name: "Viewer", access: ["Read Only"] },
  ];

  document.getElementById("roleGrid").innerHTML = roles
    .map(
      (r) => `
        <div class="role-card">
          <strong>${r.name}</strong>
          <ul>
            ${r.access.map((a) => `<li><i class="fa-solid fa-check"></i> ${a}</li>`).join("")}
          </ul>
        </div>
      `,
    )
    .join("");
}

function renderPenggunaTable() {
  const tbody = document.getElementById("penggunaTable");

  tbody.innerHTML = penggunaData
    .map(
      (u) => `
        <tr>
          <td><strong>${u.nama}</strong></td>
          <td><span class="role-badge">${u.role}</span></td>
          <td><span class="status-badge ${u.status === "Aktif" ? "success" : "danger"}">${u.status}</span></td>
          <td>${u.lastLogin}</td>
          <td>
            <button class="row-action-btn" data-id="${u.id}" title="Edit">
              <i class="fa-solid fa-pen"></i>
            </button>
          </td>
        </tr>
      `,
    )
    .join("");

  tbody.querySelectorAll(".row-action-btn").forEach((btn) => {
    btn.addEventListener("click", () => openUserModal(Number(btn.dataset.id)));
  });
}

function bindPenggunaModal() {
  document.getElementById("userModalCloseBtn").addEventListener("click", closeUserModal);
  document.getElementById("userModalCancelBtn").addEventListener("click", closeUserModal);
  document.getElementById("userModalOverlay").addEventListener("click", (e) => {
    if (e.target.id === "userModalOverlay") closeUserModal();
  });

  document.getElementById("userModalSaveBtn").addEventListener("click", () => {
    const id = Number(document.getElementById("userFormId").value);
    const user = penggunaData.find((u) => u.id === id);
    if (!user) return;

    user.role = document.getElementById("userFormRole").value;
    user.status = document.getElementById("userFormStatus").value;

    renderPenggunaTable();
    closeUserModal();
    showToast(`Role & status "${user.nama}" diperbarui.`);
  });
}

function openUserModal(id) {
  const user = penggunaData.find((u) => u.id === id);
  if (!user) return;

  document.getElementById("userFormId").value = user.id;
  document.getElementById("userFormNama").value = user.nama;
  document.getElementById("userFormRole").value = user.role;
  document.getElementById("userFormStatus").value = user.status;

  document.getElementById("userModalOverlay").classList.add("open");
}

function closeUserModal() {
  document.getElementById("userModalOverlay").classList.remove("open");
}

/* =====================================================
   6. NOTIFIKASI
===================================================== */

function buildNotifikasiList() {
  const s = settings.notifikasi;
  const container = document.getElementById("notifikasiList");

  container.innerHTML = notifikasiMeta
    .map(
      (n) => `
        <label class="checkbox-item-inline">
          <input type="checkbox" data-key="${n.key}" ${s[n.key] ? "checked" : ""} />
          ${n.label}
        </label>
      `,
    )
    .join("");
}

function saveNotifikasi() {
  const values = {};
  document.querySelectorAll("#notifikasiList input[type=checkbox]").forEach((cb) => {
    values[cb.dataset.key] = cb.checked;
  });
  settings.notifikasi = values;
}

/* =====================================================
   7. IMPORT & DATA
===================================================== */

function fillImportDataForm() {
  const s = settings.importdata;
  document.querySelector(`input[name="duplikasi"][value="${s.duplikasi}"]`).checked = true;
  document.querySelector(`input[name="dataInvalid"][value="${s.dataInvalid}"]`).checked = true;
  document.getElementById("importFormatDefault").value = s.formatDefault;
  document.getElementById("importBackupSebelum").checked = s.backupSebelum;
}

function saveImportData() {
  settings.importdata = {
    duplikasi: document.querySelector('input[name="duplikasi"]:checked')?.value || "update",
    dataInvalid: document.querySelector('input[name="dataInvalid"]:checked')?.value || "tolak",
    formatDefault: document.getElementById("importFormatDefault").value,
    backupSebelum: document.getElementById("importBackupSebelum").checked,
  };
}

/* =====================================================
   8. BACKUP & SISTEM
===================================================== */

function renderBackupStatus() {
  const s = settings.backup;

  document.getElementById("backupStatusGrid").innerHTML = `
    <div class="backup-card">
      <span>Database Status</span>
      <h2 class="dot-online"><i class="fa-solid fa-circle" style="font-size:10px;"></i> Connected</h2>
    </div>
    <div class="backup-card">
      <span>Last Backup</span>
      <h2 style="font-size:15px;">${s.lastBackup}</h2>
    </div>
    <div class="backup-card">
      <span>Data Records</span>
      <h2>${formatNumber(s.dataRecords)}</h2>
    </div>
    <div class="backup-card">
      <span>Storage</span>
      <h2>${s.storagePct}%</h2>
    </div>
  `;
}

function bindBackupActions() {
  document.getElementById("btnBackupSekarang").addEventListener("click", () => {
    settings.backup.lastBackup = new Date().toLocaleString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
    settings.backup.storagePct = Math.min(100, settings.backup.storagePct + 1);

    persistSettings();
    renderBackupStatus();
    showToast("Backup berhasil dibuat (disimulasikan, disimpan sebagai catatan waktu di localStorage).");
  });

  document.getElementById("btnRestore").addEventListener("click", () => {
    const ok = confirm(
      "Restore ke backup terakhir?\n\nCatatan: demo ini belum menyimpan snapshot data sungguhan, jadi restore di sini murni simulasi UI.",
    );
    if (ok) showToast("Restore disimulasikan - belum ada snapshot data sungguhan di demo ini.");
  });
}

/* =====================================================
   RESET SYSTEM
===================================================== */

function bindResetModal() {
  document.getElementById("btnResetSystem").addEventListener("click", () => {
    document.getElementById("resetConfirmInput").value = "";
    document.getElementById("resetModalConfirmBtn").disabled = true;
    document.getElementById("resetModalOverlay").classList.add("open");
  });

  document.getElementById("resetModalCloseBtn").addEventListener("click", closeResetModal);
  document.getElementById("resetModalCancelBtn").addEventListener("click", closeResetModal);
  document.getElementById("resetModalOverlay").addEventListener("click", (e) => {
    if (e.target.id === "resetModalOverlay") closeResetModal();
  });

  document.getElementById("resetConfirmInput").addEventListener("input", (e) => {
    document.getElementById("resetModalConfirmBtn").disabled = e.target.value.trim() !== "RESET";
  });

  document.getElementById("resetModalConfirmBtn").addEventListener("click", () => {
    localStorage.removeItem(STORAGE_KEY);
    settings = JSON.parse(JSON.stringify(defaultSettings));

    fillUmumForm();
    fillKandidatForm();
    buildParameterForm();
    fillTargetForm();
    fillImportDataForm();
    buildNotifikasiList();
    renderBackupStatus();
    fillTampilanForm();
    applyThemePreview();

    closeResetModal();
    showToast("System direset ke default. Semua pengaturan tersimpan telah dihapus.");
  });
}

function closeResetModal() {
  document.getElementById("resetModalOverlay").classList.remove("open");
}

/* =====================================================
   9. TAMPILAN
===================================================== */

function fillTampilanForm() {
  const s = settings.tampilan;
  document.querySelector(`input[name="sidebarMode"][value="${s.sidebarMode}"]`).checked = true;
  document.querySelector(`input[name="tema"][value="${s.tema}"]`).checked = true;
  document.getElementById("tampilanCompact").checked = s.compact;
  document.getElementById("tampilanAnimasi").checked = s.animasi;
}

function bindTampilanPreview() {
  document.querySelectorAll('input[name="tema"], input[name="sidebarMode"]').forEach((el) => {
    el.addEventListener("change", applyThemePreview);
  });
  document.getElementById("tampilanCompact").addEventListener("change", applyThemePreview);
  document.getElementById("tampilanAnimasi").addEventListener("change", applyThemePreview);

  applyThemePreview();
}

function applyThemePreview() {
  const tema = document.querySelector('input[name="tema"]:checked')?.value || "light";
  const compact = document.getElementById("tampilanCompact").checked;

  const preview = document.getElementById("themePreview");
  preview.classList.toggle("dark", tema === "dark");
  preview.classList.toggle("compact", compact);
}

function saveTampilan() {
  settings.tampilan = {
    sidebarMode: document.querySelector('input[name="sidebarMode"]:checked')?.value || "expanded",
    tema: document.querySelector('input[name="tema"]:checked')?.value || "light",
    compact: document.getElementById("tampilanCompact").checked,
    animasi: document.getElementById("tampilanAnimasi").checked,
  };
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