import prisma from "../service/prismaClient.js";


export const getBrokersFromStock = async (req, res) => {

    const stock = req.body['stockSym']
    const brokers = await prisma.stock_broker.findMany({
        where: {
            stock: {
                stockSym: stock
            },
            deletedAt: null
        },
        include: {
            broker: true
        }
    }).catch((e) => {
        console.log(e)
        res.status(400).send(`Error getting the broker of the stock ${stock} !!`)
    })
    res.send(brokers)
}

export const getStocksFromBroker = async (req, res) => {

    const broker = req.body['broker']
    const stocks = await prisma.stock_broker.findMany({
        where: {
            broker: {
                name: broker
            },
            deletedAt: null
        },
        include: {
            stock: true
        }
    }).catch((e) => {
        console.log(e)
        res.status(400).send(`Error getting the stocks of the stock ${broker} !!`)
    })
    res.send(stocks)
}

export const associateStockBroker = async (req, res) => {

    const {broker, stockSym} = req.body
    const stocks = await prisma.stock_broker.create({
        data: {
            broker: {
                connect: {
                    name: broker
                },
            },
            stock: {
                connect: {
                    stockSym: stockSym
                },
            },
        },
    }).catch((e) => {
        console.log(e)
        res.status(400).send(`Error associating stock ${stockSym} to the broker ${broker} !!`)
    })
    res.send(stocks)
}

export const disassociateStockBroker = async (req, res) => {

    const {broker, stockSym} = req.body

    const stockBroker = await prisma.stock_broker.findFirst({
        where: {
            stock: {
                stockSym: stockSym
            },
            broker: {
                name: broker
            },
        },
    })

    const stocks = await prisma.stock_broker.update({
        data: {
            deletedAt: new Date()
        },
        where: {
            id: stockBroker.id
        },
    }).catch((e) => {
        console.log(e)
        res.status(400).send(`Error disassociating stock ${stockSym} to the broker ${broker} !!`)
    })
    res.send(stocks)
}
