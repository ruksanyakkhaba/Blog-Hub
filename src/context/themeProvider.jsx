import { createContext, useState } from "react";

 
 const ThemeContext = createContext();
  const ThemeProvider = ({children}) =>{
    const[darkMode,setDarkMode] = useState(false)
    const toogleDarkMode = ()=>{
        setDarkMode(!darkMode)
    }
    return (
        <ThemeContext.Provider value={{darkMode,toogleDarkMode}} >
            {children}
        </ThemeContext.Provider>
    )
 }

 export {ThemeContext,ThemeProvider}