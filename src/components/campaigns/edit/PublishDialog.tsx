import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {useRouter} from "next/router";
import { EditStage } from "@/pages/campaigns/edit/edit-stage";

export function PublishDialog({setEditStage}) {
    const router = useRouter();

    // TODO add publish campaign function which pings BE
    return (
        <Dialog open={true}>
            <DialogContent className="sm:max-w-[430px]">
                <DialogHeader>
                    <DialogTitle>Would you like to publish the campaign?</DialogTitle>
                </DialogHeader>
                <div className="flex justify-around">
                    <Button onClick={() => setEditStage(EditStage.Edit)} variant="ghost" className="border">Cancel</Button>
                    <Button onClick={() => router.push("/campaigns")}>Confirm</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
