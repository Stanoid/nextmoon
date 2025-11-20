/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { removeFromCart, updateCartQuantity } from "../lib/actions/counterAction";
import { useDispatch } from "react-redux";
import { XIcon } from "@heroicons/react/outline";
import {
  BsChevronDown,
  BsChevronUp,
  BsDash,
  BsPlus,
  BsThermometer,
  BsTrashFill,
} from "react-icons/bs";
import FaHeartCircleMinus from "react-icons/fa6";
import { CURRENCY, IMG_URL, Theme } from "../local";

import { BsX } from "react-icons/bs";
import { color } from "framer-motion";

export default function Cartel(props) {
  const [open, setOpen] = useState(true);
  const [varient, setVarient] = useState(null);
  const [varients, setVarients] = useState(null);
  const dispatch = useDispatch();

  
const handleQuantityChange = (action) => {
    dispatch(
      updateCartQuantity({
        id: props.selvar,
        color: props.color,
        size: props.size,
        action: action
      })
    );
  };


  useEffect(() => {
    setVarients(props.data.attributes.varients.data);
    // setVarient(props.data.attributes.varients.data[0]);

    for (let i = 0; i < props.data.attributes.varients.data.length; i++) {
      if (props.data.attributes.varients.data[i].id == props.selvar) {
        setVarient(props.data.attributes.varients.data[i]);
      }
    }

    console.log("here daddy", props.data.attributes.varients.data);
  }, []);

  const removeid = () => {
    props.removeItem(props.index);
  };

  // console.log("attrubutes", props.data.attributes)
  // console.log("Image URL:", props.data.attributes.images?.data?.[0]?.attributes?.url);

  return (
    <div className="w-full bg-white rounded-lg border border-gray-100 mb-3 overflow-hidden hover:shadow-md transition-shadow" dir="rtl">
      <div className="flex gap-3 p-3">
        {/* Product Image */}
        <div className="flex-shrink-0">
          <img
            className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg border border-gray-200"
            src={
              props.data.attributes.images?.data?.[0]?.attributes?.url
                ? IMG_URL + props.data.attributes.images.data[0].attributes.url
                : "/default-image.png"
            }
            alt={props.data.attributes.name_ar}
          />
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0 flex flex-col justify-between">
          {/* Product Name & Code */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 truncate mb-1">
              {props.data.attributes.name_ar}
            </h3>
            <p className="text-xs text-gray-500">كود: {props.code}</p>
          </div>

          {/* Color & Size */}
          <div className="flex items-center gap-2 mt-1">
            {varient && varient.attributes.colors.data[0] && (
              <>
                <div
                  className="w-4 h-4 rounded-full border-2 border-gray-300"
                  style={{
                    backgroundColor: varient.attributes.colors.data[0].attributes.colorCode,
                  }}
                />
                <span className="text-xs text-gray-600">
                  {varient.attributes.colors.data[0].attributes.name_ar}
                </span>
              </>
            )}
            {varient && varient.attributes.sizes.data[0] && (
              <>
                <span className="text-gray-400">•</span>
                <span className="text-xs text-gray-600 font-medium">
                  {varient.attributes.sizes.data[0].attributes.icon}
                </span>
              </>
            )}
          </div>

          {/* Price & Quantity */}
          <div className="flex items-center justify-between mt-2">
            {/* Quantity Controls */}
            <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-1">
              <button
                onClick={() => handleQuantityChange("decrease")}
                className="w-7 h-7 flex items-center justify-center rounded-md border border-gray-300 hover:bg-white transition-colors"
                style={{ color: Theme.primary }}
              >
                <BsDash className="w-4 h-4" />
              </button>
              <span className="text-sm font-semibold min-w-[20px] text-center">{props.qty}</span>
              <button
                onClick={() => handleQuantityChange("increase")}
                className="w-7 h-7 flex items-center justify-center rounded-md text-white transition-colors hover:opacity-90"
                style={{ backgroundColor: Theme.primary }}
              >
                <BsPlus className="w-4 h-4" />
              </button>
            </div>

            {/* Price */}
            {varient && (
              <div className="text-left">
                <p className="text-sm font-bold" style={{ color: Theme.primary }}>
                  {(varient.attributes.price * props.qty).toFixed(2)} {CURRENCY}
                </p>
                {varient.attributes.old_price && (
                  <p className="text-xs text-gray-400 line-through">
                    {(varient.attributes.old_price * props.qty).toFixed(2)} {CURRENCY}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Delete Button */}
        {!props.order && (
          <div className="flex-shrink-0 flex items-start">
            <button
              onClick={() => {
                dispatch(
                  removeFromCart({
                    id: props.selvar,
                    color: props.color,
                    size: props.size,
                  })
                );
              }}
              className="p-2 rounded-lg hover:bg-red-50 transition-colors group"
              aria-label="Remove item"
            >
              <BsTrashFill className="w-4 h-4 text-gray-400 group-hover:text-red-500 transition-colors" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
