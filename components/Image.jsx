import { useState, useEffect } from "react";

export default function ImageComponent({ blob, width, height}){
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
      setImageSrc(blob)
  }, [blob]);

  return <div>{imageSrc && <img src={imageSrc} className="w-16 h-16" alt="it must have been an image" />}</div>;
};

