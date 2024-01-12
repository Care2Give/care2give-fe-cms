import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/router";
import { useUser } from "@clerk/nextjs";

import HomeIcon from "../../../public/icons/home.svg";
import BarChartIcon from "../../../public/icons/bar-chart-3.svg";
import GridIcon from "../../../public/icons/grid.svg";
import FileHeartIcon from "../../../public/icons/file-heart.svg";
import MailIcon from "../../../public/icons/mail.svg";
import UsersIcon from "../../../public/icons/users.svg";
import CornerDownRightIcon from "../../../public/icons/corner-down-right.svg";
import Logo from "../../../public/logo.png";
import { capitalizeFirstLetter, cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import { UserResource } from "@clerk/types";

export default function SideBar() {
  const { user } = useUser();
  const role = user?.publicMetadata.role;

  const ArchiveMenuButtons = [
    <SideBarButton
      key="archive-donations-button"
      icon={CornerDownRightIcon}
      text="Donations"
      link="/archive/donations"
      isSmall
    />,
    <SideBarButton
      key="archive-campaigns-button"
      icon={CornerDownRightIcon}
      text="Campaigns"
      link="/archive/campaigns"
      isSmall
    />,
  ];

  if (!user) return null;

  return (
    <div className="flex flex-col items-center justify-between bg-white min-w-44 h-screen fixed z-50">
      <div className="flex flex-col items-start bg-white min-w-44 h-screen">
        <Image
          src={Logo}
          alt="Caregivers Alliance Logo"
          height={50}
          width={50}
          className="mt-10 mb-6 self-center"
          priority
        />
        <SideBarButton icon={HomeIcon} text="Home" link="/" />
        <SideBarButton icon={BarChartIcon} text="Analytics" link="/analytics" />
        {(role === "superuser" || role === "donation-manager") && (
          <SideBarButton icon={GridIcon} text="Donations" link="/donations" />
        )}
        <SideBarButton
          icon={FileHeartIcon}
          text="Campaigns"
          link="/campaigns"
        />
        <SideBarDivider />
        {(role === "superuser" || role === "donation-manager") && (
          <>
            <SideBarButton
              icon={MailIcon}
              text="Email Editor"
              link="/email-editor"
            />
            {role === "superuser" && (
              <SideBarButton
                icon={UsersIcon}
                text="Admin Controls"
                link="/admin-controls"
              />
            )}
            <SideBarDivider />
          </>
        )}
        <div className="flex flex-col gap-1 mt-2 ml-3">
          <span className="w-full text-left px-5 text-xs font-semibold">
            Archive
          </span>
          <div>{...ArchiveMenuButtons}</div>
        </div>
      </div>
      <div className="w-full flex flex-col gap-2">
        {/* temporarily removing the logout button */}
        {/* <Logout /> */}
        <SideBarProfile user={user} />
      </div>
    </div>
  );
}

function SideBarButton({
  icon,
  text,
  link,
  isSmall = false,
}: {
  icon: string;
  text: string;
  link: string;
  isSmall?: boolean;
}) {
  const router = useRouter();
  const firstLevelPath = "/" + router.pathname.split("/")[1];

  return (
    <div className="py-1 px-3 w-full">
      <Button
        onClick={() => router.push(link)}
        className={cn(
          "w-full bg-white flex justify-start hover:bg-[#ffefe0] gap-4 cursor-pointer",
          { "bg-[#ffefe0]": link === firstLevelPath },
          { "h-5 pl-3 pr-8": isSmall }
        )}
      >
        <span>
          <Image
            src={icon}
            alt={text + " icon"}
            width={isSmall ? 12 : 24}
            height={isSmall ? 12 : 24}
          />
        </span>
        <span
          className={cn("text-black whitespace-normal text-left", {
            "text-xs": isSmall,
          })}
        >
          {text}
        </span>
      </Button>
    </div>
  );
}

function SideBarDivider() {
  return (
    <hr className="h-1 w-32 border-t-2 border-gray-200 border-solid rounded self-center	" />
  );
}

function SideBarProfile({ user }: { user: UserResource }) {
  const { firstName, lastName, publicMetadata } = user;
  const role = capitalizeFirstLetter(
    (publicMetadata.role as string)?.replace("-", " ") || ""
  );

  return (
    <div className="flex justify-center items-center gap-4 p-3 bg-gray-300">
      <UserButton
        afterSignOutUrl="/login"
        appearance={{
          elements: {
            "cl-userButtonPopoverActionButton__signOut": {
              display: "hidden",
              backgroundColor: "red",
            },
          },
        }}
      />
      <span className="flex flex-col">
        <span className="font-bold">
          {firstName || ""} {lastName || ""}
        </span>
        <span className="text-xs font-light">{role}</span>
      </span>
    </div>
  );
}
