"use client";
import React, { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase";
import Message from "./Message";
import { ArrowDownCircleIcon } from "@heroicons/react/24/outline";
import useTypingEffect from "@/hooks/useTypingEffect";

function Chat({ chatId }) {
  const text = useTypingEffect("type your prompt below!", 70);

  const messageEndRef = useRef(null);
  const { data: session } = useSession();
  const [messages] = useCollection(
    session &&
      query(
        collection(
          db,
          "users",
          session.user.email,
          "chats",
          chatId,
          "messages"
        ),
        orderBy("createdAt", "asc")
      )
  );

  useEffect(() => {
    messageEndRef.current?.scrollIntoView();
  }, [messages]);

  // setCurrentMassage("");

  return (
    <div className="flex flex-col scrollbar-container flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 overflow-x-hidden items-center">
      {messages?.empty && (
        <>
          <p className="mt-[55px] text-center text-white space-x-2">
            Hey 👋,{" "}
            <span className="text-[#0367a6] border-b-2 border-blue-600 font-bold text-sm tracking-wide ">
              {" "}
              {session.user?.name.toUpperCase()}
            </span>{" "}
            {text}
          </p>
          <p className="text-center text-[#0367a6] font-bold mt-3 mb-3">OR</p>
          <p className="text-center text-white">
            Hit the mic and talk to voice text TalkGpt, Once done hit send
            button to get results happy hacking !!
          </p>
          <ArrowDownCircleIcon className="h-10 w-10 mx-auto mt-5 text-[#0367a6] animate-bounce" />
        </>
      )}
      {messages?.docs.map((message) => (
        <Message key={message.id} message={message.data()} Id={message.id} />
      ))}
      <div ref={messageEndRef} />
    </div>
  );
}

export default Chat;
