import { randomUUID } from 'node:crypto'
import { OrderItem, OrderItemProps } from './OrderItem.js'

export enum StatusType {
	PENDING = 'pending',
	PAID = 'paid',
	FULFILLED = 'fulfilled',
	CANCELLED = 'cancelled',
}

export type OrderProps = {
	userId: string
	items: OrderItemProps[]
}

export class Order {
	public id: string
	public userId: string
	public status: StatusType
	public totalInCents: number
	public items: OrderItem[]

	constructor(props: OrderProps) {
		this.id = randomUUID()
		this.userId = this.validateUserId(props.userId)
		this.items = this.validateItems(props.items)
		this.status = StatusType.PENDING
		this.totalInCents = this.calculateTotal(this.items)
	}

	private validateUserId(userId: string) {
		if (!userId || userId.trim() === '') {
			throw new Error('User ID cannot be empty!')
		}
		return userId
	}

	private validateItems(itemsProps: OrderItemProps[]) {
		if (!itemsProps || itemsProps.length === 0) {
			throw new Error('An Order must have at least one OrderItem!')
		}
		return itemsProps.map((item) => new OrderItem(item))
	}

	private calculateTotal(items: OrderItem[]) {
		return items.reduce((total, item) => {
			return total + item.priceInCentsAtPurchase * item.quantity
		}, 0)
	}

	public pay() {
		this.status = StatusType.PAID
	}

	public cancel() {
		this.status = StatusType.CANCELLED
	}
}
