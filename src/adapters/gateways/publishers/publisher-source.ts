export interface PublisherParams<T> {
  field: keyof T;
  value: T[keyof T];
}

export interface PublisherSource<T, H> {
  publish(
    body: PublisherParams<T>[],
    headers: PublisherParams<H>[]
  ): Promise<void>;
}
