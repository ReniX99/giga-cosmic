import api from '@/services/axios'
import type { TIss, TTrendIss } from '../types'

export async function fetchLastIss(): Promise<TIss> {
  const response = await api.get<TIss>('/last')

  return response.data
}

export async function fetchTrendIss(): Promise<TTrendIss> {
  const response = await api.get<TTrendIss>('/iss/trend')

  return response.data
}
