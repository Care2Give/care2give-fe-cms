import SideBar from "@/components/sidebar";
import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="flex">
      <SideBar />
      <main className="ml-52 w-full">
        <div className="m-8 bg-[#fffcf9] rounded">
          <div className="p-8 flex flex-col gap-4">{children}</div>
        </div>
      </main>
    </div>
  );
}
