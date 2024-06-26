import OpportunitySection from "./(Helpers)/OpportunitySection";

export const metadata = {
  title: "Browse Opportunities",
  description:
    "Search for different scholarships, internships, workshops, grants, fellowships, training, etc in and around MENA region.",
};

export default function Opportunities({ searchParams }) {
  return (
    <div className="px-0 py-28 w-screen md:px-20 md:py-28 text-center bg-secondary/20 border-b">
      <p className="text-3xl">Browse All Opportunities</p>
      <p className="mt-4 font-extralight">Search for different opportunities</p>
      <OpportunitySection searchParams={searchParams} />
    </div>
  );
}
