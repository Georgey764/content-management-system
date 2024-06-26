"use client";

import { Search } from "@/components/ui/search";
import { Button } from "@/components/ui/button";
import { Suspense, useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createClient } from "@/utils/supabase/client";
import { useAuth } from "../../ui/hooks/AuthProvider";
import Image from "next/image";
import Link from "next/link";
import { SquarePen } from "lucide-react";
import { useRouter } from "next/navigation";
import SkeletonLoader from "../skeleton";
import Pagechanger from "./Pagechanger";

function getIndex(str, substr, ind) {
  let Len = str.length,
    i = -1;
  while (ind-- && i++ < Len) {
    i = str.indexOf(substr, i);
    if (i < 0) break;
  }
  return i;
}

const PAGE_COUNT = 4;

export default function BlogCardSection() {
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ query: "", type: 0 });
  const supabase = createClient();
  const value = useAuth();
  const router = useRouter();

  function handleCurrentPageChange(val) {
    setCurrentPage(val);
  }

  function handleLoadChange(val) {
    setLoading(val);
  }

  useEffect(() => {
    const getData = async () => {
      let query = await supabase
        .from("blog")
        .select("id, name, description, date, image")
        .filter("name", "ilike", "%" + filter.query + "%")
        // .in("typeId", filter.type == 0 ? ["1", "2", "3", "4"] : filter.type)
        .limit(8)
        .order("id", { ascending: false })
        .range(
          (currentPage - 1) * PAGE_COUNT,
          (currentPage - 1) * PAGE_COUNT + PAGE_COUNT - 1
        );

      if (query.error) {
        alert(query.error.message);
      }
      setPosts([...query.data]);
      setLoading(false);
    };
    getData();
  }, [filter, currentPage]);

  return (
    <>
      <div className="mt-8 flex flex-col items-center md:flex md:flex-row md:justify-between gap-2 flex-wrap">
        <Search
          className="w-[80vw] md:w-[300px]"
          value={filter.query}
          onChange={(e) => {
            setFilter({ ...filter, query: e.target.value });
          }}
        />
        <div className="md:flex md:flex-row gap-2 md:justify-start md:items-center flex-wrap">
          {value.role === "true" ? (
            <span>
              <Button
                onClick={(e) => {
                  router.push("/blog/add");
                }}
                className="w-[80vw] md:w-[150px] md:mr-2"
              >
                <SquarePen />
                Create a New Blog
              </Button>
            </span>
          ) : (
            <span></span>
          )}

          <Select
            className="inline"
            onValueChange={(e) => {
              setFilter({ ...filter, type: e });
            }}
            required
          >
            <SelectTrigger className="mt-2 md:mt-0 w-[80vw] md:w-[150px]">
              <SelectValue placeholder="Filter Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem defaultChecked value="0">
                All
              </SelectItem>
              <SelectItem value="1">Scholarship</SelectItem>
              <SelectItem value="2">Grants</SelectItem>
              <SelectItem value="3">Workshop</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="px-0 py-6 w-full mt-2 md:p-6 bg-primary/0 rounded flex flex-row gap-2 flex-wrap justify-center relative pb-24 md:pb-24">
        {loading ? (
          <SkeletonLoader />
        ) : (
          posts.map((cur) => {
            return <BlogCard key={cur.id} obj={cur} />;
          })
        )}
        <Pagechanger
          setLoading={handleLoadChange}
          currentPage={currentPage}
          setCurrentPage={handleCurrentPageChange}
          filter={filter}
        />
      </div>
    </>
  );
}

function BlogCard({ obj }) {
  return (
    <article className="w-full flex bg-white transition hover:shadow-xl">
      <div className="rotate-180 p-2 [writing-mode:_vertical-lr]">
        <time
          dateTime="2022-10-10"
          className="flex items-center justify-between gap-4 text-xs font-bold uppercase text-gray-900"
        >
          <span>{new Date(obj?.date).getFullYear()}</span>
          <span className="w-px flex-1 bg-gray-900/10"></span>
          <span>
            {new Date(obj?.date)
              .toDateString()
              .substring(
                getIndex(new Date(obj?.date).toDateString(), " ", 1),
                getIndex(new Date(obj?.date).toDateString(), " ", 3)
              )}
          </span>
        </time>
      </div>

      <div className="hidden sm:block sm:basis-56">
        <Image
          height={500}
          width={500}
          alt="Picture of blog"
          src={obj.image}
          className="aspect-square h-full w-full object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between">
        <div className="border-s border-gray-900/10 p-4 sm:border-l-transparent sm:p-6">
          <a href={`/blog/${obj.id}`}>
            <h3 className="font-bold uppercase text-gray-900">{obj.name}</h3>
          </a>

          <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-700">
            {obj.description}
          </p>
        </div>

        <div className="sm:flex sm:items-end sm:justify-end">
          <Link
            className="block bg-primary px-5 py-3 text-center text-xs font-bold uppercase text-white transition hover:bg-primary/80"
            href={"/blog/" + obj.id}
          >
            Read More...
          </Link>
        </div>
      </div>
    </article>
  );
}
