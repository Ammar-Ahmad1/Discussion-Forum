import './globals.css'
import 'react-toastify/dist/ReactToastify.css';
import { Inter } from 'next/font/google'
// import Nav from '@components/navbar/page'
import Nav from '@components/Nav'   
const inter = Inter({ subsets: ['latin'] })
import Provider from '@components/Provider'
import {toast, ToastContainer} from "react-toastify";
export const metadata = {
  title: 'Zindabhag Dicussion Forum',
  description: 'A discussion forum for Zindabhag',
}

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
    <body>
      <Provider>
        <div className='main'>
          <div className='gradient' />
        </div>

        <main className='app'>
          <Nav 
            toast = {toast}
          />
          <ToastContainer />
          {children}
        </main>
      </Provider>
    </body>
  </html>
  )
}
