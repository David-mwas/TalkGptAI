import Chat from '@/components/Chat'
import ChatInput from '@/components/ChatInput'
import React from 'react'

function ChatPage({params}) {
  return (
    <div className='p-5 flex flex-col h-screen overflow-hidden'>
        <Chat chatId={params.id}/>
        <ChatInput chatId={params.id}/>
    </div>
  )
}

export default ChatPage