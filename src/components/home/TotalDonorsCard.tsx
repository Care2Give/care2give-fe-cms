import { useEffect, useState } from "react";
import Card from "./Card";
import { SmileIcon } from "lucide-react";
import useClerkSWR from "@/lib/useClerkSWR";
import useTotalDonorsStore from "@/stores/homepage/useTotalDonorsStore";

export default function TotalDonorsCard() {
  // feature 2: total donor number
  const { totalDonorsFilter, setTotalDonorsFilter } = useTotalDonorsStore();

  interface TotalDonors {
    donorNumber: string;
  }

  const [totalDonors, setTotalDonors] = useState<TotalDonors>({
    donorNumber: "0",
  });

  useEffect(() => {
    console.log("rerendered total donors feature");
  }, [totalDonorsFilter]);

  const { data: totalDonorsFetched, error } = useClerkSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/v1/cms/homepage-analytics/total-donor-number?filter=` +
      totalDonorsFilter
  );

  useEffect(() => {
    setTotalDonors(totalDonorsFetched);
  }, [totalDonorsFetched]);

  return (
    <Card
      statistic={totalDonors?.donorNumber}
      data="Donors"
      Icon={SmileIcon}
      setFilter={setTotalDonorsFilter}
    />
  );
}
