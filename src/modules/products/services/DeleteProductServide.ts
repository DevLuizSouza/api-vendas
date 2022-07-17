import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import ProductRepository from '../typeorm/repositories/ProductsRepository';

interface IRequest {
  id: string;
}

class DeleteProductService {
  public async execute({ id }: IRequest): Promise<void> {
    const productsRepository = getCustomRepository(ProductRepository);
    const product = await productsRepository.findOne(id); //findOne método do typeORM que retorna um produto
    if (!product) {
      throw new AppError('Product not found');
    }
    await productsRepository.remove(product);
    //remove método do typeORM que remove um produto
  }
}

export default DeleteProductService;
