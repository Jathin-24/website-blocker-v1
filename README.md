Here’s a **cleaned-up and well-structured version** of your `README.md` with an improved **file structure section** and better formatting for clarity and professionalism:

---

# 🚫 Website Blocker v1 — *Focus Guardian*

A Chrome extension to help you stay focused by blocking distracting websites and keywords. It features a modern React UI, persistent settings, analytics, dark mode, and more.

---

## 🔧 Features

* ✅ Block websites by URL or keyword
* 🔐 Hide sensitive blocklists (visible only after login)
* 📊 Track site usage and view analytics
* 🎨 React-based popup and options UI
* 🌑 Dark mode toggle
* 📁 Backup and import settings
* 🔔 Sound/vibration alerts for blocked sites
* 🧠 Unlock override (password protected)
* ⚙️ Built with Webpack, Babel, and modern ES6+

---

## 🚀 How It Works

1. **Content Script** (`content.js`): Runs on each webpage to check for blocked URLs or keywords.
2. **Background Script** (`background.js`): Manages core logic and communication between components.
3. **Popup UI** (`popup.jsx`): Shows quick extension status and allows toggling features.
4. **Options Page** (`options.jsx`): Manage blocklists, passwords, dark mode, and import/export settings.
5. **Settings Storage**: Uses `chrome.storage.local` for persistent data.

---

## 🧩 Installation

### Requirements

* **Node.js** (v16+ recommended)
* **npm** or **yarn**
* **Google Chrome**

### Steps


git clone https://github.com/Jathin-24/website-blocker-v1.git
cd website-blocker-v1
npm install
npm run build

### Load in Chrome

1. Open Chrome and go to `chrome://extensions/`
2. Enable **Developer mode**
3. Click **Load unpacked**
4. Select the root directory of this project (where `manifest.json` is located)

---

## 📁 Project Structure

website-blocker-v1/
│
├── icons/                 # Extension icons
├── react-app/             # React app source files (if separated)
│
├── background.js          # Background script
├── content.js             # Content script
├── manifest.json          # Chrome extension manifest
│
├── popup.html             # Popup HTML container
├── popup.jsx              # Popup React component
│
├── options.html           # Options page HTML container
├── options.jsx            # Options React component
│
├── styles.css             # Shared/global styles
│
├── webpack.config.js      # Webpack configuration
├── package.json           # Project metadata and dependencies

---

## 🔐 Login & Password Protection

* Set a password on the **Options Page**
* Hidden blocked URLs/keywords are **only visible after login**
* Unlock override is available via the **Popup UI**

---

## 🧠 Usage Overview

* **Popup UI**: Toggle blocking, view status, unlock settings
* **Options Page**: Add/remove block entries, adjust settings, import/export
* **Analytics**: Track time spent on blocked websites

---

## 📦 Scripts

npm run build     # Build the extension with Webpack

---

## 🛠️ Tech Stack

* **React (JSX)**
* **JavaScript (ES6+)**
* **Webpack**
* **Babel**
* **Chrome Extension APIs**
* **CSS**

---

## 📄 License

MIT License — Free to use, modify, and distribute.

---

## 👨‍💻 Author

**Jathin-24**
GitHub: [@Jathin-24](https://github.com/Jathin-24)

---

## 🤝 Contributions

Contributions and suggestions are welcome!
Feel free to open an issue or submit a pull request.

---

Let me know if you'd like this turned into a `.md` file or included directly in your project.
