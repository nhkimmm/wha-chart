const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const path = require("path");

const app = express();
const port = 3000;

// "/open/api" 경로로 들어오는 요청을 대상 서버로 프록시
app.use(
  "/open/api",
  createProxyMiddleware({
    target: "https://api.whatap.io/open/api",
    changeOrigin: true,
  })
);

// 정적 파일 서빙 설정
app.use(express.static(path.join(__dirname, "dist")));

// 루트 경로("/")로 들어오는 GET 요청 처리
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// 서버 시작
app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 포트에서 실행 중입니다.`);
});
