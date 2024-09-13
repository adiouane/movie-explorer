"use client";
import { QueryClient, QueryClientProvider } from 'react-query'

/**
 * Component that provides a QueryClient instance to its children for React Query usage.
 * @param children - The React elements to be wrapped by the QueryClientProvider.
 * @returns JSX element representing the QueryClientProvider with the provided children.
 */
export default function Provider({ children }: { children: React.ReactNode }) {
    const queryClient = new QueryClient()
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}