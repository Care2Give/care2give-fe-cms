import { CampaignTable } from "@/types/campaigns/CampaignTable";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { ColumnDef } from "@tanstack/react-table";

export default function Table({ campaigns }: { campaigns: CampaignTable[] }) {
  return (
    <div className="flex flex-col gap-8 mx-4">
      <DataTable
        columns={columns as ColumnDef<CampaignTable, string>[]}
        data={campaigns}
      />
    </div>
  );
}
