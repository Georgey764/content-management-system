import "dotenv/config";
import {
  BriefcaseBusiness,
  DollarSign,
  GraduationCap,
  HandHelping,
  HardHat,
  HelpingHand,
  Star,
  Terminal,
} from "lucide-react";
import Image from "next/image";
import Modals from "./ui/Components/Modals";
import BlogSection from "./(Helper)/(Main Page Helper)/BlogSection";
import TrainingHelper from "./(Helper)/(Main Page Helper)/TrainingHelper";

export const metadata = {
  title: "CMS",
  description: "Content management system for cars and blogs.",
};

export default async function Home({ searchParams }) {
  const findOpportunities = [
    {
      id: 1,
      name: "One Topic",
      description: "Topic description goes here.",
      logo: <GraduationCap />,
    },
    {
      id: 2,
      name: "Two Topic",
      description: "Topic description goes here.",
      logo: <DollarSign />,
    },
    {
      id: 3,
      name: "Three Topic",
      description: "Topic description goes here.",
      logo: <BriefcaseBusiness />,
    },
    {
      id: 4,
      name: "Four Topic",
      description: "Topic description goes here.",
      logo: <HardHat />,
    },
    {
      id: 5,
      name: "Five Topic",
      description: "Topic description goes here.",
      logo: <HelpingHand />,
    },
    {
      id: 6,
      name: "Six Topic",
      description: "Topic description goes here.",
      logo: <Star />,
    },
  ];

  return (
    <main className="z-0 relative top-0 left-0 flex w-screen min-h-screen flex-col items-center justify-between px-2">
      <Modals searchParams={searchParams} />
      <section className="z-0 bg-secondary/20 w-screen">
        <div className="px-4 lg:mx-auto flex flex-col lg:flex-row justify-center items-center max-w-screen-xl lg:px-4 py-24 lg:flex lg:h-[90vh] lg:items-center lg:justify-around lg:text-left text-center">
          <div className="lg:w-3/6">
            <h1 className="text-3xl text-black font-extrabold sm:text-5xl">
              Your Company
              <strong className="font-extrabold text-primary sm:block">
                {" "}
                Slogan Goes Here{" "}
              </strong>
            </h1>

            <p className="mt-4 sm:text-base/relaxed font-extralight text-gray-500 text-sm">
              Describe what your company does in here. Or you can think of
              something creative that describes your company!
            </p>

            <div className="mt-8 flex flex-wrap justify-left gap-4">
              <a
                className="mx-auto lg:m-0 block rounded bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-primary/90 focus:outline-none focus:ring active:bg-primary/90 w-[180px]"
                href="/opportunities"
              >
                Get Started
              </a>
            </div>
          </div>
          <div className="hidden lg:block">
            <Image
              src="/images/logo.svg"
              width={350}
              height={350}
              alt="Picture of the author"
            />
          </div>
        </div>
      </section>
      <section className="z-20">
        <div className="max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
          <div className="grid grid-cols-1 gap-y-8 lg:grid-cols-2 lg:items-center lg:gap-x-16">
            <div className="mx-auto max-w-lg text-center lg:mx-0 ltr:lg:text-left rtl:lg:text-right">
              <h2 className="text-3xl font-bold sm:text-4xl">Topic Number 1</h2>

              <p className="mt-4 text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                sodales suscipit consequat. Phasellus scelerisque malesuada
                nisi. Suspendisse tempus tellus arcu.
              </p>

              <a
                href="/opportunities"
                className="mt-8 inline-block rounded bg-primary px-12 py-3 text-sm font-medium text-white transition hover:bg-primary/90 focus:outline-none focus:ring focus:ring-yellow-400"
              >
                Action Button
              </a>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {findOpportunities.map((cur) => {
                return (
                  <a
                    className="block rounded-xl border border-gray-100 p-4 shadow-sm hover:border-[#f39200] hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring"
                    href="/opportunities"
                    key={cur.id}
                  >
                    <span className="inline-block rounded-lg bg-gray-50 p-3">
                      {cur.logo}
                    </span>

                    <h2 className="mt-2 font-bold">{cur.name}</h2>

                    <p className="hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-600">
                      {cur.description}
                    </p>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <TrainingHelper />

      <BlogSection />
      {/* <section className="bg-gray-50 w-screen">
          <div className="p-8 md:p-12 lg:px-16 lg:py-24">
            <div className="mx-auto max-w-lg text-center">
              <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit
              </h2>

              <p className="hidden text-gray-500 sm:mt-4 sm:block">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae
                dolor officia blanditiis repellat in, vero, aperiam porro ipsum
                laboriosam consequuntur exercitationem incidunt tempora nisi?
              </p>
            </div>

            <div className="mx-auto mt-8 max-w-xl">
              <form action="#" className="sm:flex sm:gap-4">
                <div className="sm:flex-1">
                  <label htmlFor="email" className="sr-only">
                    Email
                  </label>

                  <input
                    type="email"
                    placeholder="Email address"
                    className="w-full rounded-md border-gray-200 bg-white p-3 text-gray-700 shadow-sm transition focus:border-white focus:outline-none focus:ring focus:ring-yellow-400"
                  />
                </div>

                <button
                  type="submit"
                  className="group mt-4 flex w-full items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 text-white transition focus:outline-none focus:ring focus:ring-yellow-400 sm:mt-0 sm:w-auto"
                >
                  <span className="text-sm font-medium"> Sign Up </span>

                  <svg
                    className="size-5 rtl:rotate-180"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </section> */}
    </main>
  );
}
