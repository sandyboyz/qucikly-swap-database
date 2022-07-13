import { Model } from 'mongoose';
import { Product } from '../core/services/Product/domain/Product';
import { IProductRepository } from '../core/services/Product/repositories/IProductRepository';

export class MongoProductRepository implements IProductRepository {
  constructor(private client: Model<Product>) {}

  public async getAllProduct(): Promise<Product[]> {
    const result = await this.client.find().lean();
    const product = result.map((product) => {
      return new Product({
        id: product.id,
        name: product.name,
        price: product.price,
      });
    });

    return product;
  }

  public async getProductById(id: number): Promise<Product | undefined> {
    let product: Product | undefined;

    const result = await this.client.findOne({id}).lean();

   
    if (result) {
      product = new Product({
        id: result.id,
        name: result.name,
        price: result.price
      })
    }
    return product;
  }
}
