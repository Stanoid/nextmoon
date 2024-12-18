import { useState,useEffect,useRef,useCallback } from "react";
import Product from "./flashproduct";
import { API_URL } from "../local";
import {
    motion,
    useMotionValue,
    useTransform,
    AnimatePresence
} from "framer-motion";

function Card(props) {
    const [exitX, setExitX] = useState(0);

    const x = useMotionValue(0);
    const scale = useTransform(x, [-150, 0, 150], [0.5, 1, 0.5]);
    const rotate = useTransform(x, [-150, 0, 150], [-45, 0, 45], {
        clamp: false
    });

    const variantsFrontCard = {
        animate: { scale: 1, y: 0, opacity: 1 },
        exit: (custom) => ({
            x: custom,
            opacity: 0,
            scale: 0.5,
            transition: { duration: 0.2 }
        })
    };
    const variantsBackCard = {
        initial: { scale: 0, y: 105, opacity: 0 },
        animate: { scale: 0.85, y: 50, opacity: 0.7 }
    };

    const variantsBackBackCard = {
        initial: { scale: 0, y: 205, opacity: 0 },
        animate: { scale: 0.70, y: 100, opacity: 0.2 }
    };

    function handleDragEnd(_, info) {
       
      

        if (info.offset.x < -100) {
            setExitX(-250);
          //  alert("left");
          console.log("ssss",props.data);
            props.setIndex(props.index + 1);
        }
        if (info.offset.x > 100) {
            setExitX(250);
           // alert("right");
           console.log("ssss",props.data);

            props.setIndex(props.index + 1);
        }


        if(props.index==10){
            
            props.setIndex(0);
            
        }
    }

    return (
        <motion.div
            style={{
              width:"100%",
                position: "absolute",
                top: 0,
                x,
                rotate,
                cursor: "grab"
            }}
            whileTap={{ cursor: "grabbing" }}
            // Dragging
            drag={props.drag}
            dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
            onDragEnd={handleDragEnd}
            // Animation
            variants={props.order==1? variantsFrontCard: props.order==2?variantsBackCard:variantsBackBackCard}
            initial="initial"
            animate="animate"
            exit="exit"
            custom={exitX}
            transition={
                props.frontCard
                    ? { type: "spring", stiffness: 300, damping: 20 }
                    : { scale: { duration: 0.2 }, opacity: { duration: 0.4 } }
            }
        >
            <motion.div
              className="bg-white w-full rounded-lg "

                style={{
                  
                  
                 
                    scale
                }}
            >
                <Product key={props.key} data={props.data} />
                
                </motion.div> 
            
        </motion.div>
    );
}






export default function SwipeEl(props) {
    const [index, setIndex] = useState(0);
    const [products, setProducts] = useState(null);
    const [prc,setPrc] = useState(null);
    const [lod, setLod] = useState(0);
    const firstRenderRef = useRef(true);

    useEffect(() => {
      
        if (firstRenderRef.current) {
            firstRenderRef.current = false;
            getAllProducts();          
        } else {
            
          }


     
    },[])
    

    const getAllProducts = useCallback(()=>{
        setLod(true);
        const requestOptions = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                // "Authorization": 'Bearer ' + ls.get("atkn")
            },
          
        };
      
          fetch(`${API_URL}products?func=getFlashOffers`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
      
      if(data.length<6){
setProducts(null);
      }else{
        setProducts(data);
      }
              
        
         
          
           
            }).then(()=>{
              setLod(false)
            })
    
    
    },[])


    return (
        <motion.div className="flex align-middle justify-center"  style={{direction:"rtl", width: props.w, height:props.h*1.5, position: "relative" }}>
            
            {
                products?<AnimatePresence  initial={false}>
               
                <Card  index={index} w={props.w} h={props.h} key={index + 2} order={3} grnum={products&&products.length} data={products[2+index]&&products[2+index]}  />
                    <Card  index={index}  w={props.w} h={props.h} key={index + 1} order={2} grnum={products&&products.length}  data={products[1+index]&&products[1+index]} />
                    <Card
                    grnum={products&&products.length}
                        key={index}
                      order={1}
                        w={props.w} h={props.h}
                        index={index}
                        setIndex={setIndex}
                        drag="x"
                        data={products[0+index]&&products[0+index]}
                    />
                     
                </AnimatePresence>:"Fetshing Flash offers"
            }
           
           
        </motion.div>
    );
}
