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

// Function to handle searching text in ChatGPT
async function searchInChatGPT(selectedText) {
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

// Handle context menu click
browser.contextMenus.onClicked.addListener(async (info) => {
  if (info.menuItemId === 'searchInChatGPT') {
    const selectedText = info.selectionText
    // Perform the search in ChatGPT
    await searchInChatGPT(selectedText)
  }
})
