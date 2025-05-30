function getDomain(url) {
  try {
    const u = new URL(url);
    return u.hostname.replace("www.", "");
  } catch {
    return "";
  }
}

// Block page content with message
function blockPage(message) {
  document.documentElement.innerHTML = `<body style="display:flex;align-items:center;justify-content:center;height:100vh;font-family:sans-serif;">
    <h1>${message}</h1>
  </body>`;
  document.title = "Blocked by Focus Guardian";
}

// Main blocking logic
chrome.storage.local.get(["blockedUrls", "blockedKeywords"], (data) => {
  const blockedUrls = data.blockedUrls || [];
  const blockedKeywords = data.blockedKeywords || [];

  const domain = getDomain(window.location.href);

  // Check blocked URLs (simple contains check)
  for (const blockedUrl of blockedUrls) {
    if (domain.includes(blockedUrl)) {
      blockPage(`Access to ${blockedUrl} is blocked by Focus Guardian.`);
      return;
    }
  }

  // Check blocked keywords inside body text
  if (blockedKeywords.length > 0) {
    const bodyText = document.body.innerText.toLowerCase();
    for (const kw of blockedKeywords) {
      if (bodyText.includes(kw.toLowerCase())) {
        blockPage(`Page blocked due to forbidden keyword: "${kw}"`);
        return;
      }
    }
  }
});
