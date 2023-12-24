import { useEffect, useMemo } from "react";
import { callsStore } from "../../entities/calls/model/callsStore";

import { Spinner } from "../../shared/ui/spinner/spinner";
import { filterCalls } from "../../entities/calls/utils/helpers";
import { CallsList } from "../../features/CallsList";
import { CallsListHeader } from "../../features/CallsList/CallsListHeader";
import { CallsTopControls } from "../../widgets/CallsTopControls";

import styles from './calls-list-page.module.scss'

const CallsListPage = () => {
  const { fetchCalls, calls, period, inOut, needUpdate, isCallsLoading, filter } = callsStore();

  useEffect(() => {
    fetchCalls({
      date_start: period.dateStart,
      date_end: period.dateEnd,
      in_out: inOut,
      limit: 1000
    })
  }, [])

  useEffect(() => {
    if (needUpdate) {
      fetchCalls({
        date_start: period.dateStart,
        date_end: period.dateEnd,
        in_out: inOut,
        limit: 1000
      })
    }
  }, [needUpdate])

  useEffect(() => {
    if (filter && calls.length) {
      const filteredCalls = filterCalls(filter, calls);
      console.log(filteredCalls);

    }
  }, [filter, calls])

  const filteredCalls = useMemo(() => filterCalls(filter, calls), [filter, calls]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <CallsTopControls />
        {isCallsLoading &&
          <Spinner />
        }
        <div className={styles.callsListsWrapper}>
          <CallsListHeader key={Math.random()} />
          {!isCallsLoading && calls.length &&
            filteredCalls.map((item) => (
              <CallsList key={item.date} calls={item} />
            ))}
        </div>
      </div>
    </div>
  )
}

export default CallsListPage