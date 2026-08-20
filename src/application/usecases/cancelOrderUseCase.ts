import { IOrderRepository } from '../../domain/repositories/IOrderRepository.js'

export class CancelOrderUseCase {
	constructor(private orderRepository: IOrderRepository) {}

	async execute(id: string): Promise<void> {
		const order = this.orderRepository.findOneOrder(id)
		if (!order) {
			throw new Error('Order not found')
		}

		order.cancel()
		this.orderRepository.updateOrder(order)
	}
}
