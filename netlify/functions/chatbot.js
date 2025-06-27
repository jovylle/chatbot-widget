import fetch from "node-fetch";

export async function handler (event) {
  try {
    const { prompt, instructions } = JSON.parse(event.body || '{}');

    const messages = [
      { role: "system", content: instructions || "You're a helpful assistant." },
      { role: "user", content: prompt || "Hello!" }
    ];

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages
      })
    });

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify({ reply: data.choices?.[0]?.message?.content || "[No reply]" })
    };
  } catch (err) {
    console.error("Chatbot error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
}
