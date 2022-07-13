import joi from 'joi';
import { Validate } from '../../../util/Validate';

export interface IProduct {
  id: number;
  name: string;
  price: number;
}

export class Product {
  public id: number;
  public name: string;
  public price: number;

  #SCHEMA = joi.object<IProduct>({
    id: joi.number().required(),
    name: joi.string().required(),
    price: joi.number().required(),
  });

  constructor(product: IProduct) {
    const result = Validate.againstSchema(this.#SCHEMA, product);
    if (!result.succeeded) throw new Error('Error Validasi');

    this.id = product.id;
    this.name = product.name;
    this.price = product.price;
  }
}
