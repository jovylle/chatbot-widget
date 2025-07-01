import fetch from "node-fetch";

export async function handler (event) {
  try {
    const { messages = [], instructions } = JSON.parse(event.body || "{}");

    const finalMessages = [
      { role: "system", content: instructions || "You're a helpful assistant." },
      ...messages
    ];

    // 1. Send request
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: finalMessages,
      }),
    });

    // 2. Parse the JSON
    const data = await response.json();
    console.log("OpenAI raw response:", JSON.stringify(data, null, 2));

    // 3. If HTTP-level error, surface it
    if (!response.ok) {
      const errMsg = data.error?.message || `HTTP ${response.status}`;
      return {
        statusCode: response.status,
        body: JSON.stringify({
          reply: `[Error from OpenAI: ${errMsg}]`,
          detail: data,
        }),
      };
    }

    // 4. Pull out the assistant’s message
    const content = data.choices?.[0]?.message?.content?.trim();

    // 5. If there’s no content, return a richer debug reply
    if (!content) {
      return {
        statusCode: 200,
        body: JSON.stringify({
          reply: "[No reply from model]",
          detail: {
            model: data.model,
            choices_count: data.choices?.length ?? 0,
            usage: data.usage,
            full_response: data,
          },
        }),
      };
    }

    // 6. Otherwise, return the real reply
    return {
      statusCode: 200,
      body: JSON.stringify({ reply: content }),
    };

  } catch (err) {
    console.error("Chatbot error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: err.message,
        stack: err.stack,
      }),
    };
  }
}
