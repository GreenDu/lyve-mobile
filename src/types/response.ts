export type TypedResponse<Data> = {
  success: boolean;
  data: Data;
  error: { name: string; code: number; msg: string }[];
};
