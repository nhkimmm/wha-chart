import BarChart from "./chart/BarChart.js";
import getData from "./utils/getData.js";

const body = {
  stime: Date.now() - 10 * 60 * 1000,
  etime: Date.now(),
  mql: "CATEGORY app_host_resource\nTAGLOAD\nSELECT\nGROUP {pk:pcode, merge: cpu}\nUPDATE {key:cpu, value:sum}",
};

document.addEventListener("DOMContentLoaded", async () => {
  const d = await getData(body);
  const data = d.map((d) => d.cpu);
  const labels = d.map((d) => d.time);
  const barChart = new BarChart("canvas", data, labels);
  barChart.drawChart();
});
