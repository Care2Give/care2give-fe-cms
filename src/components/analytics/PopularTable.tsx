import { Montserrat } from "next/font/google";

type PopularTableProps = {
  campaign: string;
  amount: number;
  numberOfDonors: number;
};

const montserrat = Montserrat({
  subsets: ["latin"],
  style: ["normal"],
  weight: ["400"],
});

export default function PopularTable(data: PopularTableProps[]) {
  const dataArray = Object.values(data);
  return (
    <div className="w-full">
      <div className="flex mb-3">
        <div className={`${montserrat.className} text-grey-500 text-xs w-3/12`}>
          Amount
        </div>
        <div
          className={`${montserrat.className} text-grey-500 text-xs text-center w-7/12`}
        >
          Campaign
        </div>
        <div
          className={`${montserrat.className} text-grey-500 text-xs text-right w-2/12`}
        >
          No. of Donor
        </div>
      </div>
      {dataArray.map((item, idx) => (
        <div>
          <div key={idx} className="flex items-center">
            <div className={`${montserrat.className} text-xs w-3/12`}>
              ${item.amount}
            </div>
            <div className={`${montserrat.className} text-xs w-7/12`}>
              {item.campaign}
            </div>
            <div
              className={`${montserrat.className} text-xs flex justify-center w-2/12`}
            >
              {item.numberOfDonors}
            </div>
          </div>
          <div className="h-px bg-[#D9D9D9] mt-3 mb-1"></div>
        </div>
      ))}
    </div>
  );
}
