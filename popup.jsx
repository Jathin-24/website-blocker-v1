import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

function Popup() {
  const [usage, setUsage] = useState({});

  useEffect(() => {
    chrome.storage.local.get("usage", (data) => {
      setUsage(data.usage || {});
    });
  }, []);

  return (
    <div>
      <h2>Usage Stats</h2>
      <ul>
        {Object.entries(usage).map(([site, time]) => (
          <li key={site}>{site}: {time} sec</li>
        ))}
      </ul>
    </div>
  );
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<Popup />);
