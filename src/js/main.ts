import BarChart from "./chart/BarChart.js";
import SeriesBarChart from "./chart/SeriesBarChart.js";
import getData from "./utils/getData.js";
import setContentByLoadState from "./utils/setContentByLoadState.js";

const WIDGET_TYPE = {
  CPU_SERIES_SINGLE: {
    mql: "CATEGORY app_host_resource\nTAGLOAD\nSELECT\nGROUP {pk:pcode, merge: cpu}\nUPDATE {key:cpu, value:avg}\nRENAME {src:cpu,dst:value}",
    chartType: "seriesBar",
  },
  CPU_SERIES_MULTI: {
    mql: "CATEGORY app_host_resource\nTAGLOAD\nSELECT",
    chartType: "seriesBar",
  },
  CPU_LAST: {
    mql: "CATEGORY app_host_resource\nTAGLOAD {backward: true}\nLAST-ONLY oid\nSELECT",
    chartType: "bar",
  },
};

type WidgetType = keyof typeof WIDGET_TYPE;

const time = {
  stime: Date.now() - 10 * 60 * 1000,
  etime: Date.now(),
};

const WIDGET_LIST: Array<WidgetType> = [
  "CPU_SERIES_SINGLE",
  // "CPU_SERIES_MULTI",
  "CPU_LAST",
];

const getPayload = (type: WidgetType) => {
  return { ...time, mql: WIDGET_TYPE[type].mql };
};

const parseData = (
  type: WidgetType,
  origin: Array<Record<string, string | number>>
) => {
  const data: Array<number> = [];
  const labels: Array<string> = [];
  switch (type) {
    case "CPU_LAST":
      origin.forEach((d) => {
        data.push(Number(d.cpu));
        labels.push(String(d.oname));
      });
      break;
    case "CPU_SERIES_MULTI":
      break;
    case "CPU_SERIES_SINGLE":
      origin.forEach((d) => {
        data.push(Number(d.cpu));
        labels.push(String(d.time));
      });
      break;
  }
  return { data, labels };
};

const addWidget = (types: Array<WidgetType>) => {
  types.reduce(async (promise, type) => {
    await promise;
    const layout = document.getElementById("widget-layout");

    const widget = document.createElement("div");
    widget.className = "chart-box";
    widget.id = type;

    const loading = document.createElement("div");
    loading.className = "loading-box";
    loading.textContent = "Loading...";

    const chart = document.createElement("canvas");
    chart.className = "chart-canvas";

    widget.appendChild(loading);
    widget.appendChild(chart);
    layout?.appendChild(widget);

    const payload = getPayload(type);

    setContentByLoadState(type, true);
    const origin = await getData(payload);
    setContentByLoadState(type, false);

    const { data, labels } = parseData(type, origin);

    switch (WIDGET_TYPE[type].chartType) {
      case "bar": {
        const barChart = new BarChart(type, data, labels);
        barChart.drawChart();
        break;
      }
      case "seriesBar": {
        const barChart = new SeriesBarChart(type, origin);
        barChart.drawChart();
        break;
      }
    }
  }, Promise.resolve());
};

document.addEventListener("DOMContentLoaded", () => addWidget(WIDGET_LIST));
