import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LogOutIcon } from "lucide-react";
import { useRouter } from "next/router";
import useAuthStore from "@/stores/useAuthStore";
import { useToast } from "@/components/ui/use-toast";

export default function Logout() {
  const router = useRouter();
  const { toggleLoggedIn } = useAuthStore();
  const { toast } = useToast();

  return (
    <Dialog>
      <DialogContent className="flex flex-col justify-center items-center gap-8">
        <DialogHeader className="flex flex-col justify-center items-center gap-2">
          <DialogTitle>Logout</DialogTitle>
          <DialogDescription>
            Are you sure you want to logout?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex gap-12">
          <DialogClose asChild>
            <Button
              type="button"
              variant="outline"
              className="w-32 bg-white text-black hover:bg-gray-500 border-gray-300 border-2 border-solid rounded"
            >
              Close
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              type="button"
              className="w-32 bg-blue-500 hover:bg-blue-800"
              onClick={() => {
                toggleLoggedIn();
                router.push("/login");
                toast({
                  title: "You have been logged out successfully.",
                });
              }}
            >
              Confirm
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
      <DialogTrigger asChild>
        <Button className="bg-white flex justify-start items-center hover:bg-[#ffefe0] gap-4 mx-3">
          <LogOutIcon color="black" />
          <span className="text-black whitespace-normal text-left">Logout</span>
        </Button>
      </DialogTrigger>
    </Dialog>
  );
}
