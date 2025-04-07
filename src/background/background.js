console.log("✅ Background service worker loaded");

import { toggleAutoTweeting } from "../scripts/auto_tweet_manager.js";

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  console.log("✅ Background received:", msg);

  if (msg.type === "TOGGLE_AUTO_TWEET") {
    toggleAutoTweeting();
    sendResponse({ status: "Auto tweet toggled" });
  }

  return true;
});
