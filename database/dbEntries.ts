import { Entry, IEntry } from '@/models';
import {db} from './';
import {isValidObjectId} from 'mongoose';


export const getEntryById = async (id:string) : Promise < IEntry | null> =>{
 try{
 
    if(!isValidObjectId) return null;

    db.connect()
    const entry = await Entry.findById(id).lean() 
    db.disconnect()


    return JSON.parse(JSON.stringify(entry))

} catch (error) {
    return null
}
}

