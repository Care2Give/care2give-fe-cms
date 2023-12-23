import Layout from "@/components/layout";
import useIsLoggedIn from "@/lib/useIsLoggedIn";
import Table from "@/components/donations/table";

export default function Donations() {
  useIsLoggedIn();

  return <Layout>{/* <Table /> */}</Layout>;
}
