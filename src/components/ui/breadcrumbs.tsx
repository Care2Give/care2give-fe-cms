import { arabotoBold } from "@/lib/font";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {Button} from "@/components/ui/button";


export interface Crumb {
    display: string;
    onClick: () => void;
}

export default function BreadCrumbs({allCrumbs, currentCrumbIndex, separator}:
    {allCrumbs: Crumb[], currentCrumbIndex: number, separator: string}) {
    return (
        <span>
            {allCrumbs.map((crumb, index) => {
                return (
                <span key={crumb.display}>
                    {index != 0 && <span>{separator}</span>}
                    <Button variant="link"
                            onClick={crumb.onClick}
                          className={cn("p-0", {[`${arabotoBold.className}`]: index === currentCrumbIndex})}>
                        {crumb.display}
                    </Button>
                </span>);
            })}
        </span>
    );
}
