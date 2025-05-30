let currentTabDomain = null;
let startTime = Date.now();
let usage = {};

async function handleTabSwitch(tabId) {
  try {
    const tab = await chrome.tabs.get(tabId);
    if (!tab.url) return;

    const urlObj = new URL(tab.url);
    const domain = urlObj.hostname.replace(/^www\./, '');

    // Save time spent on previous tab/domain
    if (currentTabDomain && startTime) {
      const timeSpent = Math.floor((Date.now() - startTime) / 1000);
      usage[currentTabDomain] = (usage[currentTabDomain] || 0) + timeSpent;
      chrome.storage.local.set({ usage });
    }

    // Check if domain is blocked (including permanent blocked URLs)
    chrome.storage.local.get(['blockedUrls', 'permanentBlockedUrls'], (data) => {
      const allBlocked = [...(data.blockedUrls || []), ...(data.permanentBlockedUrls || [])];
      if (allBlocked.some(blockedDomain => domain.includes(blockedDomain))) {
        // Redirect immediately if blocked
        chrome.tabs.update(tabId, { url: "about:blank" });
        // Do not update currentTabDomain or startTime here since tab is blocked
        return;
      }
    });

    // Update current tab info
    currentTabDomain = domain;
    startTime = Date.now();

  } catch (error) {
    console.error('Error in handleTabSwitch:', error);
  }
}

chrome.tabs.onActivated.addListener(async ({ tabId }) => {
  await handleTabSwitch(tabId);
});

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (tab.active && changeInfo.status === 'complete') {
    await handleTabSwitch(tabId);
  }
});

// Handle window focus changes to track usage more accurately
chrome.windows.onFocusChanged.addListener(async (windowId) => {
  if (windowId === chrome.windows.WINDOW_ID_NONE) {
    // Window lost focus — save current usage time
    if (currentTabDomain && startTime) {
      const timeSpent = Math.floor((Date.now() - startTime) / 1000);
      usage[currentTabDomain] = (usage[currentTabDomain] || 0) + timeSpent;
      chrome.storage.local.set({ usage });
      currentTabDomain = null;
      startTime = null;
    }
  } else {
    // Window focused — find active tab in focused window
    const tabs = await chrome.tabs.query({ active: true, windowId });
    if (tabs.length > 0) {
      await handleTabSwitch(tabs[0].id);
    }
  }
});
