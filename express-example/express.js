const express = require('express')

const port = 8000
const app = express()

app.use(express.json())

const usersRouter = require('./routers/users')
app.use('/users', usersRouter)

app.listen(port, () => {
    console.log('Server is running on port', port)
})

