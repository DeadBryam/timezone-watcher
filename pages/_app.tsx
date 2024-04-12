import "@/styles/global.css";
import "react-toastify/dist/ReactToastify.css";

import type { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";
import { ToastContainer } from "react-toastify";

import { Layout } from "@/components/index";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextNProgress color="#e63946" startPosition={0.3} stopDelayMs={200} />
      <ToastContainer />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
