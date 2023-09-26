"use client";
import useTypingEffect from "@/hooks/useTypingEffect";
import { ArrowDownCircleIcon } from "@heroicons/react/24/outline";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { FaGooglePlusG } from "react-icons/fa";
function Login() {
  return (
    <div className="bg-black h-screen flex flex-col items-center justify-center">
      <Image
        src="/model.png"
        width={300}
        height={300}
        alt="logo"
        className="animate-pulse rounded-full"
      />
      <p className="text-white mb-3 uppercase">
        {useTypingEffect("Wanna join the fun, sign in first!!", 10)}{" "}
      </p>
      <ArrowDownCircleIcon className="h-7 w-7 mx-auto mt-2 text-white animate-bounce" />
      <button
        className="flex align-middle justify-center items-center px-8 gap-2 font-bold text-xl text-white border border-white p-3 rounded-xl mt-4 bg-[#141e30] uppercase"
        onClick={() => signIn("google")}
      >
        <span>
          <FaGooglePlusG className="h-8 w-8 text-white" />
        </span>
        <span>Sign In</span>
      </button>
    </div>
  );
}

export default Login;
