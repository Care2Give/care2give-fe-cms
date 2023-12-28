import Header from "@/components/admin-controls/Header";
import Table from "@/components/admin-controls/table";
import Layout from "@/components/layout";
import useIsLoggedIn from "@/lib/useIsLoggedIn";

export default function AdminControls() {
  useIsLoggedIn();

  return (
    <Layout>
      <Header />
      <Table />
    </Layout>
  );
}
