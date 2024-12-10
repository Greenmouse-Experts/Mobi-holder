import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './store/index.js'
import { BrowserRouter } from 'react-router-dom'
import ScrollToTop from './middleware.jsx'

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <BrowserRouter>
        <ScrollToTop><App /></ScrollToTop>
      </BrowserRouter>
    </Provider>
)
