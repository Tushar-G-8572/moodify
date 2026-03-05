import './features/shared/globle.scss'
import { RouterProvider } from 'react-router'
import { router } from './app.routes'
import { AuthProvider } from './features/auth/auth.context'
import { SongProvider } from './features/home/song.context'
import { ToastContainer, toast } from 'react-toastify'

function App() {

  return (
    <AuthProvider>
      <SongProvider>
        <RouterProvider router={router} />
        <ToastContainer theme='dark' />
      </SongProvider>
    </AuthProvider>
  )
}

export default App
