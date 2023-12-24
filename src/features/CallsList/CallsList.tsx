import React from "react";

import styles from './calls-list.module.scss'
import { CallsItem } from "./CallsItem";
import { ICall } from "../../entities/calls/model/types";
import { Spinner } from "../../shared/ui/spinner/spinner";
import { FormateCall } from "../../entities/calls/utils/helpers";
import moment from "moment";
import { callsStore } from "../../entities/calls/model/callsStore";

interface ICallsListProps {
  calls: FormateCall;
}

export const CallsList = ({ calls }: ICallsListProps) => {
  const { filter } = callsStore();

  if (!calls.calls.length) {
    return <Spinner />
  }

  return (
    <>
      {calls.dateTitle !== 'Сегодня' &&
        <div className={styles.callsListTitle}>
          <span className={styles.callsListTitleText}>
            {calls.dateTitle === 'Вчера' ? calls.dateTitle : moment(calls.date).format('DD MMMM YYYY')}
          </span>
          <span className={styles.callsListTitleCount}>{calls.calls.length}</span>
        </div>
      }
      {calls.dateTitle === 'Сегодня' && filter.order === 'DESC' &&
        <div className={styles.callsListTitle}>
          <span className={styles.callsListTitleText}>
            {`Сегодня`}
          </span>
          <span className={styles.callsListTitleCount}>{calls.calls.length}</span>
        </div>
      }
      <ul className={styles.callsList}>
        {calls.calls.map((item) => (
          <CallsItem key={item.id} call={item} />
        ))}
      </ul>
    </>
  )
}
