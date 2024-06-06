export type TypedResponse<Data> = {
  success: boolean;
  data: Data | null;
  error: { name: string; code: number; msg: string }[];
};
