import { Column, createColumnHelper } from "@tanstack/react-table"
import { Person } from "./types"

const columnHelper = createColumnHelper<Person>()

function toggleSortingAscending(column: Column<Person>) {
  return column.toggleSorting(column.getIsSorted() === "asc");
}

export const columns = [
  columnHelper.accessor('first_name', {
    cell: info => info.getValue(),
    header: ({ column }) => {
      return (
        <button
          onClick={() => toggleSortingAscending(column)}
        >
          First Name
        </button>
      )
    },
  }),
  columnHelper.accessor('last_name', {
    id: 'lastName',
    cell: info => <i>{info.getValue()}</i>,
    header: ({ column }) => {
      return (
        <button
          onClick={() => toggleSortingAscending(column)}
        >
          Last Name
        </button>
      )
    },
  }),
  columnHelper.accessor('full_name', {
    cell: info => <i>{info.getValue()}</i>,
    header: ({ column }) => {
      return (
        <button
          onClick={() => toggleSortingAscending(column)}
        >
          Full Name
        </button>
      )
    },
  }),
  columnHelper.accessor('email', {
    header: ({ column }) => {
      return (
        <button
          onClick={() => toggleSortingAscending(column)}
        >
          Email
        </button>
      )
    },
  }),
  columnHelper.accessor('city', {
    header: ({ column }) => {
      return (
        <button
          onClick={() => toggleSortingAscending(column)}
        >
          City
        </button>
      )
    },
  }),
  columnHelper.accessor('registered_date', {
    header: ({ column }) => {
      return (
        <button
          onClick={() => toggleSortingAscending(column)}
        >
          Registered Date
        </button>
      )
    },
  }),
  columnHelper.accessor('is_private', {
    header: ({ column }) => {
      return (
        <button
          onClick={() => toggleSortingAscending(column)}
        >
          Is Private?
        </button>
      )
    },
  }),
]