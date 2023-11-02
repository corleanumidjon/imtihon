"use client";
import "aos/dist/aos.css";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { ProductsType } from "@/app/interface/productsType";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ReactModal from "react-modal";
import Link from "next/link";
import PageTransitionProvider from "@/app/components/page-transition";
import TextAnimation from "@/app/components/text-animation";

const SingleProduct = () => {
  const token = localStorage.getItem("token");
  const [products, setProduct] = useState<ProductsType>();
  const [pr, setPr] = useState<any>();
  const [message, setMessage] = useState<boolean>(false);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [sendProduct, setSendProduct] = useState<ProductsType>();
  const [sendUsername, setSendUsername] = useState("");
  const [sendUserPhoneNumber, setSendUserPhoneNumber] = useState("");
  const [buttonLoader, setButtonLoader] = useState(false);
  const [productLoading, setProductLoading] = useState(false);

  const [orderMessage, setOrderMessage] = useState({
    type: "",
    message: "",
  });

  function openModal() {
    setIsOpen(true);
  }
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }
  function closeModal() {
    setIsOpen(false);
  }
  const handlePhoneNumberChange = (value: any) => {
    console.log(value);

    if (value && value.length === 7) {
      setPhoneNumber(value);
    }
    setSendUserPhoneNumber(value);
  };

  const sendData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      axios
        .post(
          "http://localhost:1010/post_order",
          {
            order_name: sendProduct?.pro_name,
            order_price: sendProduct?.pro_price,
            order_description: sendProduct?.pro_description,
            order_img: sendProduct?.pro_img,
            user_name: sendUsername,
            user_phone: sendUserPhoneNumber,
          },
          {
            headers: {
              Authorization: `Basic ${token}`,
            },
          }
        )
        .then((res) => {
          setMessage(true);
          setTimeout(() => {
            setMessage(false);
            window.location.href = "/order";
          }, 4000);
          setButtonLoader(false);
          setOrderMessage({
            type: "true",
            message: "Buyurtma yuborildi",
          });
        });
    } catch (error) {
      alert("Serverda xatoloik yuz berdi");
      setButtonLoader(false);
      setOrderMessage({
        type: "false",
        message: "Buyurtma yuborilmadi",
      });
    } finally {
      setButtonLoader(true);
    }
  };

  useEffect(() => {
    const getProducts = async () => {
      try {
        const { data } = await axios.get("http://localhost:1010/getproduct");
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, []);

  const { id } = useParams();

  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch(`http://localhost:1010/get_pro_id/${id}`);
        const product = await res.json();
        setProduct(product);
        setProductLoading(false);
      } catch (error) {
        setProductLoading(true);
      }
    }

    getData();
  }, [id]);

  // Get Product
  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch(`http://localhost:1010/getproduct`);
        const product = await res.json();

        setPr(product);
        setProductLoading(true);
      } catch (error) {
        setProductLoading(false);
      }
    }
    getData();
  }, []);

  return (
    <PageTransitionProvider>
      <ReactModal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={{
          content: {
            width: "auto", // Modalning 90% ekran enini egallash
            maxWidth: "300px", // Eng katta o'lcham
            margin: "auto", // Markazga centrlash
            paddingTop: "15px",
            borderRadius: "10px",
            boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
            background: "white", // Markazga centrlash
            border: "none",
            height: "25%",
          },
        }}
        contentLabel="Example Modal"
        overlayClassName="modal-overlay"
      >
        {orderMessage.type === "true" && (
          <h1 className="my-2 text-green-700 text-center font-semibold">
            {orderMessage.message}
          </h1>
        )}
        {orderMessage.type === "false" && (
          <h1 className="my-2 text-red-700 text-center font-semibold">
            {orderMessage.message}
          </h1>
        )}
        <form onSubmit={(e) => sendData(e)}>
          <div className="mt-2">
            <input
              onChange={(e) => setSendUsername(e.target.value)}
              type="text"
              name="user_name"
              id="first_name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 "
              placeholder="Ismingiz"
              required
            />
          </div>
          <div className="my-2">
            <PhoneInput
              international
              type="tel"
              id="first_name"
              limitMaxLength={true}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 "
              required
              defaultCountry="UZ"
              value={phoneNumber}
              onChange={(e) => handlePhoneNumberChange(e)}
            />
          </div>
          {token ? (
            <div className="w-full">
              {buttonLoader ? (
                <button
                  type="submit"
                  className=" bg-orange text-white py-3  rounded-full hover:shadow-md w-full"
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
                  {`Buyurtma berish`}
                </button>
              ) : (
                <button
                  type="submit"
                  className=" bg-orange text-white py-3  rounded-full hover:shadow-md w-full"
                >
                  {`Buyurtma berish`}
                </button>
              )}
            </div>
          ) : (
            <h1 className="text-dark text-center text-base">
              Mahsulot xarid qilish uchun
              <Link href={"/register"} className="underline px-1">
                Ro'yxatdan o'ting
              </Link>
              yoki{" "}
              <Link href={"/login"} className="underline">
                kiring
              </Link>
            </h1>
          )}
        </form>
      </ReactModal>
      <div className="container max-w-1200 py-20">
        {productLoading ? (
          <div className="flex justify-start flex-wrap md:flex-nowrap ">
            <div data-aos="fade-up" className="max-w-[600px]">
              <img
                src={`http://localhost:1010${products?.pro_img}`}
                alt="image"
                style={{ width: "1200px", height: "500px", objectFit: "cover" }}
              />
            </div>
            <div className="md:pt-0 pt-5 ml-0 md:ml-20 w-full">
              <TextAnimation>
                <h1 className="text-[24px] font-bold">{products?.pro_name}</h1>
              </TextAnimation>
              <TextAnimation>
                <p className="mt-3 font-medium text-[24px]">
                  <span className="font-bold text-[26px]">Narxi:</span>{" "}
                  {products?.pro_price}
                  {` so'm`}
                </p>
              </TextAnimation>
              <TextAnimation>
                <p className="mt-5 text-sm">{products?.pro_description}</p>
              </TextAnimation>
              <hr className="h-px my-8 bg-line border-0" />
              <button
                onClick={() => {
                  setSendProduct(products);
                  openModal();
                }}
                className="text-white bg-orange hover:shadow-xl max-w-full w-1/2 font-medium rounded-lg text-sm px-4 py-2.5 text-center "
              >
                Buyurtma berish
              </button>
            </div>
          </div>
        ) : (
          "Mahsulotlar yuklanmoqda..."
        )}

        <h2 className="text-2xl font-bold text-dark leading-8 mt-32 mb-5">
          Boshqa mahsulotlar
        </h2>
        <div className="grid grid-cols-1 justify-center sm:justify-start sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[30px] ">
          {productLoading
            ? pr.slice(3, 12).map((data: any, idx: any) => (
                <Link key={idx} href={`/products/${data.pro_id}`}>
                  <div
                    data-aos="fade-up"
                    data-aos-delay={idx * 100}
                    className="hover:shadow-xl bg-gray lg:mx-0 mx-5  border border-lightGray p-6 rounded-lg hover:scale-105 transition-transform ease-out duration-200 h-full"
                  >
                    <img
                      className="h-40 rounded w-full object-cover object-center mb-6"
                      src={`http://localhost:1010${data.pro_img}`}
                      alt="image"
                    />
                    <div className="font-semibold items-center mt-4 mb-1">
                      <p className="w-full truncate my-2">{data.pro_name}</p>
                      <p className="tracking-widest text-indigo-500 text-xs font-medium title-font">
                        {data.pro_price} {`so'm`}
                      </p>
                    </div>
                    <p className="leading-relaxed text-base line-clamp-2">
                      {data.pro_description}
                    </p>
                  </div>
                </Link>
              ))
            : "Malumot yuklanmoqda..."}
        </div>
      </div>
    </PageTransitionProvider>
  );
};

export default SingleProduct;
