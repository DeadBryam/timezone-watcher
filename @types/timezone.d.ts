export interface TimeZone {
  timeZone: string;
  currentLocalTime: string;
  currentUtcOffset: CurrentUtcOffset;
  standardUtcOffset: StandardUtcOffset;
  hasDayLightSaving: boolean;
  isDayLightSavingActive: boolean;
  dstInterval: unknown;
}

export interface CurrentUtcOffset {
  seconds: number;
  milliseconds: number;
  ticks: number;
  nanoseconds: number;
}

export interface StandardUtcOffset {
  seconds: number;
  milliseconds: number;
  ticks: number;
  nanoseconds: number;
}
