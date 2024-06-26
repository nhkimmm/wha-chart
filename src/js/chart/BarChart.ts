import calculateYTicks from "../utils/calculateYTicks.js";

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
  private paddingLeft: number;
  private paddingBottom: number;
  private paddingRight: number;
  private paddingTop: number;

  constructor(canvasId: string, data: number[], labels: string[]) {
    this.canvas = document.querySelector(
      `#${canvasId} canvas.chart-canvas`
    ) as HTMLCanvasElement;
    this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    this.data = data;
    this.labels = labels;
    this.barWidth = 20;
    this.barSpacing = 10;
    this.maxValue = 100;
    this.paddingLeft = 20;
    this.paddingBottom = 20;
    this.paddingTop = 20;
    this.paddingRight = 0;
    this.chartWidth = this.canvas.width - this.paddingLeft - this.paddingRight;
    this.chartHeight =
      this.canvas.height - this.paddingBottom - this.paddingTop;
    this.scaleFactor = this.chartHeight / this.maxValue;
  }

  private getBarWidth(
    boxWidth: number,
    count: number,
    paddingRatio = 0.7
  ): number {
    return boxWidth / ((paddingRatio + 1) * count + paddingRatio);
  }

  drawBars(): void {
    this.barWidth = this.getBarWidth(this.chartWidth, this.data.length);
    this.barSpacing = this.barWidth * 0.7;
    this.data.forEach((value, index) => {
      const barHeight = value * this.scaleFactor;
      const x =
        this.barSpacing +
        index * (this.barWidth + this.barSpacing) +
        this.paddingLeft;
      const y = this.chartHeight + this.paddingTop - barHeight;

      // Draw the bar
      this.ctx.fillStyle = "skyblue";
      this.ctx.fillRect(x, y, this.barWidth, barHeight);

      // Draw the labels
      this.ctx.fillStyle = "black";
      this.ctx.textAlign = "center";
      this.ctx.fillText(
        this.labels[index],
        x + this.barWidth / 2,
        this.chartHeight + this.paddingTop + 20
      );
    });
  }

  drawAxes(): void {
    this.ctx.beginPath();
    this.ctx.moveTo(this.paddingLeft, this.paddingTop);
    this.ctx.lineTo(this.paddingLeft, this.chartHeight + this.paddingTop);
    this.ctx.lineTo(
      this.paddingLeft + this.chartWidth,
      this.chartHeight + this.paddingTop
    );
    this.ctx.stroke();
  }

  drawYTicks(): void {
    const yTicks = calculateYTicks(0, this.maxValue);
    console.log(yTicks);
    for (let i = 0; i < yTicks.length; i++) {
      this.ctx.strokeStyle = "gray";
      this.ctx.beginPath();
      const fixedY =
        this.chartHeight + this.paddingTop - yTicks[i] * this.scaleFactor;
      this.ctx.moveTo(this.paddingLeft, fixedY);
      this.ctx.lineTo(this.canvas.width - this.paddingRight, fixedY);
      this.ctx.stroke();
      this.ctx.textAlign = "right";
      this.ctx.fillText(String(yTicks[i]), this.paddingLeft / 1.5, fixedY);
    }
  }

  drawChart(): void {
    this.drawYTicks();
    this.drawBars();
    this.drawAxes();
  }
}

export default BarChart;
