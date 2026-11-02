interface FilterChipsProps {
  filters: string[]
  activeFilter: string
  onlySkpi: boolean
  onChipClick: (item: string) => void
}

export function FilterChips({
  filters,
  activeFilter,
  onlySkpi,
  onChipClick,
}: FilterChipsProps) {
  return (
    <div className="chips" role="group" aria-label="Filter acara">
      {filters.map((item) => {
        const isSelected =
          item === 'Eligible SKPI'
            ? onlySkpi || activeFilter === 'Eligible SKPI'
            : activeFilter === item && (item !== 'Semua' || !onlySkpi)

        return (
          <button
            key={item}
            type="button"
            className={isSelected ? 'selected' : ''}
            onClick={() => onChipClick(item)}
          >
            {item === 'Eligible SKPI' ? '⭐ Eligible SKPI' : item}
          </button>
        )
      })}
    </div>
  )
}

