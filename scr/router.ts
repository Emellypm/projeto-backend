import { Router } from 'express'

//importação dos controladores
import { UsuariosControllers } from './controllers/Usuarios/usuariosControllers'

//instansiar todas as funcionalidades do Router
const router = Router()

//criação das rotas de EndPoint
router.post('/cadastrarUsuarios', new UsuariosControllers().cadastrarUsuarios)

export default router
