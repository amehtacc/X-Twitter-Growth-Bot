// Import the function responsible for posting tweets
import { tweetNow } from "./tweet_executor.js";

// Store the interval ID to allow starting/stopping the auto-tweeting process
let tweetingInterval = null;

/**
 * Toggles the auto-tweeting functionality:
 * - If tweeting is active, it stops it.
 * - If tweeting is inactive, it starts the tweeting interval.
 */
export function toggleAutoTweeting() {
  console.log("🚀 toggleAutoTweeting function ran!");

  // If tweeting is already running, stop it
  if (tweetingInterval) {
    clearInterval(tweetingInterval); // Clear the interval to stop tweeting
    tweetingInterval = null;         // Reset the interval reference
    console.log("Auto-tweeting stopped.");
  } else {
    // Otherwise, start the tweeting process
    startTweeting();
  }
}

/**
 * Starts the tweeting process based on the frequency stored in Chrome's storage.
 * Fetches settings and sets an interval to send tweets automatically.
 */
function startTweeting() {
  chrome.storage.local.get(["xGrowthBotSettings"], ({ xGrowthBotSettings }) => {
    // Convert tweet frequency (in hours) to milliseconds
    const frequencyInHours = parseInt(xGrowthBotSettings?.tweetFrequency || "3");
    const delay = frequencyInHours * 60 * 60 * 1000; // Convert hours to ms

    // Immediately send the first tweet upon starting
    if (tweetNow) tweetNow(xGrowthBotSettings?.topics || "");

    // Set up the interval to keep tweeting at the defined frequency
    tweetingInterval = setInterval(() => {
      if (tweetNow) tweetNow(xGrowthBotSettings?.topics || "");
    }, delay);
  });
}
