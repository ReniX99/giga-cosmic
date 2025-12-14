import api from '@/services/axios'
import type { TOsdrItem } from '../types'

export async function fetchOsdrList(): Promise<TOsdrItem[]> {
  const response = await api.get<TOsdrItem[]>('/osdr/list')

  return response.data
}
