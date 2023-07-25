import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import { SessionProvider } from "next-auth/react"
import 'bootstrap/dist/css/bootstrap.css'
import 'react-toastify/dist/ReactToastify.min.css'
import NavBar from '@/components/templates/NavBar'
import { store } from '@/store/store'

export default function App({ Component, pageProps: {session, ...pageProps} }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <ToastContainer />
        <NavBar />
        <Component {...pageProps} />
      </Provider>
    </SessionProvider>
  )
}
