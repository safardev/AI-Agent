import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { config } from "dotenv";
import { createAgent, tool } from "langchain";
import * as z from "zod";

config();

//model
const model = new ChatGoogleGenerativeAI({
  model: "gemini-3.5-flash-lite",
  temperature: 0.7,
  maxOutputTokens: 1024,
  apiKey: process.env.GEMINI_KEY,
  topK: 5,
});

//tool
const getWeather = tool(
  async ({ city }) => {
    const response = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API}&q=${encodeURIComponent(city)}&aqi=yes`,
    );

    const data = await response.json();

    return JSON.stringify(data);
  },
  {
    name: "get_weather",
    description: "Get the weather for given city",
    schema: z.object({
      city: z.string().describe("The city to get the weather for"),
    }),
  },
);

//agent
const agent = createAgent({
  model,
  tools: [getWeather],
});

//run agent
const result = async () => {
  try {
    console.log("Thinking....");

    let outut = await agent.invoke({
      messages: [
        { role: "user", content: "What's the weather in Muzaffarpur?" },
      ],
    });
    return outut.messages[outut.messages.length - 1].content;
  } catch (e) {
    return e.messages;
  }
};

const response = await result();
console.log(response);
