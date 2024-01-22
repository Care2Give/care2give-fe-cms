import { useEffect, useState } from "react";
import Card from "./Card";
import { FileHeartIcon } from "lucide-react";
import useClerkSWR from "@/lib/useClerkSWR";
import useMostPopularCampaignStore from "@/stores/useMostPopularCampaignStore";

interface MostPopularCampaign {
  campaignTitle: string;
  numberOfDonors: number;
}

export default function MostPopularCampaignCard() {
  // feature 4: most popular campaign
  const { mostPopularCampaignFilter, setMostPopularCampaignFilter } =
    useMostPopularCampaignStore();

  const [mostPopularCampaign, setMostPopularCampaign] =
    useState<MostPopularCampaign>({
      campaignTitle: "None",
      numberOfDonors: 0,
    });

  const { data: mostPopularCampaignFetched, error } = useClerkSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/v1/cms/homepage-analytics/most-popular-campaign?filter=` +
      mostPopularCampaignFilter
  );

  useEffect(() => {
    setMostPopularCampaign(mostPopularCampaignFetched);
  }, [mostPopularCampaignFetched]);

  if (error) return null;

  return (
    <Card
      statistic={mostPopularCampaign?.campaignTitle}
      data="Most Popular Campaign"
      footerData={`${mostPopularCampaign?.numberOfDonors || ""} Donors`}
      Icon={FileHeartIcon}
      setFilter={setMostPopularCampaignFilter}
    />
  );
}
