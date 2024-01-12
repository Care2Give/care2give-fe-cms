import { Button } from "@/components/ui/button";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useRef } from "react";
import Link from "next/link";
import { DonationTable } from "@/types/donations/DonationTable";
import { ColumnDef } from "@tanstack/react-table";

export default function Table({ data }: { data: DonationTable[] }) {
  const tableRef = useRef(null);
  return (
    <div className="w-full">
      <DataTable
        columns={columns as ColumnDef<DonationTable, string>[]}
        data={data}
        innerRef={tableRef}
      />
      <div className="w-full flex justify-end mt-4">
        <Link href="/donations/export-data">
          <Button className="bg-blue-500 hover:bg-blue-700 text-lg">
            Export Data
          </Button>
        </Link>
      </div>
    </div>
  );
}
