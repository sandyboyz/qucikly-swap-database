import { IProductRepository } from "../../repositories/IProductRepository";

interface RetrieveProductByIdDto {
  id: number;
}

export class RetrieveProductByIdUseCase {
  constructor(
    private productRepository: IProductRepository
  ){}

  public async execute(dto: RetrieveProductByIdDto){
    const result = await this.productRepository.getProductById(dto.id);

    if (!result){
      throw new Error("Product Not Found");
    }

    const response = {
      id: result.id,
      name: result.name,
      price: result.price
    };

    console.log(response);

    return response;
  }
} 