import { Prisma } from '.prisma/client';
import { Product as ProductDomain } from '../core/services/Product/domain/Product';
import { IProductRepository } from '../core/services/Product/repositories/IProductRepository';

export class PrimsaProductRepository implements IProductRepository {
  constructor(private client: Prisma.ProductDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>) {}

  public async getAllProduct(): Promise<ProductDomain[]> {
    const result = await this.client.findMany();

    const product = result.map((product) => {
      return new ProductDomain({
        id: product.id,
        name: product.nama,
        price: product.harga,
      });
    });
    return product;
  }

  public async getProductById(id: number): Promise<ProductDomain | undefined> {
    const result = await this.client.findUnique({ where: { id } });

    let product: ProductDomain | undefined;

    if (!result) {
      return product;
    }

    product = new ProductDomain({
      id: result.id,
      name: result.nama,
      price: result.harga,
    });

    return product;
  }
}
