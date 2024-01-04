import Header from "@/components/home/Header";
import OverallStatistics from "@/components/home/OverallStatistics";
import Layout from "@/components/layout";
import { useUser } from "@clerk/nextjs";

export default function Home() {
  return (
    <Layout>
      <Header />
      <OverallStatistics />
    </Layout>
  );
}
