import { useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Article } from '@/types/news';
import { NewsCard } from './NewsCard';
import { Skeleton } from '@/components/ui/skeleton';

interface NewsGridProps {
  title: string;
  articles: Article[];
  loading: boolean;
  onLoadMore?: () => void;
  hasMore?: boolean;
}

function NewsCardSkeleton() {
  return (
    <div className="h-[400px] w-[300px] bg-gray-900 border border-gray-800 rounded-lg overflow-hidden flex flex-col">
      <Skeleton className="h-[168px] w-full flex-shrink-0" />
      <Skeleton className="h-6 w-3/4 mb-4 flex-shrink-0" />
      <div className="p-4 flex flex-col flex-1">
        <Skeleton className="h-6 w-3/4 mb-4 flex-shrink-0" />
        <Skeleton className="h-6 w-3/4 mb-4 flex-shrink-0" />
        <Skeleton className="h-6 w-3/4 mb-4 flex-shrink-0" />
        <div className="flex-1">
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-5/6 mb-2" />
          <Skeleton className="h-4 w-4/6" />
          <Skeleton className="h-4 w-4/6" />
          <Skeleton className="h-4 w-4/6" />
        </div>
        <div className="flex justify-between mt-4 flex-shrink-0">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
    </div>
  );
}

export function NewsGrid({ 
  title, 
  articles, 
  loading, 
  onLoadMore,
  hasMore 
}: NewsGridProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const observer = useRef<IntersectionObserver | null>(null);
  
  const lastCardRef = useCallback((node: HTMLDivElement | null) => {
    if (loading || !hasMore || !onLoadMore) return;

    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        onLoadMore();
      }
    });

    if (node) observer.current.observe(node);
  }, [loading, hasMore, onLoadMore]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="relative px-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll('left')}
            className="bg-gray-900 border-gray-800 hover:bg-gray-800 hover:border-red-500/50 transition-all"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll('right')}
            className="bg-gray-900 border-gray-800 hover:bg-gray-800 hover:border-red-500/50 transition-all"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div 
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto pb-6 -mx-4 px-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent"
      >
        {loading ? (
          Array(4).fill(0).map((_, i) => (
            <div key={i} className="flex-shrink-0">
              <NewsCardSkeleton />
            </div>
          ))
        ) : (
          <>
            {articles.map((article, index) => (
              <div 
                key={`${article.source.id}-${index}`}
                ref={index === articles.length - 1 ? lastCardRef : null}
                className="flex-shrink-0"
              >
                <NewsCard article={article} />
              </div>
            ))}
            
            {loading && hasMore && (
              <div className="flex-shrink-0">
                <NewsCardSkeleton />
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}