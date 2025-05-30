let currentTab = null;
let startTime = Date.now();
let usage = {};

chrome.tabs.onActivated.addListener(async (activeInfo) => {
  await handleTabSwitch(activeInfo.tabId);
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tab.active && changeInfo.status === 'complete') {
    handleTabSwitch(tabId);
  }
});

async function handleTabSwitch(tabId) {
  const tab = await chrome.tabs.get(tabId);
  const url = new URL(tab.url);
  const domain = url.hostname;

  if (currentTab) {
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    usage[currentTab] = (usage[currentTab] || 0) + timeSpent;
    chrome.storage.local.set({ usage });
  }

  chrome.storage.local.get(['blockedUrls', 'permanentBlockedUrls'], (data) => {
    const allBlocked = [...(data.blockedUrls || []), ...(data.permanentBlockedUrls || [])];
    if (allBlocked.some(b => domain.includes(b))) {
      chrome.tabs.update(tabId, { url: "about:blank" });
    }
  });

  currentTab = domain;
  startTime = Date.now();
}