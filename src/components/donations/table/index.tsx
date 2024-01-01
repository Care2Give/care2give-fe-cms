import { Button } from "@/components/ui/button";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import data from "./MOCK_DATA";
import { useRef } from "react";
import Link from "next/link";

export default function Table() {
  const tableRef = useRef(null);
  return (
    <div className="container mx-auto">
      <DataTable columns={columns} data={data} innerRef={tableRef} />
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
