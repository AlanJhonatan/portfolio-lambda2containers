import { randomUUID } from "node:crypto"

export class Product {
    public id: string
    private name: string
    
    constructor(name: string) {
        this.id = randomUUID()
        this.name = this.CreateName(name)
    }

    private CreateName(name: string) {
        if(!name) {
            throw new Error('Product name cannot be empty !')
        }

        return name
    }
}
