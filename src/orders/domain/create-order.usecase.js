import {Status} from './status.js'

export function createOrderUsecaseFactory (orderRepository) {
    return async (itemId, quantity) => {
        const orderId = await orderRepository.add({itemId, quantity, status: Status.PENDING})
        return await orderRepository.get(orderId)
    }
}
