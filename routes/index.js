const routes = require('express').Router()


module.exports = () => {
    routes.use('/auth', require('./auth-routes')())
    routes.use('/blog', require('./blog-routes')())
    return routes
}