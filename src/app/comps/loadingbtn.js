import React from "react";

import { Theme } from "../local";
function LoadingBtn(props) {
  return (
    <button
      onClick={props.act}
      style={{
        display: "flex",
        alignItems: "center",
        color: props.textColor ? props.textColor : "",

        justifyContent: "center",
        backgroundColor: props.color ? props.color : Theme.primary,
      }}
      className="mt-4 w-full  text-white py-3 px-5 shadow-lg  rounded-md  tracking-wide"
    >
      <div
        style={{
          display: props.lod ? "flex" : "none",
          justifyContent: "center",
          alignItems: "center",
        }}
        className="lds-facebookbtn"
      >
        <div></div>
        <div></div>
        <div></div>
      </div>
      <span
        style={{
          display: props.lod ? "none" : "flex",
          flexDirection: "row-reverse",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {props.icon && (
          <div style={{ marginRight: 5, marginLeft: 5 }}>{props.icon}</div>
        )}{" "}
        {props.text}{" "}
      </span>
    </button>
  );
}

export default LoadingBtn;
