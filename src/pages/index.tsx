import Card from "@/components/home/Card";
import GraphCard from "@/components/home/GraphCard";
import Header from "@/components/home/Header";
import OverallStatistics from "@/components/home/OverallStatistics";
import Layout from "@/components/layout";
import useIsLoggedIn from "@/lib/useIsLoggedIn";
import { ThumbsUpIcon } from "lucide-react";
import { Montserrat } from "next/font/google";
import localFont from "next/font/local";

const montserrat = Montserrat({
  subsets: ["latin"],
  style: ["normal"],
  weight: ["400"],
});

const arabotoBold = localFont({
  src: "../../public/fonts/araboto/Araboto Bold 400.ttf",
});

export default function Home() {
  useIsLoggedIn();

  return (
    <Layout>
      <Header />
      <OverallStatistics />
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex flex-col gap-4">
          <Card
            statistic="$20"
            data="Most Popular Amount"
            Icon={ThumbsUpIcon}
            footerData="46 donors"
          />
        </div>
        <GraphCard />
      </div>
    </Layout>
  );
}
