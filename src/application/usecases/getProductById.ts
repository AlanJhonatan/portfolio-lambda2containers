import { Product } from '../../domain/entities/Product.js'
import { IProductRepository } from '../../domain/repositories/IProductRepository.js'

export class GetProductByIdUseCase {
    private productRepository: IProductRepository
    
    constructor(productRepository: IProductRepository) {
        this.productRepository = productRepository
    }

    execute(id: string): Product | null {
        return this.productRepository.getProductById(id) || null
    }
}