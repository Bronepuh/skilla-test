import React from "react";

import styles from './calls-top-controls.module.scss'
import { CallsTypesFilter } from "../../features/CallsTypesFilter";
import { CallsPeriodFilter } from "../../features/CallsPeriodFilter";

export const CallsTopControls = () => {
  return (
    <div className={styles.wrapper}>
      <CallsTypesFilter />
      <CallsPeriodFilter />
    </div>
  )
}