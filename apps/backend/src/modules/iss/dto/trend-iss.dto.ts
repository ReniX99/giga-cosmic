export class TrendIssDto {
  movement: boolean;

  deltaKm: number;

  deltaSec?: number;

  velocityKmH?: number;

  fromTime?: Date;

  toTime?: Date;

  fromLatitude?: number;

  fromLongitude?: number;

  toLatitude?: number;

  toLongitude?: number;
}
