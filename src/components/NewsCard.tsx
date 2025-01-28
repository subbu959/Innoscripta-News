import { Newspaper } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Article } from '@/types/news';

interface NewsCardProps {
  article: Article;
}

export function NewsCard({ article }: NewsCardProps) {
  const placeholderImage = "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800&auto=format&fit=crop&q=60";

  return (
    <Card className="group h-[400px] w-[300px] bg-gray-900 border border-gray-800 hover:border-red-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/10 overflow-hidden flex flex-col">
      <div className="h-[168px] w-full overflow-hidden flex-shrink-0">
        <img
          src={article.urlToImage || placeholderImage}
          alt={article.title}
          className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = placeholderImage;
          }}
        />
      </div>
      <CardHeader className="p-4 flex-shrink-0">
        <CardTitle className="text-lg text-white line-clamp-2 group-hover:text-red-500 transition-colors">
          <a 
            href={article.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-red-400"
          >
            {article.title}
          </a>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0 flex-1 flex flex-col">
        <p className="text-gray-400 text-sm line-clamp-3 mb-4 group-hover:text-gray-300 transition-colors flex-1">
          {article.description || "No description available"}
        </p>
        <div className="flex justify-between items-center text-xs text-gray-500 flex-shrink-0">
          <div className="flex items-center gap-1">
            <Newspaper className="w-3 h-3" />
            <span className="truncate max-w-[120px]">{article.source.name}</span>
          </div>
          <time dateTime={article.publishedAt} className="text-gray-500">
            {new Date(article.publishedAt).toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })}
          </time>
        </div>
      </CardContent>
    </Card>
  );
}