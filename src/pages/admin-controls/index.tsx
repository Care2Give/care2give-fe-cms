import Header from "@/components/admin-controls/Header";
import Layout from "@/components/layout";
import useIsLoggedIn from "@/lib/useIsLoggedIn";

export default function AdminControls() {
  useIsLoggedIn();

  return (
    <Layout>
      <Header />
    </Layout>
  );
}
