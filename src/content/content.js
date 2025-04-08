// ✅ Log to confirm that the content script has been injected and is running
console.log("✅ Content script loaded");

// 🔧 Function to inject the Start/Stop Auto Tweet toggle button into the Twitter UI
function injectToggleButton() {
  // Select the <header> element where we want to append our button
  const header = document.querySelector("header");

  // If header doesn't exist (maybe not on the correct page) OR button is already injected, exit
  if (!header || document.getElementById("ai-toggle")) return;

  // Get current settings from Chrome's local storage
  chrome.storage.local.get(["xGrowthBotSettings"], (result) => {
    const settings = result.xGrowthBotSettings || {};
    let isEnabled = settings.isEnabled || false; // Default to false if not set

    // Create the toggle button element
    const btn = document.createElement("button");
    btn.innerText = isEnabled ? "Stop Auto Tweet" : "Start Auto Tweet";
    btn.id = "ai-toggle";

    // Add inline styles to make it visually appealing and fixed on the screen
    btn.style = `
      position: fixed;
      left: 160px;
      bottom: 85px;
      border: none;
      border-radius: 50px;
      font-weight: 600;
      background: black;
      color: white;
      padding: 8px 32px;
      font-size: 16px;
      font-family: Poppins, sans-serif;
      cursor: pointer;
      z-index: 9999;
      box-shadow: 0px 0px 7px 3px rgba(255, 255, 255, 0.2);
    `;

    // 🧠 When the toggle button is clicked
    btn.addEventListener("click", () => {
      // Fetch the latest version of settings in case of recent updates
      chrome.storage.local.get(["xGrowthBotSettings"], (latest) => {
        const currentSettings = latest.xGrowthBotSettings || {};

        // Check if all necessary fields are set before enabling auto-tweet
        if (!currentSettings.tweetFrequency || !currentSettings.topics || !currentSettings.apiKey) {
          alert("❗ Please save all the required details (API key, topics, tweet frequency) before starting.");
          return;
        }

        // Toggle the isEnabled status
        const newStatus = !currentSettings.isEnabled;

        // Save the updated status back to local storage
        chrome.storage.sync.local({
          xGrowthBotSettings: {
            ...currentSettings,
            isEnabled: newStatus,
          }
        }, () => {
          // ✅ Log that storage has been updated
          console.log("✅ Settings updated in storage:", newStatus);
        });

        // 🔁 Send a message to the background script to toggle auto-tweeting
        chrome.runtime.sendMessage({ type: "TOGGLE_AUTO_TWEET" }, (res) => {
          console.log("📬 Background replied:", res);
        });

        // Update button text accordingly
        btn.innerText = newStatus ? "Stop Auto Tweet" : "Start Auto Tweet";
      });
    });

    // Finally, append the button to the header
    header.appendChild(btn);
  });
}


// Watch for changes in storage (e.g., triggered from popup/settings page)
// This keeps the button label in sync with the actual isEnabled state
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === "local" && changes.xGrowthBotSettings) {
    const newValue = changes.xGrowthBotSettings.newValue;
    const btn = document.getElementById("ai-toggle");
    if (btn && newValue) {
      btn.innerText = newValue.isEnabled ? "Stop Auto Tweet" : "Start Auto Tweet";
    }
  }
});



// Twitter/X uses dynamic routing (Single Page App),
// So we use a MutationObserver to keep watching when header is added or changed
const observer = new MutationObserver(() => {
  const header = document.querySelector("header");

  // Inject the button only if it's not already present
  if (header && !document.getElementById("ai-toggle")) {
    injectToggleButton();
  }
});

// Start observing the document body for new child nodes (elements)
observer.observe(document.body, {
  childList: true,
  subtree: true, // Watch deeply nested elements too
});
