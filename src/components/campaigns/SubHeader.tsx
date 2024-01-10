import { PlusIcon } from "lucide-react";
import { Button } from "../ui/button";
import { arabotoBold } from "@/lib/font";
import { Montserrat } from "next/font/google";
import {useRouter} from "next/router";

const montserrat = Montserrat({
  subsets: ["latin"],
  style: ["normal"],
  weight: ["700"],
});

export default function SubHeader() {
    const router = useRouter();

    return (
    <div className="flex justify-between items-center px-2">
      <div>
        <p className={`${arabotoBold.className} text-2xl`}>Your campaigns</p>
      </div>
      <div>
        <Button className="bg-[#5185FF] hover:bg-[#3872FC] flex items-center pl-3"
                onClick={() => router.push("campaigns/edit")}
        >
          <PlusIcon className="h-4" />
          <div>
            <span className={`${montserrat.className}`}>Create campaign</span>
          </div>
        </Button>
      </div>
    </div>
    );
}
