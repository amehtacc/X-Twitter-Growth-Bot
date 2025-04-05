import React, { useState } from "react";
import { Save, Power } from "lucide-react";
import SaveImage from "../assets/save.png";

function Popup() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [tweetFrequency, setTweetFrequency] = useState();
  const [topics, setTopics] = useState("");

  function handleFrequency(e) {
    setTweetFrequency(e.target.value);
  }

  function handleStart() {
    setIsEnabled(!isEnabled)
  }
  return (
    <div className="w-[350px] bg-white text-gray-900 p-4 flex flex-col gap-4">
      <div className="text-center pb-2 border-b border-gray-200">
        <h1 className="text-xl font-bold">X Growth Bot</h1>
        <p className="text-xs text-gray-500">
          Automate & Grow Your Twitter Effortlessly
        </p>
      </div>

      <div className="flex justify-between items-center">
        <span
          className={`border border-gray-500 py-1 px-3 text-xs font-bold rounded-2xl ${
            isEnabled ? "text-white border-transparent bg-green-500 hover:bg-green-600 transition-all duration-200" : ""
          }`}
        >
          {isEnabled ? "Bot is Active" : "Bot is Disabled"}
        </span>
        <button
        onClick={handleStart}
          className={`flex justify-center items-center gap-2 py-2 px-3 cursor-pointer font-semibold rounded-lg text-white ${
            isEnabled ? "bg-red-500" : "bg-gray-900"
          }`}
        >
          <Power className="w-4 h-4" />
          {isEnabled ? "Stop" : "Start"}
        </button>
      </div>

      <div className="flex flex-col gap-2 mt-1">
        <label htmlFor="tweet-frequency" className="text-sm font-medium">
          Tweet Frequency
        </label>
        <select
          className="border border-gray-300 rounded-lg p-2 outline-none"
          value={tweetFrequency}
          name=""
          id="tweet-frequency"
          onChange={handleFrequency}
        >
          <option value="Every 3h">Every 3h</option>
          <option value="Every 6h">Every 6h</option>
          <option value="Every 12h">Every 12h</option>
        </select>
      </div>

      <div className="flex flex-col gap-2 mt-1">
        <label htmlFor="topics" className="text-sm font-medium">
          Topics (comma-separated)
        </label>
        <input
          className="border border-gray-300 rounded-lg py-2 px-3 outline-none"
          type="text"
          id="topics"
          placeholder="tech, programming, ai"
          value={topics}
          onChange={(e) => setTopics(e.target.value)}
        />
      </div>

      <div>
        <button className="bg-gray-900 flex justify-center items-center gap-2 text-white w-full mt-5 cursor-pointer text-sm rounded-lg py-2 px-3 font-semibold hover:bg-gray-900/90 transition-all duration-200">
          <Save className="w-4 h-4" />
          Save Settings
        </button>
      </div>
    </div>
  );
}

export default Popup;
