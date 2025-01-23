import React from "react";
import { AppProps } from "next/app";
import Layout from "@/pages/components/Layout";
import { CssBaseline } from "@mui/material";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
