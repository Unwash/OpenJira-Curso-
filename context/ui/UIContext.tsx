import { createContext } from "react"

interface ContextProps {
    sidemenuOpen: boolean,
    isDragging:boolean,
    openSideMenu:()=>void,
    closeSideMenu:()=>void,
    endDragging:()=>void
    startDragging:()=>void
}

export const UIContext = createContext({} as ContextProps)

