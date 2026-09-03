type PaginationItem = number | 'ellipsis'

function range(start: number, end: number) {
  return Array.from({ length: end - start + 1 }, (_, index) => start + index)
}

export function getPaginationItems(
  currentPage: number,
  totalPages: number
): PaginationItem[] {
  if (totalPages <= 7) {
    return range(1, totalPages)
  }

  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, 'ellipsis', totalPages]
  }

  if (currentPage >= totalPages - 3) {
    return [1, 'ellipsis', ...range(totalPages - 4, totalPages)]
  }

  return [
    1,
    'ellipsis',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    'ellipsis',
    totalPages,
  ]
}
