import {param, body, validationResult} from 'express-validator'
import {OrderNotFoundError} from '../../domain/orders.errors.js'

export default function (router, container) {
    router.use(async function (
        req,
        res,
        next
    ) {
        console.log('Time: %d', Date.now())
        next()
    })

    router.get('/v0/orders',
        async function (
            req,
            res,
        ) {
            try {
                res.status(200).send(await container.GetOrders())
            } catch (error) {
                res.boom.internal(error)
            }
        })

    router.get('/v0/orders/:id',
        param('id').trim().notEmpty().withMessage('order\'s id must be provided'),
        async function (
            req,
            res,
        ) {
            const errors = validationResult(req)
            if (!errors.isEmpty()) return res.boom.badRequest(errors.array().map(element => element.msg))

            try {
                res.status(200).send(await container.GetOrder(parseInt(req.params.id)))
            } catch (error) {
                switch (true) {
                case error instanceof OrderNotFoundError:
                    return res.boom.notFound(error.message)
                default:
                    res.boom.internal(error)
                }

            }
        })

    router.post('/v0/orders/',
        body('itemId').trim().notEmpty().withMessage('itemId property must be provided'),
        body('itemId').trim().isString().withMessage('itemId property must be a string'),
        body('clientId').trim().notEmpty().withMessage('clientId property must be provided'),
        body('clientId').trim().isString().withMessage('clientId property must be a string'),
        body('quantity').trim().notEmpty().withMessage('quantity property must be provided'),
        body('quantity').trim().isNumeric().withMessage('quantity property must be an integer'),
        async function (req, res) {
            const errors = validationResult(req)
            if (!errors.isEmpty()) return res.boom.badRequest(errors.array().map(element => element.msg))

            try {
                const result = await container.CreateOrder(req.body.clientId, req.body.itemId, req.body.quantity)
                res.status(201).send({
                    id: result.id,
                    clientId: result.clientId,
                    itemId: result.itemId,
                    quantity: parseInt(result.quantity),
                    status: result.status
                })
            } catch (error) {
                res.boom.internal(error)
            }
        })

    router.delete('/v0/orders/:id',
        param('id').trim().notEmpty().withMessage('order\'s id must be provided'),
        async function (
            req,
            res,
        ) {
            const errors = validationResult(req)
            if (!errors.isEmpty()) return res.boom.badRequest(errors.array().map(element => element.msg))

            try {
                await container.DeleteOrder(parseInt(req.params.id))
                res.status(204).end()
            } catch (error) {
                switch (true) {
                case error instanceof OrderNotFoundError:
                    return res.boom.notFound(error.message)
                default:
                    res.boom.internal(error)
                }
            }
        })

    return router
}
