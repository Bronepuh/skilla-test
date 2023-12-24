import { create } from 'zustand';
import { produce } from 'immer';
import { FilterType, ICallsGetPayload, IPeriod } from './types';
import { fetchCallsApi } from '../api/request';
import { FormateCall, formatCalls, getStartDateFromDateNow } from '../utils/helpers';
import { START_PERIOD_FILTER } from '../utils/constants';

interface ICallsStore {
  calls: FormateCall[];
  period: IPeriod;
  inOut: 1 | 0 | null;

  needUpdate: boolean;
  isCallsLoading: boolean;

  filter: FilterType;

  fetchCalls: (payload: ICallsGetPayload) => Promise<void>;
  setPeriod: (period: IPeriod) => void;
  setInOut: (payload: 1 | 0 | null) => void;
  setFilter: (payload: FilterType) => void;
}

export const callsStore = create<ICallsStore>((set) => ({
  calls: [],
  isCallsLoading: false,
  period: {
    dateStart: getStartDateFromDateNow(START_PERIOD_FILTER).dateStart,
    dateEnd: getStartDateFromDateNow(START_PERIOD_FILTER).dateEnd,
  },
  inOut: null,
  needUpdate: false,
  filter: {
    order: 'ASC',
    sort_by: 'date'
  },
  fetchCalls: async (payload: ICallsGetPayload) => {
    set(produce((store: ICallsStore) => {
      store.isCallsLoading = true;
    }));
    try {
      const filter = callsStore.getState().filter
      const data = await fetchCallsApi(payload, filter);
      const formattedCalls = formatCalls(data);
      set(produce((store: ICallsStore) => {
        store.calls = formattedCalls;
      }));

    } catch (error) {
      throw new Error('Что-то пошло не так...')
    } finally {
      set(produce((store: ICallsStore) => {
        store.needUpdate = false;
        store.isCallsLoading = false;
      }));
    }

  },
  setPeriod: (period: IPeriod) => {
    set(produce((store: ICallsStore) => {
      store.period = period;
      store.needUpdate = true;
    }));
  },
  setInOut: (payload: 1 | 0 | null) => {
    set(produce((store: ICallsStore) => {
      store.inOut = payload;
      store.needUpdate = true;
    }));
  },
  setFilter: (payload: FilterType) => {
    set(produce((store: ICallsStore) => {
      store.filter = payload;
    }));
  }
}));