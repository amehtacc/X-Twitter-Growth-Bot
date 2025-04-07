import { generateTweet } from "../utils/gemini_api.js";

export async function tweetNow(topics) {
  try {
    const tweet = await generateTweet(topics);
    console.log("Generated Tweet: ", tweet);

    chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
      const url = tab?.url || "";
      if (!url.includes("twitter.com") && !url.includes("x.com")) {
        console.warn("Not on Twitter/X. Skipping tweet injection.");
        return;
      }

      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: (tweet) => {
          const tweetBox = document.querySelector('[data-testid="tweetTextarea_0"]');
          if (!tweetBox) {
            console.warn("❌ Tweet box not found");
            return;
          }

          // Focus on the tweet box
          tweetBox.focus();

          // Clear existing content (if any)
          const selection = window.getSelection();
          const range = document.createRange();
          range.selectNodeContents(tweetBox);
          range.deleteContents();
          selection.removeAllRanges();
          selection.addRange(range);

          // Insert tweet as text node
          const textNode = document.createTextNode(tweet);
          range.insertNode(textNode);

          // Dispatch input event to update internal state
          tweetBox.dispatchEvent(new InputEvent('input', { bubbles: true }));

          // Wait a bit to ensure the tweet box is updated
          setTimeout(() => {
            const tweetButton = document.querySelector('[data-testid="tweetButtonInline"]');
            if (tweetButton && !tweetButton.disabled) {
              tweetButton.click();
              console.log("✅ Tweet posted");
            } else {
              console.warn("⚠️ Tweet button not found or disabled");
            }
          }, 10000);
        },
        args: [tweet],
      });
    });
  } catch (error) {
    console.error("❌ Failed to tweet:", error);
  }
}
