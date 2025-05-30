# 🚫 Website Blocker v1 (Focus Guardian)

A Chrome extension that helps you stay focused by blocking distracting websites and keywords. Includes a modern React UI, persistent settings, analytics, dark mode, and more.

---

## 🔧 Features

- ✅ Block websites by URL or keyword
- 🔐 Hide sensitive blocklists (only visible after login)
- 📊 Track site usage and view analytics
- 🎨 React-based popup and options UI
- 🌑 Dark mode toggle
- 📁 Backup and import settings
- 🔔 Sound/vibration alerts for blocked sites
- 🧠 Unlock override (password protected)
- ⚙️ Built with Webpack, Babel, and modern ES6+

---

## 🚀 How It Works

1. **Content Script (`content.js`)** runs on each webpage and checks if the current URL or content contains blocked keywords.
2. **Background Script (`background.js`)** manages communication and enforces site-blocking logic.
3. **Popup UI (`popup.jsx`)** provides quick view of the extension status and toggle features.
4. **Options Page (`options.jsx`)** allows you to:
   - Add/remove blocked URLs/keywords
   - Set password
   - Enable dark mode
   - Export/import your settings
5. **Settings are stored** in `chrome.storage.local` for persistence.

---

## 🧩 Installation

### Requirements

- Node.js (v16+ recommended)
- npm or yarn
- Chrome browser

### 1. Clone the repository

git clone https://github.com/Jathin-24/website-blocker-v1.git
cd website-blocker-v1
2. Install dependencies
npm install
3. Build the extension
npm run build
This will compile the React components and output the bundled code into the /dist directory (based on your webpack.config.js).

🌐 Load Extension in Chrome
Open Chrome and go to chrome://extensions/

Enable Developer mode

Click "Load unpacked"

Select the root directory of this project (where manifest.json is located)

📁 Project Structure
website-blocker-v1/
│
├── icons/                  # Extension icons
├── react-app/              # React app source files (if separated)
│
├── background.js           # Background script
├── content.js              # Content script
├── manifest.json           # Chrome extension manifest
├── popup.html              # HTML container for popup
├── popup.jsx               # React-based popup
├── options.html            # HTML container for options page
├── options.jsx             # React-based settings page
├── styles.css              # Global styles
│
├── package.json            # Project metadata and dependencies
├── webpack.config.js       # Webpack bundler config

🔐 Login & Password Protection
You can set a password in the Options page

Blocked URLs and keywords are hidden unless you're logged in

Unlock feature available from the popup (if enabled)

🧠 Usage
🧩 Popup UI: View current status, enable/disable blocking, access unlock

⚙️ Options Page: Add/remove URLs/keywords, change settings, export/import preferences

📊 Analytics: Track how much time you spend on blocked websites

📦 Scripts
npm run build	 - Bundle the extension with Webpack

📌 Tech Stack
React (with JSX)
JavaScript (ES6+)
Webpack
Chrome Extension APIs
Babel
CSS

📄 License
MIT License. Free to use, modify, and distribute.

👨‍💻 Author
Jathin-24
GitHub: @Jathin-24

🤝 Contributions
Feel free to submit pull requests or open issues to suggest features or improvements.

