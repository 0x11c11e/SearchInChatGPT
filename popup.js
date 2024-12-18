document.addEventListener('DOMContentLoaded', function () {
  displaySearchHistory()
  displayTemplates()

  // Handle clear history button
  document
    .getElementById('clearHistory')
    .addEventListener('click', function () {
      browser.storage.local.set({ searchHistory: [] }).then(() => {
        displaySearchHistory()
      })
    })

  // Handle add template button
  document.getElementById('addTemplate').addEventListener('click', function () {
    showTemplateModal()
  })
})

// Display search history from storage
function displaySearchHistory() {
  const historyContainer = document.getElementById('searchHistory')
  const emptyMessage = document.getElementById('emptySearchMessage')

  // Get search history from storage
  browser.storage.local
    .get('searchHistory')
    .then((data) => {
      console.log('Retrieved search history:', data) // Debug log

      const history = data.searchHistory || []

      // Clear existing content except empty message
      Array.from(historyContainer.children).forEach((child) => {
        if (child.id !== 'emptySearchMessage') {
          child.remove()
        }
      })

      if (!history || history.length === 0) {
        emptyMessage.style.display = 'block'
        return
      }

      emptyMessage.style.display = 'none'
      history.reverse().forEach((entry) => {
        const text = entry.text // Adjusted to access `text` property
        const item = document.createElement('div')
        item.className = 'history-item'
        item.textContent = text
        item.addEventListener('click', () => {
          handleHistoryClick(text)
        })
        historyContainer.insertBefore(item, emptyMessage)
      })
    })
    .catch((error) => {
      console.error('Error loading search history:', error)
      emptyMessage.style.display = 'block'
      emptyMessage.textContent = 'Error loading search history'
    })
}

// Template Management Functions
function displayTemplates() {
  const templateList = document.getElementById('templateList')

  browser.storage.local.get('templates').then((result) => {
    const templates = result.templates || []

    if (templates.length === 0) {
      templateList.innerHTML = '<p class="template-item">No templates added</p>'
      return
    }

    templateList.innerHTML = templates
      .map(
        (template) => `
          <div class="template-item">
            <div class="template-text">
              <strong>${template.name}</strong>
              <div>${template.text}</div>
            </div>
            <span class="delete-template" data-name="${template.name}">×</span>
          </div>
        `
      )
      .join('')

    // Add click handlers for delete buttons
    document.querySelectorAll('.delete-template').forEach((button) => {
      button.addEventListener('click', function () {
        deleteTemplate(this.dataset.name)
      })
    })
  })
}

function showTemplateModal() {
  document.getElementById('templateModal').classList.add('show')
  document.getElementById('templateName').value = ''
  document.getElementById('templateText').value = ''

  document.getElementById('cancelTemplate').onclick = function () {
    document.getElementById('templateModal').classList.remove('show')
  }

  document.getElementById('saveTemplate').onclick = function () {
    const name = document.getElementById('templateName').value.trim()
    const text = document.getElementById('templateText').value.trim()

    if (name && text) {
      saveTemplate(name, text)
      document.getElementById('templateModal').classList.remove('show')
    }
  }
}

async function saveTemplate(name, text) {
  const result = await browser.storage.local.get('templates')
  const templates = result.templates || []

  templates.push({ name, text })

  await browser.storage.local.set({ templates })
  displayTemplates()
}

async function deleteTemplate(name) {
  const result = await browser.storage.local.get('templates')
  const templates = result.templates || []

  const updatedTemplates = templates.filter((t) => t.name !== name)

  await browser.storage.local.set({ templates: updatedTemplates })
  displayTemplates()
}

// Update history item click handler to show template selection
function handleHistoryClick(text) {
  browser.storage.local.get('templates').then((result) => {
    const templates = result.templates || []
    if (templates.length > 0) {
      const templateText = templates[0].text.replace('{text}', text)
      browser.runtime.sendMessage({
        action: 'searchFromHistory',
        text: templateText,
      })
    } else {
      browser.runtime.sendMessage({
        action: 'searchFromHistory',
        text,
      })
    }
  })
}

// Save search to history
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
