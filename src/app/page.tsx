"use client";

import { Header } from "./components/Header";
import { PeopleTable } from "./components/PeopleTable";
import { AuthContextProvider } from "./contexts/AuthContext";

export default function Home() {
  return (
    <AuthContextProvider>
      <Header />
      <main>
        <PeopleTable />
      </main>
    </AuthContextProvider>
  );
}
