import Body from "@/components/email-editor/Body";
import Header from "@/components/email-editor/Header";
import Subject from "@/components/email-editor/Subject";
import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import useRouteHandler from "@/lib/useRouteHandler";
import { Montserrat } from "next/font/google";
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

const montserrat = Montserrat({
  subsets: ["latin"],
  style: ["normal"],
  weight: ["400"],
});

export default function EmailEditor() {
  const { isEditing, setIsEditing, didSaveContent, setDidSaveContent } =
    useEmailEditorStore();

  const {
    navigate,
    routeAwayUrl,
    routeAwayConfirmationOpen,
    setRouteAwayConfirmationOpen,
  } = useRouteHandler({
    isEditing,
    setIsEditing,
    didSaveContent,
    setDidSaveContent,
  });

  return (
    <Layout>
      <Header />
      <div className="flex flex-col gap-6">
        <Subject />
        <Body />
      </div>
      <div
        className={`${montserrat.className} text-xs text-gray-500 flex justify-between items-center`}
      >
        <div>
          <p>Last Edited: 11/10/2023</p>
          <p>By: Song Jie</p>
        </div>
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
              <Button
                className="bg-white border-gray-300 border-2 border-solid rounded text-sm text-black hover:bg-[#ffefe0]"
                onClick={() => console.log(routeAwayConfirmationOpen)}
              >
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
                  <Button
                    className="w-32 bg-white text-black hover:bg-gray-500 border-gray-300 border-2 border-solid rounded"
                    onClick={() => {
                      setIsEditing(false);
                      setDidSaveContent(false);
                    }}
                  >
                    Cancel
                  </Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button
                    type="button"
                    className="w-32 bg-blue-500 hover:bg-blue-800"
                    onClick={() => {
                      setIsEditing(false);
                      setDidSaveContent(true);
                    }}
                  >
                    Confirm
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        ) : (
          <Button
            className="bg-white border-gray-300 border-2 border-solid rounded text-sm text-black hover:bg-[#ffefe0]"
            onClick={() => setIsEditing(true)}
          >
            Edit Email
          </Button>
        )}
      </div>
    </Layout>
  );
}
