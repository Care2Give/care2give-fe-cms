import Image from "next/image";
import React from "react";
import LoginImg from "../../public/login/login-img.svg";
import LoginBg from "../../public/login/login-bg-wave.svg";
import LoginForm from "@/components/LoginForm";

export default function Login() {
  return (
    <div className="flex flex-col bg-[#96CDFF] min-h-screen ">
      <Image
        src={LoginBg}
        alt="login-vector-bg"
        className="absolute bottom-0 z-0"
      />
      <div className="grid grid-cols-2 my-auto mx-20">
        <div className="flex items-center justify-center z-10">
          <div className="w-3/4 max-w-sm">
            <Image src={LoginImg} alt="login-img" />
          </div>
        </div>
        <div className="z-10">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
