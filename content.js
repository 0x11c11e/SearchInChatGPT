// Listen for messages from the background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'fillSearchText') {
    fillChatGPTInput(request.text)
  }
})

// Function to fill ChatGPT input with the selected text
function fillChatGPTInput(text) {
  // Wait for ChatGPT interface to load
  const checkInterval = setInterval(() => {
    const textArea = document.querySelector(
      "textarea[data-id='root'], textarea[tabindex='0']"
    )
    if (textArea) {
      clearInterval(checkInterval)

      // Set value and trigger input event
      textArea.value = text
      textArea.dispatchEvent(new Event('input', { bubbles: true }))

      // Focus the textarea
      textArea.focus()
    }
  }, 500)

  // Clear interval after 10 seconds to prevent infinite checking
  setTimeout(() => clearInterval(checkInterval), 10000)
}
