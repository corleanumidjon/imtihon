import React from "react";
import PageTransitionProvider from "../components/page-transition";
import TextAnimation from "../components/text-animation";

export default function About() {
  return (
    <PageTransitionProvider>
      <section>
        <div className="container max-w-1200 py-20">
          <TextAnimation>
            <h1 className="text-center font-semibold text-3xl text-gray-950">
              WWW.OSIYOLUS.UZ
            </h1>
            <p className="text-center">{`Sayt 2023-yildan beri xizmat ko'rsatmoqda`}</p>
          </TextAnimation>
        </div>
      </section>
    </PageTransitionProvider>
  );
}
