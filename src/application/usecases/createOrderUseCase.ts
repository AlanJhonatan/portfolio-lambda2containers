import { Order, OrderProps } from '../../domain/entities/Order.js'
import { IOrderRepository } from '../../domain/repositories/IOrderRepository.js'

export class CreateOrderUseCase {
	constructor(private orderRepository: IOrderRepository) {}

	async execute(props: OrderProps): Promise<Order> {
		const order = new Order(props)
		this.orderRepository.createOrder(order)
		return order
	}
}
