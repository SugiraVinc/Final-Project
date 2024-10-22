'use client'

import { useEffect } from 'react'
import { Provider } from 'react-redux'
import store from './store'
import { initializeState } from './slices/userSlices/authSlice'

export function Providers({ children }) {
  useEffect(() => {
    store.dispatch(initializeState());
  }, []);

  return (
    <Provider store={store}>
      {children}
    </Provider>
  )
}