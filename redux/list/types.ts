export interface Item {
  id: number;
  date: Date;
  address: string;
  person: string;
  prof: string;
  imgUrl: string;
}

export interface ListSliceState {
  list: Array<Item>;
}
