import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface SkeletonLoaderProps {
  rows: number;
  cols: number;
}

const Loading: React.FC<SkeletonLoaderProps> = ({ rows, cols }) => {
  return (
    <div className={cn("grid gap-4")}>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={`row-${rowIndex}`} className={cn("flex gap-2 ")}>
          {Array.from({ length: cols }).map((_, colIndex) => (
            <div key={`col-${rowIndex}-${colIndex}`} className={cn("flex-1 ")}>
              <Skeleton className={cn("h-4 w-full ")} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Loading;
