import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { NewsCategory, NewsFilters } from '@/types/news';

const categories: NewsCategory[] = [
  'business',
  'entertainment',
  'general',
  'health',
  'science',
  'sports',
  'technology',
];

interface SearchBarProps {
  filters: NewsFilters;
  onFiltersChange: (filters: NewsFilters) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  variant?: 'inline' | 'stacked';
}

export function SearchBar({ 
  filters, 
  onFiltersChange, 
  onSubmit, 
  loading,
  variant = 'inline'
}: SearchBarProps) {
  const isStacked = variant === 'stacked';

  return (
    <form 
      onSubmit={onSubmit} 
      className={`flex ${isStacked ? 'flex-col gap-4' : 'flex-row gap-2'} w-full`}
    >
      {/* Search Input */}
      <Input
        type="text"
        value={filters.searchTerm}
        onChange={(e) => onFiltersChange({ ...filters, searchTerm: e.target.value })}
        placeholder="Search news..."
        className="h-10 bg-gray-900 border-gray-800 text-white placeholder-gray-400 focus:ring-red-600"
      />
      
      <div className={`flex ${isStacked ? 'flex-col gap-4' : 'flex-row gap-2'}`}>
        {/* Date Input */}
        <input
          type="date"
          value={filters.startDate ? filters.startDate.toISOString().split('T')[0] : ''}
          onChange={(e) => {
            const date = e.target.value ? new Date(e.target.value) : null;
            onFiltersChange({ ...filters, startDate: date });
          }}
          min="2000-01-01"
          max={new Date().toISOString().split('T')[0]}
          className="h-10 px-4 rounded-md bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-red-600 border border-gray-800"
        />

        {/* Category Select */}
        <Select
          value={filters.category || ''}
          onValueChange={(value) => onFiltersChange({ ...filters, category: value as NewsCategory })}
        >
          <SelectTrigger className="h-10 bg-gray-900 border-gray-800 text-white">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent className="bg-gray-900 border-gray-800">
            {categories.map((category) => (
              <SelectItem 
                key={category} 
                value={category}
                className="text-white hover:bg-gray-800 focus:bg-gray-800 focus:text-white"
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Search Button */}
        <Button 
          type="submit"
          className={`h-10 bg-red-600 hover:bg-red-700 text-white ${isStacked ? 'w-full' : 'w-24'}`}
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin" />
              <span>Loading</span>
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Search className="w-4 h-4" />
              <span>Search</span>
            </span>
          )}
        </Button>
      </div>
    </form>
  );
}