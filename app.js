const express = require('express')
const response = require('./helpers/response')
const route = require('./routes')

const app = express()

// Port API
const port = process.env.PORT || 5151

// Serialize dan Deserialize Input
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Welcome API
app.get('/',  async (req,res,next) => {
    res.status(200).send({
        message: "Welcome to go-blog API"
    })
})

// Routes
route(app)

// Error Handler
app.use(response.errorHandler)

// App Listen
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})