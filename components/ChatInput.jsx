"use client"
import useSWR from "swr"
import { db } from '@/firebase';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import useSpeechRecognition from '../hooks/useSpeechRecognitionHook'
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import Main from './Main'

function ChatInput({ chatId }) {
  const { data: model, mutate: setModel } = useSWR('model', {
    fallbackData:'gpt-3.5-turbo'
  });
   const {text,setText} = useSpeechRecognition();
  const [prompt,setPrompt] = useState();

  const { data: session } = useSession()
  
// use swr for models
  const sendMessage = async (e)=>{
    e.preventDefault();
  
    if (!prompt ){
      if (!text)
      return;
      };
    
    const input = prompt?.trim() || text;
    setPrompt("");
    setText("");
    const message = {
      text:input,
      createdAt: serverTimestamp(),
      user:{
        _id:session.user.email,
        name:session.user.name,
        avatar:session.user.image || `https://ui-avatars.com/api/?name=${session.user.name}`
      }
    }

    await addDoc(
      collection(db,"users",session?.user?.email,"chats",chatId,"messages"),
      message
      )
      // toast notify loading...
      const notification = toast.loading("TalkGpt is thinking...")

      await fetch("/api/askQuestion",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          prompt:input,
           chatId,
           model,
           session,
        }),
      }).then(()=>{
        // toast success
        toast.success("TalkGpt has responded!",{
          id:notification,
        })
      })
    // console.log(input)
  }
  return (
    <div className="bg-gray-700/30 text-gray-400 rounded-lg text-sm ring-none shadow-sm shadow-black">
    
      <form 
        onSubmit={(e) => { e.preventDefault() }}
      className='p-5 space-x-5 flex'>
        <input
        disabled={!session}
        className='focus:outline-none bg-transparent flex-1 disabled:cursor-not-allowed disabled:text-gray-300'
          value={prompt }
        onChange={(e)=>setPrompt(e.target.value)} 
        type="text"
        placeholder="Type your text here..."
        />
         <Main/>
        <button 
         onClick={sendMessage}
        disabled={!session}
        className="bg-[#0367a6] hover:opacity-50 text-white font-bold px-4 rounded py-2 disabled:cursor-not-allowed disabled:text-gray-300"
        type='submit'>
          <PaperAirplaneIcon
          className='h-4 w-4 -rotate-45' 
          />
        </button>
      </form>
      <div>
        {/* model selection */}
      </div>
    </div>
  )
}

export default ChatInput