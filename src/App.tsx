import { useState } from "react";

import TypeSelector from "./components/TypeSelector";
import UrlForm from "./components/UrlForm";
import QRPreview from "./components/QRPreview";

import type { QRType } from "./types/qr";

function App() {
  const [type, setType] =
    useState<QRType>("url");

  const [url, setUrl] =
    useState("https://google.com");

  return (
    <div
      style={{
        padding: "40px",
      }}
    >
      <h1>QR Generator</h1>

      <TypeSelector
        value={type}
        onChange={setType}
      />

      <br />

      <UrlForm
        value={url}
        onChange={setUrl}
      />

      <br />

      <QRPreview data={url} />

      <p>Selected: {type}</p>
    </div>
  );
}

export default App;