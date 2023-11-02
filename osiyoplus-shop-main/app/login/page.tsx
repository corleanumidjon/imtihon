"use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import PageTransitionProvider from "../components/page-transition";

const Login = () => {
  const token = localStorage.getItem("token");
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState({
    type: "",
    message: "",
  });
  const [succsesMessega, SetSuccsesMessega] = useState({
    type: "",
    message: "",
  });
  const [buttonLoader, setButtonLoader] = useState(false);

  const handleLogin = async (evt: any) => {
    evt.preventDefault();
    const { email, password } = evt.target.elements;
    try {
      const data = await axios
        .post("http://localhost:1010/login_buyers", {
          buyer_email: email.value,
          buyer_password: password.value,
        })
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          SetSuccsesMessega({
            type: "succses",
            message: "Muvaffaqiyatli😊",
          });
          setButtonLoader(false);
          window.location.href = "/";
        });
    } catch (error) {
      console.log(error);

      setErrorMessage({
        type: "error",
        message: "Email yoki parol xato",
      });
      setButtonLoader(false);
      setTimeout(() => {
        setErrorMessage({
          type: "",
          message: "",
        });
      }, 5000);
    } finally {
      setButtonLoader(true);
    }
  };

  return (
    <PageTransitionProvider>
      <section>
        <div className="container max-w-1200 py-10 md:py-20">
          <div className="flex flex-wrap md:flex-wrap">
            <div>
              <Image
                src={"/source/image/register/dl.beatsnoop 1.png"}
                width={600}
                height={400}
                alt="image"
              />
            </div>
            <div className="ml-0 md:ml-24 mt-5 md:mt-10 ">
              <h1 className="text-3xl font-semibold mb-3">{`Kirish`}</h1>
              <form onSubmit={handleLogin}>
                {errorMessage.type === "error" && (
                  <p className=" text-xs my-2 text-error font-semibold">
                    {errorMessage.message}
                  </p>
                )}
                {succsesMessega.type === "succses" && (
                  <p className=" my-2 text-success font-semibold">
                    {succsesMessega.message}
                  </p>
                )}
                <div className="relative float-label-input">
                  <input
                    type="email"
                    name="email"
                    placeholder=" "
                    className="w-full md:w-80 bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-md py-3 px-3 block appearance-none leading-normal focus:border-blue-400"
                  />
                  <label
                    form="name"
                    className="absolute top-3 left-0 text-gray-400 pointer-events-none transition duration-200 ease-in-outbg-white px-2 text-grey-darker"
                  >
                    Emailingiz
                  </label>
                </div>
                <div className="relative float-label-input">
                  <input
                    type="password"
                    name="password"
                    placeholder=" "
                    className="w-full md:w-80 bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-md py-3 px-3 block appearance-none leading-normal focus:border-blue-400"
                  />
                  <label
                    form="name"
                    className="absolute top-3 left-0 text-gray-400 pointer-events-none transition duration-200 ease-in-outbg-white px-2 text-grey-darker"
                  >
                    Parolingiz
                  </label>
                </div>
                <button
                  type="submit"
                  className="bg-sky-600 w-full border border-none py-3 text-center rounded-[4px] text-white font-light"
                >{`Kirish`}</button>
              </form>
              <p className="leading-6 opacity-60 mt-5 text-center">
                {`Akkountingiz Yo'qmi?`}
                <Link
                  className="pl-2 underline decoration-1"
                  href={"/register"}
                >
                  Ro'yxatdan o'tish
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageTransitionProvider>
  );
};

export default Login;
