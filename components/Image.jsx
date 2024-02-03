import { useState, useEffect } from "react";

export default function ImageComponent({ url}){
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
      setImageSrc(url)
  }, [url]);

  return <div>{imageSrc && <img src={imageSrc} className="w-16 h-16" alt="it must have been an image" />}</div>;
};

