import { IProductRepository } from "../../repositories/IProductRepository";

export class RetrieveAllProductUseCase {
  constructor(
    private productRepository: IProductRepository
  ){}

  public async execute(){
    const result = await this.productRepository.getAllProduct();

    const response = result.map(product => ({...product}));

    console.log(response);

    return response;
  }
} 