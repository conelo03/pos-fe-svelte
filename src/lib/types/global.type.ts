export type ColumnType<T> = {
  key?: keyof T; // optional kalau hanya kolom custom
  accessorKey?: string | number | boolean;
  title: string;
  cell?: (row: any) => any;
};
