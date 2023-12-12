import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from "next/image";
import { useRouter } from 'next/navigation';

import styles from "./sidebar.module.css";

import HomeIcon from "../../public/icons/home.svg"
import BarChartIcon from "../../public/icons/bar-chart-3.svg"
import GridIcon from "../../public/icons/grid.svg"
import FileHeartIcon from "../../public/icons/file-heart.svg"
import MailIcon from "../../public/icons/mail.svg"
import UsersIcon from "../../public/icons/users.svg"
import LogOutIcon from "../../public/icons/log-out.svg"
import ArchiveIcon from "../../public/icons/archive.svg"
import CornerDownRightIcon from "../../public/icons/corner-down-right.svg"
import Logo from "../../public/logo.png"

export default function SideBar() {
    const ArchiveMenuButtons = [
        <SideBarButton key="archive-donations-button" icon={CornerDownRightIcon} text="Donations" link="/archive/donations"/>,
        <SideBarButton key="archive-campaigns-button" icon={CornerDownRightIcon} text="Campaigns" link="/archive/campaigns"/>,
    ];

    return (
    <div className={styles.SideBar}>
        <Image
            src={Logo}
            alt="Care To Give Logo"
        />
        <SideBarButton
            icon={HomeIcon}
            text="Home"
            link="/home"
        />
        <SideBarButton
            icon={BarChartIcon}
            text="Analytics"
            link="/analytics"
        />
        <SideBarButton
            icon={GridIcon}
            text="Donations"
            link="/donations"
        />
        <SideBarButton
            icon={FileHeartIcon}
            text="Campaigns"
            link="/campaigns"
        />
        <SideBarDivider />
        <SideBarButton
            icon={MailIcon}
            text="Email Editor"
            link="/editemail"
        />
        <SideBarButton
            icon={UsersIcon}
            text="Admin Control"
            link="/admin"
        />
        <SideBarDivider />
        <SideBarButton icon={ArchiveIcon} text={"Archive"} link={"/achive"} />
        <div>
            {...ArchiveMenuButtons}
        </div>
        <div className={styles.SideBarBottom}>
            <SideBarButton icon={LogOutIcon} text="Logout" link="/logout" />
            <SideBarProfile />
        </div>
    </div>)
}

function SideBarButton({icon, text, link}: {icon: string, text: string, link: string}) {
    const router = useRouter();

    return (
        <div className={styles.SideBarButtonWrapper}>
            <Button onClick={() => router.push(link)} className={styles.SideBarButton}>
                <>
                    <span className={styles.SideBarButtonIconWrapper}>
                       <Image
                           src={icon}
                           alt={text + " icon"}
                           width="10px"
                           height="10px"
                       />
                    </span>
                    <span className={styles.SideBarButtonText}>{text}</span>
                </>
            </Button>
        </div>
    );
}

function SideBarDivider() {
    return (
        <hr className={styles.SideBarDivider}/>
    );
}

function SideBarProfile() {
    // TODO: Change to function which gets user details
    const profileDetails = {
        username: "John Doe",
        usertype: "Super User",
        profilePicture: "https://variety.com/wp-content/uploads/2020/08/avatar-the-last-airbender-3.jpg?w=1000"
    }

    return (
        <div className={styles.SideBarProfile}>
            <Avatar>
                <AvatarImage src={profileDetails.profilePicture} />
                <AvatarFallback>{profileDetails.username}</AvatarFallback>
            </Avatar>
            <span>
                <span className={styles.SideBarProfileUserName}>{profileDetails.username}</span>
                <span className={styles.SideBarProfileUserType}>{profileDetails.usertype}</span>
            </span>
        </div>

    );
}
