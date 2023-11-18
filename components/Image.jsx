import { useState, useEffect } from "react";

export default function ImageComponent({ blob, width, height}){
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    if(blob && blob !="")
    {
      setImageSrc(`data:image/jpeg;base64,${blob}`)
    }
    else{
      setImageSrc('/playlistCover.jpg')
    }
    // console.log(imageSrc)
  }, [blob]);

  return <div>{imageSrc && <img src={imageSrc} width={width} height={height} alt="it must have been an image" />}</div>;
};

export const PodcastImage=({blob})=>{
  const [src, setSrc] = useState();
  // console.log(blob)
  useEffect(() => {
    if (blob) {
      setSrc(`data:image/jpeg;base64,${blob}`);
    } else {
      setSrc("/playlistCover.jpg");
    }
  }, [blob]);


  return <div><img src={src} className=' w-28 h-12'></img></div>
}
