export type TTrendIss = {
  movement: boolean

  deltaKm: number

  deltaSec?: number

  velocityKmH?: number

  fromTime?: Date

  toTime?: Date

  fromLatitude?: number

  fromLongitude?: number

  toLatitude?: number

  toLongitude?: number
}

export type TIss = {
  id: number

  fetchedAt: Date

  sourceUrl: string

  payload: any
}
