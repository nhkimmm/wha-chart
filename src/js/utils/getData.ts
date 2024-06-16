const PROJECT_API_TOKEN = "XGJHUSQZTI2AVIENWA27HI5V";
const PCODE = "5490";

type MxqlParams = {
  etime: number;
  stime: number;
  mql: string;
  inject?: Record<string, string>;
  param?: Record<`$${string}`, string>;
};

const getData = async ({ stime, etime, mql, inject, param }: MxqlParams) => {
  if (!etime || !stime || !mql) {
    console.error("요청 파라미터가 올바르지 않습니다.", { etime, stime, mql });
  }
  const res = await fetch("/open/api/flush/mxql/text", {
    method: "POST",
    headers: new Headers({
      "x-whatap-token": PROJECT_API_TOKEN,
      "x-whatap-pcode": PCODE,
      "Content-Type": "application/json",
    }),
    body: JSON.stringify({
      stime,
      etime,
      mql,
      inject,
      param,
      pageKey: "mxql",
    }),
  });
  return await res.json();
};
export default getData;
