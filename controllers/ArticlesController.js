const { Router } = require('express')
const m$article = require('../modules/article.module')
const response = require('../helpers/response')
const userSession = require('../helpers/middleware')

const ArticelsController = Router()

/**
 * List Articles
 */
ArticelsController.get('/', userSession, async (req, res, next) => {
    const list = await m$article.listArticles(req.query)

    response.sendResponse(res, list)
})

module.exports = ArticelsController