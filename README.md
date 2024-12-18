# 🚀 SearchInChatGPT Extension

SearchInChatGPT is a browser extension designed to enhance your workflow by enabling quick searches of highlighted text directly in ChatGPT. It integrates seamlessly with popular browsers and provides a user-friendly interface to search and manage queries efficiently.

## ✨ Features

- 🔍 **Search Highlighted Text**: Quickly search any selected text in ChatGPT using the context menu or keyboard shortcuts.
- 🕒 **Search History**: Automatically saves your search history for future reference (up to 20 recent searches).
- 📝 **Customizable Templates**: Add and manage search templates to customize how text is sent to ChatGPT.
- ⌨️ **Keyboard Shortcuts**: Use `Ctrl+Shift+S` (Windows) or `Command+Shift+S` (Mac) for instant searches.
- 💡 **Lightweight UI**: Clean and intuitive popup for managing searches and templates.

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
3. Alternatively, use the keyboard shortcut to open ChatGPT with the selected text.
4. View your search history and manage templates from the extension popup.

## 📂 File Overview

- **manifest.json**: Defines the extension's metadata and permissions.
- **background.js**: Handles background tasks, such as context menu creation and search logic.
- **content.js**: Interacts with the ChatGPT interface to input and submit text.
- **popup.html**: The user interface for managing search history and templates.
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

Made with ❤️ by the SearchInChatGPT Team.  
**Developer**: 👨‍💻 Iman Reihanian
