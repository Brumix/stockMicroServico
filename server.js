import express from 'express'
import bodyParser from 'body-parser'

import stocksRoutes from "./routes/stocks.js";

const app = express()
const PORT = process.env.PORT || 5000

app.use(bodyParser.json())
app.use('/user/stocks', stocksRoutes)


app.get('/', (req, res) => res.send('Hello From MicroService!!'))

app.listen(PORT,()=> console.log(`Server Listening in ${PORT}`))
