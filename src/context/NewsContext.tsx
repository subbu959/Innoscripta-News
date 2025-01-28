import { createContext, useContext, useState, ReactNode } from 'react';
import { Article, NewsFilters,  } from '@/types/news';
import { fetchNewsAPI, fetchGuardian, fetchNYT } from '@/lib/api';

interface NewsContextType {
  filters: NewsFilters;
  updateFilters: (newFilters: Partial<NewsFilters>) => void;
  resetFilters: () => void;
  newsAPIArticles: Article[];
  guardianArticles: Article[];
  nytArticles: Article[];
  loading: boolean;
  loadingMore: {
    newsAPI: boolean;
    guardian: boolean;
    nyt: boolean;
  };
  error: string | null;
  fetchAllNews: () => Promise<void>;
  loadMoreNews: (source: 'newsAPI' | 'guardian' | 'nyt') => Promise<void>;
  hasMore: {
    newsAPI: boolean;
    guardian: boolean;
    nyt: boolean;
  };
}

const initialFilters: NewsFilters = {
  searchTerm: '',
  startDate: null,
  category: null,
};

const NewsContext = createContext<NewsContextType | undefined>(undefined);

export function NewsProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<NewsFilters>(initialFilters);
  const [newsAPIArticles, setNewsAPIArticles] = useState<Article[]>([]);
  const [guardianArticles, setGuardianArticles] = useState<Article[]>([]);
  const [nytArticles, setNYTArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState({
    newsAPI: false,
    guardian: false,
    nyt: false,
  });
  const [error, setError] = useState<string | null>(null);
  const [pages, setPages] = useState({
    newsAPI: 1,
    guardian: 1,
    nyt: 1,
  });
  const [hasMore, setHasMore] = useState({
    newsAPI: true,
    guardian: true,
    nyt: true,
  });

  const updateFilters = (newFilters: Partial<NewsFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const resetFilters = () => {
    setFilters(initialFilters);
    setPages({
      newsAPI: 1,
      guardian: 1,
      nyt: 1,
    });
    setHasMore({
      newsAPI: true,
      guardian: true,
      nyt: true,
    });
    fetchAllNews();
  };

  const fetchAllNews = async () => {
    setLoading(true);
    setError(null);
    setPages({
      newsAPI: 1,
      guardian: 1,
      nyt: 1,
    });
    setHasMore({
      newsAPI: true,
      guardian: true,
      nyt: true,
    });

    try {
      const [newsAPI, guardian, nyt] = await Promise.all([
        fetchNewsAPI(filters, 1),
        fetchGuardian(filters, 1),
        fetchNYT(filters, 1),
      ]);

      setNewsAPIArticles(newsAPI.articles);
      setGuardianArticles(guardian.articles);
      setNYTArticles(nyt.articles);
      
      setHasMore({
        newsAPI: newsAPI.hasMore,
        guardian: guardian.hasMore,
        nyt: nyt.hasMore,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch news');
    } finally {
      setLoading(false);
    }
  };

  const loadMoreNews = async (source: 'newsAPI' | 'guardian' | 'nyt') => {
    if (!hasMore[source] || loadingMore[source]) return;

    setLoadingMore((prev) => ({ ...prev, [source]: true }));
    const nextPage = pages[source] + 1;

    try {
      let result: { articles: any; hasMore: any; };
      switch (source) {
        case 'newsAPI':
          result = await fetchNewsAPI(filters, nextPage);
          setNewsAPIArticles((prev) => [...prev, ...result.articles]);
          break;
        case 'guardian':
          result = await fetchGuardian(filters, nextPage);
          setGuardianArticles((prev) => [...prev, ...result.articles]);
          break;
        case 'nyt':
          result = await fetchNYT(filters, nextPage);
          setNYTArticles((prev) => [...prev, ...result.articles]);
          break;
      }

      setPages((prev) => ({ ...prev, [source]: nextPage }));
      setHasMore((prev) => ({ ...prev, [source]: result.hasMore }));
    } catch (err) {
      setError(err instanceof Error ? err.message : `Failed to load more ${source} news`);
    } finally {
      setLoadingMore((prev) => ({ ...prev, [source]: false }));
    }
  };

  return (
    <NewsContext.Provider 
      value={{ 
        filters, 
        updateFilters, 
        resetFilters,
        newsAPIArticles,
        guardianArticles,
        nytArticles,
        loading,
        loadingMore,
        error,
        fetchAllNews,
        loadMoreNews,
        hasMore,
      }}
    >
      {children}
    </NewsContext.Provider>
  );
}

export function useNews() {
  const context = useContext(NewsContext);
  if (context === undefined) {
    throw new Error('useNews must be used within a NewsProvider');
  }
  return context;
}