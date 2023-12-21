import SideBar from "@/components/sidebar";

export default function Layout({ children }) {
    return (
        <>
            <SideBar />
            <main>{children}</main>
        </>
    );
}
