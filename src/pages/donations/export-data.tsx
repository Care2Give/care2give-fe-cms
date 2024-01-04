import MultiSelect from "@/components/shared/MultiSelect";
import Layout from "@/components/layout";
import DatePicker from "@/components/home/DatePicker";
import useDonationStore from "@/stores/useDonationStore";
import { Button } from "@/components/ui/button";
import Header from "@/components/donations/Header";

export default function ExportData() {
  const { startDate, setStartDate, endDate, setEndDate } = useDonationStore();

  return (
    <Layout>
      <Header isExportData />
      <div className="flex flex-col gap-2">
        <p className="text-xl font-bold">Campaign:</p>
        <MultiSelect />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-xl font-bold">Date Range:</p>
        <div className="flex gap-8">
          <DatePicker date={startDate} setDate={setStartDate} />
          <DatePicker date={endDate} setDate={setEndDate} />
        </div>
      </div>
      <div className="flex justify-end">
        <Button className="bg-blue-500 hover:bg-blue-700 text-lg">
          Export Data
        </Button>
      </div>
    </Layout>
  );
}
