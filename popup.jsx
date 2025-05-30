import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

function formatSeconds(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return [
    h > 0 ? String(h).padStart(2, "0") : null,
    String(m).padStart(2, "0"),
    String(s).padStart(2, "0"),
  ]
    .filter(Boolean)
    .join(":");
}

function Popup() {
  const [usage, setUsage] = useState({});
  const [hiddenSites, setHiddenSites] = useState([]);

  useEffect(() => {
    chrome.storage.local.get(["usage", "hiddenSites"], (data) => {
      setUsage(data.usage || {});
      setHiddenSites(data.hiddenSites || []);
    });
  }, []);

  // Toggle hiding a site in usage display
  const toggleHideSite = (site) => {
    let newHidden;
    if (hiddenSites.includes(site)) {
      newHidden = hiddenSites.filter((s) => s !== site);
    } else {
      newHidden = [...hiddenSites, site];
    }
    setHiddenSites(newHidden);
    chrome.storage.local.set({ hiddenSites: newHidden });
  };

  return (
    <div className="popup-container">
      <h2>Usage Stats</h2>
      {Object.keys(usage).length === 0 ? (
        <p>No usage data yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Site</th>
              <th>Time Spent</th>
              <th>Hide</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(usage).map(([site, seconds]) => {
              const isHidden = hiddenSites.includes(site);
              return (
                <tr key={site} className={isHidden ? "hidden-row" : ""}>
                  <td>{isHidden ? "*****" : site}</td>
                  <td>{isHidden ? "*****" : formatSeconds(seconds)}</td>
                  <td>
                    <button
                      className="toggle-hide-btn"
                      onClick={() => toggleHideSite(site)}
                      title={isHidden ? "Unhide site" : "Hide site"}
                    >
                      {isHidden ? "Unhide" : "Hide"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<Popup />);
