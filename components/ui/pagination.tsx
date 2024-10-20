"use client";
import React, { useState } from "react";
import Button from "../form-elements/button";
import { RxChevronLeft, RxChevronRight } from "react-icons/rx";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export interface PaginationProps {
  page: number;
  numPages: number;
  onChange?: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = (props) => {
  const { page, numPages, onChange } = props;
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);
  const [pages, setPages] = useState<number[]>([]);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  React.useEffect(() => {
    const newPages: number[] = [];
    const start = Math.max(1, page - 2);
    const end = Math.min(numPages, page + 2);
    for (let i = start; i <= end; i++) {
      newPages.push(i);
    }
    setStart(start);
    setEnd(end);
    setPages(newPages);
  }, [page, numPages]);

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams!!);
    if (pageNumber !== 1) {
      params.set("page", pageNumber.toString());
    } else {
      params.delete("page");
    }
    return `${pathname}?${params.toString()}`;
  };

  const handlePageChange = (page: number) => {
    if (onChange) {
      onChange(page);
    }
  };

  return (
    <nav className="flex items-center justify-center w-full">
      <ul className="flex items-center justify-center gap-x-2">
        <li>
          <Button variant="ghost" disabled={page === 1} onClick={() => handlePageChange(page - 1)}>
            <RxChevronLeft className="w-4 h-4 fill-current" />
          </Button>
        </li>
        {start > 1 && (
          <li>
            <Button variant="outline" onClick={() => handlePageChange(1)}>
              1
            </Button>
          </li>
        )}
        {pages[0] > 2 && (
          <li>
            <Button variant="outline" disabled={true}>
              ...
            </Button>
          </li>
        )}
        {pages.map((p) => (
          <li key={p}>
            <Button variant="outline" disabled={p === page} onClick={() => handlePageChange(p)}>
              {p}
            </Button>
          </li>
        ))}
        {end < numPages - 1 && (
          <li>
            <Button variant="outline" disabled={true}>
              ...
            </Button>
          </li>
        )}
        {end < numPages && (
          <li>
            <Button variant="outline" onClick={() => handlePageChange(numPages)}>
              {numPages}
            </Button>
          </li>
        )}
        <li>
          <Button variant="ghost" disabled={page === numPages} onClick={() => handlePageChange(page + 1)}>
            <RxChevronRight className="w-4 h-4 fill-current" />
          </Button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
