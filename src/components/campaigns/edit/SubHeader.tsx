import {arabotoBold} from "@/lib/font";
import {Montserrat} from "next/font/google";
import BreadCrumbs, {Crumb} from "@/components/ui/breadcrumbs";
import { EditStage, editStageOrdering, getDisplay } from "@/pages/campaigns/edit/edit-stage"

const montserrat = Montserrat({
    subsets: ["latin"],
    style: ["normal"],
    weight: ["700"],
});

export default function SubHeader({editStage, setEditStage}: {
    editStage: EditStage,
    setEditStage: (EditStage) => void,
}) {
    const crumbs = editStageOrdering.map((curEditStage: EditStage) => {
        return ({
            display: getDisplay(curEditStage),
            onClick: () => setEditStage(curEditStage)
        });
    })

    return (
        <div className="flex justify-between items-center px-2">
            <div>
                <p className={`${arabotoBold.className} text-2xl`}>New Campaign</p>
            </div>
            <div>
                <BreadCrumbs allCrumbs={crumbs} currentCrumbIndex={editStage} separator={">"}/>
            </div>
        </div>
    );
}
