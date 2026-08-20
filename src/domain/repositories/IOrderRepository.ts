import { Order } from '../entities/Order.js'

export interface IOrderRepository {
	createOrder(order: Order): void
	findAllOrders(userId: string): Array<Order>
	findOneOrder(id: string): Order | null
	updateOrder(order: Order): void
}
