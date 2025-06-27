const fetch = require("node-fetch");

exports.handler = async (event) => {
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
    const reply = data.choices?.[0]?.message?.content || "Sorry, no reply.";

    return {
      statusCode: 200,
      body: JSON.stringify({ reply })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
