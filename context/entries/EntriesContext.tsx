import { Entry } from '@/interfaces';
import {createContext} from 'react';

interface ContextProps {
   entries:Entry[];
   isAdding:boolean;
   addNewEntry:(description:string)=>void;
   setIsAdding:()=>void;
   updatedEntry:(entry:Entry)=>void
}

export const EntriesContext = createContext({} as ContextProps)