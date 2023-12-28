import Header from "@/components/home/Header";
import OverallStatistics from "@/components/home/OverallStatistics";
import Layout from "@/components/layout";
import useIsLoggedIn from "@/lib/useIsLoggedIn";

export default function Home() {
  useIsLoggedIn();

  return (
    <Layout>
      <Header />
      <OverallStatistics />
    </Layout>
  );
}
