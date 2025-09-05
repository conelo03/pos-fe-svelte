export interface ProductType {
  id?: string;
  name: string;
  description: string;
  price: number | null;
  createdBy?: string;
  createdAt?: string;
  updatedBy?: string;
  updatedAt?: string;
}
