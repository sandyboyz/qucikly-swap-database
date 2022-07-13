import {Product} from '../domain/Product';

export interface IProductRepository {
  getAllProduct(): Promise<Product[]>
  getProductById(id: number): Promise<Product | undefined>;
}