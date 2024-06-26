import { createClient } from "@/utils/supabase/client";
import { CalendarDays, MapPin, Server } from "lucide-react";
import Mdx from "../../ui/Components/Mdx";
import ErrorPage from "../../ui/Components/ErrorPage";

export default async function id({ params, searchParams }) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("opportunities")
    .select()
    .eq("id", params.id);
  if (error) {
    return <ErrorPage />;
  }
  console.log(data);

  const TYPE = ["Scholarship", "Grant", "Workshop"];

  return (
    <>
      {data[0] ? (
        <>
          <div className="px-2 pt-28 pb-2 w-screen md:px-20 md:pt-28 text-center">
            <p className="text-4xl mb-4">{data[0].name}</p>
            <div className="flex flex-row justify-center items-center gap-2">
              <p className="flex flex-row items-center">
                <MapPin className="inline h-4  w-4 mr-1 text-purple-800" />
                {data[0].country}
              </p>
              <p className="flex flex-row items-center">
                <CalendarDays className="inline h-4  w-4 mr-1 text-purple-800" />
                Deadline: {data[0].deadline}
              </p>
              <p className="flex flex-row items-center">
                <Server className="inline h-4 w-4 mr-1 text-purple-800" />
                Organizer: {data[0].organization}
              </p>
            </div>
            <div className="m-auto mt-2 w-fit cursor-default border px-4 py-1 text-white rounded-lg bg-slate-500">
              #{TYPE[data[0].typeId - 1]}
            </div>
          </div>
          <div className="px-4 py-2 pb-28 md:px-60">
            <Mdx content={data[0].detailed_description} />
          </div>
        </>
      ) : (
        <section>
          <ErrorPage />
        </section>
      )}
    </>
  );
}
