import useAuthStore from "@/stores/useAuthStore";
import { useEffect } from "react";
import { useRouter } from "next/router";

const useIsLoggedIn = () => {
  const router = useRouter();
  const { isLoggedIn } = useAuthStore();

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/login");
    }
  }, []);
};

export default useIsLoggedIn;
