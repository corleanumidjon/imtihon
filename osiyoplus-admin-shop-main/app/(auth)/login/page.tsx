"use client";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Login = () => {
  const tokens = localStorage.getItem("token");
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
  const [token, setToken] = useState("");

  const handleLogin = (e: any) => {
    e.preventDefault();
    const { username, password } = e.target.elements;

    axios
      .post("http://localhost:1010/login_admin", {
        company_email: username.value,
        password: password.value,
      })
      .then((res) => {
        setToken(res.data.token);
        localStorage.setItem("token", res.data.token);
        window.location.href = "/";
        SetSuccsesMessega({
          type: "succses",
          message: "Muvaffaqiyatli",
        });
        setButtonLoader(false);
      })
      .catch((err) => {
        setErrorMessage({
          type: "error",
          message: "Username yoki Parol xato",
        });
        setButtonLoader(false);
        setTimeout(() => {
          setErrorMessage({
            type: "",
            message: "",
          });
        }, 3000);
      }).finally;
    {
      setButtonLoader(true);
    }
  };

  return (
    <section className="hello">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen md:h-screen lg:py-0 ">
        <Link
          href="/login"
          className="flex text-white items-center mb-6 text-2xl font-semibold"
        >
          <img
            className="w-8 h-8 mr-2"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
          />
          www.osiyoplus.com
        </Link>
        <div className="w-full bg-black rounded-lg shadow-lg border md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
              Login
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={(e) => handleLogin(e)}
            >
              <div>
                <label className="block mb-2 text-sm font-medium text-white">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  className="border border-gray text-graydark font-semibold sm:text-sm rounded-lg  block w-full p-2.5 "
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 text-white">
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  className=" border border-gray text-graydark font-semibold sm:text-sm rounded-lg  block w-full p-2.5"
                  required
                />
              </div>
              <div>
                {buttonLoader ? (
                  <div>
                    <button
                      type="button"
                      className="w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-graydark"
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
                      Kirish
                    </button>
                  </div>
                ) : (
                  <button
                    type="submit"
                    className="w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-graydark"
                  >
                    Kirish
                  </button>
                )}
              </div>
            </form>
            {errorMessage.type === "error" && (
              <h1 className="text-center my-2 text-error font-semibold">
                {errorMessage.message}
              </h1>
            )}
            {succsesMessega.type === "succses" && (
              <h1 className="text-center my-2 text-success font-semibold">
                {succsesMessega.message}
              </h1>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
