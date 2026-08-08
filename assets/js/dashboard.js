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
    { selector: "#dashboard-cards", key: "kpi-cards" },
    { selector: "#dashboard-line-chart", key: "trend-chart" },
    { selector: "#dashboard-ai-widget", key: "ai-widget" },
    { selector: "#dashboard-map", key: "map" },
    { selector: "#dashboard-quick-stat", key: "quick-stat" },
    { selector: "#dashboard-column-chart", key: "column-chart" },
    { selector: "#dashboard-donut-chart", key: "donut-chart" },
    { selector: "#dashboard-progress", key: "progress" },
    { selector: "#dashboard-timeline", key: "timeline" },
    { selector: "#dashboard-table", key: "data-table" },
  ];

  widgets.forEach((widget) => loadComponent(widget.selector, widget.key));
}

/* =====================================================
   LOAD HTML COMPONENT
   (diambil dari window.COMPONENTS, bukan fetch(), supaya
   bisa dibuka langsung lewat file:// tanpa web server)
===================================================== */

function loadComponent(selector, key) {
  const target = document.querySelector(selector);

  if (!target) return;

  try {
    const html = window.COMPONENTS && window.COMPONENTS[key];

    if (!html) {
      throw new Error(key);
    }

    target.innerHTML = html;
  } catch (error) {
    target.innerHTML = `
            <div class="dashboard-widget">
                <h3>Component Error</h3>
                <p>${key}</p>
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
