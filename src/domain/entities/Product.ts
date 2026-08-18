import { randomUUID } from 'node:crypto'

export type ProductProps = {
	name: string
	priceInCents: number
	currency: string
	stockQuantity: number
}

export class Product {
	public id: string
	private name: string
	private priceInCents: number
	private currency: string
	private stockQuantity: number

	constructor({ name, priceInCents, currency, stockQuantity }: ProductProps) {
		this.id = randomUUID()
		this.name = this.validateName(name)
		this.priceInCents = this.validatePriceInCents(priceInCents)
		this.currency = this.validateCurrency(currency)
		this.stockQuantity = this.validateStockQuantity(stockQuantity)
	}

	private validateName(name: string) {
		if (!name || name.trim() === '') {
			throw new Error('Product name cannot be empty !')
		}

		return name
	}

	private validatePriceInCents(priceInCents: number) {
		if (priceInCents <= 0) {
			throw new Error('Price must be greater than 0 !')
		}
		return priceInCents
	}

	private validateCurrency(currency: string) {
		if (!currency || currency.trim() === '') {
			throw new Error('Currency must be valid !')
		}
		return currency
	}

	private validateStockQuantity(stockQuantity: number) {
		if (stockQuantity < 0) {
			throw new Error(
				'Stock quantity must be greater than or equal to 0 !',
			)
		}
		return stockQuantity
	}
}
