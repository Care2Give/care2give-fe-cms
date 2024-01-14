import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  EditStage,
  getNextEditStage,
  getDisplay,
} from "@/components/campaigns/edit/edit-stage";
import { useRouter } from "next/router";

export default function Footer({ editStage }: { editStage: EditStage }) {
  const router = useRouter();
  // TODO change this to get actual time
  // const lastSaved: string = "1 min";

  return (
    <footer className="py-6 px-24 fixed bottom-0 left-48 w-11/12 z-20 bg-white border-t border-gray-200 shadow flex items-center justify-between">
      <span className="flex flex-wrap items-center text-sm text-gray-500 sm:text-center dark:text-gray-400">
        <CheckCircle2 />
        {/* <span className="px-2">Last saved {lastSaved} ago.</span> */}
      </span>
      <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
        <li className="px-2">
          <Button variant="ghost" onClick={() => router.push("/campaigns")}>
            Back
          </Button>
        </li>
        <li>
          <Button
            className="bg-[#5185FF] hover:bg-[#3872FC]"
            type="submit"
            form="edit-campaign-form"
          >
            {getDisplay(getNextEditStage(editStage))}
          </Button>
        </li>
      </ul>
    </footer>
  );
}
