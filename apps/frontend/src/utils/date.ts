export function formatIsoUtcString(isoString: string): string {
  const match = isoString.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/)

  if (!match) {
    throw new Error('Некорректная ISO-строка')
  }

  const [, year, month, day, hour, minute, second] = match

  return `${day}.${month}.${year} ${hour}:${minute}:${second}`
}
