
import moment from 'moment';

import { FilterType, ICall } from "../model/types";

export const formatDate = (date: Date) => {
  var year = date.getFullYear();
  var month = ('0' + (date.getMonth() + 1)).slice(-2);
  var day = ('0' + date.getDate()).slice(-2);
  return year + '-' + month + '-' + day;
}

export const getStartDateFromDateNow = (period: number) => {
  // Получаем текущую дату
  const currentDate = new Date();

  // Устанавливаем время начала текущего дня (00:00:00)
  currentDate.setHours(0, 0, 0, 0);

  // Вычитаем три дня из текущей даты
  const periodDaysAgo = new Date(currentDate);
  periodDaysAgo.setDate(currentDate.getDate() - period);

  return {
    dateStart: formatDate(periodDaysAgo),
    dateEnd: formatDate(currentDate)
  }
}

export type FormateCall = {
  date: string,
  dateTitle: string,
  calls: ICall[],
  ms: number
}

export const getTodayAndYesterday = (date: string) => {
  // Получение сегодняшней даты
  const today = moment(Date.now())

  // Получение вчерашней даты
  const yesterday = moment().subtract(1, 'days');

  if (new Date(date).getDay() === today.day()) {
    return 'Сегодня'
  }

  if (new Date(date).getDay() === yesterday.day()) {
    return 'Вчера'
  }

  return moment(date).locale('ru').format('DD MM YYYY')
}

export const formatCalls = (data: ICall[]) => {
  let calls: FormateCall[] = [];
  data.forEach((item) => {
    const breakIDate: string = item.date.split(' ')[0];
    const existDate = calls.find((item) => item.date === breakIDate);
    if (existDate) {
      existDate.calls.push(item)
    } else {
      calls.push({
        date: breakIDate,
        dateTitle: getTodayAndYesterday(breakIDate),
        calls: [item],
        ms: new Date(breakIDate).getTime(),
      })
    }
  })

  return calls
}

//фильтр по order с сервера не работает (отправляю его и в квери-параметрах и в боди), 
//поэтому сделал фильтрацию на клиенте

export const filterCalls = (filter: FilterType, calls: FormateCall[]) => {
  if (filter.order === 'DESC') {
    const filteredDays = [...calls].sort((a, b) => a.ms - b.ms);
    return filteredDays;
  }
  if (filter.order === 'ASC') {
    const filteredDays = [...calls].sort((a, b) => b.ms - a.ms);
    return filteredDays
  }
  return calls
}