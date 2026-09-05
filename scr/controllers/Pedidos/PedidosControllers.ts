import { Request, Response } from "express"

import { PedidosServices } from "../../Services/Pedidos/PedidosServices"

class PedidosControllers {

    async cadastrarPedidos(req: Request, res: Response) {

        const {
            cliente_id,
            valor_subtotal,
            valor_entrega,
            valor_total,
            observacao
        } = req.body

        const enviarDadosServices = new PedidosServices()

        const resposta = await enviarDadosServices.cadastrarPedidos({
            cliente_id,
            valor_subtotal,
            valor_entrega,
            valor_total,
            observacao
        })

        return res.json(resposta)
    }

    async visualizarDadosPedidos(req: Request, res: Response) {

        const enviarDados = new PedidosServices()

        const resposta = await enviarDados.visualizarDadosGeral()

        return res.json(resposta)
    }

    async visualizarPedidoUnico(req: Request, res: Response) {

        const { id } = req.body

        const enviarDados = new PedidosServices()

        const resposta = await enviarDados.visualizarPedidoUnico(id)

        return res.json(resposta)
    }

    async alterarPedidos(req: Request, res: Response) {

        const {
            id,
            status,
            observacao
        } = req.body

        const enviarDados = new PedidosServices()

        const resposta = await enviarDados.alterarPedidos({
            id,
            status,
            observacao
        })

        return res.json(resposta)
    }

    async apagarPedidos(req: Request, res: Response) {

        const { id } = req.body

        const enviarDados = new PedidosServices()

        const resposta = await enviarDados.apagarPedidos(id)

        return res.json(resposta)
    }

}

export { PedidosControllers }