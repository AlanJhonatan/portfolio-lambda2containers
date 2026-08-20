import { Order } from '../../domain/entities/Order.js'
import { IOrderRepository } from '../../domain/repositories/IOrderRepository.js'

export class FindAllOrdersUseCase {
	constructor(private orderRepository: IOrderRepository) {}

	async execute(userId: string): Promise<Array<Order>> {
		return this.orderRepository.findAllOrders(userId)
	}
}
