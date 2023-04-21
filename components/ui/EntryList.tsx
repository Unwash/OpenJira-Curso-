import { List, Paper } from '@mui/material'
import React, { FC, useContext, useMemo } from 'react'
import { EntryCard } from './EntryCard'
import { Entry, EntryStatus } from '@/interfaces'
import { EntriesContext } from '../../context/entries/EntriesContext';
import { UIContext } from '@/context/ui';
import styles from "./EntryList.module.css"
interface Props {
status: EntryStatus
}


export const EntryList :FC <Props> = ({status}) => {

  const {entries,updatedEntry} = useContext(EntriesContext) 

  const {isDragging,endDragging} = useContext(UIContext)

  const entriesByStatus = useMemo(() => entries.filter((e)=>e.status === status), [entries])

  const onDropEntry = (event: DragEvent )=>{
    const id = event.dataTransfer?.getData("entryId")
    const entry : Entry = entries.find((entry)=>entry._id === id)!

    const newEntry : Entry = {...entry,status}
    updatedEntry(newEntry)
    endDragging()
  }

  const allowDrop = (event: DragEvent)=>{
    return event.preventDefault()
  }




  return (
    //Aqui haremos drop
    <div
    onDrop={onDropEntry}
    onDragOver={allowDrop}
    className={isDragging ? styles.dragging : ""}
    >
        {/* overflowY:"scroll" */}
        <Paper sx={{height:"calc(100vh - 180px)" , backgroundColor:"transparent",  padding:"2px 5px" }} >
        {/* Cambiara dependiendo si se esta haciendo drag o no */}
        <List 
        sx={{opacity: isDragging ? 0.3 : 1, transition:"all 0.3s"}}
        >
            {entriesByStatus.map((entry)=>{
                return <EntryCard key={entry._id} entry={entry} />
            })}
            
        </List>
        </Paper>

    </div>
  )
}
