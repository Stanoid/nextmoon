"use client";
import "./globals.css";
import { React, useEffect, useState, useRef, useContext } from "react";
import { LOCALE, Theme } from "./local";
import Image from "next/image";
import logowhite from "../../public/logowhite.svg";
import Cart from "./comps/cart";
import DropGroup from "./comps/dropgroup";
import Drop from "./comps/drop";
import AccounteEl from "./comps/accountel";
import Cartl from "./comps/cartl";
import { BsHeartFill } from "react-icons/bs";
import { MdShoppingCart, MdSearch } from "react-icons/md";
import { CartContext } from "./contexts/cartContext";
import AuthenContext from "./contexts/AuthCon";
import { AuthCon } from "./contexts/AuthCon";

import Footer from "./footer";
import Cookies from "universal-cookie";

import { useRouter, usePathname } from "next/navigation";

export default function RootLayout({ children }) {
  const cookies = new Cookies();
  const pathname = usePathname();
  const router = useRouter();

  const [openCart, setOpenCart] = useState(false);
  const [openCartl, setOpenCartl] = useState(false);
  const childCompRef = useRef();
  //let { cart } = useContext(CartContext);

  const handleOpenCart = (open) => {
    setOpenCart(open);
  };
  const handleOpenCartl = (open) => {
    setOpenCartl(open);
  };
  const [utype, setutype] = useState(0);

  return (
    <html className="scrollable-content" lang="en">
      <body style={{}}>
        <CartContext>
          <AuthenContext>
            <div
              style={{ height: "100vh" }}
              class=" flex overflow-hidden "
              x-data="{ sidebarOpen: false }"
            >
              <div class="flex flex-col w-0 flex-1 overflow-hidden">
                <div
                  style={{
                    top: 0,
                    backgroundColor: Theme.primary,
                  }}
                  class="   lg:flex    z-10  shadow"
                >
                  <div
                    className=""
                    style={{
                      color: "white",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: 10,
                      fontWeight: "bold",
                      fontSize: 25,
                    }}
                  >
                    <div className="hidden lg:flex sm:hidden md:hidden ">
                      <Image
                        onClick={() => {
                          router.push("/");
                        }}
                        src={logowhite}
                        alt="My SVG"
                        width={100}
                      />
                    </div>

                    <div
                      className="flex lg:hidden sm:flex md:flex "
                      style={{
                        fontSize: 15,

                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Image
                        onClick={() => {
                          router.push("/");
                        }}
                        src={logowhite}
                        alt="My SVG"
                        width={100}
                      />

                      <div>
                        <button
                          onClick={() => {
                            handleOpenCart(true);
                          }}
                          style={{
                            fontSize: 20,
                            marginLeft: 5,
                            padding: 10,
                            borderRadius: 100,
                            backgroundColor: "white",
                            color: Theme.primary,
                          }}
                          class="p-2 m-1 text-white  rounded-sm
             
             focus:shadow-outline focus:text-gray-500"
                        >
                          <MdShoppingCart />
                        </button>

                        <button
                          onClick={() => {
                            handleOpenCartl(true);
                          }}
                          style={{
                            fontSize: 20,
                            marginLeft: 5,
                            padding: 10,
                            paddingTop: 10,
                            paddingBottom: 8,
                            borderRadius: 100,
                            backgroundColor: "white",
                            color: Theme.primary,
                          }}
                          class="p-2 m-1 text-white  rounded-sm
          
          focus:shadow-outline focus:text-gray-500"
                        >
                          <BsHeartFill />
                        </button>
                      </div>
                    </div>

                    <div class="  hidden ">
                      <div class="flex  flex-col ">
                        <Cart
                          ref={childCompRef}
                          openHandler={handleOpenCart}
                          open={openCart}
                        />
                      </div>
                    </div>

                    <div class="  hidden">
                      <div class="flex  flex-col ">
                        <Cartl
                          ref={childCompRef}
                          openHandler={handleOpenCartl}
                          open={openCartl}
                        />
                      </div>
                    </div>
                  </div>
                  <div class="flex-1 hidden lg:flex md:hidden sm:hidden px-4  justify-between">
                    <div class="flex-1 flex   items-center">
                      <div class="w-2/3 flex md:ml-0">
                        <label for="search_field" class="sr-only">
                          Search
                        </label>
                        <div class="relative w-full text-white focus-within:text-gray-600">
                          <div class="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                            <svg
                              class="h-5 w-5"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                              />
                            </svg>
                          </div>
                          <input
                            id="search_field"
                            class="block w-full  pl-8 pr-3 py-2 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 sm:text-sm"
                            placeholder="Search Minimoon"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="ml-4 flex items-center md:ml-6">
                      
                      <AccounteEl media={"m"} />
                      

                      <button
                        onClick={() => {
                          handleOpenCart(true);
                        }}
                        style={{
                          fontSize: 20,
                          marginLeft: 20,
                          padding: 10,
                          borderRadius: 100,
                          backgroundColor: "white",
                          color: Theme.primary,
                        }}
                        class="p-2 m-1 text-white  rounded-sm
             
                focus:shadow-outline focus:text-gray-500"
                      >
                        <MdShoppingCart />
                      </button>

                      <button
                        onClick={() => {
                          handleOpenCartl(true);
                        }}
                        style={{
                          fontSize: 20,
                          marginLeft: 20,
                          padding: 10,
                          paddingTop: 10,
                          paddingBottom: 8,
                          borderRadius: 100,
                          backgroundColor: "white",
                          color: Theme.primary,
                        }}
                        class="p-2 m-1 text-white  rounded-sm
             
             focus:shadow-outline focus:text-gray-500"
                      >
                        <BsHeartFill />
                      </button>

                      <button
                        style={{
                          marginLeft: 20,
                          color: "white",
                          fontWeight: "bold",
                        }}
                        class="p-2 m-1   rounded-sm
               focus:outline-none
                focus:shadow-outline focus:text-gray-500"
                      >
                        العربية
                      </button>

                      <div class="ml-3 relative" x-data="{ open: false }">
                        <div>
                          <button class="max-w-xs flex items-center text-sm rounded-full focus:outline-none focus:shadow-outline"></button>
                        </div>
                        <div class="origin-top-right hidden absolute right-0 mt-2 w-48 rounded-md shadow-lg">
                          <div class="py-1 rounded-md bg-white shadow-xs">
                            <a
                              href="#"
                              class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition ease-in-out duration-150"
                            >
                              Your Profile
                            </a>
                            <a
                              href="#"
                              class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition ease-in-out duration-150"
                            >
                              Settings
                            </a>
                            <a
                              href="#"
                              class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition ease-in-out duration-150"
                            >
                              Sign out
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="flex lg:hidden sm:flex md:flex"
                  style={{
                    width: "100%",
                    maxHeight: 100,
                    padding: "5px 10px",
                    backgroundColor: "white",

                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <button
                        onClick={() => {
                          handleOpenCart(true);
                        }}
                        style={{
                          fontSize: 20,
                          padding: 10,
                          borderRadius: 100,
                          backgroundColor: Theme.primary,
                          color: "white",
                        }}
                        class="p-2 m-1 text-white  rounded-sm
              focus:shadow-outline focus:text-gray-500"
                      >
                        <MdSearch />
                      </button>
                    </div>

                    <div>
                      <input
                        placeholder="Seach Minimoon.."
                        style={{
                          width: "100%",
                          backgroundColor: "white",
                          padding: "6px 12px",
                          fontSize: 13,
                          color: Theme.secondary,
                          wordSpacing: "0.1px",

                          border: "3px solid" + Theme.primary,
                          outline: "white",
                          borderRadius: 20,
                        }}
                      />
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      paddingRight: 5,
                    }}
                  >
                   <AccounteEl media={"d"} />
                  </div>
                </div>

                <div
                  style={{
                    padding: 5,
                    width: "100vw",
                    position: "sticky",
                    zIndex: 20,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: Theme.secondary,
                  }}
                >
                <DropGroup/>
                </div>

                <div className="scrollable-content"  style={{ width: "100%", overflowY: "scroll" }}>
                  {children}
                </div>
              </div>
            </div>
          </AuthenContext>
        </CartContext>
      </body>
    </html>
  );
}
