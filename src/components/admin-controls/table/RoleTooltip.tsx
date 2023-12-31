import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { InfoIcon } from "lucide-react";

export default function RoleTooltip() {
  return (
    <div className="font-bold text-black flex items-center gap-2">
      <span>Role</span>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <InfoIcon height={16} width={16} />
          </TooltipTrigger>
          <TooltipContent className="w-96 py-4 px-12">
            <div className="flex flex-col gap-2 font-normal">
              <p className="font-bold">
                Level of access for the different roles:
              </p>
              <p className="flex flex-col">
                <span>Superuser</span>
                <span>&#8226; Able to access all functions and data</span>
              </p>
              <p className="flex flex-col">
                <span>Donation manager</span>
                <span>
                  &#8226; Able to access all functions and data except for admin
                  control function
                </span>
              </p>
              <p className="flex flex-col">
                <span>Campaign manager</span>
                <span>
                  &#8226; Only able to access campaign catalogue, analytic
                  viewer and email editor
                </span>
                <span>
                  &#8226; Should not have access to donation viewer and admin
                  controls
                </span>
              </p>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
