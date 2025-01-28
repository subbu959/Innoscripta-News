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
      <div className="max-w-7xl mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full gap-8">
          {/* Logo */}
          <button
            onClick={handleReset}
            className="flex items-center gap-2 text-red-600 hover:text-red-500 transition-colors shrink-0 h-10"
          >
            <Newspaper className="h-8 w-8" />
            <span className="text-xl font-bold hidden sm:inline">Innoscripta News</span>
          </button>
          
          {/* Desktop Search */}
          <div className="hidden lg:flex flex-1 justify-center">
            <SearchBar
              filters={localFilters}
              onFiltersChange={setLocalFilters}
              onSubmit={handleSubmit}
              loading={loading}
            />
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon"
                className="lg:hidden text-gray-400 hover:text-white h-10 w-10"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-md bg-black border-gray-800">
              <SheetHeader>
                <SheetTitle className="text-white">Search News</SheetTitle>
              </SheetHeader>
              <div className="mt-8">
                <SearchBar
                  filters={localFilters}
                  onFiltersChange={setLocalFilters}
                  onSubmit={handleSubmit}
                  loading={loading}
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}