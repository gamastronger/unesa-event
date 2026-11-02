import { Filter, Search, X } from 'lucide-react'

interface SearchBarProps {
  query: string
  onQueryChange: (val: string) => void
  onClear: () => void
}

export function SearchBar({ query, onQueryChange, onClear }: SearchBarProps) {
  return (
    <div className="search-row">
      <label className="search-box">
        <Search size={18} />
        <input
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Cari kompetisi, bidang, atau penyelenggara"
          aria-label="Cari event"
        />
        {query && (
          <button onClick={onClear} aria-label="Hapus pencarian">
            <X size={16} />
          </button>
        )}
      </label>
      <button className="filter-toggle" type="button">
        <Filter size={16} /> Filter
      </button>
    </div>
  )
}

