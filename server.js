import express from 'express'
import bodyParser from 'body-parser'

//ROUTES
import userRoutes from "./routes/user.js";
import stocksRoutes from "./routes/stocks.js";
import brokerRoutes from "./routes/broker.js";
import stockBrokerRoute from "./routes/stockBrokerRoute.js";


const app = express()
const PORT = process.env.PORT || 5000

app.use(bodyParser.json())
app.use('/user', userRoutes)
app.use('/user/stocks', stocksRoutes)
app.use('/user/broker', brokerRoutes)
app.use('/stockBroker/', stockBrokerRoute)


app.get('/', (req, res) => res.send('Hello From MicroService!!'))

app.listen(PORT,()=> console.log(`Server Listening in ${PORT}`))
