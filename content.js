window.addEventListener('load', () => {
  // Delay to let the page load search input
  setTimeout(() => {
    // Find input fields likely to be search boxes
    const queryInputs = document.querySelectorAll('input[name="q"], input[type="search"]');
    if (!queryInputs.length) return;

    chrome.storage.local.get(['blockedKeywords', 'permanentBlockedKeywords'], (data) => {
      const allBlocked = [...(data.blockedKeywords || []), ...(data.permanentBlockedKeywords || [])];

      queryInputs.forEach(input => {
        const value = input.value.toLowerCase();
        if (allBlocked.some(keyword => value.includes(keyword.toLowerCase()))) {
          alert("This keyword is blocked.");
          // Redirect to blank page or you can do other UI blocking here
          window.location.href = "about:blank";
        }
      });
    });
  }, 2000); // 2 seconds delay for inputs to appear and be filled
});
