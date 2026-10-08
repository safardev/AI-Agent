import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { config } from "dotenv";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

config();

//model
const model = new ChatGoogleGenerativeAI({
  model: "gemini-3.5-flash-lite",
  temperature: 0.7,
  maxOutputTokens: 1024,
  apiKey: process.env.GEMINI_API_KEY,
  topK: 5,
});

//prompt
const prompt = PromptTemplate.fromTemplate(
  "You are a helpful AI assistant, Give clear, useful and well-structured answers, so tell me about: {query}",
);

 
//output parser
const output = new StringOutputParser();

//chain creation
const chain = prompt.pipe(model).pipe(output);

//run chain with user input
const result = async () => {
  try {
    console.log("Thinking...");
    const x = await chain.invoke({
      query: "bihar, india",
    });
    console.log(`Result is: ${x}`);
  } catch (e) {
    console.log(e);
  }
};

result();
