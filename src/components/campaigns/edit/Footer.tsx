import {CheckCircle2} from "lucide-react";
import {Button} from "@/components/ui/button";
import { EditStage, getNextEditStage, getDisplay, getPreviousEditStage } from "@/pages/campaigns/edit/edit-stage"

export default function Footer({editStage, setEditStage}: {
    editStage: EditStage,
    setEditStage: (EditStage) => void,
}) {
    // TODO change this to get actual time
    const lastSaved: string = "1 min";

    return (
    <footer className="fixed bottom-0 z-20 w-5/6 bg-white border-t border-gray-200 shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800 dark:border-gray-600">
        <span className="flex flex-wrap items-center text-sm text-gray-500 sm:text-center dark:text-gray-400">
            <CheckCircle2 /><span className="px-2">Last saved {lastSaved} ago.</span>
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
            <li className="px-2">
                <Button variant="ghost" onClick={() => setEditStage(getPreviousEditStage(editStage))}>Back</Button>
            </li>
            <li className="px-2">
                <Button className="bg-[#5185FF] hover:bg-[#3872FC]"
                        onClick={() => setEditStage(getNextEditStage(editStage))}>
                    {getDisplay(getNextEditStage(editStage))}
                </Button>
            </li>
        </ul>
    </footer>);
}
