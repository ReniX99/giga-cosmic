export type TAstroResponse = {
  data: {
    table: {
      rows: TAstroResponseRow[]
    }
  }
}

type TAstroResponseRow = {
  entry: {
    id: string

    name: string
  }
  cells: TAstroResponseCell[]
}

type TAstroResponseCell = {
  type: string

  eventHighlights: {
    peak: {
      date: string
    }
  }

  extraInfo: any
}
