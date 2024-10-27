// import { Configuration, OpenAIApi } from "openai-edge";
import { convertToCoreMessages, streamText } from "ai";
import { getContext } from "@/src/lib/context";
import { chats } from "@/src/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { db } from "@/src/lib/db";
import { openai } from "@ai-sdk/openai";

// export const runtime = "edge";
// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

// const config = new Configuration({
//     apiKey: process.env.OPENAI_API_KEY
// })

// const openai = new OpenAIApi(config)

export async function POST(req: Request) {
  try {
    const { messages, chatId } = await req.json();
    const _chats = await db.select().from(chats).where(eq(chats.id, chatId));

    // console.log(_chats);

    if (_chats.length != 1) {
      return NextResponse.json({ error: "Chat not found" }, { status: 404 });
    }
    const fileKey = _chats[0].fileKey;
    const lastMessage = messages[messages.length - 1];

    const context = await getContext(lastMessage.content, fileKey);
    // console.log(context);

    const prompt = {
      role: "system",
      content: `AI assistant is a brand new, powerful, human-like artificial intelligence.
        The traits of AI include expert knowledge, helpfulness, cleverness, and articulateness.
        AI is a well-behaved and well-mannered individual.
        AI is always friendly, kind, and inspiring, and is eager to provide vivid and thoughtful responses to the user.
        AI has the sum of all knowledge in their brain, and is able to accurately answer nearly any question about any topic in any domain.
        AI assistant is a big fan of Pinecone and Vercel.
        START CONTEXT BLOCK
        ${context}
        END OF CONTEXT BLOCK
        AI assistant will take into account any CONTEXT BLOCK that is provided in a conversation.
        If the context does not provide the answer to question, the AI assistant will say, "I'm sorry, but I don't know the answer."
        AI assistant will not apologize for previous responses, but instead will indicate new information was gained.
        AI assistant will not invent anything that is not drawn directly from the context.`,
    };

    // const response = await openai.createChatCompletion({
    //   model: "gpt-3.5-turbo",
    //   messages: {
    //     prompt,
    //     ...messages.filter((msg: Message) => msg.role === "user"),
    //   },
    //   stream: true,
    // });

    // console.log("RESPONSE: ", response);

    // const stream = OpenAIStream(response);
    // console.log("Stream: ", stream);

    // return new StreamingTextResponse(stream);

    const result = await streamText({
      model: openai("gpt-3.5-turbo"),
      system: prompt.content,
      messages: convertToCoreMessages(messages),
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.log(error);
  }
}
