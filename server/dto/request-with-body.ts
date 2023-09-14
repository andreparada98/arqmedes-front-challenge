export type RequestWithBody<T> = {
  body: T;
  headers: {
    [key: string]: string;
  };
};
