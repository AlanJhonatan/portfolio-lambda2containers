import { Product, ProductProps } from '../../domain/entities/Product.js'
import { IProductRepository } from '../../domain/repositories/IProductRepository.js'

export class CreateProductUseCase {
	constructor(private readonly productRepository: IProductRepository) {}

	async execute({
		name,
		priceInCents,
		currency,
		stockQuantity,
	}: ProductProps): Promise<Product> {
		const product = new Product({
			name,
			priceInCents,
			currency,
			stockQuantity,
		})

		this.productRepository.createProduct(product)
		return product
	}
}
