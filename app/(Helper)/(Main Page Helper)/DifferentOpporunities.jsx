"use client";

import * as React from "react";
import {
  ArrowRight,
  BriefcaseBusiness,
  DollarSign,
  GraduationCap,
  HardHat,
  HelpingHand,
  Star,
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const findOpportunities = [
  {
    id: 1,
    name: "Scholarships",
    description: "Paid opportunities for studies.",
    logo: <GraduationCap />,
  },
  {
    id: 2,
    name: "Grants",
    description: "Funds for your projects and ideas.",
    logo: <DollarSign />,
  },
  {
    id: 3,
    name: "Internship",
    description: "Work experience to get your foot in the door.",
    logo: <BriefcaseBusiness />,
  },
  {
    id: 4,
    name: "Traineeships",
    description: "Get training for your job",
    logo: <HardHat />,
  },
  {
    id: 5,
    name: "Volunteer",
    description: "Be the help that the world needs",
    logo: <HelpingHand />,
  },
  {
    id: 6,
    name: "Fellowship",
    description: "To help you in your studies",
    logo: <Star />,
  },
];

export default function FeaturedOpportunities() {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  return (
    <section className="z-20 mt-44 mb-20 text-center flex flex-col items-center gap-8">
      <h1 className="text-6xl font-extrabold bg-gradient-to-r from-[#142d28] to-[#48ac9b] text-transparent bg-clip-text">
        Get a head start with
        <br />
        Options
      </h1>
      <p className="md:w-3/6 text-xl font-extralight leading-8">
        Check out our curated list of scholarships, workshops, internships,
        grants, and many more available to youths of MENA region.
      </p>
      <a href="/opportunities">
        <p className="font-bold text-xl bg-gradient-to-r from-[#429587] to-[#142d28] text-transparent bg-clip-text cursor-pointer inline mr-2">
          Explore the opportunities page
        </p>
        <ArrowRight className="inline text-[#142d28] cursor-pointer " />
      </a>
      <Carousel
        opts={{
          align: "start",
        }}
        plugins={[plugin.current]}
        className="w-[60vw] md:w-[80vw] max-w-[80vw]"
      >
        <CarouselContent>
          {findOpportunities.map((cur, index) => (
            <CarouselItem
              key={cur + index}
              className="md:basis-1/2 lg:basis-1/3"
            >
              <div className="p-1">
                <a
                  className="shadow-lg block rounded-xl border border-gray-100 p-4 drop-shadow-2xl  hover:border-[#f39200] hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring"
                  href="/opportunities"
                  key={cur.id}
                >
                  <span className="bg-slate-200 inline-block rounded-lg bg-gray-50 p-3">
                    {cur.logo}
                  </span>

                  <h2 className="mt-2 font-bold">{cur.name}</h2>

                  <p className="hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-600">
                    {cur.description}
                  </p>
                </a>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
}
