'use client'
import { useRef, useState,useEffect } from "react";
import { FaCopy, FaVolumeUp } from "react-icons/fa";
import { useSpeechSynthesis } from "react-speech-kit";

function Message({ message }) {
    const { speak,speaking,voices,cancel } = useSpeechSynthesis();
    const [copied,setCopied] = useState(false);
    const divRef = useRef(null);
    const isChatGPT = message.user.name === "ChatGPT";
    
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
   
   useEffect(() => {
       setTimeout(()=>{

           if (copied){
            setCopied(false)
           }
       },1000);
  
   }, [copied]) 
    
    const handleSpeek = () => {
        
        if (isChatGPT) {
            if (!speaking) {
               speak({text:message.text, voice:voices[4]}); 
            }
        }
       
        
    }
    const handleCancelSpeek = () => {
        
        if (isChatGPT) {
            if (speaking) {
               cancel(); 
            }
        }
       
        
    }

    return (
        <div className={`w-[100%] relative py-5 px-1 rounded-lg text-white ${isChatGPT && "bg-gray-700/50 md:max-w-[80%]"}`} ref={isChatGPT ? divRef : null}>
        <div className="flex space-x-5 px-10 max-w-2xl mx-auto relative" >
            <img src={message.user.avatar} alt="" className={`h-12 w-12 rounded-xl shadow-lg shadow-black object-cover ${isChatGPT && speaking && "shadow-xl shadow-green-400"}`}/>
           <div  className=" flex flex-row-reverse items-start space-x-4 gap-3 justify-between " >
           
               {isChatGPT && <button onClick={handleCopyClick} className="absolute text-[12px] md:text-sm right-2 md:right-[-20px] top-[-11px]">
                        {copied ? <span className="text-[#0367a6] font-bold">copied!</span> : <FaCopy className="h-5 w-5  text-gray-400 align-top text-end hover:opacity-75" />}
                        
                    </button>
                    }
                    {isChatGPT && <button onClick={()=>{handleSpeek()}}
                        className="absolute text-[12px] md:text-sm right-2 md:right-[-20px] bottom-[3px]">

                        <FaVolumeUp
                            onClick={() => speaking ? handleCancelSpeek() : null}
                            className={`h-5 w-5  text-gray-400 align-top text-end hover:opacity-75  ${speaking && "text-green-500"}`} />
                        </button>}
                       <p className="pt-1 text-sm text-gray-300 ">
           {message.text}
               </p>
           </div>
        </div>
        </div>
    )
} 

export default Message