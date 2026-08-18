import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { productsController } from '../composition-root.js'

export async function productRoutes(server: FastifyInstance) {
	server.get(
		'/products',
		async (req: FastifyRequest, reply: FastifyReply) => {
			return productsController.listProducts(req, reply)
		},
	)

	server.get(
		'/products/:id',
		async (req: FastifyRequest, reply: FastifyReply) => {
			return productsController.getProductById(req, reply)
		},
	)

	server.post(
		'/products',
		async (req: FastifyRequest, reply: FastifyReply) => {
			return productsController.createProduct(req, reply)
		},
	)

	server.delete(
		'/products/:id',
		async (req: FastifyRequest, reply: FastifyReply) => {
			return productsController.deleteProduct(req, reply)
		},
	)
}
