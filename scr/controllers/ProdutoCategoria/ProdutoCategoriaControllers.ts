import { Request, Response } from "express"

import { ProdutoCategoriaServices } from "../../Services/ProdutoCategoria/ProdutoCategoriaServices"

class ProdutoCategoriaControllers {

    async cadastrarProdutoCategoria(req: Request, res: Response) {

        const { produto_id, categoria_id } = req.body

        const enviarDadosServices = new ProdutoCategoriaServices()

        const resposta = await enviarDadosServices.cadastrarProdutoCategoria({
            produto_id,
            categoria_id
        })

        return res.json(resposta)
    }

    async visualizarDados(req: Request, res: Response) {

        const enviarDados = new ProdutoCategoriaServices()

        const resposta = await enviarDados.visualizarDadosGeral()

        return res.json(resposta)
    }

    async apagarProdutoCategoria(req: Request, res: Response) {

        const { id } = req.body

        const enviarDados = new ProdutoCategoriaServices()

        const resposta = await enviarDados.apagarProdutoCategoria(id)

        return res.json(resposta)
    }

}

export { ProdutoCategoriaControllers }