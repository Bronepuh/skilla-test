import { useRef, useState } from "react";
import classNames from 'classnames/bind';

import { CallsTypesOption } from "./CallsTypesOption";
import { useClickOutside } from "../../shared/hooks/useClickOutside";
import { Option } from "../../shared/utils/types";
import { CALLS_TYPES_OPTIONS } from "./utils/constants";
import Dropdown from '../../assets/img/dropdown.svg'

import styles from './calls-types-filter.module.scss'

const cx = classNames.bind(styles);

export const CallsTypesFilter = () => {
  const [isShowOptions, setIsShowOptions] = useState(false);
  const [chosenOption, setChosenOption] = useState<Option | null>(CALLS_TYPES_OPTIONS[0]);

  const wrapperRef = useRef(null);

  const handleToggleShowOptions = () => setIsShowOptions(!isShowOptions);
  const handleClickOutside = () => setIsShowOptions(false);

  useClickOutside({ ref: wrapperRef, handleClickOutside });

  const handleChangeOption = (option: Option) => {
    const chosenOption = CALLS_TYPES_OPTIONS.find((item) => item.value === option.value);
    if (chosenOption) {
      setChosenOption(chosenOption);
      setIsShowOptions(false);
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.input}>
        <span
          className={styles.inputValue}
          onClick={handleToggleShowOptions}>{chosenOption?.label || null}
        </span>
        <img className={cx(styles.arrowImg, { [styles.arrowActive]: isShowOptions })} src={Dropdown} onClick={handleToggleShowOptions} />
      </div>
      {isShowOptions &&
        <ul className={styles.optionsList} ref={wrapperRef}>
          {CALLS_TYPES_OPTIONS.map((item: Option) => (
            <CallsTypesOption
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