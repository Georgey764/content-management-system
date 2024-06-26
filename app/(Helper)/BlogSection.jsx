import { createClient } from "@/utils/supabase/client";
import { unstable_noStore } from "next/cache";
import Image from "next/image";

export default async function BlogSection() {
  unstable_noStore();
  const supabase = createClient();

  const { data } = await supabase
    .from("blog")
    .select("id, name, date, description, image")
    .limit(3)
    .order("date", { ascending: false });

  return (
    <div className="bg-secondary/20 w-screen py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Recently From the blog
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Your latest three blog posts will be displayed here.
          </p>
        </div>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-4 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none sm:grid-cols-2 lg:grid-cols-3">
          {data?.map((data) => (
            <article
              key={data.id}
              className="flex max-w-xl flex-col items-start justify-between"
            >
              <div className="flex items-center gap-x-4 text-xs">
                <time dateTime={data.date} className="text-gray-500">
                  {new Date(data.date).toDateString()}
                </time>
                <a
                  href="#"
                  className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                >
                  {data.name}
                </a>
              </div>
              <div
                className="rounded my-2 relative w-[300px] h-[200px]"
                style={{
                  overflow: "hidden",
                }}
              >
                <Image
                  src={data.image}
                  alt="blog image"
                  style={{ objectFit: "cover", objectPosition: "50% 50%" }}
                  fill={true}
                />
              </div>
              <div className="group relative">
                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                  <a href="#">
                    <span className="absolute inset-0" />
                    {data.name}
                  </a>
                </h3>
                <p className="mt-5 line-clamp-3 text-sm leading-6 w-[310px] text-gray-600">
                  {data.description}
                </p>
              </div>
              {/* <div className="relative mt-8 flex items-center gap-x-4">
                <img
                  src={posts[0].author.imageUrl}
                  alt=""
                  className="h-10 w-10 rounded-full bg-gray-50"
                />
                <div className="text-sm leading-6">
                  <p className="font-semibold text-gray-900">
                    <a href={posts[0].author.href}>
                      <span className="absolute inset-0" />
                      {posts[0].author.name}
                    </a>
                  </p>
                  <p className="text-gray-600">{posts[0].author.role}</p>
                </div>
              </div> */}
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
