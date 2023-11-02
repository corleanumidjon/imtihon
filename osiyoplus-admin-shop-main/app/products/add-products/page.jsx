"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowDown } from "lucide-react";

const FormElements = () => {
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

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState();
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState();
  const [message, setMessage] = useState(false);
  const [getCategorys, setGetCategorys] = useState([]);
  const [number, setNumber] = useState("");
  const formatNumberWithSpaces = (value) => {
    // Remove non-digit characters
    const cleanValue = value.replace(/\D/g, "");

    // Add spaces every three digits
    const formattedValue = cleanValue.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");

    return formattedValue;
  };
  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    const formattedValue = formatNumberWithSpaces(inputValue);
    setNumber(formattedValue);
  };

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

  const postData = (e) => {
    e.preventDefault();

    const formData = new FormData();
    const { file_img, pr_price } = e.target.elements;
    formData.append("pro_name", title);
    formData.append("pro_description", description);
    formData.append("pro_price", pr_price.value);
    formData.append("category_id", category);
    formData.append("pro_img", file_img.files[0]);

    try {
      axios
        .post("http://localhost:1010/post_pro", formData)
        .then((res) => {
          setMessage(true);
          setTimeout(() => {
            setMessage(false);
          }, 5000);
          window.location.reload();
        });
    } catch (error) {
      setMessage(true);
    }
  };

  return (
    <>
      <Breadcrumb pageName="Mahsulot qo'shish" />

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
          <div className="pl-4 text-sm font-normal">Mahsulot qoshildi</div>
        </div>
      ) : (
        ""
      )}

      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            {`Mahsulot qo'shish`}
          </h3>
        </div>

        <form
          onSubmit={(e) => postData(e)}
          className="flex flex-col gap-5.5 p-6.5"
        >
          <div>
            <label className="mb-3 block text-black dark:text-white">
              Product name
            </label>
            <input
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              required
            />
          </div>

          <div>
            <label className="mb-3 block text-black dark:text-white">
              Categorya tanlang
            </label>
            <select
              onChange={(e) => setCategory(Number(e.currentTarget.value))}
              id="countries"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            >
              <option>Categoriya tanlang ↓</option>

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

          <div>
            <label className="mb-3 block text-black dark:text-white">
              Product description
            </label>
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              rows={6}
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              required
            ></textarea>
          </div>

          <div>
            <label className="mb-3 block text-black dark:text-white">
              Product price
            </label>
            <input
              // onChange={(e) => {
              //   setPrice(e.target.value);F
              //   handleInputChange;
              // }}
              // value={value}
              name="pr_price"
              value={number}
              onChange={handleInputChange}
              type="text"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              required
            />
          </div>

          <div>
            <label className="mb-3 block text-black dark:text-white">
              Products Image
            </label>
            <input
              type="file"
              name="file_img"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
              required
            />
          </div>

          <div className="text-right">
            <button
              type="submit"
              className="text-white bg-primays py-2 px-7 rounded hover:bg-blue"
            >{`Qo'shish`}</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default FormElements;
