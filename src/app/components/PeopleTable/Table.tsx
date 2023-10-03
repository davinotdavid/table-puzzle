"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import {
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { columns } from "./columns";
import { useInfiniteQuery } from "@tanstack/react-query";
import { PersonApiResponse, fetchPeople } from "@/api/people";
import styles from "./styles.module.css";

const PAGE_FETCH_SIZE = 25;

export function Table({ peopleData }: any) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const { data, fetchNextPage, isFetching, isLoading } =
    useInfiniteQuery<PersonApiResponse>(
      ["people-table-data", sorting],
      async ({ pageParam = 0 }) => {
        const start = pageParam * PAGE_FETCH_SIZE;
        const fetchedData = fetchPeople(start, PAGE_FETCH_SIZE);

        // "Calculate" Full Name
        const fetchedDataWithFullName = {
          ...fetchedData,
          data: fetchedData.data.map((p) => {
            return { ...p, full_name: `${p.first_name} ${p.last_name}` };
          }),
        };

        // Faking a delay on the API response
        return new Promise((res) => {
          setTimeout(() => {
            return res(fetchedDataWithFullName);
          }, 2000);
        });
      },
      {
        getNextPageParam: (_lastGroup, groups) => groups.length,
        keepPreviousData: true,
        refetchOnWindowFocus: false,
      }
    );

  const flatData = useMemo(
    () => data?.pages?.flatMap((page) => page.data) ?? [],
    [data]
  );

  const table = useReactTable({
    data: flatData,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
  });

  const tableContainerRef = useRef<HTMLDivElement>(null);

  const totalDBRowCount = data?.pages?.[0]?.meta?.totalRowCount ?? 0;
  const totalFetched = flatData.length;

  const fetchMoreOnBottomReached = useCallback(
    (containerRefElement?: HTMLDivElement | null) => {
      if (containerRefElement) {
        const { scrollHeight, scrollTop, clientHeight } = containerRefElement;
        // Once the user has scrolled within 300px of the bottom of the table, fetch more data if there is any
        if (
          scrollHeight - scrollTop - clientHeight < 300 &&
          !isFetching &&
          totalFetched < totalDBRowCount
        ) {
          fetchNextPage();
        }
      }
    },
    [fetchNextPage, isFetching, totalFetched, totalDBRowCount]
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div
      className={styles.container}
      onScroll={(e) => fetchMoreOnBottomReached(e.target as HTMLDivElement)}
      ref={tableContainerRef}
    >
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}

          {isFetching && (
            <tr>
              <td>Fetching more...</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
