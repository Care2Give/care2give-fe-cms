import SubHeader from "../SubHeader";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import data from "./MOCK_DATA";

export default function Table() {
  return (
    <div className="flex flex-col gap-8 mx-24">
      <SubHeader />
      <DataTable columns={columns} data={data} />
    </div>
  );
}
