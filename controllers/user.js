import prisma from "../service/prismaClient.js";


export const getUser = async (req, res) => {
    const User = await prisma.user.findFirst({
        where: {
            email: req.body['email'],
            deletedAt: null
        }
    })

    res.send(User)
}

export const postUser = async (req, res) => {
    const User = await prisma.user.create({
        data: {
            email: req.body["email"],
            role: req.body["role"]
        }
    })
    res.send(User)
}

export const putUser = async (req, res) => {
    let user = null

    if (req.body["role"] !== undefined) {
        user = await prisma.user.update({
            where: {
                email: req.body["oldEmail"]
            },
            data: {
                role: req.body["role"]
            }
        }).catch(
            res.send(400, "User not found!!")
        )
    }
    if (req.body["newEmail"] !== undefined) {
        user = await prisma.user.update({
            where: {
                email: req.body["oldEmail"]
            },
            data: {
                email: req.body["newEmail"]
            }
        }).catch(
            res.send(400, "User not found!!")
        )
    }

    res.send(user || " ")
}

export const deleteUser = async (req, res) => {
    const User = await prisma.user.update({
        where: {
            email: req.body["email"],
            deletedAt: null
        },
        data: {
            deletedAt: new Date()
        }

    })
    res.send(User)
}


