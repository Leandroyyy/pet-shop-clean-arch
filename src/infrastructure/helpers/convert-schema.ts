export class ConvertSchema {
  static toSchema<T, H>(
    parameters: Array<H & { field: keyof T; value: T[keyof T] }>
  ): T {
    const params: T = parameters.reduce((acc, data) => {
      return {
        ...acc,
        [data.field]: data.value,
      };
    }, {} as T);

    return params;
  }
}
