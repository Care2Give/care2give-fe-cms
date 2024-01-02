import Header from "@/components/campaigns/Header";
import SubHeader from "@/components/campaigns/SubHeader";
import Table from "@/components/campaigns/table";
import Layout from "@/components/layout";
import useIsLoggedIn from "@/lib/useIsLoggedIn";

export default function Campaigns() {
  useIsLoggedIn();

  return (
    <Layout>
      <Header />
      <SubHeader />
      <Table />
    </Layout>
  );
}
