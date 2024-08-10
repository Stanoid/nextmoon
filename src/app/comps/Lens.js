import React from "react";
import ImageZoom from "react-image-zooom";
import styled,{createGlobalStyle} from "styled-components";
import { useState } from "react";
import { FaArrowUp } from "react-icons/fa6";
import { IMG_URL, Theme } from "../local";
import { motion } from "framer-motion";


const GlobalStyles = createGlobalStyle`
  #root {
    position: relative;
 
    height: auto;
   
  }
  
  .gallery {
    position: relative;
    width: 100vw;


    
    img {width: "50px"; cursor: pointer;}

    .img1 {
      grid-area: 1 / 1 / 2 / 2;
    }
    .img2 {
      grid-area: 2 / 1 / 3 / 2;
    }
    .img3 {
      grid-area: 3 / 1 / 4 / 2;
    }

    .FullImageZoom {
      width: 70%;
      grid-area: 1 / 2 / 4 / 5;
    }
  }
`;

function Lens(props) {

  const [zoomv,setZoomv] = useState(false)
  const [galleryImage, setGalleryImage] = useState(
    IMG_URL.concat(props.data[0])
  );

  
  const handleClick = (url) => {
    setGalleryImage(url);
  };

  return (

    <div className=" " id="root">
     <GlobalStyles />
      <div className=" w-full flex flex-col-reverse sm:flex-col-reverse lg:flex-row  ">
       
       
       
       
        <div  style={{
            
            maxWidth:"100%",
            overflow:"scroll",
            maxHeight:"100%"
        }} className=" scrollable-content flex flex-row sm:flex-row lg:flex-col space-x-2 lg:space-x-0 sm:space-x-2  lg:space-y-2  ">
       


       {props.data&&props.data.map((img,index)=>(
 
 <img
 className=" w-20  rounded-md  object-cover"
 src= {IMG_URL.concat(img)}
 alt="A placeholder"
 onClick={() => handleClick(IMG_URL.concat(img))}
/>

 
    ))}
       
       
       
     

        </div>





      
      <div id="bb" 

      onMouseDown={()=>{setZoomv(true)}}
      onMouseLeave={()=>{setZoomv(false)}}
      onTouchStart={(e)=>{ e.preventDefault();  setZoomv(true)  }}
      onTouchEnd={()=>{setZoomv(false)}}
       
       
          style={{backgroundColor:zoomv?Theme.primaryLight:"",color:zoomv?"":Theme.primaryLight,WebkitUserSelect:"none",zIndex:zoomv?30:0}}
           
          className={`${zoomv?"w-full":"w-52"}  font-medium  lg:w-1/2 transition-width duration-75 tracking-tight italic  group touch-none mb-2 rounded-md    ml-0 lg:ml-2 sm:ml-0  `}>
      <ImageZoom
           className={`${zoomv?"rounded-b-none":""} FullImageZoom rounded-md     `}
        
          src={galleryImage}
          alt="A image to apply the ImageZoom plugin"
          zoom="700"
        />


<div  style={{}} className="w-full  items-center justify-center  ">
<div   className="text-center py-1 pb-2 flex text-xs items-center justify-center  whitespace-nowrap" >
      <motion.div
      >  <FaArrowUp className="mr-1 animate-bounce" /> </motion.div>  إضغط و اسحب على الصورة للتكبير
    
        </div>
</div>
     </div>
     
      </div>

      <div style={{display:zoomv?"block":"none"}} className="  w-lvw h-lvh transition-all bg-black/60 left-0 fixed top-0 z-20"></div>
       
 
    
    </div>
  );
}

export default Lens
