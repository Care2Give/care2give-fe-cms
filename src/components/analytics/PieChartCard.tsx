import {
  capitalizeFirstLetter,
  joinBlankspacedStringLowercased,
} from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { PieChart } from "react-minimal-pie-chart";

type PieChartCardProps = {
  campaignName: string;
};

type PieChartCardHeaderProps = {
  selectorPlaceholder: string;
  selectorValues: string[];
  startDate: Date;
  endDate: Date;
};

type CardSelectorProps = {
  placeholder: string;
  values: string[];
};

type PieChartCardBodyProps = {
  totalDonation: number;
  topDonationAmt: number;
  topDonorName: string;
  topDonationDate: Date;
  topDonorId: string;
};

const MOCK_CAMPAIGNS_DATA = [
  {
    campaignName: "Charity Dinner 2020",
    data: {
      startDate: new Date("2020-01-01"),
      endDate: new Date("2020-03-31"),
      totalDonation: 12000.45,
      topDonor: {
        donationAmt: 300,
        donorId: "343950350",
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
      totalDonation: 10023.5,
      topDonor: {
        donationAmt: 80,
        donorId: "344340350",
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
      totalDonation: 9503.5,
      topDonor: {
        donationAmt: 240,
        donorId: "344340351",
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
      totalDonation: 14321.5,
      topDonor: {
        donationAmt: 530,
        donorId: "344340352",
        donorName: "Mrs. Fatimah",
        date: new Date("2020-02-05"),
      },
    },
  },
];
const MOCK_DAYS_LEFT = 45;
const ALL_CAMPAIGNS_NAME = MOCK_CAMPAIGNS_DATA.map(
  (campaign) => campaign.campaignName
);
const MOCK_PIECHART_DATA = [
  { title: "One", value: 10, color: "#1DCF9E" },
  { title: "Two", value: 15, color: "#C13C37" },
  { title: "Three", value: 20, color: "#6A2135" },
];

export default function PieChartCard({ campaignName }: PieChartCardProps) {
  const campaignData = MOCK_CAMPAIGNS_DATA.filter(
    (campaign) => campaign.campaignName == campaignName
  )[0]; // Probably using campaignId for actual

  return (
    <div className="bg-white shadow rounded flex flex-col justify-between p-8 m-2 gap-4">
      <PieChartCardHeader
        selectorPlaceholder={campaignName}
        selectorValues={ALL_CAMPAIGNS_NAME}
        startDate={campaignData.data.startDate}
        endDate={campaignData.data.endDate}
      />
      <PieChartCardBody
        totalDonation={campaignData.data.totalDonation}
        topDonationAmt={campaignData.data.topDonor.donationAmt}
        topDonorName={campaignData.data.topDonor.donorName}
        topDonationDate={campaignData.data.topDonor.date}
        topDonorId={campaignData.data.topDonor.donorId}
      />
    </div>
  );
}

function PieChartCardHeader({
  selectorPlaceholder,
  selectorValues,
  startDate,
  endDate,
}: PieChartCardHeaderProps) {
  return (
    <div className="flex justify-between items-center">
      <CardSelector placeholder={selectorPlaceholder} values={selectorValues} />
      <div className="text-right">
        <p>
          Days Left: <b>{MOCK_DAYS_LEFT}</b>
        </p>
        <p className="text-xs">
          Duration: {startDate.toLocaleDateString()} -{" "}
          {endDate.toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}

export function CardSelector({ placeholder, values }: CardSelectorProps) {
  return (
    <Select>
      <SelectTrigger className="w-[177px] h-[45px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {values.map((val, i) => {
          return (
            <SelectItem value={joinBlankspacedStringLowercased(val)} key={i}>
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
  topDonorId,
}: PieChartCardBodyProps) {
  return (
    <div className="flex justify-between items-center">
      <div>
        <div>
          <p>Total Donated</p>
          <b>$ {totalDonation}</b>
          <p>Highest Amount</p>
          <b>$ {topDonationAmt}</b>
          <div className="text-xs">
            <p>From: {topDonorName}</p>
            <p>
              Date:{" "}
              <span className="underline">
                {topDonationDate.toLocaleDateString()}
              </span>
            </p>
            <p>
              ID: <span className="underline">{topDonorId}</span>
            </p>
          </div>
        </div>
      </div>
      <div className="flex gap-6">
        <div className="h-24">
          <PieChart data={MOCK_PIECHART_DATA} />
        </div>
        <div className="h-24">
          <PieChart data={MOCK_PIECHART_DATA} />
        </div>
      </div>
    </div>
  );
}
