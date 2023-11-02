import "./globals.css";
import Link from "next/link";
import Parallax from "./components/parallax";
import React from "react";
import Image from "next/image";
import "aos/dist/aos.css";
import axios from "axios";
import { ProductsType } from "./interface/productsType";
import PageTransitionProvider from "./components/page-transition";
import TextAnimation from "./components/text-animation";

async function getProducts() {
  const { data } = await axios.get("http://localhost:1010/getproduct");

  return data;
}

export default async function Home() {
  const data: ProductsType[] = await getProducts();

  return (
    <PageTransitionProvider>
      <main>
        <section>
          <Parallax
            className="h-[400px]  xl:h-[500px] w-full"
            bgImage="source/image/slider-8-2.webp"
            bgImageStyle={{ objectFit: "cover" }}
            strength={200}
          >
            <div className="container text-white text-center max-w-1200 py-20">
              <TextAnimation>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold ">
                  Osiyo plus
                </h1>
              </TextAnimation>
              <TextAnimation>
                <p className="text-base font-medium max-w-full sm:max-w-[600px] md:max-w-[800px] mx-auto underline">
                  <Link href="/">www.osiyoplus.uz</Link>
                </p>
              </TextAnimation>
            </div>
          </Parallax>
        </section>
        <section className="bg-lights">
          <div className="py-20 container max-w-1200">
            <div className=" my-5">
              <h2 className="text-2xl font-bold text-dark leading-8	mx-5 xl:mx-0 text-center">
                Bizning xizmatlar
              </h2>
            </div>
            <div className="grid mx-5 xl:mx-0 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {React.Children.toArray(
                [
                  {
                    imageUrl: "/source/image/support/raketa.svg",
                    title: "Tez Start Oling",
                    subTitle: "Ishlab chiqarish uchun eng ma'qul narx va sifat",
                  },
                  {
                    imageUrl: "/source/image/support/cards_svg_2.svg",
                    title: "Ko'plab mahsulotlar",
                    subTitle: "1000ga yaqin judayam ko'p mahsulotlar",
                  },
                  {
                    imageUrl: "/source/image/support/cards_svg_3.svg",
                    title: "Ko'pchilik Tanlovi",
                    subTitle: "Haridorlarimizga ma'qul sifat va tanlov ",
                  },
                  {
                    imageUrl: "/source/image/support/cards_svg_4.svg",
                    title: "Qulay To'lov",
                    subTitle:
                      "Siz o'zingizga qulay bo'lgan to'lov turini tanlashingiz mumkim",
                  },
                  {
                    imageUrl: "/source/image/support/cards_svg_5.svg",
                    title: "Oson Xarid",
                    subTitle:
                      "Mahsulotlarimizni bizning saytdan oson xarid qiling",
                  },
                  {
                    imageUrl: "/source/image/support/cards_svg_6.svg",
                    title: "Tizimli Boshqaruv",
                    subTitle:
                      "Buyurtmalarni tizimli boshqarish va kamchiliklarga yo'l qo'ymaslik",
                  },
                ].map((item, key) => (
                  <div
                    data-aos="zoom-in"
                    data-aos-delay={key * 100}
                    className="p-5 bg-white border border-light cursor-pointer rounded-lg h-full"
                  >
                    <Image
                      src={item.imageUrl}
                      width={60}
                      height={60}
                      alt="img"
                    />
                    <h5 className="mb-2 mt-5 text-lg font-bold  text-gray-900">
                      {item.title}
                    </h5>
                    <p className="mb-1 text-sm font-normal text-gray-500">
                      {item.subTitle}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>
        <section>
          <div className="container max-w-1200 py-20">
            <div className="py-10 flex justify-center md:justify-between items-center">
              <h2 className="text-2xl font-bold text-dark leading-8">
                Bizning mahsulotlar
              </h2>

              <Link
                href="/products"
                className="md:block hidden text-sm text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white active:bg-blue-600 font-bold uppercase px-5 py-3 rounded-full outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
              >
                Barcha mahsulotlar
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {data.slice(0, 12).map((product, idx) => (
                <Link key={idx} href={`/products/${product.pro_id}`}>
                  <div
                    data-aos="fade-up"
                    data-aos-delay={idx * 100}
                    className="bg-gray  h-full border border-lightGray hover:shadow-xl p-6 rounded-lg hover:scale-105 transition-transform ease-out duration-200"
                  >
                    <img
                      className="h-40 rounded w-full object-cover object-center mb-6"
                      src={`http://localhost:1010${product.pro_img}`}
                      alt="content"
                    />
                    <div className="font-semibold items-center mt-4 mb-1">
                      <p className="w-full truncate my-2">{product.pro_name}</p>
                      <p className="tracking-widest text-indigo-500 text-xs font-medium title-font">
                        {product.pro_price} {`so'm`}
                      </p>
                    </div>
                    <p className="leading-relaxed text-base line-clamp-2">
                      {product.pro_description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
        <section className="bg-lights py-24">
          <div className="container py-20 max-w-1200">
            <div className="flex justify-around items-center flex-wrap md:flex-nowrap ">
              {React.Children.toArray(
                [
                  {
                    imageUrl: "/source/image/svg/Services.svg",
                    title: "TEZ YETKAZIB BERISH",
                    description: "O'zbekiston bo'ylab tez yetkazib berish",
                  },
                  {
                    imageUrl: "/source/image/svg/24.7.svg",
                    title: "Mijozlarni qo'llab-quvvatlash",
                    description: "24/7 mijozlarni qo'llab-quvvatlash",
                  },
                  {
                    imageUrl: "/source/image/svg/togritanlov.svg",
                    title: "QULAY TO'LOV",
                    description:
                      "O'zingizga qulay bo'lgan to'lovdan foydalaning",
                  },
                ].map((item, key) => (
                  <div
                    data-aos="fade-down"
                    data-aos-delay={key * 100}
                    className="text-center mt-10 md:mt-0"
                  >
                    <Image
                      src={item.imageUrl}
                      height={80}
                      width={80}
                      alt="alo"
                      className="mx-auto"
                    />
                    <h1 className="mt-6 text-black font-[600] text-[20px]">
                      {item.title}
                    </h1>
                    <p className="text-[14px]">{item.description}</p>
                  </div>
                ))
              )}
              {/* <div data-aos="fade-down" className="text-center mt-10 md:mt-0">
                <Image
                  src="/source/image/svg/24.7.svg"
                  height={80}
                  width={80}
                  alt="alo"
                  className="mx-auto"
                />
                <h1 className="mt-6 text-black font-[600] text-[20px]">{`Mijozlarni qo'llab-quvvatlash`}</h1>
                <p className="text-[14px]">{`24/7 mijozlarni qo'llab-quvvatlash`}</p>
              </div>
              <div data-aos="fade-down" className="text-center mt-16 md:mt-0">
                <Image
                  src="/source/image/svg/togritanlov.svg"
                  height={80}
                  width={80}
                  alt="alo"
                  className="mx-auto"
                />
                <h1 className="mt-6 text-black font-[600] text-[20px]">{`QULAY TO'LOV`}</h1>
                <p className="text-[14px]">{`O'zingizga qulay bo'lgan to'lovdan foydalaning`}</p>
              </div> */}
            </div>
          </div>
        </section>
      </main>
    </PageTransitionProvider>
  );
}
