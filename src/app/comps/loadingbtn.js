import React from "react";

import { Theme } from "../local";
function LoadingBtn(props) {
  return (
    <button
      onClick={props.act}
      disabled={props.lod}
      style={{
        display: "flex",
        alignItems: "center",
        color: props.textColor ? props.textColor : "",
        justifyContent: "center",
        backgroundColor: props.color ? props.color : Theme.primary,
      }}
      className="mt-4 w-full sm:w-auto min-w-[200px] text-white py-3 px-8 rounded-xl text-base font-semibold tracking-wide shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
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
