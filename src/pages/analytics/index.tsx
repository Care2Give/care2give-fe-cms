import Header from "@/components/analytics/Header";
import Layout from "@/components/layout";
import useIsLoggedIn from "@/lib/useIsLoggedIn";

export default function Analytics() {
  useIsLoggedIn();

  return (
    <Layout>
      <Header />
    </Layout>
  );
}
