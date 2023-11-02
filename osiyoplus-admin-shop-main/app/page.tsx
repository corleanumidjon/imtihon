"use client";
import ECommerce from "@/components/Dashboard/E-commerce";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
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

  return <ECommerce />;
}
