
import {BoltIcon, ExclamationTriangleIcon, SunIcon} from '@heroicons/react/24/outline'
import { FaGithub, FaMicrophoneAlt } from 'react-icons/fa'
export default function Home() {
  return (
    <div className='flex relative flex-col text-white  justify-center  md:h-screen  overflow-y-auto items-center '>
     
    <h1 className='text-5xl flex space-x-2 font-bold mb-5 mt-10 md:mt-0 tracking-[2px]'>TalkGpt<FaMicrophoneAlt className=' animate-bounce text-[#0367a6]'/></h1>
    <p className='mb-10 uppercase text-gray-500 tracking-[5px] text-sm text-center'>Your voice your command</p>
    <div className='flex flex-col md:flex-row space-x-2 text-center text-sm  overflow-y-auto'> 
    
      <div>
        <div className='flex flex-col items-center mb-5'>
           {/* sun icon */}
           <SunIcon className="h-6 w-6 animate-pulse text-[#0367a6]"/>
           <h2 className='uppercase font-bold'>Propmt Examples</h2>
         </div>
       <div className='space-y-2'>
       <p className='infoText'>"Explain something to me"</p>
         <p className='infoText'>"What is the different between a dog and a cat?"</p>
         <p className='infoText'>"What is the color of the sun?"</p>
         <p className='infoText'>"Why is the sky blue?"</p>
       </div>
    </div>
      <div className='mt-6 mb-6 md:mt-0 md:mb-0 ' >
        <div className='flex flex-col items-center mb-5'>
           {/* sun icon */}
           <BoltIcon className="h-6 w-6 animate-pulse text-[#0367a6]"/>
           <h2 className='uppercase font-bold'> Strength && Capabilities</h2>
         </div>
       <div className='space-y-2'>
       <p className='infoText'>Change chatGpt model to use</p>
         <p className='infoText'>Messages are stored in realtime firebase firestore</p>
         <p className='infoText'>Hot toast notifications when chatGpt is thinking</p>
         <p className='infoText'>Chat completions with voice recognition capabilities</p>
       </div>
    </div>
      <div>
        <div className='flex flex-col items-center mb-5'>
           {/* sun icon */}
           <ExclamationTriangleIcon className="h-6 w-6 animate-pulse text-[#0367a6]"/>
           <h2 className='uppercase font-bold'>Weaknesses</h2>
         </div>
       <div className='space-y-2'>
       <p className='infoText'>May sometimes generate wrong info</p>
       <p className='infoText'>May not get actual text from speech recognition</p>
         <p className='infoText'>May sometimes produce biased info</p>
         <p className='infoText'>Limited to knowledge of wrld events after 2021</p>
       </div>
    </div>
    
    </div>
   
      <p className='mt-[30px] md:absolute md:bottom-1 text-sm text-gray-500 text-center bg-gray-700 py-4 px-8 md:px-[40px] lg:px-[219px]'>
      Free Research Preview TalkGpt may produce inaccurate information about people, places, or facts <br/> <span className='flex space-x-2 gap-3 text-center items-center justify-center'>&copy; CopyRight 2023 <FaGithub  className=' h-6 w-6 text-[#0367a6]'/>David-mwas , <FaGithub className=' h-6 w-6 text-[#0367a6]'/>Fiona Githaiga</span>
    </p>
  
  </div>
    
)
}
