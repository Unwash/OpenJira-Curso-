import { Layout } from "@/components/layouts/Layout"
import { capitalize, Grid,Card,CardHeader,CardContent, TextField, CardActions, Button, FormControl, FormLabel, RadioGroup, FormControlLabel,Radio, IconButton } from "@mui/material"
import { GetServerSideProps } from 'next'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { Entry, EntryStatus } from "@/interfaces";
import { useState, ChangeEvent,useMemo,FC, useContext } from "react";
import { dbEntries } from "@/database";
import { EntriesContext } from "@/context/entries";
import { useRouter } from "next/router";
import { dateFunctions } from "@/utils";

const validStatus:EntryStatus[] = ["pending", "in-progress", "finished"]

interface Props{
entry:Entry
}

 const EntryPage: FC <Props> = ({entry}) =>{


    const [inputValue, setInputValue] = useState(entry.description);
    const [status, setStatus] = useState<EntryStatus>(entry.status);
    const [touched,setTouched] = useState(false);

    const {updatedEntry,deleteEntry} = useContext(EntriesContext)

    const router = useRouter()

    const isNotValid = useMemo(()=> inputValue.length <= 0 && touched, [inputValue,touched] )

    const onTextFieldChanged = (event: ChangeEvent <HTMLInputElement>) => {
        setInputValue(event.target.value)
    }

    const onStatusChanged  = (event:ChangeEvent <HTMLInputElement>)=>{
        setStatus(event.target.value as EntryStatus)
    }

    const onSave = () =>{
        if(inputValue.trim().length === 0)return
       updatedEntry({...entry,description:inputValue,status},true)
    }

    const onDelete = async ()=>{
        const d = await deleteEntry(entry._id)
        console.log(d)
        if(d) router.push("/")
    }

    return(
        <Layout title={inputValue.substring(0,20) + "..."}>
            <Grid
            container
            justifyContent="center"
            sx={{marginTop:2}}
            >
                <Grid item xs={12} sm={8} md={6}>
                    <Card>
                        <CardHeader 
                        title = {`Entrada: ${inputValue}`}
                        subheader={`Creada ${dateFunctions.getFormatDistanceToNow(entry.createdAt)}`}
                        />
                        <CardContent>
                            <TextField
                            sx={{marginTop: 2, marginBottom:1}}
                            fullWidth
                            placeholder="Nueva entrada"
                            autoFocus
                            multiline
                            label="Nueva entrada"
                            value={inputValue}
                            onChange={onTextFieldChanged}
                            onBlur={()=>setTouched(true)}
                            helperText={ isNotValid && "ingrese un valor"}
                            error={isNotValid}
                            />

                            <FormControl>
                                <FormLabel>
                                    Estado:
                                </FormLabel>
                                <RadioGroup row value={status} onChange={onStatusChanged}  >
                                {
                                        validStatus.map( (option) => {
                                            return <FormControlLabel key={option} value={option} control={<Radio/>} label={capitalize(option)} />
                                        })
                                         
                                    }
                                </RadioGroup>
                            </FormControl>

                        
                        </CardContent>
                        <CardActions>
                            <Button
                            startIcon={<SaveOutlinedIcon/>}
                            variant="contained"
                            fullWidth
                            onClick={onSave}
                            disabled={inputValue.length > 0 ? false : true }
                            >
                                Save
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
                
            </Grid>

            <IconButton sx={{position:'fixed', bottom:30, right:30, backgroundColor:"error.dark",}} onClick={onDelete}>
                <DeleteOutlinedIcon/>
            </IconButton>
        </Layout>
    )
}


export const getServerSideProps: GetServerSideProps = async ({params}) => {
    const { id } = params as {id:string}   
    
    const entry = await dbEntries.getEntryById(id)

    if(!entry){
        return{
            redirect:{
                destination:"/",
                permanent:false
            }
        }
    }

    
    return {
        props: {
            entry
        }
    }
}

export default EntryPage