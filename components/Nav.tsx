'use client'

import { m, useMotionValueEvent, useScroll } from 'framer-motion'
import React, { useRef, useState } from 'react'
import { FiGithub } from "react-icons/fi";
import { FaLinkedin } from 'react-icons/fa';
import clsx from 'clsx'
import { usePathname } from 'next/navigation'
import { navItems } from '@/data'
import NavIcon from './navigation/nav-icon'

const Nav = () => {
    const [isHidden, setIsHidden] = useState(false)
    const { scrollY } = useScroll();
    const pathname = usePathname();
    const lastYRef = useRef(0);

    const isActiveLink = (href: string) => {
        if (href.startsWith('#')) {
            const section = href.slice(1);
            return pathname === '/' && section === 'home' || pathname.startsWith(`/${section}`);
        }

        return pathname === href;
    };

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
            onFocusCapture={() => { setIsHidden(false) }}
            variants={{
                hidden: {
                    y: "-90%",
                },
                visible: {
                    y: "0%",
                },
            }}
            className='fixed inset-x-0 z-1000 flex justify-center sm:top-0 sm:pt-3 sm:bottom-auto'>
            <nav className='hidden sm:flex flex-wrap items-center justify-center gap-4 rounded-3xl bg-gray-700 dark:bg-white p-4 shadow-sm *:px-3 *:py-2 *:text-white'>
                <ul className={clsx('flex items-center gap-2')}>
                    {navItems.map(({ name, link, icon: Icon }) => (
                        <NavIcon
                            key={name}
                            href={link}
                            icon={<Icon className='h-4 w-4' />}
                            title={name}
                            label={name}
                            target='_self'
                            rel=''
                            isActive={isActiveLink(link)}
                        />
                    ))}
                </ul>

                <ul className={clsx('ml-2 flex items-center gap-2')}>
                    <li className={clsx('hidden', 'sm:block')}>
                        <NavIcon
                            href="https://github.com/abdulgafar01"
                            icon={<FiGithub className={clsx('h-5 w-5')} />}
                            title="GitHub"
                        />
                    </li>
                    <li className={clsx('hidden', 'sm:block')}>
                        <NavIcon
                            href="https://www.linkedin.com/in/abdulgafar01"
                            icon={<FaLinkedin className={clsx('h-5 w-5')} />}
                            title="LinkedIn"
                        />
                    </li>
                </ul>
            </nav>

            <m.nav
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className='fixed bottom-0 left-0 right-0 flex items-center justify-around rounded-t-3xl border-t border-white/10 bg-[#111111]/95 px-2 py-2 shadow-[0_-8px_24px_rgba(0,0,0,0.25)] backdrop-blur sm:hidden'
            >
                {navItems.map(({ name, link, icon: Icon }) => {
                    const active = isActiveLink(link);

                    return (
                        <m.a
                            key={name}
                            href={link}
                            whileTap={{ scale: 0.94 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                            className={clsx(
                                'flex flex-1 flex-col items-center justify-center rounded-2xl px-2 py-2 text-[11px] font-medium transition-colors',
                                active ? 'text-white' : 'text-white/60 hover:text-white'
                            )}
                            aria-current={active ? 'page' : undefined}
                        >
                            <m.span
                                animate={{ scale: active ? 1.05 : 1, backgroundColor: active ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0)' }}
                                transition={{ duration: 0.2 }}
                                className='mb-1 flex h-8 w-8 items-center justify-center rounded-full'
                            >
                                <Icon className='h-4 w-4' />
                            </m.span>
                            <span>{name}</span>
                        </m.a>
                    );
                })}
            </m.nav>
        </m.div>
    )
}

export default Nav