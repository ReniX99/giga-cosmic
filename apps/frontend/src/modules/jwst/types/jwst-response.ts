export type TJwstResponse = {
  body: TJwstResponseItem[]
}

type TJwstResponseItem = {
  id: string

  observation_id: string

  program: number
  details: {
    mission: string

    instruments: TJwstResponseInstrument[]

    suffix: string

    description: string
  }

  file_type: string

  thumbnail: string

  location: string
}

type TJwstResponseInstrument = {
  instrument: string
}
