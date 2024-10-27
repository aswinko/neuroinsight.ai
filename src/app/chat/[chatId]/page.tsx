import { auth } from "@/auth";
import ChatComponent from "@/src/components/ChatComponent";
import ChatSidebar from "@/src/components/ChatSidebar";
import PDFViewer from "@/src/components/PDFViewer";
import { db } from "@/src/lib/db";
import { chats } from "@/src/lib/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: {
    chatId: string;
  };
};

const page = async ({ params: { chatId } }: Props) => {
  const session = await auth();
//   console.log(session?.user?.id);

  if (!session?.user) {
    return redirect("/signup");
  }

  const _chats = await db
    .select()
    .from(chats)
    .where(eq(chats.userId, session?.user?.id || ""));

    // console.log(_chats);
    

  if (!_chats) {
    return redirect("/chat");
  }

  if (!_chats.find((chat) => chat.id === parseInt(chatId))) {
    return redirect("/chat");
  }

  const currentChat = _chats.find(chat => chat.id === parseInt(chatId))

  return <div className="flex max-h-screen overflow scroll pt-6">
    <div className="flex w-full max-h-screen overflow-scroll">
        {/* Chat Sidebar */}
        <div className="flex-[1] max-w-xs">
            <ChatSidebar chats={_chats} chatId={parseInt(chatId)} />
        </div>
        {/* PDF VIEWER */}
        <div className="max-h-screen p-4 overflow-scroll flex-[5]">
            <PDFViewer pdfUrl={currentChat?.pdfUrl || ''} />
        </div>
        {/* Chat componet */}
        <div className="flex-[3] border-l-4 border-l-slate-200">
            <ChatComponent chatId={parseInt(chatId)} />
        </div>
    </div>
  </div>;
};

export default page;
