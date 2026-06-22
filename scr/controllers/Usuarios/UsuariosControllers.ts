import { Request, Response } from 'express'

class UsuariosControllers {
    async cadastrarUsuarios(req: Request, res: Response) {
        const { nome, email, senha, telefone } = req.body
        console.log(nome, email, senha, telefone)
    }
}

export { UsuariosControllers }