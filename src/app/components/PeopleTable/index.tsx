'use client'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Table } from "./Table";

const queryClient = new QueryClient()

export async function PeopleTable() {
  return (
    <QueryClientProvider client={queryClient}>
      <Table />
    </QueryClientProvider>
  )
}