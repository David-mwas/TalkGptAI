'use client'
import { ArrowDownCircleIcon } from "@heroicons/react/24/outline"
import {signIn} from "next-auth/react"
import Image from 'next/image'
function Login() {
// 
  return (
    <div className="bg-black h-screen flex flex-col items-center justify-center">
        <Image
        src="/model.png" 
        width={300}  
        height={300}  
        alt='logo'
        className="animate-pulse rounded-full"
      />
      <p className="text-white mb-3 uppercase">Wanna join the fun, sign in first </p>
       <ArrowDownCircleIcon className='h-7 w-7 mx-auto mt-2 text-white animate-bounce'/>
         <button className="font-bold text-xl text-white border border-white p-3 rounded-xl mt-4 bg-[#141e30] uppercase"
         onClick={()=>signIn('google')}
         >Sign In To Use TalkGpt</button>
    </div>
  )
}

export default Login