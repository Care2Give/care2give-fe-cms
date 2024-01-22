import { capitalizeFirstLetter, ddmmyyyyFormatter } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { PieChart } from "react-minimal-pie-chart";
import useAnalyticsStore from "@/stores/useAnalyticsStore";
import useClerkSWR from "@/lib/useClerkSWR";
import {useEffect, useState} from "react";
import Spinner from "@/components/shared/Spinner";
import {parseISO} from "date-fns";

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
};

const MOCK_CAMPAIGNS_DATA = [
  {
    campaignName: "Charity Dinner 2020",
    data: {
      startDate: new Date("2020-01-01"),
      endDate: new Date("2020-03-31"),
      daysLeft: 80,
      totalDonation: 12000.45,
      topDonor: {
        donationAmt: 300,
        donorName: "Mr. Tan",
        date: new Date("2020-02-23"),
      },
    },
  },
  {
    campaignName: "Smell Good, Feel Good, Do Good",
    data: {
      startDate: new Date("2020-01-01"),
      endDate: new Date("2020-06-31"),
      daysLeft: 73,
      totalDonation: 10023.5,
      topDonor: {
        donationAmt: 80,
        donorName: "Mrs. Lee",
        date: new Date("2020-01-02"),
      },
    },
  },
  {
    campaignName: "Providing Housing Advice",
    data: {
      startDate: new Date("2020-01-01"),
      endDate: new Date("2020-05-31"),
      daysLeft: 60,
      totalDonation: 9503.5,
      topDonor: {
        donationAmt: 240,
        donorName: "Mr. Johnson",
        date: new Date("2020-01-10"),
      },
    },
  },
  {
    campaignName: "Hidden Heroes",
    data: {
      startDate: new Date("2020-01-01"),
      endDate: new Date("2020-04-31"),
      daysLeft: 45,
      totalDonation: 14321.5,
      topDonor: {
        donationAmt: 530,
        donorName: "Mrs. Fatimah",
        date: new Date("2020-02-05"),
      },
    },
  },
];
const ALL_CAMPAIGNS_NAME = MOCK_CAMPAIGNS_DATA.map(
  (campaign) => campaign.campaignName
);
const MOCK_PIECHART_DATA = [
  { title: "One", value: 10, color: "#1DCF9E" },
  { title: "Two", value: 15, color: "#5CD1B2" },
  { title: "Three", value: 20, color: "#9FD4C6" },
];

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

  console.log(campaignData, errorCampaignData, isLoadingCampaignData, campaignId);

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
  highestDonation
}: PieChartCardBodyProps) {
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
          <PieChart data={MOCK_PIECHART_DATA} lineWidth={48} />
          <p className="pt-2">Donor Types</p>
        </div>
        <div className="h-28">
          <PieChart data={MOCK_PIECHART_DATA} lineWidth={48} />
          <p className="pt-2">Donation Amount</p>
        </div>
      </div>
    </div>
  );
}
