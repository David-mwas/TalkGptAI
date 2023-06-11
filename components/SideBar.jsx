"use client"
import { db } from '@/firebase';
import { collection, orderBy, query } from 'firebase/firestore';
import { useSession,signOut } from 'next-auth/react'
import React from 'react'
import { useCollection } from 'react-firebase-hooks/firestore';
import ChatRow from './ChatRow';
import NewChat from './NewChat'
import { FaBars, FaTimes } from 'react-icons/fa'
import { useState } from 'react'

function SideBar() {
  const { data: session } = useSession();
  const [closed, setClosed] = useState(false);
  const [chats, loading, error] = useCollection(
    session && query(
      collection(db, "users", session.user.email, "chats"),
      orderBy("createdAt", "asc")
    )
  )
  console.log(chats)
  return (

    <div className={`fixed transition-all duration-1000 ease-in-out ${closed ? "left-0":"left-[-100%] "}  md:relative z-50 md:left-0  bg-gray-700 `} >
       <button
                    onClick={()=>{setClosed(!closed)}}
        className='md:hidden outline-none shadow-lg text-[#0367a6] hover:opacity-50  top-10 right-4 fixed z-50 transition-all duration-1000 ease-in-out animate-pulse'>
        {!closed ? <FaBars className='w-[40px] h-[40px] transition-all duration-1000 ease-in-out'/> : <FaTimes className='w-[40px] h-[40px] transition-all duration-1000 ease-in-out'/>}
                    </button>
      <div className='flex flex-col  h-[100vh] p-2'>
        <div className="flex-1">
           <div>
            {/* newchat */}
            <NewChat/>
            <div>
                {/* model selection */}
            </div>
            {/* map via chat rows */}
            {chats?.docs.map(chat=>(
              <ChatRow key={chat.id} id={chat.id}/>
            ))}
            
           </div>
      </div>
        {session && (
          //https://lh3.googleusercontent.com/a/AGNmyxbQYWTSHXntFKiflGvMlZzlPx0b9jH3A9nob1-ccQ=s96-c
          <img 
          onClick={()=>signOut()}
          src={session.user?.image}
          alt={`${session.user?.name} google pic`}
          className='h-12 w-12 rounded-full cursor-pointer mx-auto mb-2 hover:opacity-50 shadow-lg shadow-gray-400'
          />
        )}
    </div>
    </div>
  )
}

export default SideBar