import prisma from "../service/prismaClient.js";


export const getUser = async (req, res) => {
    const user = await prisma.user.findFirst({
        where: {
            email: req.body['email'],
            deletedAt: null
        }
    }).catch(() => {
        console.log(e)
        res.status(400).send("Error getting the user!!")
    })
    if (user === null) {
        res.status(400).send("User not found!!")
        return
    }
    res.send(user)
}

export const postUser = async (req, res) => {
    const user = await prisma.user.create({
        data: {
            email: req.body["email"]
        }
    }).catch(() => {
        res.status(400).send("Error creating the user!!")
    })
    res.send(user)
}

export const putUser = async (req, res) => {

    const user = await prisma.user.update({
        where: {
            email: req.body["oldEmail"]
        },
        data: {
            email: req.body["newEmail"]
        }
    }).catch(() => {
        res.status(400).send("Error updating the user!!")
    })
    res.send(user || " ")
}

export const deleteUser = async (req, res) => {
    const user = await prisma.user.update({
        where: {
            email: req.body["email"]
        },
        data: {
            deletedAt: new Date()
        }

    }).catch(() => {
        res.status(400).send("Error deleting the user!!")
    })
    res.send(user)
}


