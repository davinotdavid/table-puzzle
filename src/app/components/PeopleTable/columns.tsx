import { createColumnHelper } from "@tanstack/react-table"
import { Person } from "./types"

const columnHelper = createColumnHelper<Person>()

export const columns = [
  columnHelper.accessor('first_name', {
    cell: info => info.getValue(),
    header: 'First Name',
  }),
  columnHelper.accessor('last_name', {
    id: 'lastName',
    cell: info => <i>{info.getValue()}</i>,
    header: 'Last Name',
  }),
  columnHelper.accessor('full_name', {
    cell: info => <i>{info.getValue()}</i>,
    header: 'Full Name',
  }),
  columnHelper.accessor('email', {
    header: 'Email',
  }),
  columnHelper.accessor('city', {
    header: 'City',
  }),
  columnHelper.accessor('registered_date', {
    header: 'Registered Date',
  }),
  columnHelper.accessor('is_private', {
    header: 'Is Private?',
  }),
]