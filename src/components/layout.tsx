import SideBar from "@/components/sidebar";
import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="flex">
      <SideBar />
      <main className="w-full">{children}</main>
    </div>
  );
}
