class _response {
    sendResponse = (res, data) => {
        try {
            if (data.code) {
                res.status(data.code)

                delete data.code

                res.send(data)

                return true
            }

            // console.log('Response Data',data)

            res.status(data && data.status ? 200 : 500)
            res.send(data)

            return true
        } catch (error) {
            console.error('sendResponse response helper Error: ',error)
            
            res.status(400).send({
                status: false,
                error
            })

            return false
        }
    }

    errorHandler = (err, req, res, next) => {
        if (err.name === "UnautorizedError") {
            res.status(401).send({
                status: false,
                error: 'Invalid Token'
            })

            res.status(500).send({
                status: false,
                error: err.message
            })
        }
    }
}

module.exports = new _response()