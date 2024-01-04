import { useEffect } from "react";
import { useRouter } from "next/router";
import { useUser } from "@clerk/nextjs";

const useIsSuperuser = () => {
  const router = useRouter();
  const { user } = useUser();
  const role = user?.publicMetadata.role;

  useEffect(() => {
    if (role !== "superuser") {
      router.replace("/");
    }
  }, []);
};

export default useIsSuperuser;
