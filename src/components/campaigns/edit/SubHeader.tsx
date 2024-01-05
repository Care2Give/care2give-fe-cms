import { arabotoBold } from "@/lib/font";
import { Montserrat } from "next/font/google";
import BreadCrumbs from "@/components/ui/breadcrumbs";

const montserrat = Montserrat({
    subsets: ["latin"],
    style: ["normal"],
    weight: ["700"],
});

export default function SubHeader() {
    const crumbs = [
        {display: "Edit", link: "edit"},
        {display: "Preview", link: "preview"},
        {display: "Publish", link: "publish"}
    ];
    return (
        <div className="flex justify-between items-center px-2">
            <div>
                <p className={`${arabotoBold.className} text-2xl`}>New Campaign</p>
            </div>
            <div>
                <BreadCrumbs allCrumbs={crumbs} currentCrumb={{display: "Edit", link: "edit"}} separator={">"}/>
            </div>
        </div>
    );
}
