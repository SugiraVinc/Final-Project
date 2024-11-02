'use client'
import { useEffect } from 'react'
import { Provider } from 'react-redux'
import store from './store'
import { initializeState } from './slices/userSlices/authSlice'

export function Providers({ children }) {
  useEffect(() => {
    const initState = () => {
      store.dispatch(initializeState());
    };
    
    initState();
  }, []);

  return (
    <Provider store={store}>
      {children}
    </Provider>
  )
}