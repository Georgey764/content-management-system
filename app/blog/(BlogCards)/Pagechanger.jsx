import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

const PAGE_COUNT = 4;

export default function Pagechanger({
  currentPage,
  setCurrentPage,
  setLoading,
  filter,
}) {
  const [totalResult, setTotalResult] = useState();
  const supabase = createClient();

  useEffect(() => {
    const totalResultGet = async () => {
      const { count, error } = await supabase
        .from("blog")
        .select("*", { count: "exact", head: true })
        .filter("name", "ilike", "%" + filter.query + "%");
      if (!error) {
        setTotalResult(Math.ceil(count / PAGE_COUNT));
      }
    };
    totalResultGet();
  }, [filter]);

  return (
    <Pagination className="absolute top-[calc(100%-80px)] pl-3 mt-4">
      <PaginationContent>
        {currentPage != 1 && (
          <PaginationItem
            onClick={(e) => {
              setCurrentPage(currentPage - 1);
              setLoading(true);
            }}
          >
            <PaginationPrevious href="#" />
          </PaginationItem>
        )}
        {currentPage > 2 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationLink href="#">{currentPage - 1}</PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationLink isActive href="#">
            {currentPage}
          </PaginationLink>
        </PaginationItem>
        {totalResult > 1 && currentPage != totalResult && (
          <PaginationItem>
            <PaginationLink href="#">{currentPage + 1}</PaginationLink>
          </PaginationItem>
        )}
        {currentPage + 1 < totalResult && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {currentPage != totalResult && (
          <PaginationItem>
            <PaginationNext
              onClick={(e) => {
                setCurrentPage(currentPage + 1);
                setLoading(true);
              }}
              href="#"
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
