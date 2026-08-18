import { GetProductByIdUseCase } from '../application/usecases/getProductById.js'
import { ListProductsUseCase } from '../application/usecases/listProductsUseCase.js'
import { CreateProductUseCase } from '../application/usecases/createProductUseCase.js'
import { DeleteProductUseCase } from '../application/usecases/deleteProductUseCase.js'
import { Product } from '../domain/entities/Product.js'
import { ProductRepositoryInMemo } from '../infra/repository/in-memo/ProductRepository.js'
import { ProductsController } from '../presentation/controllers/ProductsController.js'

const productRepository = new ProductRepositoryInMemo([
	new Product({
		name: 'prod 1',
		priceInCents: 1000,
		currency: 'BRL',
		stockQuantity: 2,
	}),
])

const listProductsUseCase = new ListProductsUseCase(productRepository)
const getProductByIdUseCase = new GetProductByIdUseCase(productRepository)
const createProductUseCase = new CreateProductUseCase(productRepository)
const deleteProductUseCase = new DeleteProductUseCase(productRepository)

const productsController = new ProductsController(
	listProductsUseCase,
	getProductByIdUseCase,
	createProductUseCase,
	deleteProductUseCase,
)

export { productsController }
