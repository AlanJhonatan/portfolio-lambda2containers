import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { productsController, ordersController } from '../composition-root.js'

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

export async function orderRoutes(server: FastifyInstance) {
	server.post('/orders', async (req: FastifyRequest, reply: FastifyReply) => {
		return ordersController.createOrder(req, reply)
	})

	server.get(
		'/orders/user/:userId',
		async (req: FastifyRequest, reply: FastifyReply) => {
			return ordersController.findAllOrders(req, reply)
		},
	)

	server.get(
		'/orders/:id',
		async (req: FastifyRequest, reply: FastifyReply) => {
			return ordersController.findOneOrder(req, reply)
		},
	)

	server.delete(
		'/orders/:id',
		async (req: FastifyRequest, reply: FastifyReply) => {
			return ordersController.cancelOrder(req, reply)
		},
	)
}
