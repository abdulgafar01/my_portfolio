import clsx from 'clsx'
import { FiGithub } from "react-icons/fi";

import NavIcon from './nav-icon'
import { NavIconQuickAccess } from './nav-icon-quick-acess'
import { FaLinkedin } from 'react-icons/fa';

const IconsGroups = () => {
  return (
    <ul className={clsx('flex items-center w-full justify-end')}>

      <li className={clsx('hidden', 'sm:block')}>
        <NavIcon
          href="https://github.com/abdulgafar01"
          icon={<FiGithub className={clsx('h-5 w-5')} />}
          title="GitHub"
        />
      </li>
      <li className={clsx('hidden', 'sm:block')}>
        <NavIcon
          href="https://github.com/abdulgafar01"
          icon={<FaLinkedin  className={clsx('h-5 w-5')} />}
          title="GitHub"
        />
      </li>
      <li className={clsx('hidden', 'sm:block')}>
        <div
          className={clsx(
            'ml-2 mr-4 h-3 w-1px bg-slate-200',
            'dark:bg-slate-700'
          )}
        />
      </li>
      <li className={clsx('')}>
        <NavIconQuickAccess />
      </li>
    </ul>
  )
}

export default IconsGroups
