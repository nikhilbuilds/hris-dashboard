import React from "react";
import { AppProps } from "next/app";
import Layout from "@/pages/components/Layout";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
