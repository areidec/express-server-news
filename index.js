const express = require('express')
const app = express()
const parser = require('body-parser')

app.use(parser.json())
app.use(parser.urlencoded({ extended: true }))
app.use('/api/user/', require('./routes/user.routes'))
app.use('/api/news/', require('./routes/news.routes'))
app.use('/api/comments/', require('./routes/comments.routes'))

const PORT = 5000
app.listen(PORT, () => console.log(`app has been started at port ${PORT}`))