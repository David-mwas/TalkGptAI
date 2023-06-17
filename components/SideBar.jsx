"use client";
import { db } from "@/firebase";
import { collection, orderBy, query } from "firebase/firestore";
import { useSession, signOut } from "next-auth/react";
import React from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import ChatRow from "./ChatRow";
import NewChat from "./NewChat";
import { FaArrowCircleLeft, FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";
import ModelSelection from "./ModelSelection";

function SideBar() {
  const { data: session } = useSession();
  const [closed, setClosed] = useState(false);

  // fetch chats from firebase firestore
  const [chats, loading, error] = useCollection(
    session &&
      query(
        collection(db, "users", session.user.email, "chats"),
        orderBy("createdAt", "asc")
      )
  );

  return (
    <div
      className={`fixed transition-all duration-1000 ease-in-out ${
        closed ? "left-0" : "left-[-100%] "
      }  md:relative z-50 md:left-0  bg-gray-700 min-w-[15rem] md:max-w-[15rem]`}
    >
      <button
        onClick={() => {
          setClosed(!closed);
        }}
        className="md:hidden outline-none shadow-lg text-white hover:opacity-50  top-10 right-4 fixed z-50 transition-all duration-1000 ease-in-out animate-pulse bg-[#141e30]"
      >
        {!closed ? (
          <FaBars className="w-[40px] h-[40px] transition-all duration-1000 ease-in-out" />
        ) : (
          <FaTimes className="w-[40px] h-[40px] transition-all duration-1000 ease-in-out" />
        )}
      </button>
      <div className="flex flex-col  h-[100vh] p-2">
        <div className="flex-1">
          <div>

            {/* newchat */}

            <NewChat />

            <div className="inline">

              {/* model selection */}
              <ModelSelection/>

            </div>

            {loading && (
              <div className="animate-pulse text-center text-white">
                <p>Loading please...</p>
              </div>
            )}
            {/* map via chat rows */}
            {chats?.docs.map((chat) => (
              <ChatRow key={chat.id} id={chat.id} />
            ))}
          </div>
        </div>
        {session && (
          //https://lh3.googleusercontent.com/a/AGNmyxbQYWTSHXntFKiflGvMlZzlPx0b9jH3A9nob1-ccQ=s96-c
          <div className="flex flex-col space-y-5 pb-10 items-center">
            <img
              src={session.user?.image}
              alt={`${session.user?.name} google pic`}
              className="h-12 w-12 rounded-full cursor-pointer mx-auto mb-2 hover:opacity-50 shadow-lg shadow-black"
            />
            <p className="text-gray-400 text-sm">{session.user?.name}</p>
            <button
              className="flex gap-1 border border-[#141e30] bg-[#141e30] chatRow p-4 mb-4 hover:opacity-75 px-5"
              onClick={() => signOut()}
            >
              <FaArrowCircleLeft />
              <span className="uppercase "> Log Out</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SideBar;
