import useEmailEditorStore from "@/stores/useEmailEditorStore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const useRouteHandler = () => {
  const router = useRouter();
  const { isEditing } = useEmailEditorStore();

  const [routeAwayConfirmationOpen, setRouteAwayConfirmationOpen] =
    useState(false);
  const [routeAwayUrl, setRouteAwayUrl] = useState("");

  const navigate = (path: string) => {
    return router.push(path);
  };

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      // if re-routing back to current page or user is not editing.
      if (url == "/email-editor" || !isEditing) {
        return;
      }
      // Cancel the navigation
      setRouteAwayConfirmationOpen(true);
      setRouteAwayUrl(url);
      throw "cancelled route change";
    };

    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router.events, isEditing]);

  return {
    navigate,
    routeAwayUrl,
    routeAwayConfirmationOpen,
    setRouteAwayConfirmationOpen,
  };
};

export default useRouteHandler;
