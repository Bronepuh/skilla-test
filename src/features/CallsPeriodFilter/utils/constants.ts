import { Option } from "../../../shared/utils/types";

export const CALLS_PERIOD_OPTIONS: Option[] = [
  {
    value: 'threeDays',
    label: '3 дня',
  },
  {
    value: 'week',
    label: 'Неделя',
  },
  {
    value: 'month',
    label: 'Месяц',
    disabled: true
  },
  {
    value: 'year',
    label: 'Год',
    disabled: true
  },
  {
    value: 'calendar',
    label: 'Указать даты',
  },
]