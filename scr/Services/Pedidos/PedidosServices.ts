import prismaClient from "../../Prisma/PrismaClient"

interface CadPedidos {
    cliente_id: string
    cep: string
    rua: string
    numero: string
    complemento: string
    bairro: string
    cidade: string
    estado: string
    valor_subtotal: number
    valor_entrega: number
    valor_total: number
    observacao: string
}

interface AltPedidos {
    id: string
    status: "PENDENTE" | "CONFIRMADO" | "EM_PREPARACAO" | "A_CAMINHO" | "ENTREGUE" | "CANCELADO"
    observacao: string
}

interface FinalizarPedido {
    cliente_id: string
    cep: string
    rua: string
    numero: string
    complemento?: string
    bairro: string
    cidade: string
    estado: string
    valor_entrega: number
    observacao?: string
    metodo_pagamento: "PIX" | "CARTAO" | "DINHEIRO"
    itens: {
        produto_id: string
        quantidade: number
    }[]
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
            where: { id: cliente_id }
        })

        if (!clienteExiste) {
            throw new Error("Cliente não Encontrado")
        }

        await prismaClient.pedidos.create({
            data: {
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
            }
        })

        return { dados: "Pedido Cadastrado Com Sucesso" }
    }

    async visualizarDadosGeral(cliente_id?: string) {
        const resposta = await prismaClient.pedidos.findMany({
            where: cliente_id ? { cliente_id } : undefined,
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
            },
            orderBy: {
                data_criacao: "desc"
            }
        })

        return resposta
    }

    async visualizarPedidoUnico(id: string, cliente_id?: string) {
        const resposta = await prismaClient.pedidos.findFirst({
            where: {
                id,
                ...(cliente_id ? { cliente_id } : {})
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

    async gerarWhatsApp(id: string, cliente_id?: string) {
        const pedido = await prismaClient.pedidos.findFirst({
            where: {
                id,
                ...(cliente_id ? { cliente_id } : {})
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
                valor_subtotal: true,
                valor_entrega: true,
                valor_total: true,
                observacao: true,
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
                        valor: true
                    }
                }
            }
        })

        if (!pedido) {
            throw new Error("Pedido não Encontrado")
        }

        let mensagem = `🍰 NOVO PEDIDO - DINO'S DOCES\n\n`
        mensagem += `Cliente: ${pedido.cliente.nome}\n`
        mensagem += `Telefone: ${pedido.cliente.telefone}\n\n`
        mensagem += `🛍️ PEDIDO\n`

        pedido.itens.forEach((item) => {
            mensagem += `${item.quantidade}x ${item.produto.nome} - R$ ${Number(item.subtotal).toFixed(2)}\n`
        })

        mensagem += `\n💰 Subtotal: R$ ${Number(pedido.valor_subtotal).toFixed(2)}\n`
        mensagem += `🚚 Entrega: R$ ${Number(pedido.valor_entrega).toFixed(2)}\n`
        mensagem += `💵 Total: R$ ${Number(pedido.valor_total).toFixed(2)}\n\n`
        mensagem += `📍 ENTREGA\n`
        mensagem += `${pedido.rua}, ${pedido.numero}\n`

        if (pedido.complemento) {
            mensagem += `${pedido.complemento}\n`
        }

        mensagem += `${pedido.bairro} - ${pedido.cidade}/${pedido.estado}\n`
        mensagem += `CEP: ${pedido.cep}\n`

        if (pedido.observacao) {
            mensagem += `\n📝 Observação:\n`
            mensagem += `${pedido.observacao}\n`
        }

        if (pedido.pagamento) {
            mensagem += `\n💳 Pagamento: ${pedido.pagamento.metodo}\n`
        }

        const numeroWhatsApp = "5514991446325"
        const mensagemCodificada = encodeURIComponent(mensagem)
        const linkWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensagemCodificada}`

        return {
            linkWhatsApp,
            mensagem
        }
    }

    async finalizarPedido({
        cliente_id,
        cep,
        rua,
        numero,
        complemento,
        bairro,
        cidade,
        estado,
        valor_entrega,
        observacao,
        metodo_pagamento,
        itens
    }: FinalizarPedido) {
        const clienteExiste = await prismaClient.clientes.findFirst({
            where: { id: cliente_id }
        })

        if (!clienteExiste) {
            throw new Error("Cliente não Encontrado")
        }

        if (!itens || itens.length === 0) {
            throw new Error("O pedido precisa ter pelo menos um item")
        }

        if (valor_entrega < 0) {
            throw new Error("O valor da entrega não pode ser negativo")
        }

        const produtos = []

        for (const item of itens) {
            if (item.quantidade <= 0) {
                throw new Error("A quantidade deve ser maior que zero")
            }

            const produto = await prismaClient.produtos.findFirst({
                where: {
                    id: item.produto_id,
                    status: "ATIVO"
                }
            })

            if (!produto) {
                throw new Error(`Produto não encontrado: ${item.produto_id}`)
            }

            if (item.quantidade > produto.estoque) {
                throw new Error(`Estoque insuficiente para o produto: ${produto.nome}`)
            }

            produtos.push({
                produto_id: produto.id,
                quantidade: item.quantidade,
                preco_unitario: Number(produto.preco),
                subtotal: Number(produto.preco) * item.quantidade
            })
        }

        const valor_subtotal = produtos.reduce(
            (total, item) => total + item.subtotal,
            0
        )

        const valor_total = valor_subtotal + Number(valor_entrega)

        const resultado = await prismaClient.$transaction(async (tx) => {
            const pedido = await tx.pedidos.create({
                data: {
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
                }
            })

            for (const item of produtos) {
                await tx.itens_pedido.create({
                    data: {
                        pedido_id: pedido.id,
                        produto_id: item.produto_id,
                        quantidade: item.quantidade,
                        preco_unitario: item.preco_unitario,
                        subtotal: item.subtotal
                    }
                })

                await tx.produtos.update({
                    where: {
                        id: item.produto_id
                    },
                    data: {
                        estoque: {
                            decrement: item.quantidade
                        }
                    }
                })
            }

            await tx.pagamentos.create({
                data: {
                    pedido_id: pedido.id,
                    metodo: metodo_pagamento,
                    valor: valor_total
                }
            })

            return pedido
        })

        const whatsapp = await this.gerarWhatsApp(
            resultado.id,
            cliente_id
        )

        return {
            dados: "Pedido Finalizado Com Sucesso",
            pedido_id: resultado.id,
            linkWhatsApp: whatsapp.linkWhatsApp,
            mensagem: whatsapp.mensagem
        }
    }

    async alterarPedidos({ id, status, observacao }: AltPedidos) {
        const idExiste = await prismaClient.pedidos.findFirst({
            where: { id }
        })

        if (!idExiste) {
            throw new Error("Registro não Encontrado")
        }

        await prismaClient.pedidos.update({
            where: { id },
            data: {
                status,
                observacao
            }
        })

        return { dados: "Pedido Alterado Com Sucesso" }
    }

    async apagarPedidos(id: string) {
        const idExiste = await prismaClient.pedidos.findFirst({
            where: { id }
        })

        if (!idExiste) {
            throw new Error("Registro não Encontrado")
        }

        await prismaClient.pedidos.delete({
            where: { id }
        })

        return { dados: "Pedido Apagado com Sucesso" }
    }
}


export { PedidosServices }