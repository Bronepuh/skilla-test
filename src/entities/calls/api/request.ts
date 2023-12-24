import { apiInstance } from "../../../shared/api/base";
import { CallDTO, FilterType, ICallRaw, ICallsGetPayload } from "../model/types";

export const fetchCallsApi = async (payload: ICallsGetPayload, filter:FilterType): Promise<CallDTO[]> => {
  const { data } = await apiInstance.post(`https://api.skilla.ru/mango/getList?date_start=${payload.date_start}&date_end=${payload.date_end}${payload.in_out || payload.in_out === 0 ? `&in_out=${payload.in_out}`: ''}${filter.order ? `&order=${filter.order}`: ''}&limit=${payload.limit || '50'}`,
    {
      method: 'POST',
      headers: {
        authorization: 'Bearer testtoken',
      },
      body: {
        order: filter.order
      }
    })
        
  return data.results.map((item: ICallRaw) => new CallDTO(item));
};
