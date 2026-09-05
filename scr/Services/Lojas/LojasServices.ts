import prismaClient from "../../Prisma/PrismaClient"

interface CadLojas {
    nome: string,
    descricao: string,
    telefone: string,
    endereco: string
}

interface AltLojas {
    id: string,
    nome: string,
    descricao: string,
    telefone: string,
    endereco: string
}

class LojasServices {

    async cadastrarLojas({
        nome,
        descricao,
        telefone,
        endereco
    }: CadLojas) {

        const nomeExiste = await prismaClient.lojas.findFirst({
            where: {
                nome: nome
            }
        })

        if (nomeExiste) {
            throw new Error("Loja já Cadastrada")
        }

        await prismaClient.lojas.create({
            data: {
                nome: nome,
                descricao: descricao,
                telefone: telefone,
                endereco: endereco
            }
        })

        return ({ dados: "Dados Salvos Com Sucesso" })
    }


    async visualizarDadosGeral() {

        const resposta = await prismaClient.lojas.findMany({
            select: {
                id: true,
                nome: true,
                descricao: true,
                telefone: true,
                endereco: true
            }
        })

        return resposta
    }


    async visualizarLojaUnica(id: string) {

        const resposta = await prismaClient.lojas.findFirst({
            where: {
                id: id
            },
            select: {
                id: true,
                nome: true,
                descricao: true,
                telefone: true,
                endereco: true
            }
        })

        return resposta
    }


    async alterarLojas({
        id,
        nome,
        descricao,
        telefone,
        endereco
    }: AltLojas) {

        const idExiste = await prismaClient.lojas.findFirst({
            where: {
                id: id
            }
        })

        if (!idExiste) {
            throw new Error("Registro não Encontrado")
        }

        await prismaClient.lojas.update({
            where: {
                id: id
            },
            data: {
                nome: nome,
                descricao: descricao,
                telefone: telefone,
                endereco: endereco
            }
        })

        return ({ dados: "Dados Alterados Com Sucesso" })
    }


    async apagarLojas(id: string) {

        const idExiste = await prismaClient.lojas.findFirst({
            where: {
                id: id
            }
        })

        if (!idExiste) {
            throw new Error("Registro não Encontrado")
        }

        await prismaClient.lojas.delete({
            where: {
                id: id
            }
        })

        return ({ dados: "Registro Apagado com Sucesso" })
    }

}

export { LojasServices }