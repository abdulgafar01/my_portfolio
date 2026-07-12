import clsx from 'clsx'
import { FiGithub } from "react-icons/fi";
import { FaLinkedin } from 'react-icons/fa';

import NavIcon from './nav-icon'
import { NavIconQuickAccess } from './nav-icon-quick-acess'

const IconsGroups = () => {
  return (
    <ul className={clsx('flex items-center w-full justify-end')}>
      <li className={clsx('')}>
        <NavIconQuickAccess />
      </li>
    </ul>
  )
}

export default IconsGroups
