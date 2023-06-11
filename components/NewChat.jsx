import { db } from '@/firebase'
import { PlusIcon } from '@heroicons/react/24/outline'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React from 'react'

function NewChat() {
  const router=useRouter()
  const {data:session} =useSession()
  const createNewChat=async ()=>{
    const doc = await addDoc(
      collection(db,"users",session?.user.email,"chats"),{
        messages:[],
        userId:session?.user.email,
        createdAt:serverTimestamp()
      }
    )
    router.push(`/chat/${doc.id}`)
  }
  return (
    <div 
    onClick={createNewChat}
    className='flex border border-[#141e30] hover:bg-[#141e30] chatRow p-4 mb-4'>
        <PlusIcon className='h-4 w-4 '/>
        <p>New Chat</p>
    </div>
  )
}

export default NewChat