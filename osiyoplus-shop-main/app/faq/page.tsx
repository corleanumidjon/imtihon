import Image from "next/image";
import PageTransitionProvider from "../components/page-transition";
import AnimatedTextWord from "../components/text-animation";
import TextAnimation from "../components/text-animation";

const Faq = () => {
  return (
    <PageTransitionProvider>
      <section>
        <div className="container max-w-1200 py-20">
          <h2 className="md:text-3xl text-xl font-bold text-dark leading-8 mb-5 text-center">
            {`Mahsulotlarlarni qanday sotib olsam bo'ladi?`}
          </h2>
          <div className="py-10">
            <TextAnimation>
              <p className="text-xl text-black font-extralight text-center">
                {`Bizning saytdan hohlagan mahsulotingizni tanlang va buyurtma berish
            knopkasini ezing. Hamda malumotlaringizni kiriting:Ismingiz va
            telefon raqamingizni kiriting. Sizga tez orada Adminlarimiz aloqaga
            chiqishadi😊`}
              </p>
            </TextAnimation>
          </div>
        </div>
      </section>
    </PageTransitionProvider>
  );
};

export default Faq;
