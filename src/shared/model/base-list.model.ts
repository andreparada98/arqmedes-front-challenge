export class BaseListResponseMeta {
  page: number;
  itemsPerPage: number;
  totalItems: number;
  constructor(page: number, itemsPerPage: number, totalItems: number) {
    this.page = page;
    this.itemsPerPage = itemsPerPage;
    this.totalItems = totalItems;
  }
}

export class BaseListResponse<T> {
  data: T[];
  meta: BaseListResponseMeta;
  constructor(payload: T[], meta: BaseListResponseMeta) {
    (this.data = payload), (this.meta = meta);
  }
}
