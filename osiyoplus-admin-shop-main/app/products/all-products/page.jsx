"use client";
import React from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import axios from "axios";
import { Trash2, ClipboardEdit, X, Pointer } from "lucide-react";
import { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { useRouter } from "next/navigation";

const FormLayout = () => {
  const token = localStorage.getItem("token");
  const router = useRouter();
  useEffect(() => {
    // Tokenni olish
    const token = localStorage.getItem("token");

    // Token mavjudligini tekshirish
    if (!token) {
      // Agar token mavjud bo'lmasa, login sahifasiga qaytish
      router.push("/login");
    }
  }, [token]);

  // React Modal
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }
  function closeModal() {
    setIsOpen(false);
  }

  // Edit product state
  const [changeName, setChangeName] = useState();
  const [changeDeck, setChangeDeck] = useState("");
  const [changeCategory, setChangeCategory] = useState("");
  const [changePrice, setChangePrice] = useState("");
  const [changeImage, setChangeImage] = useState();
  const [image, setImage] = useState();

  // Product data
  const [data, setData] = useState([]);
  const [currentMahsulot, setCurrentMahsulot] = useState();
  const [message, setMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [getCategorys, setGetCategorys] = useState([]);
  const [search, setSearch] = useState("");

  const editProduct = (e) => {
    e.preventDefault();

    const id = currentMahsulot?.pro_id;
    const formData = new FormData();
    const { file_img } = e.target.elements;
    formData.append("pro_name", changeName);
    formData.append("pro_description", changeDeck);
    formData.append("pro_price", changePrice);
    formData.append("category_id", changeCategory);
    formData.append("pro_img", file_img.files[0]);
    try {
      axios
        .put(`http://localhost:1010/putproduct/${id}`, formData)
        .then((res) => {
          window.location.reload();
        });
    } catch (error) {
      alert("Serverda xatolik yuz berdi");
    }
  };

  const handleImageChange = (e) => {
    // setImage(e.target.files[0]);
  };

  // Delete prodct
  const deleteProduct = (id) => {
    try {
      axios.delete("http://localhost:1010/deleteproduct/" + id).then((res) => {
        setMessage(true);
        setTimeout(() => {
          setMessage(false);
        }, 3000);
        window.location.reload();
      });
    } catch (error) {}
  };

  // Get Products
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get("http://localhost:1010/getproduct");
        setData(data);
      } catch (error) {
        alert("Serverda xatolik yuz berdi :(");
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, []);

  // Update Products data
  useEffect(() => {
    if (currentMahsulot) {
      setChangeName(currentMahsulot.pro_name);
      setChangeDeck(currentMahsulot.pro_description);
      setChangePrice(currentMahsulot.pro_price);
      // setChangeCategory(currentMahsulot.category_name);
    }
  }, [currentMahsulot]);

  // Get category
  useEffect(() => {
    const getCategory = () => {
      try {
        axios.get("http://localhost:1010/get_category").then((res) => {
          setGetCategorys(res.data);
        });
      } catch (error) {
        alert("Serverda xatolik yuz berdi :( ");
      }
    };
    getCategory();
  }, []);

  return (
    <>
      <ReactModal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={{
          content: {
            width: "90%", // Modalning 90% ekran enini egallash
            maxWidth: "800px", // Eng katta o'lcham
            margin: "auto", // Markazga centrlash
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
            background: "#1A222C", // Markazga centrlash
            border: "none",
          },
        }}
        contentLabel="Example Modal"
        overlayClassName="modal-overlay"
      >
        <div className="flex justify-between items-center">
          <h2 className="text-2xl text-white">{`Mahsulotlarni o'zgartirish`}</h2>
          <X
            color="red"
            className="cursor-pointer text-right"
            onClick={closeModal}
          >
            close
          </X>
        </div>
        <form onSubmit={(e) => editProduct(e)}>
          <div className="mt-5">
            <label className="mb-2 block text-white">Mahsulot nomi</label>
            <input
              value={changeName}
              type="text"
              onChange={(e) => setChangeName(e.target.value)}
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-white"
            />
          </div>
          <div className="mt-5">
            <label className="mb-2 block text-white">Mahsulot haqida</label>
            <textarea
              value={changeDeck}
              rows={4}
              onChange={(e) => setChangeDeck(e.target.value)}
              className="w-full rounded-lg border-[1.5px] text-white border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            ></textarea>
          </div>
          <div className="mt-5">
            <label className="mb-3 block text-white">Mahsulot narxi</label>
            <input
              value={changePrice}
              type="text"
              onChange={(e) => setChangePrice(e.target.value)}
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-white"
            />
          </div>
          <div className="mt-5">
            <label className="mb-3 block text-black dark:text-white">
              Categorya tanlang
            </label>
            <select
              onChange={(e) => setChangeCategory(Number(e.currentTarget.value))}
              id="countries"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            >
              <option>{`Categoriyasini kiriting↓`}</option>
              {getCategorys.map((el, indx) => (
                <option
                  key={indx}
                  itemID={el.category_id.toString()}
                  value={el.category_id}
                >
                  {el.category_name}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-5">
            <label className="mb-2 block text-white">Mahsulot rasmi</label>
            <input
              onChange={handleImageChange}
              type="file"
              name="file_img"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-white"
            />
          </div>
          <div className="text-right mt-5">
            <button
              type="submit"
              className="text-white bg-primays py-2 px-7 rounded hover:bg-blue"
            >{`Yangilash`}</button>
          </div>
        </form>
      </ReactModal>
      {message ? (
        <div
          id="toast-simple"
          className="flex items-center w-full max-w-xs p-4 space-x-4 text-gray-500 bg-white divide-x divide-gray-200 rounded-lg shadow dark:divide-gray-700 space-x dark:bg-bgGrays my-5 mx-auto"
          role="alert"
        >
          <svg
            className="w-5 h-5 text-blue-600 dark:text-blue-500 rotate-45"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m9 17 8 2L9 1 1 19l8-2Zm0 0V9"
            />
          </svg>
          <div className="pl-4 text-sm font-normal">{`Mahsulot o'chirildi`}</div>
        </div>
      ) : (
        ""
      )}
      <Breadcrumb pageName="Barcha mahsulotlar" />
      <form className="my-10">
        <div className="mt-5">
          <label className="mb-2 block text-white">Mahsulot qidirish</label>
          <input
            onChange={(e) => setSearch(e.target.value)}
            type="search"
            placeholder="Search..."
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-2.5 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-white"
          />
        </div>
      </form>
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-3">
        {isLoading
          ? "Mahsulotlar yuklanmoqda..."
          : data
              .filter((item) => {
                return search.toLowerCase() === ""
                  ? item
                  : item.pro_name.toLowerCase().includes(search);
              })
              .map((el, indx) => (
                <div
                  key={indx}
                  className="bg-white border w-full h-full border-gray-200 rounded-lg shadow-lg max-w-[400px] sm:max-w-full mx-auto dark:bg-bgGrays dark:border-grayBorder"
                >
                  <div className="h-90">
                    <img
                      className="p-5 h-full hover:scale-105 transition duration-500 cursor-pointer -z-30 w-full object-cover"
                      src={`http://localhost:1010${el.pro_img}`}
                      alt="product image"
                    />
                  </div>
                  <h1 className="px-5 pb-2 text-xl text-black font-semibold tracking-tight dark:text-white">
                    {el.pro_name}
                  </h1>
                  <div className="px-5 pb-5">
                    <p className="text-lg tracking-tight text-black dark:text-gray">
                      {el.pro_description}
                    </p>
                    <div className="flex items-center justify-between mt-5">
                      <span className="text-3xl font-bold text-gray-900 ">
                        {el.pro_price}
                      </span>
                      <div className="cursor-pointer flex">
                        <Trash2
                          onClick={() => deleteProduct(el.pro_id)}
                          color="red"
                          className="mx-4"
                        />
                        <div>
                          <button
                            onClick={() => {
                              setCurrentMahsulot(el);
                              openModal();
                            }}
                          >
                            <ClipboardEdit />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
      </div>
    </>
  );
};

export default FormLayout;
