import {OrderNotFoundError} from './orders.errors.js'

export function deleteOrderUsecaseFactory (orderRepository) {
    return async (orderId) => {
        const order = await orderRepository.get(orderId)
        if (!order) throw new OrderNotFoundError(orderId)
        return await orderRepository.remove(orderId)
    }
}
