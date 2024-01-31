import { useEffect, useState } from "react";
import Card from "./Card";
import { ChevronsUp } from "lucide-react";
import useClerkSWR from "@/lib/useClerkSWR";
import useHighestAmountStore from "@/stores/homepage/useHighestAmountStore";

interface HighestAmount {
  highestAmount: string;
  numberOfDonors: number;
}

export default function HighestAmountCard() {
  // feature 3: highest donation amount
  const { highestAmountFilter, setHighestAmountFilter } =
    useHighestAmountStore();

  const [highestAmount, setHighestAmount] = useState<HighestAmount>({
    highestAmount: "None",
    numberOfDonors: 0,
  });

  const { data: highestAmountFetched, error } = useClerkSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/v1/cms/homepage-analytics/highest-donation-amount?filter=` +
      highestAmountFilter
  );

  useEffect(() => {
    setHighestAmount(highestAmountFetched);
  }, [highestAmountFetched]);

  if (error) return null;

  return (
    <Card
      statistic={highestAmount?.highestAmount}
      data="Highest Amount"
      Icon={ChevronsUp}
      setFilter={setHighestAmountFilter}
    />
  );
}
