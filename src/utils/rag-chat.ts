import { RAGChat, upstash, openai } from "@upstash/rag-chat"


export const ragChat = new RAGChat({
    // model: upstash("mistralai/Mistral-7B-Instruct-v0.2"),
    // model: openai('gpt-4-turbo'),
    model: upstash("meta-llama/Meta-Llama-3-8B-Instruct"),
})