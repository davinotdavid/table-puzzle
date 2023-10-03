import { Column, createColumnHelper } from "@tanstack/react-table";
import { Person } from "@/api/people";

const columnHelper = createColumnHelper<Person>();

function toggleSortingAscending(column: Column<Person>) {
  return column.toggleSorting(column.getIsSorted() === "asc");
}

export const columns = [
  columnHelper.accessor("first_name", {
    id: "firstName",
    cell: (info) => info.getValue(),
    header: ({ column }) => {
      return (
        <button onClick={() => toggleSortingAscending(column)}>
          First Name
        </button>
      );
    },
  }),
  columnHelper.accessor("last_name", {
    id: "lastName",
    cell: (info) => info.getValue(),
    header: ({ column }) => {
      return (
        <button onClick={() => toggleSortingAscending(column)}>
          Last Name
        </button>
      );
    },
  }),
  columnHelper.accessor("full_name", {
    id: "fullName",
    cell: (info) => info.getValue(),
    header: ({ column }) => {
      return (
        <button onClick={() => toggleSortingAscending(column)}>
          Full Name
        </button>
      );
    },
  }),
  columnHelper.accessor("email", {
    id: "email",
    cell: (info) => info.getValue(),
    header: ({ column }) => {
      return (
        <button onClick={() => toggleSortingAscending(column)}>Email</button>
      );
    },
  }),
  columnHelper.accessor("city", {
    id: "city",
    cell: (info) => info.getValue(),
    header: ({ column }) => {
      return (
        <button onClick={() => toggleSortingAscending(column)}>City</button>
      );
    },
  }),
  columnHelper.accessor("registered_date", {
    id: "registeredDate",
    cell: (info) =>
      new Intl.DateTimeFormat("en-CA").format(new Date(info.getValue())),
    header: ({ column }) => {
      return (
        <button onClick={() => toggleSortingAscending(column)}>
          Registered Date
        </button>
      );
    },
  }),
  columnHelper.accessor("is_private", {
    id: "isPrivate",
    cell: (info) => (info.getValue() ? "Yes" : "No"),
    header: ({ column }) => {
      return (
        <button onClick={() => toggleSortingAscending(column)}>
          Is Private?
        </button>
      );
    },
  }),
];
