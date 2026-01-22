import { useState, type ReactNode } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export interface Column<T> {
  header: string
  accessor: keyof T | ((row: T) => ReactNode)
  cell?: (value: unknown, row: T) => ReactNode
  className?: string
}

interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  getRowId: (row: T) => string | number
  itemsPerPage?: number
  currentPage?: number
  onPageChange?: (page: number) => void
  totalItems?: number
  paginationMode?: 'client' | 'server'
  emptyMessage?: string
  className?: string
  showPagination?: boolean
  showCount?: boolean
  countLabel?: (start: number, end: number, total: number) => string
}

export function DataTable<T extends Record<string, unknown>>({
  data,
  columns,
  getRowId,
  itemsPerPage = 10,
  currentPage: controlledPage,
  onPageChange,
  totalItems,
  paginationMode = 'client',
  emptyMessage = 'No data available',
  className,
  showPagination = true,
  showCount = true,
  countLabel,
}: DataTableProps<T>) {
  const [internalPage, setInternalPage] = useState(1)

  const isControlled = controlledPage !== undefined && onPageChange !== undefined
  const currentPage = isControlled ? controlledPage : internalPage
  const setCurrentPage = isControlled ? onPageChange : setInternalPage

  const totalItemsCount = paginationMode === 'server' && totalItems !== undefined ? totalItems : data.length
  const totalPages = Math.ceil(totalItemsCount / itemsPerPage)

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage

  const paginatedData =
    paginationMode === 'client' ? data.slice(startIndex, endIndex) : data

  const renderCell = (column: Column<T>, row: T) => {
    const value =
      typeof column.accessor === 'function'
        ? column.accessor(row)
        : row[column.accessor]

    if (column.cell) {
      return column.cell(value, row)
    }

    return value as ReactNode
  }

  const defaultCountLabel = (start: number, end: number, total: number) =>
    `Showing ${start} to ${end} of ${total} items`

  const getPageNumbers = () => {
    const pages: (number | 'ellipsis')[] = []
    const maxVisible = 5

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i)
        }
        pages.push('ellipsis')
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1)
        pages.push('ellipsis')
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        pages.push(1)
        pages.push('ellipsis')
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i)
        }
        pages.push('ellipsis')
        pages.push(totalPages)
      }
    }

    return pages
  }

  return (
    <div className={className}>
      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((column, index) => (
                  <TableHead key={index} className={column.className}>
                    {column.header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="text-center text-muted-foreground"
                  >
                    {emptyMessage}
                  </TableCell>
                </TableRow>
              ) : (
                paginatedData.map((row) => (
                  <TableRow key={getRowId(row)}>
                    {columns.map((column, index) => (
                      <TableCell key={index} className={column.className}>
                        {renderCell(column, row)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {showPagination && totalPages > 1 && (
        <div className="flex items-center justify-between mt-4">
          {showCount && (
            <p className="text-sm text-muted-foreground">
              {countLabel
                ? countLabel(
                    startIndex + 1,
                    Math.min(endIndex, totalItemsCount),
                    totalItemsCount
                  )
                : defaultCountLabel(
                    startIndex + 1,
                    Math.min(endIndex, totalItemsCount),
                    totalItemsCount
                  )}
            </p>
          )}
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    if (currentPage > 1) setCurrentPage(currentPage - 1)
                  }}
                  className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                />
              </PaginationItem>

              {getPageNumbers().map((page, index) => {
                if (page === 'ellipsis') {
                  return (
                    <PaginationItem key={`ellipsis-${index}`}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )
                }

                return (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        setCurrentPage(page)
                      }}
                      isActive={currentPage === page}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                )
              })}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    if (currentPage < totalPages) setCurrentPage(currentPage + 1)
                  }}
                  className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  )
}
