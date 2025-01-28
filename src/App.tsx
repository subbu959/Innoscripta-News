import { useEffect } from 'react';
import { NewsProvider, useNews } from '@/context/NewsContext';
import { Navbar } from '@/components/Navbar';
import { NewsSection } from '@/components/NewsSection';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

function NewsApp() {
  const { 
    newsAPIArticles, 
    guardianArticles, 
    nytArticles, 
    loading, 
    error,
    fetchAllNews 
  } = useNews();

  useEffect(() => {
    fetchAllNews();
  }, []);

  return (
    <div className="h-screen bg-black text-white overflow-hidden">
      <Navbar />
      <main className="h-[calc(100vh-80px)] mt-20 overflow-y-auto scrollbar-thin">
        {error && (
          <Alert variant="destructive" className="mx-4 mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-8 px-4">
          <NewsSection 
            title="News API Headlines" 
            articles={newsAPIArticles}
            source="newsAPI"
            loading={loading}
          />
          <NewsSection 
            title="The Guardian Headlines" 
            articles={guardianArticles}
            source="guardian"
            loading={loading}
          />
          <NewsSection 
            title="New York Times Headlines" 
            articles={nytArticles}
            source="nyt"
            loading={loading}
          />
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <NewsProvider>
      <NewsApp />
    </NewsProvider>
  );
}

export default App;