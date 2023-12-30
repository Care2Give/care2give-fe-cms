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

type PieChartCardProps = {
  pieChartId: string;
  campaignName: string;
};

type PieChartCardHeaderProps = {
  pieChartId: string;
  selectorPlaceholder: string;
  selectorValues: string[];
  startDate: Date;
  endDate: Date;
  daysLeft: number; // Mock for now but will be calculated and not stored in db
};

type CardSelectorProps = {
  pieChartId: string;
  placeholder: string;
  values: string[];
};

type PieChartCardBodyProps = {
  totalDonation: number;
  topDonationAmt: number;
  topDonorName: string;
  topDonationDate: Date;
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
  campaignName,
}: PieChartCardProps) {
  const campaignData = MOCK_CAMPAIGNS_DATA.filter(
    (campaign) => campaign.campaignName == campaignName
  )[0]; // Probably using campaignId for actual

  return (
    <div className="bg-white shadow rounded flex flex-col gap-4 p-8 m-2">
      <PieChartCardHeader
        pieChartId={pieChartId}
        selectorPlaceholder={campaignName}
        selectorValues={ALL_CAMPAIGNS_NAME}
        startDate={campaignData.data.startDate}
        endDate={campaignData.data.endDate}
        daysLeft={campaignData.data.daysLeft}
      />
      <PieChartCardBody
        totalDonation={campaignData.data.totalDonation}
        topDonationAmt={campaignData.data.topDonor.donationAmt}
        topDonorName={campaignData.data.topDonor.donorName}
        topDonationDate={campaignData.data.topDonor.date}
      />
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
}: PieChartCardHeaderProps) {
  return (
    <div className="flex justify-between items-center">
      <CardSelector
        pieChartId={pieChartId}
        placeholder={selectorPlaceholder}
        values={selectorValues}
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

function CardSelector({ pieChartId, placeholder, values }: CardSelectorProps) {
  const { setPieChartCampaignOne, setPieChartCampaignTwo } =
    useAnalyticsStore();
  return (
    <Select
      onValueChange={
        pieChartId === "1" ? setPieChartCampaignOne : setPieChartCampaignTwo
      }
    >
      <SelectTrigger className="w-[177px] h-[45px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {values.map((val, i) => {
          return (
            <SelectItem value={val} key={i}>
              {capitalizeFirstLetter(val)}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}

function PieChartCardBody({
  totalDonation,
  topDonationAmt,
  topDonorName,
  topDonationDate,
}: PieChartCardBodyProps) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex flex-col gap-2">
        <div>
          <p>Total Donated</p>
          <b>$ {totalDonation}</b>
        </div>
        <hr />
        <div>
          <p>Highest Amount</p>
          <b>$ {topDonationAmt}</b>
        </div>
        <div className="text-xs">
          <p>From: {topDonorName}</p>
          <p>
            Date:{" "}
            <span className="underline">
              {ddmmyyyyFormatter(topDonationDate)}
            </span>
          </p>
        </div>
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
