import { Skeleton } from "@/components/ui/skeleton";
import { useMemo } from "react";

export default function SkeletonLoader() {
  const arrays = useMemo(() => {
    return new Array(8).fill(0);
  }, []);

  return (
    <>
      {arrays.map((cur, i) => {
        return (
          <div className="flex flex-col space-y-3" key={i}>
            <Skeleton className="h-[185px] w-[300px] rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        );
      })}
    </>
  );
}
