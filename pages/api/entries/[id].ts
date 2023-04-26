import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '@/database'
import { Entry, IEntry } from '@/models'
import mongoose from 'mongoose';


type Data =
    | { message: string }
    | IEntry;


export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    const {id} = req.query;

    if(!mongoose.isValidObjectId(id)){
        return res.status(400).json({message:`El id: ${id}, no es válido`})
    }

    switch (req.method) {
        case 'GET':
            return getEntry(req, res)
        case 'PUT':
            return updateEntry(req, res)
        default:
            return res.status(400).json({ message: "Endpoint no existe" })

    }
}

const getEntry = async (req:NextApiRequest,res:NextApiResponse<Data>)=>{
try {

const {id} = req.query

db.connect()

const entry = await Entry.findById(id)

db.disconnect()

if(!entry) return res.status(400).json({message:"No existe una entrada con este id"})

return res.json(entry)

    
} catch (error) {
    console.log(error)
    db.disconnect()
    res.status(500).json({message:"Ocurrio un error en el servidor"})
}
}

const updateEntry = async (req:NextApiRequest,res:NextApiResponse<Data>) =>{
    try {
        
    const {id} = req.query
    
    await db.connect();

    const entryToUpdate = await Entry.findById(id);

    if(!entryToUpdate){
        await db.disconnect()
        return res.status(400).json({message: "No existe una entrada con ese id: " + id})
    }

    const {description = entryToUpdate.description, status = entryToUpdate.status} = req.body

    const updatedEntry = await Entry.findByIdAndUpdate(id,{description,status}, {runValidators:true,new:true})
    await db.disconnect();
    res.json(updatedEntry!)
        
    } catch (error) {
    await db.disconnect()
    console.log(error)
    res.status(400).json({message:"Error de servidor"})
    }
    } 