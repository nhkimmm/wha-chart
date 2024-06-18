export default function calculateYTicks(
  minY: number,
  maxY: number,
  minTicks = 5,
  maxTicks = 10
) {
  // 1. 데이터 범위 파악
  const range = maxY;

  // 2. 기본 틱 간격 계산 (최소 틱 수 사용)
  const rawTickInterval = range / (minTicks - 1);

  // 3. 틱 간격 반올림
  const exponent = Math.floor(Math.log10(rawTickInterval));
  const roundedTickInterval =
    Math.ceil(rawTickInterval / Math.pow(10, exponent)) *
    Math.pow(10, exponent);

  // 4. 최소 틱 수와 최대 틱 수 사이에서 적절한 틱 간격을 찾기 위해 반복
  let tickInterval = roundedTickInterval;
  let numTicks = Math.ceil(range / tickInterval) + 1;

  while (numTicks < minTicks || numTicks > maxTicks) {
    if (numTicks < minTicks) {
      tickInterval /= 2;
    } else if (numTicks > maxTicks) {
      tickInterval *= 2;
    }
    numTicks = Math.ceil(range / tickInterval) + 1;
  }

  // 5. 틱 위치 설정
  const yTicks = [];
  let currentTick = Math.ceil(minY / tickInterval) * tickInterval;

  while (currentTick <= maxY) {
    yTicks.push(currentTick);
    currentTick += tickInterval;
  }

  return yTicks;
}
