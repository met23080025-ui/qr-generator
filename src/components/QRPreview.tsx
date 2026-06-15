import { useEffect, useRef } from "react";
import QRCodeStyling from "qr-code-styling";

interface QRPreviewProps {
  data: string;
  size: number;
  color: string;
  logo?: string;
  qrInstanceRef?: React.MutableRefObject<QRCodeStyling | null>;
}

export default function QRPreview({
  data,
  size,
  color,
  logo,
  qrInstanceRef,
}: QRPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const qrCode = useRef(
    new QRCodeStyling({
      width: size,
      height: size,

      data: data,

      image: logo || undefined,

      dotsOptions: {
        color: color,
        type: "rounded",
      },

      cornersSquareOptions: {
        type: "extra-rounded",
      },

      backgroundOptions: {
        color: "#ffffff",
      },

      imageOptions: {
        crossOrigin: "anonymous",
        margin: 5,
        imageSize: 0.3,
      },
    })
  );

  useEffect(() => {
    if (qrInstanceRef) {
      qrInstanceRef.current = qrCode.current;
    }

    if (
      containerRef.current &&
      containerRef.current.childNodes.length === 0
    ) {
      qrCode.current.append(containerRef.current);
    }

    qrCode.current.update({
      data: data,

      width: size,
      height: size,

      image: logo || undefined,

      dotsOptions: {
        color: color,
        type: "rounded",
      },

      cornersSquareOptions: {
        type: "extra-rounded",
      },
    });
  }, [
    data,
    size,
    color,
    logo,
    qrInstanceRef,
  ]);

  return <div ref={containerRef} />;
}