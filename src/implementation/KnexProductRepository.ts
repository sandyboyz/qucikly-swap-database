import {Knex} from "knex";
import { Product } from "../core/services/Product/domain/Product";
import { IProductRepository } from "../core/services/Product/repositories/IProductRepository";


interface ProductTable {
  id: number
  nama: string
  harga: number
}


export class KnexProductRepository implements IProductRepository{
  constructor(private client: Knex<ProductTable>){
  }

  public async getAllProduct(): Promise<Product[]> {
    const result = await this.client("Product");

    const product = result.map(product => {
      return new Product({
        id: product.id,
        name: product.nama,
        price: product.harga
      })
    })

    return product;
  }

  public async getProductById(id: number): Promise<Product | undefined>{
    const result = await this.client("Product").where("id", "=", id).first();
    
    if (!result){
      return result;
    }

    const product = new Product({
      id: result.id,
      name: result.nama,
      price: result.harga
    });

    return product;
  }

}