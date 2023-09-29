import { fetchPeople } from "@/api/people";
import { Table } from "./Table";

export async function PeopleTable() {
  const peopleData = await fetchPeople();

  return (
    <Table peopleData={peopleData} />
  )
}