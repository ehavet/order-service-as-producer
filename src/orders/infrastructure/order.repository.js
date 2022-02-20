import {Status} from '../domain/status.js'

let orders = [
    {id: 1, clientId: 'r4ch0', itemId: 'brow', quantity: 123, status: Status.VALIDATED},
    {id: 2, clientId: 'r4cl0', itemId: 'coke', quantity: 12, status: Status.CANCELED},
    {id: 3, clientId: 'c4ss0', itemId: 'acid', quantity: 55, status: Status.VALIDATED},
    {id: 4, clientId: 'cl0d0', itemId: 'crys', quantity: 5, status: Status.CANCELED},
]

export class OrderRepository {
    async get(id = undefined) {
        if (id) return orders.find(order => order.id === id)
        return orders
    }

    async add(order) {
        order.id = getAutoId()
        if (isObject(order)) orders.push(order)
        return order.id
    }

    async remove(id) {
        const index = orders.findIndex((order => order.id === id))
        orders.splice(index,1)
    }
}

const getAutoId = () =>
    orders.map(order => order.id).sort((a, b) => a - b)[orders.length - 1] + 1

const isObject = (object) => object === Object(object)
