import { capitalizeFirstLetter, ddmmyyyyFormatter } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { PieChart } from "react-minimal-pie-chart";
import useClerkSWR from "@/lib/useClerkSWR";
import {useEffect, useState} from "react";
import Spinner from "@/components/shared/Spinner";
import {parseISO} from "date-fns";
import {toast} from "sonner";

type PieChartCardProps = {
  pieChartId: string;
};

type PieChartCardHeaderProps = {
  pieChartId: string;
  selectorPlaceholder: string;
  selectorValues: CampaignValue[];
  startDate: Date;
  endDate: Date;
  daysLeft: number; // Mock for now but will be calculated and not stored in db
  setCampaignId: (campaignId: string) => void
};

type CardSelectorProps = {
  pieChartId: string;
  placeholder: string;
  values: CampaignValue[];
  setCampaignId: (campaignId: string) => void;
};

type CampaignValue = {
  id: string;
  title: string;
}

type Donation = {
  value: number;
  donorName: string;
  createdAt: string;
}

type PieChartCardBodyProps = {
  totalDonation: number;
  highestDonation: Donation;
  donationType: [string, number][];
  donationAmount: [string, number][];
};

const DEFAULT_PIECHART_COLORS = ["#1DCF9E", "#5CD1B2", "#9FD4C6"];

export default function PieChartCard({
  pieChartId,
}: PieChartCardProps) {
  const [campaignId, setCampaignId ] = useState("");
  const { data: allCampaignData, error: errorAllCampaignData, isLoading: isLoadingAllCampaignData } = useClerkSWR(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/cms/analytics/campaigns?filter=allTime`
  );
  const allCampaignName = allCampaignData ? allCampaignData : [];
  const { data: campaignData, error: errorCampaignData, isLoading: isLoadingCampaignData } = useClerkSWR(`${process.env.NEXT_PUBLIC_API_URL}/v1/cms/analytics/${campaignId}`)

  useEffect(() => {
    if (allCampaignData && allCampaignData.length > 0) {
      setCampaignId(allCampaignData[pieChartId].id);
    }
  }, [allCampaignData])

  if (errorAllCampaignData || (campaignId.length !== 0 && errorCampaignData)) {
    toast.error("Error retrieving campaign data for pie chart");
    return null;
  }

  return (
    <div className="bg-white shadow rounded flex flex-col gap-4 p-8 m-2">
      {
        isLoadingAllCampaignData || isLoadingCampaignData || campaignId === ""
          ? <Spinner />
          : <>
              <PieChartCardHeader
                  pieChartId={pieChartId}
                  selectorPlaceholder={campaignId !== "" ? allCampaignName[pieChartId].title : ""}
                  selectorValues={allCampaignName}
                  startDate={parseISO(campaignData.startDate)}
                  endDate={parseISO(campaignData.endDate)}
                  daysLeft={campaignData.timeLeft}
                  setCampaignId={setCampaignId}
              />
              <PieChartCardBody
                  totalDonation={campaignData.currentAmount}
                  highestDonation={campaignData.highestDonation}
                  donationType={Object.entries(JSON.parse(campaignData.donationTypeMap))}
                  donationAmount={Object.entries(JSON.parse(campaignData.donationAmountMap))}
              />
          </>
      }
    </div>
  );
}

function PieChartCardHeader({
  pieChartId,
  selectorPlaceholder,
  selectorValues,
  startDate,
  endDate,
  daysLeft,
  setCampaignId,
}: PieChartCardHeaderProps) {
  return (
    <div className="flex justify-between items-center">
      <CardSelector
        pieChartId={pieChartId}
        placeholder={selectorPlaceholder}
        values={selectorValues}
        setCampaignId={setCampaignId}
      />
      <div className="text-right">
        <p>
          Days Left: <b>{daysLeft}</b>
        </p>
        <p className="text-xs">
          Duration: {ddmmyyyyFormatter(startDate)} -{" "}
          {ddmmyyyyFormatter(endDate)}
        </p>
      </div>
    </div>
  );
}

function CardSelector({ pieChartId, placeholder, values, setCampaignId }: CardSelectorProps) {
  return (
    <Select
      onValueChange={setCampaignId}
    >
      <SelectTrigger className="w-[177px] h-[45px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {values.map((val, i) => {
          return (
            <SelectItem value={val.id} key={i}>
              {capitalizeFirstLetter(val.title)}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}

function PieChartCardBody({
  totalDonation,
  highestDonation,
  donationType,
  donationAmount
}: PieChartCardBodyProps) {
  const donationTypeData = [];
  let counter = 0;
  for (const donationTypeIndex in donationType) {
    donationTypeData.push({
      title: donationType[donationTypeIndex][0],
      value: donationType[donationTypeIndex][1],
      color: DEFAULT_PIECHART_COLORS[counter % DEFAULT_PIECHART_COLORS.length]
    })
    counter += 1;
  }

  const donationAmountData = [];
  counter = 0;
  for (const donationAmountIndex in donationAmount) {
    donationAmountData.push({
      title: donationAmount[donationAmountIndex][0],
      value: donationAmount[donationAmountIndex][1],
      color: DEFAULT_PIECHART_COLORS[counter % DEFAULT_PIECHART_COLORS.length]
    })
    counter += 1;
  }

  return (
    <div className="flex justify-between items-center">
      <div className="flex flex-col gap-2">
        <div>
          <p>Total Donated</p>
          <b>$ {totalDonation}</b>
        </div>
        <hr />
        {
          highestDonation
            ? <>
                <div>
                  <p>Highest Amount</p>
                  <b>$ {highestDonation.value}</b>
                </div>
                <div className="text-xs">
                  <p>From: {highestDonation.donorName}</p>
                  <p>
                    Date:{" "}
                    <span className="underline">
              {ddmmyyyyFormatter(parseISO(highestDonation.createdAt))}
            </span>
                  </p>
                </div>
              </>
              : <div>No donations yet</div>
        }

      </div>
      <div className="flex gap-4 text-center text-xs font-bold">
        <div className="h-28">
          <PieChart data={donationTypeData} lineWidth={48} />
          <p className="pt-2">Donor Types</p>
        </div>
        <div className="h-28">
          <PieChart data={donationAmountData} lineWidth={48} />
          <p className="pt-2">Donation Amount</p>
        </div>
      </div>
    </div>
  );
}
