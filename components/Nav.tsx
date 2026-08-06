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
                initial={{ y: 24, opacity: 0 }}
                animate={isHidden ? { y: 24, opacity: 0 } : { y: 0, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 280, damping: 30, mass: 0.6, duration: 0.3 }}
                className='fixed bottom-2 left-1/2 flex w-[calc(100%-1.5rem)] max-w-90 -translate-x-1/2 items-center justify-around rounded-[24px] border border-white/10 bg-[#111111]/90 px-1.5 py-1.5 shadow-[0_10px_35px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:hidden'
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
                                'flex flex-1 flex-col items-center justify-center rounded-[18px] px-1.5 py-2 text-[10px] font-medium tracking-[0.01em] transition-all duration-200',
                                active ? 'text-white' : 'text-white/60 hover:text-white/90'
                            )}
                            aria-current={active ? 'page' : undefined}
                        >
                            <m.span
                                animate={{
                                    scale: active ? 1.04 : 1,
                                    backgroundColor: active ? 'rgba(255,255,255,0.14)' : 'rgba(255,255,255,0)',
                                    boxShadow: active ? '0 0 0 1px rgba(255,255,255,0.08)' : '0 0 0 0 rgba(255,255,255,0)',
                                }}
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