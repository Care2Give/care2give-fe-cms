import Card from "@/components/home/Card";
import {
  ChevronsUpIcon,
  FileHeartIcon,
  HeartHandshakeIcon,
  SmileIcon,
} from "lucide-react";

export default function OverallStatistics() {
  return (
    <div className="flex gap-4 flex-wrap">
      <Card
        statistic="$5034.30"
        data="Total Donation Amount"
        Icon={HeartHandshakeIcon}
      />
      <Card statistic="62" data="Donors" Icon={SmileIcon} />
      <Card statistic="$150" data="Highest Amount" Icon={ChevronsUpIcon} />
      <Card
        statistic="Eat Good, Feel Good, Do Good"
        data="Most Popular Campaign"
        footerData="56 donors"
        Icon={FileHeartIcon}
      />
    </div>
  );
}
