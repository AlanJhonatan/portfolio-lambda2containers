import { GetProductByIdUseCase } from "../application/usecases/getProductById.js"
import { ListProductsUseCase } from "../application/usecases/listProductsUseCase.js"
import { Product } from "../domain/entities/Product.js"
import { ProductRepositoryInMemo } from "../infra/repository/in-memo/ProductRepository.js"
import { ProductsController } from "../presentation/controllers/ProductsController.js"

const productRepository = new ProductRepositoryInMemo([
    new Product('produto 1'),
    new Product('produto 2'),
    new Product('produto 3'),
])

const listProductsUseCase = new ListProductsUseCase(productRepository)
const getProductByIdUseCase = new GetProductByIdUseCase(productRepository)

const productsController = new ProductsController(listProductsUseCase, getProductByIdUseCase)

export { productsController }
