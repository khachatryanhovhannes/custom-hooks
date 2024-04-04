import { useState } from "react";

interface PaginationOptions {
  pageSize: number;
}

interface PaginationResult<T> {
  currentPage: number;
  totalPages: number;
  goToPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  setPageLimit: (limit: number) => void;
  paginatedData: T[];
}

const usePagination = <T,>(
  data: T[],
  options: PaginationOptions
): PaginationResult<T> => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(options.pageSize);

  const totalPages = Math.ceil(data.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = data.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const setPageLimit = (limit: number) => {
    setPageSize(limit);
    setCurrentPage(1);
  };

  return {
    currentPage,
    totalPages,
    goToPage,
    nextPage,
    prevPage,
    setPageLimit,
    paginatedData,
  };
};

export default usePagination;
