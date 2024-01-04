import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type routeHandlerProps = {
  isEditing: boolean;
  setIsEditing: Function;
  didSaveContent: boolean;
  setDidSaveContent: Function;
};

const useRouteHandler = ({
  isEditing,
  setIsEditing,
  didSaveContent,
  setDidSaveContent,
}: routeHandlerProps) => {
  const router = useRouter();

  const [routeAwayConfirmationOpen, setRouteAwayConfirmationOpen] =
    useState(false);
  const [routeAwayUrl, setRouteAwayUrl] = useState("");

  const navigate = (path: string) => {
    return router.push(path);
  };

  useEffect(() => {
    setDidSaveContent(false);
    const handleRouteChange = (url: string) => {
      // if re-routing back to current page or user is not editing.
      if (url == "/email-editor" || !isEditing) {
        return;
      }
      if (didSaveContent) {
        // Continue with the navigation
        setIsEditing(false);
      } else {
        // Cancel the navigation
        setRouteAwayConfirmationOpen(true);
        setRouteAwayUrl(url);
        throw "cancelled route change";
      }
    };

    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.events, isEditing]);

  return {
    navigate,
    routeAwayUrl,
    routeAwayConfirmationOpen,
    setRouteAwayConfirmationOpen,
  };
};

export default useRouteHandler;
