import { FastifyReply, FastifyRequest } from 'fastify'
import { CancelOrderUseCase } from '../../application/usecases/cancelOrderUseCase.js'
import { CreateOrderUseCase } from '../../application/usecases/createOrderUseCase.js'
import { FindAllOrdersUseCase } from '../../application/usecases/findAllOrdersUseCase.js'
import { FindOneOrderUseCase } from '../../application/usecases/findOneOrderUseCase.js'
import { OrderProps } from '../../domain/entities/Order.js'

export class OrdersController {
	constructor(
		private createOrderUseCase: CreateOrderUseCase,
		private findAllOrdersUseCase: FindAllOrdersUseCase,
		private findOneOrderUseCase: FindOneOrderUseCase,
		private cancelOrderUseCase: CancelOrderUseCase,
	) {}

	async createOrder(request: FastifyRequest, reply: FastifyReply) {
		try {
			const body = request.body as OrderProps
			const order = await this.createOrderUseCase.execute(body)
			return reply.status(201).send(order)
		} catch (error: unknown) {
			if (error instanceof Error) {
				return reply.status(400).send({ message: error.message })
			}

			return reply.status(500).send({ message: 'Internal error' })
		}
	}

	async findAllOrders(request: FastifyRequest, reply: FastifyReply) {
		try {
			const { userId } = request.params as { userId: string }
			const orders = await this.findAllOrdersUseCase.execute(userId)
			return reply.status(200).send(orders)
		} catch (error: unknown) {
			if (error instanceof Error) {
				return reply.status(400).send({ message: error.message })
			}

			return reply.status(500).send({ message: 'Internal error' })
		}
	}

	async findOneOrder(request: FastifyRequest, reply: FastifyReply) {
		try {
			const { id } = request.params as { id: string }
			const order = await this.findOneOrderUseCase.execute(id)
			if (!order) {
				return reply.status(404).send({ message: 'Order not found' })
			}
			return reply.status(200).send(order)
		} catch (error: unknown) {
			if (error instanceof Error) {
				return reply.status(400).send({ message: error.message })
			}

			return reply.status(500).send({ message: 'Internal error' })
		}
	}

	async cancelOrder(request: FastifyRequest, reply: FastifyReply) {
		try {
			const { id } = request.params as { id: string }
			await this.cancelOrderUseCase.execute(id)
			return reply.status(204).send()
		} catch (error: unknown) {
			if (!(error instanceof Error)) {
				return reply.status(500).send({ message: 'Internal error' })
			}

			if (error.message === 'Order not found') {
				return reply.status(404).send({ message: error.message })
			}

			return reply.status(404).send({ message: error.message })
		}
	}
}
