class BarChart {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private data: number[];
  private labels: string[];
  private chartWidth: number;
  private chartHeight: number;
  private barWidth: number;
  private barSpacing: number;
  private maxValue: number;
  private scaleFactor: number;
  private xAxisHeight: number;
  private yAxisWidth: number;

  constructor(canvasId: string, data: number[], labels: string[]) {
    this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    this.data = data;
    this.labels = labels;
    this.barWidth = 20;
    this.barSpacing = 10;
    this.maxValue = 100;
    this.xAxisHeight = 20;
    this.yAxisWidth = 20;
    this.chartWidth = this.canvas.width - this.xAxisHeight;
    this.chartHeight = this.canvas.height - this.yAxisWidth;
    this.scaleFactor = (this.chartHeight - 200) / this.maxValue;
  }

  drawBars(): void {
    this.data.forEach((value, index) => {
      const barHeight = value * this.scaleFactor;
      const x = index * (this.barWidth + this.barSpacing) + this.yAxisWidth;
      const y = this.chartHeight - barHeight;

      // Draw the bar
      this.ctx.fillStyle = "blue";
      this.ctx.fillRect(x, y, this.barWidth, barHeight);

      // Draw the labels
      this.ctx.fillStyle = "black";
      this.ctx.textAlign = "center";
      this.ctx.fillText(
        this.labels[index],
        x + this.barWidth / 2,
        this.chartHeight + 20
      );
      this.ctx.fillText(value.toString(), x + this.barWidth / 2, y - 10);
    });
  }

  drawAxes(): void {
    this.ctx.beginPath();
    this.ctx.moveTo(this.yAxisWidth, 0);
    this.ctx.lineTo(this.yAxisWidth, this.chartHeight);
    this.ctx.lineTo(this.yAxisWidth + this.chartWidth, this.chartHeight);
    this.ctx.stroke();
  }

  drawChart(): void {
    this.drawBars();
    this.drawAxes();
  }
}

export default BarChart;
