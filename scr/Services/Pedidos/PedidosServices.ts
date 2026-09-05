import prismaClient from "../../Prisma/PrismaClient"

interface CadPedidos {
    cliente_id: string,
    valor_subtotal: number,
    valor_entrega: number,
    valor_total: number,
    observacao: string
}

interface AltPedidos {
    id: string,
    status: "PENDENTE" | "CONFIRMADO" | "EM_PREPARACAO" | "A_CAMINHO" | "ENTREGUE" | "CANCELADO",
    observacao: string
}

class PedidosServices {

    async cadastrarPedidos({
        cliente_id,
        valor_subtotal,
        valor_entrega,
        valor_total,
        observacao
    }: CadPedidos) {

        const clienteExiste = await prismaClient.clientes.findFirst({
            where: {
                id: cliente_id
            }
        })

        if (!clienteExiste) {
            throw new Error("Cliente não Encontrado")
        }

        await prismaClient.pedidos.create({
            data: {
                cliente_id: cliente_id,
                valor_subtotal: valor_subtotal,
                valor_entrega: valor_entrega,
                valor_total: valor_total,
                observacao: observacao
            }
        })

        return ({ dados: "Pedido Cadastrado Com Sucesso" })
    }


    async visualizarDadosGeral() {

        const resposta = await prismaClient.pedidos.findMany({
            select: {
                id: true,
                cliente_id: true,
                status: true,
                valor_subtotal: true,
                valor_entrega: true,
                valor_total: true,
                observacao: true,
                data_criacao: true
            }
        })

        return resposta
    }


    async visualizarPedidoUnico(id: string) {

        const resposta = await prismaClient.pedidos.findFirst({
            where: {
                id: id
            },
            select: {
                id: true,
                cliente_id: true,
                status: true,
                valor_subtotal: true,
                valor_entrega: true,
                valor_total: true,
                observacao: true,
                data_criacao: true
            }
        })

        return resposta
    }


    async alterarPedidos({
        id,
        status,
        observacao
    }: AltPedidos) {

        const idExiste = await prismaClient.pedidos.findFirst({
            where: {
                id: id
            }
        })

        if (!idExiste) {
            throw new Error("Registro não Encontrado")
        }

        await prismaClient.pedidos.update({
            where: {
                id: id
            },
            data: {
                status: status,
                observacao: observacao
            }
        })

        return ({ dados: "Pedido Alterado Com Sucesso" })
    }


    async apagarPedidos(id: string) {

        const idExiste = await prismaClient.pedidos.findFirst({
            where: {
                id: id
            }
        })

        if (!idExiste) {
            throw new Error("Registro não Encontrado")
        }

        await prismaClient.pedidos.delete({
            where: {
                id: id
            }
        })

        return ({ dados: "Pedido Apagado com Sucesso" })
    }

}

export { PedidosServices }