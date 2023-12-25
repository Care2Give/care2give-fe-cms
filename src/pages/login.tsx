import Image from "next/image";
import React from "react";
import LoginImg from "../../public/login/login-img.svg";
import LoginBg from "../../public/login/login-bg-wave.svg";
import LoginForm from "@/components/LoginForm";
import useAuthStore from "@/stores/useAuthStore";
import { useRouter } from "next/router";
// import { UserButton } from "@clerk/nextjs";

export default function Login() {
  const { toggleLoggedIn } = useAuthStore();
  const router = useRouter();
  return (
    <div className="flex flex-col bg-[#FFEFE0] min-h-screen">
      {/* <UserButton afterSignOutUrl="/login" /> */}
      <Image
        src={LoginBg}
        alt="login-vector-bg"
        className="absolute bottom-0 z-0"
        priority
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 my-auto sm:mx-20">
        <div className="flex items-center justify-center z-10">
          <div className="w-3/5 sm:w-3/4 max-w-sm pt-10 sm:pt-0">
            <Image src={LoginImg} alt="login-img" priority />
          </div>
        </div>
        <div className="z-10">
          <LoginForm />
          <button
            onClick={() => {
              toggleLoggedIn();
              router.push("/");
            }}
          >
            Secret login button for dev
          </button>
        </div>
      </div>
    </div>
  );
}
