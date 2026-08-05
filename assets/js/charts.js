/**
 * =====================================================
 * POLITICAL INTELLIGENCE 2029
 * Highcharts Module
 * =====================================================
 */

/* =====================================================
   GLOBAL THEME
===================================================== */

Highcharts.setOptions({
  chart: {
    style: {
      fontFamily: "Poppins",
    },
  },

  credits: {
    enabled: false,
  },

  exporting: {
    enabled: false,
  },
});

/* =====================================================
   INITIALIZE CHARTS
===================================================== */

function initCharts() {
  console.log("Initializing Charts...");

  createTrendChart();

  createColumnChart();

  createDonutChart();
}

/* =====================================================
   TREND CHART
===================================================== */

function createTrendChart() {
  const container = document.getElementById("lineChart");

  if (!container) return;

  Highcharts.chart(container, {
    chart: {
      type: "line",
    },

    title: {
      text: null,
    },

    xAxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "Mei",
        "Jun",
      ],
    },

    yAxis: {
      title: {
        text: null,
      },
    },

    legend: {
      enabled: false,
    },

    series: [
      {
        name: "Suara",

        data: [
          12000,
          18000,
          25000,
          34000,
          42000,
          51000,
        ],

        color: "#2563eb",
      },
    ],
  });
}

/* =====================================================
   COLUMN CHART
===================================================== */

function createColumnChart() {
  const container = document.getElementById("columnChart");

  if (!container) return;

  Highcharts.chart(container, {
    chart: {
      type: "column",
    },

    title: {
      text: null,
    },

    xAxis: {
      categories: [
        "Samarinda",
        "Balikpapan",
        "Kutai",
        "Bontang",
        "Berau",
      ],
    },

    yAxis: {
      title: {
        text: null,
      },
    },

    legend: {
      enabled: false,
    },

    series: [
      {
        name: "Suara",

        data: [
          8500,
          7100,
          6500,
          5200,
          4100,
        ],

        color: "#10b981",
      },
    ],
  });
}

/* =====================================================
   DONUT CHART
===================================================== */

function createDonutChart() {
  const container = document.getElementById("pieChart");

  if (!container) return;

  Highcharts.chart(container, {
    chart: {
      type: "pie",
    },

    title: {
      text: null,
    },

    legend: {
      enabled: true,
    },

    plotOptions: {
      pie: {
        innerSize: "60%",

        dataLabels: {
          enabled: true,
        },
      },
    },

    series: [
      {
        name: "Perolehan",

        data: [
          ["Partai A", 40],
          ["Partai B", 25],
          ["Partai C", 20],
          ["Partai D", 15],
        ],
      },
    ],
  });
}