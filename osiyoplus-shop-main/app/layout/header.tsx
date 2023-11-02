"use client";

import Hamburger from "hamburger-react";
import { LogOut, User, ShoppingBag } from "../../node_modules/lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const token = localStorage.getItem("token");
  const [open, setOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [message, setMessage] = useState({
    type: "",
    message: "",
  });

  const handleButtonClick = () => {
    setUserOpen(!userOpen);
  };

  const handleLogOut = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <>
      <header className="shadow-md ">
        <nav className="container max-w-1200 py-5 ">
          <div
            onClick={() => setOpen(!open)}
            className={`text-3xl absolute ${
              token ? "left-0" : "right-0"
            } top-2 cursor-pointer md:hidden z-30 `}
          >
            <Hamburger toggled={open} toggle={setOpen} />
          </div>
          <div className={`flex justify-between items-center`}>
            <div className={`${token ? "md:block hidden" : "md:block"} z-50`}>
              <Link href={"/"}>
                <Image
                  src="/source/image/logo-no-background.svg"
                  width={130}
                  height={24}
                  alt="logo"
                />
              </Link>
            </div>
            <ul
              className={`ml-0 md:ml-10 md:flex md:items-center md:pb-0  pb-12 absolute md:static md:bg-white bg-white z-10 md:z-auto left-0 w-full h-full md:h-[0] md:w-auto pl-0 transition-all duration-500 ease-in ${
                open ? "top-10 " : "top-[-1000px]"
              }`}
            >
              <hr className="h-px mt-5 bg-gray border-0 " />
              <li
                onClick={(e) => setOpen(false)}
                className={`md:ps-0 ps-5 md:ml-0 ml-0 md:my-0 my-7`}
              ></li>
              <li
                onClick={(e) => setOpen(false)}
                className={`ps-5 text-sm  md:ml-8 md:my-0 my-7`}
              >
                <Link
                  href={"/"}
                  className={`text-gray-800 hover:text-[#688AF2] duration-500 `}
                >
                  Asosiy
                </Link>
              </li>
              <li
                onClick={(e) => setOpen(false)}
                className={`ps-5 text-sm  md:ml-8 md:my-0 my-7`}
              >
                <Link
                  href={"/products"}
                  className={`text-gray-800 hover:text-[#688AF2] duration-500 `}
                >
                  Mahsulotlarimiz
                </Link>
              </li>
              <li
                onClick={(e) => setOpen(false)}
                className={`ps-5 text-sm  md:ml-8 md:my-0 my-7`}
              >
                <Link
                  href={"/about"}
                  className={`text-gray-800 hover:text-[#688AF2] duration-500 `}
                >
                  Biz haqimizda
                </Link>
              </li>
              <li
                onClick={(e) => setOpen(false)}
                className={`ps-5 text-sm  md:ml-8 md:my-0 my-7`}
              >
                <Link
                  href={"/faq"}
                  className={`text-gray-800 hover:text-[#688AF2] duration-500 `}
                >
                  Faq
                </Link>
              </li>
              {token ? (
                ""
              ) : (
                <li
                  onClick={(e) => setOpen(false)}
                  className={`ps-5 text-sm  md:ml-8 md:my-0 my-7`}
                >
                  <Link
                    href={"/login"}
                    className={`text-gray-800 hover:text-[#688AF2] duration-500 `}
                  >
                    Kirish
                  </Link>
                </li>
              )}
              {token ? (
                ""
              ) : (
                <li
                  onClick={(e) => setOpen(false)}
                  className={`ps-5 text-sm  md:ml-8 md:my-0 my-7`}
                >
                  <Link
                    href={"/register"}
                    className={`text-gray-800 hover:text-[#688AF2] duration-500 `}
                  >
                    Ro'yhatdan otish
                  </Link>
                </li>
              )}
            </ul>
            {token ? <div></div> : ""}
            {token ? (
              <div>
                {token ? (
                  <div
                    onClick={handleButtonClick}
                    className=" -mt-1 z-50 cursor-pointer relative"
                  >
                    <div className="bg-[#DB4444] rounded-full">
                      <User
                        strokeWidth={1.75}
                        color="white"
                        className="p-2"
                        size={32}
                      />
                    </div>
                    {userOpen && (
                      <div className="user_modal z-50 absolute p-5 w w-[200px] right-0">
                        <ul>
                          <li className="flex justify-start mb-3 items-center text-white">
                            <ShoppingBag strokeWidth={1.75} color="black" />
                            <Link href={"/order"} className="ml-2 text-black">
                              Buyurtmalarim
                            </Link>
                          </li>
                          <li
                            onClick={handleLogOut}
                            className="flex justify-start items-center text-white"
                          >
                            <LogOut strokeWidth={1.75} color="black" />
                            <span className="ml-2 text-black">Chiqish</span>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                ) : (
                  ""
                )}
              </div>
            ) : (
              ""
            )}
          </div>
        </nav>
      </header>
    </>
  );
}
