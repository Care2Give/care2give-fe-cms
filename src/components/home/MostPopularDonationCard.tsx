import { useEffect, useState } from "react";
import Card from "./Card";
import { ThumbsUpIcon } from "lucide-react";
import useClerkSWR from "@/lib/useClerkSWR";
import useMostPopularDonationStore from "@/stores/homepage/useMostPopularDonationStore";

interface MostPopularDonation {
  mostPopularAmount: string;
  numberOfDonors: number;
}

export default function MostPopularDonationCard() {
  // feature 5: most popular amount donated
  const { mostPopularDonationFilter, setMostPopularDonationFilter } =
    useMostPopularDonationStore();

  const [mostPopularDonation, setMostPopularDonation] =
    useState<MostPopularDonation>({
      mostPopularAmount: "0",
      numberOfDonors: 0,
    });

  const { data: mostPopularDonationFetched, error } = useClerkSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/v1/cms/homepage-analytics/most-popular-amount?filter=` +
      mostPopularDonationFilter
  );

  useEffect(() => {
    console.log("most popular donation fetched", mostPopularDonationFetched);
    setMostPopularDonation(mostPopularDonationFetched);
  }, [mostPopularDonationFetched]);

  if (error) return null;

  return (
    <Card
      statistic={mostPopularDonation?.mostPopularAmount}
      data="Most Popular Amount"
      Icon={ThumbsUpIcon}
      footerData={`${mostPopularDonation?.numberOfDonors || ""} Donors`}
      setFilter={setMostPopularDonationFilter}
    />
  );
}
