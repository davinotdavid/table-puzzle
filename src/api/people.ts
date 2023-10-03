import peopleJson from '@/data/people.json'

export type Person = {
  id: string
  first_name: string
  last_name: string
  full_name?: string
  email: string
  city: string
  registered_date: string
  is_private: boolean
}

export type PersonApiResponse = {
  data: Person[]
  meta: {
    totalRowCount: number
  }
}

export function fetchPeople(
  start: number,
  size: number,
): PersonApiResponse {
  const dbData = [...peopleJson];

  return {
    data: dbData.slice(start, start + size),
    meta: {
      totalRowCount: dbData.length,
    },
  }
}
