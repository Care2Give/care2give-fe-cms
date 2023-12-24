import InactivityDialog from "@/components/shared/InactivityDialog";
import { Toaster } from "@/components/ui/toaster";
import useAuthStore from "@/stores/useAuthStore";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  const { isLoggedIn } = useAuthStore();
  return (
    <>
      {isLoggedIn && <InactivityDialog />}
      <Component {...pageProps} />
      <Toaster />
    </>
  );
}
