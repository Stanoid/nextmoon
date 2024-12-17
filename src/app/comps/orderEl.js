/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { removeFromCart } from "../lib/actions/counterAction";
import { useDispatch } from "react-redux";
import { XIcon } from "@heroicons/react/outline";
import {
  BsChevronDown,
  BsChevronUp,
  BsThermometer,
  BsTrashFill,
} from "react-icons/bs";
import FaHeartCircleMinus from "react-icons/fa6";
import { CURRENCY, IMG_URL, Theme } from "../local";

import { BsX } from "react-icons/bs";
import { color } from "framer-motion";

export default function OrderEl(props) {
  const [open, setOpen] = useState(true);
  const [varient, setVarient] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
   
  });

  

  return (
    <div
      className="shadow-md"
      style={{
        display: "flex",
        borderRadius: 10,
        alignItems: "center",
        backgroundColor: "white",
        margin: "10px 10px",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          padding: 10,
          width: "100%",
          display: "flex",
          flexDirection: "row-reverse",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            width={70}
            style={{
              borderRadius: 5,
            }}
            src={props.img&&props.img}
          />
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
          className="sm:flex-col lg:flex-row"
        >
          <div
            dir="rtl"
            className="text-xs"
            style={{
              padding: 5,
              paddingBottom: 0,
              fontWeight: "bold",
              textAlign: "right",
            }}
          >
            {props.name.length > 30
              ? props.name.slice(0, 30) + "..."
              : props.name}
          </div>

          <div  className="flex flex-col">
          <div dir="rtl" className="font-semibold text-moon-200/80" >  {props.price&&props.price} {CURRENCY} </div>  
          <div
              className=" italic text-gray-300 "
              style={{
                padding: 5,
                fontSize: 12,
                paddingTop: 0,
                color: "black",
                fontWeight: "bold",
              }}
            >
              {props.qty} قطعة
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
            flexDirection: "row",
            marginLeft: 5,
          }}
        >
          <div
            className="space-x-2"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: 7,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",

                backgroundColor: Theme.primary,
                color: "white",
                fontSize: 14,
              }}
            >

              {props.size}
          
            </div>

        

<div  style={{ backgroundColor: props.color.colorCode }}
                      className="w-7 h-7 rounded-full"
                    ></div>
          </div>
        </div>

        <div className="flex items-center justify-center w-16 h-16 rounded-full text-white font-bold bg-moon-200 "  >
        
          <div> {props.code} </div>
        </div>
      </div>
    </div>
  );
}
