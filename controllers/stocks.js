import prisma from "../service/prismaClient.js";


export const getStocks = async (req, res) => {
    let stocks
    const name = req.params.name

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
    res.send(stocks)
}

export const postStocks = async (req, res) => {
    const body = req.body
    const stock = await prisma.stock.create({
        data: {
            stockSym: body['stockSym'],
            company: body['company'],
        }
    })
    res.send(stock)
}
//todo resolve error
export const putStocks = async (req, res) => {
    const body = req.body
    const stocks = await prisma.stock.update({
        where: {
            stockSym: body["stockSym"],
            deletedAt: null
        },
        data: {
            stockSym: body['newStockSym'],
            company: body['company'],
        }
    })
    res.send(stocks)
}

export const deleteStocks = async (req, res) => {
    res.send(`DELETE`)
}
