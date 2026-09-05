import prismaClient from "../../Prisma/PrismaClient"

interface CadProdutos {
    loja_id: string,
    nome: string,
    descricao: string,
    preco: number,
    imagem: string,
    estoque: number
}

interface AltProdutos {
    id: string,
    loja_id: string,
    nome: string,
    descricao: string,
    preco: number,
    imagem: string,
    estoque: number,
    status: "ATIVO" | "INATIVO"
}

class ProdutosServices {

    async cadastrarProdutos({
        loja_id,
        nome,
        descricao,
        preco,
        imagem,
        estoque
    }: CadProdutos) {

        const lojaExiste = await prismaClient.lojas.findFirst({
            where: {
                id: loja_id
            }
        })

        if (!lojaExiste) {
            throw new Error("Loja não Encontrada")
        }

        await prismaClient.produtos.create({
            data: {
                loja_id: loja_id,
                nome: nome,
                descricao: descricao,
                preco: preco,
                imagem: imagem,
                estoque: estoque
            }
        })

        return ({ dados: "Dados Salvos Com Sucesso" })
    }


    async visualizarDadosGeral() {

        const resposta = await prismaClient.produtos.findMany({
            select: {
                id: true,
                loja_id: true,
                nome: true,
                descricao: true,
                preco: true,
                imagem: true,
                estoque: true,
                status: true
            }
        })

        return resposta
    }


    async visualizarProdutoUnico(id: string) {

        const resposta = await prismaClient.produtos.findFirst({
            where: {
                id: id
            },
            select: {
                id: true,
                loja_id: true,
                nome: true,
                descricao: true,
                preco: true,
                imagem: true,
                estoque: true,
                status: true
            }
        })

        return resposta
    }


    async alterarProdutos({
        id,
        loja_id,
        nome,
        descricao,
        preco,
        imagem,
        estoque,
        status
    }: AltProdutos) {

        const idExiste = await prismaClient.produtos.findFirst({
            where: {
                id: id
            }
        })

        if (!idExiste) {
            throw new Error("Registro não Encontrado")
        }

        await prismaClient.produtos.update({
            where: {
                id: id
            },
            data: {
                loja_id: loja_id,
                nome: nome,
                descricao: descricao,
                preco: preco,
                imagem: imagem,
                estoque: estoque,
                status: status
            }
        })

        return ({ dados: "Dados Alterados Com Sucesso" })
    }


    async apagarProdutos(id: string) {

        const idExiste = await prismaClient.produtos.findFirst({
            where: {
                id: id
            }
        })

        if (!idExiste) {
            throw new Error("Registro não Encontrado")
        }

        await prismaClient.produtos.delete({
            where: {
                id: id
            }
        })

        return ({ dados: "Registro Apagado com Sucesso" })
    }

}

export { ProdutosServices }