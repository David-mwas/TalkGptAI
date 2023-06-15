import React, { useState } from 'react'
import { FaMicrophone, FaMicrophoneSlash, } from "react-icons/fa";
import useSpeechRecognition from '../hooks/useSpeechRecognitionHook'
function Main() {
    const [toogle, setToogle] = useState(false);
    const {startListening, stopListening, hasRecognitionSupport,isListening } = useSpeechRecognition();
    const toggleClick = () => {
        setToogle(!toogle)
    }
  return (
      <div>
          {hasRecognitionSupport ? (
              <>
                  <div className="bg-[#0367a6] hover:opacity-50 text-white font-bold px-4 rounded py-2"  onClick={toggleClick}>
                      {!toogle ? (
                       <div>
                      <button className='' onClick={startListening}><FaMicrophoneSlash className='text-white h-6 w-6'/></button>
                  </div>
                      ): (
                       <div>
                      <button className='' onClick={stopListening}> <FaMicrophone  className={`text-white h-6 w-6  ${isListening && "animate-bounce"}`}/></button>
                  </div>   
                     )}
                  
                  </div>
                  {/* {isListening ? <div  className='mt-[50px]'>listening...</div>: null}
                  {text} */}
              </>
             
          ): (
                  <h1>Your browser has no speech recognition support</h1>
         )} 
    </div>
  )
}

export default Main