const AuthController = require('./controllers/AuthController')
const ArticlesController = require('./controllers/ArticlesController')
const UserController = require('./controllers/UserController')

const _routes = [
    ['',AuthController],
    ['/articles',ArticlesController],
    ['/user',UserController]
]

const routes = (app) => {
    _routes.forEach(route => {
        const [url, controller] = route
        app.use(`/api${url}`,controller)
    })
}

module.exports = routes