### AI Agent using LangChain and Gemini

I developed an AI agent using **LangChain** and **Google Gemini** to understand user queries, decide when external tools are required, execute those tools, and return a natural-language response.

The implementation includes the following components:

**1. Gemini Model Integration**
Integrated Google Gemini with LangChain using `@langchain/google-genai`. Configured the model with parameters such as temperature, maximum output tokens, and API authentication.

**2. Prompt and Chain Development**
Created a LangChain processing flow to connect the user input with the Gemini model and generate structured responses. This established the basic LLM workflow before introducing agent-based tool execution.

**3. Custom Tool Creation**
Created a custom `get_weather` tool using LangChain's `tool()` functionality and **Zod** for input validation. The tool accepts a city name and returns weather-related information.

**4. AI Agent Development**
Used LangChain's `createAgent()` to build an agent capable of deciding whether it needs to use the available tool based on the user's query. The agent can dynamically invoke the weather tool instead of requiring the application to call it manually.

**5. Tool Calling Workflow**
Implemented the complete agent workflow:

`User Query → Gemini → Tool Selection → Tool Execution → Gemini → Final Response`

For example, when the user asks:

> "What's the weather in Muzaffarpur?"

Gemini identifies that weather information is required, invokes the `get_weather` tool with the city name, receives the tool result, and then generates the final response.

**6. Async Agent Execution**
Implemented asynchronous agent execution with `async/await` and handled the agent's returned message state to extract the final human-readable response.

**7. Error Handling**
Added error handling around model and agent execution to prevent application failures and provide meaningful error messages.

### Technologies Used

* JavaScript / Node.js
* LangChain
* Google Gemini
* `@langchain/google-genai`
* Zod
* dotenv
* LangChain Agents
* Tool Calling

### Current Outcome

The project demonstrates the fundamentals of building a **tool-using AI agent**, including LLM integration, chains, custom tools, schema validation, agent orchestration, tool calling, asynchronous execution, and final response extraction.
