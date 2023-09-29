import fsPromises from 'fs/promises'
import path from "path";

export async function fetchPeople() {
  const filePath = path.join(process.cwd(), 'src/data/people.json');
  const jsonData = await fsPromises.readFile(filePath);
  const peopleData = JSON.parse(jsonData.toString());

  return peopleData;
}