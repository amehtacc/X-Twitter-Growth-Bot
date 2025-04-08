// Import the function that uses Gemini API to generate a tweet based on topics
import { generateTweet } from "../utils/gemini_api.js";

/**
 * Generates a tweet using the provided topics and attempts to post it
 * directly into the Twitter/X web interface using Chrome extension APIs.
 * 
 * @param {string} topics - A string containing topics or keywords to base the tweet on.
 */
export async function tweetNow(topics) {
  try {
    // Step 1: Generate the tweet content
    const tweet = await generateTweet(topics);
    console.log("Generated Tweet: ", tweet);

    // Step 2: Get the currently active tab in the current browser window
    chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
      const url = tab?.url || "";

      // Step 3: Ensure the user is on Twitter or X before trying to inject the tweet
      if (!url.includes("twitter.com") && !url.includes("x.com")) {
        console.warn("Not on Twitter/X. Skipping tweet injection.");
        return;
      }

      // Step 4: Inject code into the Twitter/X tab to auto-fill and post the tweet
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: (tweet) => {
          // Find the tweet input box
          const tweetBox = document.querySelector('[data-testid="tweetTextarea_0"]');
          if (!tweetBox) {
            console.warn("❌ Tweet box not found");
            return;
          }

          // Focus the tweet box to make it ready for input
          tweetBox.focus();

          // Clear any existing content inside the tweet box
          const selection = window.getSelection();
          const range = document.createRange();
          range.selectNodeContents(tweetBox);
          range.deleteContents();
          selection.removeAllRanges();
          selection.addRange(range);

          // Insert the new tweet as a text node
          const textNode = document.createTextNode(tweet);
          range.insertNode(textNode);

          // Trigger input event so Twitter/X detects the text change
          tweetBox.dispatchEvent(new InputEvent('input', { bubbles: true }));

          // Wait a short delay before clicking the "Tweet" button to ensure everything is ready
          setTimeout(() => {
            const tweetButton = document.querySelector('[data-testid="tweetButtonInline"]');
            if (tweetButton && !tweetButton.disabled) {
              tweetButton.click(); // Post the tweet
              console.log("✅ Tweet posted");
            } else {
              console.warn("⚠️ Tweet button not found or disabled");
            }
          }, 2000); // Wait 2 seconds
        },
        args: [tweet], // Pass the generated tweet into the injected script
      });
    });
  } catch (error) {
    // Catch and log any errors during the tweet generation or posting process
    console.error("❌ Failed to tweet:", error);
  }
}
