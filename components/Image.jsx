import { useState, useEffect } from "react";
import pako from "pako";

const ImageComponent = ({ blob, width, height }) => {
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    if(true)
    {
      setImageSrc(`data:image/jpeg;base64,${blob}`)
    }
    else{
      setImageSrc(blob)
    }
  }, [blob]);

  return <div>{imageSrc && <img src={imageSrc} width={width} height={height} alt="it must have been an image" />}</div>;
};

export default ImageComponent;
