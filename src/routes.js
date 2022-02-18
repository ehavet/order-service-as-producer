import express from 'express'
const router = express.Router()
import container from './container.js'
import ordersEndpoints from './orders/api/v0/orders.api.js'

export default ordersEndpoints(router, container)
