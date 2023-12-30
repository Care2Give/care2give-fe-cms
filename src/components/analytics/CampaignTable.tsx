import { ArrowUp, ArrowDown } from "lucide-react";
import { Montserrat } from "next/font/google";

type CampaignTableProps = {
  campaign: string;
  amount: number;
  trend: boolean;
};

const montserrat = Montserrat({
  subsets: ["latin"],
  style: ["normal"],
  weight: ["400"],
});

export default function CampaignTable(data: CampaignTableProps[]) {
  const dataArray = Object.values(data);
  return (
    <div className="w-full">
      <div className="flex mb-3">
        <div className={`${montserrat.className} text-grey-500 text-xs w-7/12`}>
          Campaign
        </div>
        <div
          className={`${montserrat.className} text-grey-500 text-xs text-center w-3/12`}
        >
          Amount
        </div>
        <div
          className={`${montserrat.className} text-grey-500 text-xs text-center w-2/12`}
        >
          Trend
        </div>
      </div>
      {dataArray.map((item, idx) => (
        <div>
          <div key={idx} className="flex items-center">
            <div className={`${montserrat.className} text-xs w-1/12`}>{`${
              idx + 1
            }.`}</div>
            <div className={`${montserrat.className} text-xs w-6/12`}>
              {item.campaign}
            </div>
            <div
              className={`${montserrat.className} text-xs text-center w-3/12`}
            >
              ${item.amount}
            </div>
            <div
              className={`${montserrat.className} text-xs flex justify-center w-2/12`}
            >
              {item.trend ? (
                <ArrowUp className="text-green-500" />
              ) : (
                <ArrowDown className="text-red-500" />
              )}
            </div>
          </div>
          <div className="h-px bg-[#D9D9D9] mt-3 mb-1"></div>
        </div>
      ))}
    </div>
  );
}
