
import axios from "axios";

export async function askAI(prompt: string, apiKey: string): Promise<string> {
  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "deepseek/deepseek-r1:free",
        messages: [
          { role: "user", content: prompt },
        ],
      },
      { 
        headers: { 
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        } 
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("Error calling AI API:", error);
    return "I'm sorry, I couldn't generate a response at the moment.";
  }
}
