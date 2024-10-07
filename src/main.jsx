import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {NextUIProvider} from '@nextui-org/react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import store from './Redux/Store.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <NextUIProvider>
  <Provider store={store}>
    <App />
  </Provider>
  </NextUIProvider>
  <ToastContainer />
  </StrictMode>,
)
