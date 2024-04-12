export interface Location {
  geo: Geo;
  timezone: string;
  timezone_offset: number;
  timezone_millis: number;
  timezone_offset_with_dst: number;
  date: string;
  date_time: string;
  date_time_txt: string;
  date_time_wti: string;
  date_time_ymd: string;
  date_time_unix: number;
  time_24: string;
  time_12: string;
  week: number;
  month: number;
  year: number;
  year_abbr: string;
  is_dst: boolean;
  dst_savings: number;
  dst_exists: boolean;
  dst_start: string;
  dst_end: string;
}

export interface Geo {
  location: string;
  country: string;
  state: string;
  city: string;
  locality: string;
  latitude: number;
  longitude: number;
}
