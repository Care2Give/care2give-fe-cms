import Layout from "@/components/layout";
import useIsLoggedIn from "@/lib/useIsLoggedIn";
import Table from "@/components/donations/table";
import Header from "@/components/donations/Header";

export default function Donations() {
  useIsLoggedIn();

  return (
    <Layout>
      <Header />
      <Table />
    </Layout>
  );
}
