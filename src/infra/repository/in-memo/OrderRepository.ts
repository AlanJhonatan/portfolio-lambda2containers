import { Order } from '../../../domain/entities/Order.js'
import { IOrderRepository } from '../../../domain/repositories/IOrderRepository.js'

export class OrderRepositoryInMemo implements IOrderRepository {
	private orders: Order[]

	constructor(orders: Order[] = []) {
		this.orders = orders
	}

	createOrder(order: Order): void {
		this.orders.push(order)
	}

	findAllOrders(userId: string): Array<Order> {
		return this.orders.filter((order) => order.userId === userId)
	}

	findOneOrder(id: string): Order | null {
		return this.orders.find((order) => order.id === id) || null
	}

	updateOrder(order: Order): void {
		const index = this.orders.findIndex((o) => o.id === order.id)
		if (index !== -1) {
			this.orders[index] = order
		}
	}
}
