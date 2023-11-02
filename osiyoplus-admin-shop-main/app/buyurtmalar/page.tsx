'use client'
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableTwo from "@/components/Tables/TableTwo";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const TablesPage = () => {
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
  return (
    <>
      <Breadcrumb pageName="Buyurtmalar" />
      <div className="flex flex-col gap-10">
        <TableTwo />
      </div>
    </>
  );
};

export default TablesPage;
