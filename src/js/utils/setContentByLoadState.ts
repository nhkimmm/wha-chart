const setContentByLoadState = (id: string, isLoading: boolean) => {
  const loadingBox = document.querySelector(
    `div#${id} div.loading-box`
  ) as HTMLDivElement;
  const chartCanvas = document.querySelector(
    `div#${id} canvas.chart-canvas`
  ) as HTMLCanvasElement;
  if (isLoading) {
    if (loadingBox) loadingBox.style.display = "flex";
    if (chartCanvas) chartCanvas.style.display = "none";
  } else {
    if (loadingBox) loadingBox.style.display = "none";
    if (chartCanvas) chartCanvas.style.display = "flex";
  }
};

export default setContentByLoadState;
