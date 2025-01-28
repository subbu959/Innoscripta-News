import {  NewsFilters } from '@/types/news';
import { format } from 'date-fns';

const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const GUARDIAN_API_KEY = import.meta.env.VITE_GUARDIAN_API_KEY;
const NYT_API_KEY = import.meta.env.VITE_NYT_API_KEY;

const ITEMS_PER_PAGE = 5;

// Helper function to format date for APIs
const formatDate = (date: Date | null) => {
  return date ? format(date, 'yyyy-MM-dd') : '';
};

// Helper to determine if we should use everything search
const shouldUseEverythingEndpoint = (filters: NewsFilters) => {
  return filters.searchTerm && !filters.category;
};

// News API
export async function fetchNewsAPI(filters: NewsFilters, page: number = 1) {
  const { searchTerm, startDate, category } = filters;
  const baseUrl = shouldUseEverythingEndpoint(filters)
    ? 'https://newsapi.org/v2/everything'
    : 'https://newsapi.org/v2/top-headlines';

  const params = new URLSearchParams({
    apiKey: NEWS_API_KEY,
    pageSize: ITEMS_PER_PAGE.toString(),
    page: page.toString(),
    ...(searchTerm && { q: searchTerm }),
    ...(!shouldUseEverythingEndpoint(filters) && { language: 'en' }),
    ...(startDate && { from: formatDate(startDate) }),
    ...(category && !shouldUseEverythingEndpoint(filters) && { category }),
  });

  const response = await fetch(`${baseUrl}?${params}`);
  if (!response.ok) throw new Error('Failed to fetch from News API');
  
  const data = await response.json();
  return {
    articles: data.articles.map((article: any) => ({
      title: article.title,
      description: article.description,
      url: article.url,
      urlToImage: article.urlToImage,
      publishedAt: article.publishedAt,
      source: {
        id: article.source.id || 'newsapi',
        name: article.source.name,
      },
    })),
    hasMore: data.totalResults > page * ITEMS_PER_PAGE,
  };
}

// Guardian API
export async function fetchGuardian(filters: NewsFilters, page: number = 1) {
  const { searchTerm, startDate, category } = filters;
  const params = new URLSearchParams({
    'api-key': GUARDIAN_API_KEY,
    'show-fields': 'headline,thumbnail,shortUrl,bodyText',
    'page-size': ITEMS_PER_PAGE.toString(),
    'page': page.toString(),
    ...(searchTerm && { q: searchTerm }),
    ...(startDate && { 'from-date': formatDate(startDate) }),
    ...(category && { section: category }),
  });

  const response = await fetch(`https://content.guardianapis.com/search?${params}`);
  if (!response.ok) throw new Error('Failed to fetch from Guardian API');
  
  const data = await response.json();
  return {
    articles: data.response.results.map((article: any) => ({
      title: article.webTitle,
      description: article.fields?.bodyText?.substring(0, 200) + '...',
      url: article.webUrl,
      urlToImage: article.fields?.thumbnail,
      publishedAt: article.webPublicationDate,
      source: {
        id: 'guardian',
        name: 'The Guardian',
      },
    })),
    hasMore: data.response.pages > page,
  };
}

// NYT API
export async function fetchNYT(filters: NewsFilters, page: number = 1) {
  const { searchTerm, startDate, category } = filters;
  const params = new URLSearchParams({
    'api-key': NYT_API_KEY,
    'page': page.toString(),
    ...(searchTerm && { q: searchTerm }),
    ...(startDate && { begin_date: formatDate(startDate).replace(/-/g, '') }),
    ...(category && { fq: `news_desk:("${category}")` }),
  });

  const response = await fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?${params}`);
  if (!response.ok) throw new Error('Failed to fetch from NYT API');
  
  const data = await response.json();
  return {
    articles: data.response.docs.map((article: any) => ({
      title: article.headline.main,
      description: article.abstract,
      url: article.web_url,
      urlToImage: article.multimedia[0]?.url 
        ? `https://www.nytimes.com/${article.multimedia[0].url}`
        : undefined,
      publishedAt: article.pub_date,
      source: {
        id: 'nyt',
        name: 'The New York Times',
      },
    })),
    hasMore: page * ITEMS_PER_PAGE < data.response.meta.hits,
  };
}