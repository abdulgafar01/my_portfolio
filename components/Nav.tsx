'use client'

import { m, useMotionValueEvent, useScroll } from 'framer-motion'
import React, { useRef, useState } from 'react'

const Nav = () => {
    const [isHidden, setIsHidden] = useState(false)
    const { scrollY } = useScroll();
    const lastYRef = useRef(0);

    useMotionValueEvent(scrollY, 'change', (y) => {
        const difference = y - lastYRef.current;
        if (Math.abs(difference) > 50) {
            setIsHidden(difference > 0);

            // if(y>300){
            //     setIsHidden(true);
            // }
            // else{
            //     setIsHidden(false)
            // }

            lastYRef.current = y
        }
    })
    return (
        <m.div
            animate={isHidden ? "hidden" : "visible"}
            whileHover="visible"
            onFocusCapture={()=>{setIsHidden(false)}}
            variants={{
                hidden: {
                    y: "-90%",
                },
                visible: {
                    y: "0%",
                },
            }}
            className='fixed top-0 pt-3 z-1000 flex w-full justify-center'>
            <nav className='flex justify-between gap-3 rounded-3xl bg-white p-5 *:rounded-xl *:border *:border-gray-300  *:px-7 *:py-2 *:text-black-100'>
                <a href="">home</a>
                <a href="">project</a>
                <a href="">blog</a>
                <a href="">likes</a>
            </nav>
        </m.div>

    )
}

export default Nav