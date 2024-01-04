import Header from "@/components/admin-controls/Header";
import Table from "@/components/admin-controls/table";
import Layout from "@/components/layout";
import useClerkSWR from "@/lib/useClerkSWR";
import useIsSuperuser from "@/lib/useIsSuperuser";

export default function AdminControls() {
  // useIsSuperuser();

  return (
    <Layout>
      <Header />
      <Table />
    </Layout>
  );
}
