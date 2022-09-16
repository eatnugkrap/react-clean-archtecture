import "../styles/globals.css";
import "antd/dist/antd.css";
import type { AppProps } from "next/app";
import { AppQueryClientProvider } from "../shared/query";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppQueryClientProvider>
      <Component {...pageProps} />
    </AppQueryClientProvider>
  );
}

export default MyApp;
