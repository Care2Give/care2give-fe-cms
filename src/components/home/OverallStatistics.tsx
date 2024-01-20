import GraphCard from "./GraphCard";
import PieChartCard from "./PieChartCard";
import MostPopularDonationCard from "./MostPopularDonationCard";
import MostPopularCampaignCard from "./MostPopularCampaignCard";
import HighestAmountCard from "./HighestAmount";
import TotalDonorsCard from "./TotalDonorsCard";
import TotalDonationAmountCard from "./TotalDonationAmount";

export default function OverallStatistics() {
  return (
    <div className="flex gap-4 flex-wrap">
      <TotalDonationAmountCard />
      <TotalDonorsCard />
      <HighestAmountCard />
      <MostPopularCampaignCard />
      <div className="flex flex-col gap-4">
        <MostPopularDonationCard />
        <PieChartCard statistic="Donation Type" selectorPlaceholder="Group" />
      </div>
      <GraphCard />
    </div>
  );
}
