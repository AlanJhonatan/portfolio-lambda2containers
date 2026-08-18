import { FastifyReply, FastifyRequest } from 'fastify'
import { CreateProductUseCase } from '../../application/usecases/createProductUseCase.js'
import { DeleteProductUseCase } from '../../application/usecases/deleteProductUseCase.js'
import { GetProductByIdUseCase } from '../../application/usecases/getProductById.js'
import { ListProductsUseCase } from '../../application/usecases/listProductsUseCase.js'

export class ProductsController {
	constructor(
		private listProductUseCase: ListProductsUseCase,
		private getProductByIdUseCase: GetProductByIdUseCase,
		private createProductUseCase: CreateProductUseCase,
		private deleteProductUseCase: DeleteProductUseCase,
	) {}

	listProducts(req: FastifyRequest, reply: FastifyReply) {
		const products = this.listProductUseCase.execute()
		return reply.status(200).send(products)
	}

	getProductById(req: FastifyRequest, reply: FastifyReply) {
		const { id } = req.params as { id: string }
		const product = this.getProductByIdUseCase.execute(id)
		return reply.status(200).send({ data: product })
	}

	async createProduct(req: FastifyRequest, reply: FastifyReply) {
		const { name, priceInCents, currency, stockQuantity } = req.body as {
			name: string
			priceInCents: number
			currency: string
			stockQuantity: number
		}

		try {
			const product = await this.createProductUseCase.execute({
				name,
				priceInCents,
				currency,
				stockQuantity,
			})
			return reply.status(201).send({ data: product })
		} catch (error: unknown) {
			if (error instanceof Error) {
				return reply.status(400).send({ error: error.message })
			}

			return reply.status(500).send({ error: 'Internal server error' })
		}
	}

	async deleteProduct(req: FastifyRequest, reply: FastifyReply) {
		const { id } = req.params as { id: string }

		try {
			await this.deleteProductUseCase.execute(id)
			return reply.status(204).send()
		} catch (error: unknown) {
			if (error instanceof Error) {
				return reply.status(400).send({ error: error.message })
			}

			return reply.status(500).send({ error: 'Internal server error' })
		}
	}
}
