import axios from 'axios'
import type { TJwst, TJwstResponse } from '../types'

export async function fetchJwst(
  page: number = 1,
  perPage: number,
  searchFilter: string,
  instrumentFilter: string,
  suffixFilter: string,
  programFilter: number,
): Promise<TJwst[]> {
  let path = 'https://api.jwstapi.com/'

  if (searchFilter == 'suffix') {
    path += `all/suffix/${suffixFilter}`
  } else if (searchFilter == 'program') {
    path += `program/id/${programFilter}`
  } else {
    path += 'all/type/jpg'
  }

  const response = await axios.get<TJwstResponse>(path, {
    headers: {
      'x-api-key': import.meta.env.VITE_JWST_API_KEY,
    },
    params: {
      page,
      perPage,
    },
  })

  if (response.data.body === null) {
    return []
  }

  let data = response.data.body.map((j) => ({
    url: j.location,
    observationId: j.observation_id,
    program: j.program,
    suffix: j.details.suffix,
    instruments: j.details.instruments.map((i) => i.instrument),
    caption: `${j.observation_id} P${j.program} ${j.details.suffix} ${j.details.instruments.map((i) => i.instrument).join('/')}`,
  }))

  console.log(data)
  if (instrumentFilter !== 'all') {
    data = data.filter((j) => j.instruments.includes(instrumentFilter))
  }

  return data
}
