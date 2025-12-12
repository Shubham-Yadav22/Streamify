import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
}

export const LoadingSkeleton = ({ className }: SkeletonProps) => (
  <div
    className={cn(
      'bg-gradient-to-r from-muted via-muted/50 to-muted bg-[length:200%_100%] animate-shimmer rounded-lg',
      className
    )}
  />
);

export const ShowCardSkeleton = () => (
  <div className="flex-shrink-0 w-[140px] md:w-[180px]">
    <LoadingSkeleton className="w-full aspect-[2/3] rounded-lg" />
    <LoadingSkeleton className="w-3/4 h-4 mt-2" />
    <LoadingSkeleton className="w-1/2 h-3 mt-1" />
  </div>
);

export const EpisodeCardSkeleton = () => (
  <div className="w-full p-4 bg-card rounded-xl">
    <LoadingSkeleton className="w-full aspect-video rounded-lg" />
    <LoadingSkeleton className="w-3/4 h-5 mt-4" />
    <LoadingSkeleton className="w-full h-4 mt-2" />
    <LoadingSkeleton className="w-2/3 h-4 mt-1" />
  </div>
);

export const CarouselSkeleton = () => (
  <div className="space-y-4">
    <LoadingSkeleton className="w-40 h-8" />
    <div className="flex gap-4 overflow-hidden">
      {Array.from({ length: 7 }).map((_, i) => (
        <ShowCardSkeleton key={i} />
      ))}
    </div>
  </div>
);
