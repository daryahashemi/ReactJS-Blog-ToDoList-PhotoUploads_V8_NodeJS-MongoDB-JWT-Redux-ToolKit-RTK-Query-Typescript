import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './App.css'
import store from './store.ts';
import { Provider } from 'react-redux';
import { DataContextProvider } from './context/DataContex.tsx'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <DataContextProvider>
      <App />
      </DataContextProvider>
    </React.StrictMode>
  </Provider>
)
