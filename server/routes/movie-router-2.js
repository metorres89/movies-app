const express = require('express')

module.exports = ({ MovieController }) => {
    const router = express.Router()
    router.get('/movie', MovieController.getAll)
    return router
}