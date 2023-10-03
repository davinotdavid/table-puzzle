"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Header } from "./components/Header";
import { Table } from "./components/PeopleTable";
import { AuthContextProvider } from "./contexts/AuthContext";
import { PeopleTableContextProvider } from "./contexts/PeopleTableContext";

const queryClient = new QueryClient();

export default function Home() {
  return (
    <AuthContextProvider>
      <QueryClientProvider client={queryClient}>
        <PeopleTableContextProvider>
          <Header />

          <main>
            <Table />
          </main>
        </PeopleTableContextProvider>
      </QueryClientProvider>
    </AuthContextProvider>
  );
}
