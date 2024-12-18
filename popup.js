document.addEventListener('DOMContentLoaded', function () {
  // Handle search button click
  document
    .getElementById('searchButton')
    .addEventListener('click', function () {
      const query = document.getElementById('searchInput').value.trim()
      if (query) {
        searchInChatGPT(query)
      }
    })
})

// Function to open ChatGPT with the query
function searchInChatGPT(query) {
  const queryUrl = `https://chatgpt.com/?q=${encodeURIComponent(query)}`
  chrome.tabs.create({ url: queryUrl })
}
