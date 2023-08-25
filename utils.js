import { HttpsProxyAgent } from "https-proxy-agent";

export const httpsAgent = new HttpsProxyAgent({
  protocol: "http",
  host: "127.0.0.1",
  port: "10809",
});

export const httpAgent = new HttpsProxyAgent({
  protocol: "http",
  host: "127.0.0.1",
  port: "10809",
});
