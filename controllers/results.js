import prisma from "../service/prismaClient.js";
import {getStockPrice} from "./stocks.js";


export const getResults = async (req, res) => {

    const email = req.body['email']
    const brokers = await prisma.results.findMany({
        where: {
            user: {
                email: email
            },
            deletedAt: null
        },
        include: {
            position: true
        }
    }).catch((e) => {
        console.log(e)
        res.status(400).send(`Error getting the results of the user ${email} !!`)
    })
    res.send(brokers)
}

export const createResult = async (position, emailUser, stock) => {

    await prisma.results.create({
        data: {
            position: {
                connect: {
                    id: position['id']
                },
            },
            buyPrice: position['price'],
            closePrice: getStockPrice(stock),
            user: {
                connect: {
                    email: emailUser
                },
            },
        },
    }).catch((e) => {
        console.log(e)
    })

}


