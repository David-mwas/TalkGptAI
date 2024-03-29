import { db } from "@/firebase";
import useTypingEffect from "@/hooks/useTypingEffect";
import { ChatBubbleLeftIcon, TrashIcon } from "@heroicons/react/24/outline";
import { collection, deleteDoc, doc, orderBy, query } from "firebase/firestore";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";

function ChatRow({ id }) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [active, setActive] = useState(false);

  const [messages] = useCollection(
    collection(db, "users", session.user.email, "chats", id, "messages")
  );
  const textMessage = useTypingEffect(
    messages?.docs[messages.docs.length - 1]?.data().text || "New chat",
    100
  );
  useEffect(() => {
    if (!pathname) return;

    setActive(pathname.includes(id));
  }, [pathname]);

  const removeChat = async () => {
    await deleteDoc(doc(db, "users", session.user.email, "chats", id));
    router.replace("/");
  };
  return (
    <Link
      href={`/chat/${id}`}
      className={`chatRow justify-center p-2 m-[4px] ${
        active && "bg-[#141e30]"
      }`}
    >
      <ChatBubbleLeftIcon className="h-5 w-5 text-[#0367a6]" />
      <p className="flex-1 hidden md:inline-flex truncate">{textMessage}</p>
      <TrashIcon
        onClick={removeChat}
        className="h-5 w-5 text-gray-400 hover:text-red-700"
      />
    </Link>
  );
}

export default ChatRow;
