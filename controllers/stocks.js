import pkg from '@prisma/client'

const {PrismaClient} = pkg;
const prisma = new PrismaClient()

export const getStocks = async (req, res) => {

    const user = await prisma.user.findMany()
    res.send(user)
}
