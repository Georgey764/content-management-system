import BlogCardSection from "./(BlogCards)/BlogCardSection";
import Modals from "../ui/Components/Modals";

export const metadata = {
  title: "Blogs - Zaad",
  description:
    "This page contains a list of blogs to help the youths of MENA region find opportunities",
};

export default function Blog({ searchParams }) {
  return (
    <section className="bg-secondary/20 px-0 py-28 w-screen md:px-20 md:py-28 text-center">
      <p className="text-3xl mb-4">Blog</p>
      <span className="font-extralight">Check out all our blogs!</span>
      <Modals searchParams={searchParams} />
      <BlogCardSection />
    </section>
  );
}
