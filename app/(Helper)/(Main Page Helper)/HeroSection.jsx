import { Backpack } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative z-0 w-screen bg-primary">
      <div
        className="p-4 md:p-20 h-[80vh] flex flex-col justify-center items-start bg-primary"
        style={{
          background:
            "linear-gradient(275deg, rgba(82,159,146,0.1) 0%, rgba(33,73,66,0.8) 100%), url('/images/background.jpg')",
          filter:
            'progid:DXImageTransform.Microsoft.gradient(startColorstr="#529f92",endColorstr="#214942",GradientType=1)',
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="lg:w-3/6 text-left flex flex-col justify-start items-start gap-4">
          <p className="text-4xl md:text-6xl text-white font-semibold drop-shadow-lg">
            <span className="text-secondary">DISCOVER</span> OPPORTUNITIES.{" "}
            <br />
            {/* EMPOWER YOUR <span className="text-tertiary">FUTURE.</span> */}
          </p>

          <div className="mt-8 flex flex-row justify-start gap-4 text-center">
            <a
              className="block rounded-full bg-secondary px-6 py-3 text-sm text-white font-bold drop-shadow-lg hover:bg-secondary/80 focus:outline-none w-[180px]"
              href="/opportunities"
            >
              GET STARTED
            </a>
          </div>
        </div>
      </div>
      <div className="absolute top-[80%] left-[calc(50%-100px)]">
        <Image
          src="/images/logo-no-outbg.png"
          width={200}
          height={200}
          alt="Zaad Logo"
        />
      </div>
    </section>
  );
}
