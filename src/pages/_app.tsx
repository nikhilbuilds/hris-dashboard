import React from "react";
import { AppProps } from "next/app";
import Layout from "@/components/Layout";
import Loader from "../components/Loader";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Loader />
      <Component {...pageProps} />
    </Layout>
  );
}
