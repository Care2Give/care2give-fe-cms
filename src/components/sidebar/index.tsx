import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { useRouter } from "next/router";

import HomeIcon from "../../../public/icons/home.svg";
import BarChartIcon from "../../../public/icons/bar-chart-3.svg";
import GridIcon from "../../../public/icons/grid.svg";
import FileHeartIcon from "../../../public/icons/file-heart.svg";
import MailIcon from "../../../public/icons/mail.svg";
import UsersIcon from "../../../public/icons/users.svg";
import CornerDownRightIcon from "../../../public/icons/corner-down-right.svg";
import Logo from "../../../public/logo.png";
import clsx from "clsx";
import Logout from "./Logout";

export default function SideBar() {
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

  return (
    <div className="flex flex-col items-center justify-between bg-white min-w-44 h-screen fixed z-50">
      <div className="flex flex-col items-center bg-white min-w-44 h-screen">
        <Image
          src={Logo}
          alt="Caregivers Alliance Logo"
          height={50}
          width={50}
          className="mt-10 mb-6"
          priority
        />
        <SideBarButton icon={HomeIcon} text="Home" link="/" />
        <SideBarButton icon={BarChartIcon} text="Analytics" link="/analytics" />
        <SideBarButton icon={GridIcon} text="Donations" link="/donations" />
        <SideBarButton
          icon={FileHeartIcon}
          text="Campaigns"
          link="/campaigns"
        />
        <SideBarDivider />
        <SideBarButton
          icon={MailIcon}
          text="Email Editor"
          link="/email-editor"
        />
        <SideBarButton
          icon={UsersIcon}
          text="Admin Controls"
          link="/admin-controls"
        />
        <SideBarDivider />
        <div className="flex flex-col gap-1 mt-2">
          <span className="w-full text-left px-5 text-xs font-semibold">
            Archive
          </span>
          <div>{...ArchiveMenuButtons}</div>
        </div>
      </div>
      <div className="w-full flex flex-col gap-2">
        <Logout />
        <SideBarProfile />
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
        className={clsx(
          "w-full bg-white flex justify-start hover:bg-[#ffefe0] gap-4",
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
          className={clsx("text-black whitespace-normal text-left", {
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
    <hr className="h-1 w-32 border-t-2 border-gray-200 border-solid rounded" />
  );
}

function SideBarProfile() {
  // TODO: Change to function which gets user details
  const profileDetails = {
    username: "John Doe",
    usertype: "Super User",
    profilePicture:
      "https://variety.com/wp-content/uploads/2020/08/avatar-the-last-airbender-3.jpg?w=1000",
  };

  return (
    <div className="flex justify-center items-center gap-4 p-3 bg-gray-300">
      <Avatar>
        <AvatarImage src={profileDetails.profilePicture} />
        <AvatarFallback>{profileDetails.username}</AvatarFallback>
      </Avatar>
      <span className="flex flex-col">
        <span className="font-bold">{profileDetails.username}</span>
        <span className="text-xs font-light">{profileDetails.usertype}</span>
      </span>
    </div>
  );
}
