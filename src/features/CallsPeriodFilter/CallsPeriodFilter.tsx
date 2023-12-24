import React, { useState } from "react";

import { Option } from "../../shared/utils/types";
import { CALLS_PERIOD_OPTIONS } from "./utils/constants";
import { CallsPeriodOption } from "./CallsPeriodOption";
import { getStartDateFromDateNow } from "../../entities/calls/utils/helpers";
import { START_PERIOD_FILTER, WEEK_PERIOD_FILTER } from "../../entities/calls/utils/constants";
import { callsStore } from "../../entities/calls/model/callsStore";
import { IPeriod } from "../../entities/calls/model/types";

import styles from './calls-period-filter.module.scss';

export const CallsPeriodFilter = () => {
  const [isShowOptions, setIsShowOptions] = useState(false);
  const [chosenOption, setChosenOption] = useState<Option | null>(CALLS_PERIOD_OPTIONS[0]);

  const { setPeriod } = callsStore();

  const handleToggleShowOptions = () => setIsShowOptions(!isShowOptions);

  const handleChangeOption = (option: Option, period?: IPeriod) => {
    const chosenOption = CALLS_PERIOD_OPTIONS.find((item) => item.value === option.value);
    if (chosenOption) {
      switch (option.value) {
        case 'threeDays':
          const startPeriod = {
            dateStart: getStartDateFromDateNow(START_PERIOD_FILTER).dateStart,
            dateEnd: getStartDateFromDateNow(START_PERIOD_FILTER).dateEnd,
          }
          setPeriod(startPeriod);
          setChosenOption(chosenOption);
          setIsShowOptions(false);
          break;
        case 'week':
          const periodWeek = {
            dateStart: getStartDateFromDateNow(WEEK_PERIOD_FILTER).dateStart,
            dateEnd: getStartDateFromDateNow(WEEK_PERIOD_FILTER).dateEnd,
          }
          setPeriod(periodWeek);
          setChosenOption(chosenOption);
          setIsShowOptions(false);
          break;

        default:
          break;
      }
    }

    if (period && option.value === 'calendar') {
      const newOption: Option = {
        label: `с ${period.dateStart} по ${period.dateEnd}`,
        value: 'calendar'
      }
      setChosenOption(newOption);
      setPeriod(period);
      setIsShowOptions(false);
    }
  }

  return (
    <div className={styles.wrapper} >
      <div className={styles.inputWrapper}>
        <div className={styles.input}>
          <div className={styles.arrowImgLeft} onClick={handleToggleShowOptions}></div>
          <div className={styles.calendar} onClick={handleToggleShowOptions} />
          <span
            className={styles.inputValue}
            onClick={handleToggleShowOptions}>{chosenOption?.label || null}
          </span>
          <div className={styles.arrowImgRight} onClick={handleToggleShowOptions} />
        </div>
      </div>
      {isShowOptions &&
        <ul className={styles.optionsList}>
          {CALLS_PERIOD_OPTIONS.map((item: Option) => (
            <CallsPeriodOption
              key={item.value}
              option={item}
              isChosen={item.label === chosenOption?.label}
              handleChangeOption={handleChangeOption}
            />
          ))}
        </ul>
      }
    </div>
  )
}