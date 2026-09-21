import { Request, Response } from "express"
import WhatsAppServices from "../../Services/WhatsApp/WhatsAppServices"

class WhatsAppControllers {
    async testarWhatsApp(req: Request, res: Response) {
        try {
            const {telefone , mensagem } = req.body

            if(!telefone || !mensagem ) {
                return res.status(400).json({
                    error: "Telefone e mensagem são obrigatórios"
                })
            }
            const resposta = await WhatsAppServices.enviarMensagem({
                telefone,
                mensagem
            })
            return res.status(200).json(resposta)
        } catch (erro) {
            console.log("Erro no WhatsApp:", erro)

            return res.status(500).json({
                error:
                erro instanceof Error
                ? erro.message
                : "Não foi possível enviar a mensagem"
            })
        }
    }

}
export { WhatsAppControllers }