import clsx from 'clsx';

import type { ReactElement } from 'react';

interface NavIconProps {
    href: string;
    icon: ReactElement;
    title: string;
    label?: string;
    target?: string;
    rel?: string;
    isActive?: boolean;
}

export const NavIcon = ({ href, icon, title, label = '', target = '_blank', rel = 'noreferrer nofollow', isActive = false }: NavIconProps) => {
    return (
        <a
            href={href}
            className={clsx(
                'relative flex gap-1 items-center justify-center rounded-xl pb-1',
                'text-white/80 dark:*:text-gray-900/80',
                'font-medium',
                'hover:text-white',
                label && 'px-2',
                isActive && 'text-white',
                isActive && 'after:absolute after:bottom-0 after:left-1/2 after:h-0.5 after:w-[70%] after:-translate-x-1/2 after:bg-white dark:after:bg-gray-900 after:content-[""]'
                // isActive && 'border-b-2 border-white dark:border-gray-900'
            )}
            aria-label={`My ${title} profile`}
            title={`My ${title} profile`}
            target={target}
            rel={rel}
            aria-current={isActive ? 'page' : undefined}
        >
            <span
                className={clsx('flex h-9 w-9 items-center justify-center rounded-xl')}
            >
                {icon}
            </span>
            {label && (
                <span
                    className={clsx(
                        'hidden text-sm font-semibold tracking-wide',
                        'sm:block',
                        'text-inherit'
                    )}
                >
                    {label}
                </span>
            )}
        </a>
    );
}

export default NavIcon;
