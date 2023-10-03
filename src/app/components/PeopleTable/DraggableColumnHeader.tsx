import { Person } from "@/api/people";
import {
  Column,
  ColumnOrderState,
  Header,
  Table,
  flexRender,
} from "@tanstack/react-table";
import { FC } from "react";
import { useDrag, useDrop } from "react-dnd";

const reorderColumn = (
  draggedColumnId: string,
  targetColumnId: string,
  columnOrder: string[]
): ColumnOrderState => {
  columnOrder.splice(
    columnOrder.indexOf(targetColumnId),
    0,
    columnOrder.splice(columnOrder.indexOf(draggedColumnId), 1)[0] as string
  );
  return [...columnOrder];
};

export const DraggableColumnHeader: FC<{
  header: Header<Person, unknown>;
  table: Table<Person>;
}> = ({ header, table }) => {
  const { getState, setColumnOrder } = table;
  const { columnOrder } = getState();
  const { column } = header;

  const [, dropRef] = useDrop({
    accept: "column",
    drop: (draggedColumn: Column<Person>) => {
      const newColumnOrder = reorderColumn(
        draggedColumn.id,
        column.id,
        columnOrder
      );
      setColumnOrder(newColumnOrder);
    },
  });

  const [{ isDragging }, dragRef, previewRef] = useDrag({
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    item: () => column,
    type: "column",
  });

  return (
    <th
      ref={dropRef}
      colSpan={header.colSpan}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <div ref={previewRef}>
        {header.isPlaceholder
          ? null
          : flexRender(header.column.columnDef.header, header.getContext())}
        <button ref={dragRef}>🟰</button>
      </div>
    </th>
  );
};
