export interface ICallRaw {
  id: string;
  in_out: 1 | 0;
  date: string;
  person_avatar: string;
  from_number: string;
  source: string;
  record: string;
}

export interface ICall {
  id: string;
  inOut: 1 | 0;
  date: string;
  personAvatar: string;
  fromNumber: string;
  source: string;
  record: string;
}

export class CallDTO implements ICall {
  readonly id: string;
  readonly inOut: 1 | 0;
  readonly date: string;
  readonly personAvatar: string;
  readonly fromNumber: string;
  readonly source: string;
  readonly record: string;

  constructor({
    id,
    in_out,
    date,
    person_avatar,
    from_number,
    source,
    record

  }: ICallRaw) {
    this.id = id;
    this.inOut = in_out;
    this.date = date || '';
    this.personAvatar = person_avatar || '';
    this.fromNumber = from_number || '';
    this.source = source || '';
    this.record = record || '';
  }
}

export interface ICallsGetPayload {
  date_start: string;
  date_end: string;
  in_out?: 1 | 0 | null;
  limit?: number;
  order?: 'ASC' | 'DESC';
  record?: string;
}

export interface IPeriod {
  dateStart: string;
  dateEnd: string;
}

export interface FilterType {
  order: 'ASC' | 'DESC';
  sort_by: string;
}

export interface IPeriod {
  dateStart: string;
  dateEnd: string;
}
