import { Entry } from '@/interfaces';
import { EntriesState } from './';

type EntriesActionType =
   | { type: '[Entry] - Add-Entry', payload:Entry }
   | {type: "[Entry] - IsAdding"}
   | {type: "[Entry] - Entry-Updated", payload:Entry}


export const entriesReducer = (state: EntriesState, action: EntriesActionType) : EntriesState => {
    
    switch (action.type) {
          case '[Entry] - Add-Entry':
            return {    
                 ...state,
                 entries:[...state.entries,action.payload]
            }
            case "[Entry] - IsAdding":
               return{
                  ...state,
                  isAdding:!state.isAdding
               }

               case "[Entry] - Entry-Updated":
               return{
                  ...state,
                  entries:state.entries.map((entry)=>{
                     if(entry._id === action.payload._id ){
                        entry.description = action.payload.description
                        entry.status = action.payload.status
                     }
                     return entry
                  })
               }


       default:
          return state
   }
}