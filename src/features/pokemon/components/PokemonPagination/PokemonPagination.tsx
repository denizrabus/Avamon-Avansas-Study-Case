import { ChevronLeft, ChevronRight } from 'lucide-react'

import { getPaginationItems } from './pokemon-pagination-utils'

interface PokemonPaginationProps {
  currentPage: number
  onPageChange: (page: number) => void
  totalPages: number
}

export function PokemonPagination({
  currentPage,
  onPageChange,
  totalPages,
}: PokemonPaginationProps) {
  const paginationItems = getPaginationItems(currentPage, totalPages)

  return (
    <nav
      aria-label="Sayfalama"
      className="flex items-center justify-center gap-2"
    >
      <button
        aria-label="Önceki sayfa"
        className="grid size-10 place-items-center rounded-lg bg-surface text-muted shadow-sm transition hover:text-ink disabled:cursor-not-allowed disabled:opacity-40"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        type="button"
      >
        <ChevronLeft aria-hidden="true" size={18} />
      </button>

      {paginationItems.map((item, index) =>
        item === 'ellipsis' ? (
          <span
            className="grid size-10 place-items-center text-sm font-black text-muted"
            key={`ellipsis-${index}`}
          >
            ...
          </span>
        ) : (
          <button
            aria-current={item === currentPage ? 'page' : undefined}
            className={`grid size-10 place-items-center rounded-lg text-sm font-black shadow-sm transition ${
              item === currentPage
                ? 'bg-avamon-red text-white'
                : 'bg-surface text-ink hover:bg-avamon-red/10'
            }`}
            key={item}
            onClick={() => onPageChange(item)}
            type="button"
          >
            {item}
          </button>
        )
      )}

      <button
        aria-label="Sonraki sayfa"
        className="grid size-10 place-items-center rounded-lg bg-surface text-muted shadow-sm transition hover:text-ink disabled:cursor-not-allowed disabled:opacity-40"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        type="button"
      >
        <ChevronRight aria-hidden="true" size={18} />
      </button>
    </nav>
  )
}
