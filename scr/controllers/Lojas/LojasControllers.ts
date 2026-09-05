import { Request, Response } from "express"

import { LojasServices } from "../../Services/Lojas/LojasServices"

class LojasControllers {

    async cadastrarLojas(req: Request, res: Response) {

        const { nome, descricao, telefone, endereco } = req.body

        const enviarDadosServices = new LojasServices()

        const resposta = await enviarDadosServices.cadastrarLojas({
            nome,
            descricao,
            telefone,
            endereco
        })

        return res.json(resposta)
    }

    async visualizarDadosGeralLojas(req: Request, res: Response) {

        const enviarDados = new LojasServices()

        const resposta = await enviarDados.visualizarDadosGeral()

        return res.json(resposta)
    }

    async visualizarLojaUnica(req: Request, res: Response) {

        const { id } = req.body

        const enviarDados = new LojasServices()

        const resposta = await enviarDados.visualizarLojaUnica(id)

        return res.json(resposta)
    }

    async alterarLojas(req: Request, res: Response) {

        const {
            id,
            nome,
            descricao,
            telefone,
            endereco
        } = req.body

        const enviarDados = new LojasServices()

        const resposta = await enviarDados.alterarLojas({
            id,
            nome,
            descricao,
            telefone,
            endereco
        })

        return res.json(resposta)
    }

    async apagarLojas(req: Request, res: Response) {

        const { id } = req.body

        const enviarDados = new LojasServices()

        const resposta = await enviarDados.apagarLojas(id)

        return res.json(resposta)
    }

}

export { LojasControllers }