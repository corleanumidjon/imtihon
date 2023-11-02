"use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import PageTransitionProvider from "../components/page-transition";

const Register = () => {
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

  const handleRegister = async (evt: any) => {
    evt.preventDefault();
    const { name, email, password } = evt.target.elements;
    try {
      const data = await axios
        .post("http://localhost:1010/post_buyer", {
          buyer_name: name.value,
          buyer_email: email.value,
          buyer_password: password.value,
        })
        .then((res) => {
          SetSuccsesMessega({
            type: "succses",
            message: "Muvaffaqiyatli😊",
          });
          setButtonLoader(false);
          router.push("/login");
        });
    } catch (error) {
      setErrorMessage({
        type: "error",
        message: "Bu email ro'yxatdan o'tgan iltimos boshqa email kiriting",
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
              <h1 className="text-3xl font-semibold mb-3">{`Ro'yhatdan o'tish`}</h1>
              <p className="text-sm leading-6">Malumotlaringizni kiriting</p>
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
              <form onSubmit={handleRegister}>
                <div className="relative float-label-input">
                  <input
                    type="text"
                    name="name"
                    className="w-full md:w-80 bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-md py-3 px-3 block appearance-none leading-normal focus:border-blue-400"
                  />
                  <label
                    form="name"
                    className="absolute top-3 left-0 text-gray-400 pointer-events-none transition duration-200 ease-in-outbg-white px-2 text-grey-darker"
                  >
                    Ismingiz
                  </label>
                </div>
                <div className="relative float-label-input">
                  <input
                    type="email"
                    name="email"
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
                    className="w-full md:w-80 bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-md py-3 px-3 block appearance-none leading-normal focus:border-blue-400"
                  />
                  <label
                    form="name"
                    className="absolute top-3 left-0 text-gray-400 pointer-events-none transition duration-200 ease-in-outbg-white px-2 text-grey-darker"
                  >
                    Parolingiz
                  </label>
                </div>

                {buttonLoader ? (
                  <div>
                    <button
                      type="button"
                      className="bg-sky-600 w-full border border-none py-3 text-center rounded-[4px] text-white font-light"
                    >
                      <svg
                        aria-hidden="true"
                        role="status"
                        className="inline mr-3 w-4 h-4 text-white animate-spin"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="#E5E7EB"
                        ></path>
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                      {`Ro'yhatdan o'tish`}
                    </button>
                  </div>
                ) : (
                  <button
                    type="submit"
                    className="bg-sky-600 w-full border border-none py-3 text-center rounded-[4px] text-white font-light"
                  >{`Ro'yhatdan o'tish`}</button>
                )}
              </form>

              <p className="leading-6 opacity-60 mt-5 text-center">
                {`Akkountingiz bormi?`}
                <Link className="pl-2 underline decoration-1" href={"/login"}>
                  Kirish
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageTransitionProvider>
  );
};

export default Register;
