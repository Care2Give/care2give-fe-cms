import { useEffect, useState } from "react";
import Card from "./Card";
import { HeartHandshakeIcon } from "lucide-react";
import useClerkSWR from "@/lib/useClerkSWR";
import useTotalDonationAmountStore from "@/stores/homepage/useTotalDonationAmount";

export default function TotalDonationAmountCard() {
  // feature 1: total donation amount
  const { totalDonationAmountFilter, setTotalDonationAmountFilter } =
    useTotalDonationAmountStore();

  interface TotalDonationAmount {
    totalAmount: string;
  }

  const [totalDonationAmount, setTotalDonationAmount] =
    useState<TotalDonationAmount>({
      totalAmount: "0",
    });

  useEffect(() => {}, [totalDonationAmountFilter]);

  const { data: totalDonationAmountFetched, error } = useClerkSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/v1/cms/homepage-analytics/total-donation-amount?filter=` +
      totalDonationAmountFilter
  );

  useEffect(() => {
    setTotalDonationAmount(totalDonationAmountFetched);
  }, [totalDonationAmountFetched]);

  return (
    <Card
      statistic={totalDonationAmount?.totalAmount}
      data="Total Donation Amount"
      Icon={HeartHandshakeIcon}
      setFilter={setTotalDonationAmountFilter}
    />
  );
}
