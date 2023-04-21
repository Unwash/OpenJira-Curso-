import { FC, useReducer } from 'react'
import { v4 as uuidv4 } from "uuid";
import { entriesReducer, EntriesContext } from './'
import { Entry } from '@/interfaces'

export interface EntriesState {
    entries: Entry[],
    isAdding: boolean
}

interface Props {
    children: JSX.Element
}

const Entries_INITIAL_STATE: EntriesState = {
    entries: [
        {
            _id: uuidv4(),
            description: "Pendiente: dasdsad",
            status: "pending",
            createdAt: Date.now()
        },
        {
            _id: uuidv4(),
            description: "Terminada: dasdsad",
            status: "finished",
            createdAt: Date.now()
        },
        {
            _id: uuidv4(),
            description: "dasdsad",
            status: "pending",
            createdAt: Date.now()
        },
        {
            _id: uuidv4(),
            description: "En progreso: dasdsad",
            status: "in-progress",
            createdAt: Date.now()
        },
        {
            _id: uuidv4(),
            description: "En progreso: dasdsad",
            status: "in-progress",
            createdAt: Date.now()
        },
        {
            _id: uuidv4(),
            description: "dasdsad",
            status: "pending",
            createdAt: Date.now()
        },
        {
            _id: uuidv4(),
            description: "dasdsad",
            status: "pending",
            createdAt: Date.now()
        }
    ],
    isAdding: false
}




export const EntriesProvider: FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE)

    const addNewEntry = (description: string) => {

        const newEntry: Entry = {
            _id: uuidv4(),
            description,
            createdAt: Date.now(),
            status: 'pending'
        }

        dispatch({ type: "[Entry] - Add-Entry", payload: newEntry })

    }

    const setIsAdding = () => {
        dispatch({ type: "[Entry] - IsAdding" })
    }

    const updatedEntry = (entry:Entry) =>{

        dispatch({type:"[Entry] - Entry-Updated",payload:entry})
    }


    return (
        <EntriesContext.Provider value={
            {
                ...state,
                //Methods  
                addNewEntry,
                setIsAdding,
                updatedEntry
            }
        }>
            {children}
        </EntriesContext.Provider>
    )
}

