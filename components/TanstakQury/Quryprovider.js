"use client"
import {
    QueryClient,
    QueryClientProvider,
  } from 'react-query';
  import { ReactQueryDevtools } from 'react-query/devtools'
  
  // Create a client
  const queryClient = new QueryClient()
  
export default function App({children}) {
    return (
      // Provide the client to your App
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    )
  } 