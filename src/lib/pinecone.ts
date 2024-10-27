import {
  Pinecone,
  PineconeRecord,
  RecordMetadata,
} from "@pinecone-database/pinecone";
import { downloadFromS3 } from "./s3-server";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import {
  Document,
  RecursiveCharacterTextSplitter,
} from "@pinecone-database/doc-splitter";
import { getEmbeddings } from "./embeddings";
import md5 from "md5";
import { convertToAscii } from "./utils";
import {} from "@pinecone-database/pinecone/dist/utils";

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
  const documents = await Promise.all(
    pages.map((page) => prepareDocument(page))
  );

  //3. Vectorize and embed individual documents
  const vectors = await Promise.all(documents.flat().map(embedDocument));

  //4. Upload to pinecone
  const client = await getPineconeClient();
  const pineconeIndex = await client.index("neuroinsightai");
  const namespace = pineconeIndex.namespace(convertToAscii(fileKey));

  console.log("inserting vectors into pinecone");
  try {
    await namespace.upsert(vectors);
    console.log("vectors: " + vectors.length);
    return documents[0];
  } catch (error) {
    console.log(`error inserting vectors: %o into pinecone`, vectors, error);
    throw error;
  }

  // return pages;
}

async function embedDocument(
  doc: Document
): Promise<PineconeRecord<RecordMetadata>> {
  try {
    const embeddings = await getEmbeddings(doc.pageContent);
    const hash = md5(doc.pageContent);

    return {
      id: hash,
      values: embeddings,
      metadata: {
        text: doc.metadata.text,
        pageNumber: doc.metadata.pageNumber,
      },
    } as PineconeRecord;
  } catch (error) {
    console.error("Error in embedding document", error);
    throw error;
  }
}

export const truncateStringBytes = (str: string, bytes: number) => {
  const enc = new TextEncoder();
  return new TextDecoder("utf-8").decode(enc.encode(str).slice(0, bytes));
};
async function prepareDocument(page: PDFPage) {
  let { pageContent, metadata } = page;

  pageContent = pageContent.replace(/\n/g, "");

  const splitter = new RecursiveCharacterTextSplitter();
  const doc = await splitter.splitDocuments([
    new Document({
      pageContent,
      metadata: {
        pageNumber: metadata.loc.pageNumber,
        text: truncateStringBytes(pageContent, 36000),
      },
    }),
  ]);
  return doc;
}
