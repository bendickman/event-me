import { Container, CssBaseline } from '@mui/material'
import HomePage from '../../features/home/HomePage'
import NavBar from './NavBar'

function App() {

  return (
    <>
      <CssBaseline />
      <NavBar />
      <Container maxWidth='xl' sx={{marginTop: 3}}>
        <HomePage />
      </Container>
    </>
  )
}

export default App
