import { Product } from '../../../domain/entities/Product.js'
import { IProductRepository } from '../../../domain/repositories/IProductRepository.js'

export class ProductRepositoryInMemo implements IProductRepository {
	private products: Product[]

	constructor(products: Product[]) {
		this.products = products
	}

	listProducts(): Array<Product> {
		return this.products
	}

	getProductById(id: string): Product | null {
		return this.products.find((product) => product.id === id) || null
	}

	createProduct(product: Product): void {
		this.products.push(product)
	}

	deleteProduct(id: string): void {
		this.products = this.products.filter((product) => product.id !== id)
	}
}
