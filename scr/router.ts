import { Router } from 'express'

import multer from 'multer'

import uploadConfig from './config/multer'

import { estaAutenticado } from './Middleware/estaAutenticado'

// importação dos controladores

import { UsuariosControllers } from './Controllers/Usuarios/UsuariosControllers'
import { ClientesControllers } from './Controllers/Clientes/ClientesControllers'
import { LojasControllers } from './Controllers/Lojas/LojasControllers'
import { CategoriasControllers } from './Controllers/Categorias/CategoriasControllers'
import { ProdutosControllers } from './Controllers/Produtos/ProdutosControllers'
import { ProdutoCategoriaControllers } from './Controllers/ProdutoCategoria/ProdutoCategoriaControllers'
import { PedidosControllers } from './Controllers/Pedidos/PedidosControllers'
import { ItensPedidoControllers } from './Controllers/ItensPedido/ItensPedidoControllers'
import { PagamentosControllers } from './Controllers/Pagamentos/PagamentosControllers'
import { LoginUsuariosControllers } from './Controllers/LoginUsuarios/LoginUsuariosControllers'

// instanciar todas as funcionalidades do Router

const router = Router()

const upload = multer(uploadConfig.upload('./tmp'))

// criação das rotas de EndPoint

router.post('/cadastrarUsuarios', new UsuariosControllers().cadastrarUsuarios)
router.post('/loginUsuarios', new LoginUsuariosControllers().logarUsuarios)

router.use(estaAutenticado)

router.post('/VisualizarUsuarioUnicoPost', new UsuariosControllers().visualizarUsuarioUnicoPost)
router.put('/AlterarUsuarios', new UsuariosControllers().alterarUsuarios)
router.get('/VisualizarDadosGeral', new UsuariosControllers().visualizarDadosGeral)
router.delete('/ApagarUsuarios', new UsuariosControllers().apagarUsuarios)

router.post('/cadastrarClientes', new ClientesControllers().cadastrarClientes)
router.get('/visualizarDadosGeralCli', new ClientesControllers().visualizarDadosGeralCli)
router.post('/visualizarClienteUnico', new ClientesControllers().visualizarClienteUnico)
router.put('/alterarClientes', new ClientesControllers().alterarClientes)
router.delete('/apagarClientes', new ClientesControllers().apagarClientes)

router.post("/CadastrarLojas", new LojasControllers().cadastrarLojas)
router.get("/VisualizarDadosGeralLoja", new LojasControllers().visualizarDadosGeralLojas)
router.post("/VisualizarLojaUnica", new LojasControllers().visualizarLojaUnica)
router.put("/AlterarLojas", new LojasControllers().alterarLojas)
router.delete("/ApagarLojas", new LojasControllers().apagarLojas)

router.post("/CadastrarCategorias", new CategoriasControllers().cadastrarCategorias)
router.get("/VisualizarDadosGeralCat", new CategoriasControllers().visualizarDadosGeralCat)
router.post("/VisualizarCategoriaUnica", new CategoriasControllers().visualizarCategoriaUnica)
router.put("/AlterarCategorias", new CategoriasControllers().alterarCategorias)
router.delete("/ApagarCategorias", new CategoriasControllers().apagarCategorias)

router.post("/CadastrarProdutos", upload.single('imagem'), new ProdutosControllers().cadastrarProdutos)
router.get("/VisualizarDadosGeralPro", new ProdutosControllers().visualizarDadosGeralPro)
router.post("/VisualizarProdutoUnico", new ProdutosControllers().visualizarProdutoUnico)
router.put("/AlterarProdutos", upload.single("imagem"), new ProdutosControllers().alterarProdutos)
router.delete("/ApagarProdutos", new ProdutosControllers().apagarProdutos)

router.post("/CadastrarProdutoCategoria", new ProdutoCategoriaControllers().cadastrarProdutoCategoria)
router.get("/VisualizarDados", new ProdutoCategoriaControllers().visualizarDados)
router.delete("/ApagarProdutoCategoria", new ProdutoCategoriaControllers().apagarProdutoCategoria)

router.post("/CadastrarPedidos", new PedidosControllers().cadastrarPedidos)
router.get("/VisualizarDadosPedidos", new PedidosControllers().visualizarDadosPedidos)
router.post("/VisualizarPedidoUnico", new PedidosControllers().visualizarPedidoUnico)
router.put("/AlterarPedidos", new PedidosControllers().alterarPedidos)
router.delete("/ApagarPedidos", new PedidosControllers().apagarPedidos)

router.post("/CadastrarItensPedido", new ItensPedidoControllers().cadastrarItensPedido)
router.get("/VisualizarDadosIP", new ItensPedidoControllers().visualizarDadosIP)
router.post("/VisualizarItemUnico", new ItensPedidoControllers().visualizarItemUnico)
router.put("/AlterarItensPedido", new ItensPedidoControllers().alterarItensPedido)
router.delete("/ApagarItensPedido", new ItensPedidoControllers().apagarItensPedido)

router.post("/CadastrarPagamentos", new PagamentosControllers().cadastrarPagamentos)
router.get("/VisualizarDadosPagamentos", new PagamentosControllers().visualizarDadosPagamentos)
router.post("/VisualizarPagamentoUnico", new PagamentosControllers().visualizarPagamentoUnico)
router.put("/AlterarPagamentos", new PagamentosControllers().alterarPagamentos)
router.delete("/ApagarPagamentos", new PagamentosControllers().apagarPagamentos)

export default router