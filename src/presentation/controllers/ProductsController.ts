import { FastifyReply, FastifyRequest } from "fastify";
import { ListProductsUseCase } from "../../application/usecases/listProductsUseCase.js";

export class ProductsController {
    private listProductUseCase: ListProductsUseCase
    
    constructor(listProductUseCase: ListProductsUseCase) {
        this.listProductUseCase = listProductUseCase
    }
    
    listProducts(req: FastifyRequest, reply: FastifyReply) {
        const products = this.listProductUseCase.execute()

        return reply.status(200).send(products)
    }
}