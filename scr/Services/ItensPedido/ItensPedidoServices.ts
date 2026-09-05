import prismaClient from "../../Prisma/PrismaClient"

interface CadItensPedido {
    pedido_id: string,
    produto_id: string,
    quantidade: number,
    preco_unitario: number,
    subtotal: number
}

interface AltItensPedido {
    id: string,
    quantidade: number,
    preco_unitario: number,
    subtotal: number
}

class ItensPedidoServices {

    async cadastrarItensPedido({
        pedido_id,
        produto_id,
        quantidade,
        preco_unitario,
        subtotal
    }: CadItensPedido) {

        const pedidoExiste = await prismaClient.pedidos.findFirst({
            where: {
                id: pedido_id
            }
        })

        if (!pedidoExiste) {
            throw new Error("Pedido não Encontrado")
        }

        const produtoExiste = await prismaClient.produtos.findFirst({
            where: {
                id: produto_id
            }
        })

        if (!produtoExiste) {
            throw new Error("Produto não Encontrado")
        }

        await prismaClient.itens_pedido.create({
            data: {
                pedido_id: pedido_id,
                produto_id: produto_id,
                quantidade: quantidade,
                preco_unitario: preco_unitario,
                subtotal: subtotal
            }
        })

        return ({ dados: "Item Adicionado ao Pedido Com Sucesso" })
    }


    async visualizarDadosGeral() {

        const resposta = await prismaClient.itens_pedido.findMany({
            select: {
                id: true,
                pedido_id: true,
                produto_id: true,
                quantidade: true,
                preco_unitario: true,
                subtotal: true
            }
        })

        return resposta
    }


    async visualizarItemUnico(id: string) {

        const resposta = await prismaClient.itens_pedido.findFirst({
            where: {
                id: id
            },
            select: {
                id: true,
                pedido_id: true,
                produto_id: true,
                quantidade: true,
                preco_unitario: true,
                subtotal: true
            }
        })

        return resposta
    }


    async alterarItensPedido({
        id,
        quantidade,
        preco_unitario,
        subtotal
    }: AltItensPedido) {

        const idExiste = await prismaClient.itens_pedido.findFirst({
            where: {
                id: id
            }
        })

        if (!idExiste) {
            throw new Error("Registro não Encontrado")
        }

        await prismaClient.itens_pedido.update({
            where: {
                id: id
            },
            data: {
                quantidade: quantidade,
                preco_unitario: preco_unitario,
                subtotal: subtotal
            }
        })

        return ({ dados: "Item Alterado Com Sucesso" })
    }


    async apagarItensPedido(id: string) {

        const idExiste = await prismaClient.itens_pedido.findFirst({
            where: {
                id: id
            }
        })

        if (!idExiste) {
            throw new Error("Registro não Encontrado")
        }

        await prismaClient.itens_pedido.delete({
            where: {
                id: id
            }
        })

        return ({ dados: "Item Apagado com Sucesso" })
    }

}

export { ItensPedidoServices }