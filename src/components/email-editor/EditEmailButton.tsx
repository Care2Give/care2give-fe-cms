import { Button } from "@/components/ui/button";
import useRouteHandler from "@/lib/useRouteHandler";
import useEmailEditorStore from "@/stores/useEmailEditorStore";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose, DialogDescription } from "@radix-ui/react-dialog";

export default function EditEmailButton({
  handleSubmitEmail,
}: {
  handleSubmitEmail: () => Promise<void>;
}) {
  const { isEditing, setIsEditing } = useEmailEditorStore();

  const {
    navigate,
    routeAwayUrl,
    routeAwayConfirmationOpen,
    setRouteAwayConfirmationOpen,
  } = useRouteHandler();

  return (
    <>
      <Dialog
        open={routeAwayConfirmationOpen}
        onOpenChange={setRouteAwayConfirmationOpen}
      >
        <DialogContent className="py-14 px-10 gap-8">
          <DialogHeader>
            <DialogTitle className="text-center">
              You have unsaved changes!
            </DialogTitle>
            <DialogDescription className="text-center">
              Are you sure you want to leave this page?
            </DialogDescription>
          </DialogHeader>
          <DialogTitle className="text-center">
            Changes you have made will not be saved.
          </DialogTitle>
          <DialogFooter className="min-w-full sm:justify-center gap-16">
            <DialogClose asChild>
              <Button className="w-32 bg-white text-black hover:bg-gray-500 border-gray-300 border-2 border-solid rounded">
                Cancel
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                type="button"
                className="w-32 bg-blue-500 hover:bg-blue-800"
                onClick={() => {
                  setIsEditing(false);
                  navigate(routeAwayUrl);
                }}
              >
                Confirm
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {isEditing ? (
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-white border-gray-300 border-2 border-solid rounded text-sm text-black hover:bg-[#ffefe0]">
              Publish
            </Button>
          </DialogTrigger>
          <DialogContent className="py-14 px-10 gap-8">
            <DialogHeader>
              <DialogTitle className="text-center">
                Would you like to publish the edited email?
              </DialogTitle>
            </DialogHeader>
            <DialogFooter className="min-w-full sm:justify-center gap-16">
              <DialogClose asChild>
                <Button className="w-32 bg-white text-black hover:bg-gray-500 border-gray-300 border-2 border-solid rounded">
                  Cancel
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button
                  type="button"
                  className="w-32 bg-blue-500 hover:bg-blue-800"
                  onClick={handleSubmitEmail}
                >
                  Confirm
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ) : (
        <Button
          className="bg-blue-500 rounded text-sm text-white hover:bg-blue-700"
          onClick={() => setIsEditing(true)}
        >
          Edit Email
        </Button>
      )}
    </>
  );
}
