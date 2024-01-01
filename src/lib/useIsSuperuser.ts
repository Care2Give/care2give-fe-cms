import useAuthStore from "@/stores/useAuthStore";
import { useEffect } from "react";
import { useRouter } from "next/router";

const useIsSuperuser = () => {
  const router = useRouter();
  const { role } = useAuthStore();

  useEffect(() => {
    if (role !== "superuser") {
      router.replace("/");
    }
  }, []);
};

export default useIsSuperuser;
