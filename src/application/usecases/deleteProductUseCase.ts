import { IProductRepository } from '../../domain/repositories/IProductRepository.js'

export class DeleteProductUseCase {
	constructor(private readonly productRepository: IProductRepository) {}

	async execute(id: string): Promise<void> {
		const product = this.productRepository.getProductById(id)

		if (!product) throw new Error('Product not found')

		this.productRepository.deleteProduct(id)
	}
}
