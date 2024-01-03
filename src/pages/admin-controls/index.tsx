import Header from "@/components/admin-controls/Header";
import Table from "@/components/admin-controls/table";
import Layout from "@/components/layout";
import useIsLoggedIn from "@/lib/useIsLoggedIn";
import useIsSuperuser from "@/lib/useIsSuperuser";

export default function AdminControls() {
  useIsLoggedIn();
  useIsSuperuser();

  return (
    <Layout>
      <Header />
      <Table />
    </Layout>
  );
}
