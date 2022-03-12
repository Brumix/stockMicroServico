import prisma from "../service/prismaClient.js";


export const getBroker = async (req, res) => {
    let broker
    if (req.params.name !== undefined) {
        broker = await prisma.broker.findFirst({
            where: {
                name: req.params.name,
                deletedAt: null
            }
        })
    } else {
        broker = await prisma.broker.findMany()
    }

    res.send(broker)
}

export const postBroker = async (req, res) => {
    const broker = await prisma.broker.create({
        data: {
            name: req.body["name"]
        }
    })
    res.send(broker)
}

export const putBroker = async (req, res) => {
    const broker = await prisma.broker.update({
        where: {
            name: req.body["oldName"],
            deletedAt: null
        },
        data: {
            name: req.body["newName"]
        }
    })
    res.send(broker)
}

export const deleteBroker = async (req, res) => {
    const broker = await prisma.broker.update({
        where: {
            name: req.body["name"],
            deletedAt: null
        },
        data: {
            deletedAt: new Date()
        }

    })
    res.send(broker)
}


