import ErrorPage from "@/app/ui/Components/ErrorPage";
import Mdx from "../../ui/Components/Mdx";
import { createClient } from "@/utils/supabase/client";
import { CalendarDays, MapPin } from "lucide-react";
import Image from "next/image";
import { unstable_noStore } from "next/cache";

export default async function BlogContentPage({ params }) {
  unstable_noStore();
  const supabase = createClient();
  const { data, error } = await supabase
    .from("blog")
    .select()
    .eq("id", params.id);
  if (error) {
    console.log(error.message);
    return <div>null</div>;
  }
  const { name, date, image } = data[0];

  return (
    <>
      {data[0] ? (
        <section className="w-100 min-h-screen flex flex-col items-center justify-start">
          <div className="px-2 pt-28 pb-8 w-screen md:px-20 md:pt-28 text-center">
            <p className="text-4xl mb-4">{name}</p>
            <div className="flex flex-row justify-center items-center gap-2">
              <p className="flex flex-row items-center">
                <CalendarDays className="inline h-4  w-4 mr-1 text-purple-800" />
                Date: {new Date(date).toDateString()}
              </p>
            </div>
            <Image
              src={image}
              height={400}
              width={500}
              style={{
                marginTop: "2rem",
                objectFit: "cover",
                objectPosition: "50% 50%",
              }}
              className="m-auto"
            />
          </div>

          <Mdx content={data[0].content} />
        </section>
      ) : (
        <>
          <ErrorPage />
        </>
      )}
    </>
  );
}
