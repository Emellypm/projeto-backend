import { Request, Response } from "express";
import { ClientesServices } from "../../Services/Clientes/ClientesServices";

class ClientesControllers {
    async cadastrarClientes(req: Request, res: Response) {
        const { nome, senha, telefone, cep, rua, numero, complemento, bairro, cidade, estado } = req.body
        const enviarDadosServices = new ClientesServices()
        const resposta = await enviarDadosServices.cadastrarClientes({
            nome,
            senha,
            telefone,
            cep,
            rua,
            numero,
            complemento,
            bairro,
            cidade,
            estado
        })
        return res.json(resposta)
    }
    async visualizarDadosGeralCli(req: Request, res: Response) {
        const enviarDados = new ClientesServices()
        const resposta = await enviarDados.visualizarDadosGeral()
        return res.json(resposta)
    }
    async visualizarClienteUnico(req: Request, res: Response) {
        const { id } = req.body
        const enviarDados = new ClientesServices()
        const resposta = await enviarDados.visualizarClienteUnico(id)
        return res.json(resposta)
    }
    async alterarClientes(req: Request, res: Response) {
        const { id, telefone, cep, rua, numero, complemento, bairro, cidade, estado } = req.body
        const enviarDados = new ClientesServices()
            const resposta = await enviarDados.alterarClientes({
                id,
                telefone,
                cep,
                rua,
                numero,
                complemento,
                bairro,
                cidade,
                estado
            })
            return res.json(resposta)
    }
    async apagarClientes(req: Request, res: Response) {
        const { id } = req.body
        const enviarDados = new ClientesServices()
        const resposta = await enviarDados.apagarClientes(id)
        return res.json(resposta)
    }

}
export { ClientesControllers }