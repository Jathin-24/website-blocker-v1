import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

const DEFAULT_PASSWORD = "focus123";

function Options() {
  const [urls, setUrls] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [hiddenUrls, setHiddenUrls] = useState([]);
  const [hiddenKeywords, setHiddenKeywords] = useState([]);

  const [inputUrl, setInputUrl] = useState("");
  const [inputKeyword, setInputKeyword] = useState("");

  const [loggedIn, setLoggedIn] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordChangeMessage, setPasswordChangeMessage] = useState("");

  useEffect(() => {
    chrome.storage.local.get(
      [
        "blockedUrls",
        "blockedKeywords",
        "hiddenUrls",
        "hiddenKeywords",
        "focusPassword",
      ],
      (data) => {
        setUrls(data.blockedUrls || []);
        setKeywords(data.blockedKeywords || []);
        setHiddenUrls(data.hiddenUrls || []);
        setHiddenKeywords(data.hiddenKeywords || []);
        if (!data.focusPassword) {
          chrome.storage.local.set({ focusPassword: DEFAULT_PASSWORD });
        }
      }
    );
  }, []);

  const addUrl = () => {
    const trimmed = inputUrl.trim().toLowerCase();
    if (trimmed && !urls.includes(trimmed) && !hiddenUrls.includes(trimmed)) {
      const newUrls = [...urls, trimmed];
      chrome.storage.local.set({ blockedUrls: newUrls });
      setUrls(newUrls);
      setInputUrl("");
    }
  };

  const addKeyword = () => {
    const trimmed = inputKeyword.trim().toLowerCase();
    if (trimmed && !keywords.includes(trimmed) && !hiddenKeywords.includes(trimmed)) {
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

  const hideUrl = (url) => {
    const newUrls = urls.filter((u) => u !== url);
    const newHiddenUrls = [...hiddenUrls, url];
    chrome.storage.local.set({ blockedUrls: newUrls, hiddenUrls: newHiddenUrls });
    setUrls(newUrls);
    setHiddenUrls(newHiddenUrls);
  };

  const hideKeyword = (kw) => {
    const newKeywords = keywords.filter((k) => k !== kw);
    const newHiddenKeywords = [...hiddenKeywords, kw];
    chrome.storage.local.set({ blockedKeywords: newKeywords, hiddenKeywords: newHiddenKeywords });
    setKeywords(newKeywords);
    setHiddenKeywords(newHiddenKeywords);
  };

  const unhideUrl = (url) => {
    const newHiddenUrls = hiddenUrls.filter((u) => u !== url);
    const newUrls = [...urls, url];
    chrome.storage.local.set({ blockedUrls: newUrls, hiddenUrls: newHiddenUrls });
    setUrls(newUrls);
    setHiddenUrls(newHiddenUrls);
  };

  const unhideKeyword = (kw) => {
    const newHiddenKeywords = hiddenKeywords.filter((k) => k !== kw);
    const newKeywords = [...keywords, kw];
    chrome.storage.local.set({ blockedKeywords: newKeywords, hiddenKeywords: newHiddenKeywords });
    setKeywords(newKeywords);
    setHiddenKeywords(newHiddenKeywords);
  };

  const removeHiddenUrl = (url) => {
    if (!loggedIn) return alert("Please login to remove hidden items.");
    const newHiddenUrls = hiddenUrls.filter((u) => u !== url);
    chrome.storage.local.set({ hiddenUrls: newHiddenUrls });
    setHiddenUrls(newHiddenUrls);
  };

  const removeHiddenKeyword = (kw) => {
    if (!loggedIn) return alert("Please login to remove hidden items.");
    const newHiddenKeywords = hiddenKeywords.filter((k) => k !== kw);
    chrome.storage.local.set({ hiddenKeywords: newHiddenKeywords });
    setHiddenKeywords(newHiddenKeywords);
  };

  const exportSettings = () => {
    chrome.storage.local.get(null, (data) => {
      const blob = new Blob([JSON.stringify(data)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "focus_guardian_settings.json";
      a.click();
      URL.revokeObjectURL(url);
    });
  };

  const importSettings = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        chrome.storage.local.set(data, () => {
          alert("Settings imported. Please reload the extension.");
          window.location.reload();
        });
      } catch {
        alert("Invalid settings file.");
      }
    };
    reader.readAsText(file);
  };

  const handleLogin = () => {
    chrome.storage.local.get("focusPassword", (data) => {
      if (passwordInput === data.focusPassword) {
        setLoggedIn(true);
        setLoginError("");
        setPasswordInput("");
      } else {
        setLoginError("Incorrect password");
      }
    });
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  const handleChangePassword = () => {
    if (!newPassword || newPassword !== confirmPassword) {
      setPasswordChangeMessage("Passwords do not match or are empty.");
      return;
    }
    chrome.storage.local.set({ focusPassword: newPassword }, () => {
      setPasswordChangeMessage("Password changed successfully.");
      setNewPassword("");
      setConfirmPassword("");
    });
  };

  // Basic styles inline for simplicity
  const styles = {
    container: { padding: 20, fontFamily: "Arial, sans-serif", maxWidth: 600, margin: "auto" },
    section: { marginBottom: 30 },
    heading: { color: "#2c3e50" },
    input: { width: 300, marginRight: 8, padding: 6, fontSize: 14 },
    button: {
      padding: "6px 12px",
      fontSize: 14,
      cursor: "pointer",
      marginRight: 8,
      borderRadius: 4,
      border: "1px solid #2980b9",
      backgroundColor: "#3498db",
      color: "white",
    },
    buttonRed: {
      backgroundColor: "#e74c3c",
      border: "1px solid #c0392b",
    },
    listItem: { marginBottom: 6, display: "flex", alignItems: "center", justifyContent: "space-between" },
    buttonSmall: {
      fontSize: 12,
      padding: "3px 6px",
      marginLeft: 8,
      cursor: "pointer",
      borderRadius: 4,
      border: "1px solid #7f8c8d",
      backgroundColor: "#bdc3c7",
      color: "#2c3e50",
    },
    errorText: { color: "red", marginTop: 8 },
    loginBox: { marginBottom: 20, border: "1px solid #ccc", padding: 15, borderRadius: 5, backgroundColor: "#f9f9f9" },
  };

  return (
    <div style={styles.container}>
      <h1 style={{ color: "#34495e", textAlign: "center" }}>Focus Guardian Settings</h1>

      {/* Login Section */}
      {!loggedIn ? (
        <div style={styles.loginBox}>
          <h3>Login to manage hidden items</h3>
          <input
            type="password"
            placeholder="Enter password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            style={styles.input}
          />
          <button onClick={handleLogin} style={styles.button}>
            Login
          </button>
          {loginError && <div style={styles.errorText}>{loginError}</div>}
        </div>
      ) : (
        <div style={{ marginBottom: 20 }}>
          Logged in.{" "}
          <button onClick={handleLogout} style={{ ...styles.button, ...styles.buttonRed }}>
            Logout
          </button>
        </div>
      )}

      {/* Block URLs */}
      <section style={styles.section}>
        <h2 style={styles.heading}>Block Sites (URLs)</h2>
        <input
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
          placeholder="example.com"
          onKeyDown={(e) => e.key === "Enter" && addUrl()}
          style={styles.input}
        />
        <button onClick={addUrl} style={styles.button}>
          Add URL
        </button>

        <h3>Visible Blocked URLs</h3>
        <ul style={{ listStyle: "none", paddingLeft: 0 }}>
          {urls.map((url) => (
            <li key={url} style={styles.listItem}>
              <span>{url}</span>
              <div>
                <button onClick={() => hideUrl(url)} style={styles.buttonSmall}>
                  Hide
                </button>
                <button onClick={() => removeUrl(url)} style={{ ...styles.buttonSmall, ...styles.buttonRed }}>
                  Remove
                </button>
              </div>
            </li>
          ))}
          {urls.length === 0 && <li>No visible URLs blocked.</li>}
        </ul>

        {loggedIn && (
  <>
    <h3>Hidden Blocked URLs</h3>
    <ul style={{ listStyle: "none", paddingLeft: 0 }}>
      {hiddenUrls.map((url) => (
        <li key={url} style={styles.listItem}>
          <span style={{ fontStyle: "italic", color: "#7f8c8d" }}>{url}</span>
          <div>
            <button onClick={() => unhideUrl(url)} style={styles.buttonSmall}>
              Unhide
            </button>
            <button
              onClick={() => removeHiddenUrl(url)}
              style={{ ...styles.buttonSmall, ...styles.buttonRed }}
              title="Remove (only when logged in)"
            >
              Remove
            </button>
          </div>
        </li>
      ))}
      {hiddenUrls.length === 0 && <li>No hidden URLs.</li>}
    </ul>
  </>
)}

      </section>

      {/* Block Keywords */}
      <section style={styles.section}>
        <h2 style={styles.heading}>Blocked Keywords</h2>
        <input
          value={inputKeyword}
          onChange={(e) => setInputKeyword(e.target.value)}
          placeholder="keyword"
          onKeyDown={(e) => e.key === "Enter" && addKeyword()}
          style={styles.input}
        />
        <button onClick={addKeyword} style={styles.button}>
          Add Keyword
        </button>

        <h3>Visible Blocked Keywords</h3>
        <ul style={{ listStyle: "none", paddingLeft: 0 }}>
          {keywords.map((kw) => (
            <li key={kw} style={styles.listItem}>
              <span>{kw}</span>
              <div>
                <button onClick={() => hideKeyword(kw)} style={styles.buttonSmall}>
                  Hide
                </button>
                <button onClick={() => removeKeyword(kw)} style={{ ...styles.buttonSmall, ...styles.buttonRed }}>
                  Remove
                </button>
              </div>
            </li>
          ))}
          {keywords.length === 0 && <li>No visible keywords blocked.</li>}
        </ul>

        {loggedIn && (
  <>
    <h3>Hidden Blocked Keywords</h3>
    <ul style={{ listStyle: "none", paddingLeft: 0 }}>
      {hiddenKeywords.map((kw) => (
        <li key={kw} style={styles.listItem}>
          <span style={{ fontStyle: "italic", color: "#7f8c8d" }}>{kw}</span>
          <div>
            <button onClick={() => unhideKeyword(kw)} style={styles.buttonSmall}>
              Unhide
            </button>
            <button
              onClick={() => removeHiddenKeyword(kw)}
              style={{ ...styles.buttonSmall, ...styles.buttonRed }}
              title="Remove (only when logged in)"
            >
              Remove
            </button>
          </div>
        </li>
      ))}
      {hiddenKeywords.length === 0 && <li>No hidden keywords.</li>}
    </ul>
  </>
)}

      </section>

      {/* Export/Import */}
      <section style={styles.section}>
        <h2 style={styles.heading}>Backup / Restore Settings</h2>
        <button onClick={exportSettings} style={styles.button}>
          Export Settings
        </button>
        <input
          type="file"
          accept="application/json"
          onChange={importSettings}
          style={{ marginLeft: 15 }}
        />
      </section>
    </div>
  );
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<Options />);
