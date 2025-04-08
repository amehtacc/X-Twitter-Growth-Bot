# 🚀 XGrowthBot - Auto Tweet Generator using Gemini AI

An AI-powered Chrome extension that **automatically generates and posts tweets** based on topics you choose. It uses **Gemini API (Google)** for tweet generation and supports smart auto-tweet scheduling.

<br>

## ✨ Features

- 🧠 Uses **Google Gemini** to generate engaging tweets
- 🔄 Auto-posts tweets every X hours
- 🧵 Fully configurable topics and frequency
- 📌 Injects tweets directly into X (Twitter) and posts them automatically
- 🧪 Built with **Manifest V3**, React, and modern Chrome APIs
- 🛠️ Clean and modular codebase

<br>

## 🔧 Installation

1. Clone the repository:

```bash
git clone https://github.com/amehtacc/X-Twitter-Growth-Bot.git
cd X-Twitter-Growth-Bot
```

2. Build the extension:

```bash
npm install
npm run build
```

3. Load it in Chrome:

- Go to `chrome://extensions/`
- Enable **Developer Mode**
- Click **Load unpacked**
- Select the `dist` folder

<br>

## 🧠 How It Works

- You enter topics in the extension popup (e.g., "JavaScript", "Web3", "Startups").
- XGrowthBot uses **Gemini AI** to generate a tweet using a custom dynamic prompt.
- It injects the tweet into X (Twitter) using `chrome.scripting`.
- Optionally, it posts the tweet automatically.
- You can toggle auto-tweeting to post tweets at a regular interval (e.g., every 3 hours).

<br>

## ⚙️ Settings

Settings are saved in Chrome Storage (`local`) and include:

| Setting          | Description                                |
|------------------|--------------------------------------------|
| `apiKey`         | Your Gemini API key                        |
| `topics`         | Topics to base tweets on                   |
| `tweetFrequency` | Hours between auto-tweets (e.g., 3)        |
| `isEnabled`      | Toggle for auto-tweeting (on/off)          |

<br>

## 📁 Project Structure

```
src/
│
├── background/              # Chrome extension background logic
│   └── background.js
│
├── content/                 # Content scripts (if needed)
│   └── content.js
│
├── popup/                   # React popup UI
│   └── Popup.jsx
│
├── scripts/                 # Tweet manager logic
│   ├── auto_tweet_manager.js
│   └── tweet_executor.js
│
├── utils/                   # API and prompt utils
│   ├── gemini_api.js
│   └── prompt.js
│
├── index.css                # Popup styles
├── main.jsx                 # Entry point
├── index.html               # after build convert it into popup.html 
└── manifest.json            # Chrome Extension manifest
```

<br>

## 🔑 Setting Your Gemini API Key

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Create an API key for Gemini
3. Paste it in the extension settings (popup)

<br>

## 🚨 Permissions

This extension requires the following permissions:

- `storage` – to store settings like topics and API key
- `scripting` – to inject the tweet into Twitter's UI
- `tabs` – to access the current tab for tweet injection

<br>

## 🚀 Future Improvements

- Scheduling tweets on specific time (like 10AM daily)
- Custom prompt tweaking
- Multi-account support
- History of generated tweets
- Manual tweet approval option before posting

<br>

## 🧪 Dev Scripts

```bash
npm run dev        # Dev build
npm run build      # Production build
```

<br>

## 🙌 Contributions

PRs and issues are welcome! Let’s make this the smartest tweeting bot together.

<br>

## 🌐 Contact Information

Build with ❤️ by [Aryan Mehta](https://aryanmehta.netlify.app/) - feel free to contact me!

<br>

## 📄 License

MIT © 2025 [Aryan Mehta]

