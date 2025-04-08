// Import a function that creates a prompt based on user-provided topics
import { generateDynamicPrompt } from "./prompt.js";

/**
 * Generates a tweet using Google's Gemini API based on the provided topics.
 *
 * @param {string} topics - Topics or keywords to generate a tweet about.
 * @returns {Promise<string>} - The generated tweet text.
 */
export async function generateTweet(topics) {
  // Step 1: Create a prompt tailored to the topics
  const prompt = generateDynamicPrompt(topics);

  try {
    // Step 2: Retrieve the Gemini API key from Chrome extension storage
    const apiKey = await getApiKeyFromStorage();

    if (!apiKey) {
      throw new Error("API key not found. Please set your Gemini API key.");
    }

    // Step 3: Make a POST request to the Gemini API with the generated prompt
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

    // Step 4: Handle non-successful responses
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    // Step 5: Extract the generated tweet from the response JSON
    const data = await response.json();
    return (
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Failed to generate tweet."
    );
  } catch (error) {
    // Catch and log any error, return fallback message
    console.error("Error generating tweet:", error);
    return "Oops! Something went wrong while generating your tweet.";
  }
}

/**
 * Retrieves the stored Gemini API key from Chrome's synced extension storage.
 *
 * @returns {Promise<string|null>} - The stored API key or null if not found.
 */
function getApiKeyFromStorage() {
  return new Promise((resolve) => {
    chrome.storage.local.get(["xGrowthBotSettings"], (result) => {
      const storedData = result?.xGrowthBotSettings;
      resolve(storedData?.apiKey || null);
    });
  });
}
