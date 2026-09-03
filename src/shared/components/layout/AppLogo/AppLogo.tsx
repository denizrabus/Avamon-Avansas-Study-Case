import { Link } from 'react-router-dom'

import { routes } from '../../../../app/routes'
import { AvamonMark } from '../../brand/AvamonMark'

export function AppLogo() {
  return (
    <Link
      className="inline-flex items-center gap-2 text-xl font-black text-white"
      to={routes.home}
    >
      <AvamonMark className="size-5 text-avamon-yellow" />
      Avamon
    </Link>
  )
}
