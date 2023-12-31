"use client";

import { useContext, useRef } from "react";
import { flexRender } from "@tanstack/react-table";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { PeopleTableContext } from "@/app/contexts/PeopleTableContext";
import styles from "./styles.module.css";
import { DraggableColumnHeader } from "./DraggableColumnHeader";

export function Table() {
  const { table, fetchMoreOnBottomReached, isLoading, isFetching } =
    useContext(PeopleTableContext);

  const tableContainerRef = useRef<HTMLDivElement>(null);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div
        className="h-[500px] overflow-auto border-2 border-solid border-gray-400 rounded"
        onScroll={(e) => fetchMoreOnBottomReached(e.target as HTMLDivElement)}
        ref={tableContainerRef}
      >
        <table className="w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <DraggableColumnHeader
                    key={header.id}
                    header={header}
                    table={table}
                  />
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
                <td className="text-center py-4" colSpan={7}>
                  Fetching more...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </DndProvider>
  );
}
