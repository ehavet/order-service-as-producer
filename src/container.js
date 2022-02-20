import { getOrdersUsecaseFactory } from './orders/domain/get-orders.usecase.js'
import { getOrderUsecaseFactory } from './orders/domain/get-order.usecase.js'
import { createOrderUsecaseFactory } from './orders/domain/create-order.usecase.js'
import { deleteOrderUsecaseFactory } from './orders/domain/delete-order.usecase.js'
import {OrderRepository} from './orders/infrastructure/order.repository.js'
import { Kafka } from 'kafkajs'

const orderRepository = new OrderRepository()
const kafka = new Kafka({
    clientId: 'order-service',
    brokers: ['localhost:9092']
})
const messageProducer = kafka.producer()
const getOrders = getOrdersUsecaseFactory(orderRepository)
const getOrder = getOrderUsecaseFactory(orderRepository)
const createOrder = createOrderUsecaseFactory(orderRepository, messageProducer)
const deleteOrder = deleteOrderUsecaseFactory(orderRepository)

export default {
    GetOrders: getOrders,
    GetOrder: getOrder,
    CreateOrder: createOrder,
    DeleteOrder: deleteOrder
}
