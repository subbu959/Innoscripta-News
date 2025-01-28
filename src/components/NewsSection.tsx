import { useNews } from '@/context/NewsContext';
import { NewsGrid } from './NewsGrid';
import { Article } from '@/types/news';


interface NewsSectionProps {
  title: string;
  articles: Article[];
  source: 'newsAPI' | 'guardian' | 'nyt';
  loading: boolean;
}

export function NewsSection({ title, articles, source, loading }: NewsSectionProps) {
  const { loadMoreNews, hasMore } = useNews();

  return (
    <NewsGrid
      title={title}
      articles={articles}
      loading={loading}
      onLoadMore={() => loadMoreNews(source)}
      hasMore={hasMore[source]}
    />
  );
}