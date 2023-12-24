import React from "react";
import classNames from 'classnames/bind';

import { callsStore } from "../../entities/calls/model/callsStore";
import Dropdown from '../../assets/img/dropdown.svg'

import styles from './calls-list.module.scss';

const cx = classNames.bind(styles);

export const CallsListHeader = () => {
  const { fetchCalls, period, inOut, filter, setFilter } = callsStore();

  const handleTimeFilter = () => {
    setFilter({
      order: filter.order === 'ASC' ? 'DESC': 'ASC',
      sort_by: 'date'
    });
    fetchCalls({
      date_start: period.dateStart,
      date_end: period.dateEnd,
      in_out: inOut,
      limit: 1000
    })
  }

  return (
    <div className={styles.callsHeaderItem}>
      <div className={styles.headerType}>
        <span className={styles.headerText}>Тип</span>
      </div>
      <div className={styles.headerTime} onClick={handleTimeFilter}>
        <span className={styles.headerText}>Время</span>
        <img src={Dropdown} className={cx(styles.arrowImg, {[styles.arrowActive]: filter.order === 'DESC'})}/>
      </div>
      <div className={styles.headerStaff}>
        <span className={styles.headerText}>Сотрудник</span>
      </div>
      <div className={styles.headerCall}>
        <span className={styles.headerText}>Звонок</span>
      </div>
      <div className={styles.headerSource}>
        <span className={styles.headerText}>Источник</span>
      </div>
      <div className={styles.headerMark}>
        <span className={styles.headerText}>Оценка</span>
      </div>
      <div className={styles.headerTime}>
        <span className={styles.headerText}>Длительность</span>
        <img src={Dropdown} />
      </div>
    </div>
  )
}
