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

/**
 * Detail Article
 */
ArticelsController.get('/detail', userSession, async (req, res, next) => {
    // http://url-api/detail?id=1
    const detail = await m$article.detailArticle(req.query.id)

    response.sendResponse(res, detail)
})

/**
 * Create Article
 * @param {string} title
 * @param {string} summary
 */
ArticelsController.post('/', userSession, async (req, res, next) => {
    const add = await m$article.addArticle(req.body)

    response.sendResponse(res, add)
})

module.exports = ArticelsController