import { useEffect, useRef } from "react";
import QRCodeStyling from "qr-code-styling";

interface QRPreviewProps {
  data: string;
}

export default function QRPreview({
  data,
}: QRPreviewProps) {
  const qrRef = useRef<HTMLDivElement>(null);

  const qrCode = useRef(
    new QRCodeStyling({
      width: 300,
      height: 300,
      data: data,
      dotsOptions: {
        color: "#000000",
      },
      backgroundOptions: {
        color: "#ffffff",
      },
    })
  );

  useEffect(() => {
    if (qrRef.current) {
      qrRef.current.innerHTML = "";
      qrCode.current.append(qrRef.current);
    }

    qrCode.current.update({
      data,
    });
  }, [data]);

  return <div ref={qrRef}></div>;
}