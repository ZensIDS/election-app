/**
 * =====================================================
 * POLITICAL INTELLIGENCE 2029
 * Dashboard Controller
 * =====================================================
 */

document.addEventListener("DOMContentLoaded", async () => {
  try {
    await loadDashboard();

    initDashboard();
  } catch (error) {
    console.error("Dashboard gagal dimuat:", error);
  }
});

/* =====================================================
   LOAD DASHBOARD
===================================================== */

async function loadDashboard() {
  console.log("Loading Dashboard...");

  await loadDashboardComponents();
}

/* =====================================================
   LOAD COMPONENTS
===================================================== */

async function loadDashboardComponents() {
  const widgets = [
    {
      selector: "#dashboard-cards",
      file: "../../components/kpi-cards.html",
    },
    {
      selector: "#dashboard-line-chart",
      file: "../../components/trend-chart.html",
    },
    {
      selector: "#dashboard-ai-widget",
      file: "../../components/ai-widget.html",
    },
    {
      selector: "#dashboard-map",
      file: "../../components/map.html",
    },
    {
      selector: "#dashboard-quick-stat",
      file: "../../components/quick-stat.html",
    },
    {
      selector: "#dashboard-column-chart",
      file: "../../components/column-chart.html",
    },
    {
      selector: "#dashboard-donut-chart",
      file: "../../components/donut-chart.html",
    },
    {
      selector: "#dashboard-progress",
      file: "../../components/progress.html",
    },
    {
      selector: "#dashboard-timeline",
      file: "../../components/timeline.html",
    },
    {
      selector: "#dashboard-table",
      file: "../../components/data-table.html",
    },
  ];

  await Promise.all(
    widgets.map((widget) => loadComponent(widget.selector, widget.file)),
  );
}

/* =====================================================
   LOAD HTML COMPONENT
===================================================== */

async function loadComponent(selector, file) {
  const target = document.querySelector(selector);

  if (!target) return;

  try {
    const response = await fetch(file);

    if (!response.ok) {
      throw new Error(file);
    }

    target.innerHTML = await response.text();
  } catch (error) {
    target.innerHTML = `
            <div class="dashboard-widget">
                <h3>Component Error</h3>
                <p>${file}</p>
            </div>
        `;

    console.error(error);
  }
}

/* =====================================================
   INITIALIZE DASHBOARD
===================================================== */

function initDashboard() {
  console.log("Dashboard Ready");

  initCharts();

  initMaps();

  bindDashboardEvents();
}

/* =====================================================
   EVENTS
===================================================== */

function bindDashboardEvents() {
  console.log("Dashboard Events Ready");
}
