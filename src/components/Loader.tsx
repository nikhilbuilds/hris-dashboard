import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { CircularProgress, Backdrop } from "@mui/material";
import { useGlobalLoader } from "@/context/LoaderContext";

const Loader = () => {
  const { isLoading, setLoading } = useGlobalLoader();
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router, setLoading]);

  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={isLoading}
    >
      <CircularProgress color="secondary" />
    </Backdrop>
  );
};

export default Loader;
