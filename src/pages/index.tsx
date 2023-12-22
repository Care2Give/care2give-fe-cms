import Layout from "../components/layout";
import useAuthStore from "@/stores/useAuthStore";
import useIsLoggedIn from "@/lib/useIsLoggedIn";

export default function Home() {
  useIsLoggedIn();

  return <Layout />;
}
