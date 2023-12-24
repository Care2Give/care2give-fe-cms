import { columns } from "./columns";
import { DataTable } from "./data-table";
import data from "./MOCK_DATA";

export default function DemoPage() {
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
