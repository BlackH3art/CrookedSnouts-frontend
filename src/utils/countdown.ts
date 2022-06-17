import dayjs from 'dayjs';
import { RemainingTime } from '../interfaces/RemainingTimeInterface';

export function getRemainingTime(timestamp: number): RemainingTime {

  const whitelistTimestampMS = timestamp * 1000;

  const endTimestamp: dayjs.Dayjs = dayjs(whitelistTimestampMS);
  const nowTimestamp: dayjs.Dayjs = dayjs();

  if(endTimestamp.isBefore(nowTimestamp)) {
    
    return {
      seconds: '00',
      minutes: '00', 
      hours: '00',
      days: '00'
    }
  } else {

    return {
      seconds: getRamainingSeconds(nowTimestamp, endTimestamp),
      minutes: getRamainingMinutes(nowTimestamp, endTimestamp),
      hours: getRamainingHours(nowTimestamp, endTimestamp),
      days: getRamainingDays(nowTimestamp, endTimestamp)
    }
  }

}

function getRamainingSeconds(now: dayjs.Dayjs, end: dayjs.Dayjs) {
  const seconds = end.diff(now, 'seconds') % 60;
  return padWithZero(seconds, 2);
}
function getRamainingMinutes(now: dayjs.Dayjs, end: dayjs.Dayjs) {
  const minutes = end.diff(now, 'minutes') % 60;
  return padWithZero(minutes, 2);
}
function getRamainingHours(now: dayjs.Dayjs, end: dayjs.Dayjs) {
  const hours = end.diff(now, 'hours') % 24;
  return padWithZero(hours, 2);
}
function getRamainingDays(now: dayjs.Dayjs, end: dayjs.Dayjs) {
  const days = end.diff(now, 'days');
  return String(days);
}

function padWithZero(number: number, length: number) {
  const numberToString = String(number);

  if(numberToString.length >= length) return numberToString;
  return "0".repeat(length - numberToString.length) + numberToString;
}