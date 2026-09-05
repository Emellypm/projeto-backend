import { Request, Response } from "express"

import { ItensPedidoServices } from "../../Services/ItensPedido/ItensPedidoServices"

class ItensPedidoControllers {

    async cadastrarItensPedido(req: Request, res: Response) {

        const {
            pedido_id,
            produto_id,
            quantidade,
            preco_unitario,
            subtotal
        } = req.body

        const enviarDadosServices = new ItensPedidoServices()

        const resposta = await enviarDadosServices.cadastrarItensPedido({
            pedido_id,
            produto_id,
            quantidade,
            preco_unitario,
            subtotal
        })

        return res.json(resposta)
    }

    async visualizarDadosIP(req: Request, res: Response) {

        const enviarDados = new ItensPedidoServices()

        const resposta = await enviarDados.visualizarDadosGeral()

        return res.json(resposta)
    }

    async visualizarItemUnico(req: Request, res: Response) {

        const { id } = req.body

        const enviarDados = new ItensPedidoServices()

        const resposta = await enviarDados.visualizarItemUnico(id)

        return res.json(resposta)
    }

    async alterarItensPedido(req: Request, res: Response) {

        const {
            id,
            quantidade,
            preco_unitario,
            subtotal
        } = req.body

        const enviarDados = new ItensPedidoServices()

        const resposta = await enviarDados.alterarItensPedido({
            id,
            quantidade,
            preco_unitario,
            subtotal
        })

        return res.json(resposta)
    }

    async apagarItensPedido(req: Request, res: Response) {

        const { id } = req.body

        const enviarDados = new ItensPedidoServices()

        const resposta = await enviarDados.apagarItensPedido(id)

        return res.json(resposta)
    }

}

export { ItensPedidoControllers }