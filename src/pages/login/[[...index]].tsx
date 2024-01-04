import { SignIn } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";
import LoginImg from "../../../public/login/login-img.svg";
import LoginBg from "../../../public/login/login-bg-wave.svg";

export default function Login() {
  return (
    <div className="flex flex-col bg-[#FFEFE0] min-h-screen">
      <Image
        src={LoginBg}
        alt="login-vector-bg"
        className="absolute bottom-0 z-0 w-full"
        priority
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 my-auto sm:mx-20 justify-items-center">
        <div className="flex items-center justify-center z-10">
          <div className="w-3/5 sm:w-3/4 max-w-sm pt-10 sm:pt-0">
            <Image src={LoginImg} alt="login-img" priority />
          </div>
        </div>
        <SignIn path="/login" afterSignInUrl="/" />
      </div>
    </div>
  );
}
