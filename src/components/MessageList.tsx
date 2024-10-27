import { Message } from "ai/react";
import React from "react";
import { cn } from "../lib/utils";

type Props = {
  messages: Message[];
};

const MessageList = ({ messages }: Props) => {
  if (!messages) return <div>MessageList</div>;
  return (
    <div className="flex flex-col gap-2 px-4 z-0">
      {messages.map((message) => (
        <div
          className={cn("flex", {
            "justify-end pl-10": message.role === "user",
            "justify-start pr-10": message.role === "assistant",
          })}
          key={message.id}
        >
            <div className={cn('rounded-lg px-3 py-1 text-sm shadow-md ring-gray-900/10', {
                'bg-blue-600 text-white': message.role === 'user',
            })}>
                <p className="">{message.content}</p>
            </div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
