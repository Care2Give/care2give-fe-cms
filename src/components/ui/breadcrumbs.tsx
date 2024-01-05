import { arabotoBold } from "@/lib/font";
import { cn } from "@/lib/utils";
import Link from "next/link";


interface Crumb {
    display: string;
    link: string;
}

export default function BreadCrumbs({allCrumbs, currentCrumb, separator}:
    {allCrumbs: Crumb[], currentCrumb: Crumb, separator: string}) {
    return (
        <span>
            {allCrumbs.map((crumb, index) => {
                return (
                <span key={crumb.display}>
                    {index != 0 && <span>{separator}</span>}
                    <Link href={crumb.link}
                          className={cn({[`${arabotoBold.className}`]: crumb.link === currentCrumb.link})}>
                        {crumb.display}
                    </Link>
                </span>);
            })}
        </span>
    );
}
