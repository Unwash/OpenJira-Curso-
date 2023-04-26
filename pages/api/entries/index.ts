import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '@/database'
import { Entry, IEntry } from '@/models'


type Data =
    | { message: string }
    | IEntry[];


export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'GET':
            return getEnabledCategories(res)
        case 'POST':
            return postEntries(req, res)
        default:
            return res.status(400).json({ message: "Endpoint no existe" })

    }
}

const getEnabledCategories = async (res: NextApiResponse<Data>) => {

    await db.connect();

    const entries = await Entry.find().sort({ createdAt: 'ascending' })

    await db.disconnect();

    return res.json(entries)

}

const postEntries = async (req: NextApiRequest, res: NextApiResponse) => {

    const { description } = req.body

    const newEntry = new Entry({
        description,
        createdAt: Date.now()
    })

    try {
        await db.connect()
        await newEntry.save()
        await db.disconnect()

        return res.status(201).json(newEntry)
    } catch (error) {
        await db.disconnect();
        console.log(error)
        return res.status(500).json({ message: "Algo salio mal" })
    }
}

