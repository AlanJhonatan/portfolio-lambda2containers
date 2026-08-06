import { Product } from '../../domain/entities/Product.js'
import { IProductRepository } from '../../domain/repositories/IProductRepository.js'

export class ListProductsUseCase {
    private productRepository: IProductRepository
    
    constructor(productRepository: IProductRepository) {
        this.productRepository = productRepository
    }

    execute(): Array<Product> {
        const products = this.productRepository.listProducts() || []

        return products
    }
}