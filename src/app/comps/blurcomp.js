import { getBlurData } from "./blurImg";
import Image from "next/image";

export default async function BlurComp(props) {
 

  const { base64 } = await getBlurData(props.src);

  return (    
        <Image
    
         
          className={props.cln}
          style={props.sty}
          alt={props.alt}
          height={props.hei}
          width={props.wid}
          placeholder="blur"
          src={imageUrl}    
          blurDataURL={base64}
        />
       
  );
}