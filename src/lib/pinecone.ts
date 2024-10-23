import { Pinecone } from "@pinecone-database/pinecone";
import { downloadFromS3 } from "./s3-server";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

let pc: Pinecone | null = null;

export const getPineconeClient = async () => {
  if (!pc) {
    // Initialize a client
    pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY! });

    // Create a serverless index
    const indexName = process.env.PINECONE_INDEX_NAME!;
    await pc.createIndex({
      name: indexName,
      dimension: 2,
      metric: "cosine",
      spec: {
        serverless: {
          cloud: "aws",
          region: process.env.PINECONE_ENVIRONMENT!,
        },
      },
    });
  }

  return pc;
};

type PDFPage = {
  pageContent: string;
  metadata: {
    loc: {
      pageNumber: number;
    };
  };
};

export async function loadS3IntoPinecone(fileKey: string) {
  // Obtain the PDF
  console.log("Downloading s3 into file system");
  const file_name = await downloadFromS3(fileKey);
  if (!file_name) {
    throw new Error("Failed to download file from S3");
  }
  const loader = new PDFLoader(file_name);

  const pages = (await loader.load()) as PDFPage[];

  //2. split and segment the pdf 
  
  return pages;
}
