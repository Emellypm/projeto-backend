import prismaClient from "../../Prisma/PrismaClient";
import { hash } from "bcryptjs";

interface CadClientes {
    nome: string,
    senha: string,
    telefone: string
}
interface AltClientes {
    id: string,
    telefone: string
}

class ClientesServices {
    async cadastrarClientes({ nome, senha, telefone }: CadClientes) {
        const telExiste = await prismaClient.clientes.findFirst({
            where: {
                telefone: telefone
            }
        })

        if (telExiste) {
            throw new Error("Telefone já Cadastrado")
        }
        const senhaHash = await hash(senha, 8)
        await prismaClient.clientes.create({
            data: {
                nome: nome,
                senha: senhaHash,
                telefone: telefone
            }
        })
        return ({ dados: "Dados Salvos Com Sucesso" })
    }
    
    async visualizarDadosGeral() {
        const resposta = await prismaClient.clientes.findMany({
            select: {
                id: true,
                nome: true,
                telefone: true
            }
        })
        return resposta
    }
    async visualizarClienteUnico(id: string) {
        const resposta = await prismaClient.clientes.findFirst({
            where: {
                id: id
            },
            select: {
                id: true,
                nome: true,
                telefone: true
            }
        })
        return resposta
    }
    async alterarClientes({ id, telefone }: AltClientes) {
        const idExiste = await prismaClient.clientes.findFirst({
            where: {
                id: id
            }
        })
        if (!idExiste) {
            throw new Error("Registro não Encontrado")
        }
        await prismaClient.clientes.update({
            where: {
                id: id
            },
            data: {
                telefone: telefone
            }
        })
        return ({ dados: "Dados Alterados Com Sucesso" })
    }
    async apagarClientes(id: string) {
        const idExiste = await prismaClient.clientes.findFirst({
            where: {
                id: id
            }
        })
        if (!idExiste) {
            throw new Error("Registro não Encontrado")
        }
        await prismaClient.clientes.delete({
            where: {
                id: id
            }
        })
        return ({ dados: "Registro Apagado com Sucesso" })
    }
}
export { ClientesServices }