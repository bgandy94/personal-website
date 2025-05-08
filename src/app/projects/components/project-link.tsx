import Link from 'next/link'
import { type AnchorHTMLAttributes, type PropsWithChildren } from 'react'
import { projectsMap } from '../projects'

export const ProjectLink = <PKey extends keyof typeof projectsMap>({
  projectName,
  target = '_blank',
  children,
}: { projectName: PKey } & PropsWithChildren &
  Pick<AnchorHTMLAttributes<HTMLAnchorElement>, 'target'>) => {
  return (
    <Link target={target} href={`/projects/${projectsMap[projectName].slug}`}>
      {children}
    </Link>
  )
}
