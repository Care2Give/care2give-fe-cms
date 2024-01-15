import MultiSelect from "@/components/shared/MultiSelect";
import Layout from "@/components/layout";
import DatePicker from "@/components/home/DatePicker";
import useDonationStore from "@/stores/useDonationStore";
import { Button } from "@/components/ui/button";
import Header from "@/components/donations/Header";
import useClerkSWR from "@/lib/useClerkSWR";
import { convertTitleToValueAndLabel } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

export type CampaignInput = {
  value: string;
  label: string;
};

export default function ExportData() {
  const {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    campaignsToExport,
    setCampaignsToExport,
  } = useDonationStore();
  const { data, error } = useClerkSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/v1/cms/donations/campaigns`
  );

  const handleExportData = async () => {
    // TODO: Integrate BE endpoint to export data
    // const res = await fetch(
    //   `${process.env.NEXT_PUBLIC_API_URL}/v1/cms/donations/export`,
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       startDate,
    //       endDate,
    //       campaigns: campaignsToExport,
    //     }),
    //   }
    // );
    return;
  };

  if (error) return null;

  return (
    <Layout>
      <Header isExportData />
      <div className="flex flex-col gap-2">
        <p className="text-xl font-bold">Campaign:</p>
        {data ? (
          <MultiSelect
            data={convertTitleToValueAndLabel(data)}
            selected={campaignsToExport}
            setSelected={setCampaignsToExport}
          />
        ) : (
          <Skeleton className="h-8 w-full rounded-lg" />
        )}
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-xl font-bold">Date Range:</p>
        <div className="flex gap-8">
          <DatePicker date={startDate} setDate={setStartDate} />
          <DatePicker date={endDate} setDate={setEndDate} />
        </div>
      </div>
      <div className="flex justify-end">
        <Button
          className="bg-blue-500 hover:bg-blue-600 text-lg"
          onClick={handleExportData}
        >
          Export Data
        </Button>
      </div>
    </Layout>
  );
}
