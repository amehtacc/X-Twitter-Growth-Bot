import { tweetNow } from "./tweet_executor.js";

let tweetingInterval = null;

export function toggleAutoTweeting() {
  console.log("🚀 toggleAutoTweeting function ran!");
  if (tweetingInterval) {
    clearInterval(tweetingInterval);
    tweetingInterval = null;
    console.log("Auto-tweeting stopped.");
  } else {
    startTweeting();
  }
}

function startTweeting() {
  chrome.storage.sync.get(["xGrowthBotSettings"], ({ xGrowthBotSettings }) => {
    const frequencyInHours = parseInt(
      xGrowthBotSettings?.tweetFrequency || "3"
    );
    const delay = frequencyInHours * 60 * 60 * 1000;

    if (tweetNow) tweetNow(xGrowthBotSettings?.topics || "");
    
    tweetingInterval = setInterval(() => {
      if (tweetNow) tweetNow(xGrowthBotSettings?.topics || "");
    }, delay);
  });
}
