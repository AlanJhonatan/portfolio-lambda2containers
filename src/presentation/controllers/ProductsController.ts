import { FastifyReply, FastifyRequest } from "fastify";
import { GetProductByIdUseCase } from "../../application/usecases/getProductById.js";
import { ListProductsUseCase } from "../../application/usecases/listProductsUseCase.js";

export class ProductsController {
    private listProductUseCase: ListProductsUseCase
    private getProductByIdUseCase: GetProductByIdUseCase
    
    constructor(
        listProductUseCase: ListProductsUseCase,
        getProductByIdUseCase: GetProductByIdUseCase,
    ) {
        this.listProductUseCase = listProductUseCase
        this.getProductByIdUseCase = getProductByIdUseCase
    }
    
    listProducts(req: FastifyRequest, reply: FastifyReply) {
        const products = this.listProductUseCase.execute()

        return reply.status(200).send(products)
    }

    getProductById(req: FastifyRequest, reply: FastifyReply) {
        const { id } = req.params as { id: string}
        
        const product = this.getProductByIdUseCase.execute(id)

        return reply.status(200).send({ data: product })
    }
}