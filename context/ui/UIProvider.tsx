import {FC, useReducer} from "react"
import { uiReducer, UIContext } from "./"


export interface UIState {
    sidemenuOpen:boolean
}

interface children {
    children:JSX.Element
}

const UI_INITIAL_STATE = {
    sidemenuOpen:false
}


export const UIProvider : FC <children>  = ({children}) => {

    const [state,dispatch] = useReducer(uiReducer,UI_INITIAL_STATE)

    const openSideMenu = ()=>{
        dispatch({type: "UI - Open Sidebar"})
    }

    const closeSideMenu = ()=>{
        dispatch({type: "UI - Close Sidebar"})
    }
  return (
    <UIContext.Provider value={{
        ...state,
        //METHODS
        openSideMenu,
        closeSideMenu
    }}>
        {children}
        </UIContext.Provider>
  )
}


