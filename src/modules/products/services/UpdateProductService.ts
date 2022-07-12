import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import ProductRepository from '../typeorm/repositories/ProductsRepository';

interface IRequest {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

class UpdateProductService {
  public async execute({
    id,
    name,
    price,
    quantity,
  }: IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository);
    const product = await productsRepository.findOne(id); //findOne método do typeORM que retorna um produto
    if (!product) {
      throw new Error('Product not found');
    }

    const productExists = await productsRepository.findByName(name);

    if (productExists && name !== product.name) {
      //se o produto existir e o nome for diferente do nome do produto
      throw new AppError('There is already one product with this name');
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await productsRepository.save(product); //save método do typeORM que salva um produto

    return product;
  }
}

export default UpdateProductService;
