/**
 * =====================================================
 * COMPONENTS DATA
 * =====================================================
 * Isi HTML tiap komponen dashboard, disimpan sebagai string JS.
 * Ini menggantikan fetch() ke file .html, supaya aplikasi bisa
 * dibuka langsung lewat file:// tanpa perlu web server
 * (fetch() diblokir browser untuk protokol file://, tapi <script>
 * tag tetap bisa memuat file lokal dengan normal).
 */
window.COMPONENTS = {
  "kpi-cards": `<div class="kpi-card">
    <div class="kpi-header">
        <span>Total Suara</span>
        <i class="fa-solid fa-users"></i>
    </div>

    <h2>1.245.890</h2>

    <div class="kpi-footer positive">
        <i class="fa-solid fa-arrow-trend-up"></i>
        <span>+12.5% dari periode sebelumnya</span>
    </div>
</div>

<div class="kpi-card">
    <div class="kpi-header">
        <span>Target Menang</span>
        <i class="fa-solid fa-bullseye"></i>
    </div>

    <h2>1.500.000</h2>

    <div class="kpi-footer warning">
        <i class="fa-solid fa-chart-line"></i>
        <span>83% Target Tercapai</span>
    </div>
</div>

<div class="kpi-card">
    <div class="kpi-header">
        <span>TPS Masuk</span>
        <i class="fa-solid fa-map-location-dot"></i>
    </div>

    <h2>12.450</h2>

    <div class="kpi-footer positive">
        <i class="fa-solid fa-check"></i>
        <span>83% Data Masuk</span>
    </div>
</div>

<div class="kpi-card">
    <div class="kpi-header">
        <span>AI Score</span>
        <i class="fa-solid fa-brain"></i>
    </div>

    <h2>92</h2>

    <div class="kpi-footer info">
        <i class="fa-solid fa-star"></i>
        <span>Peluang Menang Tinggi</span>
    </div>
</div>`,
  "trend-chart": `<div class="dashboard-widget">

    <div class="dashboard-widget-header">

        <div>
            <h3>Trend Perolehan Suara</h3>
            <span>Periode 2019 - 2029</span>
        </div>

        <button class="btn-icon">
            <i class="fa-solid fa-ellipsis"></i>
        </button>

    </div>

    <div
        id="lineChart"
        class="chart-container">
    </div>

</div>`,
  "ai-widget": `<div class="dashboard-widget">
  <div class="dashboard-widget-header">
    <div>
      <h3>AI Recommendation</h3>
      <span>Machine Learning Insight</span>
    </div>

    <button class="btn-icon">
      <i class="fa-solid fa-robot"></i>
    </button>
  </div>

  <div class="ai-panel">
    <div class="ai-score">92</div>

    <div class="ai-status">
      <i class="fa-solid fa-circle-check"></i>
      &nbsp; Peluang Menang Sangat Tinggi
    </div>

    <ul>
      <li>Tingkatkan kampanye digital pada kelompok usia 17–30 tahun.</li>

      <li>Fokuskan kegiatan lapangan di Kecamatan Samarinda Ulu.</li>

      <li>Optimalkan relawan TPS pada wilayah dengan partisipasi rendah.</li>

      <li>Pertahankan dominasi suara pada Kecamatan Sungai Kunjang.</li>
    </ul>
  </div>
</div>
`,
  "map": `<div class="dashboard-widget">

    <div class="dashboard-widget-header">

        <div>
            <h3>Analisis Sebaran Wilayah</h3>
            <span>Peta Interaktif Kabupaten / Kota</span>
        </div>

        <button class="btn-icon">
            <i class="fa-solid fa-map-location-dot"></i>
        </button>

    </div>

    <!-- <div class="map-toolbar">

        <button class="map-filter active">
            Semua
        </button>

        <button class="map-filter">
            Tinggi
        </button>

        <button class="map-filter">
            Sedang
        </button>

        <button class="map-filter">
            Rendah
        </button>

    </div> -->

    <div
        id="map"
        class="map-container">
    </div>

</div>`,
  "quick-stat": `<div class="dashboard-widget">
  <div class="dashboard-widget-header">
    <div>
      <h3>Quick Statistics</h3>
      <span>Ringkasan Kondisi Saat Ini</span>
    </div>

    <button class="btn-icon">
      <i class="fa-solid fa-chart-simple"></i>
    </button>
  </div>

  <div class="quick-stat">
    <div class="quick-item">
      <div class="quick-info">
        <span>Total Kecamatan</span>
        <small>Seluruh wilayah terdata</small>
        <strong>156</strong>
      </div>

      <div class="quick-progress">
        <div class="progress-bar">
          <div class="progress-fill blue" style="width: 100%"></div>
        </div>

        <small>100%</small>
      </div>
    </div>

    <div class="quick-item">
      <div class="quick-info">
        <span>TPS Terlapor</span>
        <small>83% TPS masuk sistem</small>
        <strong>12.450</strong>
      </div>

      <div class="quick-progress">
        <div class="progress-bar">
          <div class="progress-fill green" style="width: 83%"></div>
        </div>

        <small>83%</small>
      </div>
    </div>

    <div class="quick-item">
      <div class="quick-info">
        <span>Relawan Aktif</span>
        <small>Relawan aktif melakukan pelaporan</small>
        <strong>3.842</strong>
      </div>

      <div class="quick-progress">
        <div class="progress-bar">
          <div class="progress-fill orange" style="width: 76%"></div>
        </div>

        <small>76%</small>
      </div>
    </div>

    <div class="quick-item">
      <div class="quick-info">
        <span>Peluang Menang</span>
        <small>Prediksi berdasarkan analisis AI</small>
        <strong>92%</strong>
      </div>

      <div class="quick-progress">
        <div class="progress-bar">
          <div class="progress-fill red" style="width: 92%"></div>
        </div>

        <small>92%</small>
      </div>
    </div>
  </div>
</div>
`,
  "column-chart": `<div class="dashboard-widget">
  <div class="dashboard-widget-header">
    <div>
      <h3>Top Kecamatan</h3>
      <span>Perolehan suara tertinggi</span>
    </div>

    <button class="btn-icon">
      <i class="fa-solid fa-ellipsis"></i>
    </button>
  </div>

  <div id="columnChart" class="chart-container"></div>
</div>
`,
  "donut-chart": `<div class="dashboard-widget">
  <div class="dashboard-widget-header">
    <div>
      <h3>Distribusi Partai</h3>
      <span>Persentase perolehan suara</span>
    </div>

    <button class="btn-icon">
      <i class="fa-solid fa-ellipsis"></i>
    </button>
  </div>

  <div id="pieChart" class="chart-container"></div>
</div>
`,
  "progress": `<div class="dashboard-widget">
  <div class="dashboard-widget-header">
    <div>
      <h3>Campaign Progress</h3>
      <span>Monitoring Target Kampanye</span>
    </div>

    <button class="btn-icon">
      <i class="fa-solid fa-chart-line"></i>
    </button>
  </div>

  <div class="campaign-progress">
    <div class="progress-item">
      <div class="progress-header">
        <span>Pengumpulan Data Pemilih</span>
        <strong>92%</strong>
      </div>

      <div class="campaign-progress-bar">
        <div class="campaign-progress-fill primary" style="width: 92%"></div>
      </div>
    </div>

    <div class="progress-item">
      <div class="progress-header">
        <span>Verifikasi TPS</span>
        <strong>81%</strong>
      </div>

      <div class="campaign-progress-bar">
        <div class="campaign-progress-fill success" style="width: 81%"></div>
      </div>
    </div>

    <div class="progress-item">
      <div class="progress-header">
        <span>Perekrutan Relawan</span>
        <strong>68%</strong>
      </div>

      <div class="campaign-progress-bar">
        <div class="campaign-progress-fill warning" style="width: 68%"></div>
      </div>
    </div>

    <div class="progress-item">
      <div class="progress-header">
        <span>Kampanye Digital</span>
        <strong>75%</strong>
      </div>

      <div class="campaign-progress-bar">
        <div class="campaign-progress-fill info" style="width: 75%"></div>
      </div>
    </div>

    <div class="progress-item">
      <div class="progress-header">
        <span>Distribusi Alat Peraga</span>
        <strong>54%</strong>
      </div>

      <div class="campaign-progress-bar">
        <div class="campaign-progress-fill danger" style="width: 54%"></div>
      </div>
    </div>
  </div>
</div>
`,
  "timeline": `<div class="dashboard-widget">
  <div class="dashboard-widget-header">
    <div>
      <h3>Activity Timeline</h3>
      <span>Aktivitas Terbaru Sistem</span>
    </div>

    <button class="btn-icon">
      <i class="fa-solid fa-clock-rotate-left"></i>
    </button>
  </div>

  <div class="timeline">
    <div class="timeline-item">
      <div class="timeline-dot primary"></div>

      <div class="timeline-content">
        <h4>Data TPS Diperbarui</h4>
        <p>1.250 data TPS berhasil disinkronisasi.</p>
        <small>10 menit yang lalu</small>
      </div>
    </div>

    <div class="timeline-item">
      <div class="timeline-dot success"></div>

      <div class="timeline-content">
        <h4>Analisis AI Selesai</h4>
        <p>Model memprediksi peluang kemenangan meningkat menjadi 92%.</p>
        <small>35 menit yang lalu</small>
      </div>
    </div>

    <div class="timeline-item">
      <div class="timeline-dot warning"></div>

      <div class="timeline-content">
        <h4>Relawan Baru</h4>
        <p>127 relawan baru berhasil didaftarkan.</p>
        <small>1 jam yang lalu</small>
      </div>
    </div>

    <div class="timeline-item">
      <div class="timeline-dot info"></div>

      <div class="timeline-content">
        <h4>Survei Lapangan</h4>
        <p>Hasil survei Kecamatan Samarinda Ulu telah diterima.</p>
        <small>3 jam yang lalu</small>
      </div>
    </div>

    <div class="timeline-item">
      <div class="timeline-dot danger"></div>

      <div class="timeline-content">
        <h4>Peringatan</h4>
        <p>Partisipasi pemilih di 5 TPS berada di bawah target.</p>
        <small>Hari ini</small>
      </div>
    </div>
  </div>
</div>
`,
  "data-table": `<div class="dashboard-widget">
  <div class="dashboard-widget-header">
    <div>
      <h3>Data Monitoring Wilayah</h3>
      <span>Status Monitoring Seluruh Kecamatan</span>
    </div>

    <button class="btn-icon">
      <i class="fa-solid fa-table"></i>
    </button>
  </div>

  <div class="table-responsive">
    <table class="dashboard-table">
      <thead>
        <tr>
          <th>No</th>

          <th>Kecamatan</th>

          <th>Total TPS</th>

          <th>Relawan</th>

          <th>Perolehan</th>

          <th>Status</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>1</td>

          <td>Samarinda Ulu</td>

          <td>325</td>

          <td>146</td>

          <td>92%</td>

          <td>
            <span class="badge success"> Dominan </span>
          </td>
        </tr>

        <tr>
          <td>2</td>

          <td>Sungai Kunjang</td>

          <td>280</td>

          <td>122</td>

          <td>88%</td>

          <td>
            <span class="badge primary"> Aman </span>
          </td>
        </tr>

        <tr>
          <td>3</td>

          <td>Loa Janan</td>

          <td>245</td>

          <td>91</td>

          <td>73%</td>

          <td>
            <span class="badge warning"> Kompetitif </span>
          </td>
        </tr>

        <tr>
          <td>4</td>

          <td>Balikpapan Barat</td>

          <td>364</td>

          <td>174</td>

          <td>64%</td>

          <td>
            <span class="badge danger"> Lemah </span>
          </td>
        </tr>

        <tr>
          <td>5</td>

          <td>Bontang Selatan</td>

          <td>198</td>

          <td>86</td>

          <td>79%</td>

          <td>
            <span class="badge info"> Dipantau </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
`,
};
