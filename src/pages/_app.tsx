import React from "react";
import { AppProps } from "next/app";
import "react-toastify/dist/ReactToastify.css";
import Layout from "@/components/Layout";
import { LoaderProvider } from "@/context/LoaderContext";

import Loader from "@/components/Loader";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LoaderProvider>
      <Layout>
        <Loader />
        <Component {...pageProps} />
      </Layout>
    </LoaderProvider>
  );
}
