import { OrderNotFoundError } from './orders.errors.js'

export function getOrderUsecaseFactory (orderRepository) {
    return async (orderId) => {
        const order = await orderRepository.get(orderId)
        if (order) return order
        throw new OrderNotFoundError(orderId)
    }
}
