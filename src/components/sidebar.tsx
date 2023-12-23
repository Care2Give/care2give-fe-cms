import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { useRouter } from "next/navigation";

import HomeIcon from "../../public/icons/home.svg";
import BarChartIcon from "../../public/icons/bar-chart-3.svg";
import GridIcon from "../../public/icons/grid.svg";
import FileHeartIcon from "../../public/icons/file-heart.svg";
import MailIcon from "../../public/icons/mail.svg";
import UsersIcon from "../../public/icons/users.svg";
import LogOutIcon from "../../public/icons/log-out.svg";
import ArchiveIcon from "../../public/icons/archive.svg";
import CornerDownRightIcon from "../../public/icons/corner-down-right.svg";
import Logo from "../../public/logo.png";

export default function SideBar() {
  const ArchiveMenuButtons = [
    <SideBarButton
      key="archive-donations-button"
      icon={CornerDownRightIcon}
      text="Donations"
      link="/archive/donations"
    />,
    <SideBarButton
      key="archive-campaigns-button"
      icon={CornerDownRightIcon}
      text="Campaigns"
      link="/archive/campaigns"
    />,
  ];

  return (
    <div className="flex flex-col items-center bg-white w-44 h-screen">
      <Image
        src={Logo}
        alt="Caregivers Alliance Logo"
        height={50}
        width={50}
        className="mt-10 mb-6"
      />
      <SideBarButton icon={HomeIcon} text="Home" link="/" />
      <SideBarButton icon={BarChartIcon} text="Analytics" link="/analytics" />
      <SideBarButton icon={GridIcon} text="Donations" link="/donations" />
      <SideBarButton icon={FileHeartIcon} text="Campaigns" link="/campaigns" />
      <SideBarDivider />
      <SideBarButton
        icon={MailIcon}
        text="Email Editor"
        link="/email-editor
      "
      />
      <SideBarButton
        icon={UsersIcon}
        text="Admin Controls"
        link="/admin-controls"
      />
      <SideBarDivider />
      <SideBarButton icon={ArchiveIcon} text={"Archive"} link={"/archive"} />
      <div>{...ArchiveMenuButtons}</div>
      <div className="absolute bottom-0 w-44">
        <SideBarButton icon={LogOutIcon} text="Logout" link="/login" />
        <SideBarProfile />
      </div>
    </div>
  );
}

function SideBarButton({
  icon,
  text,
  link,
  className,
}: {
  icon: string;
  text: string;
  link: string;
  className?: string;
}) {
  const router = useRouter();

  return (
    <div className="py-1 px-3 w-full">
      <Button
        onClick={() => router.push(link)}
        className="w-full bg-white flex justify-start hover:bg-[#ffefe0] gap-4"
      >
        <span>
          <Image src={icon} alt={text + " icon"} width={24} height={24} />
        </span>
        <span className="text-black whitespace-normal text-left">{text}</span>
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
