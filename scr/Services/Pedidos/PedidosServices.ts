import prismaClient from "../../Prisma/PrismaClient"

interface CadPedidos {
    cliente_id: string,
    cep: string,
    rua: string,
    numero: string,
    complemento: string,
    bairro: string,
    cidade: string,
    estado: string,
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
        cep,
        rua,
        numero,
        complemento,
        bairro,
        cidade,
        estado,
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
                cep: cep,
                rua: rua,
                numero: numero,
                complemento: complemento,
                bairro: bairro,
                cidade: cidade,
                estado: estado,
                valor_subtotal: valor_subtotal,
                valor_entrega: valor_entrega,
                valor_total: valor_total,
                observacao: observacao
            }
        })
        return ({ dados: "Pedido Cadastrado Com Sucesso" })
    }
    async visualizarDadosGeral(cliente_id?: string) {
        const resposta = await prismaClient.pedidos.findMany({
            where: cliente_id ? {
                cliente_id: cliente_id
            } : undefined,
            select: {
                id: true,
                cliente_id: true,
                cep: true,
                rua: true,
                numero: true,
                complemento: true,
                bairro: true,
                cidade: true,
                estado: true,
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
    async visualizarPedidoUnico(id: string, cliente_id?: string) {
    const resposta = await prismaClient.pedidos.findFirst({
        where: {
            id: id,
            ...(cliente_id ? { cliente_id: cliente_id } : {})
        },
        select: {
            id: true,
            cliente_id: true,
            cep: true,
            rua: true,
            numero: true,
            complemento: true,
            bairro: true,
            cidade: true,
            estado: true,
            status: true,
            valor_subtotal: true,
            valor_entrega: true,
            valor_total: true,
            observacao: true,
            data_criacao: true,
            cliente: {
                select: {
                    nome: true,
                    telefone: true
                }
            },
            itens: {
                select: {
                    quantidade: true,
                    preco_unitario: true,
                    subtotal: true,
                    produto: {
                        select: {
                            nome: true
                        }
                    }
                }
            },
            pagamento: {
                select: {
                    metodo: true,
                    status: true,
                    valor: true
                }
            }
        }
    })
    return resposta
}
    async alterarPedidos({ id, status, observacao }: AltPedidos) {
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
        return ({ dados: "Pedido Apagado Com Sucesso" })
    }
}
export { PedidosServices }