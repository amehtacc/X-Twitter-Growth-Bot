console.log("✅ Content script loaded");

function injectToggleButton() {
  const header = document.querySelector("header");
  if (!header || document.getElementById("ai-toggle")) return;

  chrome.storage.sync.get(["xGrowthBotSettings"], (result) => {
    const settings = result.xGrowthBotSettings || {};
    let isEnabled = settings.isEnabled || false;

    const btn = document.createElement("button");
    btn.innerText = isEnabled ? "Stop Auto Tweet" : "Start Auto Tweet";
    btn.id = "ai-toggle";
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

    btn.addEventListener("click", () => {
      // Refetch latest settings before acting
      chrome.storage.sync.get(["xGrowthBotSettings"], (latest) => {
        const currentSettings = latest.xGrowthBotSettings || {};

        if (!currentSettings.tweetFrequency || !currentSettings.topics || !currentSettings.apiKey) {
          alert("❗ Please save all the required details (API key, topics, tweet frequency) before starting.");
          return;
        }

        const newStatus = !currentSettings.isEnabled;

        chrome.storage.sync.set({
          xGrowthBotSettings: {
            ...currentSettings,
            isEnabled: newStatus,
          }
        }, () => {
          console.log("✅ Settings updated in storage:", newStatus);
        });

        chrome.runtime.sendMessage({ type: "TOGGLE_AUTO_TWEET" }, (res) => {
          console.log("📬 Background replied:", res);
        });

        btn.innerText = newStatus ? "Stop Auto Tweet" : "Start Auto Tweet";
      });
    });

    header.appendChild(btn);
  });
}

// Listen for changes in storage and update the button label accordingly
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === "sync" && changes.xGrowthBotSettings) {
    const newValue = changes.xGrowthBotSettings.newValue;
    const btn = document.getElementById("ai-toggle");
    if (btn && newValue) {
      btn.innerText = newValue.isEnabled ? "Stop Auto Tweet" : "Start Auto Tweet";
    }
  }
});

// Observer for dynamic Twitter content
const observer = new MutationObserver(() => {
  const header = document.querySelector("header");
  if (header && !document.getElementById("ai-toggle")) {
    injectToggleButton();
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});
