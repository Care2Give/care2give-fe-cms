import InactivityDialog from "@/components/shared/InactivityDialog";
import { Toaster } from "@/components/ui/toaster";
import useAuthStore from "@/stores/useAuthStore";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
// import { ClerkProvider } from "@clerk/nextjs";

export default function App({ Component, pageProps }: AppProps) {
  const { isLoggedIn } = useAuthStore();
  return (
    // <ClerkProvider {...pageProps}>
    <>
      {isLoggedIn && <InactivityDialog />}
      <Component {...pageProps} />
      <Toaster />
    </>
    // </ClerkProvider>
  );
}
