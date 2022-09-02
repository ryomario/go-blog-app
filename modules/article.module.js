const mysql = require('../helpers/database')
const Joi = require('joi')

class _article {
    // List all Articles
    listArticles = async (body = {}) => {
        try {
            const schema = Joi.object({
                user_id: Joi.number()
            })

            const validation = schema.validate(body)

            if (validation.error) {
                const errorDetails = validation.error.details.map(detail => detail.message)

                return {
                    status: false,
                    code: 422,
                    error: errorDetails.join(', ')
                }
            }

            const sql = {
                query: `
                SELECT
                    da.id,
                    da.title,
                    da.summary,
                    da.created_at,
                    da.updated_at,
                    da.author id_author,
                    au.username username_author,
                    au.nama_user nama_author,
                    dk.id id_komentar,
                    dk.user id_komentator,
                    auc.username username_komentator,
                    auc.nama_user nama_komentator,
                    dk.title title_komentar,
                    dk.komentar
                FROM
                    d_artikel da
                JOIN
                    auth_user au ON au.id = da.author
                LEFT JOIN
                    d_komentar dk ON dk.artikel = da.id
                LEFT JOIN
                    auth_user auc ON auc.id = dk.user
                WHERE 1
                `,
                params: []
            }

            if (body.user_id) {
                sql.query += ' AND da.author = ?'
                sql.params.push(body.user_id)
            }

            const list = await mysql.query(sql.query, sql.params)

            const data = []

            for (value in list) {
                const idxArticle = data.findIndex(article => article.id === value.id)
                if (idxArticle === -1) {
                    data.push({
                        id: value.id,
                        title: value.title,
                        summary: value.summary,
                        created_at: value.created_at,
                        updated_at: value.updated_at,
                        user: {
                            id: value.id_author,
                            username: value.username_author,
                            name: value.nama_author
                        },
                        comment: value.id_komentar? [{
                            id: value.id_komentar,
                            title: value.title_komentar,
                            comment: value.komentar,
                            user: {
                                id: value.id_komentator,
                                username: value.username_komentator,
                                name: value.nama_komentator
                            }
                        }] : []
                    })
                } else {
                    if (value.id_komentar) {
                        data[idxArticle].comment.push({
                            id: value.id_komentar,
                            title: value.title_komentar,
                            comment: value.komentar,
                            user: {
                                id: value.id_komentator,
                                username: value.username_komentator,
                                name: value.nama_komentator
                            }
                        })
                    }
                }
            }

            return {
                status: true,
                data
            }
        } catch (error) {
            console.error('listArticles module Error: ',error)

            return {
                status: false,
                error
            }
        }
    }
}