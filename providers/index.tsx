import React, { PropsWithChildren } from 'react'
import GlobalStateProvider from './GlobalStateProvider'
import FramerMotionProvider from './FramerMotionProvider';
import { ThemeProvider } from '@/components/theme-provider';


export default function Providers({ children }: PropsWithChildren) {
    return (

        <FramerMotionProvider>
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
        </FramerMotionProvider>


    )
}
