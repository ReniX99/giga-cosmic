import api from '@/services/axios'
import type { TAstro, TAstroResponse } from '../types'
import { formatIsoUtcString } from '@/utils/date'

export async function fetchAstro(
  body: string = 'sun',
  latitude: number = 55.7558,
  longitude: number = 37.6176,
  dates: number = 7,
): Promise<TAstro[]> {
  const fromDate = new Date()

  const toDate = new Date()
  toDate.setDate(toDate.getDate() + dates)

  const { data } = await api.get<TAstroResponse>('/astro', {
    params: {
      body,
      latitude,
      longitude,
      fromDate: fromDate.toISOString().split('T')[0],
      toDate: toDate.toISOString().split('T')[0],
    },
  })

  if (data.data.table.rows[0]?.cells.length === 0) {
    return []
  }

  return data.data.table.rows.map((r, index) => ({
    id: index + 1,
    body: r.entry.name,
    event: r.cells[0]?.type ?? '',
    date: formatIsoUtcString(new Date(r.cells[0]?.eventHighlights.peak.date ?? '').toISOString()),
    extra: r.cells[0]?.extraInfo ?? '',
  }))
}
