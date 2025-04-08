// Importing necessary React hooks and external libraries
import React, { useEffect, useState } from "react";
import { Save, Power } from "lucide-react"; // Icon components
import { toast } from "react-toastify"; // Notification/toast alerts

// Popup component for Chrome Extension settings UI
function Popup() {
  // State variables for settings and input values
  const [isEnabled, setIsEnabled] = useState(false); // Toggle for bot status
  const [tweetFrequency, setTweetFrequency] = useState(""); // Tweet interval
  const [topics, setTopics] = useState(""); // Tweet topics
  const [apiKey, setApiKey] = useState(""); // Gemini API key
  const [viewPassword, setViewPassword] = useState(false); // Show/hide API key

  // Handles tweet frequency dropdown change
  function handleFrequency(e) {
    setTweetFrequency(e.target.value);
  }

  // Handles API key input change
  function handleApiKey(e) {
    setApiKey(e.target.value);
  }

  // Save all user settings to Chrome sync storage or localStorage
  function saveSettings() {
    if (!tweetFrequency || !topics) {
      toast.error("Oops! Don't forget to fill in all the fields before saving.");
      return;
    }

    if (!apiKey) {
      toast.error("Please enter your Gemini API Key (It's Free)");
      return;
    }

    const settings = { tweetFrequency, topics, apiKey, isEnabled };

    try {
      // Save settings in Chrome sync storage if available
      if (chrome?.storage?.local) {
        chrome.storage.local.set({ xGrowthBotSettings: settings }, () => {
          toast.success("Settings saved! ✅");
        });
      } else {
        // Fallback to localStorage
        localStorage.setItem("xGrowthBotSettings", JSON.stringify(settings));
        toast.success("Settings saved locally ✅");
      }
    } catch (err) {
      console.error("Failed to save settings:", err);
      toast.error("Failed to save settings.");
    }
  }

  // Toggles the bot enable/disable state
  function handleIsEnable() {
    const updateEnabledStatus = (settings) => {
      if (!settings.tweetFrequency || !settings.topics || !settings.apiKey) {
        toast.error("Oops! Don't forget to save all the details before start.");
        return;
      }

      const newStatus = !isEnabled;
      setIsEnabled(newStatus);
      toast(newStatus ? "Bot is active! ✅" : "Bot is Disabled!");

      const updated = { ...settings, isEnabled: newStatus };

      try {
        if (chrome?.storage?.local) {
          chrome.storage.local.set({ xGrowthBotSettings: updated });
        } else {
          localStorage.setItem("xGrowthBotSettings", JSON.stringify(updated));
        }
      } catch (err) {
        console.error("Failed to update isEnabled:", err);
      }
    };

    // Get existing settings to update isEnabled status
    if (chrome?.storage?.local) {
      chrome.storage.local.get("xGrowthBotSettings", (result) => {
        updateEnabledStatus(result.xGrowthBotSettings || {});
      });
    } else {
      const settings = JSON.parse(localStorage.getItem("xGrowthBotSettings")) || {};
      updateEnabledStatus(settings);
    }
  }

  // Load saved settings from Chrome sync/localStorage on mount
  useEffect(() => {
    try {
      if (chrome?.storage?.local) {
        chrome.storage.local.get("xGrowthBotSettings", (result) => {
          const savedSettings = result?.xGrowthBotSettings;
          if (savedSettings) {
            setIsEnabled(savedSettings.isEnabled || false);
            setTweetFrequency(savedSettings.tweetFrequency || "");
            setTopics(savedSettings.topics || "");
            setApiKey(savedSettings.apiKey || "");
          }
        });
      } else {
        const savedSettings = JSON.parse(localStorage.getItem("xGrowthBotSettings"));
        if (savedSettings) {
          setIsEnabled(savedSettings.isEnabled || false);
          setTweetFrequency(savedSettings.tweetFrequency || "");
          setTopics(savedSettings.topics || "");
          setApiKey(savedSettings.apiKey || "");
        }
      }
    } catch (err) {
      console.error("Failed to parse settings:", err);
    }
  }, []);

  // UI for the settings popup
  return (
    <div className="w-[350px] bg-white text-gray-900 p-7 rounded-xl flex flex-col gap-4 border-2 border-gray-300">
      {/* Header */}
      <div className="text-center pb-2 border-b border-gray-200">
        <h1 className="text-xl font-bold">X Growth Bot</h1>
        <p className="text-xs text-gray-500">
          Automate & Grow Your Twitter Effortlessly
        </p>
      </div>

      {/* Bot status and toggle button */}
      <div className="flex justify-between items-center">
        <span
          className={`border border-gray-500 py-1 px-3 text-xs font-bold rounded-2xl ${
            isEnabled
              ? "text-white border-transparent bg-green-500 hover:bg-green-600 transition-all duration-200"
              : ""
          }`}
        >
          {isEnabled ? "Bot is Active" : "Bot is Disabled"}
        </span>
        <button
          onClick={handleIsEnable}
          className={`flex justify-center items-center gap-2 py-2 px-3 cursor-pointer font-semibold rounded-lg text-white transition-all duration-200 ${
            isEnabled
              ? "bg-red-500 hover:bg-red-500/90"
              : "bg-gray-900 hover:bg-gray-900/90"
          }`}
        >
          <Power className="w-4 h-4" />
          {isEnabled ? "Stop" : "Start"}
        </button>
      </div>

      {/* Tweet frequency selector */}
      <div className="flex flex-col gap-2 mt-1">
        <label htmlFor="tweet-frequency" className="text-sm font-medium">
          Tweet Frequency
        </label>
        <select
          className="border border-gray-300 rounded-lg p-2 outline-none text-sm"
          value={tweetFrequency}
          id="tweet-frequency"
          onChange={handleFrequency}
          placeholder="Select tweet frequency"
        >
          <option value="" disabled hidden>
            Select tweet frequency
          </option>
          <option value="3">Every 3 hours</option>
          <option value="6">Every 6 hours</option>
          <option value="12">Every 12 hours</option>
        </select>
      </div>

      {/* Topics input */}
      <div className="flex flex-col gap-2 mt-1">
        <label htmlFor="topics" className="text-sm font-medium">
          Topics (comma-separated)
        </label>
        <input
          className="border border-gray-300 rounded-lg py-2 px-3 outline-none text-sm"
          type="text"
          id="topics"
          placeholder="tech, programming, ai"
          value={topics}
          onChange={(e) => setTopics(e.target.value)}
        />
      </div>

      {/* API key input with show/hide toggle */}
      <div className="flex flex-col gap-2 mt-1">
        <div className="flex justify-between items-center">
          <label htmlFor="api-key" className="text-sm font-medium">
            Gemini API Key
          </label>
          <a
            className="text-xs font-semibold text-blue-600 hover:text-blue-500 transition-all duration-200 underline"
            href="https://ai.google.dev/gemini-api/docs/api-key"
            target="_blank"
          >
            Need help?
          </a>
        </div>

        <div className="relative flex items-center">
          <input
            className="w-full border border-gray-300 rounded-lg py-2 pl-3 pr-14 outline-none text-sm"
            type={viewPassword ? "text" : "password"}
            id="api-key"
            placeholder="Paste your Gemini API Key here..."
            value={apiKey}
            onChange={handleApiKey}
            autoComplete="off"
          />
          <button
            type="button"
            onClick={() => setViewPassword(!viewPassword)}
            className="absolute right-3 text-sm font-semibold cursor-pointer text-gray-500 hover:text-gray-700 transition-all duration-200"
          >
            {viewPassword ? "Hide" : "Show"}
          </button>
        </div>
      </div>

      {/* Save settings button */}
      <div>
        <button
          onClick={saveSettings}
          className="bg-gray-900 flex justify-center items-center gap-2 text-white w-full mt-5 cursor-pointer text-sm rounded-lg py-2 px-3 font-semibold hover:bg-gray-900/90 transition-all duration-200"
        >
          <Save className="w-4 h-4" />
          Save Settings
        </button>
      </div>
    </div>
  );
}

export default Popup;
