import Header from "@/components/analytics/Header";
import Layout from "@/components/layout";
import BarChartCard from "@/components/analytics/BarChartCard";
import CampaignTable from "@/components/analytics/CampaignTable";
import PopularTable from "@/components/analytics/PopularTable";
import PieChartCard from "@/components/analytics/PieChartCard";
import useAnalyticsStore from "@/stores/useAnalyticsStore";
import GraphCard from "@/components/analytics/GraphCard";
import useClerkSWR from "@/lib/useClerkSWR";
import { useState} from "react";
import {toast} from "sonner";

export default function Analytics() {
  const [ campaignDetailFilter, setCampaignDetailFilter] = useState("daily");
  const [ popularAmountFilter, setPopularAmountFilter] = useState("daily");

  const { data: fullCampaignData, error: errorCampaignData, isLoading: isLoadingCampaignData } = useClerkSWR(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/cms/analytics/campaigns?filter=${campaignDetailFilter}`
  );

  const { data: fullPopularAmountData, error: errorPopularAmountData, isLoading: isLoadingPopularAmountData } = useClerkSWR(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/cms/analytics/most-popular-amounts?filter=${popularAmountFilter}`
  );

  if (errorCampaignData) {
    toast.error("Error retrieving campaign data");
  }

  if (errorPopularAmountData) {
    toast.error("Error retrieving popular donation amount data");
  }

  const typedCampaignData = fullCampaignData ? fullCampaignData : [];

  const barCampaignData = typedCampaignData.map((campaign) => ({
    xLabel: "",
    yLabel: `$${Math.floor(campaign.amount / 1000)}+`,
    scale: campaign.amount,
  }));

  const tableCampaignData = typedCampaignData.map((campaign) => ({
    campaign: campaign.title,
    amount: campaign.amount,
    trend: campaign.trend
  }))

  const typedPopularAmountData = fullPopularAmountData ? fullPopularAmountData : [];

  const barPopularAmountData = typedPopularAmountData.map((campaign) => ({
    xLabel: `$${campaign.amount}`,
    yLabel: `${campaign.numberOfDonations}`,
    scale: campaign.numberOfDonations,
  }));

  const tablePopularAmountData = typedPopularAmountData.map(donationAmount => ({
    campaign: donationAmount.campaign,
    amount: donationAmount.amount,
    numberOfDonations: donationAmount.numberOfDonations
  }))

  return (
    <Layout>
      <Header />
      <div className="grid grid-cols-1 xl:grid-cols-2">
        <BarChartCard
            title="Campaigns"
            barChartDetails={barCampaignData}
            tableDetails={tableCampaignData}
            Table={CampaignTable}
            isLoading={isLoadingCampaignData}
            setFrequency={setCampaignDetailFilter}
        />
        <BarChartCard
          title="Most Popular Amounts"
          barChartDetails={barPopularAmountData}
          tableDetails={tablePopularAmountData}
          Table={PopularTable}
          isLoading={isLoadingPopularAmountData}
          setFrequency={setPopularAmountFilter}
        />
      </div>
      <GraphCard />
      <div className="grid grid-cols-1 xl:grid-cols-2">
        <PieChartCard pieChartId="1" />
        <PieChartCard pieChartId="2" />
      </div>
    </Layout>
  );
}
