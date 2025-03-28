import { ArrowRight, Backpack } from "lucide-react";
import Image from "next/image";

export default function TrainingHelper() {
  return (
    <section className="relative z-0 w-screen flex flex-col items-center justify-center gap-12 text-lg font-extralight p-12">
      <p className="text-6xl font-bold">Train with Us</p>
      <p>
        We have created a list of videos that will help you succeed in grabbing
        opportunities.
      </p>
      <a href="/training">
        <p className="font-bold text-xl bg-gradient-to-r from-[#429587] to-[#142d28] text-transparent bg-clip-text cursor-pointer inline mr-2">
          Explore the training page
        </p>
        <ArrowRight className="inline text-[#142d28] cursor-pointer " />
      </a>
      <iframe
        className="rounded w-[80vw] lg:w-[55vw] aspect-video"
        src="https://www.youtube.com/embed/jIlHaHM92S4"
        title="My Response To MrBeast"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </section>
  );
}
