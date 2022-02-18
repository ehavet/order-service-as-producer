export class OrderNotFoundError extends Error {
    constructor (orderId) {
        const message = `Could not find order with id : ${orderId}`
        super(message)
        this.name = 'OrderNotFoundError'
    }
}
