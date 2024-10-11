export interface Validator {
  execute(data: any): { data: any; errors: any[] };
}
