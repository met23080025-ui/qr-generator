import { useMemo, useRef, useState } from "react";
import QRCodeStyling from "qr-code-styling";

import TypeSelector from "./components/TypeSelector";
import SizeSelector from "./components/SizeSelector";
import ColorPicker from "./components/ColorPicker";

import UrlForm from "./components/UrlForm";
import TextForm from "./components/TextForm";
import EmailForm from "./components/EmailForm";
import PhoneForm from "./components/PhoneForm";
import WifiForm from "./components/WifiForm";

import QRPreview from "./components/QRPreview";

import { validateQR } from "./utils/validation";
import { PRESET_COLORS } from "./constants/colors";

import type {
  QRType,
  WifiConfig,
} from "./types/qr";

function App() {
  const [type, setType] =
    useState<QRType>("url");

  const [size, setSize] =
    useState(300);

  const [color, setColor] =
    useState("#000000");

  const [logo, setLogo] =
    useState<string>("");

  const [url, setUrl] =
    useState("https://google.com");

  const [text, setText] =
    useState("Hello World");

  const [email, setEmail] =
    useState("test@example.com");

  const [phone, setPhone] =
    useState("+84901234567");

  const [wifi, setWifi] =
    useState<WifiConfig>({
      ssid: "",
      password: "",
      encryption: "WPA",
    });

  const qrRef =
    useRef<QRCodeStyling | null>(null);

  const [
    generatedData,
    setGeneratedData,
  ] = useState("");

  const qrData = useMemo(() => {
    switch (type) {
      case "url":
        return url;

      case "text":
        return text;

      case "email":
        return `mailto:${email}`;

      case "phone":
        return `tel:${phone}`;

      case "wifi":
        return `WIFI:T:${wifi.encryption};S:${wifi.ssid};P:${wifi.password};;`;

      default:
        return "";
    }
  }, [
    type,
    url,
    text,
    email,
    phone,
    wifi,
  ]);

  const isValid = validateQR(
    type,
    qrData,
    wifi
  );

  const handleGenerate = () => {
    if (!isValid) {
      alert(
        "Invalid input or inappropriate content detected."
      );
      return;
    }

    setGeneratedData(qrData);
  };

  const handleDownload = () => {
    qrRef.current?.download({
      name: "qr-code",
      extension: "png",
    });
  };

  const handleCopy = async () => {
    try {
      const rawData =
        await qrRef.current?.getRawData(
          "png"
        );

      if (!rawData) return;

      await navigator.clipboard.write([
        new ClipboardItem({
          "image/png": rawData,
        }),
      ]);

      alert("Copied!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      style={{
        padding: "40px",
        fontFamily:
          "Arial, sans-serif",
        maxWidth: "900px",
        margin: "0 auto",
      }}
    >
      <h1>QR Code Generator</h1>

      <TypeSelector
        value={type}
        onChange={setType}
      />

      <br />

      <SizeSelector
        value={size}
        onChange={setSize}
      />

      <br />

      <ColorPicker
        value={color}
        onChange={setColor}
      />

      <div
        style={{
          marginTop: "10px",
        }}
      >
        {PRESET_COLORS.map(
          (preset) => (
            <button
              key={preset}
              onClick={() =>
                setColor(preset)
              }
              style={{
                width: "30px",
                height: "30px",
                backgroundColor:
                  preset,
                marginRight: "8px",
                cursor:
                  "pointer",
              }}
            />
          )
        )}
      </div>

      <br />

      <div>
        <label>
          Upload Logo
        </label>

        <br />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file =
              e.target.files?.[0];

            if (!file) return;

            const reader =
              new FileReader();

            reader.onload = () => {
              setLogo(
                reader.result as string
              );
            };

            reader.readAsDataURL(
              file
            );
          }}
        />
      </div>

      <br />

      {type === "url" && (
        <UrlForm
          value={url}
          onChange={setUrl}
        />
      )}

      {type === "text" && (
        <TextForm
          value={text}
          onChange={setText}
        />
      )}

      {type === "email" && (
        <EmailForm
          value={email}
          onChange={setEmail}
        />
      )}

      {type === "phone" && (
        <PhoneForm
          value={phone}
          onChange={setPhone}
        />
      )}

      {type === "wifi" && (
        <WifiForm
          value={wifi}
          onChange={setWifi}
        />
      )}

      <br />

      {!isValid && (
        <p
          style={{
            color: "red",
            fontWeight:
              "bold",
          }}
        >
          Invalid input or
          prohibited content
          detected.
        </p>
      )}

      <button
        onClick={
          handleGenerate
        }
      >
        Generate QR Code
      </button>

      <br />
      <br />

      {generatedData && (
        <QRPreview
          data={generatedData}
          size={size}
          color={color}
          logo={logo}
          qrInstanceRef={qrRef}
        />
      )}

      <br />

      <button
        onClick={
          handleDownload
        }
      >
        Download PNG
      </button>

      <button
        onClick={handleCopy}
        style={{
          marginLeft:
            "10px",
        }}
      >
        Copy QR
      </button>
    </div>
  );
}

export default App;