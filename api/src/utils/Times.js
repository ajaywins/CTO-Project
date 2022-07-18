import moment from 'moment-timezone'

export const SECOND = 1;
export const MINUTE = 60 * SECOND;
export const HOUR = 60 * MINUTE;
export const DAY = 24 * HOUR;

export const MILLISECONDS = {
  SECOND: 1000,
  MINUTE: SECOND * 60,
  HOUR: MINUTE * 60,
  DAY: HOUR * 24,
};

export function now() {
  return moment().unix();
}