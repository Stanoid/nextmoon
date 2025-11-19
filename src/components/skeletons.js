import { Skeleton } from "@nextui-org/react";

export function ProductCardSkeleton({ count = 4 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="w-full space-y-3 p-2">
          <Skeleton className="rounded-lg">
            <div className="h-48 rounded-lg bg-default-300"></div>
          </Skeleton>
          <div className="space-y-2">
            <Skeleton className="w-3/5 rounded-lg">
              <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
            </Skeleton>
            <Skeleton className="w-4/5 rounded-lg">
              <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
            </Skeleton>
            <Skeleton className="w-2/5 rounded-lg">
              <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
            </Skeleton>
          </div>
        </div>
      ))}
    </>
  );
}

export function HeroSkeleton() {
  return (
    <div className="w-full space-y-3 p-4">
      <Skeleton className="rounded-lg">
        <div className="h-64 md:h-96 rounded-lg bg-default-300"></div>
      </Skeleton>
    </div>
  );
}
