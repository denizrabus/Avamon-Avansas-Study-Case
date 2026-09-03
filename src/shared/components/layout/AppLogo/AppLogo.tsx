import { Link } from 'react-router-dom'

import { routes } from '../../../../app/routes'

export function AppLogo() {
  return (
    <Link
      className="inline-flex items-center gap-2 text-xl font-black text-white"
      to={routes.home}
    >
      <span
        aria-hidden="true"
        className="size-5 rounded-full border border-avamon-yellow bg-transparent p-0.5"
      >
        <span className="block size-full rounded-full bg-avamon-yellow" />
      </span>
      Avamon
    </Link>
  )
}
