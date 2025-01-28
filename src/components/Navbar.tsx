import { useState } from 'react';
import { Newspaper, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useNews } from '@/context/NewsContext';
import { NewsFilters } from '@/types/news';
import { SearchBar } from './SearchBar';

export function Navbar() {
  const { filters, updateFilters, resetFilters, fetchAllNews, loading } = useNews();
  const [isOpen, setIsOpen] = useState(false);
  const [localFilters, setLocalFilters] = useState<NewsFilters>(filters);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilters(localFilters);
    fetchAllNews();
    setIsOpen(false);
  };

  const handleReset = () => {
    const initialFilters: NewsFilters = {
      searchTerm: '',
      startDate: null,
      category: null,
    };
    setLocalFilters(initialFilters);
    resetFilters();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-black/95 border-b border-gray-800 z-50">
      <div className="max-w-7xl mx-auto px-4 h-20">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <button
            onClick={handleReset}
            className="flex items-center gap-2 text-red-600 hover:text-red-500 transition-colors"
          >
            <Newspaper className="h-8 w-8" />
            <span className="text-xl font-bold hidden sm:inline">Innoscripta News</span>
          </button>
          
          {/* Desktop Search - Only visible on large screens */}
          <div className="hidden lg:block flex-1 max-w-3xl mx-8">
            <SearchBar
              filters={localFilters}
              onFiltersChange={setLocalFilters}
              onSubmit={handleSubmit}
              loading={loading}
            />
          </div>

          {/* Mobile/Tablet Menu Button */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon"
                className="lg:hidden text-gray-400 hover:text-white"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </SheetTrigger>
            <SheetContent 
              side="top" 
              className="w-full bg-black border-gray-800 pt-20"
            >
              <div className="container max-w-2xl mx-auto px-4">
                <SearchBar
                  filters={localFilters}
                  onFiltersChange={setLocalFilters}
                  onSubmit={handleSubmit}
                  loading={loading}
                  variant="stacked"
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}