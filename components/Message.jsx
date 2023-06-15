'use client'
import { useRef, useState,useEffect } from "react";
import { FaCopy } from "react-icons/fa";

function Message({message}){
    const [copied,setCopied]=useState(false);
    const divRef=useRef(null);
    const isChatGPT = message.user.name === "ChatGPT";
    // console.log(isChatGPT&&message.text)
    const handleCopyClick = () => {
        const textToCopy = divRef?.current.innerText;
        console.log(textToCopy)
        if(textToCopy){
           navigator.clipboard.writeText(textToCopy)
           .then(()=>{
            setCopied(true)
            
           })
            .catch((error)=>{
                console.error('copy failed', error)
            })
            
        
    };

      
       
   }
   setTimeout(()=>{setCopied(false),2000});
   
//    useEffect(() => {
//     let timeoutId;
//     if (copied){
//        timeoutId =  setTimeout(()=>{setCopied(false),2000});
//     }
  
//     return () => {
//       clearTimeout(timeoutId);

//     }
//   }, [copied])
    return (
        <div className={`py-5 text-white ${isChatGPT && "bg-[#434654]"}`} ref={isChatGPT ? divRef : null}>
        <div className="flex space-x-5 px-10 max-w-2xl mx-auto relative" >
            <img src={message.user.avatar} alt="" className="h-12 w-12 rounded-full object-cover"/>
           <div  className=" flex flex-row-reverse items-start space-x-4 gap-3 justify-between " >
           
               {isChatGPT && <button onClick={handleCopyClick} className="absolute right-1">
                       {copied ? 'copied!' : <FaCopy className="h-6 w-6 text-gray-800 align-top text-end hover:opacity-75"/>}</button>}
                       <p className="pt-1 text-sm">
           {message.text}
               </p>
           </div>
        </div>
        </div>
    )
} 

export default Message