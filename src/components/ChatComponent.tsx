"use client";

import React from "react";
import { Input } from "./ui/input";
import { useChat } from "ai/react";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import MessageList from "./MessageList";

type Props = {
    chatId: number;
};

const ChatComponent = ({chatId}: Props) => {
  const { input, handleInputChange, handleSubmit, messages } = useChat({
    api: '/api/chat',
    body: {
        chatId
    }
  });

  React.useEffect(() => {
    const messageContainer = document.getElementById('message-container');
    if (messageContainer) {
      messageContainer.scrollTo({
        top: messageContainer.scrollHeight,
        behavior: "smooth"
      })
    }
  }, [messages]);
  return (
    <div className="relative max-h-screen overflow-scroll" id="message-container">
      <div className="sticky top-0 inset-x-0 p-2  h-fit">
        <h3 className="text-xl font-bold">Chat</h3>
      </div>
      {/* Message list */}
      <MessageList messages={messages} />
      <form
        onSubmit={handleSubmit}
        action=""
        className="sticky bottom-0 inset-x-0 px-2 py-4 z-10"
      >
        <div className="flex">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Ask any questions..."
            className="w-full"
          />
          <Button className="bg-blue-600 ml-2">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatComponent;
