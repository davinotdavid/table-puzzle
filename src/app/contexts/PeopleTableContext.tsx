"use client";

import {
  ReactNode,
  createContext,
  useCallback,
  useMemo,
  useState,
} from "react";
import {
  ColumnOrderState,
  SortingState,
  Table,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Person, PersonApiResponse, fetchPeople } from "@/api/people";
import { columns } from "../components/PeopleTable/columns";

interface PeopleTableContextType {
  table: Table<Person>;
  fetchMoreOnBottomReached: (
    containerRefElement?: HTMLDivElement | null
  ) => void;
  isLoading: boolean;
  isFetching: boolean;
  saveCurrentColumnState: () => void;
  loadPreviousColumnState: () => void;
  resetColumnState: () => void;
}

interface PeopleTableContextProviderProps {
  children: ReactNode;
}

const PAGE_FETCH_SIZE = 25;

export const PeopleTableContext = createContext({} as PeopleTableContextType);

export function PeopleTableContextProvider({
  children,
}: PeopleTableContextProviderProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>(
    columns.map((column) => column.id as string)
  );

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
      columnOrder,
    },
    onSortingChange: setSorting,
    onColumnOrderChange: setColumnOrder,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
  });

  const totalDBRowCount = data?.pages?.[0]?.meta?.totalRowCount ?? 0;
  const totalFetched = flatData.length;

  const fetchMoreOnBottomReached = useCallback(
    (containerRefElement?: HTMLDivElement | null) => {
      if (containerRefElement) {
        const { scrollHeight, scrollTop, clientHeight } = containerRefElement;
        // Once the user has scrolled within 100px of the bottom of the table, fetch more data if there is any
        if (
          scrollHeight - scrollTop - clientHeight < 100 &&
          !isFetching &&
          totalFetched < totalDBRowCount
        ) {
          fetchNextPage();
        }
      }
    },
    [fetchNextPage, isFetching, totalFetched, totalDBRowCount]
  );

  function saveCurrentColumnState() {
    localStorage.setItem(
      "@tablepuzzle:columnorder:",
      JSON.stringify(columnOrder)
    );
  }

  function loadPreviousColumnState() {
    const storedColumnOrder = localStorage.getItem("@tablepuzzle:columnorder:");
    if (storedColumnOrder) {
      setColumnOrder(JSON.parse(storedColumnOrder));
    }
  }

  function resetColumnState() {
    setColumnOrder(columns.map((column) => column.id as string));
  }

  return (
    <PeopleTableContext.Provider
      value={{
        table,
        fetchMoreOnBottomReached,
        isLoading,
        isFetching,
        saveCurrentColumnState,
        loadPreviousColumnState,
        resetColumnState,
      }}
    >
      {children}
    </PeopleTableContext.Provider>
  );
}
