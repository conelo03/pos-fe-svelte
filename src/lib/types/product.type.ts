export interface ProductType {
  id?: string;
  name: string;
  description: string;
  price: number | null;
  image?: string;
  file?: any;
  createdBy?: string;
  createdAt?: string;
  updatedBy?: string;
  updatedAt?: string;
}
