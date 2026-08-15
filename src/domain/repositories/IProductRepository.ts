import { Product } from '../entities/Product.js'

export interface IProductRepository {
	listProducts(): Array<Product>
	getProductById(id: string): Product | null
}
