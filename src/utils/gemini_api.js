import { generateDynamicPrompt } from "./prompt.js";

export async function generateTweet(topics) {
  const prompt = generateDynamicPrompt(topics);
  
  try {
    const apiKey = await getApiKeyFromStorage();
    
    if (!apiKey) {
      throw new Error("API key not found. Please set your Gemini API key.");
    }
    
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return (
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Failed to generate tweet."
    );
  } catch (error) {
    console.error("Error generating tweet:", error);
    return "Oops! Something went wrong while generating your tweet.";
  }
}

function getApiKeyFromStorage() {
  return new Promise((resolve) => {
    chrome.storage.sync.get(["xGrowthBotSettings"], (result) => {
      const storedData = result?.xGrowthBotSettings;
      resolve(storedData?.apiKey || null);
    });
  });
}