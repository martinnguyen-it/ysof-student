import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { RecoilRoot } from 'recoil'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import RecoilNexus from 'recoil-nexus'
import { ConfigProvider } from 'antd'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import { VN_TIMEZONE } from './constants'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.setDefault(VN_TIMEZONE)

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 3,
    },
  },
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <RecoilNexus />
        <ConfigProvider
          theme={{
            token: {
              fontFamily: 'inherit',
            },
          }}
        >
          <App />
          <ToastContainer autoClose={3000} />
        </ConfigProvider>
      </RecoilRoot>
    </QueryClientProvider>{' '}
  </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
