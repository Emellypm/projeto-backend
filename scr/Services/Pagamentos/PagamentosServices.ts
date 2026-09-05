import prismaClient from "../../Prisma/PrismaClient"

interface CadPagamentos {
    pedido_id: string,
    metodo: "PIX" | "CARTAO" | "DINHEIRO",
    valor: number
}

interface AltPagamentos {
    id: string,
    status: "PENDENTE" | "APROVADO" | "RECUSADO" | "CANCELADO"
}

class PagamentosServices {

    async cadastrarPagamentos({
        pedido_id,
        metodo,
        valor
    }: CadPagamentos) {

        const pedidoExiste = await prismaClient.pedidos.findFirst({
            where: {
                id: pedido_id
            }
        })

        if (!pedidoExiste) {
            throw new Error("Pedido não Encontrado")
        }

        const pagamentoExiste = await prismaClient.pagamentos.findFirst({
            where: {
                pedido_id: pedido_id
            }
        })

        if (pagamentoExiste) {
            throw new Error("Esse Pedido já possui um Pagamento")
        }

        await prismaClient.pagamentos.create({
            data: {
                pedido_id: pedido_id,
                metodo: metodo,
                valor: valor
            }
        })

        return ({ dados: "Pagamento Cadastrado Com Sucesso" })
    }


    async visualizarDadosGeral() {

        const resposta = await prismaClient.pagamentos.findMany({
            select: {
                id: true,
                pedido_id: true,
                metodo: true,
                status: true,
                valor: true,
                pago_em: true
            }
        })

        return resposta
    }


    async visualizarPagamentoUnico(id: string) {

        const resposta = await prismaClient.pagamentos.findFirst({
            where: {
                id: id
            },
            select: {
                id: true,
                pedido_id: true,
                metodo: true,
                status: true,
                valor: true,
                pago_em: true
            }
        })

        return resposta
    }


    async alterarPagamentos({
        id,
        status
    }: AltPagamentos) {

        const idExiste = await prismaClient.pagamentos.findFirst({
            where: {
                id: id
            }
        })

        if (!idExiste) {
            throw new Error("Registro não Encontrado")
        }

        await prismaClient.pagamentos.update({
            where: {
                id: id
            },
            data: {
                status: status,
                pago_em: status === "APROVADO" ? new Date() : null
            }
        })

        return ({ dados: "Pagamento Alterado Com Sucesso" })
    }


    async apagarPagamentos(id: string) {

        const idExiste = await prismaClient.pagamentos.findFirst({
            where: {
                id: id
            }
        })

        if (!idExiste) {
            throw new Error("Registro não Encontrado")
        }

        await prismaClient.pagamentos.delete({
            where: {
                id: id
            }
        })

        return ({ dados: "Pagamento Apagado com Sucesso" })
    }

}

export { PagamentosServices }