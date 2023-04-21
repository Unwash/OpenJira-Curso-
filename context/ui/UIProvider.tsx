import {FC, useReducer} from "react"
import { uiReducer, UIContext } from "./"


export interface UIState {
    sidemenuOpen:boolean,
    isDragging:boolean
}

interface children {
    children:JSX.Element
}

const UI_INITIAL_STATE = {
    sidemenuOpen:false,
    isDragging:false
}


export const UIProvider : FC <children>  = ({children}) => {

    const [state,dispatch] = useReducer(uiReducer,UI_INITIAL_STATE)

    const openSideMenu = ()=>{
        dispatch({type: "UI - Open Sidebar"})
    }

    const closeSideMenu = ()=>{
        dispatch({type: "UI - Close Sidebar"})
    }

    const startDragging =()=>{
        dispatch({type:"UI - Start Dragging"})
    }

    const endDragging =()=>{
        dispatch({type:"UI - End Dragging"})
    }

  return (
    <UIContext.Provider value={{
        ...state,
        //METHODS
        openSideMenu,
        closeSideMenu, 
        startDragging,
        endDragging
    }}>
        {children}
        </UIContext.Provider>
  )
}


