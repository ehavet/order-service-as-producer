import {Status} from './status.js'

export function createOrderUsecaseFactory(orderRepository, messageProducer) {
    return async (clientId, itemId, quantity) => {
        const orderId = await orderRepository.add({clientId, itemId, quantity, status: Status.PENDING})
        await messageProducer.connect()
        await messageProducer.send({
            topic: 'order',
            messages: [
                {key: 'created', value: `{"orderId": "${orderId}", "clientId": "${clientId}", "itemId": "${itemId}", "quantity": "${quantity}"}`}
            ]
        })
        return await orderRepository.get(orderId)
    }
}
