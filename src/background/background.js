// Log to confirm that the background service worker script is running successfully
console.log("✅ Background service worker loaded");

// Import the function that handles the auto-tweeting toggle logic
import { toggleAutoTweeting } from "../scripts/auto_tweet_manager.js";

// Set up a listener to handle messages received from other parts of the Chrome extension
// This could be from the popup script, content script, or elsewhere in the extension
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  // Log the message received for debugging purposes
  console.log("✅ Background received:", msg);

  // Check the message type
  // If the message type is "TOGGLE_AUTO_TWEET", it means the user or extension requested
  // to start or stop the automatic tweeting functionality
  if (msg.type === "TOGGLE_AUTO_TWEET") {
    // Call the imported function to toggle the auto-tweeting state
    toggleAutoTweeting();

    // Send a response back to the sender (popup or content script)
    // letting them know that the toggle action was successful
    sendResponse({ status: "Auto tweet toggled" });
  }

  // Return true to indicate that the response will be sent asynchronously
  // (though in this case, it's sent immediately — this is just good practice)
  return true;
});
