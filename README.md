# 🚀 SearchInChatGPT Extension

SearchInChatGPT is a lightweight browser extension that allows you to quickly search highlighted text directly in ChatGPT. Simplify your workflow with instant access to AI assistance from any webpage.

## ✨ Features

- 🔍 **Search Highlighted Text**: Select text on any webpage, right-click, and search directly in ChatGPT.
- ⌨️ **Keyboard Shortcuts**: Use `Ctrl+Shift+S` (Windows) or `Command+Shift+S` (Mac) to initiate a search instantly.
- 🌟 **Simple Popup Interface**: Enter custom queries directly from the popup for personalized searches.

## ⚙️ Installation

1. Clone this repository:

   ```bash
   git clone <https://github.com/your-username/SearchInChatGPT.git>
   ```

2. Open your browser and navigate to the extensions page:
   - **Chrome**: `chrome://extensions`
   - **Firefox**: `about:addons`
3. Enable **Developer Mode** (if applicable).
4. Click **Load unpacked** or **Install Add-on from File**.
5. Select the cloned folder and upload the extension.

## 🛠️ Usage

1. Highlight any text on a webpage.
2. Right-click and select **Search in ChatGPT** from the context menu.
3. Use the popup to enter custom queries manually.
4. Alternatively, use the keyboard shortcut to search instantly.

## 📂 File Overview

- **manifest.json**: Defines the extension's metadata and permissions.
- **background.js**: Handles background tasks, such as context menu creation and search logic.
- **content.js**: Interacts with the ChatGPT interface to input and submit text.
- **popup.html**: The user interface for entering and managing search queries.
- **popup.js**: Controls the functionality of the popup interface.
- **styles.css**: Styles the popup UI.
- **browser-polyfill.min.js**: Ensures compatibility with multiple browsers.

## 🤝 Contributing

1. 🍴 Fork the repository.
2. 🌱 Create a new branch:

   ```bash
   git checkout -b feature-branch-name
   ```

3. 🖊️ Commit your changes:

   ```bash
   git commit -m "Add feature or fix description"
   ```

4. 📤 Push to your branch:

   ```bash
   git push origin feature-branch-name
   ```

5. 🔄 Open a Pull Request.

## 📜 License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

Made with ❤️ by Iman Reihanian
