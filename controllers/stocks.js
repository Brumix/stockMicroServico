import prisma from "../service/prismaClient.js";
import axios from "axios";


export const getStocks = async (req, res) => {
    let stocks
    const name = req.params.name
    try {
        if (name !== undefined) {
            stocks = await prisma.stock.findFirst({
                where: {
                    OR: [
                        {
                            stockSym: name
                        },
                        {
                            company: name
                        },
                    ],
                    deletedAt: null
                },
            })

        } else {
            stocks = await prisma.stock.findMany()
        }
    } catch (e) {
        console.log(e)
        res.status(400).send("Error getting the stock!!")
    }
    res.send(stocks)
}

export const postStocks = async (req, res) => {
    const body = req.body
    const stock = await prisma.stock.create({
        data: {
            stockSym: body['stockSym'],
            company: body['company'],
        }
    }).catch((e) => {
        console.log(e)
        res.status(400).send("Error creating the stock!!")
    })
    res.send(stock)
}

export const putStocks = async (req, res) => {
    const body = req.body
    const stocks = await prisma.stock.update({
        where: {
            stockSym: body["stockSym"]
        },
        data: {
            stockSym: body['newStockSym'],
            company: body['company'],
        }
    }).catch((e) => {
        console.log(e)
        res.status(400).send("Error updating the stock!!")
    })
    res.send(stocks)
}

export const deleteStocks = async (req, res) => {
    const stock = await prisma.stock.update({
        where: {
            stockSym: req.body["stockSym"]
        },
        data: {
            deletedAt: new Date()
        }

    }).catch((e) => {
        console.log(e)
        res.status(400).send("Error deleting the stock!!")
    })
    res.send(stock)
}


export const getStockPrice = (stock) => {
    console.log(stock)
    return 350
}

export const getStockInfo = async (req, res) => {
    const stock = req.params.name
    const apikey = process.env.APIKEY
    const stockUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${stock}&interval=5min&apikey=${apikey}`
    const result = await axios.get(stockUrl)
    res.send(result.data)
}
