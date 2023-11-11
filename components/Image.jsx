import { useState, useEffect } from "react";
import pako from "pako";

const ImageComponent = ({ blob, width, height }) => {
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Decode base64
        const decodedData = atob(blob);

        // Convert the base64 string to a binary string
        const binaryString = decodedData
          .split('')
          .map(char => String.fromCharCode(char.charCodeAt(0) & 0xff))
          .join('');

        // Convert the binary string to a Uint8Array
        const uint8Array = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; ++i) {
          uint8Array[i] = binaryString.charCodeAt(i);
        }

        // Decompress using pako
        const decompressedData = pako.inflate(uint8Array, { to: "string" });

        // Create URL for the blob
        const img = "data:image/png;base64," + btoa(decompressedData);

        setImageSrc(img);
        console.log("Image URL:", img);
      } catch (err) {
        console.error("Error decoding image blob:", err);
        setImageSrc('/music.jpg');
      }
    };

    fetchData();
  }, [blob]);

  return <div>{imageSrc && <img src={imageSrc} width={width} height={height} alt="it must have been an image" />}</div>;
};

export default ImageComponent;
