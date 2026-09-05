import { Request, Response, NextFunction } from 'express'

import { verify } from 'jsonwebtoken'

interface Payload {

    sub: string

}

export function estaAutenticado(

    req: Request,

    res: Response,

    next: NextFunction

) {

    const autoToken = req.headers.authorization

    if (!autoToken) {

        return res.json({ dados: 'Token Inexistente' })

    }

    const [, token] = autoToken.split(' ')

    try {

        console.log("TOKEN:", token)
        console.log("SECRET EXISTE:", !!process.env.JWT_SECRETO)

        const { sub } = verify(

            token,

            process.env.JWT_SECRETO

        ) as Payload

        console.log("SUB:", sub)

        req.usuarioId = sub

        return next()

    } catch (err) {

        console.log("ERRO JWT:", err)

        return res.json({ dados: 'Token Inválido' })

    }

}