import { UIContext } from "@/context/ui"
import { Entry } from "@/interfaces"
import {CardActionArea,CardContent,Typography,Card,CardActions} from "@mui/material"
import { useRouter } from "next/router"
import { FC, useContext } from "react"
import { dateFunctions } from '../../utils';

interface Props {
    entry:Entry
}

export const EntryCard :FC <Props> = ({entry}) => {

    const {startDragging,endDragging} = useContext(UIContext)

    const router = useRouter()

    const onDragStart = (event:DragEvent) =>{
        startDragging()
        event.dataTransfer?.setData("entryId",entry._id)
    }

    const onDragEnd=()=>{
        endDragging()
    }

    const onClick = (id:string) =>{
        router.push(`/entries/${id}`)
    }

  return (
    <Card
    onClick={()=>onClick(entry._id)}
    sx={{marginBottom:1}}
    draggable={true}
    onDragStart={onDragStart}
    onDragEnd={onDragEnd}
    //Eventos de drag
    >
        <CardActionArea>
            <CardContent>
                <Typography sx={{whiteSpace:"pre-line"}}>{entry.description}</Typography>
            </CardContent>
            <CardActions sx={{display:"flex", justifyContent:"end", paddingRight:2}}>
                <Typography variant="body2">{dateFunctions.getFormatDistanceToNow(entry.createdAt)}</Typography>
            </CardActions>
        </CardActionArea>
    </Card>
  )
}
