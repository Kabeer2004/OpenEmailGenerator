import { GoogleGenerativeAI } from "@google/generative-ai";

export const POST = async (req) => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Use a valid model name

  const { messages } = await req.json();
  if (!messages || messages.length < 1) {
    return new Response(JSON.stringify({ error: "No messages provided" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Define the system prompt and initial assistant acknowledgment
  const systemPrompt =
    "You are an AI assistant that generates React JSX code for stylish emails based on user descriptions. Only return the JSX code without any function or component wrappers or explanations. Do not use markdown formatting like ```code```.";
  const systemMessage = {
    role: "user",
    parts: [{ text: systemPrompt }],
  };
  const acknowledgment = {
    role: "model",
    parts: [
      {
        text: "Understood. I will generate React JSX code for emails based on your descriptions.",
      },
    ],
  };

  // Prepare the history: system prompt + acknowledgment + all but the last message
  const history = [
    systemMessage,
    acknowledgment,
    ...messages.slice(0, -1).map((m) => ({
      role: m.role === "user" ? "user" : "model", // Map "assistant" to "model"
      parts: [{ text: m.content }],
    })),
  ];

  // The last message is the latest user input
  const lastMessage = messages[messages.length - 1].content;

  try {
    const chatSession = model.startChat({
      history,
    });
    const result = await chatSession.sendMessage(lastMessage);
    const text = await result.response.text();

    return new Response(JSON.stringify({ code: text }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
