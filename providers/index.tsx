import React, { PropsWithChildren } from 'react'
import GlobalStateProvider from './GlobalStateProvider'
import FramerMotionProvider from './FramerMotionProvider';
import { ThemeProvider } from '@/components/theme-provider';
import { QueryProvider } from './query-provider';


export default function Providers({ children }: PropsWithChildren) {
    return (

        <FramerMotionProvider>
             <QueryProvider>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                <GlobalStateProvider>

                    {children}
                </GlobalStateProvider>
            </ThemeProvider>

             </QueryProvider>
        </FramerMotionProvider>


    )
}
