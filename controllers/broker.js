import prisma from "../service/prismaClient.js";


export const getBroker = async (req, res) => {
    let broker
    try {
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
    } catch (e) {
        console.log(e)
        res.status(400).send("Error getting the broker!!")
    }
    res.send(broker)
}

export const postBroker = async (req, res) => {
    const broker = await prisma.broker.create({
        data: {
            name: req.body["name"]
        }
    }).catch((e) => {
        console.log(e)
        res.status(400).send("Error creating the broker!!")
    })
    res.send(broker)
}

export const putBroker = async (req, res) => {

    const broker = await prisma.broker.update({
        where:
            {
                name: req.body["oldName"]
            },
        data:
            {
                name: req.body["newName"]
            }
    }).catch((e) => {
        console.log(e)
        res.status(400).send("Error updating the broker!!")
    })

    res.send(broker)
}

export const deleteBroker = async (req, res) => {
    const broker = await prisma.broker.update({
        where: {
            name: req.body["name"]
        },
        data: {
            deletedAt: new Date()
        }

    }).catch((e) => {
        console.log(e)
        res.status(400).send("Error deleting the broker!!")
    })
    res.send(broker)
}


