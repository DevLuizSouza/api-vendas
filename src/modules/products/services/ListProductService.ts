import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import ProductRepository from '../typeorm/repositories/ProductsRepository';

class ListProductService {
  public async execute(): Promise<Product[]> {
    const productsRepository = getCustomRepository(ProductRepository);
    const products = await productsRepository.find(); //find método do typeORM que retorna um array de produtos
    return products;
  }
}

export default ListProductService;
