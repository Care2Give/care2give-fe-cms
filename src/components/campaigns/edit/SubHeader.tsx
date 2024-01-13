import { arabotoBold } from "@/lib/font";
import BreadCrumbs from "@/components/ui/breadcrumbs";
import {
  EditStage,
  editStageOrdering,
  getDisplay,
} from "@/components/campaigns/edit/edit-stage";

export default function SubHeader({
  editStage,
  setEditStage,
}: {
  editStage: EditStage;
  setEditStage: (arg0: EditStage) => void;
}) {
  const crumbs = editStageOrdering.map((curEditStage: EditStage) => {
    return {
      display: getDisplay(curEditStage),
      onClick: () => setEditStage(curEditStage),
    };
  });

  return (
    <div className="flex justify-between items-center mx-2">
      <div>
        <p className={`${arabotoBold.className} text-2xl`}>New Campaign</p>
      </div>
      <div>
        <BreadCrumbs
          allCrumbs={crumbs}
          currentCrumbIndex={editStage}
          separator={">"}
        />
      </div>
    </div>
  );
}
