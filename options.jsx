import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

function Options() {
  const [urls, setUrls] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [inputUrl, setInputUrl] = useState("");
  const [inputKeyword, setInputKeyword] = useState("");

  useEffect(() => {
    chrome.storage.local.get(["blockedUrls", "blockedKeywords"], (data) => {
      setUrls(data.blockedUrls || []);
      setKeywords(data.blockedKeywords || []);
    });
  }, []);

  const addUrl = () => {
    const trimmed = inputUrl.trim().toLowerCase();
    if (trimmed && !urls.includes(trimmed)) {
      const newUrls = [...urls, trimmed];
      chrome.storage.local.set({ blockedUrls: newUrls });
      setUrls(newUrls);
      setInputUrl("");
    }
  };

  const addKeyword = () => {
    const trimmed = inputKeyword.trim().toLowerCase();
    if (trimmed && !keywords.includes(trimmed)) {
      const newKeywords = [...keywords, trimmed];
      chrome.storage.local.set({ blockedKeywords: newKeywords });
      setKeywords(newKeywords);
      setInputKeyword("");
    }
  };

  const removeUrl = (url) => {
    const newUrls = urls.filter((u) => u !== url);
    chrome.storage.local.set({ blockedUrls: newUrls });
    setUrls(newUrls);
  };

  const removeKeyword = (kw) => {
    const newKeywords = keywords.filter((k) => k !== kw);
    chrome.storage.local.set({ blockedKeywords: newKeywords });
    setKeywords(newKeywords);
  };

  const exportSettings = () => {
    chrome.storage.local.get(null, (data) => {
      const blob = new Blob([JSON.stringify(data)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "focus_guardian_settings.json";
      a.click();
    });
  };

  const importSettings = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = JSON.parse(event.target.result);
      chrome.storage.local.set(data);
      alert("Settings imported. Please reload the extension.");
    };
    reader.readAsText(file);
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial, sans-serif" }}>
      <h2>Block Sites</h2>
      <input
        value={inputUrl}
        onChange={(e) => setInputUrl(e.target.value)}
        placeholder="example.com"
        onKeyDown={(e) => e.key === "Enter" && addUrl()}
        style={{ width: 300, marginRight: 8 }}
      />
      <button onClick={addUrl}>Add URL</button>
      <ul>
        {urls.map((url) => (
          <li key={url}>
            {url}{" "}
            <button onClick={() => removeUrl(url)} style={{ color: "red", cursor: "pointer" }}>
              Remove
            </button>
          </li>
        ))}
      </ul>

      <h2>Block Keywords</h2>
      <input
        value={inputKeyword}
        onChange={(e) => setInputKeyword(e.target.value)}
        placeholder="keyword"
        onKeyDown={(e) => e.key === "Enter" && addKeyword()}
        style={{ width: 300, marginRight: 8 }}
      />
      <button onClick={addKeyword}>Add Keyword</button>
      <ul>
        {keywords.map((kw) => (
          <li key={kw}>
            {kw}{" "}
            <button onClick={() => removeKeyword(kw)} style={{ color: "red", cursor: "pointer" }}>
              Remove
            </button>
          </li>
        ))}
      </ul>

      <h2>Settings</h2>
      <button onClick={exportSettings}>Export</button>
      <input type="file" onChange={importSettings} style={{ marginLeft: 10 }} />
    </div>
  );
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<Options />);