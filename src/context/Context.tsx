import { useState, createContext } from "react";

const defaultState = {
    selectTheme: 'one',
   // setSelectTheme: () => void,
}
interface ThemeProviderProps {
    children: React.ReactNode
}

interface userThemeProps {
    selectTheme: string,
    setSelectTheme?: React.Dispatch<React.SetStateAction<string>>,   
}

export const DataContext = createContext<userThemeProps>(defaultState)
export const DataProvider = ({ children }: ThemeProviderProps) => {
    const [selectTheme, setSelectTheme] = useState<string>('one') 
   
    return (
        <DataContext.Provider value={{ selectTheme, setSelectTheme }}>
            {children}
        </DataContext.Provider>
    )
}