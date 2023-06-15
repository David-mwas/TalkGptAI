import admin from "firebase-admin"
import query from "@/lib/queryApi";
import { adminDB } from "@/firebaseAdmin";
export default async function handler(req, res) {

    // next api route endpoint
    const {prompt,chatId,model,session} = req.body;

    if (!prompt) {
        res.status(400).json({answer:"Provide a prompt!"});
        return;
    }
    if (!chatId) {
        res.status(400).json({answer:"Provide a valid chat ID!"});
        return;
    }
    // chatGpt query
    const response = await query(prompt, chatId, model)
    const message={
        text:response || "ChatGpt could not find an answer for that!",
        createdAt: admin.firestore.Timestamp.now(),
        user:{
            _id:"ChatGPT",
            name:"ChatGPT",
            avatar:"/voicegpt.png"
        }
    }

    
    await adminDB
    .collection("users")
    .doc(session?.user.email)
    .collection("chats")
    .doc(chatId)
    .collection("messages")
    .add(message)

    // chat completions response
    res.status(200).json({ answer: message.text });
    console.log(response)
  }