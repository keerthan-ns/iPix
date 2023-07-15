import {BrowserRouter,Route,Routes} from "react-router-dom"
import HomePage from './scenes/homePage/HomePage'
import ProfilePage from './scenes/profilePage/ProfilePage'
import LoginPage from './scenes/loginPage/LoginPage'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import {CssBaseline, ThemeProvider} from "@mui/material"
import { createTheme } from '@mui/material/styles'
import {themeSettings} from "./theme.js"

function App() {
  const mode = useSelector((state)=> state.mode)
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])
  return (
    <>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          {/* juz to reset css */}
          <CssBaseline/>
          <Routes>
            <Route path='/' element={<LoginPage/>}/>
            <Route path='/home' element={<HomePage/>}/>
            <Route path='/profile/:userId' element={<ProfilePage/>}/>
          </Routes>
          </ThemeProvider>
      </BrowserRouter>
    </>
  )
}

export default App
