let open_ai_response;

let conversation = [
  { role: "user", content: "Hi" },
  { role: "assistant", content: "Hi,how can I help you today " },
];

async function conversationUserAdd(question, sentiment) {
  conversation.push({
    role: "user",
    content:
      "My happiness out of 10" + sentiment + "My question is:" + question,
  });
}

async function conversationAssistantAdd(response) {
  conversation.push({ role: "assistant", content: response });
}

async function openai_test() {
  let url = "https://api.openai.com/v1/chat/completions";

  let part1 = "sk";
  let part2 = "-uUPayv04E0azuKUx7fqkT3BlbkF";
  let part3 = "JAbsZR6JQELQpKK5nH0bl";

  let allParts = part1 + part2 + part3;

  let data = { model: "gpt-3.5-turbo", messages: conversation };

  let response;

  try {
    response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${allParts}`,
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const responseData = await response.json();
      const message = responseData.choices[0].message.content;

      conversationAssistantAdd(message);

      const utterance = new SpeechSynthesisUtterance(message);
      speechSynthesis.speak(utterance);
      return message;
    } else {
      console.log("Requset failed with status:", response.status);
    }
  } catch (error) {
    console.log("there is an error:", error);
  }
}
