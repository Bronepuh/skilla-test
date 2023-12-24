import classNames from 'classnames/bind';

import { Option } from "../../shared/utils/types";
import { callsStore } from "../../entities/calls/model/callsStore";

import styles from './calls-types-filter.module.scss'

const cx = classNames.bind(styles);

interface ICallsTypesOptionProps {
  option: Option;
  isChosen: boolean;
  handleChangeOption: (option: Option) => void;
}

export const CallsTypesOption = ({ option, isChosen, handleChangeOption }: ICallsTypesOptionProps) => {
  const { setInOut } = callsStore();

  const onOptionClick = () => {
    handleChangeOption(option)
    if (option.label === 'Входящие') {
      return setInOut(1);
    }
    if (option.label === 'Исходящие') {
      return setInOut(0);
    }
    return setInOut(null);
  }
  return (
    <li
      className={cx(styles.optionsItem, { [styles.activeOption]: isChosen })}
      key={option.value}
      datatype={option.value as string}
      onClick={onOptionClick}
    >
      {option.label}
    </li>
  )
}