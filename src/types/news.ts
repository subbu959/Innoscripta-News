export interface Article {
  title: string;
  description: string;
  url: string;
  urlToImage?: string;
  publishedAt: string;
  source: {
    name: string;
    id: string;
  };
  category?: string;
}

export type NewsCategory = 'business' | 'entertainment' | 'general' | 'health' | 'science' | 'sports' | 'technology';

export interface NewsFilters {
  searchTerm: string;
  startDate: Date | null;
  category: NewsCategory | null;
}

export interface NewsSection {
  newsAPIArticles: Article[];
  guardianArticles: Article[];
  nytArticles: Article[];
  newsAPIPage: number;
  guardianPage: number;
  nytPage: number;
  newsAPIHasMore: boolean;
  guardianHasMore: boolean;
  nytHasMore: boolean;
}