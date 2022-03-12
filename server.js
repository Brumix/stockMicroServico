import express from 'express'
import bodyParser from 'body-parser'

import stocksRoutes from "./routes/stocks.js";

const app = express()
const PORT = process.env.PORT || 5000

app.use(bodyParser.json())
app.use('/stocks',stocksRoutes)

app.get('/',(req,res)=>res.send('Hello Node'))




app.listen(PORT,()=> console.log(`Server Listening in ${PORT}`))
