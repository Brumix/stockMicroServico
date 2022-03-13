import prisma from "../service/prismaClient.js";
import {createResult} from "./results.js"


export const getPositions = async (req, res) => {

    const email = req.body['email']
    const brokers = await prisma.position.findMany({
        where: {
            user: {
                email: email
            },
            deletedAt: null
        },
        include: {
            stockBroker: true
        }
    }).catch((e) => {
        console.log(e)
        res.status(400).send(`Error getting the positions of the user ${email} !!`)
    })
    res.send(brokers)
}

export const postPositions = async (req, res) => {

    const body = req.body

    const stockBroker = await prisma.stock_broker.findFirst({
        where: {
            broker: {
                name: body['broker']
            },
            stock: {
                stockSym: body['stockSym']
            },
            deletedAt: null
        },
    }).catch((e) => {
        console.log(e)
        res.status(400).send(`The stock ${body['stockSym']} don\`t exist in the broker ${body[`broker`]} !!`)
    })

    if (stockBroker === null) {
        res.status(400).send(`The stock ${body['stockSym']} don\`t exist in the broker ${body[`broker`]} !!`)
        return
    }

    const brokers = await prisma.position.create({
        data: {
            price: body['price'],
            action: body['action'],
            user: {
                connect: {
                    email: body['email']
                },
            },
            stockBroker: {
                connect: {
                    id: stockBroker.id
                },
            },
        }
    }).catch((e) => {
        console.log(e)
        res.status(400).send('Error creating the position !!')
    })
    res.send(brokers)
}

export const deletePositions = async (req, res) => {

    const body = req.body

    const positionId = await prisma.position.findFirst({
        where: {
            user: {
                email: body['email']
            },
            stockBroker: {
                broker: {
                    name: body['broker']
                },
                stock: {
                    stockSym: body['stockSym']
                },
            },
        },
    }).catch((e) => {
        console.log(e)
        res.status(400).send('That position don\`t exist !!')
    })

    if (positionId === null) {
        res.status(400).send('That position don\`t exist !!')
        return
    }

    const brokers = await prisma.position.update({
        data: {
            deletedAt: new Date()
        },
        where: {
            id: positionId.id
        }

    }).catch((e) => {
        console.log(e)
        res.status(400).send('Error deleting the position !!')
    })
    res.send(brokers)
}

export const closePosition = async (req, res) => {
    const body = req.body

    const positionId = await prisma.position.findFirst({
        where: {
            user: {
                email: body['email']
            },
            stockBroker: {
                broker: {
                    name: body['broker']
                },
                stock: {
                    stockSym: body['stockSym']
                },
            },
        },
    }).catch((e) => {
        console.log(e)
        res.status(400).send('That position don\`t exist !!')
    })

    if (positionId === null) {
        res.status(400).send('That position don\`t exist !!')
        return
    }

    const position = await prisma.position.update({
        data: {
            isClosed: true
        },
        where: {
            id: positionId.id
        }

    }).catch((e) => {
        console.log(e)
        res.status(400).send('Error closing the position !!')
    })

    createResult(position, body['email'], body['stockSym'])
    res.send(position)

}
