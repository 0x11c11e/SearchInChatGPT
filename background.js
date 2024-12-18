// Load the polyfill
importScripts('browser-polyfill.min.js')

// Create context menu item when the extension is installed
browser.runtime.onInstalled.addListener(() => {
  browser.contextMenus.removeAll().then(() => {
    browser.contextMenus.create({
      id: 'searchInChatGPT',
      title: 'Search in ChatGPT',
      contexts: ['selection'],
    })
  })
})

// Function to save search to history
async function saveToHistory(text) {
  const result = await browser.storage.local.get('searchHistory')
  const history = result.searchHistory || []

  // Add new search to the beginning of the array
  history.unshift({
    text: text,
    timestamp: new Date().toISOString(),
  })

  // Keep only the last 20 searches
  const trimmedHistory = history.slice(0, 20)

  await browser.storage.local.set({ searchHistory: trimmedHistory })
}

// Function to handle searching text in ChatGPT
async function searchInChatGPT(selectedText) {
  // Save search to history
  await saveToHistory(selectedText)

  // Construct the query URL
  const queryUrl = `https://chatgpt.com/?q=${encodeURIComponent(selectedText)}`

  // Check if a ChatGPT tab already exists
  const chatGPTTabs = await browser.tabs.query({
    url: 'https://chatgpt.com/*',
  })

  if (chatGPTTabs.length > 0) {
    // If a ChatGPT tab exists, update it with the query URL and activate it
    const chatGPTTab = chatGPTTabs[0]
    await browser.tabs.update(chatGPTTab.id, { url: queryUrl, active: true })
  } else {
    // If no ChatGPT tab exists, create a new one with the query URL
    await browser.tabs.create({ url: queryUrl })
  }
}

// Handle keyboard command
chrome.commands.onCommand.addListener(async (command) => {
  if (command === 'search-in-chatgpt') {
    // Get the active tab
    const [activeTab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    })

    // Execute script to get the selected text
    const [{ result }] = await chrome.scripting.executeScript({
      target: { tabId: activeTab.id },
      function: () => window.getSelection().toString(),
    })

    if (result) {
      await searchInChatGPT(result)
    }
  }
})

// Handle context menu click
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === 'searchInChatGPT') {
    const selectedText = info.selectionText

    // Perform the search in ChatGPT
    await searchInChatGPT(selectedText)
  }
})

// Listen for messages from popup
browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'searchFromHistory') {
    searchInChatGPT(request.text)
  }
})
