import { auth } from "@/auth";
import { db } from "@/src/lib/db";
import { chats } from "@/src/lib/db/schema";
import { loadS3IntoPinecone } from "@/src/lib/pinecone";
import { getS3Url } from "@/src/lib/s3";
import { NextResponse } from "next/server";

//api/create-chat
export async function POST(req: Request, res: Response) {
  const session = await auth();
  console.log(session?.user?.id);
  
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // console.log(session?.user?.id);
  

  try {
    const body = await req.json();

    const { file_key, file_name }: { file_key: string; file_name: string } =
      body;
    const url = await getS3Url(file_key);
    if (!url) throw Error("Error getting S3 url");
    await loadS3IntoPinecone(file_key);
    const chat_id = await db
      .insert(chats)
      .values({
        pdfName: file_name,
        pdfUrl: url,
        userId: session?.user?.id || "",
        fileKey: file_key,
      })
      .returning({
        insertedId: chats.id,
      });

    return NextResponse.json(
      { chat_id: chat_id[0].insertedId },
      { status: 200 }
    );
    // return NextResponse.json({ pages });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
