import { Skeleton } from "@/components/ui/skeleton";

export default function TableSkeleton() {
  return (
    <div className="container mx-auto py-10 flex flex-col gap-8">
      <div className="flex justify-between">
        <Skeleton className="w-[100px] h-[30px] rounded-full" />
        <Skeleton className="w-[180px] h-[30px] rounded-full" />
        <Skeleton className="w-[100px] h-[30px] rounded-full" />
      </div>
      {Array.from({ length: 5 }).map((_, i) => (
        <div className="flex justify-between" key={i}>
          <div className="flex gap-2">
            <Skeleton className="w-[32px] h-[32px] rounded-full" />
            <Skeleton className="w-[60px] h-[30px] rounded-full" />
          </div>
          <Skeleton className="w-[180px] h-[30px] rounded-full" />
          <Skeleton className="w-[100px] h-[30px] rounded-full" />
        </div>
      ))}
    </div>
  );
}
