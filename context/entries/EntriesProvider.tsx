import { FC, useReducer, useEffect } from 'react'
import { entriesReducer, EntriesContext } from './'
import { Entry } from '@/interfaces'
import { entriesApi } from '@/apis';
import { useSnackbar } from "notistack"

export interface EntriesState {
    entries: Entry[],
    isAdding: boolean
}

interface Props {
    children: JSX.Element
}

const Entries_INITIAL_STATE: EntriesState = {
    entries: [],
    isAdding: false
}





export const EntriesProvider: FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE)

    const { enqueueSnackbar } = useSnackbar()

    const addNewEntry = async (description: string) => {

        // const newEntry: Entry = {
        //     _id: uuidv4(),
        //     description,
        //     createdAt: Date.now(),
        //     status: 'pending'
        // }

        const { data: newEntry } = await entriesApi.post<Entry>("/entries", { description })

        dispatch({ type: "[Entry] - Add-Entry", payload: newEntry })

    }

    const setIsAdding = () => {
        dispatch({ type: "[Entry] - IsAdding" })
    }

    const updatedEntry = async (entry: Entry, showSnackbar: boolean = false) => {
        try {
            const { _id, status, description } = entry
            const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, { status, description })

            if (showSnackbar) {
                enqueueSnackbar('Entrada actualizada', {
                    variant: "success",
                    autoHideDuration: 1500,
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right'
                    }
                })
            }


            dispatch({ type: "[Entry] - Entry-Updated", payload: data })
        } catch (error) {
            console.log({ error })
        }
    }

    const refreshEntries = async () => {
        const { data } = await entriesApi.get<Entry[]>("/entries")
        dispatch({ type: "[Entry] - Entry-Refresh", payload: data })
    }

    const deleteEntry = async (_id: string) => {
        try {
           await entriesApi.delete<Entry>(`/entries/${_id}`)
            enqueueSnackbar('Entrada eliminada', {
                variant: "success",
                autoHideDuration: 1500,
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                }
            })
            dispatch({ type: "[Entry] - Entry-Deleted", payload: { _id } })
            return true
        } catch (error) {
            enqueueSnackbar('Error al eliminar', {
                variant: "error",
                autoHideDuration: 1500,
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                }
            })
            return false
        }
    }



    useEffect(() => {
        refreshEntries()
    }, [])


    return (
        <EntriesContext.Provider value={
            {
                ...state,
                //Methods  
                addNewEntry,
                setIsAdding,
                updatedEntry,
                deleteEntry
            }
        }>
            {children}
        </EntriesContext.Provider>
    )
}

