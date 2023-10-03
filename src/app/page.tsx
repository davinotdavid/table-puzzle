import { Header } from "./components/Header";
import { Table } from "./components/PeopleTable";
import { PeopleTableContextProvider } from "./contexts/PeopleTableContext";

export default function Home() {
  return (
    <PeopleTableContextProvider>
      <Header />

      <main className="px-4">
        <Table />
      </main>
    </PeopleTableContextProvider>
  );
}
