import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { convertMsToMinutesSeconds } from "@/lib/utils";
import useAuthStore from "@/stores/useAuthStore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useIdleTimer } from "react-idle-timer";

export default function InactivityDialog() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [remaining, setRemaining] = useState<{
    minutes: number;
    seconds: number;
  }>({ minutes: 0, seconds: 0 });

  const router = useRouter();
  const { toggleLoggedIn } = useAuthStore();

  const onIdle = () => {
    handleLogout();
  };

  const onPrompt = () => {
    setIsOpen(true);
  };

  const handleLogout = () => {
    setIsOpen(false);
    toggleLoggedIn();
    router.push("/login");
  };

  const handleExtendSession = () => {
    activate();
    setIsOpen(false);
  };

  const { getRemainingTime, activate } = useIdleTimer({
    onIdle,
    onPrompt,
    timeout: 900_000,
    promptBeforeIdle: 300_000,
    throttle: 500,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      console.log(getRemainingTime(), remaining);
      setRemaining(convertMsToMinutesSeconds(Math.ceil(getRemainingTime())));
    }, 500);

    return () => {
      clearInterval(interval);
    };
  });

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader className="flex flex-col justify-center items-center">
          <AlertDialogTitle>Inactivity detected!</AlertDialogTitle>
          <AlertDialogDescription className="flex flex-col justify-center items-center">
            <span>Your online session will expire in</span>
            <span>
              {remaining.minutes} min {remaining.seconds} secs
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex w-full sm:justify-center items-center gap-8">
          <AlertDialogCancel
            onClick={handleLogout}
            className="bg-white hover:bg-[#ffefe0] font-light w-36"
          >
            Log out
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleExtendSession}
            className="bg-blue-500 hover:bg-blue-800 font-light w-36"
          >
            Extend my session
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
