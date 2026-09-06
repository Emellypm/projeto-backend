import { Request, Response } from "express"

import { PagamentosServices } from "../../Services/Pagamentos/PagamentosServices"

class PagamentosControllers {

    async cadastrarPagamentos(req: Request, res: Response) {
        const {
            pedido_id,
            metodo
        } = req.body

        const enviarDadosServices = new PagamentosServices()

        const cliente_id = req.usuarioTipo === "CLIENTE"
            ? req.usuarioId
            : undefined

        const resposta = await enviarDadosServices.cadastrarPagamentos({
            pedido_id,
            metodo
        }, cliente_id)

        return res.json(resposta)
    }

    async visualizarDadosPagamentos(req: Request, res: Response) {
        const enviarDados = new PagamentosServices()

        const cliente_id = req.usuarioTipo === "CLIENTE"
            ? req.usuarioId
            : undefined

        const resposta = await enviarDados.visualizarDadosGeral(cliente_id)

        return res.json(resposta)
    }

    async visualizarPagamentoUnico(req: Request, res: Response) {
        const { id } = req.body

        const enviarDados = new PagamentosServices()

        const cliente_id = req.usuarioTipo === "CLIENTE"
            ? req.usuarioId
            : undefined

        const resposta = await enviarDados.visualizarPagamentoUnico(id, cliente_id)

        return res.json(resposta)
    }

    async alterarPagamentos(req: Request, res: Response) {
        const {
            id,
            status
        } = req.body

        const enviarDados = new PagamentosServices()

        const resposta = await enviarDados.alterarPagamentos({
            id,
            status
        })

        return res.json(resposta)
    }

    async apagarPagamentos(req: Request, res: Response) {
        const { id } = req.body

        const enviarDados = new PagamentosServices()

        const resposta = await enviarDados.apagarPagamentos(id)

        return res.json(resposta)
    }

}

export { PagamentosControllers }