import express from 'express'
import bodyParser from 'body-parser'

//ROUTES
import userRoutes from "./routes/user.js";
import stocksRoutes from "./routes/stocks.js";
import brokerRoutes from "./routes/broker.js";
import stockBrokerRoute from "./routes/stockBrokerRoute.js";
import positions from "./routes/positions.js";
import results from "./routes/results.js"


const app = express()
const PORT = process.env.PORT || 5000

app.use(bodyParser.json())
app.use('/user', userRoutes)
app.use('/user/stocks', stocksRoutes)
app.use('/user/broker', brokerRoutes)
app.use('/user/positions', positions)
app.use('/user/results', results)
app.use('/stockBroker', stockBrokerRoute)


app.get('/', (req, res) => res.send({msg: 'Hello From MicroService!!'}))

app.listen(PORT, () => console.log(`Server Listening in ${PORT}`))
