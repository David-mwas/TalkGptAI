
import {BoltIcon, ExclamationTriangleIcon, SunIcon} from '@heroicons/react/24/outline'
export default function Home() {
  return (
    <div className='flex flex-col items-center text-white px-2 justify-center h-screen'>
    <h1 className='text-5xl font-bold mb-5 tracking-[2px]'>TalkGpt</h1>
    <p className='mb-10 uppercase text-gray-500 tracking-[5px] text-sm'>Your voice your command</p>
    <div className='flex space-x-2 text-center text-sm'> 
    
      <div>
        <div className='flex flex-col items-center mb-5'>
           {/* sun icon */}
           <SunIcon className="h-6 w-6"/>
           <h2>Examples</h2>
         </div>
       <div className='space-y-2'>
       <p className='infoText'>"Explain something to me"</p>
         <p className='infoText'>"What is the different between a dog and a cat?"</p>
         <p className='infoText'>"What is the color of the sun?"</p>
       </div>
    </div>
      <div>
        <div className='flex flex-col items-center mb-5'>
           {/* sun icon */}
           <BoltIcon className="h-6 w-6"/>
           <h2>Capabilities</h2>
         </div>
       <div className='space-y-2'>
       <p className='infoText'>Change chatGpt model to use</p>
         <p className='infoText'>Messages are stored in firebase firestore</p>
         <p className='infoText'>Hot toast notifications when chatGpt is thinking</p>
       </div>
    </div>
      <div>
        <div className='flex flex-col items-center mb-5'>
           {/* sun icon */}
           <ExclamationTriangleIcon className="h-6 w-6"/>
           <h2>Limitations</h2>
         </div>
       <div className='space-y-2'>
       <p className='infoText'>May sometimes generate wrong info</p>
         <p className='infoText'>May sometimes produce biased info</p>
         <p className='infoText'>Limited to knowledge of wrld events after 2021</p>
       </div>
    </div>
    
    </div>
  </div>
    
)
}
