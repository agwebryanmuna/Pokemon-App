'use client'

import React from 'react'
import { GlobalContextProvider } from "@/context/globalContext";

const ContextProvider = ({children}:{children: React.ReactNode}) => {
  return (
    <GlobalContextProvider>{children}</GlobalContextProvider>
  )
}
export default ContextProvider
