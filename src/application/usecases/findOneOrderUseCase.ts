import { Order } from '../../domain/entities/Order.js'
import { IOrderRepository } from '../../domain/repositories/IOrderRepository.js'

export class FindOneOrderUseCase {
	constructor(private orderRepository: IOrderRepository) {}

	async execute(id: string): Promise<Order | null> {
		return this.orderRepository.findOneOrder(id)
	}
}
