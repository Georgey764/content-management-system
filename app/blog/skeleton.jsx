import { Skeleton } from "@/components/ui/skeleton";
import { useMemo } from "react";

export default function SkeletonLoader() {
  const arrays = useMemo(() => {
    return new Array(4).fill(0);
  }, []);

  return (
    <>
      {arrays.map((cur, i) => {
        return (
          <div className="flex flex-row w-full space-y-3" key={i}>
            <Skeleton className="h-[185px] w-[0] rounded-xl sm:w-[260px]" />
            <div className="space-y-2 w-[80%] m-auto md:w-[calc(100%-350px)]">
              <div className="flex flex-col items-center gap-2 ">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="mt-2 h-4 w-[100%]" />
                <Skeleton className="h-4 w-[100%]" />
                <Skeleton className="h-4 w-[100%]" />
                <Skeleton className="h-4 w-[80%]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
