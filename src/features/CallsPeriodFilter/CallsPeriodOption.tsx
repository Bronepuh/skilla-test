import { useState } from "react";
import classNames from 'classnames/bind';
import { RangeValue } from "rc-picker/lib/interface";
import { DatePicker } from 'antd';
import dayjs from "dayjs";

import { Option } from "../../shared/utils/types";
import { IPeriod } from "../../entities/calls/model/types";

import styles from './calls-period-filter.module.scss'
import './datepicker.css'

const { RangePicker } = DatePicker;

const cx = classNames.bind(styles);

interface ICallsPeriodOptionProps {
  option: Option;
  isChosen: boolean;
  handleChangeOption: (option: Option, period?: IPeriod) => void;
}

export const CallsPeriodOption = ({ option, isChosen, handleChangeOption }: ICallsPeriodOptionProps) => {
  const [values, setValues] = useState<RangeValue<dayjs.Dayjs> | null>(null)

  const onOptionClick = () => {
    if (!option.disabled) {
      handleChangeOption(option)
    }
  }

  const handleChange = (values: RangeValue<dayjs.Dayjs>) => {
    console.log(values?.[0]?.format('YYYY-MM-DD'));
    console.log(values?.[1]?.format('YYYY-MM-DD'));
    if (values && values[0] && values[1]) {

      setValues(values)
      const period = {
        dateStart: values[0].format('YYYY-MM-DD'),
        dateEnd: values[1].format('YYYY-MM-DD')
      }
      handleChangeOption(option, period)
    }
  }


  return (
    <li
      className={cx(styles.optionsItem, {
        [styles.activeOption]: isChosen,
        [styles.disabledOption]: option.disabled,
      })}
      key={option.value}
      onClick={onOptionClick}
    >
      <span>
        {option.label}
      </span>
      {option.label === 'Указать даты' ?
        <RangePicker
          className={'createDateRangePicker'}
          rootClassName={styles.rootClassName}
          onChange={values => handleChange(values)}
          value={values}
          placeholder={['__.__.__', '__.__.__']}
        />
        : null}
    </li>
  )
}