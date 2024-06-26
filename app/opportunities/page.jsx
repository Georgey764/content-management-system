import OpportunitySection from "./(Helpers)/OpportunitySection";

export const metadata = {
  title: "Opportunities",
  description: "Here you will find different opportunities.",
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
