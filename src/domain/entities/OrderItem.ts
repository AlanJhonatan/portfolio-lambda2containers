export type OrderItemProps = {
	productId: string
	quantity: number
	priceInCentsAtPurchase: number
}

export class OrderItem {
	public productId: string
	public quantity: number
	public priceInCentsAtPurchase: number

	constructor(props: OrderItemProps) {
		this.productId = this.validateProductId(props.productId)
		this.quantity = this.validateQuantity(props.quantity)
		this.priceInCentsAtPurchase = this.validatePriceInCentsAtPurchase(
			props.priceInCentsAtPurchase,
		)
	}

	private validateProductId(productId: string) {
		if (!productId || productId.trim() === '') {
			throw new Error('Product ID cannot be empty!')
		}
		return productId
	}

	private validateQuantity(quantity: number) {
		if (quantity <= 0) {
			throw new Error('Quantity must be greater than 0!')
		}
		return quantity
	}

	private validatePriceInCentsAtPurchase(priceInCents: number) {
		if (priceInCents <= 0) {
			throw new Error(
				'Price in cents at purchase must be greater than 0!',
			)
		}
		return priceInCents
	}
}
