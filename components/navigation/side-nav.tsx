
import QuickAccess from '../quick-access'
import IconsGroups from './icons-groups'

const SideNav = () => {
  return (
    <header className="fixed top-0 right-0  z-1000 flex items-center justify-between h-16 px-4">
      <QuickAccess />
      <IconsGroups />

    </header>
  )
}

export default SideNav