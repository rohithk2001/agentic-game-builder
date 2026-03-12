import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export async function generate(prompt) {

  const response = await axios.post(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      model: "groq/compound",
      messages: [
        { role: "system", content: "You are a helpful AI game developer." },
        { role: "user", content: prompt }
      ],
      temperature: 0.7
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json"
      }
    }
  );

  return response.data.choices[0].message.content;
}
