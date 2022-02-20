const express = require('express')

module.exports = ({ MovieController }) => {
    const router = express.Router()
    router.get('/movie', MovieController.getAll)
    router.get('/movie/:id', MovieController.getById)
    router.delete('/movie/:id', MovieController.delete)
    router.post('/movie', MovieController.create)
    router.put('/movie/:id', MovieController.update)
    return router
}