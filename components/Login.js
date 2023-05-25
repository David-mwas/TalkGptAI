'use client'
import svg from "../app/favicon.ico"
import {signIn} from "next-auth/react"
import Image from 'next/image'
function Login() {
// 
  return (
    <div className="bg-black h-screen flex flex-col items-center justify-center">
        <Image
        src={svg} 
        width={300}  
        height={300}  
        alt='logo'
        className="animate-spin"
         />
         <button className="font-bold text-xl animate-pulse text-white border border-white p-3 rounded-xl"
         onClick={()=>signIn('google')}
         >Sign In To Use TalkGpt</button>
    </div>
  )
}

export default Login