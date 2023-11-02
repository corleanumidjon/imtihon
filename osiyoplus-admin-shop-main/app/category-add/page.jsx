"use client";
import axios from "axios";
import { Pencil, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";

const AddCategory = () => {
  const router = useRouter();
  const token = localStorage.getItem("token");
  useEffect(() => {
    // Tokenni olish
    const token = localStorage.getItem("token");

    // Token mavjudligini tekshirish
    if (!token) {
      // Agar token mavjud bo'lmasa, login sahifasiga qaytish
      router.push("/login");
    }
  }, [token]);

  const [currentCategory, setCurrentCatogory] = useState("");
  const [categroyName, setCategoryName] = useState("");
  const [buttonLoader, setButtonLoader] = useState(false);
  const [buttonLoader2, setButtonLoader2] = useState(false);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [message, setMessage] = useState({
    type: "",
    message: "",
  });
  const [getCategorys, setGetCategorys] = useState([]);
  const [editCategoryName, setEditCategoryName] = useState("");

  // Send category
  const handleCategory = (e) => {
    e.preventDefault();
    const { ct_name } = e.target.elements;

    axios
      .post("http://localhost:1010/post_category", {
        category_name: ct_name.value,
      })
      .then((res) => {
        setButtonLoader(false);
        setMessage({
          type: "succses",
          message: "Muvaffaqiyatli qo'shildi",
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((err) => {
        setButtonLoader(false);
        setMessage({
          type: "error",
          message: "Serverda xatolik yuz berdi!",
        });
        setTimeout(() => {
          setMessage({
            type: "",
            message: "",
          });
        }, 4000);
      }).finally;
    {
      setButtonLoader(true);
    }
  };

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

  // Edit category
  const sendCategory = (e) => {
    e.preventDefault();

    const id = currentCategory?.category_id;

    const { new_ctg } = e.target.elements;

    axios
      .put(`http://localhost:1010/update_category/${id}`, {
        category_name: new_ctg.value,
      })
      .then((res) => {
        window.location.reload();
        setButtonLoader2(false);
      })
      .catch((err) => {
        alert("Severda xatolik yuz berdi");
        setButtonLoader2(true);
      }).finally;
    {
      setButtonLoader2(true);
    }
  };

  // Delete category
  const deleteCategory = (id) => {
    axios
      .delete("http://localhost:1010/delete_category/" + id)
      .then((res) => window.location.reload())
      .catch((err) => alert("Serverda xatolik yuz berdi"));
  };

  function openModal() {
    setIsOpen(true);
  }
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }
  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    if (currentCategory) {
      setEditCategoryName(currentCategory.category_name);
    }
  }, [currentCategory]);

  return (
    <>
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
            background: "#1A222C", // Markazga centrlash
            border: "none",
            height: "20%",
          },
        }}
        contentLabel="Example Modal"
        overlayClassName="modal-overlay"
      >
        <form onSubmit={(e) => sendCategory(e)}>
          <div className="mt-2">
            <input
              value={editCategoryName}
              onChange={(e) => setEditCategoryName(e.target.value)}
              type="text"
              name="new_ctg"
              id="first_name"
              className="rounded-lg border-[1.5px] border-stroke bg-transparent py-2 px-2 w-full font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-white"
              placeholder="Yangi categoriya nomi"
              required
            />
          </div>
          <div className="w-full">
            {buttonLoader2 ? (
              <button
                type="button"
                className="text-white bg-primays py-2 px-7 rounded-full hover:bg-blue mt-5 w-full"
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
                Yangilash
              </button>
            ) : (
              <button
                type="submit"
                className="text-white bg-primays py-2 px-7 rounded-full hover:bg-blue mt-5 w-full"
              >{`Yangilash`}</button>
            )}
          </div>
        </form>
      </ReactModal>
      <section>
        <h1 className="text-2xl">{`Categorya qo'shish`}</h1>
        {message.type === "succses" && (
          <h1 className="my-2 text-success text-center font-semibold">
            {message.message}
          </h1>
        )}
        {message.type === "error" && (
          <h1 className="my-2 text-danger text-center font-semibold">
            {message.message}
          </h1>
        )}
        <form onSubmit={(e) => handleCategory(e)}>
          <div className="mt-5">
            <label className="mb-2 block text-black  dark:text-white">
              Categoriya nomi
            </label>
            <input
              value={categroyName}
              type="text"
              name="ct_name"
              required
              onChange={(e) => setCategoryName(e.target.value)}
              className=" w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-white"
            />
          </div>
          <div className="text-right mt-6">
            {buttonLoader ? (
              <button
                type="button"
                className="text-white bg-primays py-2 px-7 rounded hover:bg-blue"
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
                {`Qo'shish`}
              </button>
            ) : (
              <button
                type="submit"
                className="text-white bg-primays py-2 px-7 rounded hover:bg-blue"
              >{`Qo'shish`}</button>
            )}
          </div>
        </form>
      </section>
      <section>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg"></div>
        <div className="my-5 w-full">
          <table className="w-full text-sm text-left text-gray-500 my-5">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-black  dark:text-gray">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Categorya name
                </th>
                <th scope="col" className="px-6 py-3">
                  Category edit
                </th>
                <th scope="col" className="px-6 py-3">
                  Category delete
                </th>
              </tr>
            </thead>
            {getCategorys.map((el, i) => (
              <tbody key={i}>
                <tr className="bg-white border-b dark:bg-black dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {el.category_name}
                  </th>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => {
                        openModal();
                        setCurrentCatogory(el);
                      }}
                      className="font-medium hover:text-danger  text-blue-600 dark:text-blue-500  flex items-center"
                    >
                      <Pencil
                        strokeWidth="1"
                        width="18px"
                        className="ms-2 hover:text-danger"
                      />
                      <span>Edit</span>
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={(e) => deleteCategory(el.category_id)}
                      className="font-medium hover:text-danger  text-blue-600 dark:text-blue-500  flex items-center"
                    >
                      <Trash
                        strokeWidth="1"
                        width="18px"
                        className="ms-2 hover:text-danger"
                      />
                      <span>Delete</span>
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </section>
    </>
  );
};

export default AddCategory;
